import Link from "next/link";
import { Avatar } from "@/components/ui/Avatar";
import { Rating } from "@/components/ui/Rating";
import { SuperSitterBadge } from "@/components/ui/Badge";
import { formatCHF, jsonList } from "@/lib/utils";
import { ANIMAL_EMOJI, type Animal } from "@/lib/constants";

interface SitterCardData {
  firstName: string;
  region: string;
  headline: string | null;
  dailyRate: number;
  animalsAccepted: string;
  isSuperSitter: boolean;
  ratingAvg: number;
  ratingCount: number;
  user: { id: string; name: string | null; image: string | null };
}

export function SitterCard({ sitter }: { sitter: SitterCardData }) {
  const animals = jsonList(sitter.animalsAccepted) as Animal[];

  return (
    <Link
      href={`/decouvrir/gardien/${sitter.user.id}`}
      className="card group flex gap-4 p-4 transition-transform hover:-translate-y-0.5"
    >
      <Avatar
        src={sitter.user.image}
        name={sitter.firstName}
        size={64}
        className="shrink-0"
      />
      <div className="min-w-0 flex-1">
        <div className="flex items-center justify-between gap-2">
          <h3 className="truncate font-semibold text-ink group-hover:text-forest">
            {sitter.firstName}
          </h3>
          <Rating value={sitter.ratingAvg} count={sitter.ratingCount} />
        </div>
        <p className="mt-0.5 text-sm text-muted">📍 {sitter.region}</p>
        {sitter.headline && (
          <p className="mt-1 line-clamp-2 text-sm text-ink-soft">
            {sitter.headline}
          </p>
        )}
        <div className="mt-2 flex items-center justify-between">
          <div className="flex items-center gap-2">
            {sitter.isSuperSitter && <SuperSitterBadge />}
            <span className="text-sm" title="Animaux acceptés">
              {animals.map((a) => ANIMAL_EMOJI[a]).join(" ")}
            </span>
          </div>
          <span className="text-sm font-semibold text-forest">
            {formatCHF(sitter.dailyRate)}
            <span className="font-normal text-muted">/jour</span>
          </span>
        </div>
      </div>
    </Link>
  );
}
