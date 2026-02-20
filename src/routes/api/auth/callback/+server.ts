import { redirect, type RequestHandler } from "@sveltejs/kit";
import { env } from "$env/dynamic/private";
import { env as publicEnv } from "$env/dynamic/public";

export const GET: RequestHandler = async ({ url, cookies }) => {
  const code = url.searchParams.get("code");
  if (!code) throw redirect(302, "/");

  const callbackUrl = `${url.origin}/api/auth/callback`;

  const keycloakSecret = env.KEYCLOAK_CLIENT_SECRET;

  const response = await fetch(
    `${publicEnv.PUBLIC_KEYCLOAK_INTERNAL_URL}/realms/${publicEnv.PUBLIC_KEYCLOAK_REALM}/protocol/openid-connect/token`,
    {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        grant_type: "authorization_code",
        code,
        redirect_uri: callbackUrl,
        client_id: publicEnv.PUBLIC_KEYCLOAK_CLIENT_ID!,
        client_secret: keycloakSecret!
      })
    }
  );

  const tokens = await response.json();

  if (tokens.access_token) {
    cookies.set("session_token", tokens.access_token, {
      path: "/",
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      maxAge: 60 * 60 * 24
    });

    if (tokens.refresh_token) {
      cookies.set("refresh_token", tokens.refresh_token, {
        path: "/",
        httpOnly: true,
        secure: true,
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 7
      });
    }

    if (tokens.id_token) {
      cookies.set("id_token", tokens.id_token, {
        path: "/",
        httpOnly: true,
        secure: true,
        sameSite: "lax",
        maxAge: 60 * 60 * 24
      });
    }
  }

  throw redirect(302, "/gifts");
};
