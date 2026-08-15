import type { Metadata } from "next";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { CtaBand } from "@/components/site/CtaBand";
import { PageHero } from "@/components/site/PageHero";
import { Simulateur } from "@/components/creation/Simulateur";
import { FaqList } from "@/components/creation/FaqList";
import {
  IconArrowRight,
  IconCheck,
  IconClose,
  IconSwiss,
} from "@/components/ui/icons";
import { faq, legalForms, steps, VAT_THRESHOLD } from "@/lib/company";
import { formatCHF } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Créer sa société en Suisse",
  description:
    "Sàrl, SA ou raison individuelle : capital, étapes, délais et coûts réels. Simulateur de constitution et accompagnement complet, du choix de la forme juridique jusqu'à la première facture.",
  alternates: { canonical: "/creation-societe" },
};

/** Données structurées FAQ, pour l'affichage enrichi dans les moteurs. */
const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faq.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: { "@type": "Answer", text: item.answer },
  })),
};

const ownerColors: Record<string, string> = {
  Synave: "bg-signal-100 text-signal-700",
  Vous: "bg-mint-100 text-mint-600",
  Notaire: "bg-swiss-100 text-swiss-600",
  Banque: "bg-mist-200 text-ink-soft",
  "Registre du commerce": "bg-mist-200 text-ink-soft",
};

