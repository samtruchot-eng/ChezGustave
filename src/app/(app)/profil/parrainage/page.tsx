import Link from "next/link";
import { requireUser } from "@/lib/session";
import { REFERRAL_BONUS_CHF } from "@/lib/constants";
import { formatCHF } from "@/lib/utils";
import { IconGift, IconPaw } from "@/components/ui/icons";

export const metadata = { title: "Parrainage" };

export default async function ParrainagePage() {
  const me = await requireUser();
  const code = me?.referralCode ?? "GUSTAVE2026";

  return (
    <div className="space-y-4">
      <Link
        href="/profil"
        className="inline-flex items-center gap-1 text-sm text-ink-soft hover:text-brand"
      >
        ← Profil
      </Link>
      <h1 className="text-2xl font-bold text-ink">Parrainage</h1>

      <section className="card bg-brand p-6 text-center text-cream">
        <IconGift className="mx-auto h-10 w-10" />
        <p className="mt-2 text-lg font-semibold">
          {formatCHF(REFERRAL_BONUS_CHF)} offerts à chacun
        </p>
        <p className="mt-1 text-sm text-cream/85">
          Partagez votre code : votre filleul reçoit{" "}
          {formatCHF(REFERRAL_BONUS_CHF)}, et vous aussi dès sa première garde.
        </p>
        <div className="mx-auto mt-4 w-fit rounded-xl bg-cream/15 px-6 py-3 text-2xl font-bold tracking-widest">
          {code}
        </div>
      </section>

      <p className="flex flex-wrap items-center justify-center gap-1.5 text-center text-sm text-muted">
        Le partage direct arrivera avec votre compte. En attendant, communiquez
        ce code de vive voix.
        <IconPaw className="h-4 w-4" />
      </p>
    </div>
  );
}
