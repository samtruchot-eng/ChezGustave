import { cache } from "react";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { prisma } from "./prisma";

/**
 * Utilisateur connecté (avec ses profils), ou null si non connecté.
 * Enveloppé dans `cache()` : appelé plusieurs fois pendant un même rendu
 * (layout + page), il ne fait qu'UNE requête base au lieu de plusieurs.
 */
export const getCurrentUser = cache(async () => {
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) return null;

  return prisma.user.findUnique({
    where: { id: userId },
    include: { ownerProfile: true, sitterProfile: true },
  });
});

/**
 * Exige un utilisateur connecté : renvoie l'utilisateur, ou redirige vers la
 * page de connexion. À utiliser dans les pages et actions protégées.
 */
export async function requireUser() {
  const user = await getCurrentUser();
  if (!user) redirect("/connexion");
  return user;
}
