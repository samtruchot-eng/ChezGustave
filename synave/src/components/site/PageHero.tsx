import { Container } from "@/components/ui/Container";
import { cn } from "@/lib/utils";

/**
 * Héro sombre commun à toutes les pages intérieures : il donne à l'en-tête
 * transparent un fond sur lequel se poser.
 */
export function PageHero({
  eyebrow,
  title,
  lead,
  children,
  accent = "signal",
}: {
  eyebrow: string;
  title: React.ReactNode;
  lead?: React.ReactNode;
  children?: React.ReactNode;
  accent?: "signal" | "swiss";
}) {
  return (
    <section className="relative overflow-hidden bg-night pb-20 pt-36 text-white sm:pb-24 sm:pt-44">
      <div
        aria-hidden="true"
        className="bg-grid mask-fade-b pointer-events-none absolute inset-0"
      />
      <div
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute -top-32 left-1/2 h-[30rem] w-[64rem] -translate-x-1/2",
          accent === "swiss"
            ? "bg-[radial-gradient(50%_50%_at_50%_50%,rgba(225,56,43,0.3)_0%,rgba(225,56,43,0)_100%)]"
            : "glow-signal",
        )}
      />

      <Container className="relative">
        <p
          className={cn(
            "font-mono text-xs font-medium uppercase tracking-[0.2em]",
            accent === "swiss" ? "text-swiss" : "text-mint",
          )}
        >
          {eyebrow}
        </p>
        <h1 className="mt-5 max-w-4xl text-balance text-4xl font-semibold leading-[1.06] sm:text-5xl md:text-6xl">
          {title}
        </h1>
        {lead && (
          <p className="mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-white/65 sm:text-xl">
            {lead}
          </p>
        )}
        {children && <div className="mt-9">{children}</div>}
      </Container>
    </section>
  );
}
