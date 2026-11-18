"use server";

import bcrypt from "bcryptjs";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/session";

export type ChangePasswordResult = { ok: boolean; message: string };

const schema = z.object({
  current: z.string().min(1, "Entrez votre mot de passe actuel."),
  password: z
    .string()
    .min(6, "Le nouveau mot de passe doit faire au moins 6 caractères."),
  confirm: z.string().min(1, "Confirmez le nouveau mot de passe."),
});

/** Change le mot de passe de l'utilisateur connecté (après vérification). */
export async function changePassword(
  _prev: ChangePasswordResult | undefined,
  formData: FormData
): Promise<ChangePasswordResult> {
  const me = await requireUser();

  const parsed = schema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) {
    return { ok: false, message: parsed.error.issues[0]?.message ?? "Formulaire invalide." };
  }
  const { current, password, confirm } = parsed.data;

  if (password !== confirm) {
    return { ok: false, message: "Les deux nouveaux mots de passe ne correspondent pas." };
  }

  const user = await prisma.user.findUnique({
    where: { id: me.id },
    select: { passwordHash: true },
  });
  if (!user?.passwordHash) {
    return { ok: false, message: "Impossible de vérifier votre mot de passe actuel." };
  }

  const valid = await bcrypt.compare(current, user.passwordHash);
  if (!valid) {
    return { ok: false, message: "Mot de passe actuel incorrect." };
  }

  if (await bcrypt.compare(password, user.passwordHash)) {
    return { ok: false, message: "Choisissez un mot de passe différent de l'ancien." };
  }

  const passwordHash = await bcrypt.hash(password, 10);
  await prisma.user.update({
    where: { id: me.id },
    data: { passwordHash },
  });

  return { ok: true, message: "Mot de passe mis à jour ✅" };
}
