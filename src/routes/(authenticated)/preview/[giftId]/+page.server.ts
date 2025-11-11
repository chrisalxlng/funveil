import { type Gift } from "$lib";
import { redirect } from "@sveltejs/kit";
import { db } from "$lib/server/db";
import { gifts } from "$lib/server/db/schema";
import { eq, and } from "drizzle-orm";
import { error, fail, type Actions } from "@sveltejs/kit";
import { createFileAccessToken } from "../../../token.server";
import { isNil } from "lodash-es";
import { isFuture } from "$lib";

type LoadData = {
  msUntilRelease: number;
} & (Gift.Locked | Gift.Revealed);

export const load = async ({ depends, params, locals }): Promise<LoadData> => {
  if (!locals.user) {
    throw redirect(302, "/auth/login");
  }

  const { giftId } = params;

  depends("gift:status");

  const result = await db
    .select()
    .from(gifts)
    .where(and(eq(gifts.giftId, giftId), eq(gifts.ownerUserId, locals.user.id)))
    .limit(1);

  const dbGift = result.at(0);

  if (!dbGift) {
    throw error(404, "Gift not found");
  }

  const gift: Gift.QueryResponse = {
    ...dbGift,
    releasedAt: dbGift.releasedAt.toISOString(),
    openedAt: dbGift.openedAt?.toISOString() ?? null,
    createdAt: dbGift.createdAt.toISOString()
  };

  return {
    revealed: true,
    msUntilRelease: 0,
    gift
  };
};

export const actions = {
  getFreshToken: async ({ params, locals }) => {
    if (!locals.user) {
      throw redirect(302, "/auth/login");
    }

    const { giftId } = params;
    if (isNil(giftId)) return fail(403, { message: "giftId not found" });

    const result = await db.select().from(gifts).where(eq(gifts.giftId, giftId)).limit(1);
    const gift = result.at(0);
    if (isNil(gift)) return fail(404, { message: "Gift not found" });

    const releasedAtIso = gift.releasedAt.toISOString();
    if (isFuture(releasedAtIso)) {
      return fail(403, { message: "Gift is still locked" });
    }

    const token = createFileAccessToken(gift.ownerUserId, gift.fileId);
    return { fileAccessToken: token };
  }
} satisfies Actions;
