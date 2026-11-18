/**
 * État des services externes, pour l'espace d'administration.
 * Ne renvoie jamais une clé : seulement ce qu'on peut en déduire.
 */

export type StripeMode = "test" | "live" | "unknown" | "off";

/** Mode de Stripe, lu sur le préfixe de la clé secrète (sk_ ou rk_). */
export function stripeMode(key = process.env.STRIPE_SECRET_KEY): StripeMode {
  if (!key) return "off";
  if (/^[sr]k_test_/.test(key)) return "test";
  if (/^[sr]k_live_/.test(key)) return "live";
  return "unknown";
}

export interface ServiceStatus {
  name: string;
  state: string;
  detail: string;
  tone: "sage" | "gold" | "terracotta" | "neutral";
}

export function serviceStatuses(): ServiceStatus[] {
  const mode = stripeMode();
  const stripe: ServiceStatus = {
    off: {
      name: "Stripe",
      state: "Non configuré",
      detail: "Aucun paiement en ligne n'est possible.",
      tone: "neutral",
    },
    test: {
      name: "Stripe",
      state: "Mode test",
      detail: "Aucun argent réel ne circule : seules les cartes de test fonctionnent.",
      tone: "gold",
    },
    live: {
      name: "Stripe",
      state: "Mode réel",
      detail: "Les paiements et les remboursements portent sur de l'argent réel.",
      tone: "terracotta",
    },
    unknown: {
      name: "Stripe",
      state: "Clé non reconnue",
      detail: "La clé secrète ne commence ni par sk_test_ ni par sk_live_.",
      tone: "terracotta",
    },
  }[mode] as ServiceStatus;

  const webhook: ServiceStatus = process.env.STRIPE_WEBHOOK_SECRET
    ? {
        name: "Webhook Stripe",
        state: "Configuré",
        detail: "Stripe peut confirmer les paiements au site.",
        tone: "sage",
      }
    : {
        name: "Webhook Stripe",
        state: "Absent",
        detail:
          "Un paiement n'est confirmé qu'au retour du propriétaire sur le site.",
        tone: mode === "off" ? "neutral" : "gold",
      };

  const email: ServiceStatus = process.env.BREVO_API_KEY
    ? {
        name: "E-mails (Brevo)",
        state: "Configuré",
        detail: `Expéditeur : ${process.env.BREVO_SENDER_EMAIL ?? "no-reply@chezgustave.ch (valeur par défaut)"}.`,
        tone: "sage",
      }
    : {
        name: "E-mails (Brevo)",
        state: "Non configuré",
        detail: "Aucun e-mail ne part, ni bienvenue ni mot de passe oublié.",
        tone: "terracotta",
      };

  return [stripe, webhook, email];
}
