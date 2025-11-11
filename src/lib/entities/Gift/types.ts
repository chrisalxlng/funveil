type BaseValues = {
  giftId: string;
  title: string;
  recipient: string;
  releasedAt: string;
};

export type QueryResponse = BaseValues & {
  fileId: string;
  ownerUserId: string;
  ownerUserName: string;
  openedAt: string | null;
  createdAt: string;
};

export type MutationPayload = BaseValues & {
  fileId: string;
};

export type FormValues = BaseValues & {
  fileUrl: string;
  fileName: string;
  fileId: string;
  isFileUploaded: boolean;
};

export type LockedQueryResponse = Pick<QueryResponse, "releasedAt" | "ownerUserName">;

export type Locked = {
  revealed: false;
  gift: LockedQueryResponse;
};

export type Revealed = {
  revealed: true;
  gift: QueryResponse;
};
