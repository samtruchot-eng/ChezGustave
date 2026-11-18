import { createHash, randomBytes } from "node:crypto";
import { prisma } from "./prisma";

/** Durée de validité d'un lien de réinitialisation. */
export const RESET_TOKEN_TTL_MINUTES = 60;

/** Nombre maximal de liens demandés par compte sur une heure glissante. */
const MAX_REQUESTS_PER_HOUR = 3;

export function hashResetToken(token: string): string {
  return createHash("sha256").update(token).digest("hex");
}

/**
 * Crée un jeton de réinitialisation pour ce compte et renvoie sa valeur en
 * clair (à mettre dans l'e-mail), ou null si le compte en a déjà trop demandé.
 */
export async function createPasswordResetToken(
  userId: string
): Promise<string | null> {
  const recent = await prisma.passwordResetToken.count({
    where: { userId, createdAt: { gt: new Date(Date.now() - 60 * 60 * 1000) } },
  });
  if (recent >= MAX_REQUESTS_PER_HOUR) return null;

  const token = randomBytes(32).toString("base64url");
  await prisma.passwordResetToken.create({
    data: {
      userId,
      tokenHash: hashResetToken(token),
      expiresAt: new Date(Date.now() + RESET_TOKEN_TTL_MINUTES * 60 * 1000),
    },
  });
  return token;
}

/** Renvoie le jeton s'il existe, n'a jamais servi et n'a pas expiré. */
export async function findValidResetToken(token: string) {
  if (!token) return null;
  const record = await prisma.passwordResetToken.findUnique({
    where: { tokenHash: hashResetToken(token) },
  });
  if (!record || record.usedAt || record.expiresAt < new Date()) return null;
  return record;
}
