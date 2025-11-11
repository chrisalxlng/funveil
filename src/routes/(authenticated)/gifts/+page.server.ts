import type { Gift, Pagination } from "$lib/entities";
import { redirect, fail, type Actions } from "@sveltejs/kit";
import {
  PAGE_QUERY_PARAM_KEY,
  PAGE_SIZE,
  STATUS_QUERY_PARAM_KEY,
  type TabItemStatus
} from "./definitions";
import { isNil } from "lodash-es";
import { db } from "$lib/server/db";
import { gifts } from "$lib/server/db/schema";
import { eq, and, isNull, isNotNull, count, asc } from "drizzle-orm";
import z from "zod";
import { GIFT_ID_SCHEMA } from "$lib/entities/Gift/constants";

export const load = async ({ url, locals }) => {
  if (!locals.user) {
    throw redirect(302, "/auth/login");
  }

  const status = (url.searchParams.get(STATUS_QUERY_PARAM_KEY) as TabItemStatus) || "pending";
  const pageString = url.searchParams.get("page") || "1";
  const currentPage = Math.max(1, parseInt(pageString) || 1);

  if (!url.searchParams.has(STATUS_QUERY_PARAM_KEY)) {
    const newUrl = new URL(url);
    newUrl.searchParams.set(STATUS_QUERY_PARAM_KEY, "pending");
    throw redirect(302, newUrl.pathname + newUrl.search);
  }

  if (!url.searchParams.has(PAGE_QUERY_PARAM_KEY)) {
    const newUrl = new URL(url);
    newUrl.searchParams.set(PAGE_QUERY_PARAM_KEY, "1");
    throw redirect(302, newUrl.pathname + newUrl.search);
  }

  const userFilter = eq(gifts.ownerUserId, locals.user.id);
  const statusFilter = status === "opened" ? isNotNull(gifts.openedAt) : isNull(gifts.openedAt);
  const whereClause = and(userFilter, statusFilter);

  const [totalCountResult, dbGifts] = await Promise.all([
    db.select({ value: count() }).from(gifts).where(whereClause),
    db.query.gifts.findMany({
      where: whereClause,
      orderBy: [asc(gifts.releasedAt)],
      limit: PAGE_SIZE,
      offset: (currentPage - 1) * PAGE_SIZE
    })
  ]);

  const totalCount = totalCountResult[0].value;
  const totalPages = Math.ceil(totalCount / PAGE_SIZE);

  const mappedGifts: Gift.QueryResponse[] = dbGifts.map((dbGift) => ({
    ...dbGift,
    releasedAt: dbGift.releasedAt.toISOString(),
    openedAt: dbGift.openedAt?.toISOString() ?? null,
    createdAt: dbGift.createdAt.toISOString()
  }));

  const pagination: Pagination.Info = {
    currentPage,
    totalPages,
    totalCount,
    hasNextPage: currentPage < totalPages,
    hasPrevPage: currentPage > 1
  };

  return {
    user: locals.user,
    gifts: mappedGifts,
    pagination
  };
};

export const actions = {
  upsert: async ({ request, locals }) => {
    if (!locals.user) return fail(401, { message: "Unauthorized" });

    if (isNil(locals.user.given_name)) {
      return fail(403, { message: "Forbidden: Profile incomplete" });
    }

    const giftSchema = z.object({
      giftId: z.string().min(1, "Missing giftId"),
      recipient: z.string().min(1, "Missing recipient"),
      title: z.string().min(1, "Missing title"),
      fileId: z.string().min(1, "Missing fileId"),
      releasedAt: z.iso.datetime("Wrong format for releasedAt")
    });

    const formData = Object.fromEntries(await request.formData());
    const result = giftSchema.safeParse(formData);

    if (!result.success) {
      const errors = z.treeifyError(result.error);
      return fail(400, { errors, values: formData });
    }

    const { releasedAt, giftId, recipient, title, fileId } = result.data;
    const releasedAtDate = new Date(releasedAt);

    const values = {
      giftId,
      ownerUserId: locals.user.id,
      ownerUserName: locals.user.name,
      recipient,
      title,
      fileId,
      releasedAt: releasedAtDate
    };

    try {
      const existingGifts = await db
        .select()
        .from(gifts)
        .where(and(eq(gifts.giftId, giftId), eq(gifts.ownerUserId, locals.user.id)))
        .limit(1);

      const existingGift = existingGifts.at(0);

      if (isNil(existingGift)) {
        await db.insert(gifts).values(values);
      } else {
        await db
          .update(gifts)
          .set(values)
          .where(and(eq(gifts.giftId, giftId), eq(gifts.ownerUserId, locals.user.id)));
      }
      return { success: true };
    } catch (error) {
      console.error(error);
      return fail(500, { message: "Database operation failed" });
    }
  },

  delete: async ({ request, locals }) => {
    if (!locals.user) return fail(401, { message: "Unauthorized" });

    const formData = Object.fromEntries(await request.formData());
    const result = GIFT_ID_SCHEMA.safeParse(formData);

    if (!result.success) {
      const errors = z.treeifyError(result.error);
      return fail(400, { errors });
    }

    const { giftId } = result.data;

    try {
      await db
        .delete(gifts)
        .where(and(eq(gifts.giftId, giftId), eq(gifts.ownerUserId, locals.user.id)));

      return { success: true };
    } catch (error) {
      console.error(error);
      return fail(500, { message: "Database operation failed" });
    }
  },

  markUnopened: async ({ request, locals }) => {
    if (!locals.user) return fail(401, { message: "Unauthorized" });

    const formData = Object.fromEntries(await request.formData());
    const result = GIFT_ID_SCHEMA.safeParse(formData);

    if (!result.success) {
      const errors = z.treeifyError(result.error);
      return fail(400, { errors });
    }

    const { giftId } = result.data;

    try {
      await db
        .update(gifts)
        .set({ openedAt: null })
        .where(and(eq(gifts.giftId, giftId), eq(gifts.ownerUserId, locals.user.id)));

      return { success: true };
    } catch (error) {
      console.error(error);
      return fail(500, { message: "Database operation failed" });
    }
  }
} satisfies Actions;
