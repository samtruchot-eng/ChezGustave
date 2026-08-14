import { cn } from "@/lib/utils";

/**
 * Marque Gustave — un emblème rond (façon tampon) avec le teckel « gentleman »
 * (nœud papillon) au centre. Crème sur terracotta : lisible partout, même petit.
 */
export function GustaveMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 100"
      className={cn("h-9 w-9", className)}
      role="img"
      aria-label="Gustave, le teckel de Chez Gustave"
    >
      <circle cx="50" cy="50" r="50" fill="var(--color-brand)" />
      <circle
        cx="50"
        cy="50"
        r="43"
        fill="none"
        stroke="var(--color-cream)"
        strokeWidth="1.5"
        strokeOpacity="0.6"
      />
      <g transform="translate(9,12) scale(0.72)">
        <g fill="var(--color-cream)">
          {/* pattes */}
          <rect x="28" y="58" width="6.5" height="20" rx="3.25" />
          <rect x="39" y="58" width="6.5" height="20" rx="3.25" />
          <rect x="60" y="58" width="6.5" height="20" rx="3.25" />
          <rect x="70" y="58" width="6.5" height="20" rx="3.25" />
          {/* queue */}
          <path d="M20 52 Q13 47 12 35 Q19 41 26 52 Z" />
          {/* corps */}
          <ellipse cx="47" cy="52" rx="31" ry="11" />
          {/* poitrail */}
          <path d="M62 50 Q70 40 78 44 L78 60 Q68 62 62 58 Z" />
          {/* tête */}
          <circle cx="79" cy="45" r="11.5" />
          {/* museau */}
          <path d="M86 40 L96 43 Q99 44 98 47 L97 50 Q96 53 93 52 L86 51 Z" />
          {/* oreille */}
          <path d="M72 42 Q66 44 66 54 Q66 60 71 60 Q75 58 75 50 Q75 44 72 42 Z" />
        </g>
        {/* œil & truffe (couleur du fond) */}
        <circle cx="82" cy="43" r="1.9" fill="var(--color-brand)" />
        <circle cx="96.5" cy="46" r="2.1" fill="var(--color-brand)" />
        {/* nœud papillon */}
        <g fill="var(--color-gold)">
          <path d="M72 58 L66 54 L66 62 Z" />
          <path d="M72 58 L78 54 L78 62 Z" />
          <rect x="70.5" y="55.5" width="3" height="5" rx="1" />
        </g>
      </g>
    </svg>
  );
}

/** Ancien nom conservé pour compatibilité. */
export const PawMark = GustaveMark;

export function Logo({
  className,
  showWordmark = true,
}: {
  className?: string;
  showWordmark?: boolean;
}) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <GustaveMark />
      {showWordmark && (
        <span className="flex flex-col leading-none">
          <span className="font-serif text-[1.2rem] font-semibold tracking-tight text-brand">
            Chez Gustave
          </span>
          <span className="mt-0.5 text-[0.62rem] tracking-wide text-muted">
            Gardez un chien, partez au vert
          </span>
        </span>
      )}
    </span>
  );
}
