import { cn } from "@/lib/utils";

type Satellite = {
  label: string;
  x: number;
  y: number;
  width: number;
  accent: "signal" | "mint" | "swiss";
  delay: number;
};

/** Les cinq branches de l'offre, disposées autour du nœud central. */
const satellites: Satellite[] = [
  { label: "Plateforme", x: 78, y: 74, width: 104, accent: "signal", delay: 0 },
  { label: "Extranet", x: 366, y: 62, width: 94, accent: "mint", delay: 0.8 },
  {
    label: "Intranet",
    x: 396,
    y: 236,
    width: 94,
    accent: "signal",
    delay: 1.6,
  },
  { label: "Site web", x: 238, y: 344, width: 94, accent: "mint", delay: 2.4 },
  {
    label: "Sàrl / SA",
    x: 62,
    y: 262,
    width: 100,
    accent: "swiss",
    delay: 3.2,
  },
];

const accentVar = {
  signal: "var(--color-signal)",
  mint: "var(--color-mint)",
  swiss: "var(--color-swiss)",
} as const;

/**
 * Illustration du héros : un nœud central « Synave » relié aux cinq branches de
 * l'offre. Purement décoratif — masqué aux lecteurs d'écran.
 */
export function HeroNetwork({ className }: { className?: string }) {
  const cx = 226;
  const cy = 198;

  return (
    <svg
      viewBox="0 0 460 400"
      className={cn("h-auto w-full", className)}
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <linearGradient id="hero-core" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="var(--color-signal)" />
          <stop offset="100%" stopColor="var(--color-mint-600)" />
        </linearGradient>
        <radialGradient id="hero-halo">
          <stop
            offset="0%"
            stopColor="var(--color-signal)"
            stopOpacity="0.45"
          />
          <stop offset="100%" stopColor="var(--color-signal)" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Halo derrière le nœud central */}
      <circle cx={cx} cy={cy} r="150" fill="url(#hero-halo)" />

      {/* Anneaux concentriques */}
      <circle
        cx={cx}
        cy={cy}
        r="96"
        fill="none"
        stroke="rgba(255,255,255,0.09)"
      />
      <circle
        cx={cx}
        cy={cy}
        r="140"
        fill="none"
        stroke="rgba(255,255,255,0.055)"
      />

      {/* Liaisons animées */}
      {satellites.map((satellite) => (
        <line
          key={`link-${satellite.label}`}
          x1={cx}
          y1={cy}
          x2={satellite.x}
          y2={satellite.y}
          stroke={accentVar[satellite.accent]}
          strokeOpacity="0.5"
          strokeWidth="1.4"
          className="animate-dash"
          style={{ animationDelay: `${satellite.delay}s` }}
        />
      ))}

      {/* Étiquettes des branches */}
      {satellites.map((satellite) => (
        <g key={satellite.label}>
          <rect
            x={satellite.x - satellite.width / 2}
            y={satellite.y - 17}
            width={satellite.width}
            height="34"
            rx="17"
            fill="#0c1426"
            stroke={accentVar[satellite.accent]}
            strokeOpacity="0.45"
          />
          <circle
            cx={satellite.x - satellite.width / 2 + 17}
            cy={satellite.y}
            r="3.5"
            fill={accentVar[satellite.accent]}
          />
          <text
            x={satellite.x + 8}
            y={satellite.y + 4.5}
            textAnchor="middle"
            fill="rgba(255,255,255,0.86)"
            fontSize="13.5"
            fontWeight="500"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {satellite.label}
          </text>
        </g>
      ))}

      {/* Nœud central */}
      <circle
        cx={cx}
        cy={cy}
        r="54"
        fill="url(#hero-core)"
        opacity="0.16"
        stroke="url(#hero-core)"
        strokeOpacity="0.6"
      />
      <circle cx={cx} cy={cy} r="40" fill="#0c1426" stroke="url(#hero-core)" />
      <text
        x={cx}
        y={cy + 6}
        textAnchor="middle"
        fill="#ffffff"
        fontSize="18"
        fontWeight="600"
        letterSpacing="-0.5"
        style={{ fontFamily: "var(--font-display)" }}
      >
        Synave
      </text>
    </svg>
  );
}
