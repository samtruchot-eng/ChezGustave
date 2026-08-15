import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { PageHero } from "@/components/site/PageHero";
import { ContactForm } from "@/components/contact/ContactForm";
import {
  IconClock,
  IconMail,
  IconPhone,
  IconPin,
  IconSwiss,
  IconUsers,
} from "@/components/ui/icons";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Parlons de votre plateforme, de votre extranet, de votre site web ou de la création de votre société en Suisse. Réponse sous un jour ouvrable.",
  alternates: { canonical: "/contact" },
};

const expectations = [
  {
    title: "Un premier échange de 30 minutes",
    text: "Par téléphone ou en visioconférence, pour comprendre votre situation et vos contraintes. Sans engagement.",
    icon: IconUsers,
  },
  {
    title: "Une réponse écrite sous 5 jours",
    text: "Périmètre proposé, budget, calendrier. Assez précis pour être comparé à une autre offre.",
    icon: IconClock,
  },
  {
    title: "Un avis franc",
    text: "Si votre besoin se règle avec un outil du marché, ou si un autre prestataire est mieux placé, nous vous le dirons.",
    icon: IconSwiss,
  },
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title={
          <>
            Racontez-nous votre projet,{" "}
            <span className="text-gradient">on s&apos;occupe du reste</span>
          </>
        }
        lead="Une plateforme à construire, un extranet à ouvrir, un site à refaire ou une société à créer : décrivez votre situation en quelques phrases."
      />

      <Section>
        <div className="grid gap-10 lg:grid-cols-[1.25fr_0.75fr] lg:items-start lg:gap-14">
          <ContactForm />

          <aside className="space-y-6">
            {/* Coordonnées */}
            <div className="card p-7">
              <h2 className="font-mono text-xs uppercase tracking-[0.16em] text-muted">
                Nous joindre directement
              </h2>

              <div className="mt-6 space-y-5">
                <a
                  href={`mailto:${site.contact.email}`}
                  className="group flex items-start gap-4"
                >
                  <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-signal-100 text-signal-600">
                    <IconMail className="h-5 w-5" />
                  </span>
                  <span>
                    <span className="block text-sm text-muted">E-mail</span>
                    <span className="block font-medium text-ink transition-colors group-hover:text-signal-600">
                      {site.contact.email}
                    </span>
                  </span>
                </a>

                <a
                  href={`tel:${site.contact.phoneHref}`}
                  className="group flex items-start gap-4"
                >
                  <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-signal-100 text-signal-600">
                    <IconPhone className="h-5 w-5" />
                  </span>
                  <span>
                    <span className="block text-sm text-muted">Téléphone</span>
                    <span className="block font-medium text-ink transition-colors group-hover:text-signal-600">
                      {site.contact.phone}
                    </span>
                  </span>
                </a>

                <div className="flex items-start gap-4">
                  <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-signal-100 text-signal-600">
                    <IconPin className="h-5 w-5" />
                  </span>
                  <span>
                    <span className="block text-sm text-muted">Bureaux</span>
                    <span className="block font-medium text-ink">
                      {site.contact.address.street}
                      <br />
                      {site.contact.address.postalCode}{" "}
                      {site.contact.address.city}
                    </span>
                  </span>
                </div>
              </div>
            </div>

            {/* Ce qui se passe ensuite */}
            <div className="card p-7">
              <h2 className="font-mono text-xs uppercase tracking-[0.16em] text-muted">
                Ce qui se passe ensuite
              </h2>
              <ul className="mt-6 space-y-6">
                {expectations.map((item) => {
                  const Icon = item.icon;
                  return (
                    <li key={item.title} className="flex gap-4">
                      <Icon className="mt-0.5 h-5 w-5 shrink-0 text-mint-600" />
                      <div>
                        <p className="font-medium text-ink">{item.title}</p>
                        <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">
                          {item.text}
                        </p>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          </aside>
        </div>
      </Section>

      {/* Bandeau de réassurance */}
      <section className="border-t border-line bg-mist py-12">
        <Container>
          <p className="mx-auto max-w-2xl text-center text-sm leading-relaxed text-ink-soft">
            Les informations que vous nous transmettez servent uniquement à
            traiter votre demande. Elles ne sont ni revendues, ni utilisées à
            des fins publicitaires, et vous pouvez demander leur suppression à
            tout moment en écrivant à{" "}
            <a
              className="font-medium text-signal-600 hover:text-signal-700"
              href={`mailto:${site.contact.email}`}
            >
              {site.contact.email}
            </a>
            .
          </p>
        </Container>
      </section>
    </>
  );
}
