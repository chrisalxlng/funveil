import z from "zod";

export const GIFT_ID_SCHEMA = z.object({
  giftId: z.uuid().min(1, "Missing giftId")
});
