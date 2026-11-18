"use server";

import { after } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { isEmailConfigured, renderBrandedEmail, sendEmail } from "@/lib/email";
import {
  createPasswordResetToken,
  RESET_TOKEN_TTL_MINUTES,
} from "@/lib/password-reset";

export type ForgotPasswordResult = { ok: boolean; message: string };

const SENT_MESSAGE =
  "Si un compte existe avec cet e-mail, un lien pour choisir un nouveau mot de passe vient de lui être envoyé. Pensez à regarder dans vos courriers indésirables.";

export async function requestPasswordReset(
  _prev: ForgotPasswordResult | undefined,
  formData: FormData
): Promise<ForgotPasswordResult> {
  const parsed = z
    .string()
    .trim()
    .email()
    .safeParse(formData.get("email"));
  if (!parsed.success) {
    return { ok: false, message: "Merci de saisir une adresse e-mail valide." };
  }

  if (!isEmailConfigured()) {
    return {
      ok: false,
      message:
        "L'envoi d'e-mails n'est pas disponible pour le moment. Réessayez plus tard.",
    };
  }

  const email = parsed.data.toLowerCase();

  // La recherche du compte et l'envoi se font après la réponse : celle-ci est
  // identique, en contenu comme en délai, que le compte existe ou non.
  after(async () => {
    try {
      const user = await prisma.user.findUnique({
        where: { email },
        select: { id: true, name: true, passwordHash: true },
      });
      if (!user?.passwordHash) return;

      const token = await createPasswordResetToken(user.id);
      if (!token) return;

      const firstName = user.name?.trim().split(/\s+/)[0];
      await sendEmail({
        to: email,
        toName: user.name,
        subject: "Votre nouveau mot de passe Chez Gustave",
        html: renderBrandedEmail({
          heading: firstName ? `Bonjour ${firstName},` : "Bonjour,",
          intro:
            "Vous avez demandé à choisir un nouveau mot de passe pour votre compte Chez Gustave.",
          bodyLines: [
            `Ce lien est valable ${RESET_TOKEN_TTL_MINUTES} minutes et ne peut servir qu'une fois.`,
            "Si vous n'êtes pas à l'origine de cette demande, ignorez cet e-mail : votre mot de passe reste inchangé.",
          ],
          ctaText: "Choisir un nouveau mot de passe",
          ctaPath: `/reinitialiser-mot-de-passe?token=${token}`,
        }),
      });
    } catch {
      // Un échec d'envoi ne doit rien révéler ni casser la page.
    }
  });

  return { ok: true, message: SENT_MESSAGE };
}
