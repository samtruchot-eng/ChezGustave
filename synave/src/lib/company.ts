/**
 * Données du volet « création de société en Suisse ».
 *
 * ⚠️ Les montants d'émoluments et d'honoraires sont des ordres de grandeur
 * destinés à orienter le visiteur. Ils varient selon le canton, le notaire et
 * la complexité du dossier — le site l'indique explicitement à chaque affichage.
 */

export type LegalFormId = "sarl" | "sa" | "raison-individuelle";

export type LegalForm = {
  id: LegalFormId;
  name: string;
  shortName: string;
  pitch: string;
  /** Capital minimum légal, en CHF (0 = aucun capital minimum). */
  capitalMin: number;
  /** Part du capital à libérer à la constitution. */
  capitalLibere: string;
  liability: string;
  founders: string;
  publicity: string;
  /** Émolument fédéral d'inscription au registre du commerce, en CHF. */
  rcFee: number;
  /** Fourchette d'honoraires notariaux observée, en CHF. */
  notaryRange: [number, number] | null;
  /** Honoraires d'accompagnement Synave, en CHF. */
  synaveFee: number;
  /** Délai indicatif, en semaines. */
  delayWeeks: [number, number];
  pros: string[];
  cons: string[];
  bestFor: string;
};

export const legalForms: LegalForm[] = [
  {
    id: "sarl",
    name: "Société à responsabilité limitée (Sàrl)",
    shortName: "Sàrl",
    pitch:
      "La forme la plus courante pour se lancer en Suisse : capital accessible, responsabilité limitée, crédibilité immédiate.",
    capitalMin: 20000,
    capitalLibere: "Intégralement libéré à la constitution",
    liability: "Limitée au capital social de la société",
    founders: "1 associé au minimum (personne physique ou morale)",
    publicity:
      "Les associés et leurs parts figurent au registre du commerce, donc publics",
    rcFee: 600,
    notaryRange: [800, 2000],
    synaveFee: 1900,
    delayWeeks: [2, 4],
    pros: [
      "Capital de départ raisonnable (CHF 20'000)",
      "Patrimoine privé protégé",
      "Image professionnelle auprès des banques et des clients",
      "Un seul associé suffit",
    ],
    cons: [
      "Identité des associés publique",
      "Constitution devant notaire obligatoire",
      "Comptabilité commerciale complète exigée",
      "Cession de parts plus lourde que celle d'actions",
    ],
    bestFor:
      "Indépendants qui se structurent, PME de services, agences, artisans, commerces.",
  },
  {
    id: "sa",
    name: "Société anonyme (SA)",
    shortName: "SA",
    pitch:
      "La référence pour lever des fonds, accueillir des investisseurs ou préserver la discrétion de l'actionnariat.",
    capitalMin: 100000,
    capitalLibere:
      "20 % au minimum, et au moins CHF 50'000 versés à la constitution",
    liability: "Limitée au capital-actions de la société",
    founders: "1 actionnaire au minimum (personne physique ou morale)",
    publicity:
      "Les actionnaires ne figurent pas au registre du commerce ; seuls les organes sont publics",
    rcFee: 600,
    notaryRange: [1500, 3000],
    synaveFee: 2900,
    delayWeeks: [3, 5],
    pros: [
      "Actionnariat non public",
      "Transmission des actions simple et discrète",
      "Forme attendue par les investisseurs et les fonds",
      "Capital libérable partiellement au démarrage",
    ],
    cons: [
      "Capital minimum élevé (CHF 100'000)",
      "Gouvernance plus formelle (conseil d'administration, assemblée générale)",
      "Frais de constitution et de tenue plus élevés",
    ],
    bestFor:
      "Projets à fort besoin de capitaux, holdings, sociétés à plusieurs investisseurs, activités réglementées.",
  },
  {
    id: "raison-individuelle",
    name: "Raison individuelle",
    shortName: "Raison individuelle",
    pitch:
      "Le chemin le plus rapide et le moins coûteux pour tester une activité en son nom propre.",
    capitalMin: 0,
    capitalLibere: "Aucun capital minimum",
    liability:
      "Illimitée : le patrimoine privé du titulaire répond des dettes de l'entreprise",
    founders: "Le titulaire, domicilié en Suisse",
    publicity:
      "Le titulaire figure au registre du commerce lorsqu'il y est inscrit",
    rcFee: 120,
    notaryRange: null,
    synaveFee: 900,
    delayWeeks: [1, 2],
    pros: [
      "Aucun capital de départ exigé",
      "Constitution rapide, sans notaire",
      "Formalités et comptabilité allégées",
      "Perte de démarrage déductible du revenu imposable",
    ],
    cons: [
      "Responsabilité illimitée sur les biens personnels",
      "Pas d'assurance chômage pour l'indépendant",
      "Crédibilité moindre auprès de certains donneurs d'ordre",
      "Transmission ou revente difficile",
    ],
    bestFor:
      "Consultants, artisans, thérapeutes, activités secondaires et projets en phase de test.",
  },
];

