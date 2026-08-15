import type { Metadata } from "next";
import { Section } from "@/components/ui/Section";
import { CtaBand } from "@/components/site/CtaBand";
import { PageHero } from "@/components/site/PageHero";
import { ProjectsGrid } from "@/components/realisations/ProjectsGrid";

export const metadata: Metadata = {
  title: "Réalisations",
  description:
    "Marketplace, extranet de fiduciaire, intranet industriel, site institutionnel trilingue, portail immobilier, création de société : les mandats types menés par Synave.",
  alternates: { canonical: "/realisations" },
};

export default function RealisationsPage() {
  return (
    <>
      <PageHero
        eyebrow="Réalisations"
        title={
          <>
            Des mandats concrets,{" "}
            <span className="text-gradient">racontés sans jargon</span>
          </>
        }
        lead="Pour chaque projet : le problème de départ, ce qui a été construit, et ce que cela a changé au quotidien."
      />

      <Section>
        <div className="mb-10 rounded-2xl border border-line bg-mist px-6 py-5">
          <p className="text-sm leading-relaxed text-ink-soft">
            <strong className="font-semibold text-ink">
              Une précision sur cette page :
            </strong>{" "}
            nos mandats sont présentés de façon anonymisée — secteur et canton
            plutôt que nom du client. Beaucoup de ces projets portent sur des
            outils internes ou des données sensibles, et nous ne publions le nom
            d&apos;un client qu&apos;avec son accord écrit. Des références
            nominatives peuvent vous être communiquées sur demande, lors
            d&apos;un entretien.
          </p>
        </div>

        <ProjectsGrid />
      </Section>

      <CtaBand
        title="Votre projet ressemble à l'un de ceux-là ?"
        lead="Décrivez-nous votre situation : nous vous dirons franchement ce qui est faisable, dans quel ordre, et à quel budget."
      />
    </>
  );
}
