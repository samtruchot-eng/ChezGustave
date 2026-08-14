import { PLATFORM_COMMISSION_PERCENT } from "./constants";

export interface PriceBreakdown {
  /** Montant total payé par le propriétaire (CHF). */
  total: number;
  /** Pourcentage de commission plateforme. */
  commissionPercent: number;
  /** Part conservée par la plateforme (CHF). */
  commissionAmount: number;
  /** Montant reversé au gardien (CHF). */
  payoutAmount: number;
}

/**
 * Calcule la répartition d'un paiement de garde.
 * La commission (~18 %) est prélevée sur le montant total ;
 * le reste est reversé au gardien via Stripe Connect.
 */
export function computeBreakdown(
  total: number,
  commissionPercent: number = PLATFORM_COMMISSION_PERCENT
): PriceBreakdown {
  const commissionAmount = Math.round((total * commissionPercent) / 100);
  const payoutAmount = total - commissionAmount;
  return {
    total,
    commissionPercent,
    commissionAmount,
    payoutAmount,
  };
}
