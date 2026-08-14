// ------------------------------------------------------------------
// Constantes métier de Chez Gustave
// (remplacent les enums natifs pour rester portable SQLite -> Postgres)
// ------------------------------------------------------------------

/** Modes d'utilisation de l'application (double profil). */
export const PROFILE_MODES = ["owner", "sitter"] as const;
export type ProfileMode = (typeof PROFILE_MODES)[number];

export const PROFILE_MODE_LABELS: Record<ProfileMode, string> = {
  owner: "Propriétaire",
  sitter: "Gardien",
};

/** Types de garde. */
export const CARE_TYPES = ["onsite", "visits"] as const;
export type CareType = (typeof CARE_TYPES)[number];

export const CARE_TYPE_LABELS: Record<CareType, string> = {
  onsite: "Sur place (jour et nuit)",
  visits: "Visites à domicile",
};

/** Ambiances (filtres côté gardien). */
export const AMBIANCES = ["lac", "campagne", "montagne"] as const;
export type Ambiance = (typeof AMBIANCES)[number];

export const AMBIANCE_LABELS: Record<Ambiance, string> = {
  lac: "Lac",
  campagne: "Campagne",
  montagne: "Montagne",
};

export const AMBIANCE_EMOJI: Record<Ambiance, string> = {
  lac: "🌊",
  campagne: "🌿",
  montagne: "⛰️",
};

/** Animaux acceptés (filtres côté propriétaire). */
export const ANIMALS = ["chiens", "chats", "chevaux"] as const;
export type Animal = (typeof ANIMALS)[number];

export const ANIMAL_LABELS: Record<Animal, string> = {
  chiens: "Chiens",
  chats: "Chats",
  chevaux: "Chevaux",
};

export const ANIMAL_EMOJI: Record<Animal, string> = {
  chiens: "🐶",
  chats: "🐱",
  chevaux: "🐴",
};

/** Statuts d'une candidature. */
export const APPLICATION_STATUSES = [
  "pending",
  "accepted",
  "rejected",
  "withdrawn",
] as const;
export type ApplicationStatus = (typeof APPLICATION_STATUSES)[number];

export const APPLICATION_STATUS_LABELS: Record<ApplicationStatus, string> = {
  pending: "En attente",
  accepted: "Acceptée",
  rejected: "Refusée",
  withdrawn: "Retirée",
};

/** Statuts d'une réservation. */
export const BOOKING_STATUSES = [
  "pending",
  "confirmed",
  "in_progress",
  "completed",
  "cancelled",
] as const;
export type BookingStatus = (typeof BOOKING_STATUSES)[number];

export const BOOKING_STATUS_LABELS: Record<BookingStatus, string> = {
  pending: "En attente de paiement",
  confirmed: "Confirmée",
  in_progress: "En cours",
  completed: "Terminée",
  cancelled: "Annulée",
};

/** Statut de paiement en ligne d'une réservation. */
export type PaymentStatus = "unpaid" | "paid" | "refunded";
export const PAYMENT_STATUS_LABELS: Record<PaymentStatus, string> = {
  unpaid: "À régler",
  paid: "Payé",
  refunded: "Remboursé",
};

/** Communes couvertes — Genève et sa région (au sens large). */
export const LAUNCH_REGIONS = [
  "Genève",
  "Carouge",
  "Lancy",
  "Vernier",
  "Meyrin",
  "Onex",
  "Chêne-Bougeries",
  "Thônex",
  "Grand-Saconnex",
  "Versoix",
  "Plan-les-Ouates",
  "Veyrier",
  "Cologny",
  "Bernex",
  "Hermance",
  "Anières",
  "Corsier",
  "Céligny",
  "Satigny",
  "Dardagny",
  "Russin",
  "Nyon",
] as const;

/** Commission plateforme (%). Lue depuis l'env, défaut 18 %. */
export const PLATFORM_COMMISSION_PERCENT = Number(
  process.env.PLATFORM_COMMISSION_PERCENT ?? "18"
);

/** Montant du bonus de parrainage (CHF). */
export const REFERRAL_BONUS_CHF = 20;
