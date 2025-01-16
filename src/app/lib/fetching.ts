import { sql } from "@vercel/postgres";
import { Task } from "./definitions";
import { TaskData } from "@/types/calendar";

export async function fetchTaksUser(): Promise<TaskData[]> {
  try {
    const data = await sql<Task>`
    SELECT tasks.id, tasks.title, tasks.description, tasks.date_start, tasks.date_end, tasks.color, users.name AS user_name
    FROM tasks
    JOIN users ON tasks.user_id = users.id;
  `;

    return data.rows.map((task) => ({
      _id: task.id,
      title: task.title,
      description: task.description,
      dateStart: task.date_start,
      dateEnd: task.date_end,
      color: task.color,
    }));
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch tasks.");
  }
}
