"use server";

import {
  contactSchema,
  type ContactFieldErrors,
  type ContactState,
} from "@/lib/contact";

/**
 * Traite le formulaire de contact.
 *
 * Sans base de données : la demande est transmise au webhook défini par
 * `CONTACT_WEBHOOK_URL` (Make, Zapier, n8n, Slack, un service d'envoi
 * d'e-mail…). Si la variable n'est pas définie, la demande est uniquement
 * journalisée côté serveur — pratique en développement, à brancher avant la
 * mise en ligne.
 */
export async function submitContact(
  _previous: ContactState,
  formData: FormData,
): Promise<ContactState> {
  // Piège à robots : ce champ est masqué, un humain ne le remplit jamais.
  const honeypot = formData.get("site");
  if (typeof honeypot === "string" && honeypot.trim() !== "") {
    return { status: "success", message: "Merci, votre message est parti." };
  }

  const parsed = contactSchema.safeParse({
    name: formData.get("name") ?? "",
    email: formData.get("email") ?? "",
    company: formData.get("company") || undefined,
    phone: formData.get("phone") || undefined,
    subject: formData.get("subject") ?? "",
    budget: formData.get("budget") || undefined,
    message: formData.get("message") ?? "",
    consent: formData.get("consent") ?? "",
  });

  if (!parsed.success) {
    const errors: ContactFieldErrors = {};
    for (const issue of parsed.error.issues) {
      const field = issue.path[0] as keyof ContactFieldErrors;
      if (field && !errors[field]) errors[field] = issue.message;
    }
    return {
      status: "error",
      message: "Le formulaire comporte des erreurs. Merci de les corriger.",
      errors,
    };
  }

  const payload = { ...parsed.data, receivedAt: new Date().toISOString() };
  const webhook = process.env.CONTACT_WEBHOOK_URL;

  if (!webhook) {
    console.warn(
      "[contact] CONTACT_WEBHOOK_URL n'est pas définie — la demande n'a été transmise à personne.",
      payload,
    );
    return {
      status: "success",
      message:
        "Merci, votre message a bien été reçu. Nous revenons vers vous sous un jour ouvrable.",
    };
  }

  try {
    const response = await fetch(webhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`Webhook HTTP ${response.status}`);
    }
  } catch (error) {
    console.error("[contact] Transmission impossible :", error);
    return {
      status: "error",
      message:
        "L'envoi a échoué de notre côté. Merci de réessayer, ou de nous écrire directement par e-mail.",
    };
  }

  return {
    status: "success",
    message:
      "Merci, votre message a bien été reçu. Nous revenons vers vous sous un jour ouvrable.",
  };
}
