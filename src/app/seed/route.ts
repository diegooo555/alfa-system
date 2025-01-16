import { db } from "@vercel/postgres";
import bcrypt from "bcrypt";
import { users, tasks } from "../lib/data";

const client = await db.connect();

async function seedTasks() {
  await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

  await client.sql`
    CREATE TABLE IF NOT EXISTS tasks (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      description TEXT NOT NULL,
      date_start VARCHAR(255) NOT NULL,
      date_end VARCHAR(255) NOT NULL,
      color VARCHAR(255) NOT NULL,
      user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;

  const insertedTasks = await Promise.all(
    tasks.map(async (task) => {
      return client.sql`
            INSERT INTO tasks (id, title, description, date_start, date_end, color, user_id)
            VALUES (${task.id}, ${task.title}, ${task.description}, ${task.date_start}, ${task.date_end}, ${task.color}, ${task.user_id})
            ON CONFLICT (id) DO NOTHING;
          `;
    })
  );

  return insertedTasks;
}

async function seedUsers() {
  await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

  await client.sql`
      CREATE TABLE IF NOT EXISTS users (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL
      );
    `;

  const insertedUsers = await Promise.all(
    users.map(async (user) => {
      const hashedPassword = await bcrypt.hash(user.password, 10);
      return client.sql`
            INSERT INTO users (id, name, email, password)
            VALUES (${user.id}, ${user.name}, ${user.email}, ${hashedPassword})
            ON CONFLICT (id) DO NOTHING;
          `;
    })
  );

  return insertedUsers;
}

export async function GET() {
  try {
    await client.sql`BEGIN`;
    //await seedUsers();
    await seedTasks();
    await seedUsers();
    await client.sql`COMMIT`;
    return Response.json({ message: "Database seeded successfully" });
  } catch (error) {
    await client.sql`ROLLBACK`;
    return Response.json({ error }, { status: 500 });
  }
}