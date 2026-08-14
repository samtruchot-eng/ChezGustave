import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { Avatar } from "@/components/ui/Avatar";
import { Badge } from "@/components/ui/Badge";
import {
  IconUsers,
  IconHome,
  IconLeaf,
  IconPaw,
  IconPin,
  IconInbox,
  IconCalendar,
  IconChat,
} from "@/components/ui/icons";
import { formatCHF, formatDateRange } from "@/lib/utils";
import {
  APPLICATION_STATUS_LABELS,
  type ApplicationStatus,
} from "@/lib/constants";

type IconType = (props: { className?: string }) => React.ReactElement;

export default async function AdminDashboard() {
  const [
    users,
    owners,
    sitters,
    listings,
    openListings,
    applications,
    pendingApplications,
    bookings,
    dogs,
    messages,
    recentUsers,
    recentListings,
    recentApplications,
    volume,
  ] = await Promise.all([
    prisma.user.count(),
    prisma.ownerProfile.count(),
    prisma.sitterProfile.count(),
    prisma.listing.count(),
    prisma.listing.count({ where: { status: "open" } }),
    prisma.application.count(),
    prisma.application.count({ where: { status: "pending" } }),
    prisma.booking.count(),
    prisma.dog.count(),
    prisma.message.count(),
    prisma.user.findMany({
      orderBy: { createdAt: "desc" },
      take: 6,
      include: { ownerProfile: true, sitterProfile: true },
    }),
    prisma.listing.findMany({
      orderBy: { createdAt: "desc" },
      take: 6,
      include: { dog: true, owner: { select: { name: true } } },
    }),
    prisma.application.findMany({
      orderBy: { createdAt: "desc" },
      take: 6,
      include: {
        sitter: { select: { name: true, image: true } },
        listing: { select: { title: true, dog: { select: { name: true } } } },
      },
    }),
    prisma.booking.aggregate({ _sum: { amount: true, commissionAmount: true } }),
  ]);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-ink">Tableau de bord</h1>
        <p className="text-sm text-muted">
          Vue d&apos;ensemble de la plateforme Chez Gustave.
        </p>
      </div>

      {/* Statistiques */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        <Stat label="Utilisateurs" value={users} icon={IconUsers} />
        <Stat label="Propriétaires" value={owners} icon={IconHome} />
        <Stat label="Gardiens" value={sitters} icon={IconLeaf} />
        <Stat label="Chiens" value={dogs} icon={IconPaw} />
        <Stat
          label="Escapades"
          value={listings}
          sub={`${openListings} ouvertes`}
          icon={IconPin}
        />
        <Stat
          label="Candidatures"
          value={applications}
          sub={`${pendingApplications} en attente`}
          icon={IconInbox}
        />
        <Stat label="Réservations" value={bookings} icon={IconCalendar} />
        <Stat label="Messages" value={messages} icon={IconChat} />
      </div>

      {/* Volume financier */}
      <div className="grid gap-3 sm:grid-cols-2">
        <div className="card p-5">
          <p className="text-sm text-muted">Volume de transactions</p>
          <p className="mt-1 text-2xl font-bold text-brand">
            {formatCHF(volume._sum.amount ?? 0)}
          </p>
        </div>
        <div className="card p-5">
          <p className="text-sm text-muted">Commission plateforme cumulée</p>
          <p className="mt-1 text-2xl font-bold text-brand">
            {formatCHF(volume._sum.commissionAmount ?? 0)}
          </p>
        </div>
      </div>

      {/* Activité récente */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Derniers inscrits */}
        <section className="card p-5">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="font-semibold text-ink">Derniers inscrits</h2>
            <Link href="/admin/utilisateurs" className="text-sm text-brand hover:underline">
              Tout voir →
            </Link>
          </div>
          <ul className="space-y-3">
            {recentUsers.map((u) => (
              <li key={u.id} className="flex items-center gap-3">
                <Avatar src={u.image} name={u.name} size={36} />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-ink">
                    {u.name ?? "—"}
                  </p>
                  <p className="truncate text-xs text-muted">{u.email}</p>
                </div>
                <div className="flex gap-1">
                  {u.ownerProfile && <Badge tone="neutral">Proprio</Badge>}
                  {u.sitterProfile && <Badge tone="sage">Gardien</Badge>}
                </div>
              </li>
            ))}
          </ul>
        </section>

        {/* Candidatures récentes */}
        <section className="card p-5">
          <h2 className="mb-3 font-semibold text-ink">Candidatures récentes</h2>
          <ul className="space-y-3">
            {recentApplications.length === 0 && (
              <li className="text-sm text-muted">Aucune candidature.</li>
            )}
            {recentApplications.map((a) => (
              <li key={a.id} className="flex items-center gap-3">
                <Avatar src={a.sitter.image} name={a.sitter.name} size={36} />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-ink">
                    {a.sitter.name}
                  </p>
                  <p className="truncate text-xs text-muted">
                    → {a.listing.dog.name} · {a.listing.title}
                  </p>
                </div>
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

        {/* Dernières escapades */}
        <section className="card p-5 lg:col-span-2">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="font-semibold text-ink">Dernières escapades</h2>
            <Link href="/admin/escapades" className="text-sm text-brand hover:underline">
              Tout voir →
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-xs uppercase tracking-wide text-muted">
                  <th className="pb-2">Titre</th>
                  <th className="pb-2">Chien</th>
                  <th className="pb-2">Région</th>
                  <th className="pb-2">Dates</th>
                  <th className="pb-2 text-right">Prix</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {recentListings.map((l) => (
                  <tr key={l.id}>
                    <td className="py-2 pr-3 font-medium text-ink">{l.title}</td>
                    <td className="py-2 pr-3 text-ink-soft">{l.dog.name}</td>
                    <td className="py-2 pr-3 text-ink-soft">{l.region}</td>
                    <td className="py-2 pr-3 text-muted">
                      {formatDateRange(l.startDate, l.endDate)}
                    </td>
                    <td className="py-2 text-right font-semibold text-brand">
                      {formatCHF(l.price)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
}

function Stat({
  label,
  value,
  sub,
  icon: Icon,
}: {
  label: string;
  value: number;
  sub?: string;
  icon: IconType;
}) {
  return (
    <div className="card p-4">
      <div className="flex items-center justify-between">
        <span className="text-sm text-muted">{label}</span>
        <Icon className="h-5 w-5 text-brand" />
      </div>
      <p className="mt-1 text-2xl font-bold text-ink">{value}</p>
      {sub && <p className="text-xs text-muted">{sub}</p>}
    </div>
  );
}
