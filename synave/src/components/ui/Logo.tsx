import Link from "next/link";
import { cn } from "@/lib/utils";

/**
 * Marque Synave : un signal qui traverse trois nœuds — la donnée qui circule
 * d'un système à l'autre. Décliné en clair (fonds sombres) et foncé.
 */
export function LogoMark({
  className,
  idPrefix = "synave",
}: {
  className?: string;
  /** Préfixe des identifiants du dégradé, unique par instance. */
  idPrefix?: string;
}) {
  const gradientId = `${idPrefix}-grad`;

  return (
    <svg
      viewBox="0 0 40 40"
      className={cn("h-9 w-9", className)}
      role="img"
      aria-label="Synave"
    >
      <defs>
        <linearGradient id={gradientId} x1="4" y1="34" x2="36" y2="6">
          <stop offset="0%" stopColor="var(--color-signal)" />
          <stop offset="100%" stopColor="var(--color-mint)" />
        </linearGradient>
      </defs>

      {/* Onde : le signal qui relie les nœuds */}
      <path
        d="M5 27.5c4.5 0 5.5-9 10-9s5.5 9 10 9 5.5-9 10-9"
        fill="none"
        stroke={`url(#${gradientId})`}
        strokeWidth="3"
        strokeLinecap="round"
      />

      {/* Nœuds */}
      <circle cx="5" cy="27.5" r="3" fill="var(--color-signal)" />
      <circle
        cx="20"
        cy="27.5"
        r="3"
        fill="var(--color-signal)"
        opacity="0.75"
      />
      <circle cx="35" cy="18.5" r="3" fill="var(--color-mint)" />
    </svg>
  );
}

export function Logo({
  tone = "dark",
  className,
  idPrefix,
  href = "/",
}: {
  /** `dark` = texte foncé (fond clair), `light` = texte blanc (fond sombre). */
  tone?: "dark" | "light";
  className?: string;
  idPrefix?: string;
  href?: string;
}) {
  return (
    <Link
      href={href}
      className={cn("group inline-flex items-center gap-2.5", className)}
      aria-label="Synave — accueil"
    >
      <LogoMark
        idPrefix={idPrefix}
        className="h-8 w-8 transition-transform duration-300 group-hover:scale-105"
      />
      <span
        className={cn(
          "font-display text-[1.35rem] font-semibold tracking-[-0.04em]",
          tone === "light" ? "text-white" : "text-ink",
        )}
      >
        Synave
      </span>
    </Link>
  );
}
