import { error, redirect, type RequestHandler } from "@sveltejs/kit";
import { env as publicEnv } from "$env/dynamic/public";
import { env } from "$env/dynamic/private";

export const GET: RequestHandler = async ({ params, url, cookies }) => {
  const { action } = params;

  if (action === "login") {
    const callbackUrl = `${url.origin}/api/auth/callback`;
    const loginTarget = `${publicEnv.PUBLIC_KEYCLOAK_EXTERNAL_URL}/realms/${publicEnv.PUBLIC_KEYCLOAK_REALM}/protocol/openid-connect/auth?client_id=${publicEnv.PUBLIC_KEYCLOAK_CLIENT_ID}&redirect_uri=${encodeURIComponent(callbackUrl)}&response_type=code&scope=openid%20profile%20email`;
    throw redirect(302, loginTarget);
  }

  if (action === "logout") {
    const idTokenHint = cookies.get("id_token");

    cookies.delete("session_token", { path: "/" });
    cookies.delete("refresh_token", { path: "/" });
    cookies.delete("id_token", { path: "/" });

    const logoutTarget = new URL(
      `${publicEnv.PUBLIC_KEYCLOAK_EXTERNAL_URL}/realms/${publicEnv.PUBLIC_KEYCLOAK_REALM}/protocol/openid-connect/logout`
    );

    logoutTarget.searchParams.set("client_id", publicEnv.PUBLIC_KEYCLOAK_CLIENT_ID!);
    logoutTarget.searchParams.set("post_logout_redirect_uri", url.origin);

    if (idTokenHint) {
      logoutTarget.searchParams.set("id_token_hint", idTokenHint);
    }

    throw redirect(302, logoutTarget.toString());
  }

  if (action === "demo") {
    const response = await fetch(
      `${publicEnv.PUBLIC_KEYCLOAK_EXTERNAL_URL}/realms/${publicEnv.PUBLIC_KEYCLOAK_REALM}/protocol/openid-connect/token`,
      {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          grant_type: "password",
          username: publicEnv.PUBLIC_KEYCLOAK_DEMO_USER_EMAIL!,
          password: env.KEYCLOAK_DEMO_USER_PASSWORD!,
          client_id: publicEnv.PUBLIC_KEYCLOAK_CLIENT_ID!,
          client_secret: env.KEYCLOAK_CLIENT_SECRET!,
          scope: "openid profile email"
        })
      }
    );

    const tokens = await response.json();

    if (tokens.access_token) {
      const cookieOptions = {
        path: "/",
        httpOnly: true,
        secure: true,
        sameSite: "lax" as const,
        maxAge: 60 * 60 * 24
      };

      cookies.set("session_token", tokens.access_token, cookieOptions);
      if (tokens.refresh_token) {
        cookies.set("refresh_token", tokens.refresh_token, {
          ...cookieOptions,
          maxAge: 60 * 60 * 24 * 7
        });
      }
      if (tokens.id_token) {
        cookies.set("id_token", tokens.id_token, cookieOptions);
      }

      throw redirect(302, "/gifts");
    }

    throw error(500, {
      message: "Demo login failed"
    });
  }

  throw redirect(302, "/");
};
