import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

type Tone = "brand" | "sage" | "gold" | "neutral" | "terracotta";

const tones: Record<Tone, string> = {
  brand: "bg-brand text-cream",
  sage: "bg-sage-100 text-pine",
  gold: "bg-gold/20 text-gold-600",
  neutral: "bg-sand text-ink-soft",
  terracotta: "bg-terracotta/15 text-terracotta",
};

export function Badge({
  children,
  tone = "neutral",
  className,
}: {
  children: ReactNode;
  tone?: Tone;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium",
        tones[tone],
        className
      )}
    >
      {children}
    </span>
  );
}

/** Badge « Super Gardien » pour les profils les mieux notés. */
export function SuperSitterBadge({ className }: { className?: string }) {
  return (
    <Badge tone="gold" className={cn("font-semibold", className)}>
      ⭐ Super Gardien
    </Badge>
  );
}

/** Bandeau « Garde couverte par l'assurance Chez Gustave ». */
export function InsuranceBadge({ className }: { className?: string }) {
  return (
    <Badge tone="sage" className={className}>
      🛡️ Garde couverte par l&apos;assurance Chez Gustave
    </Badge>
  );
}
