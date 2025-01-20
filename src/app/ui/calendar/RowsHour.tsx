"use client"

import { useContext } from "react";
import { ModalCreate } from "@/contexts/calendar/ModalCreateContext";
import { CreateModalProps, DateProps } from "@/types/calendar";

const RowHour = ({
  hourStart,
  hourEnd,
  amPm,
  amPmEnd,
  day,
  month,
  year,
}: CreateModalProps) => {
  const modalCreateContext = useContext(ModalCreate);

  return (
    <div
      className="border border-solid border-blue-300 hover:bg-blue-100 h-16 max-md:h-24 cursor-pointer"
      onClick={() =>{
        modalCreateContext?.setCreateModal({
          state: true,
          hourStart,
          hourEnd,
          amPm,
          amPmEnd,
          day,
          month,
          year,
        })
      }
    }
    >
      
    </div>
  );
};

export const RowsHour = ({ day, month, year }: DateProps) => {
  const rows = [];

  for (let i = 0; i <= 23; i++) {
    const amPm = i < 12 ? "AM" : "PM";
    const amPmEnd = (i + 1) < 12 ? "AM" : "PM";

    rows.push(
      <RowHour
        key={i}
        hourStart={i}
        hourEnd={i+1}
        amPm={amPm}
        amPmEnd={amPmEnd}
        day={day}
        month={month}
        year={year}
      />
    );
  }

  return (
    <div className="grid grid-rows-24">
      {rows}
    </div>
  );
};
