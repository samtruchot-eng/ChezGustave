import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { CtaBand } from "@/components/site/CtaBand";
import { HeroNetwork } from "@/components/home/HeroNetwork";
import {
  IconArrowRight,
  IconArrowUpRight,
  IconCheck,
  IconClock,
  IconCode,
  IconLock,
  IconRefresh,
  IconSparkles,
  IconSwiss,
  IconUsers,
} from "@/components/ui/icons";
import { services } from "@/lib/services";
import { projects } from "@/lib/projects";

export const metadata: Metadata = {
  title: "Synave — Plateformes web et création de société en Suisse",
  description:
    "Synave conçoit des plateformes, extranets, intranets et sites web sur mesure, et accompagne les entrepreneurs dans la création de leur société en Suisse. Genève et Suisse romande.",
  alternates: { canonical: "/" },
};

const trustPoints = [
  "Basés à Genève, actifs dans toute la Suisse",
  "Développement sur mesure, sans dépendance à une agence",
  "Hébergement en Suisse ou dans l'Union européenne",
];

const method = [
  {
    number: "01",
    title: "Cadrage",
    description:
      "Un atelier pour comprendre votre métier, vos utilisateurs et vos contraintes. Nous en ressortons avec un périmètre écrit, un budget et un calendrier.",
    icon: IconUsers,
  },
  {
    number: "02",
    title: "Maquettes",
    description:
      "Vous voyez et cliquez votre futur outil avant la première ligne de code. Les arbitrages coûteux se prennent ici, pas trois mois plus tard.",
    icon: IconSparkles,
  },
  {
    number: "03",
    title: "Développement",
    description:
      "Des livraisons toutes les deux semaines sur un environnement de test. Vous suivez l'avancement en continu, sans effet tunnel.",
    icon: IconCode,
  },
  {
    number: "04",
    title: "Mise en ligne & suivi",
    description:
      "Reprise des données, formation de vos équipes, mise en production. Puis surveillance, correctifs et évolutions au fil de l'eau.",
    icon: IconRefresh,
  },
];

const commitments = [
  {
    title: "Le code vous appartient",
    description:
      "Dépôt Git, documentation et accès d'infrastructure vous sont remis. Vous pouvez reprendre le projet ou changer de prestataire à tout moment.",
    icon: IconLock,
  },
  {
    title: "Un prix ferme, écrit à l'avance",
    description:
      "Le devis détaille chaque lot. Pas de facturation surprise : toute évolution hors périmètre est chiffrée et validée avant d'être développée.",
    icon: IconCheck,
  },
  {
    title: "Un interlocuteur, pas un standard",
    description:
      "La personne qui vous a écouté au premier rendez-vous est celle qui suit votre projet jusqu'à la mise en ligne, puis après.",
    icon: IconUsers,
  },
  {
    title: "Des délais tenus",
    description:
      "Un calendrier de livraisons régulier, et une alerte immédiate si un jalon bouge — plutôt qu'un silence de trois semaines.",
    icon: IconClock,
  },
];

