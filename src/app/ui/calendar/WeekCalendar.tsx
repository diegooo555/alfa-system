"use client"

import IndicatorHour from "./IndicatorHour";
import { getComponentsFullDate, getElementsTask, filterTaskByWeek, arrSimpleDaysWeek, calculateHeightPorcent  } from "@/logic/calendar";

import { RowsHour } from "./RowsHour";
import { DayObjectProps, WeekCalendarProps } from "@/types/calendar";
import Task from "./Task";

const ColumnDay = ({dayObject}: DayObjectProps) => {
    return(
      <div
        className={dayObject.state?" bg-blue-200 relative grid-rows-7":"relative grid-rows-7"
      }>
      <RowsHour day={dayObject.day} month={dayObject.month} year={dayObject.year} />
      {dayObject.state && <IndicatorHour />}
    </div>
    );
  };

const WeekCalendar = ({arrDaysWeek, setTaskModal,  mdScreen, tasks}: WeekCalendarProps) => {
    const arrDaysSimple = arrSimpleDaysWeek(arrDaysWeek[0].day, arrDaysWeek[6].day);
    const filterTaskWeek = filterTaskByWeek(arrDaysWeek[0].day, arrDaysWeek[0].month, arrDaysWeek[0].year, arrDaysWeek[6].day, arrDaysWeek[6].month, arrDaysWeek[6].year, tasks, arrDaysSimple);
    const sizeGridColumns = "14.28571429%".repeat(7);
    return(
        <div className="w-[94%] h-full grid" style={{ gridTemplateColumns: sizeGridColumns}}>
              <ColumnDay dayObject={arrDaysWeek[0]}/>
              <ColumnDay dayObject={arrDaysWeek[1]}/>
              <ColumnDay dayObject={arrDaysWeek[2]}/>
              <ColumnDay dayObject={arrDaysWeek[3]}/>
              <ColumnDay dayObject={arrDaysWeek[4]}/>
              <ColumnDay dayObject={arrDaysWeek[5]}/>
              <ColumnDay dayObject={arrDaysWeek[6]}/>
              { filterTaskWeek.length > 0 &&
              filterTaskWeek.map((task, index) => {
              const dateStart = task.dateStart;
              const dateEnd = task.dateEnd;
              const componentsDateStart = getComponentsFullDate(dateStart);
              const componentsDateEnd = getComponentsFullDate(dateEnd);
              const elementsTask = getElementsTask(dateStart, dateEnd, componentsDateStart.day);
              const positionPorcent = ((mdScreen ? 144 : 96)  * Number(elementsTask.hourStart / 24));
              const leftPorcent =  ((arrDaysSimple.indexOf(componentsDateStart.day)) * (94/7)) + 6;
              const heightPorcent = calculateHeightPorcent(componentsDateStart, componentsDateEnd, mdScreen);
              
              return (
                <Task key={index} task={task} positionPorcent={positionPorcent} heightPorcent={heightPorcent} leftPorcent={leftPorcent} setTaskModal={setTaskModal} strIntervalHour={elementsTask.strIntervalHour}/>
              );
            })}
            </div>
    )
}

export default WeekCalendar;