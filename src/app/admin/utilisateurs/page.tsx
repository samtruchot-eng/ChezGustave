import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { Avatar } from "@/components/ui/Avatar";
import { Badge } from "@/components/ui/Badge";
import { IconSearch, IconChevronRight } from "@/components/ui/icons";

export const metadata = { title: "Utilisateurs · Admin" };

export default async function AdminUsersPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;

  const users = await prisma.user.findMany({
    where: q
      ? {
          OR: [
            { name: { contains: q, mode: "insensitive" } },
            { email: { contains: q, mode: "insensitive" } },
          ],
        }
      : undefined,
    orderBy: { createdAt: "desc" },
    include: {
      ownerProfile: true,
      sitterProfile: true,
      _count: { select: { listings: true, applications: true, dogs: true } },
    },
  });

  const df = new Intl.DateTimeFormat("fr-CH", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-2xl font-bold text-ink">Utilisateurs</h1>
        <span className="text-sm text-muted">{users.length} résultat(s)</span>
      </div>

      {/* Recherche */}
      <form method="get" className="relative max-w-md">
        <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted">
          <IconSearch className="h-4 w-4" />
        </span>
        <input
          name="q"
          defaultValue={q}
          placeholder="Rechercher par nom ou e-mail…"
          className="w-full rounded-full border border-line bg-paper py-2.5 pl-9 pr-4 text-sm outline-none focus:border-sage"
        />
      </form>

      <div className="card overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-line text-left text-xs uppercase tracking-wide text-muted">
              <th className="p-3">Utilisateur</th>
              <th className="p-3">Rôle</th>
              <th className="p-3">Contact</th>
              <th className="p-3">Activité</th>
              <th className="p-3">Inscrit</th>
              <th className="p-3"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {users.map((u) => (
              <tr key={u.id} className="align-top hover:bg-cream">
                <td className="p-3">
                  <Link
                    href={`/admin/utilisateurs/${u.id}`}
                    className="flex items-center gap-2 font-medium text-ink hover:text-brand"
                  >
                    <Avatar src={u.image} name={u.name} size={32} />
                    {u.name ?? "—"}
                  </Link>
                </td>
                <td className="p-3">
                  <div className="flex flex-wrap gap-1">
                    {u.ownerProfile && <Badge tone="neutral">Proprio</Badge>}
                    {u.sitterProfile && <Badge tone="sage">Gardien</Badge>}
                    {!u.ownerProfile && !u.sitterProfile && (
                      <span className="text-muted">—</span>
                    )}
                  </div>
                </td>
                <td className="p-3 text-ink-soft">
                  <div>{u.email}</div>
                  {u.phone && <div className="text-xs text-muted">{u.phone}</div>}
                </td>
                <td className="p-3 text-xs text-muted">
                  {u._count.dogs} chien{u._count.dogs > 1 ? "s" : ""} ·{" "}
                  {u._count.listings} escapade{u._count.listings > 1 ? "s" : ""}{" "}
                  · {u._count.applications} cand.
                </td>
                <td className="p-3 text-muted">{df.format(u.createdAt)}</td>
                <td className="p-3">
                  <Link
                    href={`/admin/utilisateurs/${u.id}`}
                    className="text-muted hover:text-brand"
                    aria-label="Voir la fiche"
                  >
                    <IconChevronRight className="h-4 w-4" />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
