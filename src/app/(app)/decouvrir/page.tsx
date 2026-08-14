import { getMode } from "@/lib/mode";
import { getListings, getSitters } from "@/lib/queries";
import { DiscoverControls } from "@/components/discover/DiscoverControls";
import { ListingCard } from "@/components/discover/ListingCard";
import { SitterCard } from "@/components/discover/SitterCard";
import { MapView, type MapPoint } from "@/components/discover/MapView";
import { GustaveMark } from "@/components/ui/Logo";
import { GEO_FALLBACK } from "@/lib/geo";

export const metadata = { title: "Découvrir" };

type SP = Promise<{
  q?: string;
  ambiance?: string;
  animal?: string;
  lastMinute?: string;
  view?: string;
}>;

export default async function DecouvrirPage({
  searchParams,
}: {
  searchParams: SP;
}) {
  const mode = await getMode();
  const sp = await searchParams;
  const filters = {
    q: sp.q,
    ambiance: sp.ambiance,
    animal: sp.animal,
    lastMinute: sp.lastMinute === "1",
  };
  const isMap = sp.view === "map";

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-bold text-ink">
          {mode === "owner"
            ? "Trouvez un gardien de confiance"
            : "Trouvez votre prochaine escapade"}
        </h1>
        <p className="text-sm text-muted">
          {mode === "owner"
            ? "Des gardiens passionnés, près de chez vous."
            : "Des vacances au vert — payées et logées."}
        </p>
      </div>

      <DiscoverControls mode={mode} />

      {mode === "sitter" ? (
        <SitterModeResults filters={filters} isMap={isMap} />
      ) : (
        <OwnerModeResults filters={filters} isMap={isMap} />
      )}
    </div>
  );
}

async function SitterModeResults({
  filters,
  isMap,
}: {
  filters: { q?: string; ambiance?: string; lastMinute?: boolean };
  isMap: boolean;
}) {
  const listings = await getListings(filters);

  if (listings.length === 0) return <EmptyState label="escapade" />;

  if (isMap) {
    const points: MapPoint[] = listings.map((l) => ({
      id: l.id,
      lat: l.lat ?? GEO_FALLBACK.lat,
      lng: l.lng ?? GEO_FALLBACK.lng,
      label: l.title,
      sub: `${l.region} · ${l.dog.name}`,
      href: `/decouvrir/escapade/${l.id}`,
      price: l.price,
    }));
    return <MapView points={points} />;
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {listings.map((l) => (
        <ListingCard key={l.id} listing={l} />
      ))}
    </div>
  );
}

async function OwnerModeResults({
  filters,
  isMap,
}: {
  filters: { q?: string; animal?: string };
  isMap: boolean;
}) {
  const sitters = await getSitters(filters);

  if (sitters.length === 0) return <EmptyState label="gardien" />;

  if (isMap) {
    const points: MapPoint[] = sitters.map((s) => ({
      id: s.user.id,
      lat: GEO_FALLBACK.byRegion[s.region]?.lat ?? GEO_FALLBACK.lat,
      lng: GEO_FALLBACK.byRegion[s.region]?.lng ?? GEO_FALLBACK.lng,
      label: s.firstName,
      sub: `${s.region} · ★ ${s.ratingAvg.toFixed(1)}`,
      href: `/decouvrir/gardien/${s.user.id}`,
      price: s.dailyRate,
    }));
    return <MapView points={points} />;
  }

  return (
    <div className="grid gap-4">
      {sitters.map((s) => (
        <SitterCard key={s.id} sitter={s} />
      ))}
    </div>
  );
}

function EmptyState({ label }: { label: string }) {
  return (
    <div className="card flex flex-col items-center gap-2 p-10 text-center">
      <GustaveMark className="h-14 w-14 opacity-70" />
      <p className="font-medium text-ink">Aucune {label} pour l&apos;instant</p>
      <p className="text-sm text-muted">
        Essayez d&apos;élargir votre recherche ou de retirer des filtres.
      </p>
    </div>
  );
}
