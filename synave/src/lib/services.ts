import type { ComponentType, SVGProps } from "react";
import {
  IconExtranet,
  IconGlobe,
  IconIntranet,
  IconPlatform,
  IconShield,
  IconSwiss,
} from "@/components/ui/icons";

export type Service = {
  /** Ancre utilisée dans l'URL (`/services#plateformes`). */
  slug: string;
  title: string;
  /** Phrase courte affichée sous le titre. */
  tagline: string;
  description: string;
  /** Ce que comprend la prestation. */
  includes: string[];
  /** À qui elle s'adresse. */
  audience: string;
  /** Ordre de grandeur du délai de mise en œuvre. */
  duration: string;
  /** Fourchette budgétaire indicative — à ajuster selon vos tarifs réels. */
  budget: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  /** Couleur d'accent : `signal` (défaut) ou `swiss` (volet suisse). */
  accent?: "signal" | "swiss";
};

export const services: Service[] = [
  {
    slug: "plateformes",
    title: "Plateformes web sur mesure",
    tagline: "Le produit qui n'existe pas encore sur le marché.",
    description:
      "Marketplace, SaaS métier, portail de réservation, place de marché interne : nous concevons et développons la plateforme qui porte votre modèle d'affaires, du premier écran jusqu'à la mise en production.",
    includes: [
      "Cadrage produit : parcours utilisateurs, périmètre, priorisation",
      "Design d'interface et système de composants réutilisables",
      "Développement full-stack (Next.js, TypeScript, PostgreSQL)",
      "Comptes, rôles et permissions",
      "Paiements en ligne et facturation (Stripe, TWINT via PSP)",
      "Tableaux de bord d'administration",
      "Mise en production, monitoring et reprise après incident",
    ],
    audience:
      "Startups, PME qui lancent un nouveau service, groupes qui digitalisent une activité.",
    duration: "8 à 20 semaines selon le périmètre",
    budget: "dès CHF 25'000",
    icon: IconPlatform,
  },
  {
    slug: "extranet",
    title: "Extranet & espace client",
    tagline: "Un accès privé, sécurisé, à l'image de votre maison.",
    description:
      "Vos clients, partenaires ou fournisseurs disposent d'un espace dédié : documents, contrats, commandes, avancement des dossiers. Fini les échanges de fichiers par e-mail et les relances téléphoniques.",
    includes: [
      "Authentification forte (mot de passe, 2FA, SSO)",
      "Espaces cloisonnés par client, mandat ou entité",
      "Coffre-fort documentaire avec versions et journal d'accès",
      "Signature électronique et validation de documents",
      "Notifications e-mail et suivi des demandes",
      "Connexion à vos outils existants (ERP, CRM, comptabilité)",
    ],
    audience:
      "Fiduciaires, études d'avocats, régies immobilières, bureaux d'ingénieurs, assurances.",
    duration: "6 à 14 semaines",
    budget: "dès CHF 18'000",
    icon: IconExtranet,
  },
  {
    slug: "intranet",
    title: "Intranet & outils internes",
    tagline: "Ce que vos équipes font dans Excel mérite mieux.",
    description:
      "Annuaire, procédures, demandes de congés, gestion des interventions, suivi de production : nous transformons vos tableurs et vos processus papier en outils internes fiables, rapides et adoptés.",
    includes: [
      "Cartographie des processus et des irritants du quotidien",
      "Applications métier sur mesure (saisie, validation, historique)",
      "Annuaire, actualités internes et base de connaissances",
      "Tableaux de bord et exports pour la direction",
      "Automatisations et rappels (fini les relances manuelles)",
      "Formation des équipes et documentation en français",
    ],
    audience:
      "PME et administrations de 10 à 500 collaborateurs, entreprises multi-sites.",
    duration: "6 à 16 semaines",
    budget: "dès CHF 15'000",
    icon: IconIntranet,
  },
  {
    slug: "sites",
    title: "Sites web & e-commerce",
    tagline: "Rapide, lisible, trouvable — et facile à mettre à jour.",
    description:
      "Site institutionnel, vitrine, boutique en ligne ou site multilingue : une présence soignée qui charge en moins d'une seconde, se référence correctement et que votre équipe met à jour sans nous appeler.",
    includes: [
      "Direction artistique et rédaction des contenus clés",
      "Développement performant et accessible (WCAG AA)",
      "CMS simple pour éditer vos pages en autonomie",
      "Multilingue FR / DE / EN / IT",
      "SEO technique, données structurées, Google Business",
      "Boutique en ligne, paiements et gestion des commandes",
    ],
    audience:
      "Indépendants, PME romandes, cabinets, commerces, associations et institutions.",
    duration: "3 à 8 semaines",
    budget: "dès CHF 6'000",
    icon: IconGlobe,
  },
  {
    slug: "creation-societe",
    title: "Création de société en Suisse",
    tagline: "De l'idée à l'inscription au registre du commerce.",
    description:
      "Sàrl, SA ou raison individuelle : nous vous accompagnons sur toute la constitution — choix de la forme juridique, statuts, capital, notaire, registre du commerce — puis sur tout ce qui suit : TVA, assurances sociales, comptabilité et présence en ligne.",
    includes: [
      "Choix de la forme juridique et du canton de domiciliation",
      "Vérification et réservation de la raison sociale",
      "Rédaction des statuts et des documents de constitution",
      "Ouverture du compte de consignation du capital",
      "Coordination du notaire et dépôt au registre du commerce",
      "TVA, AVS, LPP, assurance accidents et prévoyance",
      "Domiciliation, comptabilité et identité visuelle",
    ],
    audience:
      "Entrepreneurs qui se lancent, indépendants qui passent en société, sociétés étrangères qui ouvrent une entité suisse.",
    duration: "2 à 4 semaines en moyenne",
    budget: "dès CHF 1'900 d'honoraires",
    icon: IconSwiss,
    accent: "swiss",
  },
  {
    slug: "maintenance",
    title: "Maintenance & infogérance",
    tagline: "Une plateforme, ça s'entretient.",
    description:
      "Mises à jour de sécurité, surveillance, sauvegardes testées, évolutions au fil de l'eau : votre solution reste rapide et sûre, et vous avez un interlocuteur qui répond.",
    includes: [
      "Supervision 24/7 et alertes en cas d'incident",
      "Correctifs de sécurité et montées de version",
      "Sauvegardes chiffrées et restaurations testées",
      "Hébergement en Suisse ou dans l'Union européenne",
      "Enveloppe d'évolutions mensuelle",
      "Support en français, engagement de délai de réponse",
    ],
    audience: "Tout client Synave, ainsi que la reprise de projets existants.",
    duration: "Contrat mensuel, sans engagement de durée",
    budget: "dès CHF 190 / mois",
    icon: IconShield,
  },
];

export function getService(slug: string): Service | undefined {
  return services.find((service) => service.slug === slug);
}
