import { redirect, type RequestHandler } from "@sveltejs/kit";
import { env } from "$env/dynamic/public";

export const GET: RequestHandler = async ({ params, url, cookies }) => {
  const { action } = params;

  if (action === "login") {
    const callbackUrl = `${url.origin}/api/auth/callback`;
    const loginTarget = `${env.PUBLIC_KEYCLOAK_EXTERNAL_URL}/realms/${env.PUBLIC_KEYCLOAK_REALM}/protocol/openid-connect/auth?client_id=${env.PUBLIC_KEYCLOAK_CLIENT_ID}&redirect_uri=${encodeURIComponent(callbackUrl)}&response_type=code&scope=openid%20profile%20email`;
    throw redirect(302, loginTarget);
  }

  if (action === "logout") {
    const idTokenHint = cookies.get("id_token");

    cookies.delete("session_token", { path: "/" });
    cookies.delete("refresh_token", { path: "/" });
    cookies.delete("id_token", { path: "/" });

    const logoutTarget = new URL(
      `${env.PUBLIC_KEYCLOAK_EXTERNAL_URL}/realms/${env.PUBLIC_KEYCLOAK_REALM}/protocol/openid-connect/logout`
    );

    logoutTarget.searchParams.set("client_id", env.PUBLIC_KEYCLOAK_CLIENT_ID);
    logoutTarget.searchParams.set("post_logout_redirect_uri", url.origin);

    if (idTokenHint) {
      logoutTarget.searchParams.set("id_token_hint", idTokenHint);
    }

    throw redirect(302, logoutTarget.toString());
  }

  throw redirect(302, "/");
};
