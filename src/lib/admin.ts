import { notFound } from "next/navigation";
import { requireUser } from "./session";

/**
 * Administration.
 *
 * Un utilisateur est administrateur si son e-mail figure dans la variable
 * d'environnement ADMIN_EMAILS (liste séparée par des virgules).
 * Ex. : ADMIN_EMAILS="s.truchot@brocher.ch, autre@exemple.ch"
 *
 * Avantage : pas de mot de passe à transmettre, personne ne peut s'auto-promouvoir,
 * et l'admin garde son compte normal.
 */
export function getAdminEmails(): string[] {
  return (process.env.ADMIN_EMAILS ?? "")
    .split(",")
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean);
}

export function isAdminEmail(email?: string | null): boolean {
  if (!email) return false;
  return getAdminEmails().includes(email.toLowerCase());
}

/**
 * Exige un administrateur : renvoie l'utilisateur, ou 404 pour les non-admins
 * (on ne révèle pas l'existence de l'espace admin).
 */
export async function requireAdmin() {
  const user = await requireUser();
  if (!isAdminEmail(user.email)) notFound();
  return user;
}