export default function HomePage() {
  const featuredServices = services.filter((s) => s.slug !== "maintenance");
  const featuredProjects = projects.slice(0, 3);

  return (
    <>
      {/* ---------------------------------------------------------------- */}
      {/* Héro                                                              */}
      {/* ---------------------------------------------------------------- */}
      <section className="relative overflow-hidden bg-night pb-24 pt-32 text-white sm:pb-28 sm:pt-40">
        <div
          aria-hidden="true"
          className="bg-grid mask-fade-b pointer-events-none absolute inset-0"
        />
        <div
          aria-hidden="true"
          className="glow-signal pointer-events-none absolute -top-52 left-1/4 h-[36rem] w-[52rem] -translate-x-1/2"
        />
        <div
          aria-hidden="true"
          className="glow-mint pointer-events-none absolute -bottom-40 right-0 h-[28rem] w-[40rem]"
        />

        <Container className="relative">
          <div className="grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10">
            <div className="animate-fade-in-up">
              <p className="chip-dark">
                <span className="h-1.5 w-1.5 rounded-full bg-mint" />
                Genève · Suisse romande
              </p>

              <h1 className="mt-6 text-balance text-4xl font-semibold leading-[1.04] sm:text-5xl md:text-[3.9rem]">
                Vos plateformes web.
                <br />
                <span className="text-gradient">Votre société en Suisse.</span>
              </h1>

              <p className="mt-7 max-w-xl text-pretty text-lg leading-relaxed text-white/65 sm:text-xl">
                Synave conçoit les plateformes, extranets, intranets et sites
                web qui font tourner votre activité — et accompagne les
                entrepreneurs de la constitution de leur société jusqu&apos;à
                leur première facture.
              </p>

              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <ButtonLink href="/contact" size="lg">
                  Parlons de votre projet
                  <IconArrowRight className="h-4 w-4" />
                </ButtonLink>
                <ButtonLink href="/services" variant="onDark" size="lg">
                  Découvrir nos services
                </ButtonLink>
              </div>

              <ul className="mt-10 space-y-2.5">
                {trustPoints.map((point) => (
                  <li
                    key={point}
                    className="flex items-start gap-3 text-[0.95rem] text-white/60"
                  >
                    <IconCheck className="mt-0.5 h-4 w-4 shrink-0 text-mint" />
                    {point}
                  </li>
                ))}
              </ul>
            </div>

            <div className="relative">
              <HeroNetwork className="animate-float mx-auto max-w-lg" />
            </div>
          </div>
        </Container>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* Services                                                          */}
      {/* ---------------------------------------------------------------- */}
      <Section id="services">
        <SectionHeading
          eyebrow="Ce que nous faisons"
          title="Cinq façons de vous rendre opérationnel"
          lead="Du produit numérique le plus ambitieux jusqu'aux formalités de constitution : les briques dont une entreprise a besoin pour exister et fonctionner en Suisse."
        />

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {featuredServices.map((service, index) => {
            const Icon = service.icon;
            const swiss = service.accent === "swiss";

            return (
              <Reveal key={service.slug} delay={index * 70}>
                <Link
                  href={`/services#${service.slug}`}
                  className="card group flex h-full flex-col p-7 transition-all duration-300 hover:-translate-y-1 hover:border-signal-300 hover:shadow-[0_24px_48px_-24px_rgba(10,17,34,0.35)]"
                >
                  <span
                    className={
                      swiss
                        ? "inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-swiss-100 text-swiss"
                        : "inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-signal-100 text-signal-600"
                    }
                  >
                    <Icon className="h-6 w-6" />
                  </span>

                  <h3 className="mt-6 text-xl font-semibold text-ink">
                    {service.title}
                  </h3>
                  <p className="mt-2 text-[0.95rem] font-medium text-muted">
                    {service.tagline}
                  </p>
                  <p className="mt-4 flex-1 text-pretty leading-relaxed text-ink-soft">
                    {service.description}
                  </p>

                  <span
                    className={
                      swiss
                        ? "mt-6 inline-flex items-center gap-2 text-sm font-medium text-swiss"
                        : "mt-6 inline-flex items-center gap-2 text-sm font-medium text-signal-600"
                    }
                  >
                    En savoir plus
                    <IconArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </Section>

      {/* ---------------------------------------------------------------- */}
      {/* Le double métier                                                  */}
      {/* ---------------------------------------------------------------- */}
      <Section tone="mist">
        <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <SectionHeading
              eyebrow="Notre particularité"
              title="Deux métiers qui se répondent"
              lead="La plupart des entrepreneurs jonglent entre une fiduciaire, un notaire, une agence web et un informaticien — qui ne se parlent jamais. Chez Synave, tout part du même bureau."
            />

            <div className="mt-9 space-y-4">
              <div className="card p-6">
                <div className="flex items-center gap-3">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-signal-100 text-signal-600">
                    <IconCode className="h-5 w-5" />
                  </span>
                  <h3 className="text-lg font-semibold">
                    Vous avez déjà une société
                  </h3>
                </div>
                <p className="mt-4 leading-relaxed text-ink-soft">
                  Nous construisons l&apos;outil qui vous manque : la plateforme
                  qui porte votre offre, l&apos;extranet qui apaise votre
                  standard téléphonique, l&apos;intranet qui remplace enfin les
                  douze fichiers Excel.
                </p>
                <Link
                  href="/services"
                  className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-signal-600 hover:text-signal-700"
                >
                  Voir les prestations
                  <IconArrowRight className="h-4 w-4" />
                </Link>
              </div>

              <div className="card border-swiss-100 p-6">
                <div className="flex items-center gap-3">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-swiss-100 text-swiss">
                    <IconSwiss className="h-5 w-5" />
                  </span>
                  <h3 className="text-lg font-semibold">
                    Vous êtes en train de la créer
                  </h3>
                </div>
                <p className="mt-4 leading-relaxed text-ink-soft">
                  Forme juridique, statuts, capital, notaire, registre du
                  commerce, TVA, assurances sociales — puis nom de domaine,
                  e-mails et site web. Une seule personne suit le dossier du
                  début à la fin.
                </p>
                <Link
                  href="/creation-societe"
                  className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-swiss hover:text-swiss-600"
                >
                  Créer ma société
                  <IconArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>

          <Reveal className="lg:pt-16">
            <div className="card overflow-hidden">
              <div className="border-b border-line bg-mist px-7 py-5">
                <p className="font-mono text-xs uppercase tracking-[0.16em] text-muted">
                  Un parcours type
                </p>
                <p className="mt-1.5 font-display text-lg font-semibold">
                  De l&apos;idée à la première facture
                </p>
              </div>

              <ol className="divide-y divide-line">
                {[
                  {
                    week: "Semaine 1",
                    title: "Choix de la forme juridique",
                    detail:
                      "Sàrl, SA ou raison individuelle — arbitré avec vous.",
                  },
                  {
                    week: "Semaines 2–3",
                    title: "Statuts, capital, notaire",
                    detail: "Documents rédigés, compte de consignation ouvert.",
                  },
                  {
                    week: "Semaine 4",
                    title: "Inscription au registre du commerce",
                    detail: "Publication à la FOSC, capital débloqué.",
                  },
                  {
                    week: "Semaines 4–6",
                    title: "TVA, assurances, comptabilité",
                    detail: "Les formalités qui suivent, prises en charge.",
                  },
                  {
                    week: "Semaines 5–10",
                    title: "Marque, site web et outils",
                    detail: "Domaine, e-mails, site de lancement, facturation.",
                  },
                ].map((step, index) => (
                  <li key={step.title} className="flex gap-5 px-7 py-5">
                    <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-signal-100 font-mono text-xs font-semibold text-signal-700">
                      {index + 1}
                    </span>
                    <div>
                      <p className="font-mono text-[0.7rem] uppercase tracking-[0.14em] text-muted">
                        {step.week}
                      </p>
                      <p className="mt-1 font-medium text-ink">{step.title}</p>
                      <p className="mt-1 text-sm leading-relaxed text-ink-soft">
                        {step.detail}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* ---------------------------------------------------------------- */}
      {/* Méthode                                                           */}
      {/* ---------------------------------------------------------------- */}
      <Section>
        <SectionHeading
          eyebrow="Notre méthode"
          title="Quatre étapes, aucune surprise"
          lead="Une manière de travailler pensée pour que vous sachiez, à tout moment, où en est votre projet et ce qu'il vous coûtera."
        />

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {method.map((step, index) => {
            const Icon = step.icon;
            return (
              <Reveal key={step.number} delay={index * 80}>
                <div className="relative h-full rounded-2xl border border-line bg-mist p-7 transition-colors hover:border-signal-300 hover:bg-paper">
                  <span className="font-mono text-sm font-semibold text-signal-300">
                    {step.number}
                  </span>
                  <Icon className="mt-5 h-6 w-6 text-signal-600" />
                  <h3 className="mt-4 text-lg font-semibold">{step.title}</h3>
                  <p className="mt-3 text-[0.95rem] leading-relaxed text-ink-soft">
                    {step.description}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </Section>

      {/* ---------------------------------------------------------------- */}
      {/* Engagements                                                       */}
      {/* ---------------------------------------------------------------- */}
      <Section tone="dark" className="overflow-hidden">
        <div
          aria-hidden="true"
          className="bg-grid pointer-events-none absolute inset-0 opacity-70"
        />
        <div
          aria-hidden="true"
          className="glow-signal pointer-events-none absolute -left-40 top-0 h-96 w-[36rem]"
        />

        <div className="relative">
          <SectionHeading
            tone="dark"
            eyebrow="Nos engagements"
            title="Ce sur quoi vous pouvez nous tenir"
            lead="Quatre principes qui figurent noir sur blanc dans chacun de nos contrats."
          />

          <div className="mt-14 grid gap-5 sm:grid-cols-2">
            {commitments.map((item, index) => {
              const Icon = item.icon;
              return (
                <Reveal key={item.title} delay={index * 70}>
                  <div className="card-dark h-full p-7">
                    <Icon className="h-6 w-6 text-mint" />
                    <h3 className="mt-5 text-lg font-semibold text-white">
                      {item.title}
                    </h3>
                    <p className="mt-3 leading-relaxed text-white/60">
                      {item.description}
                    </p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </Section>

      {/* ---------------------------------------------------------------- */}
      {/* Réalisations                                                      */}
      {/* ---------------------------------------------------------------- */}
      <Section tone="mist">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading
            eyebrow="Réalisations"
            title="Le genre de projets que nous menons"
            lead="Des mandats concrets, présentés de façon anonymisée : le problème de départ, ce qui a été construit, et ce que cela a changé."
          />
          <ButtonLink
            href="/realisations"
            variant="secondary"
            className="shrink-0"
          >
            Tout voir
            <IconArrowRight className="h-4 w-4" />
          </ButtonLink>
        </div>

        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {featuredProjects.map((project, index) => (
            <Reveal key={project.slug} delay={index * 80}>
              <Link
                href={`/realisations#${project.slug}`}
                className="card group flex h-full flex-col p-7 transition-all duration-300 hover:-translate-y-1 hover:border-signal-300"
              >
                <span className="chip w-fit bg-mist">{project.category}</span>
                <h3 className="mt-5 text-lg font-semibold text-ink">
                  {project.title}
                </h3>
                <p className="mt-1.5 text-sm text-muted">{project.sector}</p>
                <p className="mt-4 flex-1 text-[0.95rem] leading-relaxed text-ink-soft">
                  {project.summary}
                </p>
                <span className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-signal-600">
                  Lire le cas
                  <IconArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </Section>

      <CtaBand />
    </>
  );
}