export function getLegalForm(id: LegalFormId): LegalForm {
  const form = legalForms.find((f) => f.id === id);
  if (!form) throw new Error(`Forme juridique inconnue : ${id}`);
  return form;
}

/** Cantons proposés au simulateur, avec l'écart de frais notariaux observé. */
export type Canton = {
  id: string;
  name: string;
  /** Coefficient appliqué à la fourchette notariale de référence. */
  notaryFactor: number;
};

export const cantons: Canton[] = [
  { id: "GE", name: "Genève", notaryFactor: 1.15 },
  { id: "VD", name: "Vaud", notaryFactor: 1.05 },
  { id: "VS", name: "Valais", notaryFactor: 0.95 },
  { id: "FR", name: "Fribourg", notaryFactor: 0.95 },
  { id: "NE", name: "Neuchâtel", notaryFactor: 1.0 },
  { id: "JU", name: "Jura", notaryFactor: 0.9 },
  { id: "BE", name: "Berne", notaryFactor: 1.0 },
  { id: "ZH", name: "Zurich", notaryFactor: 1.1 },
  { id: "ZG", name: "Zoug", notaryFactor: 1.05 },
  { id: "TI", name: "Tessin", notaryFactor: 1.0 },
];

/** Prestations complémentaires proposées dans le simulateur. */
export type ExtraOption = {
  id: string;
  label: string;
  description: string;
  price: number;
  /** Semaines ajoutées au délai global (0 = mené en parallèle). */
  addedWeeks: number;
};

export const extraOptions: ExtraOption[] = [
  {
    id: "domiciliation",
    label: "Domiciliation & adresse commerciale",
    description:
      "Siège social, réception et numérisation du courrier pour la première année.",
    price: 1200,
    addedWeeks: 0,
  },
  {
    id: "tva",
    label: "Inscription TVA & assurances sociales",
    description:
      "Immatriculation TVA, affiliation AVS, mise en place LPP et assurance accidents.",
    price: 600,
    addedWeeks: 1,
  },
  {
    id: "comptabilite",
    label: "Mise en place comptable",
    description:
      "Plan comptable, outil de facturation et première clôture accompagnée.",
    price: 1500,
    addedWeeks: 0,
  },
  {
    id: "identite",
    label: "Identité visuelle",
    description: "Logo, palette, typographies et modèles de documents.",
    price: 2400,
    addedWeeks: 2,
  },
  {
    id: "site",
    label: "Site web de lancement",
    description:
      "Site vitrine de 5 pages, multilingue, hébergement et e-mails professionnels.",
    price: 6000,
    addedWeeks: 3,
  },
];

/** Frais bancaires d'ouverture d'un compte de consignation du capital, en CHF. */
export const CAPITAL_ACCOUNT_FEE = 300;

/** Seuil de chiffre d'affaires annuel entraînant l'assujettissement à la TVA. */
export const VAT_THRESHOLD = 100000;

export type Step = {
  number: number;
  title: string;
  description: string;
  duration: string;
  /** Qui porte l'étape. */
  owner: "Synave" | "Vous" | "Notaire" | "Banque" | "Registre du commerce";
};

