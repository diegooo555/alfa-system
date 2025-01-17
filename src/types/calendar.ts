import { Dispatch, SetStateAction } from "react";


export interface CreateModalProps {
  state?: boolean;
  hourStart: number;
  hourEnd: number;
  amPm: string;
  amPmEnd: string;
  day: number;
  month: number;
  year: number;
}

export interface ModalCreateProps {
  createModal: CreateModalProps;

  setCreateModal: React.Dispatch<
    React.SetStateAction<{
      state: boolean;
      hourStart: number;
      hourEnd: number;
      amPm: string;
      amPmEnd: string;
      day: number;
      month: number;
      year: number;
    }>
  >;
}

export interface WindowQuestionProps {
  id: string;
  setWindow: (value: boolean) => void;
  setTaskModal: Dispatch<
    SetStateAction<{
      state: boolean;
      task: {
        _id: string;
        title: string;
        description: string;
        dateStart: string;
        dateEnd: string;
        color: string;
      };
    }>
  >;
}

export interface TaskData {
  _id: string;
  title: string;
  description: string;
  dateStart: string;
  dateEnd: string;
  color: string;
}

export interface ModalTaskProps {
  taskModal: {
    state: boolean;
    task: {
      _id: string;
      title: string;
      description: string;
      dateStart: string;
      dateEnd: string;
      color: string;
    };
  };

  setTaskModal: Dispatch<
  SetStateAction<{
    state: boolean;
    task: {
      _id: string;
      title: string;
      description: string;
      dateStart: string;
      dateEnd: string;
      color: string;
    };
  }>
>;
}

export interface TaskContextProps {
  tasks: TaskData[];
  setTasks: React.Dispatch<React.SetStateAction<TaskData[]>>;
  getTasks: () => Promise<void>;
  createTask: (data: TaskData) => Promise<void>;
  updateTask: (id: string, data: TaskData) => Promise<void>;
  deleteTask: (id: string) => Promise<void>;
  createTasks: (tasks: TaskData[]) => Promise<void>;
}

export interface DateProps {
  state?: boolean;
  day: number;
  month: number;
  year: number;
}

export interface DayObjectProps{
  dayObject: DateProps;
}

export interface ProfileProps {
  monthName: string;
  nextWeek: () => void;
  prevWeek: () => void;
}

export interface TaskObjectProps {
  task: TaskData;
  positionPorcent: number;
  heightPorcent: number;
  leftPorcent: number;
  setTaskModal: (value: {
    state: boolean;
    task: {
      _id: string;
      title: string;
      description: string;
      dateStart: string;
      dateEnd: string;
      color: string;
    };
    x: number;
    y: number;
  }) => void;
  strIntervalHour: string;
}

export interface DayDetails {
  day: number;
  month: number;
  year: number;
  dayStr: string;
  state: boolean;
}

export interface FullDateComponents {
  year: number;
  month: number;
  day: number;
  hour: number;
  minutes: number;
  amPm: "am" | "pm";
}

export interface ElementsTask {
  hourStart: number;
  defHourSt: number;
  defHourEnd: number;
  strIntervalHour: string;
}


export interface WeekCalendarProps {
  arrDaysWeek: DayDetails[];
  setTaskModal: Dispatch<
    SetStateAction<{
      state: boolean;
      task: {
        _id: string;
        title: string;
        description: string;
        dateStart: string;
        dateEnd: string;
        color: string;
      };
    }>
  >;

  mdScreen: boolean;
  tasks: TaskData[];
}

export interface DateComponents {
    year: number;
    month: number;
    day: number;
}

export interface DateSimpleProps {
    dateStart: string;
    dateEnd: string;
}