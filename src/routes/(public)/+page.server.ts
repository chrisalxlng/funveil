import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import { isNil } from "lodash-es";

export const load: PageServerLoad = async ({ locals, cookies }) => {
  const session = locals.user;

  if (!isNil(session)) {
    throw redirect(302, "/gifts");
  }

  return {
    session
  };
};
