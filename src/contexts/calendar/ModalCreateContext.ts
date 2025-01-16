import { createContext } from "react";
import { ModalCreateProps } from "@/types/calendar";


export const ModalCreate = createContext<ModalCreateProps | null>(null);
