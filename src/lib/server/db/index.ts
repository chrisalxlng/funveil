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
  const maxRetries = 5;
  let currentRetry = 0;

  while (currentRetry < maxRetries) {
    try {
      if (currentRetry === 0) {
        console.log(pc.cyan(pc.bold("[DB] Running migrations...")));
      } else {
        console.log(
          pc.cyan(
            pc.bold(`[DB] Attempting migrations (Attempt ${currentRetry + 1}/${maxRetries})...`)
          )
        );
      }

      await migrate(db, {
        migrationsFolder: "drizzle"
      });

      console.log(pc.green(pc.bold("[DB] Migrations completed!")));
      return;
    } catch (error) {
      currentRetry++;

      if (currentRetry >= maxRetries) {
        console.error(
          pc.red(pc.bold("[DB] Critical error: Migrations failed after maximum retries."))
        );
        throw error;
      }

      const delay = Math.pow(2, currentRetry - 1) * 1000;
      console.warn(
        pc.yellow(`[DB] Database not ready (ECONNREFUSED). Retrying in ${delay / 1000}s...`)
      );
      await new Promise((resolve) => setTimeout(resolve, delay));
    }
  }
};