export default function CreationSocietePage() {
  return (
    <>
      <script
        type="application/ld+json"
        // Contenu statique issu de `src/lib/company.ts`.
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <PageHero
        accent="swiss"
        eyebrow="Création de société en Suisse"
        title={
          <>
            Votre société suisse,{" "}
            <span className="text-gradient">inscrite en quelques semaines</span>
          </>
        }
        lead="Sàrl, SA ou raison individuelle : nous choisissons la bonne forme avec vous, préparons tous les documents, coordonnons le notaire et la banque, et vous accompagnons jusqu'à votre première facture."
      >
        <div className="flex flex-wrap gap-3">
          <ButtonLink href="#simulateur" variant="swiss" size="lg">
            Estimer mon budget
            <IconArrowRight className="h-4 w-4" />
          </ButtonLink>
          <ButtonLink href="/contact" variant="onDark" size="lg">
            Parler à quelqu&apos;un
          </ButtonLink>
        </div>
      </PageHero>

      {/* ---------------------------------------------------------------- */}
      {/* Comparatif des formes juridiques                                  */}
      {/* ---------------------------------------------------------------- */}
      <Section id="formes">
        <SectionHeading
          eyebrow="Choisir sa forme"
          title="Sàrl, SA ou raison individuelle ?"
          lead="Le choix se joue sur trois questions : combien de capital pouvez-vous immobiliser, quel niveau de risque acceptez-vous sur votre patrimoine privé, et prévoyez-vous d'accueillir des investisseurs ?"
        />

        <div className="mt-14 grid gap-5 lg:grid-cols-3">
          {legalForms.map((form, index) => (
            <Reveal key={form.id} delay={index * 80}>
              <div className="card flex h-full flex-col p-7">
                <div className="flex items-baseline justify-between gap-3">
                  <h3 className="font-display text-2xl font-semibold">
                    {form.shortName}
                  </h3>
                  <span className="font-mono text-xs uppercase tracking-[0.12em] text-muted">
                    {form.delayWeeks[0]}–{form.delayWeeks[1]} sem.
                  </span>
                </div>

                <p className="mt-3 text-pretty leading-relaxed text-ink-soft">
                  {form.pitch}
                </p>

                <dl className="mt-6 space-y-3 border-y border-line py-5 text-sm">
                  <div className="flex justify-between gap-4">
                    <dt className="text-muted">Capital minimum</dt>
                    <dd className="text-right font-medium text-ink">
                      {form.capitalMin > 0
                        ? formatCHF(form.capitalMin)
                        : "Aucun"}
                    </dd>
                  </div>
                  <div className="flex justify-between gap-4">
                    <dt className="text-muted">Responsabilité</dt>
                    <dd className="max-w-[60%] text-right text-ink">
                      {form.liability}
                    </dd>
                  </div>
                  <div className="flex justify-between gap-4">
                    <dt className="text-muted">Notaire</dt>
                    <dd className="text-right text-ink">
                      {form.notaryRange ? "Obligatoire" : "Non requis"}
                    </dd>
                  </div>
                  <div className="flex justify-between gap-4">
                    <dt className="text-muted">Fondateurs</dt>
                    <dd className="max-w-[60%] text-right text-ink">
                      {form.founders}
                    </dd>
                  </div>
                </dl>

                <ul className="mt-5 space-y-2.5">
                  {form.pros.map((pro) => (
                    <li key={pro} className="flex gap-3 text-sm">
                      <IconCheck className="mt-0.5 h-4 w-4 shrink-0 text-mint-600" />
                      <span className="text-ink-soft">{pro}</span>
                    </li>
                  ))}
                  {form.cons.map((con) => (
                    <li key={con} className="flex gap-3 text-sm">
                      <IconClose className="mt-0.5 h-4 w-4 shrink-0 text-muted" />
                      <span className="text-muted">{con}</span>
                    </li>
                  ))}
                </ul>

                <p className="mt-6 flex-1 rounded-xl bg-mist p-4 text-sm leading-relaxed text-ink-soft">
                  <strong className="font-semibold text-ink">
                    Le bon choix si :
                  </strong>{" "}
                  {form.bestFor}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        <p className="mt-8 max-w-3xl text-sm leading-relaxed text-muted">
          À noter : l&apos;assujettissement à la TVA devient obligatoire dès{" "}
          {formatCHF(VAT_THRESHOLD)} de chiffre d&apos;affaires annuel, quelle
          que soit la forme juridique retenue.
        </p>
      </Section>

      {/* ---------------------------------------------------------------- */}
      {/* Les étapes                                                        */}
      {/* ---------------------------------------------------------------- */}
      <Section id="etapes" tone="mist">
        <SectionHeading
          eyebrow="Le parcours"
          title="Neuf étapes, de la première question à la première facture"
          lead="Nous portons celles qui vous prendraient le plus de temps, et vous prévenons à l'avance de celles qui dépendent d'un tiers — notaire, banque ou registre du commerce."
        />

        <ol className="mt-14 space-y-3">
          {steps.map((step, index) => (
            <Reveal as="li" key={step.number} delay={index * 50}>
              <div className="card flex flex-col gap-5 p-6 sm:flex-row sm:items-start sm:gap-7 sm:p-7">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-night font-display text-lg font-semibold text-white">
                  {step.number}
                </span>

                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-3">
                    <h3 className="font-display text-lg font-semibold text-ink">
                      {step.title}
                    </h3>
                    <span
                      className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                        ownerColors[step.owner] ?? "bg-mist-200 text-ink-soft"
                      }`}
                    >
                      {step.owner}
                    </span>
                  </div>
                  <p className="mt-2.5 max-w-3xl text-pretty leading-relaxed text-ink-soft">
                    {step.description}
                  </p>
                </div>

                <span className="shrink-0 font-mono text-sm text-muted sm:text-right">
                  {step.duration}
                </span>
              </div>
            </Reveal>
          ))}
        </ol>
      </Section>

      {/* ---------------------------------------------------------------- */}
      {/* Simulateur                                                        */}
      {/* ---------------------------------------------------------------- */}
      <Section id="simulateur">
        <SectionHeading
          eyebrow="Simulateur"
          title="Combien va coûter votre constitution ?"
          lead="Choisissez la forme juridique, le canton et les prestations dont vous avez besoin : l'estimation se met à jour en direct — capital à verser, frais officiels, honoraires et délai."
        />

        <div className="mt-14">
          <Simulateur />
        </div>
      </Section>

      {/* ---------------------------------------------------------------- */}
      {/* Ce qui vient après                                                */}
      {/* ---------------------------------------------------------------- */}
      <Section tone="dark" className="overflow-hidden">
        <div
          aria-hidden="true"
          className="bg-grid pointer-events-none absolute inset-0 opacity-70"
        />
        <div className="relative grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-swiss/15 text-swiss">
              <IconSwiss className="h-7 w-7" />
            </span>
            <SectionHeading
              tone="dark"
              className="mt-7"
              title="Une société inscrite, ce n'est que le début"
              lead="Le jour où l'extrait du registre du commerce arrive, il reste à ouvrir les comptes, s'affilier aux assurances sociales, facturer — et se rendre visible. C'est exactement là que notre second métier prend le relais."
            />
            <ButtonLink href="/services" variant="onDark" className="mt-9">
              Voir nos services numériques
              <IconArrowRight className="h-4 w-4" />
            </ButtonLink>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {[
              {
                title: "Comptabilité & facturation",
                text: "Plan comptable, outil de facturation, première clôture accompagnée.",
              },
              {
                title: "Assurances sociales",
                text: "AVS, LPP, assurance accidents et couvertures complémentaires.",
              },
              {
                title: "Identité & domaine",
                text: "Logo, nom de domaine, e-mails professionnels, modèles de documents.",
              },
              {
                title: "Site & outils métier",
                text: "Site de lancement, espace client, automatisations internes.",
              },
            ].map((item, index) => (
              <Reveal key={item.title} delay={index * 70}>
                <div className="card-dark h-full p-6">
                  <h3 className="font-display font-semibold text-white">
                    {item.title}
                  </h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-white/60">
                    {item.text}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </Section>

      {/* ---------------------------------------------------------------- */}
      {/* FAQ                                                               */}
      {/* ---------------------------------------------------------------- */}
      <Section id="faq" tone="mist">
        <SectionHeading
          eyebrow="Questions fréquentes"
          title="Ce que l'on nous demande le plus souvent"
        />

        <div className="mt-12">
          <FaqList items={faq} />
        </div>

        <p className="mt-8 max-w-3xl text-sm leading-relaxed text-muted">
          Ces informations sont fournies à titre général et reflètent la
          situation ordinaire d&apos;une constitution en Suisse. Elles ne
          remplacent pas un conseil juridique ou fiscal adapté à votre cas — que
          nous établissons avec vous, et avec un notaire, lors du cadrage.
        </p>
      </Section>

      <CtaBand
        title="Discutons de votre projet de société"
        lead="Un premier entretien pour arrêter la forme juridique, le canton et le calendrier. Vous repartez avec une feuille de route claire et un devis ferme."
        primaryLabel="Lancer ma création"
      />
    </>
  );
}
