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

/**
 * Marque typographique « Chez Gustave » : « CHEZ » en Sora (moderne) +
 * « Gustave » écrit d'un seul brin de laisse — la poignée s'accroche au G,
 * le mousqueton pend du e, avec quelques nœuds le long du cordon.
 *
 * Tout est en `em` : régler `size` (hauteur de « Gustave » en px) suffit à
 * mettre l'ensemble à l'échelle.
 */
export function LeashWordmark({
  size = 26,
  chezColor = "var(--color-ink)",
  scriptColor = "var(--color-brand)",
  accentColor,
  className,
  title = "Chez Gustave",
}: {
  size?: number;
  chezColor?: string;
  scriptColor?: string;
  accentColor?: string;
  className?: string;
  title?: string;
}) {
  const acc = accentColor ?? scriptColor;
  return (
    <span
      role="img"
      aria-label={title}
      className={cn("inline-flex select-none items-center", className)}
      style={{ fontSize: size, gap: "0.08em", lineHeight: 1 }}
    >
      <span
        aria-hidden
        style={{
          fontFamily: "var(--font-modern)",
          fontWeight: 600,
          fontSize: "0.33em",
          letterSpacing: "0.075em",
          textTransform: "uppercase",
          color: chezColor,
        }}
      >
        Chez
      </span>

      <span aria-hidden className="relative inline-flex items-center">
        {/* Poignée accrochée au G */}
        <svg
          viewBox="0 0 96 96"
          style={{
            width: "0.5em",
            marginRight: "-0.25em",
            marginTop: "-0.25em",
            flex: "0 0 auto",
          }}
        >
          <path
            fill="none"
            stroke={acc}
            strokeWidth="3.6"
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M86 22 C 58 6, 18 10, 14 40 C 11 64, 44 74, 52 52 C 57 38, 38 30, 30 42"
          />
        </svg>

        {/* « Gustave » (le cordon) + nœuds qui courent le long du brin */}
        <span className="relative inline-block">
          <span
            style={{
              fontFamily: "var(--font-script)",
              fontSize: "1em",
              lineHeight: 1,
              whiteSpace: "nowrap",
              padding: "0 0.05em",
              color: scriptColor,
              position: "relative",
              zIndex: 2,
            }}
          >
            Gustave
          </span>
          <svg
            viewBox="0 0 700 260"
            preserveAspectRatio="none"
            className="pointer-events-none absolute inset-0 h-full w-full"
            style={{ zIndex: 3 }}
          >
            <g
              fill="none"
              stroke={acc}
              strokeWidth="6"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M70 150 C 96 92, 168 84, 176 132 C 182 168, 130 172, 132 138" />
              <path d="M470 150 C 512 196, 576 190, 582 140 C 586 104, 548 102, 552 138" />
            </g>
          </svg>
        </span>

        {/* Nœud final + mousqueton pendu au e */}
        <svg
          viewBox="0 0 200 100"
          style={{
            width: "1.23em",
            marginLeft: "-0.21em",
            marginTop: "0.11em",
            flex: "0 0 auto",
            zIndex: 4,
          }}
        >
          <g
            fill="none"
            stroke={acc}
            strokeWidth="3.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M2 50 C 30 50, 36 22, 58 30 C 82 39, 66 64, 46 55 C 30 47, 44 26, 70 30 C 98 34, 96 66, 124 58 C 140 53, 144 54, 156 54" />
            <circle cx="162" cy="54" r="6" />
            <path d="M168 54 C 186 49, 190 62, 183 74 C 178 82, 164 82, 161 73 L 161 60" />
          </g>
        </svg>
      </span>
    </span>
  );
}

export function Logo({
  className,
  showWordmark = true,
  showTagline = true,
  size = 26,
  chezColor,
  scriptColor,
  accentColor,
}: {
  className?: string;
  showWordmark?: boolean;
  showTagline?: boolean;
  size?: number;
  chezColor?: string;
  scriptColor?: string;
  accentColor?: string;
}) {
  if (!showWordmark) return <GustaveMark className={className} />;
  const emblem = Math.round(size * 1.35);
  return (
    <span className={cn("inline-flex items-center gap-2", className)}>
      <span
        className="shrink-0"
        style={{ width: emblem, height: emblem }}
        aria-hidden
      >
        <GustaveMark className="h-full w-full" />
      </span>
      <span className="inline-flex flex-col leading-none">
        <LeashWordmark
          size={size}
          chezColor={chezColor}
          scriptColor={scriptColor}
          accentColor={accentColor}
        />
        {showTagline && (
          <span
            className="mt-1 pl-0.5 tracking-wide text-muted"
            style={{ fontSize: Math.max(10, size * 0.34) }}
          >
            Le bonheur des chiens, la sérénité des maîtres
          </span>
        )}
      </span>
    </span>
  );
}
