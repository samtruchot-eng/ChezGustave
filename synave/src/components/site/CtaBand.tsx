import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";
import { IconArrowRight, IconClock, IconPhone } from "@/components/ui/icons";
import { site } from "@/lib/site";

/** Bandeau d'appel à l'action, repris en bas de chaque page. */
export function CtaBand({
  title = "Un projet en tête ? Parlons-en trente minutes.",
  lead = "Un premier échange sans engagement pour cadrer votre besoin, estimer le budget et le calendrier. Vous repartez avec une vision claire, que nous travaillions ensemble ou non.",
  primaryLabel = "Décrire mon projet",
}: {
  title?: string;
  lead?: string;
  primaryLabel?: string;
}) {
  return (
    <section className="relative overflow-hidden bg-night py-20 text-white sm:py-24">
      <div
        aria-hidden="true"
        className="bg-grid pointer-events-none absolute inset-0 opacity-70"
      />
      <div
        aria-hidden="true"
        className="glow-mint pointer-events-none absolute -bottom-40 right-0 h-96 w-[40rem]"
      />
      <div
        aria-hidden="true"
        className="glow-signal pointer-events-none absolute -top-40 left-0 h-96 w-[40rem]"
      />

      <Container className="relative">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-balance text-3xl font-semibold leading-[1.12] sm:text-4xl md:text-[2.6rem]">
            {title}
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-white/65">
            {lead}
          </p>

          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <ButtonLink href="/contact" size="lg">
              {primaryLabel}
              <IconArrowRight className="h-4 w-4" />
            </ButtonLink>
            <ButtonLink
              href={`tel:${site.contact.phoneHref}`}
              variant="onDark"
              size="lg"
            >
              <IconPhone className="h-4 w-4" />
              {site.contact.phone}
            </ButtonLink>
          </div>

          <p className="mt-7 inline-flex items-center gap-2 text-sm text-white/45">
            <IconClock className="h-4 w-4" />
            Réponse sous un jour ouvrable
          </p>
        </div>
      </Container>
    </section>
  );
}
