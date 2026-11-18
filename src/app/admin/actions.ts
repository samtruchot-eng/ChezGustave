"use server";

import { revalidatePath, revalidateTag } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/admin";

/** Vérifie / dé-vérifie un profil gardien. */
export async function toggleSitterVerified(userId: string) {
  await requireAdmin();
  const sp = await prisma.sitterProfile.findUnique({ where: { userId } });
  if (!sp) return;
  await prisma.sitterProfile.update({
    where: { userId },
    data: { verified: !sp.verified },
  });
  revalidatePath(`/admin/utilisateurs/${userId}`);
  revalidatePath("/admin/utilisateurs");
  revalidateTag("sitters");
}

/** Attribue / retire le badge Super Gardien. */
export async function toggleSuperSitter(userId: string) {
  await requireAdmin();
  const sp = await prisma.sitterProfile.findUnique({ where: { userId } });
  if (!sp) return;
  await prisma.sitterProfile.update({
    where: { userId },
    data: { isSuperSitter: !sp.isSuperSitter },
  });
  revalidatePath(`/admin/utilisateurs/${userId}`);
  revalidateTag("sitters");
}

/** Vérifie / dé-vérifie un profil propriétaire. */
export async function toggleOwnerVerified(userId: string) {
  await requireAdmin();
  const op = await prisma.ownerProfile.findUnique({ where: { userId } });
  if (!op) return;
  await prisma.ownerProfile.update({
    where: { userId },
    data: { verified: !op.verified },
  });
  revalidatePath(`/admin/utilisateurs/${userId}`);
  revalidateTag("sitters");
}

/** Change le statut d'une candidature (accepter / refuser / remettre en attente). */
export async function setApplicationStatus(
  applicationId: string,
  status: "pending" | "accepted" | "rejected"
) {
  await requireAdmin();
  const app = await prisma.application.update({
    where: { id: applicationId },
    data: { status },
    include: {
      listing: { select: { ownerId: true, dog: { select: { name: true } } } },
      sitter: { select: { name: true } },
    },
  });

  // Notifie le gardien de la décision.
  if (status === "accepted" || status === "rejected") {
    await prisma.notification.create({
      data: {
        userId: app.sitterId,
        type:
          status === "accepted" ? "application_accepted" : "application_rejected",
        title:
          status === "accepted"
            ? "Candidature acceptée"
            : "Candidature refusée",
        body:
          status === "accepted"
            ? `Votre candidature pour garder ${app.listing.dog.name} a été acceptée.`
            : `Votre candidature pour garder ${app.listing.dog.name} n'a pas été retenue.`,
        link: "/profil/demandes",
      },
    });
  }

  revalidatePath("/admin/candidatures");
  revalidatePath("/admin");
}

/**
 * Supprime les comptes de démonstration (e-mails en @example.ch) et, par
 * cascade, toutes leurs données (profils, chiens, escapades, réservations,
 * messages, avis…). N'affecte PAS les vrais comptes. Réservé aux admins.
 * Une confirmation textuelle « SUPPRIMER » est requise.
 */
const DEMO_EMAIL_SUFFIX = "@example.ch";

export async function resetDemoData(
  _prev: string | undefined,
  formData: FormData
): Promise<string> {
  await requireAdmin();

  const confirm = String(formData.get("confirm") ?? "").trim();
  if (confirm !== "SUPPRIMER") {
    return "Confirmation incorrecte — tapez SUPPRIMER en majuscules.";
  }

  const count = await prisma.user.count({
    where: { email: { endsWith: DEMO_EMAIL_SUFFIX } },
  });
  if (count === 0) return "Aucun compte de démo à supprimer.";

  await prisma.user.deleteMany({
    where: { email: { endsWith: DEMO_EMAIL_SUFFIX } },
  });

  revalidatePath("/admin");
  revalidatePath("/admin/utilisateurs");
  revalidatePath("/decouvrir");
  revalidateTag("listings");
  revalidateTag("sitters");
  return `${count} compte${count > 1 ? "s" : ""} de démo supprimé${count > 1 ? "s" : ""}. La base est propre. ✅`;
}
