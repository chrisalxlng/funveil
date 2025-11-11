import { env } from "$env/dynamic/private";
import { env as publicEnv } from "$env/dynamic/public";
import jwt from "jsonwebtoken";

const TTL_SECONDS = 60;

export const createFileAccessToken = (ownerUserId: string, fileId: string): string => {
  const secret = env.STASH_FILE_ACCESS_SECRET;

  const payload = {
    ownerUserId,
    clientId: publicEnv.PUBLIC_KEYCLOAK_CLIENT_ID,
    fileId
  };

  return jwt.sign(payload, secret, {
    expiresIn: TTL_SECONDS
  });
};
