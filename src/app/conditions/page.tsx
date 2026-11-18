import type { ReactNode } from "react";
import Link from "next/link";
import { Logo } from "@/components/ui/Logo";
import { PLATFORM_COMMISSION_PERCENT } from "@/lib/constants";
import { computeBreakdown } from "@/lib/money";
import { formatCHF } from "@/lib/utils";
import { CANCELLATION, LEGAL, isLegalComplete } from "@/lib/legal";

export const metadata = {
  title: "Conditions générales",
  description:
    "Les règles d'utilisation de Chez Gustave : comptes, réservations, paiement, commission, annulation et responsabilités.",
};

const blank = (value: string | null, label: string) =>
  value ?? `[${label} à compléter]`;

const example = computeBreakdown(540);

const APPLICABLE_LAW: Record<"CH" | "FR", string> = {
  CH: "Les présentes conditions sont soumises au droit suisse. Tout litige relève des tribunaux du domicile de l'exploitant, sous réserve des fors que la loi impose en faveur des consommateurs.",
  FR: "Les présentes conditions sont soumises au droit français. En cas de litige, vous pouvez recourir gratuitement à un médiateur de la consommation avant toute action en justice ; à défaut d'accord, les tribunaux compétents sont ceux que désigne la loi.",
};

type Section = { title: string; body: ReactNode };

