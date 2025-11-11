import type { LayoutServerLoad } from "./$types";

export const load: LayoutServerLoad = ({ locals, cookies }) => {
  const token = cookies.get("session_token");

  return {
    user: locals.user,
    token: token ?? null
  };
};
