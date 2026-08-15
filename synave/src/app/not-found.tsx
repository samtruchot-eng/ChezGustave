import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";
import { IconArrowRight } from "@/components/ui/icons";
import { navigation } from "@/lib/site";
import Link from "next/link";

export default function NotFound() {
  return (
    <section className="relative flex min-h-[70vh] items-center overflow-hidden bg-night py-32 text-white">
      <div
        aria-hidden="true"
        className="bg-grid pointer-events-none absolute inset-0 opacity-70"
      />
      <div
        aria-hidden="true"
        className="glow-signal pointer-events-none absolute left-1/2 top-0 h-96 w-[42rem] -translate-x-1/2"
      />

      <Container className="relative text-center">
        <p className="font-mono text-sm uppercase tracking-[0.2em] text-mint">
          Erreur 404
        </p>
        <h1 className="mt-6 text-balance text-4xl font-semibold sm:text-5xl">
          Cette page n&apos;existe pas
        </h1>
        <p className="mx-auto mt-5 max-w-lg text-pretty text-lg leading-relaxed text-white/60">
          Le lien est peut-être ancien, ou l&apos;adresse comporte une coquille.
          Voici par où reprendre.
        </p>

        <div className="mt-9 flex justify-center">
          <ButtonLink href="/" size="lg">
            Retour à l&apos;accueil
            <IconArrowRight className="h-4 w-4" />
          </ButtonLink>
        </div>

        <ul className="mt-10 flex flex-wrap justify-center gap-2">
          {navigation.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="chip-dark transition-colors hover:border-mint/50 hover:text-white"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
