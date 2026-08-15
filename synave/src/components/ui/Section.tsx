import { cn } from "@/lib/utils";
import { Container } from "./Container";

/** Section de page avec rythme vertical homogène. */
export function Section({
  id,
  className,
  containerClassName,
  tone = "light",
  children,
}: {
  id?: string;
  className?: string;
  containerClassName?: string;
  /** Fond de la section. */
  tone?: "light" | "mist" | "dark";
  children: React.ReactNode;
}) {
  const tones = {
    light: "bg-paper text-ink",
    mist: "bg-mist text-ink",
    dark: "bg-night text-white",
  } as const;

  return (
    <section
      id={id}
      className={cn(
        "relative py-20 sm:py-28",
        tones[tone],
        // Décale l'ancre pour ne pas passer sous l'en-tête fixe
        id && "scroll-mt-24",
        className,
      )}
    >
      <Container className={containerClassName}>{children}</Container>
    </section>
  );
}

/** Bandeau de titre : sur-titre, titre, chapô. */
export function SectionHeading({
  eyebrow,
  title,
  lead,
  align = "left",
  tone = "light",
  className,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  lead?: React.ReactNode;
  align?: "left" | "center";
  tone?: "light" | "dark";
  className?: string;
}) {
  const dark = tone === "dark";

  return (
    <div
      className={cn(
        "max-w-3xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      {eyebrow && (
        <p
          className={cn(
            "mb-4 font-mono text-xs font-medium uppercase tracking-[0.18em]",
            dark ? "text-mint" : "text-signal-600",
          )}
        >
          {eyebrow}
        </p>
      )}
      <h2
        className={cn(
          "text-balance text-3xl font-semibold leading-[1.12] sm:text-4xl md:text-[2.7rem]",
          dark ? "text-white" : "text-ink",
        )}
      >
        {title}
      </h2>
      {lead && (
        <p
          className={cn(
            "mt-5 text-pretty text-lg leading-relaxed",
            dark ? "text-white/65" : "text-ink-soft",
          )}
        >
          {lead}
        </p>
      )}
    </div>
  );
}
