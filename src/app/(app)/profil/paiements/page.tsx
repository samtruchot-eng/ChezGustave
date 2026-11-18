import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/session";
import { SubmitButton } from "@/components/ui/SubmitButton";
import { Badge } from "@/components/ui/Badge";
import { IconCheck, IconShield, IconClock } from "@/components/ui/icons";
import { isStripeConfigured, isAccountReady } from "@/lib/stripe";
import { startSitterOnboarding } from "./actions";

export const metadata = { title: "Paiements" };

export default async function PaiementsPage() {
  const me = await requireUser();
  const profile = await prisma.sitterProfile.findUnique({
    where: { userId: me.id },
  });

  // Au retour de l'onboarding, on resynchronise le statut depuis Stripe.
  let chargesEnabled = profile?.stripeChargesEnabled ?? false;
  if (isStripeConfigured() && profile?.stripeAccountId && !chargesEnabled) {
    try {
      const ready = await isAccountReady(profile.stripeAccountId);
      if (ready !== profile.stripeChargesEnabled) {
        await prisma.sitterProfile.update({
          where: { userId: me.id },
          data: { stripeChargesEnabled: ready },
        });
      }
      chargesEnabled = ready;
    } catch {
      // Stripe indisponible : on garde la valeur en base.
    }
  }

  const hasAccount = !!profile?.stripeAccountId;
  const configured = isStripeConfigured();

  return (
    <div className="space-y-5">
      <Link
        href="/profil"
        className="inline-flex items-center gap-1 text-sm text-ink-soft hover:text-brand"
      >
        ← Profil
      </Link>

      <div>
        <h1 className="text-2xl font-bold text-ink">Mes paiements</h1>
        <p className="mt-1 text-sm text-muted">
          Recevez vos gains de garde directement sur votre compte, via Stripe.
        </p>
      </div>

      {!profile ? (
        <section className="card p-5">
          <p className="text-ink-soft">
            Complétez d&apos;abord votre profil gardien pour activer les
            paiements.
          </p>
          <Link
            href="/profil"
            className="mt-3 inline-block font-medium text-brand hover:underline"
          >
            Aller au profil →
          </Link>
        </section>
      ) : !configured ? (
        <section className="card p-5">
          <div className="flex items-center gap-2">
            <IconClock className="h-5 w-5 text-muted" />
            <h2 className="font-semibold text-ink">Bientôt disponible</h2>
          </div>
          <p className="mt-2 text-sm text-ink-soft">
            Les paiements en ligne ne sont pas encore activés sur cette
            plateforme. Vous pourrez bientôt connecter votre compte pour être
            payé automatiquement à chaque garde.
          </p>
        </section>
      ) : chargesEnabled ? (
        <section className="card p-5">
          <div className="flex items-center gap-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-sage-100 text-pine">
              <IconCheck className="h-5 w-5" />
            </span>
            <div>
              <h2 className="font-semibold text-ink">Compte actif</h2>
              <p className="text-sm text-muted">
                Vous êtes prêt à recevoir vos paiements.
              </p>
            </div>
            <Badge tone="sage" className="ml-auto">
              <IconCheck className="h-3.5 w-3.5" /> Vérifié
            </Badge>
          </div>
          <p className="mt-4 rounded-xl bg-sand/60 px-3 py-2 text-xs text-ink-soft">
            À chaque garde réglée, la commission Chez Gustave est prélevée et le
            reste vous est versé automatiquement.
          </p>
        </section>
      ) : (
        <section className="card p-5">
          <div className="flex items-center gap-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand/10 text-brand">
              <IconShield className="h-5 w-5" />
            </span>
            <div>
              <h2 className="font-semibold text-ink">
                {hasAccount ? "Finalisez votre inscription" : "Activez vos paiements"}
              </h2>
              <p className="text-sm text-muted">
                Quelques minutes avec Stripe, notre partenaire sécurisé.
              </p>
            </div>
          </div>
          <ul className="mt-4 space-y-2 text-sm text-ink-soft">
            <Point>Vos coordonnées bancaires (IBAN)</Point>
            <Point>Une pièce d&apos;identité</Point>
            <Point>Versements automatiques après chaque garde</Point>
          </ul>
          <form action={startSitterOnboarding} className="mt-4">
            <SubmitButton className="w-full">
              {hasAccount ? "Continuer avec Stripe" : "Configurer mes paiements"}
            </SubmitButton>
          </form>
          <p className="mt-3 text-center text-xs text-muted">
            Sécurisé par Stripe · vos données bancaires ne transitent pas par
            Chez Gustave.
          </p>
        </section>
      )}
    </div>
  );
}

function Point({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-center gap-2">
      <IconCheck className="h-4 w-4 shrink-0 text-pine" />
      {children}
    </li>
  );
}
