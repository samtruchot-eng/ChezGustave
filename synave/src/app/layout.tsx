import type { Metadata, Viewport } from "next";
import "@fontsource-variable/inter";
import "@fontsource-variable/space-grotesk";
import "./globals.css";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — ${site.tagline}`,
    template: `%s · ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  keywords: [
    "développement web Suisse",
    "plateforme sur mesure",
    "extranet",
    "intranet",
    "création de site web Genève",
    "création de société Suisse",
    "créer une Sàrl",
    "créer une SA",
    "agence web Genève",
  ],
  authors: [{ name: site.legalName }],
  openGraph: {
    type: "website",
    locale: site.locale,
    url: site.url,
    siteName: site.name,
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
  },
  alternates: { canonical: "/" },
};

export const viewport: Viewport = {
  themeColor: "#060b18",
  width: "device-width",
  initialScale: 1,
};

/** Données structurées pour les moteurs de recherche. */
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: site.name,
  legalName: site.legalName,
  description: site.description,
  url: site.url,
  email: site.contact.email,
  telephone: site.contact.phone,
  areaServed: "CH",
  address: {
    "@type": "PostalAddress",
    streetAddress: site.contact.address.street,
    postalCode: site.contact.address.postalCode,
    addressLocality: site.contact.address.city,
    addressCountry: "CH",
  },
  sameAs: [site.social.linkedin],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <head>
        <noscript>
          {/* Sans JavaScript, les blocs animés restent simplement visibles. */}
          <style>{`[data-reveal]{opacity:1!important;transform:none!important}`}</style>
        </noscript>
        <script
          type="application/ld+json"
          // Contenu statique, défini ci-dessus — aucune donnée utilisateur.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-dvh antialiased">
        <a
          href="#contenu"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-signal focus:px-5 focus:py-3 focus:text-sm focus:font-medium focus:text-white"
        >
          Aller au contenu
        </a>
        <Header />
        <main id="contenu">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
