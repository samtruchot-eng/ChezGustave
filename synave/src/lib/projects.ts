/**
 * Profils de projets présentés sur la page « Réalisations ».
 *
 * ⚠️ Ce sont des projets *types*, anonymisés, qui illustrent le genre de mandats
 * que Synave mène — et non des références clientes nommées. La page l'indique
 * clairement au visiteur. Remplacez-les par de vraies références (avec l'accord
 * écrit du client) au fur et à mesure.
 */

export type Project = {
  slug: string;
  /** Secteur du client, en lieu et place de son nom. */
  sector: string;
  title: string;
  summary: string;
  /** Le problème de départ. */
  challenge: string;
  /** Ce qui a été construit. */
  solution: string[];
  /** Résultats attendus / obtenus sur ce type de mandat. */
  outcomes: string[];
  category:
    | "Plateforme"
    | "Extranet"
    | "Intranet"
    | "Site web"
    | "Création de société";
  stack: string[];
  duration: string;
};

export const projects: Project[] = [
  {
    slug: "marketplace-services",
    sector: "Services à la personne · Suisse romande",
    title: "Marketplace de mise en relation",
    summary:
      "Une place de marché à deux faces : les particuliers publient une demande, les prestataires vérifiés y répondent, le paiement transite par la plateforme.",
    challenge:
      "L'activité tournait sur un groupe WhatsApp et un fichier partagé. Impossible de suivre les demandes, de garantir la qualité ni d'encaisser une commission.",
    solution: [
      "Double parcours d'inscription (demandeur et prestataire) avec vérification d'identité",
      "Recherche géolocalisée avec filtres de disponibilité et de budget",
      "Messagerie interne et notifications par e-mail",
      "Paiements et versements aux prestataires via Stripe Connect",
      "Avis vérifiés après prestation et système de réputation",
      "Console d'administration : litiges, remboursements, pilotage",
    ],
    outcomes: [
      "Encaissement automatisé de la commission sur chaque transaction",
      "Suivi de bout en bout de chaque demande, sans tableur",
      "Mise en production progressive, canton par canton",
    ],
    category: "Plateforme",
    stack: ["Next.js", "TypeScript", "PostgreSQL", "Stripe Connect"],
    duration: "16 semaines",
  },
  {
    slug: "extranet-fiduciaire",
    sector: "Fiduciaire · Genève",
    title: "Extranet client d'une fiduciaire",
    summary:
      "Un espace sécurisé où chaque client dépose ses pièces comptables, suit l'avancement de son dossier et récupère ses documents fiscaux signés.",
    challenge:
      "Les pièces arrivaient par e-mail, WeTransfer et courrier. Les collaborateurs passaient des heures à relancer et à classer, sans traçabilité en cas de contrôle.",
    solution: [
      "Espaces cloisonnés par mandat, avec droits d'accès par collaborateur",
      "Dépôt de pièces par glisser-déposer, depuis un ordinateur ou un téléphone",
      "Rappels automatiques des pièces manquantes avant échéance",
      "Signature électronique des déclarations et des bouclements",
      "Journal d'accès complet, exportable en cas d'audit",
    ],
    outcomes: [
      "Relances manuelles très fortement réduites",
      "Traçabilité complète des échanges de documents",
      "Un canal unique, à la place de quatre",
    ],
    category: "Extranet",
    stack: ["Next.js", "PostgreSQL", "S3 chiffré", "SSO"],
    duration: "10 semaines",
  },
  {
    slug: "intranet-industrie",
    sector: "Industrie · Arc lémanique",
    title: "Intranet et suivi de production",
    summary:
      "Un outil interne qui remplace onze classeurs Excel : suivi des ordres de fabrication, contrôles qualité et tableau de bord direction.",
    challenge:
      "Chaque atelier tenait son propre fichier. Les chiffres ne concordaient jamais et la direction pilotait avec trois semaines de retard.",
    solution: [
      "Saisie des ordres de fabrication sur tablette, au pied de la machine",
      "Contrôles qualité photographiés et horodatés",
      "Alertes en cas de dérive sur un lot",
      "Tableau de bord temps réel : charge, rebuts, délais",
      "Reprise de l'historique des trois dernières années",
    ],
    outcomes: [
      "Une source de vérité unique pour tous les ateliers",
      "Pilotage à la journée au lieu de trois semaines de décalage",
      "Onze fichiers Excel retirés du circuit",
    ],
    category: "Intranet",
    stack: ["Next.js", "PostgreSQL", "PWA hors ligne"],
    duration: "14 semaines",
  },
  {
    slug: "site-cabinet",
    sector: "Cabinet d'avocats · Lausanne",
    title: "Site institutionnel trilingue",
    summary:
      "Une vitrine sobre et rapide, en français, allemand et anglais, que le cabinet met à jour lui-même.",
    challenge:
      "Un site vieux de huit ans, illisible sur téléphone, invisible sur les recherches par domaine de droit, et modifiable uniquement par un prestataire externe.",
    solution: [
      "Direction artistique et refonte complète des contenus",
      "Fiches par domaine de droit et par associé",
      "Trois langues gérées depuis une seule interface d'édition",
      "SEO technique, données structurées et fiche Google Business",
      "Score de performance élevé sur mobile comme sur ordinateur",
    ],
    outcomes: [
      "Mises à jour réalisées en interne, sans intervention externe",
      "Visibilité retrouvée sur les recherches par domaine de droit",
      "Un site lisible sur téléphone, où arrive l'essentiel du trafic",
    ],
    category: "Site web",
    stack: ["Next.js", "CMS headless", "i18n"],
    duration: "6 semaines",
  },
  {
    slug: "creation-sarl-tech",
    sector: "Éditeur logiciel · fondateurs étrangers",
    title: "Création d'une Sàrl et lancement",
    summary:
      "Deux fondateurs installés hors de Suisse voulaient une entité suisse : constitution complète, puis mise en route opérationnelle.",
    challenge:
      "Aucun des fondateurs n'était domicilié en Suisse, ce qui posait la question de la représentation légale, du compte bancaire et de l'adresse du siège.",
    solution: [
      "Choix du canton et montage de la représentation domiciliée en Suisse",
      "Statuts, acte constitutif et signature par procuration",
      "Compte de consignation puis compte courant d'exploitation",
      "Inscription au registre du commerce et publication à la FOSC",
      "TVA, assurances sociales, comptabilité et outil de facturation",
      "Nom de domaine, e-mails professionnels et site de lancement",
    ],
    outcomes: [
      "Société inscrite sans que les fondateurs aient à se déplacer",
      "Première facture émise dans la foulée de l'inscription",
      "Un seul interlocuteur du juridique jusqu'au site en ligne",
    ],
    category: "Création de société",
    stack: ["Constitution", "Domiciliation", "Comptabilité", "Site web"],
    duration: "4 semaines",
  },
  {
    slug: "portail-regie",
    sector: "Régie immobilière · Valais",
    title: "Portail locataires et propriétaires",
    summary:
      "Un portail unique où les locataires annoncent un dégât et suivent son traitement, et où les propriétaires consultent les décomptes de leur immeuble.",
    challenge:
      "Le standard téléphonique saturait, les annonces de dégâts se perdaient et les propriétaires réclamaient leurs décomptes par e-mail.",
    solution: [
      "Annonce de sinistre avec photos, depuis le téléphone",
      "Suivi de l'intervention, de la réception à la clôture",
      "Espace propriétaire : décomptes, baux, états locatifs",
      "Attribution automatique des demandes au bon gérant",
      "Synchronisation avec le logiciel de gérance existant",
    ],
    outcomes: [
      "Une part importante des appels absorbée par le portail",
      "Chaque annonce tracée, plus aucune perdue",
      "Décomptes disponibles en libre-service",
    ],
    category: "Extranet",
    stack: ["Next.js", "PostgreSQL", "API métier"],
    duration: "12 semaines",
  },
];

export const projectCategories = [
  "Tous",
  "Plateforme",
  "Extranet",
  "Intranet",
  "Site web",
  "Création de société",
] as const;
