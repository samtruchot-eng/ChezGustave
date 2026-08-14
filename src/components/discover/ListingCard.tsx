import Link from "next/link";
import Image from "next/image";
import { Badge } from "@/components/ui/Badge";
import { formatCHF, formatDateRange, nightsBetween } from "@/lib/utils";
import { AMBIANCE_EMOJI, AMBIANCE_LABELS, type Ambiance } from "@/lib/constants";

interface ListingCardData {
  id: string;
  title: string;
  region: string;
  startDate: Date;
  endDate: Date;
  price: number;
  ambiance: string | null;
  lastMinute: boolean;
  dog: { name: string; breed: string | null; photo: string | null };
}

export function ListingCard({ listing }: { listing: ListingCardData }) {
  const nights = nightsBetween(listing.startDate, listing.endDate);
  const ambiance = listing.ambiance as Ambiance | null;

  return (
    <Link
      href={`/decouvrir/escapade/${listing.id}`}
      className="card group block overflow-hidden transition-transform hover:-translate-y-0.5"
    >
      <div className="relative aspect-[16/10] w-full bg-sand">
        {listing.dog.photo ? (
          <Image
            src={listing.dog.photo}
            alt={listing.dog.name}
            fill
            sizes="(max-width: 640px) 100vw, 640px"
            className="object-cover"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-5xl">
            🐶
          </div>
        )}
        <div className="absolute left-3 top-3 flex gap-2">
          {listing.lastMinute && (
            <Badge tone="terracotta" className="backdrop-blur">
              ⏱️ Dernière minute
            </Badge>
          )}
          {ambiance && (
            <span className="chip bg-cream/90 backdrop-blur">
              {AMBIANCE_EMOJI[ambiance]} {AMBIANCE_LABELS[ambiance]}
            </span>
          )}
        </div>
      </div>

      <div className="p-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="font-semibold leading-snug text-ink group-hover:text-brand">
              {listing.title}
            </h3>
            <p className="mt-0.5 text-sm text-muted">
              📍 {listing.region} · {listing.dog.name}
              {listing.dog.breed ? ` · ${listing.dog.breed}` : ""}
            </p>
          </div>
        </div>
        <div className="mt-3 flex items-center justify-between">
          <span className="text-sm text-ink-soft">
            {formatDateRange(listing.startDate, listing.endDate)}
          </span>
          <span className="text-right">
            <span className="font-semibold text-brand">
              {formatCHF(listing.price)}
            </span>
            <span className="block text-xs text-muted">
              {nights} nuit{nights > 1 ? "s" : ""}
            </span>
          </span>
        </div>
      </div>
    </Link>
  );
}
