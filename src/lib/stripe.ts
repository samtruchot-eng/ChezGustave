import Stripe from "stripe";

/** Stripe est-il configuré ? (clé secrète présente) */
export function isStripeConfigured(): boolean {
  return !!process.env.STRIPE_SECRET_KEY;
}

let cached: Stripe | null = null;

/**
 * Client Stripe (ou null si non configuré).
 * Tant qu'aucune clé n'est fournie, l'app fonctionne sans paiement en ligne.
 */
export function getStripe(): Stripe | null {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) return null;
  if (!cached) {
    cached = new Stripe(key, { typescript: true });
  }
  return cached;
}

/** URL publique de l'app (pour les retours Stripe). */
export function appBaseUrl(): string {
  return (
    process.env.NEXTAUTH_URL ??
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : null) ??
    "http://localhost:3000"
  );
}
