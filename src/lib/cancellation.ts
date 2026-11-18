import { CANCELLATION } from "./legal";

export type CancelParty = "owner" | "sitter";

const DAY_MS = 24 * 60 * 60 * 1000;

/**
 * Part du prix remboursée au propriétaire quand une garde payée est annulée.
 * C'est la règle écrite dans les conditions générales (/conditions).
 */
export function refundPercent(params: {
  cancelledBy: CancelParty;
  startDate: Date;
  /** La garde a-t-elle été marquée « en cours » ? */
  started: boolean;
  now?: Date;
}): number {
  if (params.cancelledBy === "sitter") return 100;

  const now = params.now ?? new Date();
  const untilStart = params.startDate.getTime() - now.getTime();
  if (params.started || untilStart <= 0) return 0;
  if (untilStart >= CANCELLATION.fullRefundDays * DAY_MS) return 100;
  return CANCELLATION.lateRefundPercent;
}

/** Ce que l'annulation d'une réservation déclenche, en francs. */
export function planCancellation(
  booking: {
    amount: number;
    payoutAmount: number;
    paymentStatus: string;
    startDate: Date;
    status: string;
  },
  cancelledBy: CancelParty,
  now?: Date
): { paid: boolean; percent: number; refundAmount: number; sitterKeeps: number } {
  const paid = booking.paymentStatus === "paid";
  const percent = paid
    ? refundPercent({
        cancelledBy,
        startDate: booking.startDate,
        started: booking.status === "in_progress",
        now,
      })
    : 0;
  const refundAmount = Math.round((booking.amount * percent) / 100);
  const sitterKeeps = paid
    ? booking.payoutAmount - Math.round((booking.payoutAmount * percent) / 100)
    : 0;
  return { paid, percent, refundAmount, sitterKeeps };
}
