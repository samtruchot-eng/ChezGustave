import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { Avatar } from "@/components/ui/Avatar";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Rating } from "@/components/ui/Rating";
import { formatCHF, formatDateRange, jsonList } from "@/lib/utils";
import {
  APPLICATION_STATUS_LABELS,
  type ApplicationStatus,
} from "@/lib/constants";
import {
  toggleSitterVerified,
  toggleSuperSitter,
  toggleOwnerVerified,
} from "@/app/admin/actions";

export const metadata = { title: "Fiche utilisateur · Admin" };

export default async function AdminUserDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const user = await prisma.user.findUnique({
    where: { id },
    include: {
      ownerProfile: true,
      sitterProfile: true,
      dogs: true,
      listings: { include: { dog: true }, orderBy: { createdAt: "desc" } },
      applications: {
        include: { listing: { select: { title: true } } },
        orderBy: { createdAt: "desc" },
      },
      bookingsAsOwner: { select: { id: true } },
      bookingsAsSitter: { select: { id: true } },
      reviewsReceived: {
        include: { author: { select: { name: true } } },
        orderBy: { createdAt: "desc" },
      },
    },
  });
  if (!user) notFound();

  const df = new Intl.DateTimeFormat("fr-CH", { dateStyle: "medium" });
  const verifySitter = toggleSitterVerified.bind(null, user.id);
  const superSitter = toggleSuperSitter.bind(null, user.id);
  const verifyOwner = toggleOwnerVerified.bind(null, user.id);

  return (
    <div className="space-y-6">
      <Link
        href="/admin/utilisateurs"
        className="text-sm text-brand hover:underline"
      >
        ← Tous les utilisateurs
      </Link>

      {/* En-tête */}
      <section className="card p-6">
        <div className="flex items-center gap-4">
          <Avatar src={user.image} name={user.name} size={64} />
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="text-xl font-bold text-ink">{user.name ?? "—"}</h1>
              {user.ownerProfile && <Badge tone="neutral">Propriétaire</Badge>}
              {user.sitterProfile && <Badge tone="sage">Gardien</Badge>}
            </div>
            <p className="text-sm text-muted">{user.email}</p>
            {user.phone && (
              <p className="text-sm text-muted">{user.phone}</p>
            )}
            <p className="mt-1 text-xs text-muted">
              Inscrit le {df.format(user.createdAt)} · code{" "}
              {user.referralCode ?? "—"}
            </p>
          </div>
        </div>
      </section>

      {/* Modération */}
      <section className="card p-5">
        <h2 className="font-semibold text-ink">Modération</h2>
        <div className="mt-3 flex flex-wrap gap-2">
          {user.ownerProfile && (
            <form action={verifyOwner}>
              <Button
                type="submit"
                variant={user.ownerProfile.verified ? "secondary" : "primary"}
                size="sm"
              >
                {user.ownerProfile.verified
                  ? "Retirer « vérifié » (proprio)"
                  : "Vérifier le propriétaire"}
              </Button>
            </form>
          )}
          {user.sitterProfile && (
            <>
              <form action={verifySitter}>
                <Button
                  type="submit"
                  variant={
                    user.sitterProfile.verified ? "secondary" : "primary"
                  }
                  size="sm"
                >
                  {user.sitterProfile.verified
                    ? "Retirer « vérifié » (gardien)"
                    : "Vérifier le gardien"}
                </Button>
              </form>
              <form action={superSitter}>
                <Button
                  type="submit"
                  variant={
                    user.sitterProfile.isSuperSitter ? "secondary" : "gold"
                  }
                  size="sm"
                >
                  {user.sitterProfile.isSuperSitter
                    ? "Retirer Super Gardien"
                    : "Nommer Super Gardien"}
                </Button>
              </form>
            </>
          )}
          {!user.ownerProfile && !user.sitterProfile && (
            <p className="text-sm text-muted">Aucun profil à modérer.</p>
          )}
        </div>
      </section>

      {/* Profil gardien */}
      {user.sitterProfile && (
        <section className="card p-5">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold text-ink">Profil gardien</h2>
            <Rating
              value={user.sitterProfile.ratingAvg}
              count={user.sitterProfile.ratingCount}
            />
          </div>
          <p className="mt-1 text-sm text-ink-soft">
            {user.sitterProfile.headline ?? "—"}
          </p>
          <div className="mt-2 flex flex-wrap gap-2 text-xs text-muted">
            <span className="chip">Zone : {user.sitterProfile.region}</span>
            <span className="chip">
              {formatCHF(user.sitterProfile.dailyRate)}/jour
            </span>
            <span className="chip">
              Animaux : {jsonList(user.sitterProfile.animalsAccepted).join(", ")}
            </span>
          </div>
        </section>
      )}

      {/* Grille récap */}
      <section className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <MiniStat label="Chiens" value={user.dogs.length} />
        <MiniStat label="Escapades" value={user.listings.length} />
        <MiniStat label="Candidatures" value={user.applications.length} />
        <MiniStat
          label="Réservations"
          value={user.bookingsAsOwner.length + user.bookingsAsSitter.length}
        />
      </section>

      {/* Escapades */}
      {user.listings.length > 0 && (
        <section className="card p-5">
          <h2 className="mb-2 font-semibold text-ink">Escapades publiées</h2>
          <ul className="divide-y divide-line">
            {user.listings.map((l) => (
              <li key={l.id} className="flex items-center justify-between py-2">
                <Link
                  href={`/decouvrir/escapade/${l.id}`}
                  className="text-sm font-medium text-ink hover:text-brand"
                >
                  {l.title}
                </Link>
                <span className="text-xs text-muted">
                  {formatDateRange(l.startDate, l.endDate)}
                </span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Candidatures */}
      {user.applications.length > 0 && (
        <section className="card p-5">
          <h2 className="mb-2 font-semibold text-ink">Candidatures envoyées</h2>
          <ul className="divide-y divide-line">
            {user.applications.map((a) => (
              <li key={a.id} className="flex items-center justify-between py-2">
                <span className="text-sm text-ink-soft">{a.listing.title}</span>
                <Badge
                  tone={
                    a.status === "accepted"
                      ? "sage"
                      : a.status === "pending"
                        ? "gold"
                        : "neutral"
                  }
                >
                  {APPLICATION_STATUS_LABELS[a.status as ApplicationStatus]}
                </Badge>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Avis reçus */}
      {user.reviewsReceived.length > 0 && (
        <section className="card p-5">
          <h2 className="mb-2 font-semibold text-ink">
            Avis reçus ({user.reviewsReceived.length})
          </h2>
          <ul className="space-y-3">
            {user.reviewsReceived.slice(0, 6).map((r) => (
              <li key={r.id} className="text-sm">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-ink">{r.author.name}</span>
                  <Rating value={r.rating} />
                </div>
                {r.comment && <p className="text-ink-soft">{r.comment}</p>}
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}

function MiniStat({ label, value }: { label: string; value: number }) {
  return (
    <div className="card p-4 text-center">
      <p className="text-2xl font-bold text-brand">{value}</p>
      <p className="text-xs text-muted">{label}</p>
    </div>
  );
}
