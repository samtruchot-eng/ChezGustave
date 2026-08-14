import type { Metadata, Viewport } from "next";
import "@fontsource-variable/sora";
import "@fontsource/great-vibes";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Chez Gustave — Le bonheur des chiens, la sérénité des maîtres",
    template: "%s · Chez Gustave",
  },
  description:
    "La plateforme de garde de chien à domicile à Genève et dans sa région. Votre chien reste chez lui ; un gardien passionné vient s'en occuper. Pour les gardiens, une escapade au vert — payée et logée.",
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
  themeColor: "#c0562a",
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