export const steps: Step[] = [
  {
    number: 1,
    title: "Cadrage et choix de la forme juridique",
    description:
      "Nous passons en revue votre activité, vos associés, vos besoins de capitaux et votre situation fiscale pour arrêter la forme juridique et le canton de domiciliation.",
    duration: "1 à 3 jours",
    owner: "Synave",
  },
  {
    number: 2,
    title: "Vérification de la raison sociale",
    description:
      "Contrôle de la disponibilité du nom dans l'index central des raisons de commerce (Zefix), vérification des marques et des noms de domaine associés.",
    duration: "1 jour",
    owner: "Synave",
  },
  {
    number: 3,
    title: "Rédaction des statuts et des documents",
    description:
      "Statuts, acte constitutif, déclaration Stampa, acceptation de mandat de l'organe de révision ou renonciation (opting-out), liste des apports.",
    duration: "3 à 5 jours",
    owner: "Synave",
  },
  {
    number: 4,
    title: "Ouverture du compte de consignation",
    description:
      "Ouverture d'un compte bloqué auprès d'une banque suisse et versement du capital. La banque délivre l'attestation exigée par le notaire.",
    duration: "3 à 10 jours",
    owner: "Banque",
  },
  {
    number: 5,
    title: "Passage devant notaire",
    description:
      "Signature de l'acte constitutif authentique en présence des fondateurs — ou par procuration si vous ne pouvez pas être là.",
    duration: "1 rendez-vous",
    owner: "Notaire",
  },
  {
    number: 6,
    title: "Inscription au registre du commerce",
    description:
      "Dépôt du dossier auprès du registre du commerce cantonal, puis inscription et publication dans la Feuille officielle suisse du commerce (FOSC).",
    duration: "5 à 15 jours",
    owner: "Registre du commerce",
  },
  {
    number: 7,
    title: "Déblocage du capital et démarrage",
    description:
      "Le compte de consignation devient un compte courant, le capital est disponible. La société peut facturer.",
    duration: "2 à 5 jours",
    owner: "Banque",
  },
  {
    number: 8,
    title: "Formalités qui suivent la constitution",
    description:
      "Assujettissement TVA si nécessaire, affiliation AVS, prévoyance professionnelle (LPP), assurance accidents (LAA), assurances RC et protection juridique.",
    duration: "1 à 3 semaines",
    owner: "Synave",
  },
  {
    number: 9,
    title: "Votre présence en ligne",
    description:
      "Nom de domaine, e-mails professionnels, site web, fiche Google Business et outils internes : l'entreprise est visible et opérationnelle.",
    duration: "2 à 6 semaines",
    owner: "Synave",
  },
];

export type FaqItem = { question: string; answer: string };

export const faq: FaqItem[] = [
  {
    question: "Faut-il être suisse ou résident pour créer une société ?",
    answer:
      "Non. Des fondateurs étrangers et non-résidents peuvent détenir une Sàrl ou une SA suisse. La loi exige en revanche que la société puisse être représentée par au moins une personne domiciliée en Suisse — un gérant ou un administrateur disposant de la signature individuelle, ou deux personnes disposant de la signature collective à deux. La raison individuelle, elle, suppose que le titulaire soit domicilié en Suisse.",
  },
  {
    question: "Combien de temps prend réellement une constitution ?",
    answer:
      "Comptez 2 à 4 semaines pour une Sàrl et 3 à 5 semaines pour une SA, entre le premier entretien et l'inscription au registre du commerce. Les deux étapes les moins prévisibles sont l'ouverture du compte de consignation auprès de la banque et le traitement par le registre du commerce cantonal.",
  },
  {
    question: "Quel capital dois-je réellement prévoir ?",
    answer:
      "Une Sàrl exige CHF 20'000 entièrement libérés. Une SA exige CHF 100'000 de capital-actions, dont 20 % au minimum et au moins CHF 50'000 versés à la constitution. Ce capital n'est pas perdu : après l'inscription au registre du commerce, il est débloqué et sert à financer l'activité.",
  },
  {
    question: "Quand suis-je assujetti à la TVA ?",
    answer:
      "L'assujettissement devient obligatoire dès CHF 100'000 de chiffre d'affaires annuel provenant de prestations non exclues du champ de l'impôt. En dessous de ce seuil, l'assujettissement volontaire reste possible et se révèle souvent intéressant lorsque vos clients sont eux-mêmes assujettis.",
  },
  {
    question: "Ai-je besoin d'un organe de révision ?",
    answer:
      "Une petite société peut renoncer au contrôle restreint (opting-out) si elle compte moins de dix emplois à plein temps en moyenne annuelle et que l'ensemble des associés y consent. Au-delà de certains seuils de bilan, de chiffre d'affaires et d'effectif, le contrôle ordinaire devient obligatoire. Nous vérifions votre situation lors du cadrage.",
  },
  {
    question: "Puis-je transformer ma raison individuelle en Sàrl plus tard ?",
    answer:
      "Oui, et c'est un parcours fréquent. La loi sur la fusion permet de transférer le patrimoine de la raison individuelle vers la nouvelle société. Nous préparons le bilan de reprise, les statuts et le dossier de transformation.",
  },
  {
    question: "Que se passe-t-il après la constitution ?",
    answer:
      "Nous ne vous laissons pas avec un extrait du registre du commerce. Assurances sociales, comptabilité, facturation, nom de domaine, site web, adresses e-mail et outils internes : ce sont précisément les métiers de Synave, et ils s'enchaînent naturellement avec la constitution.",
  },
];
