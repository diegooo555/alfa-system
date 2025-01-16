import { TaskObjectProps } from "@/types/calendar";

function Task({task, positionPorcent, heightPorcent, leftPorcent, setTaskModal, strIntervalHour}: TaskObjectProps) {
  return (
    <button
      className="w-[13.42857143%] absolute
        rounded-md flex flex-col text-white 
        z-10 overflow-auto scroll-hidden"
      style={{
        top: `${positionPorcent}rem`,
        height: `${heightPorcent}rem`,
        left: `${leftPorcent}%`,
        backgroundColor: task.color,
      }}
      onClick={(e) => setTaskModal({ state: true, task: { ...task, id: task.id || '' }, x: e.clientX, y: e.clientY })}
      title={task.title}
    >
      <span className="w-full text-center">{task.title}</span>
      <span className="w-full text-center">{strIntervalHour}</span>
    </button>
  );
}

export default Task;
