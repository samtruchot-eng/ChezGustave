import { prisma } from "./prisma";

/**
 * Recalcule la note moyenne et le nombre d'avis d'un gardien à partir de
 * tous les avis reçus. Sans effet si l'utilisateur n'a pas de profil gardien.
 */
export async function recomputeSitterRating(userId: string): Promise<void> {
  const profile = await prisma.sitterProfile.findUnique({ where: { userId } });
  if (!profile) return;

  const agg = await prisma.review.aggregate({
    where: { targetId: userId },
    _avg: { rating: true },
    _count: { rating: true },
  });

  await prisma.sitterProfile.update({
    where: { userId },
    data: {
      ratingAvg: agg._avg.rating ?? 0,
      ratingCount: agg._count.rating,
    },
  });
}
