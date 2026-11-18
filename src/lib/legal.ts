/**
 * Informations légales affichées dans les conditions générales.
 * Tant qu'un champ vaut null, la page /conditions s'affiche comme un projet.
 */
export const LEGAL = {
  operatorName: "Sam Truchot",
  /** Adresse postale de l'exploitant. */
  operatorAddress: null as string | null,
  /** Adresse e-mail de contact publiée. */
  contactEmail: null as string | null,
  /** Pays où l'activité est établie : il détermine le droit applicable. */
  country: "CH" as "CH" | "FR" | null,
  /** Date d'entrée en vigueur de la version affichée. */
  version: "18 novembre 2026",
} as const;

export const isLegalComplete =
  LEGAL.operatorAddress !== null &&
  LEGAL.contactEmail !== null &&
  LEGAL.country !== null;

/**
 * Les conditions sont-elles visibles du public ? Tant qu'elles sont
 * incomplètes, la page et les liens qui y mènent n'existent pas sur le site de
 * production : on ne les voit qu'en aperçu et en local.
 */
export const conditionsPublished =
  isLegalComplete || process.env.VERCEL_ENV !== "production";

/** Annulation par le propriétaire d'une garde déjà payée. */
export const CANCELLATION = {
  /** Remboursement intégral jusqu'à ce nombre de jours avant le début. */
  fullRefundDays: 7,
  /** Part remboursée ensuite, jusqu'au début de la garde (en %). */
  lateRefundPercent: 50,
} as const;
