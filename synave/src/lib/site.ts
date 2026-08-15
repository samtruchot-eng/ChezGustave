/**
 * Configuration éditoriale du site.
 *
 * ⚠️ Les coordonnées ci-dessous sont des valeurs de départ à remplacer par les
 * informations réelles de Synave (une seule modification, répercutée partout :
 * en-tête, pied de page, page contact, données structurées, SEO).
 */

export const site = {
  name: "Synave",
  legalName: "Synave Sàrl",
  tagline: "Vos plateformes web, votre société en Suisse.",
  description:
    "Synave conçoit des plateformes web, extranets, intranets et sites sur mesure — et accompagne les entrepreneurs dans la création de leur société en Suisse.",
  url: "https://www.synave.ch",
  locale: "fr_CH",

  contact: {
    email: "contact@synave.ch",
    phone: "+41 22 000 00 00",
    /** Version compacte pour les liens `tel:` */
    phoneHref: "+41220000000",
    address: {
      street: "Rue du Rhône 100",
      postalCode: "1204",
      city: "Genève",
      country: "Suisse",
    },
  },

  social: {
    linkedin: "https://www.linkedin.com/company/synave",
  },
} as const;

export type NavItem = {
  href: string;
  label: string;
  description?: string;
};

export const navigation: NavItem[] = [
  {
    href: "/services",
    label: "Services",
    description: "Plateformes, extranet, intranet, sites web",
  },
  {
    href: "/creation-societe",
    label: "Créer sa société",
    description: "Sàrl, SA, raison individuelle — de A à Z",
  },
  {
    href: "/realisations",
    label: "Réalisations",
    description: "Le type de projets que nous menons",
  },
  {
    href: "/a-propos",
    label: "À propos",
    description: "Notre méthode et nos engagements",
  },
];

export const footerLinks: { title: string; items: NavItem[] }[] = [
  {
    title: "Services",
    items: [
      { href: "/services#plateformes", label: "Plateformes sur mesure" },
      { href: "/services#extranet", label: "Extranet & espace client" },
      { href: "/services#intranet", label: "Intranet & outils internes" },
      { href: "/services#sites", label: "Sites web & e-commerce" },
      { href: "/services#maintenance", label: "Maintenance & infogérance" },
    ],
  },
  {
    title: "Création de société",
    items: [
      {
        href: "/creation-societe#formes",
        label: "Sàrl, SA ou raison individuelle",
      },
      { href: "/creation-societe#etapes", label: "Les étapes" },
      { href: "/creation-societe#simulateur", label: "Simulateur" },
      { href: "/creation-societe#faq", label: "Questions fréquentes" },
    ],
  },
  {
    title: "Synave",
    items: [
      { href: "/a-propos", label: "À propos" },
      { href: "/realisations", label: "Réalisations" },
      { href: "/contact", label: "Contact" },
    ],
  },
];
