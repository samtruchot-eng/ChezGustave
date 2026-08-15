import type { Metadata } from "next";
import Link from "next/link";
import { ButtonLink } from "@/components/ui/Button";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { CtaBand } from "@/components/site/CtaBand";
import { PageHero } from "@/components/site/PageHero";
import {
  IconArrowRight,
  IconCheck,
  IconClock,
  IconSparkles,
  IconUsers,
} from "@/components/ui/icons";
import { services } from "@/lib/services";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Plateformes web sur mesure, extranet et espace client, intranet et outils internes, sites web et e-commerce, création de société en Suisse, maintenance et infogérance.",
  alternates: { canonical: "/services" },
};

const stack = [
  {
    title: "Interface",
    items: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
  },
  {
    title: "Serveur & données",
    items: ["Node.js", "PostgreSQL", "Prisma", "API REST & GraphQL"],
  },
  {
    title: "Infrastructure",
    items: [
      "Hébergement CH / UE",
      "CI/CD",
      "Sauvegardes chiffrées",
      "Monitoring",
    ],
  },
  {
    title: "Intégrations",
    items: [
      "Stripe",
      "Signature électronique",
      "SSO / Microsoft 365",
      "ERP & CRM",
    ],
  },
];

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Nos services"
        title={
          <>
            Le numérique qui fait tourner votre entreprise,{" "}
            <span className="text-gradient">
              et l&apos;entreprise elle-même
            </span>
          </>
        }
        lead="Six prestations qui se combinent : construire l'outil, l'exploiter dans la durée, et — si vous démarrez — créer la structure juridique qui va avec."
      >
        <div className="flex flex-wrap gap-2">
          {services.map((service) => (
            <Link
              key={service.slug}
              href={`#${service.slug}`}
              className="chip-dark transition-colors hover:border-mint/50 hover:text-white"
            >
              {service.title}
            </Link>
          ))}
        </div>
      </PageHero>

      {services.map((service, index) => {
        const Icon = service.icon;
        const swiss = service.accent === "swiss";
        const isCompanyService = service.slug === "creation-societe";

        return (
          <Section
            key={service.slug}
            id={service.slug}
            tone={index % 2 === 0 ? "light" : "mist"}
          >
            <div className="grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16">
              {/* Colonne présentation */}
              <div>
                <div className="flex items-center gap-4">
                  <span
                    className={cn(
                      "inline-flex h-14 w-14 items-center justify-center rounded-2xl",
                      swiss
                        ? "bg-swiss-100 text-swiss"
                        : "bg-signal-100 text-signal-600",
                    )}
                  >
                    <Icon className="h-7 w-7" />
                  </span>
                  <span className="font-mono text-sm text-muted">
                    {String(index + 1).padStart(2, "0")} /{" "}
                    {String(services.length).padStart(2, "0")}
                  </span>
                </div>

                <h2 className="mt-7 text-balance text-3xl font-semibold leading-[1.14] sm:text-4xl">
                  {service.title}
                </h2>
                <p
                  className={cn(
                    "mt-3 text-lg font-medium",
                    swiss ? "text-swiss" : "text-signal-600",
                  )}
                >
                  {service.tagline}
                </p>
                <p className="mt-6 text-pretty text-lg leading-relaxed text-ink-soft">
                  {service.description}
                </p>

                <dl className="mt-9 grid gap-4 sm:grid-cols-3">
                  <div className="rounded-xl border border-line bg-paper p-4">
                    <dt className="flex items-center gap-2 text-xs uppercase tracking-[0.12em] text-muted">
                      <IconUsers className="h-3.5 w-3.5" />
                      Pour qui
                    </dt>
                    <dd className="mt-2 text-sm leading-relaxed text-ink">
                      {service.audience}
                    </dd>
                  </div>
                  <div className="rounded-xl border border-line bg-paper p-4">
                    <dt className="flex items-center gap-2 text-xs uppercase tracking-[0.12em] text-muted">
                      <IconClock className="h-3.5 w-3.5" />
                      Délai
                    </dt>
                    <dd className="mt-2 text-sm leading-relaxed text-ink">
                      {service.duration}
                    </dd>
                  </div>
                  <div className="rounded-xl border border-line bg-paper p-4">
                    <dt className="flex items-center gap-2 text-xs uppercase tracking-[0.12em] text-muted">
                      <IconSparkles className="h-3.5 w-3.5" />
                      Budget indicatif
                    </dt>
                    <dd className="mt-2 text-sm leading-relaxed text-ink">
                      {service.budget}
                    </dd>
                  </div>
                </dl>

                <div className="mt-8 flex flex-wrap gap-3">
                  <ButtonLink
                    href="/contact"
                    variant={swiss ? "swiss" : "primary"}
                  >
                    Demander un devis
                    <IconArrowRight className="h-4 w-4" />
                  </ButtonLink>
                  {isCompanyService && (
                    <ButtonLink href="/creation-societe" variant="secondary">
                      Le guide complet & le simulateur
                    </ButtonLink>
                  )}
                </div>
              </div>

              {/* Colonne contenu de la prestation */}
              <Reveal>
                <div className="card h-full p-8">
                  <h3 className="font-mono text-xs uppercase tracking-[0.16em] text-muted">
                    Ce que comprend la prestation
                  </h3>
                  <ul className="mt-6 space-y-4">
                    {service.includes.map((item) => (
                      <li key={item} className="flex gap-3.5">
                        <span
                          className={cn(
                            "mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full",
                            swiss
                              ? "bg-swiss-100 text-swiss"
                              : "bg-signal-100 text-signal-600",
                          )}
                        >
                          <IconCheck className="h-3 w-3" />
                        </span>
                        <span className="leading-relaxed text-ink-soft">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            </div>
          </Section>
        );
      })}

      {/* Technologies */}
      <Section tone="dark" className="overflow-hidden">
        <div
          aria-hidden="true"
          className="bg-grid pointer-events-none absolute inset-0 opacity-70"
        />
        <div className="relative">
          <SectionHeading
            tone="dark"
            eyebrow="Sous le capot"
            title="Des technologies éprouvées, pas des paris"
            lead="Nous travaillons avec un socle stable, largement adopté et bien documenté. C'est ce qui garantit que votre projet reste maintenable — par nous, ou par quelqu'un d'autre."
          />

          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {stack.map((group, index) => (
              <Reveal key={group.title} delay={index * 70}>
                <div className="card-dark h-full p-6">
                  <h3 className="font-display text-sm font-semibold uppercase tracking-[0.14em] text-mint">
                    {group.title}
                  </h3>
                  <ul className="mt-5 space-y-2.5">
                    {group.items.map((item) => (
                      <li
                        key={item}
                        className="flex items-center gap-2.5 text-[0.95rem] text-white/70"
                      >
                        <span className="h-1 w-1 rounded-full bg-white/35" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>

          <p className="mt-10 max-w-2xl text-sm leading-relaxed text-white/45">
            Le budget indiqué pour chaque prestation est un ordre de grandeur
            destiné à situer votre projet. Le devis définitif est établi après
            le cadrage, et détaille chaque lot.
          </p>
        </div>
      </Section>

      <CtaBand />
    </>
  );
}
