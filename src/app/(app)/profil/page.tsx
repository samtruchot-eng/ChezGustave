import Link from "next/link";
import { getMode } from "@/lib/mode";
import { requireUser } from "@/lib/session";
import { prisma } from "@/lib/prisma";
import { Avatar } from "@/components/ui/Avatar";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { ModeToggle } from "@/components/layout/ModeToggle";
import { REFERRAL_BONUS_CHF } from "@/lib/constants";
import { formatCHF } from "@/lib/utils";
import { isAdminEmail } from "@/lib/admin";
import {
  IconInbox,
  IconHeart,
  IconBook,
  IconGift,
  IconCrown,
  IconChevronRight,
  IconCheck,
  IconLogout,
  IconPaw,
  IconCalendar,
} from "@/components/ui/icons";
import { logout } from "./actions";

type IconType = (props: { className?: string }) => React.ReactElement;

export const metadata = { title: "Profil" };

export default async function ProfilPage() {
  const mode = await getMode();
  const me = await requireUser();

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

  const rows: {
    icon: IconType;
    label: string;
    href: string;
    hint?: string;
  }[] = [
    {
      icon: IconCalendar,
      label: "Mes réservations",
      href: "/profil/reservations",
      hint: `${bookingsCount}`,
    },
    {
      icon: IconInbox,
      label: "Mes demandes",
      href: "/profil/demandes",
      hint: `${applicationsCount} candidature${applicationsCount > 1 ? "s" : ""}`,
    },
    {
      icon: IconHeart,
      label: "Mes favoris",
      href: "/profil/favoris",
      hint: `${favoritesCount}`,
    },
    { icon: IconBook, label: "Carnet de garde", href: "/carnet" },
    {
      icon: IconGift,
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
              {verified && (
                <Badge tone="sage">
                  <IconCheck className="h-3.5 w-3.5" /> Vérifié
                </Badge>
              )}
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

      {/* Accès admin (réservé) */}
      {isAdminEmail(me.email) && (
        <Link
          href="/admin"
          className="card flex items-center gap-3 bg-ink p-4 text-cream hover:opacity-95"
        >
          <IconCrown className="h-5 w-5 text-gold" />
          <span className="flex-1 font-medium">Espace administrateur</span>
          <IconChevronRight className="h-4 w-4 text-cream/70" />
        </Link>
      )}

      {/* Liens du tableau de bord */}
      <section className="card divide-y divide-line">
        {rows.map((r) => (
          <Link
            key={r.href}
            href={r.href}
            className="flex items-center gap-3 p-4 first:rounded-t-2xl last:rounded-b-2xl hover:bg-cream"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand/10 text-brand">
              <r.icon className="h-5 w-5" />
            </span>
            <span className="flex-1 font-medium text-ink">{r.label}</span>
            {r.hint && <span className="text-sm text-muted">{r.hint}</span>}
            <IconChevronRight className="h-4 w-4 text-muted" />
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

      {/* Déconnexion */}
      <form action={logout}>
        <Button
          type="submit"
          variant="ghost"
          className="w-full border border-line"
        >
          <IconLogout className="h-4 w-4" />
          Se déconnecter
        </Button>
      </form>

      <p className="flex items-center justify-center gap-1.5 pb-2 text-center text-xs text-muted">
        Chez Gustave · Genève et sa région
        <IconPaw className="h-3.5 w-3.5" />
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
      {ok ? (
        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-sage-100 text-pine">
          <IconCheck className="h-3.5 w-3.5" />
        </span>
      ) : (
        <span className="h-5 w-5 rounded-full border border-line" />
      )}
      <span className={ok ? "text-ink-soft" : "text-muted"}>{label}</span>
    </div>
  );
}
