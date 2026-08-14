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

/** CHF (entier) → plus petite unité Stripe (centimes/rappen). */
export function toStripeAmount(chf: number): number {
  return Math.round(chf * 100);
}

/**
 * Récupère (ou crée) le compte Stripe Connect « Express » du gardien.
 * Le compte reçoit les virements (transfers) ; la plateforme encaisse.
 * Retourne l'identifiant de compte, ou null si Stripe n'est pas configuré.
 */
export async function getOrCreateConnectedAccount(params: {
  existingAccountId: string | null;
  userId: string;
  email?: string | null;
}): Promise<string | null> {
  const stripe = getStripe();
  if (!stripe) return null;
  if (params.existingAccountId) return params.existingAccountId;

  const account = await stripe.accounts.create({
    type: "express",
    country: "CH",
    email: params.email ?? undefined,
    business_type: "individual",
    capabilities: { transfers: { requested: true } },
    metadata: { userId: params.userId },
  });
  return account.id;
}

/** Lien d'onboarding Stripe (le gardien complète ses informations). */
export async function createAccountOnboardingLink(
  accountId: string,
  opts: { returnUrl: string; refreshUrl: string }
): Promise<string | null> {
  const stripe = getStripe();
  if (!stripe) return null;
  const link = await stripe.accountLinks.create({
    account: accountId,
    type: "account_onboarding",
    return_url: opts.returnUrl,
    refresh_url: opts.refreshUrl,
  });
  return link.url;
}

/** Le compte connecté est-il prêt à recevoir des versements ? */
export async function isAccountReady(accountId: string): Promise<boolean> {
  const stripe = getStripe();
  if (!stripe) return false;
  const account = await stripe.accounts.retrieve(accountId);
  return (
    !!account.details_submitted &&
    !!account.payouts_enabled &&
    account.capabilities?.transfers === "active"
  );
}

/**
 * Crée une session Stripe Checkout pour régler une garde.
 * Charge à destination : la commission est prélevée pour la plateforme,
 * le reste est viré au compte connecté du gardien.
 */
export async function createBookingCheckoutSession(params: {
  bookingId: string;
  amountChf: number;
  commissionChf: number;
  sitterAccountId: string;
  productName: string;
  productDescription: string;
  ownerEmail?: string | null;
  successUrl: string;
  cancelUrl: string;
}): Promise<{ id: string; url: string | null } | null> {
  const stripe = getStripe();
  if (!stripe) return null;

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    client_reference_id: params.bookingId,
    customer_email: params.ownerEmail ?? undefined,
    line_items: [
      {
        quantity: 1,
        price_data: {
          currency: "chf",
          unit_amount: toStripeAmount(params.amountChf),
          product_data: {
            name: params.productName,
            description: params.productDescription,
          },
        },
      },
    ],
    payment_intent_data: {
      application_fee_amount: toStripeAmount(params.commissionChf),
      transfer_data: { destination: params.sitterAccountId },
      metadata: { bookingId: params.bookingId },
    },
    metadata: { bookingId: params.bookingId },
    success_url: params.successUrl,
    cancel_url: params.cancelUrl,
  });

  return { id: session.id, url: session.url };
}

/** Récupère une session Checkout (pour réconcilier au retour). */
export async function retrieveCheckoutSession(
  sessionId: string
): Promise<Stripe.Checkout.Session | null> {
  const stripe = getStripe();
  if (!stripe) return null;
  return stripe.checkout.sessions.retrieve(sessionId);
}

/** Vérifie et construit l'événement webhook depuis la charge brute. */
export function constructWebhookEvent(
  payload: string | Buffer,
  signature: string
): Stripe.Event | null {
  const stripe = getStripe();
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!stripe || !secret) return null;
  return stripe.webhooks.constructEvent(payload, signature, secret);
}
