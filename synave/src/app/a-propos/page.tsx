import type { Metadata } from "next";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { CtaBand } from "@/components/site/CtaBand";
import { PageHero } from "@/components/site/PageHero";
import {
  IconCheck,
  IconClock,
  IconCode,
  IconLock,
  IconPin,
  IconRocket,
  IconSwiss,
  IconUsers,
} from "@/components/ui/icons";

export const metadata: Metadata = {
  title: "À propos",
  description:
    "Synave réunit deux métiers rarement au même endroit : la construction de plateformes web sur mesure et l'accompagnement à la création de société en Suisse. Notre méthode et nos engagements.",
  alternates: { canonical: "/a-propos" },
};

const principles = [
  {
    title: "On dit non quand c'est non",
    description:
      "Si votre besoin se règle avec un outil existant à CHF 30 par mois, nous vous le disons — même si cela nous coûte le mandat. Le sur-mesure n'a de sens que là où il crée un vrai avantage.",
    icon: IconCheck,
  },
  {
    title: "Pas de dépendance",
    description:
      "Code, documentation et accès d'infrastructure vous appartiennent dès le premier jour. Vous devez pouvoir partir sans que rien ne s'arrête.",
    icon: IconLock,
  },
  {
    title: "Le langage de votre métier",
    description:
      "Nous ne vous demanderons pas d'apprendre le nôtre. Devis, documentation et formation sont rédigés en français clair, sans jargon technique.",
    icon: IconUsers,
  },
  {
    title: "Livrer, puis livrer encore",
    description:
      "Un logiciel n'est jamais fini. Nous préférons une première version utile en huit semaines à une version parfaite qui n'arrive jamais.",
    icon: IconRocket,
  },
];

const facts = [
  {
    value: "2",
    label: "métiers réunis",
    detail: "Le numérique et la constitution de sociétés, sous un même toit.",
  },
  {
    value: "1 j",
    label: "de délai de réponse",
    detail: "Ouvré, sur toute demande entrante — pendant et après le projet.",
  },
  {
    value: "CH / UE",
    label: "hébergement",
    detail: "Vos données restent en Suisse ou dans l'Union européenne.",
  },
  {
    value: "100 %",
    label: "du code livré",
    detail: "Dépôt Git, documentation et accès remis en fin de mandat.",
  },
];

const how = [
  {
    title: "Nous commençons par écouter",
    text: "Avant de parler technique, nous passons du temps avec les personnes qui utiliseront l'outil au quotidien. C'est là que se trouvent les vrais irritants — rarement dans le cahier des charges initial.",
    icon: IconUsers,
  },
  {
    title: "Nous construisons petit, puis nous étendons",
    text: "Un périmètre resserré, mis en ligne vite, testé en vrai. Les fonctionnalités suivantes sont priorisées par ce que l'usage révèle, pas par ce qu'on imaginait six mois plus tôt.",
    icon: IconCode,
  },
  {
    title: "Nous restons après la mise en ligne",
    text: "La mise en production n'est pas la fin du mandat. Correctifs, montées de version, évolutions : nous restons l'interlocuteur du projet dans la durée.",
    icon: IconClock,
  },
];

