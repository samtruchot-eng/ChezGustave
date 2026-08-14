"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/session";
import {
  appBaseUrl,
  createAccountOnboardingLink,
  getOrCreateConnectedAccount,
  isAccountReady,
  isStripeConfigured,
} from "@/lib/stripe";

/**
 * Démarre (ou reprend) l'onboarding Stripe Connect du gardien,
 * puis redirige vers le formulaire hébergé par Stripe.
 */
export async function startSitterOnboarding() {
  const me = await requireUser();
  if (!isStripeConfigured()) redirect("/profil/paiements");

  const profile = await prisma.sitterProfile.findUnique({
    where: { userId: me.id },
  });
  if (!profile) redirect("/profil");

  const accountId = await getOrCreateConnectedAccount({
    existingAccountId: profile.stripeAccountId,
    userId: me.id,
    email: me.email,
  });
  if (!accountId) redirect("/profil/paiements");

  if (accountId !== profile.stripeAccountId) {
    await prisma.sitterProfile.update({
      where: { userId: me.id },
      data: { stripeAccountId: accountId },
    });
  }

  const url = await createAccountOnboardingLink(accountId, {
    returnUrl: `${appBaseUrl()}/profil/paiements?onboarding=done`,
    refreshUrl: `${appBaseUrl()}/profil/paiements?onboarding=refresh`,
  });
  if (!url) redirect("/profil/paiements");
  redirect(url);
}

/**
 * Rafraîchit le statut du compte connecté depuis Stripe et le persiste.
 * Appelé au retour de l'onboarding (et via un bouton « Actualiser »).
 */
export async function refreshSitterPaymentStatus() {
  const me = await requireUser();
  if (!isStripeConfigured()) return;

  const profile = await prisma.sitterProfile.findUnique({
    where: { userId: me.id },
  });
  if (!profile?.stripeAccountId) return;

  const ready = await isAccountReady(profile.stripeAccountId);
  if (ready !== profile.stripeChargesEnabled) {
    await prisma.sitterProfile.update({
      where: { userId: me.id },
      data: { stripeChargesEnabled: ready },
    });
  }
  revalidatePath("/profil/paiements");
}
