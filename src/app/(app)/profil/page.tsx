import Link from "next/link";
import { getMode } from "@/lib/mode";
import { getCurrentUser } from "@/lib/session";
import { prisma } from "@/lib/prisma";
import { Avatar } from "@/components/ui/Avatar";
import { Badge } from "@/components/ui/Badge";
import { ModeToggle } from "@/components/layout/ModeToggle";
import { REFERRAL_BONUS_CHF } from "@/lib/constants";
import { formatCHF } from "@/lib/utils";

export const metadata = { title: "Profil" };

export default async function ProfilPage() {
  const mode = await getMode();
  const me = await getCurrentUser();

  if (!me) {
    return (
      <div className="card p-6 text-center text-muted">
        Connectez-vous pour accéder à votre profil.
      </div>
    );
  }

  const [applicationsCount, favoritesCount, listingsCount, bookingsCount] =
    await Promise.all([
      prisma.application.count({ where: { sitterId: me.id } }),
      prisma.favorite.count({ where: { userId: me.id } }),
      prisma.listing.count({ where: { ownerId: me.id } }),
      prisma.booking.count({
        where: { OR: [{ ownerId: me.id }, { sitterId: me.id }] },
      }),
    ]);

  const isSitter = mode === "sitter";
  const verified = isSitter
    ? me.sitterProfile?.verified
    : me.ownerProfile?.verified;

  const rows: { icon: string; label: string; href: string; hint?: string }[] = [
    {
      icon: "📨",
      label: "Mes demandes",
      href: "/profil/demandes",
      hint: `${applicationsCount} candidature${applicationsCount > 1 ? "s" : ""}`,
    },
    {
      icon: "❤️",
      label: "Mes favoris",
      href: "/profil/favoris",
      hint: `${favoritesCount}`,
    },
    { icon: "📔", label: "Carnet de garde", href: "/carnet" },
    {
      icon: "🎁",
      label: "Parrainage",
      href: "/profil/parrainage",
      hint: `${formatCHF(REFERRAL_BONUS_CHF)} offerts`,
    },
  ];

  return (
    <div className="space-y-5">
      {/* En-tête */}
      <section className="card p-6">
        <div className="flex items-center gap-4">
          <Avatar src={me.image} name={me.name} size={64} />
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <h1 className="truncate text-xl font-bold text-ink">
                {me.name}
              </h1>
              {verified && <Badge tone="sage">✓ Vérifié</Badge>}
            </div>
            <p className="text-sm text-muted">{me.email}</p>
          </div>
        </div>

        {/* Sélecteur « Je suis » */}
        <div className="mt-5">
          <p className="mb-2 text-sm font-medium text-ink-soft">Je suis…</p>
          <ModeToggle mode={mode} variant="segmented" />
        </div>
      </section>

      {/* Statistiques */}
      <section className="grid grid-cols-3 gap-3">
        <Stat label="Escapades" value={listingsCount} />
        <Stat label="Réservations" value={bookingsCount} />
        <Stat label="Favoris" value={favoritesCount} />
      </section>

      {/* Liens du tableau de bord */}
      <section className="card divide-y divide-line">
        {rows.map((r) => (
          <Link
            key={r.href}
            href={r.href}
            className="flex items-center gap-3 p-4 first:rounded-t-2xl last:rounded-b-2xl hover:bg-cream"
          >
            <span className="text-xl">{r.icon}</span>
            <span className="flex-1 font-medium text-ink">{r.label}</span>
            {r.hint && <span className="text-sm text-muted">{r.hint}</span>}
            <span className="text-muted">›</span>
          </Link>
        ))}
      </section>

      {/* Vérification / complétion */}
      <section className="card p-5">
        <h2 className="font-semibold text-ink">Vérification du profil</h2>
        <p className="mt-1 text-sm text-muted">
          Un profil complet et vérifié rassure et fait la différence.
        </p>
        <div className="mt-3 space-y-2 text-sm">
          <Check ok label="Adresse e-mail" />
          <Check ok={!!verified} label="Identité vérifiée" />
          <Check ok={isSitter ? !!me.sitterProfile : !!me.ownerProfile} label="Profil complété" />
        </div>
      </section>

      <p className="pb-2 text-center text-xs text-muted">
        Chez Gustave · prototype — l&apos;authentification arrive bientôt.
      </p>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div className="card p-4 text-center">
      <p className="text-2xl font-bold text-brand">{value}</p>
      <p className="text-xs text-muted">{label}</p>
    </div>
  );
}

function Check({ ok, label }: { ok?: boolean; label: string }) {
  return (
    <div className="flex items-center gap-2">
      <span
        className={ok ? "text-brand" : "text-muted"}
        aria-hidden="true"
      >
        {ok ? "✓" : "○"}
      </span>
      <span className={ok ? "text-ink-soft" : "text-muted"}>{label}</span>
    </div>
  );
}
