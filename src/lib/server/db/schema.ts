import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

export const gifts = pgTable("gifts", {
  giftId: uuid("gift_id").primaryKey(),
  ownerUserId: text("owner_user_id").notNull(),
  ownerUserName: text("owner_user_name").notNull(),
  recipient: text("recipient").notNull(),
  title: text("title").notNull(),
  fileId: text("file_id").notNull(),
  releasedAt: timestamp("released_at", { withTimezone: true }).notNull(),
  openedAt: timestamp("opened_at", { withTimezone: true }),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  expiresAt: timestamp("expires_at", { withTimezone: true })
});
