import { fetchTaksUser } from "../lib/fetching";
import { Calendar } from "../ui/calendar/Calendar";

export default async function TaskPage() {
  const tasks = await fetchTaksUser();

  return (
    <div className="h-screen">
      <Calendar tasks={tasks} mdScreen={false}/>
    </div>
  );
}