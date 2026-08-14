import { prisma } from "@/lib/prisma";
import { Badge } from "@/components/ui/Badge";
import { formatCHF, formatDateRange } from "@/lib/utils";
import { BOOKING_STATUS_LABELS, type BookingStatus } from "@/lib/constants";

export const metadata = { title: "Réservations · Admin" };

const tone: Record<BookingStatus, "sage" | "gold" | "neutral" | "terracotta"> = {
  pending: "gold",
  confirmed: "sage",
  in_progress: "sage",
  completed: "neutral",
  cancelled: "terracotta",
};

export default async function AdminBookingsPage() {
  const bookings = await prisma.booking.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      owner: { select: { name: true } },
      sitter: { select: { name: true } },
      listing: { select: { title: true, dog: { select: { name: true } } } },
    },
  });

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-ink">Réservations</h1>
        <span className="text-sm text-muted">{bookings.length} au total</span>
      </div>

      {bookings.length === 0 ? (
        <div className="card p-10 text-center">
          <span className="text-4xl">📅</span>
          <p className="mt-2 text-sm text-muted">
            Aucune réservation pour l&apos;instant.
          </p>
        </div>
      ) : (
        <div className="card overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-line text-left text-xs uppercase tracking-wide text-muted">
                <th className="p-3">Garde</th>
                <th className="p-3">Propriétaire</th>
                <th className="p-3">Gardien</th>
                <th className="p-3">Dates</th>
                <th className="p-3">Statut</th>
                <th className="p-3 text-right">Montant</th>
                <th className="p-3 text-right">Commission</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {bookings.map((b) => (
                <tr key={b.id}>
                  <td className="p-3 font-medium text-ink">
                    {b.listing.dog.name}
                    <div className="text-xs font-normal text-muted">
                      {b.listing.title}
                    </div>
                  </td>
                  <td className="p-3 text-ink-soft">{b.owner.name}</td>
                  <td className="p-3 text-ink-soft">{b.sitter.name}</td>
                  <td className="p-3 text-muted">
                    {formatDateRange(b.startDate, b.endDate)}
                  </td>
                  <td className="p-3">
                    <Badge tone={tone[b.status as BookingStatus]}>
                      {BOOKING_STATUS_LABELS[b.status as BookingStatus]}
                    </Badge>
                  </td>
                  <td className="p-3 text-right font-semibold text-ink">
                    {formatCHF(b.amount)}
                  </td>
                  <td className="p-3 text-right text-brand">
                    {formatCHF(b.commissionAmount)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
