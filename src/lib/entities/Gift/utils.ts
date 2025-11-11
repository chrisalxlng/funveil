import { defaults } from "lodash-es";
import type { FormValues } from "./types";

export const getFormValues = (initial: Partial<FormValues>): FormValues =>
  defaults(initial, {
    giftId: "",
    title: "",
    recipient: "",
    releasedAt: "",
    fileUrl: "",
    fileName: "",
    fileId: "",
    isFileUploaded: false
  });
