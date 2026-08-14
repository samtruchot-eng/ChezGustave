"use client";

import Link from "next/link";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { formatCHF } from "@/lib/utils";
import { IconPin } from "@/components/ui/icons";

export interface MapPoint {
  id: string;
  lat: number;
  lng: number;
  label: string;
  sub?: string;
  href: string;
  price?: number;
}

// Emprise géographique (campagne genevoise + arc lémanique).
const BOUNDS = { minLat: 46.12, maxLat: 46.45, minLng: 5.9, maxLng: 6.32 };

function project(lat: number, lng: number) {
  const x = ((lng - BOUNDS.minLng) / (BOUNDS.maxLng - BOUNDS.minLng)) * 100;
  const y = ((BOUNDS.maxLat - lat) / (BOUNDS.maxLat - BOUNDS.minLat)) * 100;
  return { x: Math.max(4, Math.min(96, x)), y: Math.max(6, Math.min(94, y)) };
}

export function MapView({ points }: { points: MapPoint[] }) {
  const [active, setActive] = useState<string | null>(
    points[0]?.id ?? null
  );
  const activePoint = points.find((p) => p.id === active);

  return (
    <div className="card relative overflow-hidden">
      <div className="relative aspect-[4/3] w-full bg-sage-100">
        {/* Fond stylisé : terres + lac Léman */}
        <svg
          viewBox="0 0 100 75"
          className="absolute inset-0 h-full w-full"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <rect width="100" height="75" fill="var(--color-sage-100)" />
          {/* massifs / campagne */}
          <path
            d="M0 0 H100 V32 C80 40 60 38 45 46 C30 54 15 52 0 60 Z"
            fill="#dce8d6"
          />
          {/* lac Léman (arc) */}
          <path
            d="M0 62 C18 52 32 55 48 47 C64 39 82 41 100 33 L100 75 L0 75 Z"
            fill="#bcd6e6"
          />
          <path
            d="M0 62 C18 52 32 55 48 47 C64 39 82 41 100 33"
            fill="none"
            stroke="#9cc3d8"
            strokeWidth="0.6"
          />
          {/* Rhône */}
          <path
            d="M20 74 C22 66 18 60 14 56"
            fill="none"
            stroke="#bcd6e6"
            strokeWidth="1.6"
          />
        </svg>

        {/* étiquette lac */}
        <span className="pointer-events-none absolute bottom-3 right-4 text-xs font-medium italic text-[#6c94aa]">
          Lac Léman
        </span>

        {/* Repères */}
        {points.map((p) => {
          const { x, y } = project(p.lat, p.lng);
          const isActive = p.id === active;
          return (
            <button
              key={p.id}
              onClick={() => setActive(p.id)}
              style={{ left: `${x}%`, top: `${y}%` }}
              className={cn(
                "absolute -translate-x-1/2 -translate-y-full transition-transform",
                isActive ? "z-20 scale-110" : "z-10 hover:scale-105"
              )}
              aria-label={p.label}
            >
              <span
                className={cn(
                  "flex items-center gap-1 rounded-full px-2 py-1 text-xs font-semibold shadow-md",
                  isActive
                    ? "bg-brand text-cream"
                    : "bg-paper text-brand"
                )}
              >
                <IconPin className="h-3.5 w-3.5" />
                {typeof p.price === "number" && (
                  <span>{formatCHF(p.price)}</span>
                )}
              </span>
            </button>
          );
        })}
      </div>

      {/* Fiche du repère actif */}
      {activePoint && (
        <Link
          href={activePoint.href}
          className="flex items-center justify-between gap-3 border-t border-line p-4 hover:bg-cream"
        >
          <div className="min-w-0">
            <p className="truncate font-semibold text-ink">
              {activePoint.label}
            </p>
            {activePoint.sub && (
              <p className="truncate text-sm text-muted">{activePoint.sub}</p>
            )}
          </div>
          {typeof activePoint.price === "number" && (
            <span className="shrink-0 font-semibold text-brand">
              {formatCHF(activePoint.price)}
            </span>
          )}
        </Link>
      )}
    </div>
  );
}