const sections: Section[] = [
  {
    title: "Qui sommes-nous",
    body: (
      <>
        <p>
          Chez Gustave est exploité par {LEGAL.operatorName}, en nom propre,{" "}
          {blank(LEGAL.operatorAddress, "adresse")}. Dans ce document, « Chez
          Gustave » ou « nous » désigne cet exploitant, et « vous » toute
          personne qui utilise le site.
        </p>
        <p>
          Pour toute question :{" "}
          {blank(LEGAL.contactEmail, "adresse e-mail de contact")}.
        </p>
      </>
    ),
  },
  {
    title: "Ce que fait Chez Gustave",
    body: (
      <>
        <p>
          Chez Gustave met en relation des propriétaires de chiens qui
          s&apos;absentent et des gardiens qui viennent séjourner à leur
          domicile pour s&apos;occuper de l&apos;animal, contre rémunération.
        </p>
        <p>
          Nous fournissons l&apos;outil : annonces, messagerie, réservation,
          paiement, carnet de garde et avis. Nous ne gardons aucun animal, nous
          n&apos;employons pas les gardiens et nous ne sommes pas partie à
          l&apos;accord conclu entre un propriétaire et un gardien. Chacun
          reste seul responsable de ses engagements envers l&apos;autre.
        </p>
      </>
    ),
  },
  {
    title: "Votre compte",
    body: (
      <ul>
        <li>Vous devez avoir 18 ans révolus pour créer un compte.</li>
        <li>
          Les informations que vous donnez sur vous, votre chien ou votre
          logement doivent être exactes et tenues à jour.
        </li>
        <li>
          Un compte est personnel. Gardez votre mot de passe pour vous : ce
          qui est fait depuis votre compte est réputé fait par vous.
        </li>
        <li>
          Un même compte peut servir comme propriétaire et comme gardien.
        </li>
      </ul>
    ),
  },
  {
    title: "Si vous êtes propriétaire",
    body: (
      <ul>
        <li>
          Vous décrivez honnêtement votre chien : santé, vaccins, traitements,
          caractère, et tout comportement qui peut présenter un risque
          (morsure, fugue, réaction aux autres animaux ou aux enfants).
        </li>
        <li>
          Vous garantissez avoir le droit de confier l&apos;animal et
          d&apos;accueillir le gardien dans le logement.
        </li>
        <li>
          Vous laissez un logement sûr et propre, les consignes nécessaires,
          de quoi nourrir et soigner le chien, et un moyen de vous joindre ou
          de joindre un proche en cas d&apos;urgence.
        </li>
        <li>Vous restez le détenteur de votre chien pendant toute la garde.</li>
      </ul>
    ),
  },
  {
    title: "Si vous êtes gardien",
    body: (
      <ul>
        <li>
          Vous agissez en toute indépendance : vous n&apos;êtes ni employé ni
          représentant de Chez Gustave.
        </li>
        <li>
          Vous déclarez vous-même vos revenus et réglez les impôts et
          cotisations qui vous incombent.
        </li>
        <li>
          Vous prenez soin du chien et du logement, vous suivez les consignes
          du propriétaire et vous le prévenez sans attendre de tout incident.
        </li>
        <li>
          Vous ne confiez pas l&apos;animal à un tiers et vous n&apos;invitez
          personne dans le logement sans l&apos;accord du propriétaire.
        </li>
      </ul>
    ),
  },
  {
    title: "Candidature et réservation",
    body: (
      <>
        <p>
          Le propriétaire publie une escapade avec ses dates et son prix. Les
          gardiens intéressés postulent. Le propriétaire choisit librement le
          gardien qu&apos;il retient.
        </p>
        <p>
          La réservation est créée quand le propriétaire accepte une
          candidature. Elle est confirmée une fois le paiement effectué.
        </p>
      </>
    ),
  },
  {
    title: "Prix, paiement et commission",
    body: (
      <>
        <p>
          Le prix de la garde est fixé par le propriétaire dans son annonce, en
          francs suisses. Le paiement se fait en ligne, par notre prestataire
          Stripe ; nous ne conservons aucune donnée de carte bancaire.
        </p>
        <p>
          Chez Gustave prélève une commission de {PLATFORM_COMMISSION_PERCENT}{" "}
          % sur le prix de la garde. Elle est comprise dans le prix : le
          propriétaire ne paie rien de plus que le montant affiché. Par
          exemple, pour une garde à {formatCHF(example.total)}, la commission
          est de {formatCHF(example.commissionAmount)} et le gardien reçoit{" "}
          {formatCHF(example.payoutAmount)}.
        </p>
        <p>
          Le gardien reçoit sa part sur son compte Stripe, qu&apos;il crée
          depuis son profil. Le délai de versement sur son compte bancaire
          dépend de Stripe.
        </p>
        <p>
          Une garde trouvée grâce à Chez Gustave se règle sur Chez Gustave.
        </p>
      </>
    ),
  },
  {
    title: "Annulation et remboursement",
    body: (
      <>
        <p>Si le propriétaire annule une garde déjà payée :</p>
        <ul>
          <li>
            jusqu&apos;à {CANCELLATION.fullRefundDays} jours avant le début de
            la garde, il est remboursé intégralement ;
          </li>
          <li>
            moins de {CANCELLATION.fullRefundDays} jours avant le début, il est
            remboursé à {CANCELLATION.lateRefundPercent} % ; le reste
            dédommage le gardien, qui avait réservé ces dates, commission
            déduite ;
          </li>
          <li>une fois la garde commencée, aucun remboursement n&apos;est dû.</li>
        </ul>
        <p>
          Si le gardien annule, le propriétaire est remboursé intégralement,
          quelle que soit la date. Un gardien qui annule à répétition peut voir
          son compte suspendu.
        </p>
        <p>
          L&apos;annulation se fait depuis la page de la réservation. Le
          remboursement est effectué sur le moyen de paiement utilisé. En cas
          d&apos;événement grave et imprévisible (accident, hospitalisation,
          décès de l&apos;animal), écrivez-nous : nous cherchons une solution
          équitable pour les deux parties.
        </p>
      </>
    ),
  },
  {
    title: "Assurance",
    body: (
      <>
        <p>
          Chez Gustave ne fournit aucune assurance. Les dommages qui peuvent
          survenir pendant une garde, au chien, au logement, au gardien ou à
          des tiers, relèvent des assurances de chacun.
        </p>
        <ul>
          <li>
            Le propriétaire reste couvert par sa propre assurance de
            responsabilité civile en tant que détenteur du chien.
          </li>
          <li>
            Le gardien est couvert par sa propre assurance de responsabilité
            civile privée.
          </li>
        </ul>
        <p>
          Avant une garde, vérifiez tous deux auprès de votre assureur que
          cette situation est bien couverte.
        </p>
      </>
    ),
  },
  {
    title: "Avis, messages et photos",
    body: (
      <ul>
        <li>
          Après une garde terminée, propriétaire et gardien peuvent laisser un
          avis. Il doit être sincère et reposer sur ce qui s&apos;est
          réellement passé.
        </li>
        <li>
          Vous restez propriétaire des textes et photos que vous publiez. Vous
          nous autorisez à les afficher sur le site pour faire fonctionner le
          service.
        </li>
        <li>
          Ne publiez pas la photo ou les informations d&apos;une personne sans
          son accord.
        </li>
        <li>
          Nous pouvons retirer un contenu injurieux, trompeur ou illicite.
        </li>
      </ul>
    ),
  },
  {
    title: "Ce qui est interdit",
    body: (
      <ul>
        <li>Mentir sur son identité, son chien, son logement ou son expérience.</li>
        <li>Maltraiter un animal ou le mettre en danger.</li>
        <li>Harceler, menacer ou discriminer un autre utilisateur.</li>
        <li>Utiliser le site pour autre chose que la garde de chiens.</li>
        <li>Collecter les données d&apos;autres utilisateurs ou perturber le fonctionnement du site.</li>
      </ul>
    ),
  },
  {
    title: "Notre responsabilité",
    body: (
      <>
        <p>
          Nous faisons de notre mieux pour que le site fonctionne, sans pouvoir
          garantir qu&apos;il sera toujours disponible ni exempt d&apos;erreur.
        </p>
        <p>
          Nous ne contrôlons ni l&apos;identité des utilisateurs, ni
          l&apos;exactitude des annonces et des profils, ni le déroulement des
          gardes. Rencontrez-vous ou échangez avant de vous engager, et faites
          preuve du même discernement que pour toute rencontre.
        </p>
        <p>
          Dans les limites permises par la loi, nous ne répondons pas des
          dommages causés par un utilisateur à un autre, ni des dommages
          indirects. Rien dans ces conditions n&apos;écarte une responsabilité
          que la loi interdit d&apos;exclure.
        </p>
      </>
    ),
  },
  {
    title: "Suspension et fermeture d'un compte",
    body: (
      <>
        <p>
          Vous pouvez demander la fermeture de votre compte à tout moment en
          nous écrivant. Les gardes déjà réservées restent dues.
        </p>
        <p>
          Nous pouvons suspendre ou fermer un compte qui ne respecte pas ces
          conditions, après vous en avoir indiqué la raison, sauf urgence liée
          à la sécurité d&apos;une personne ou d&apos;un animal.
        </p>
      </>
    ),
  },
  {
    title: "Vos données",
    body: (
      <>
        <p>
          Nous traitons les données nécessaires au service : votre compte, vos
          annonces et profils, vos messages, vos réservations et vos avis.
          Nous ne les vendons pas.
        </p>
        <p>
          Elles sont hébergées par nos prestataires techniques : Vercel pour
          le site, Neon pour la base de données, Stripe pour les paiements et
          Brevo pour les e-mails.
        </p>
        <p>
          Vous pouvez demander à consulter, corriger ou supprimer vos données
          en nous écrivant.
        </p>
      </>
    ),
  },
  {
    title: "Évolution de ces conditions",
    body: (
      <p>
        Nous pouvons faire évoluer ces conditions. Nous vous prévenons par
        e-mail avant l&apos;entrée en vigueur d&apos;une nouvelle version. Les
        réservations déjà confirmées restent soumises à la version en vigueur
        au moment du paiement.
      </p>
    ),
  },
  {
    title: "Droit applicable",
    body: (
      <p>
        {LEGAL.country
          ? APPLICABLE_LAW[LEGAL.country]
          : "[Droit applicable et tribunaux compétents à compléter]"}
      </p>
    ),
  },
];

