"use server";

import { redirect } from "next/navigation";
import { after } from "next/server";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { sendUserEmail } from "@/lib/email";
import { findValidResetToken } from "@/lib/password-reset";

const schema = z.object({
  token: z.string().min(1),
  password: z
    .string()
    .min(6, "Le mot de passe doit faire au moins 6 caractères."),
  confirm: z.string().min(1, "Confirmez le nouveau mot de passe."),
});

export async function resetPassword(
  _prev: string | undefined,
  formData: FormData
): Promise<string | undefined> {
  const parsed = schema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) {
    return parsed.error.issues[0]?.message ?? "Formulaire invalide.";
  }
  const { token, password, confirm } = parsed.data;

  if (password !== confirm) {
    return "Les deux mots de passe ne correspondent pas.";
  }

  const record = await findValidResetToken(token);
  if (!record) {
    return "Ce lien n'est plus valable. Demandez-en un nouveau depuis la page de connexion.";
  }

  const passwordHash = await bcrypt.hash(password, 10);
  const now = new Date();

  // Le jeton n'est consommé que s'il est encore libre au moment d'écrire :
  // deux envois simultanés du même lien ne peuvent pas passer tous les deux.
  const changed = await prisma.$transaction(async (tx) => {
    const claimed = await tx.passwordResetToken.updateMany({
      where: { id: record.id, usedAt: null, expiresAt: { gt: now } },
      data: { usedAt: now },
    });
    if (claimed.count !== 1) return false;

    await tx.user.update({
      where: { id: record.userId },
      data: { passwordHash },
    });
    await tx.passwordResetToken.deleteMany({
      where: { userId: record.userId, id: { not: record.id } },
    });
    return true;
  });

  if (!changed) {
    return "Ce lien n'est plus valable. Demandez-en un nouveau depuis la page de connexion.";
  }

  after(() =>
    sendUserEmail(record.userId, {
      subject: "Votre mot de passe Chez Gustave a été modifié",
      heading: "Mot de passe modifié",
      intro: "Le mot de passe de votre compte Chez Gustave vient d'être changé.",
      bodyLines: [
        "Si ce n'est pas vous, demandez tout de suite un nouveau lien depuis la page de connexion, puis écrivez-nous.",
      ],
      ctaText: "Se connecter",
      ctaPath: "/connexion",
    })
  );

  redirect("/connexion?reinitialise=1");
}
