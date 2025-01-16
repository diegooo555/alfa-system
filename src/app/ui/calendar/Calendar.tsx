"use client"

import { useState, useEffect, useRef} from "react";
import { generateDaysMonths, generateDaysWeek, days, monthNames} from "@/logic/calendar";
import HeaderWeek from "./HeaderWeek";
import ModalTask from "./MotalTask";
import CreateTask from "./CreateTask";
import { ModalCreate } from "@/contexts/calendar/ModalCreateContext";
import { ColumnHours } from "./ColumnHours";
import Profile from "../profile/Profile";
import WeekCalendar from "./WeekCalendar";
import { TaskData } from "@/types/calendar";

const formatHourMeridian = (dateActual: Date) => {
  const offsetInMinutes = dateActual.getTimezoneOffset();
  const offSetInHours = -(offsetInMinutes / 60);
  const sign = offSetInHours >= 0 ? "+" : "-";
  const absOffSetInHours = Math.abs(Math.floor(offSetInHours));
  const formattedOffset = `GMT${sign}${absOffSetInHours
    .toString()
    .padStart(2, "0")}`;
  return formattedOffset;
};

interface CalendarProps {
  tasks: TaskData[];
  mdScreen: boolean;
}

export function Calendar({tasks, mdScreen}: CalendarProps) {
  const [taskModal, setTaskModal] = useState({ state: false, task: {_id: "", title: "", description: "", dateStart: "", dateEnd: "", color: ""} });
  const [createModal, setCreateModal] = useState( {state: false, hourStart: 0, hourEnd: 0, amPm: "", amPmEnd: "",  day: 0,  month: 0,  year: 0});
  const dateNow = new Date();
  const scrollableRef = useRef<HTMLDivElement>(null);
  const currentDay = dateNow.getDate();
  const currentMonth = dateNow.getMonth() + 1;
  const currentYear = dateNow.getFullYear();
  const dayStr = days[dateNow.getDay()];

  const [actualDate, setActualDate] = useState({currentDay: currentDay, currentMonth: currentMonth, currentYear: currentYear, dayStr: dayStr, index: 0});
  const formatMeridian = formatHourMeridian(dateNow);

  const arrDaysWeek = generateDaysWeek(actualDate.currentDay, actualDate.currentMonth, actualDate.currentYear, actualDate.dayStr, actualDate.index);

  const prevWeek = () => {
    const daysMonth = (actualDate.currentMonth !== 1) ? generateDaysMonths(actualDate.currentYear)[actualDate.currentMonth - 2] : 31;
    const newDay =  (arrDaysWeek[0].day - 7 <= 0) ? daysMonth + (arrDaysWeek[0].day - 7) : arrDaysWeek[0].day - 7;
    const newMonth = (arrDaysWeek[0].day - 7 <= 0) ? (actualDate.currentMonth !==1 ? (arrDaysWeek[0].month - 1) : 12 ) : arrDaysWeek[0].month;

    const newYear = (arrDaysWeek[0].day - 7 <= 0 && newMonth === 12) ? arrDaysWeek[0].year - 1 : arrDaysWeek[0].year;
    const newDayStr = "DO";
    
    setActualDate((prev) => ({...prev, currentDay: newDay, currentMonth: newMonth, currentYear: newYear, dayStr: newDayStr, index: actualDate.index - 1}));

    if(actualDate.index === 1){
      const timeNow = new Date();
      const hours = timeNow.getHours();
      const minutes = timeNow.getMinutes();
      const minutesPorcent = minutes / 60;
      const hoursPorcent = (hours + minutesPorcent) / 24;
      const positionScroll = Number(hoursPorcent.toFixed(4));
      if (scrollableRef.current) {
          scrollableRef.current.scrollTop =
          scrollableRef.current.scrollHeight * positionScroll - 30;
      }
      setActualDate((prev) => ({...prev, currentDay: dateNow.getDate(), currentMonth: dateNow.getMonth() + 1, currentYear: dateNow.getFullYear(), dayStr: days[dateNow.getDay()], index: 0}));
    }else{
      setActualDate((prev) => ({...prev, currentDay: newDay, currentMonth: newMonth, currentYear: newYear, dayStr: newDayStr, index: actualDate.index - 1}));
    }
  };

  const nextWeek = () => {
    const daysMonth = (actualDate.currentMonth !== 12) ? generateDaysMonths(actualDate.currentYear)[actualDate.currentMonth - 1] : 31;
    const newDay =  (arrDaysWeek[6].day + 1 < daysMonth) ? arrDaysWeek[6].day + 1 : 1;
    const newMonth = newDay === 1 ? (actualDate.currentMonth !== 12 ? (arrDaysWeek[6].month + 1) : 1) : arrDaysWeek[6].month;
    const newYear = (newDay === 1 && newMonth === 1) ? arrDaysWeek[6].year + 1 : arrDaysWeek[6].year;
    const newDayStr = "DO";

    if(actualDate.index === -1){
      const timeNow = new Date();
      const hours = timeNow.getHours();
      const minutes = timeNow.getMinutes();
      const minutesPorcent = minutes / 60;
      const hoursPorcent = (hours + minutesPorcent) / 24;
      const positionScroll = Number(hoursPorcent.toFixed(4));
      if (scrollableRef.current) {
          scrollableRef.current.scrollTop =
          scrollableRef.current.scrollHeight * positionScroll - 30;
      }
      setActualDate((prev) => ({...prev, currentDay: dateNow.getDate(), currentMonth: dateNow.getMonth() + 1, currentYear: dateNow.getFullYear(), dayStr: days[dateNow.getDay()], index: 0}));

    }else{
      setActualDate((prev) => ({...prev, currentDay: newDay, currentMonth: newMonth, currentYear: newYear, dayStr: newDayStr, index: actualDate.index + 1}));
    }         
  };

  useEffect(() => {
    const scrollCurrentTime = () => {
      const timeNow = new Date();
      const hours = timeNow.getHours();
      const minutes = timeNow.getMinutes();
      const minutesPorcent = minutes / 60;
      const hoursPorcent = (hours + minutesPorcent) / 24;
      const positionScroll = Number(hoursPorcent.toFixed(4));
      if (scrollableRef.current) {
          scrollableRef.current.scrollTop =
          scrollableRef.current.scrollHeight * positionScroll - 30;
      }
    };
    scrollCurrentTime();
  }, []);

  return (
    
    <ModalCreate.Provider value={{createModal, setCreateModal}}>

      <Profile monthName={monthNames[actualDate.currentMonth - 1]} prevWeek={prevWeek} nextWeek={nextWeek}/>
      
      <div className="h-[85%] overflow-hidden" onClick={() => { if(createModal.state){
        setCreateModal((prev) => ({...prev, state: false}))
      }
      if(taskModal.state){
        setTaskModal({ state: false, task: {_id: "", title: "", description: "", dateStart: "", dateEnd: "", color: ""} })
      }
      }}>
        <HeaderWeek arrDays={arrDaysWeek} formatMeridianHour={formatMeridian} />
        <div className="h-[84%] pt-1">
          <div className="overflow-y-scroll h-full w-full relative flex" ref={scrollableRef}>
            <ColumnHours/>
            <WeekCalendar arrDaysWeek={arrDaysWeek} setTaskModal={setTaskModal} mdScreen={mdScreen} tasks={tasks}/>

          </div>
        </div>
      </div>
      {taskModal.state && (<ModalTask taskModal={taskModal} setTaskModal={setTaskModal}/>)}
      {createModal.state &&(
        <CreateTask/>
      )}
    </ModalCreate.Provider>
  );
}