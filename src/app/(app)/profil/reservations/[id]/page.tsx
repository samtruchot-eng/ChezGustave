import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/session";
import { Avatar } from "@/components/ui/Avatar";
import { Badge, InsuranceBadge } from "@/components/ui/Badge";
import { Button, ButtonLink } from "@/components/ui/Button";
import { formatCHF, formatDateRange, nightsBetween } from "@/lib/utils";
import {
  BOOKING_STATUS_LABELS,
  type BookingStatus,
} from "@/lib/constants";
import {
  IconCalendar,
  IconPin,
  IconBook,
  IconChat,
} from "@/components/ui/icons";
import { startBooking, completeBooking, cancelBooking } from "./actions";

const STEPS: { key: BookingStatus; label: string }[] = [
  { key: "confirmed", label: "Confirmée" },
  { key: "in_progress", label: "En cours" },
  { key: "completed", label: "Terminée" },
];

export default async function ReservationDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const me = await requireUser();

  const booking = await prisma.booking.findUnique({
    where: { id },
    include: {
      listing: { include: { dog: true } },
      owner: { select: { id: true, name: true, image: true } },
      sitter: { select: { id: true, name: true, image: true } },
    },
  });
  if (!booking || (booking.ownerId !== me.id && booking.sitterId !== me.id))
    notFound();

  const iAmOwner = booking.ownerId === me.id;
  const other = iAmOwner ? booking.sitter : booking.owner;
  const nights = nightsBetween(booking.startDate, booking.endDate);
  const status = booking.status as BookingStatus;
  const stepIndex = STEPS.findIndex((s) => s.key === status);
  const cancelled = status === "cancelled";

  return (
    <div className="space-y-5">
      <Link
        href="/profil/reservations"
        className="inline-flex items-center gap-1 text-sm text-ink-soft hover:text-brand"
      >
        ← Mes réservations
      </Link>

      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-ink">
          {booking.listing.dog.name}
        </h1>
        <Badge tone={cancelled ? "terracotta" : "sage"}>
          {BOOKING_STATUS_LABELS[status]}
        </Badge>
      </div>

      {/* Étapes */}
      {!cancelled && (
        <div className="flex items-center gap-2">
          {STEPS.map((s, i) => (
            <div key={s.key} className="flex flex-1 flex-col items-center gap-1">
              <div
                className={`h-1.5 w-full rounded-full ${
                  i <= stepIndex ? "bg-brand" : "bg-sand"
                }`}
              />
              <span
                className={`text-xs ${
                  i <= stepIndex ? "font-medium text-brand" : "text-muted"
                }`}
              >
                {s.label}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* Infos */}
      <section className="card p-5">
        <h2 className="font-semibold text-ink">{booking.listing.title}</h2>
        <div className="mt-2 space-y-1.5 text-sm text-ink-soft">
          <p className="flex items-center gap-2">
            <IconPin className="h-4 w-4 text-muted" /> {booking.listing.region}
          </p>
          <p className="flex items-center gap-2">
            <IconCalendar className="h-4 w-4 text-muted" />
            {formatDateRange(booking.startDate, booking.endDate)} · {nights}{" "}
            nuit{nights > 1 ? "s" : ""}
          </p>
        </div>
      </section>

      {/* Interlocuteur */}
      <section className="card flex items-center gap-3 p-4">
        <Avatar src={other.image} name={other.name} size={44} />
        <div className="flex-1">
          <p className="text-sm text-muted">
            {iAmOwner ? "Votre gardien" : "Propriétaire"}
          </p>
          <p className="font-medium text-ink">{other.name}</p>
        </div>
        <ButtonLink
          href={`/messages/nouveau?to=${other.id}`}
          variant="secondary"
          size="sm"
        >
          <IconChat className="h-4 w-4" /> Message
        </ButtonLink>
      </section>

      {/* Paiement */}
      <section className="card p-5">
        <h2 className="font-semibold text-ink">Paiement</h2>
        <div className="mt-3 space-y-1 text-sm">
          <Row label="Montant total">{formatCHF(booking.amount)}</Row>
          <Row label={`Commission Chez Gustave (${booking.commissionPercent}%)`}>
            − {formatCHF(booking.commissionAmount)}
          </Row>
          <div className="mt-1 border-t border-line pt-2">
            <Row label={iAmOwner ? "À régler" : "Vous recevez"}>
              <span className="font-semibold text-brand">
                {iAmOwner
                  ? formatCHF(booking.amount)
                  : formatCHF(booking.payoutAmount)}
              </span>
            </Row>
          </div>
        </div>
        <p className="mt-3 rounded-xl bg-sand/60 px-3 py-2 text-xs text-ink-soft">
          Le paiement en ligne sécurisé (Stripe) arrive bientôt. Pour
          l&apos;instant, réglez la garde de la main à la main.
        </p>
      </section>

      <InsuranceBadge />

      {/* Accès rapides */}
      <div className="grid grid-cols-2 gap-3">
        <ButtonLink href="/carnet" variant="secondary">
          <IconBook className="h-4 w-4" /> Carnet de garde
        </ButtonLink>
        <ButtonLink href={`/messages/nouveau?to=${other.id}`} variant="secondary">
          <IconChat className="h-4 w-4" /> Discuter
        </ButtonLink>
      </div>

      {/* Actions cycle de vie */}
      {!cancelled && status !== "completed" && (
        <section className="card space-y-3 p-5">
          <h2 className="font-semibold text-ink">Gérer la garde</h2>
          <div className="flex flex-wrap gap-2">
            {status === "confirmed" && (
              <form action={startBooking.bind(null, booking.id)}>
                <Button type="submit" size="sm">
                  Démarrer la garde
                </Button>
              </form>
            )}
            {(status === "confirmed" || status === "in_progress") && (
              <form action={completeBooking.bind(null, booking.id)}>
                <Button type="submit" variant="secondary" size="sm">
                  Marquer terminée
                </Button>
              </form>
            )}
            <form action={cancelBooking.bind(null, booking.id)}>
              <Button type="submit" variant="ghost" size="sm">
                Annuler
              </Button>
            </form>
          </div>
        </section>
      )}
    </div>
  );
}

function Row({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-muted">{label}</span>
      <span className="text-ink-soft">{children}</span>
    </div>
  );
}
