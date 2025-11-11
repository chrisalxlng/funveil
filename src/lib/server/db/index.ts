import { drizzle } from "drizzle-orm/postgres-js";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import postgres from "postgres";
import { env } from "$env/dynamic/private";
import * as schema from "./schema";
import pc from "picocolors";

const client = postgres(env.DATABASE_URL!, {
  max: 1,
  onnotice: () => {}
});
export const db = drizzle(client, { schema });

export const runMigrations = async () => {
  console.log(pc.cyan(pc.bold("[DB] Running migrations...")));
  await migrate(db, { migrationsFolder: "drizzle" });
  console.log(pc.green(pc.bold("[DB] Migrations completed!")));
};
