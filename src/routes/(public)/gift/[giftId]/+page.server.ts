import { getMsUntil, isFuture, type Gift } from "$lib";
import { error, fail, type Actions } from "@sveltejs/kit";
import { createFileAccessToken } from "../../../token.server";
import { isNil, pick } from "lodash-es";
import { GIFT_ID_SCHEMA } from "$lib/entities/Gift/constants";
import z from "zod";
import { db } from "$lib/server/db";
import { gifts } from "$lib/server/db/schema";
import { eq } from "drizzle-orm";

type LoadData = {
  msUntilRelease: number;
} & (Gift.Locked | Gift.Revealed);

const BUFFER_MS = 100;

export const load = async ({ depends, params }): Promise<LoadData> => {
  const { giftId } = params;

  depends("gift:status");

  const result = await db.select().from(gifts).where(eq(gifts.giftId, giftId)).limit(1);

  const dbGift = result.at(0);

  if (isNil(dbGift)) {
    throw error(404, "Gift not found");
  }

  const gift: Gift.QueryResponse = {
    ...dbGift,
    releasedAt: dbGift.releasedAt.toISOString(),
    openedAt: dbGift.openedAt?.toISOString() ?? null,
    createdAt: dbGift.createdAt.toISOString()
  };

  const isLocked = isFuture(gift.releasedAt);

  if (isLocked) {
    return {
      revealed: false,
      msUntilRelease: getMsUntil(gift.releasedAt) + BUFFER_MS,
      gift: pick(gift, ["releasedAt", "ownerUserName"])
    };
  }

  return {
    revealed: true,
    msUntilRelease: 0,
    gift: gift
  };
};

export const actions = {
  getFreshToken: async ({ params }) => {
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
  },

  markAsOpened: async ({ params }) => {
    const { giftId } = params;
    if (isNil(giftId)) return fail(400, { message: "giftId not found" });

    const openedAtDate = new Date();

    try {
      await db.update(gifts).set({ openedAt: openedAtDate }).where(eq(gifts.giftId, giftId));

      return { success: true };
    } catch (error) {
      console.error(error);
      return fail(500, { message: "Database operation failed" });
    }
  }
} satisfies Actions;
