import { db } from "@vercel/postgres";

const client = await db.connect();

async function listTasks() {
    const data = await client.sql`
    SELECT tasks.id, tasks.title, tasks.description, tasks.date_start, tasks.date_end, tasks.color, users.name AS user_name
    FROM tasks
    JOIN users ON tasks.user_id = users.id;
  `;

    return data.rows;
}

export async function GET() {
  try {
    return Response.json(await listTasks());
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}
