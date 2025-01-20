"use client"

import { useState } from "react";

import { ModalTaskProps, WindowQuestionProps } from "@/types/calendar";
import { deleteTaskById, updateTask } from "@/app/lib/actions";

const WindowQuestion = ({
  id,
  setWindow,
  setTaskModal,
}: WindowQuestionProps) => (
  <div className="w-screen h-screen flex absolute top-0 left-0 items-center justify-center z-50 backdrop-blur-sm">
    <div className="min-h-32 min-w-64 self-center justify-self-center flex flex-col justify-center items-center bg-white gap-2 rounded-md">
      <p>¿Deseas eliminar la tarea?</p>
      <div className="flex justify-around items-center w-full">
        <button
          onClick={async () => {
            setWindow(false);
            setTaskModal({
              state: false,
              task: {
                _id: "",
                title: "",
                description: "",
                dateStart: "",
                dateEnd: "",
                color: "",
              },
            });

            await deleteTaskById(id);
          }}
          className="bg-red-500 p-2 w-[20%] rounded-md"
        >
          Si
        </button>
        <button
          className="bg-blue-400 p-2 w-[20%] rounded-md"
          onClick={() => setWindow(false)}
        >
          No
        </button>
      </div>
    </div>
  </div>
);

const ModalTask = ({ taskModal, setTaskModal }: ModalTaskProps) => {
  const task = taskModal.task;
  const [title, setTitle] = useState(task?.title);
  const [description, setDescription] = useState(task?.description);
  const [dateStart, setDateStart] = useState(task?.dateStart);
  const [dateEnd, setDateEnd] = useState(task?.dateEnd);
  const [color, setColor] = useState(task?.color);
  const [windowQuestion, setWindowQuestion] = useState(false);
  const hScreen = window.innerHeight / 2;
  const wScreen = window.innerWidth / 2;


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    try{
      await updateTask(task._id, formData);
      setTaskModal({
        state: false,
        task: {
          _id: "",
          title: "",
          description: "",
          dateStart: "",
          dateEnd: "",
          color: "",
        }
      })
    }catch(error){
      console.error("Error al actualizar la tarea:", error);
    }
  }

  return (
    <>
      <div
        className="min-w-[300px] h-[60vh] grid fixed top-0 left-0 overflow-auto rounded-md shadow dark:border dark:border-gray-700 z-50"
        style={{
          left: wScreen,
          top: hScreen,
          transform: "translate(-50%, -50%)",
        }}
      >
        <form
          className="flex flex-col justify-self-center self-center w-full h-full bg-white shadow-2xl
          gap-2 dark:border p-5"
          onSubmit={handleSubmit}
        >
          <button
            className="self-end bg-gray-400 rounded-full w-8 h-8 flex justify-center items-center hover:bg-gray-300"
            onClick={() =>
              setTaskModal({
                state: false,
                task: {
                  _id: "",
                  title: "",
                  description: "",
                  dateStart: "",
                  dateEnd: "",
                  color: "",
                },
              })
            }
          >
            <svg focusable="false" width="20" height="20" viewBox="0 0 24 24">
              <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"></path>
            </svg>
          </button>
          <input
            type="text"
            value={title}
            className="outline-none border-[gray] border rounded-md p-2"
            name="title"
            id="title"
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            id="description"
            value={description}
            className="outline-none border-[gray] border rounded-md p-2"
            name="description"
            onChange={(e) => setDescription(e.target.value)}
          />
          <input
            type="datetime-local"
            value={dateStart}
            className="outline-none border-[gray] border rounded-md p-2"
            name="date_start"
            id="date_start"
            onChange={(e) => setDateStart(e.target.value)}
          />
          <input
            type="datetime-local"
            value={dateEnd}
            className="outline-none border-[gray] border rounded-md p-2"
            name="date_end"
            id="date_end"
            onChange={(e) => setDateEnd(e.target.value)}
          />
          <input
            type="color"
            value={color}
            className="w-32 h-12 self-center"
            name="color"
            id="color"
            onChange={(e) => setColor(e.target.value)}
          />

          <input
            type="hidden"
            name="user_id"
            value="410544b2-4001-4271-9855-fec4b6a6442a"
          />
          <button
            className="bg-red-600 p-2 rounded-md"
            onClick={() => {
              setWindowQuestion(true);
            }}
            type="button"
          >
            Eliminar
          </button>

          <button className="bg-green-400 p-2 rounded-md" type="submit">
            Guardar
          </button>
        </form>
      </div>
      {windowQuestion && task && (
        <WindowQuestion
          id={task._id}
          setWindow={setWindowQuestion}
          setTaskModal={setTaskModal}
        />
      )}
    </>
  );
};

export default ModalTask;
