import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { LogoMark } from "@/components/ui/Logo";
import {
  IconLinkedIn,
  IconMail,
  IconPhone,
  IconPin,
} from "@/components/ui/icons";
import { footerLinks, site } from "@/lib/site";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden bg-night text-white">
      <div
        aria-hidden="true"
        className="bg-grid pointer-events-none absolute inset-0 opacity-60"
      />
      <div
        aria-hidden="true"
        className="glow-signal pointer-events-none absolute -top-40 left-1/2 h-96 w-[52rem] -translate-x-1/2 opacity-40"
      />

      <Container className="relative py-16 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_repeat(3,1fr)]">
          <div>
            <div className="flex items-center gap-2.5">
              <LogoMark idPrefix="footer" className="h-9 w-9" />
              <span className="font-display text-2xl font-semibold tracking-[-0.04em]">
                Synave
              </span>
            </div>

            <p className="mt-5 max-w-xs text-pretty leading-relaxed text-white/60">
              {site.description}
            </p>

            <div className="mt-7 space-y-3 text-sm">
              <a
                href={`mailto:${site.contact.email}`}
                className="flex items-center gap-3 text-white/70 transition-colors hover:text-mint"
              >
                <IconMail className="h-4 w-4 shrink-0" />
                {site.contact.email}
              </a>
              <a
                href={`tel:${site.contact.phoneHref}`}
                className="flex items-center gap-3 text-white/70 transition-colors hover:text-mint"
              >
                <IconPhone className="h-4 w-4 shrink-0" />
                {site.contact.phone}
              </a>
              <p className="flex items-start gap-3 text-white/70">
                <IconPin className="mt-0.5 h-4 w-4 shrink-0" />
                <span>
                  {site.contact.address.street}
                  <br />
                  {site.contact.address.postalCode} {site.contact.address.city},{" "}
                  {site.contact.address.country}
                </span>
              </p>
            </div>

            <a
              href={site.social.linkedin}
              target="_blank"
              rel="noreferrer noopener"
              aria-label="Synave sur LinkedIn"
              className="mt-7 inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white/70 transition-colors hover:border-mint/50 hover:text-mint"
            >
              <IconLinkedIn className="h-4 w-4" />
            </a>
          </div>

          {footerLinks.map((group) => (
            <div key={group.title}>
              <h3 className="font-display text-sm font-semibold uppercase tracking-[0.14em] text-white/45">
                {group.title}
              </h3>
              <ul className="mt-5 space-y-3 text-[0.95rem]">
                {group.items.map((item) => (
                  <li key={item.href + item.label}>
                    <Link
                      href={item.href}
                      className="text-white/70 transition-colors hover:text-mint"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-white/10 pt-8 text-sm text-white/45 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {site.legalName}. Tous droits réservés.
          </p>
          <p className="text-white/35">
            Conçu et développé en Suisse · Hébergement en Suisse ou dans
            l&apos;UE
          </p>
        </div>
      </Container>
    </footer>
  );
}