export default function ConditionsPage() {
  return (
    <div className="bg-leaf-pattern min-h-dvh px-4 py-10">
      <div className="mx-auto max-w-2xl">
        <Link href="/" className="mb-6 inline-block">
          <Logo />
        </Link>

        <article className="card p-6 sm:p-8">
          {!isLegalComplete && (
            <p
              role="note"
              className="mb-5 rounded-xl bg-terracotta/10 px-3 py-2 text-sm text-terracotta"
            >
              Projet de conditions générales : version non définitive, à ne pas
              publier en l&apos;état.
            </p>
          )}

          <h1 className="text-2xl font-bold text-ink">Conditions générales</h1>
          <p className="mt-1 text-sm text-muted">
            En vigueur depuis le {LEGAL.version}
          </p>

          <ol className="mt-6 space-y-7">
            {sections.map((section, index) => (
              <li key={section.title}>
                <h2 className="text-lg font-semibold text-ink">
                  {index + 1}. {section.title}
                </h2>
                <div className="mt-2 space-y-3 text-sm leading-relaxed text-ink-soft [&_ul]:list-disc [&_ul]:space-y-1.5 [&_ul]:pl-5">
                  {section.body}
                </div>
              </li>
            ))}
          </ol>
        </article>

        <p className="mt-6 text-center text-sm">
          <Link href="/" className="font-medium text-brand hover:underline">
            ← Retour à l&apos;accueil
          </Link>
        </p>
      </div>
    </div>
  );
}
