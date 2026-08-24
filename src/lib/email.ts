import { prisma } from "./prisma";

/** Les emails transactionnels sont-ils configurés ? (clé Brevo présente) */
export function isEmailConfigured(): boolean {
  return !!process.env.BREVO_API_KEY;
}

function baseUrl(): string {
  return (
    process.env.NEXTAUTH_URL ??
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : null) ??
    "http://localhost:3000"
  );
}

/**
 * Envoie un email transactionnel via l'API Brevo.
 * Ne lève jamais : renvoie false si non configuré ou en cas d'erreur.
 */
export async function sendEmail(params: {
  to: string;
  toName?: string | null;
  subject: string;
  html: string;
  text?: string;
}): Promise<boolean> {
  const key = process.env.BREVO_API_KEY;
  if (!key) return false;

  const senderEmail = process.env.BREVO_SENDER_EMAIL ?? "no-reply@chezgustave.ch";
  const senderName = process.env.BREVO_SENDER_NAME ?? "Chez Gustave";

  try {
    const res = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        "api-key": key,
        "content-type": "application/json",
        accept: "application/json",
      },
      body: JSON.stringify({
        sender: { email: senderEmail, name: senderName },
        to: [{ email: params.to, name: params.toName ?? undefined }],
        subject: params.subject,
        htmlContent: params.html,
        ...(params.text ? { textContent: params.text } : {}),
      }),
    });
    return res.ok;
  } catch {
    return false;
  }
}

/** Gabarit d'email « Chez Gustave » (HTML avec styles en ligne). */
export function renderBrandedEmail(params: {
  heading: string;
  intro?: string;
  bodyLines?: string[];
  ctaText?: string;
  ctaPath?: string;
}): string {
  const { heading, intro, bodyLines = [], ctaText, ctaPath } = params;
  const url = ctaPath ? `${baseUrl()}${ctaPath}` : null;

  const body = bodyLines
    .map(
      (l) =>
        `<p style="margin:0 0 12px;color:#5b5347;font-size:15px;line-height:1.6">${l}</p>`
    )
    .join("");

  const cta =
    ctaText && url
      ? `<a href="${url}" style="display:inline-block;margin-top:8px;background:#c0562a;color:#f7f0e4;text-decoration:none;font-weight:600;font-size:15px;padding:12px 22px;border-radius:999px">${ctaText}</a>`
      : "";

  return `<!doctype html>
<html lang="fr"><body style="margin:0;background:#efe6d6;font-family:'Segoe UI',Roboto,Helvetica,Arial,sans-serif">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#efe6d6;padding:28px 12px">
    <tr><td align="center">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:520px;background:#f7f0e4;border-radius:20px;overflow:hidden;border:1px solid #e3d6bf">
        <tr><td style="background:#c0562a;padding:20px 28px">
          <span style="color:#f7f0e4;font-size:18px;font-weight:700;letter-spacing:.3px">🐾 Chez Gustave</span>
        </td></tr>
        <tr><td style="padding:28px">
          <h1 style="margin:0 0 14px;color:#2e2620;font-size:21px;line-height:1.3">${heading}</h1>
          ${intro ? `<p style="margin:0 0 14px;color:#2e2620;font-size:16px;line-height:1.6">${intro}</p>` : ""}
          ${body}
          ${cta}
        </td></tr>
        <tr><td style="padding:18px 28px;border-top:1px solid #ece0cb">
          <p style="margin:0;color:#8a7e6d;font-size:12px;line-height:1.5">
            Chez Gustave · Garde de chien à domicile · Genève et sa région<br/>
            Vous recevez cet email suite à une activité sur votre compte.
          </p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body></html>`;
}

/**
 * Envoie un email à un utilisateur (par son id) à partir d'un gabarit.
 * Silencieux : ne bloque et ne casse jamais le flux appelant.
 */
export async function sendUserEmail(
  userId: string,
  params: {
    subject: string;
    heading: string;
    intro?: string;
    bodyLines?: string[];
    ctaText?: string;
    ctaPath?: string;
  }
): Promise<void> {
  try {
    if (!isEmailConfigured()) return;
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { email: true, name: true },
    });
    if (!user?.email) return;

    await sendEmail({
      to: user.email,
      toName: user.name,
      subject: params.subject,
      html: renderBrandedEmail(params),
    });
  } catch {
    // On avale toute erreur : un email raté ne doit jamais casser une action.
  }
}
