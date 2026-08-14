import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/session";
import { getMode } from "@/lib/mode";
import { Avatar } from "@/components/ui/Avatar";
import { Badge } from "@/components/ui/Badge";
import { formatCHF, formatDateRange } from "@/lib/utils";
import {
  BOOKING_STATUS_LABELS,
  type BookingStatus,
} from "@/lib/constants";
import { IconCalendar, IconChevronRight } from "@/components/ui/icons";

export const metadata = { title: "Mes réservations" };

const tone: Record<BookingStatus, "gold" | "sage" | "neutral" | "terracotta"> = {
  pending: "gold",
  confirmed: "sage",
  in_progress: "sage",
  completed: "neutral",
  cancelled: "terracotta",
};

export default async function ReservationsPage() {
  const me = await requireUser();
  const mode = await getMode();

  const bookings = await prisma.booking.findMany({
    where: { OR: [{ ownerId: me.id }, { sitterId: me.id }] },
    include: {
      listing: { include: { dog: true } },
      owner: { select: { id: true, name: true, image: true } },
      sitter: { select: { id: true, name: true, image: true } },
    },
    orderBy: { startDate: "desc" },
  });

  return (
    <div className="space-y-4">
      <Link
        href="/profil"
        className="inline-flex items-center gap-1 text-sm text-ink-soft hover:text-brand"
      >
        ← Profil
      </Link>
      <h1 className="text-2xl font-bold text-ink">Mes réservations</h1>

      {bookings.length === 0 ? (
        <div className="card p-10 text-center">
          <IconCalendar className="mx-auto h-9 w-9 text-muted" />
          <p className="mt-2 font-medium text-ink">Aucune réservation</p>
          <p className="text-sm text-muted">
            {mode === "owner"
              ? "Acceptez une candidature pour créer votre première garde."
              : "Vos gardes confirmées apparaîtront ici."}
          </p>
        </div>
      ) : (
        <ul className="space-y-3">
          {bookings.map((b) => {
            const iAmOwner = b.ownerId === me.id;
            const other = iAmOwner ? b.sitter : b.owner;
            return (
              <li key={b.id}>
                <Link
                  href={`/profil/reservations/${b.id}`}
                  className="card flex items-center gap-3 p-4 hover:bg-cream"
                >
                  <Avatar src={other.image} name={other.name} size={44} />
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-ink">
                      {b.listing.dog.name} · {b.listing.title}
                    </p>
                    <p className="text-sm text-muted">
                      {iAmOwner ? "Gardé par " : "Chez "}
                      {other.name} · {formatDateRange(b.startDate, b.endDate)}
                    </p>
                    <p className="mt-1 text-sm font-semibold text-brand">
                      {iAmOwner
                        ? formatCHF(b.amount)
                        : `Vous recevez ${formatCHF(b.payoutAmount)}`}
                    </p>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <Badge tone={tone[b.status as BookingStatus]}>
                      {BOOKING_STATUS_LABELS[b.status as BookingStatus]}
                    </Badge>
                    <IconChevronRight className="h-4 w-4 text-muted" />
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
