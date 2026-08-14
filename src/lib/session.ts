import { prisma } from "./prisma";
import { getMode } from "./mode";

/**
 * Utilisateur courant — VERSION DE DÉMO.
 *
 * Tant que l'authentification (Auth.js) n'est pas branchée, on renvoie un
 * utilisateur représentatif selon le mode actif, afin que les écrans
 * Messages / Profil affichent de vraies données du seed.
 *
 * À remplacer par la vraie session `auth()` à l'étape authentification.
 */
export async function getCurrentUser() {
  const mode = await getMode();
  const email = mode === "sitter" ? "lea@example.ch" : "pierre@example.ch";

  const user = await prisma.user.findUnique({
    where: { email },
    include: { ownerProfile: true, sitterProfile: true },
  });

  return user;
}
