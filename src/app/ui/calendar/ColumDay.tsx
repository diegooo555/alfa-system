import { DayObjectProps } from "@/types/calendar";
import { RowsHour } from "./RowsHour";
import IndicatorHour from "./IndicatorHour";


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

  export default ColumnDay;