export default function AProposPage() {
  return (
    <>
      <PageHero
        eyebrow="À propos"
        title={
          <>
            Deux métiers réunis,{" "}
            <span className="text-gradient">un seul interlocuteur</span>
          </>
        }
        lead="Synave est née d'un constat simple : créer une entreprise en Suisse et la doter des bons outils numériques sont deux parcours qui se croisent en permanence — et que personne ne prend en charge ensemble."
      />

      {/* ---------------------------------------------------------------- */}
      {/* Le pourquoi                                                       */}
      {/* ---------------------------------------------------------------- */}
      <Section>
        <div className="grid gap-12 lg:grid-cols-[1fr_0.9fr] lg:gap-16">
          <div>
            <SectionHeading
              eyebrow="Notre raison d'être"
              title="Le point de bascule d'un entrepreneur n'est jamais technique"
            />

            <div className="mt-8 space-y-5 text-pretty text-lg leading-relaxed text-ink-soft">
              <p>
                Un entrepreneur qui se lance en Suisse enchaîne des
                interlocuteurs qui ne se parlent pas : une fiduciaire pour la
                forme juridique, un notaire pour l&apos;acte, une banque pour le
                capital, une agence pour le site, un informaticien pour les
                accès. Chacun fait bien son travail, personne ne tient le fil.
              </p>
              <p>
                Le même schéma se répète dans les PME déjà installées. Le
                service administratif tient onze fichiers Excel, l&apos;équipe
                commerciale a son propre outil, la direction pilote avec trois
                semaines de retard. Le problème n&apos;est pas la technologie :
                c&apos;est que personne ne regarde l&apos;ensemble.
              </p>
              <p>
                Synave existe pour tenir ce fil, de la constitution de la
                société jusqu&apos;aux outils qui la font tourner — et pour
                rester joignable une fois le projet livré.
              </p>
            </div>
          </div>

          <Reveal className="lg:pt-20">
            <div className="grid gap-4 sm:grid-cols-2">
              {facts.map((fact) => (
                <div
                  key={fact.label}
                  className="rounded-2xl border border-line bg-mist p-6"
                >
                  <p className="font-display text-3xl font-semibold text-ink">
                    {fact.value}
                  </p>
                  <p className="mt-1 text-sm font-medium text-signal-600">
                    {fact.label}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-ink-soft">
                    {fact.detail}
                  </p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </Section>

      {/* ---------------------------------------------------------------- */}
      {/* Principes                                                         */}
      {/* ---------------------------------------------------------------- */}
      <Section tone="dark" className="overflow-hidden">
        <div
          aria-hidden="true"
          className="bg-grid pointer-events-none absolute inset-0 opacity-70"
        />
        <div
          aria-hidden="true"
          className="glow-signal pointer-events-none absolute -right-40 top-0 h-96 w-[36rem]"
        />

        <div className="relative">
          <SectionHeading
            tone="dark"
            eyebrow="Nos principes"
            title="Quatre règles que nous nous appliquons"
            lead="Elles nous ont parfois fait perdre un mandat. Elles nous ont surtout évité des projets que personne n'aurait été fier de livrer."
          />

          <div className="mt-14 grid gap-5 sm:grid-cols-2">
            {principles.map((principle, index) => {
              const Icon = principle.icon;
              return (
                <Reveal key={principle.title} delay={index * 70}>
                  <div className="card-dark h-full p-7">
                    <Icon className="h-6 w-6 text-mint" />
                    <h3 className="mt-5 text-lg font-semibold text-white">
                      {principle.title}
                    </h3>
                    <p className="mt-3 leading-relaxed text-white/60">
                      {principle.description}
                    </p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </Section>

      {/* ---------------------------------------------------------------- */}
      {/* Comment nous travaillons                                          */}
      {/* ---------------------------------------------------------------- */}
      <Section tone="mist">
        <SectionHeading
          eyebrow="Notre façon de faire"
          title="Comment se passe un projet avec nous"
        />

        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {how.map((item, index) => {
            const Icon = item.icon;
            return (
              <Reveal key={item.title} delay={index * 80}>
                <div className="card h-full p-7">
                  <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-signal-100 text-signal-600">
                    <Icon className="h-6 w-6" />
                  </span>
                  <h3 className="mt-6 text-lg font-semibold">{item.title}</h3>
                  <p className="mt-3 leading-relaxed text-ink-soft">
                    {item.text}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </Section>

      {/* ---------------------------------------------------------------- */}
      {/* Où nous intervenons                                               */}
      {/* ---------------------------------------------------------------- */}
      <Section>
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-swiss-100 text-swiss">
              <IconSwiss className="h-7 w-7" />
            </span>
            <SectionHeading
              className="mt-7"
              title="Ancrés en Suisse romande, actifs dans toute la Suisse"
              lead="Nos bureaux sont à Genève. Nous intervenons dans l'ensemble des cantons romands et alémaniques, ainsi qu'auprès de fondateurs établis à l'étranger qui ouvrent une entité suisse."
            />
          </div>

          <div className="card p-8">
            <h3 className="font-mono text-xs uppercase tracking-[0.16em] text-muted">
              Zone d&apos;intervention
            </h3>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {[
                "Genève",
                "Vaud",
                "Valais",
                "Fribourg",
                "Neuchâtel",
                "Jura",
                "Berne",
                "Zurich",
                "Zoug",
                "Tessin",
              ].map((canton) => (
                <li key={canton} className="flex items-center gap-3">
                  <IconPin className="h-4 w-4 shrink-0 text-signal-600" />
                  <span className="text-ink-soft">{canton}</span>
                </li>
              ))}
            </ul>
            <p className="mt-7 border-t border-line pt-6 text-sm leading-relaxed text-ink-soft">
              Les projets se mènent aussi bien en présentiel qu&apos;à distance.
              Pour les mandats de constitution, nous coordonnons un notaire dans
              le canton retenu — et la signature par procuration est possible si
              vous ne pouvez pas vous déplacer.
            </p>
          </div>
        </div>
      </Section>

      <CtaBand
        title="Faisons connaissance"
        lead="Un appel de trente minutes suffit souvent à savoir si nous sommes les bonnes personnes pour votre projet. Et si nous ne le sommes pas, nous vous le dirons."
        primaryLabel="Prendre contact"
      />
    </>
  );
}
