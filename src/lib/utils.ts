import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/** Fusionne des classes Tailwind proprement. */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Lit une liste stockée en JSON (portabilité SQLite). */
export function jsonList(value: string | null | undefined): string[] {
  if (!value) return [];
  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? parsed.map(String) : [];
  } catch {
    return [];
  }
}

/** Sérialise une liste vers du JSON pour le stockage. */
export function toJsonList(values: string[]): string {
  return JSON.stringify(values ?? []);
}

/** Formate un montant en CHF. */
export function formatCHF(amount: number): string {
  return new Intl.NumberFormat("fr-CH", {
    style: "currency",
    currency: "CHF",
    maximumFractionDigits: 0,
  }).format(amount);
}

/** Nombre de nuits entre deux dates. */
export function nightsBetween(start: Date, end: Date): number {
  const ms = end.getTime() - start.getTime();
  return Math.max(1, Math.round(ms / (1000 * 60 * 60 * 24)));
}

/** Formate une plage de dates lisible (fr-CH). */
export function formatDateRange(start: Date, end: Date): string {
  const fmt = new Intl.DateTimeFormat("fr-CH", {
    day: "numeric",
    month: "short",
  });
  const fmtFull = new Intl.DateTimeFormat("fr-CH", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
  return `${fmt.format(start)} – ${fmtFull.format(end)}`;
}

/** Initiales pour l'avatar de secours. */
export function initials(name?: string | null): string {
  if (!name) return "🐾";
  return name
    .split(" ")
    .map((p) => p[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();
}
