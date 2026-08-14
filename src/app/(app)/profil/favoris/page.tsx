import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/session";
import { ListingCard } from "@/components/discover/ListingCard";
import { IconHeart } from "@/components/ui/icons";

export const metadata = { title: "Mes favoris" };

export default async function FavorisPage() {
  const me = await requireUser();
  if (!me) return null;

  const favorites = await prisma.favorite.findMany({
    where: { userId: me.id, listingId: { not: null } },
    include: { listing: { include: { dog: true } } },
    orderBy: { createdAt: "desc" },
  });

  const listings = favorites.map((f) => f.listing).filter(Boolean);

  return (
    <div className="space-y-4">
      <Link
        href="/profil"
        className="inline-flex items-center gap-1 text-sm text-ink-soft hover:text-brand"
      >
        ← Profil
      </Link>
      <h1 className="text-2xl font-bold text-ink">Mes favoris</h1>

      {listings.length === 0 ? (
        <div className="card p-10 text-center">
          <IconHeart className="mx-auto h-9 w-9 text-muted" />
          <p className="mt-2 font-medium text-ink">Aucun favori</p>
          <p className="text-sm text-muted">
            Touchez le cœur sur une escapade ou un gardien pour le retrouver
            ici.
          </p>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {listings.map(
            (l) => l && <ListingCard key={l.id} listing={l} />
          )}
        </div>
      )}
    </div>
  );
}
