import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { Badge } from "@/components/ui/Badge";
import { formatCHF, formatDateRange } from "@/lib/utils";

export const metadata = { title: "Escapades · Admin" };

const statusLabel: Record<string, string> = {
  open: "Ouverte",
  matched: "Attribuée",
  closed: "Fermée",
};

export default async function AdminListingsPage() {
  const listings = await prisma.listing.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      dog: true,
      owner: { select: { name: true, email: true } },
      _count: { select: { applications: true } },
    },
  });

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-ink">Escapades</h1>
        <span className="text-sm text-muted">{listings.length} au total</span>
      </div>

      <div className="card overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-line text-left text-xs uppercase tracking-wide text-muted">
              <th className="p-3">Escapade</th>
              <th className="p-3">Propriétaire</th>
              <th className="p-3">Région</th>
              <th className="p-3">Dates</th>
              <th className="p-3">Statut</th>
              <th className="p-3 text-center">Cand.</th>
              <th className="p-3 text-right">Prix</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {listings.map((l) => (
              <tr key={l.id}>
                <td className="p-3">
                  <Link
                    href={`/decouvrir/escapade/${l.id}`}
                    className="font-medium text-ink hover:text-brand"
                  >
                    {l.title}
                  </Link>
                  <div className="text-xs text-muted">
                    {l.dog.name}
                    {l.dog.breed ? ` · ${l.dog.breed}` : ""}
                    {l.lastMinute ? " · ⏱️" : ""}
                  </div>
                </td>
                <td className="p-3 text-ink-soft">{l.owner.name}</td>
                <td className="p-3 text-ink-soft">{l.region}</td>
                <td className="p-3 text-muted">
                  {formatDateRange(l.startDate, l.endDate)}
                </td>
                <td className="p-3">
                  <Badge tone={l.status === "open" ? "sage" : "neutral"}>
                    {statusLabel[l.status] ?? l.status}
                  </Badge>
                </td>
                <td className="p-3 text-center text-ink-soft">
                  {l._count.applications}
                </td>
                <td className="p-3 text-right font-semibold text-brand">
                  {formatCHF(l.price)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
