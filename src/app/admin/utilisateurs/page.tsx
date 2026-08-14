import { prisma } from "@/lib/prisma";
import { Avatar } from "@/components/ui/Avatar";
import { Badge } from "@/components/ui/Badge";

export const metadata = { title: "Utilisateurs · Admin" };

export default async function AdminUsersPage() {
  const users = await prisma.user.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      ownerProfile: true,
      sitterProfile: true,
      _count: {
        select: { listings: true, applications: true, dogs: true },
      },
    },
  });

  const df = new Intl.DateTimeFormat("fr-CH", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-ink">Utilisateurs</h1>
        <span className="text-sm text-muted">{users.length} au total</span>
      </div>

      <div className="card overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-line text-left text-xs uppercase tracking-wide text-muted">
              <th className="p-3">Utilisateur</th>
              <th className="p-3">Rôle</th>
              <th className="p-3">Contact</th>
              <th className="p-3">Activité</th>
              <th className="p-3">Inscrit</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {users.map((u) => (
              <tr key={u.id} className="align-top">
                <td className="p-3">
                  <div className="flex items-center gap-2">
                    <Avatar src={u.image} name={u.name} size={32} />
                    <span className="font-medium text-ink">
                      {u.name ?? "—"}
                    </span>
                  </div>
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
                  {u._count.listings} escapade{u._count.listings > 1 ? "s" : ""} ·{" "}
                  {u._count.applications} candidature
                  {u._count.applications > 1 ? "s" : ""}
                </td>
                <td className="p-3 text-muted">{df.format(u.createdAt)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
