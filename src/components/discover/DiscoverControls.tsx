"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import {
  AMBIANCES,
  AMBIANCE_LABELS,
  ANIMALS,
  ANIMAL_LABELS,
  type ProfileMode,
} from "@/lib/constants";
import {
  IconSearch,
  IconClock,
  AmbianceIcon,
  AnimalIcon,
} from "@/components/ui/icons";

export function DiscoverControls({ mode }: { mode: ProfileMode }) {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();

  const [q, setQ] = useState(params.get("q") ?? "");
  const view = params.get("view") === "map" ? "map" : "list";
  const activeAmbiance = params.get("ambiance") ?? "";
  const activeAnimal = params.get("animal") ?? "";
  const lastMinute = params.get("lastMinute") === "1";

  const update = useCallback(
    (patch: Record<string, string | null>) => {
      const next = new URLSearchParams(params.toString());
      for (const [k, v] of Object.entries(patch)) {
        if (v === null || v === "") next.delete(k);
        else next.set(k, v);
      }
      router.replace(`${pathname}?${next.toString()}`, { scroll: false });
    },
    [params, pathname, router]
  );

  // Recherche avec léger debounce.
  useEffect(() => {
    const t = setTimeout(() => {
      if ((params.get("q") ?? "") !== q) update({ q: q || null });
    }, 300);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [q]);

  return (
    <div className="space-y-3">
      {/* Barre de recherche + bascule vue */}
      <div className="flex gap-2">
        <div className="relative flex-1">
          <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted">
            <IconSearch className="h-4 w-4" />
          </span>
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder={
              mode === "owner"
                ? "Chercher un gardien (nom, zone…)"
                : "Chercher une escapade (lieu, race, nom…)"
            }
            className="w-full rounded-full border border-line bg-paper py-2.5 pl-9 pr-4 text-sm outline-none focus:border-sage"
          />
        </div>
        <div className="inline-flex rounded-full border border-line bg-paper p-1">
          {(["list", "map"] as const).map((v) => (
            <button
              key={v}
              onClick={() => update({ view: v === "list" ? null : v })}
              className={cn(
                "rounded-full px-3 py-1.5 text-sm font-medium transition-colors",
                view === v ? "bg-brand text-cream" : "text-ink-soft"
              )}
              aria-pressed={view === v}
            >
              {v === "list" ? "Liste" : "Carte"}
            </button>
          ))}
        </div>
      </div>

      {/* Filtres */}
      <div className="flex flex-wrap gap-2">
        {mode === "sitter" && (
          <>
            {AMBIANCES.map((a) => (
              <FilterChip
                key={a}
                active={activeAmbiance === a}
                onClick={() =>
                  update({ ambiance: activeAmbiance === a ? null : a })
                }
              >
                <AmbianceIcon value={a} className="h-4 w-4" />{" "}
                {AMBIANCE_LABELS[a]}
              </FilterChip>
            ))}
          </>
        )}

        {mode === "owner" && (
          <>
            {ANIMALS.map((a) => (
              <FilterChip
                key={a}
                active={activeAnimal === a}
                onClick={() => update({ animal: activeAnimal === a ? null : a })}
              >
                <AnimalIcon value={a} className="h-4 w-4" /> {ANIMAL_LABELS[a]}
              </FilterChip>
            ))}
          </>
        )}

        {mode === "sitter" && (
          <FilterChip
            active={lastMinute}
            onClick={() => update({ lastMinute: lastMinute ? null : "1" })}
          >
            <IconClock className="h-4 w-4" /> Dernière minute
          </FilterChip>
        )}
      </div>
    </div>
  );
}

function FilterChip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "chip transition-colors",
        active
          ? "border-brand bg-brand text-cream"
          : "hover:border-sage hover:bg-sage-100"
      )}
    >
      {children}
    </button>
  );
}
