import { sequence } from "@sveltejs/kit/hooks";
import type { Handle } from "@sveltejs/kit";
import { env } from "$env/dynamic/private";
import { env as publicEnv } from "$env/dynamic/public";
import { paraglideMiddleware } from "$lib/paraglide/server";
import { runMigrations } from "$lib/server/db";
import nodeCron from "node-cron";
import { db } from "$lib/server/db";
import { gifts } from "$lib/server/db/schema";
import { lte } from "drizzle-orm";
import { isEmpty } from "lodash-es";
import { log } from "$lib/server/utils";

let migrationsStarted = false;

nodeCron.schedule("0 3 * * *", async () => {
  log("CLEANUP", "Checking for expired gifts...", "info");

  const deletedGifts = await db
    .delete(gifts)
    .where(lte(gifts.expiresAt, new Date()))
    .returning({ id: gifts.giftId, expiredAt: gifts.expiresAt });

  deletedGifts.forEach((gift) =>
    log("CLEANUP", `Deleted gift with id ${gift.id} which expired at ${gift.expiredAt}!`, "success")
  );

  if (!isEmpty(deletedGifts)) {
    log("CLEANUP", `Finished cleanup of expired gifts (${deletedGifts.length})!`, "success");
  } else {
    log("CLEANUP", "No gifts to delete!", "success");
  }
});

(async () => {
  if (migrationsStarted) return;
  migrationsStarted = true;

  try {
    await runMigrations();
  } catch (error) {
    console.error("Database migration failed! Server might be unstable.", error);
  }
})();

const authHandle: Handle = async ({ event, resolve }) => {
  let accessToken = event.cookies.get("session_token");
  const refreshToken = event.cookies.get("refresh_token");

  if (refreshToken) {
    let isExpired = true;

    if (accessToken) {
      try {
        const payload = JSON.parse(atob(accessToken.split(".")[1]));
        isExpired = payload.exp * 1000 < Date.now() + 30000;
      } catch {
        isExpired = true;
      }
    }

    if (isExpired) {
      try {
        const keycloakSecret = env.KEYCLOAK_CLIENT_SECRET;

        const tokenEndpoint = `${publicEnv.PUBLIC_KEYCLOAK_INTERNAL_URL}/realms/${publicEnv.PUBLIC_KEYCLOAK_REALM}/protocol/openid-connect/token`;

        const response = await fetch(tokenEndpoint, {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: new URLSearchParams({
            grant_type: "refresh_token",
            refresh_token: refreshToken,
            client_id: publicEnv.PUBLIC_KEYCLOAK_CLIENT_ID!,
            client_secret: keycloakSecret!
          })
        });

        const tokens = await response.json();

        if (response.ok && tokens.access_token) {
          accessToken = tokens.access_token;
          event.cookies.set("session_token", tokens.access_token, {
            path: "/",
            httpOnly: true,
            secure: true,
            sameSite: "lax",
            maxAge: 60 * 60 * 24
          });

          if (tokens.refresh_token) {
            event.cookies.set("refresh_token", tokens.refresh_token, {
              path: "/",
              httpOnly: true,
              secure: true,
              sameSite: "lax",
              maxAge: 60 * 60 * 24 * 7
            });
          }
        } else {
          event.cookies.delete("session_token", { path: "/" });
          event.cookies.delete("refresh_token", { path: "/" });
          accessToken = undefined;
        }
      } catch (error) {
        console.error("Error during passive token refresh:", error);
        accessToken = undefined;
      }
    }
  }

  if (accessToken) {
    try {
      const payload = JSON.parse(atob(accessToken.split(".")[1]));
      event.locals.user = {
        id: payload.sub,
        name: payload.name || payload.preferred_username,
        given_name: payload.given_name,
        family_name: payload.family_name,
        email: payload.email,
        is_demo: payload.is_demo,
        roles: payload.realm_access?.roles || []
      };
    } catch (error) {
      event.locals.user = null;
    }
  } else {
    event.locals.user = null;
  }

  return resolve(event);
};

const paraglideHandle: Handle = ({ event, resolve }) =>
  paraglideMiddleware(event.request, ({ request: localizedRequest, locale }) => {
    event.request = localizedRequest;
    return resolve(event, {
      transformPageChunk: ({ html }) => {
        return html.replace("%lang%", locale);
      }
    });
  });

export const handle: Handle = sequence(authHandle, paraglideHandle);
