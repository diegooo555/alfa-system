import { useState, useContext } from "react";
import { ModalCreate } from "@/contexts/calendar/ModalCreateContext";
import { ModalCreateProps } from "@/types/calendar";
import { CreateModalProps } from "@/types/calendar";
import { createTask } from "@/app/lib/actions";

function CreateTask() {
  const modalCreateContext: ModalCreateProps | null = useContext(ModalCreate);
  const createModal: CreateModalProps | null =
    modalCreateContext?.createModal ?? null;

  const formatDate = (hourRe: number) => {
    if (createModal) {
      const formatMonth =
        createModal.month < 10 ? `0${createModal.month}` : createModal.month;
      const formatDay =
        createModal.day < 10 ? `0${createModal.day}` : createModal.day;
      const formatHour = hourRe < 10 ? `0${hourRe}` : ( hourRe == 24 ? "00" : hourRe );
      return `${createModal.year}-${formatMonth}-${formatDay}T${formatHour}:00`;
    }
  };

  const [dateStart, setDateStart] = useState(
    createModal ? formatDate(createModal.hourStart) : ""
  );
  const [dateEnd, setDateEnd] = useState(
    createModal ? formatDate(createModal.hourEnd) : ""
  );

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevenir el envío predeterminado del formulario

    const formData = new FormData(e.currentTarget); // Obtener los datos del formulario

    // Llamar a la acción del servidor para crear la tarea
    try {
      await createTask(formData); // Esperar la respuesta de la acción
      modalCreateContext?.setCreateModal({
        state: false,
        hourStart: 0,
        hourEnd: 0,
        amPm: "",
        amPmEnd: "",
        day: 0,
        month: 0,
        year: 0,
      });
    } catch (error) {
      console.error("Error al crear la tarea:", error);
      // Opcional: manejar errores o mostrar un mensaje al usuario
    }
  };

  const wscreen = window.innerHeight / 2;
  const hscreen = window.innerWidth / 2;
  return (
    <div
      className={`z-20 h-[70vh] min-w-[400px] max-md:h-[50vh] fixed`}
      style={{
        top: wscreen,
        left: hscreen,
        transform: "translate(-50%, -50%)",
      }}
    >
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center w-full border-blue-500 border-[1.5px] rounded-md bg-white h-full overflow-y-scroll"
      >
        <fieldset className="w-full">
          <div className="flex justify-center items-center p-3 gap-3">
            <img src="/tarea.png" alt="" width="50px" height="50px" />
            <legend className="text-orange-500 font-extrabold text-2xl">
              Nueva Tarea
            </legend>
          </div>
        </fieldset>

        <fieldset className="flex flex-col items-center w-full gap-1">
          <label htmlFor="title" className="text-[darkblue] font-bold text-lg">
            Titulo:
          </label>
          <input
            type="text"
            id="title"
            className="outline-none border-gray-400 border-[1px] w-[90%] p-3 rounded-md"
            name="title"
            required
          />

          <label
            htmlFor="description"
            className="text-[darkblue] font-bold text-lg"
          >
            Descripción:
          </label>
          <textarea
            id="description"
            rows={3}
            className="outline-none border-gray-400 border-[1px] w-[90%] rounded-md"
            name="description"
          ></textarea>

          <label htmlFor="date" className="text-[darkblue] font-bold text-lg">
            Fecha Inicio:
          </label>
          <input
            type="datetime-local"
            id="date"
            className="outline-none border-gray-400 border-[1px] w-[90%] rounded-md p-3 text-center"
            name="date_start"
            value={dateStart}
            onChange={(e) => setDateStart(e.target.value)}
            required
          />

          <label htmlFor="date" className="text-[darkblue] font-bold text-lg">
            Fecha Fin:
          </label>
          <input
            type="datetime-local"
            id="date"
            className="outline-none border-gray-400 border-[1px] w-[90%] rounded-md p-3 text-center"
            name="date_end"
            value={dateEnd}
            onChange={(e) => setDateEnd(e.target.value)}
            required
          />
          <div className="flex w-full justify-center gap-2">
            <label
              htmlFor="color"
              className="text-[darkblue] font-bold text-lg"
            >
              Color:{" "}
            </label>
            <input type="color" id="color" name="color" required />
          </div>
        </fieldset>

        <input
          type="hidden"
          name="user_id"
          value="410544b2-4001-4271-9855-fec4b6a6442a"
        />

        <button
          type="submit"
          className="p-2 bg-blue-600 m-2 text-white font-bold rounded-md"
        >
          Agregar
        </button>
      </form>
    </div>
  );
}

export default CreateTask;
