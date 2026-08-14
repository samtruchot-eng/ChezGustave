import { cn } from "@/lib/utils";

/** Marque Gustave : une empreinte de patte stylisée + le nom. */
export function PawMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 48 48"
      className={cn("h-8 w-8", className)}
      aria-hidden="true"
    >
      <circle cx="24" cy="24" r="23" fill="var(--color-forest)" />
      {/* coussinets */}
      <g fill="var(--color-cream)">
        <ellipse cx="16" cy="19" rx="3.1" ry="4.2" />
        <ellipse cx="24" cy="16.5" rx="3.3" ry="4.4" />
        <ellipse cx="32" cy="19" rx="3.1" ry="4.2" />
        <path d="M24 22c5 0 8.5 3.4 8.5 7.3 0 3.2-2.9 4.7-8.5 4.7s-8.5-1.5-8.5-4.7C15.5 25.4 19 22 24 22z" />
      </g>
    </svg>
  );
}

export function Logo({
  className,
  showWordmark = true,
}: {
  className?: string;
  showWordmark?: boolean;
}) {
  return (
    <span className={cn("inline-flex items-center gap-2", className)}>
      <PawMark />
      {showWordmark && (
        <span className="flex flex-col leading-none">
          <span className="font-semibold tracking-tight text-forest text-[1.05rem]">
            Chez Gustave
          </span>
          <span className="text-[0.62rem] text-muted tracking-wide">
            Gardez un chien, partez au vert
          </span>
        </span>
      )}
    </span>
  );
}
