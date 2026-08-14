import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Chez Gustave — Gardez un chien, partez au vert",
    template: "%s · Chez Gustave",
  },
  description:
    "La plateforme de garde de chien à domicile en Suisse romande. Votre chien reste chez lui ; un gardien passionné vient s'en occuper. Pour les gardiens, une escapade à la campagne — payée et logée.",
  applicationName: "Chez Gustave",
  keywords: [
    "garde de chien",
    "à domicile",
    "Suisse romande",
    "Genève",
    "dog sitting",
    "pet sitting",
  ],
};

export const viewport: Viewport = {
  themeColor: "#2f5d3a",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body className="min-h-dvh antialiased">{children}</body>
    </html>
  );
}
