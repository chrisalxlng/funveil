import { drizzle } from "drizzle-orm/postgres-js";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import postgres from "postgres";
import { env } from "$env/dynamic/private";
import * as schema from "./schema";
import { log } from "../utils";

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
        log("DB", "Running migrations...", "info");
      } else {
        log("DB", `Attempting migrations (Attempt ${currentRetry + 1}/${maxRetries})...`, "info");
      }

      await migrate(db, {
        migrationsFolder: "drizzle"
      });

      log("DB", "Migrations completed!", "success");
      return;
    } catch (error) {
      currentRetry++;

      if (currentRetry >= maxRetries) {
        log("DB", "Critical error: Migrations failed after maximum retries.", "error");
        throw error;
      }

      const delay = Math.pow(2, currentRetry - 1) * 1000;
      log("DB", `Database not ready (ECONNREFUSED). Retrying in ${delay / 1000}s...`, "warn");
      await new Promise((resolve) => setTimeout(resolve, delay));
    }
  }
};
