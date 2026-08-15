import { z } from "zod";

/** Sujets proposés dans le formulaire de contact. */
export const subjects = [
  "Plateforme web sur mesure",
  "Extranet / espace client",
  "Intranet / outils internes",
  "Site web ou e-commerce",
  "Création de société en Suisse",
  "Maintenance / reprise d'un projet existant",
  "Autre demande",
] as const;

/** Fourchettes budgétaires proposées. */
export const budgets = [
  "Moins de CHF 10'000",
  "CHF 10'000 – 25'000",
  "CHF 25'000 – 50'000",
  "Plus de CHF 50'000",
  "Je ne sais pas encore",
] as const;

export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Merci d'indiquer votre nom.")
    .max(120, "Ce nom est trop long."),
  email: z
    .string()
    .trim()
    .min(1, "Merci d'indiquer votre e-mail.")
    .email("Cette adresse e-mail semble incorrecte."),
  company: z.string().trim().max(160, "Ce nom est trop long.").optional(),
  phone: z.string().trim().max(40, "Ce numéro est trop long.").optional(),
  subject: z.enum(subjects, {
    errorMap: () => ({ message: "Merci de choisir un sujet." }),
  }),
  budget: z.enum(budgets).optional(),
  message: z
    .string()
    .trim()
    .min(
      20,
      "Décrivez votre besoin en quelques phrases (20 caractères au moins).",
    )
    .max(4000, "Ce message dépasse 4000 caractères."),
  consent: z.literal("on", {
    errorMap: () => ({
      message: "Merci d'accepter que nous traitions votre demande.",
    }),
  }),
});

export type ContactInput = z.infer<typeof contactSchema>;

export type ContactFieldErrors = Partial<Record<keyof ContactInput, string>>;

export type ContactState = {
  status: "idle" | "success" | "error";
  /** Message général affiché au-dessus du formulaire. */
  message?: string;
  errors?: ContactFieldErrors;
};

export const initialContactState: ContactState = { status: "idle" };
