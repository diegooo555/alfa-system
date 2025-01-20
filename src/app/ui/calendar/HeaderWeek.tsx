"use client"

export interface DayProps {
    day: number;
    state: boolean;
    dayStr: string;
} 

export interface HeaderWeekProps {
    arrDays: DayProps[];
    formatMeridianHour: string;
}


const Day = ({ day, state, dayStr }: DayProps) => {
    return (
      <div className="w-[13.42857%] flex flex-col items-center justify-center h-full">
        <p
          className={`${
            state ? "text-blue-500 font-bold" : "text-gray-500 font-bold"
          } max-sm:text-sm`}
        >
          {dayStr}
        </p>
        <div
          className={`${
            state
              ? "bg-blue-500 text-white hover:bg-blue-700"
              : "text-gray-500 hover:bg-gray-300"
          } rounded-full font-bold text-xl max-sm:h-7 max-sm:w-7 max-sm:text-sm 
              flex items-center justify-center cursor-pointer w-10 h-10`}
        >
          {day}
        </div>
      </div>
    );
  };
  
export default function HeaderWeek({ arrDays, formatMeridianHour }: HeaderWeekProps) {
    return (
      <div className="w-full pt-1 h-[16%] max-md:max-h-20">
        <div className="flex items-center h-full">
          <div className="w-[6%] self-stretch justify-self-stretch flex items-center">
            <span className="text-xs text-gray-500 font-semibold w-full text-end max-sm:text-[8px]">
              {formatMeridianHour}
            </span>
          </div>
          {arrDays.map((dayObj, index) => (
            <Day
              day={dayObj.day}
              state={dayObj.state}
              dayStr={dayObj.dayStr}
              key={index}
            />
          ))}
        </div>
      </div>
    );
  }