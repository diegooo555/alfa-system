"use server";

import { z } from "zod";
import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";

const TaskSquemaCreate = z.object({
  title: z.string(),
  description: z.string(),
  date_start: z.string(),
  date_end: z.string(),
  color: z.string(),
  user_id: z.string(),
});



export async function createTask(formData: FormData) {
  const data = TaskSquemaCreate.parse({
    title: formData.get("title"),
    description: formData.get("description"),
    date_start: formData.get("date_start"),
    date_end: formData.get("date_end"),
    color: formData.get("color"),
    user_id: formData.get("user_id"),
  });

  await sql`
      INSERT INTO tasks (title, description, date_start, date_end, color, user_id)
      VALUES (${data.title}, ${data.description}, ${data.date_start}, ${data.date_end}, ${data.color}, ${data.user_id})
    `;

  revalidatePath("/tasks");
}

export async function updateTask(id: string,formData: FormData) {
  const data = TaskSquemaCreate.parse({
    title: formData.get("title"),
    description: formData.get("description"),
    date_start: formData.get("date_start"),
    date_end: formData.get("date_end"),
    color: formData.get("color"),
    user_id: formData.get("user_id"),
  });

  await sql`
    UPDATE tasks
    SET 
      title = ${data.title},
      description = ${data.description},
      date_start = ${data.date_start},
      date_end = ${data.date_end},
      color = ${data.color},
      user_id = ${data.user_id}
    WHERE id = ${id}
  `;

  revalidatePath("/tasks");
}


export async function deleteTaskById(taskId: string): Promise<void> {
    await sql`
      DELETE FROM tasks
      WHERE id = ${taskId};
    `;
    revalidatePath("/tasks");
}