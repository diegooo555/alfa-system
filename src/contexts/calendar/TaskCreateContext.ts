import { createContext } from "react";
import { TaskContextProps } from "@/types/calendar";

export const TaskContext = createContext<TaskContextProps | null>(null);

