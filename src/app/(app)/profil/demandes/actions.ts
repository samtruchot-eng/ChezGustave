"use server";

import { redirect } from "next/navigation";
import { revalidatePath, revalidateTag } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/session";
import { computeBreakdown } from "@/lib/money";

/**
 * Le propriétaire accepte une candidature :
 * crée la réservation, refuse les autres candidatures, marque l'escapade
 * comme attribuée et notifie les gardiens.
 */
export async function acceptApplication(applicationId: string) {
  const me = await requireUser();

  const app = await prisma.application.findUnique({
    where: { id: applicationId },
    include: { listing: { include: { dog: true } } },
  });
  if (!app || app.listing.ownerId !== me.id) redirect("/profil/demandes");

  // Déjà une réservation ACTIVE pour cette escapade ? on n'en recrée pas.
  const existing = await prisma.booking.findFirst({
    where: {
      listingId: app.listingId,
      status: { in: ["pending", "confirmed", "in_progress"] },
    },
  });
  if (existing) redirect(`/profil/reservations/${existing.id}`);

  const listing = app.listing;
  const b = computeBreakdown(listing.price);

  const booking = await prisma.$transaction(async (tx) => {
    await tx.application.update({
      where: { id: app.id },
      data: { status: "accepted" },
    });
    await tx.application.updateMany({
      where: {
        listingId: listing.id,
        id: { not: app.id },
        status: "pending",
      },
      data: { status: "rejected" },
    });
    await tx.listing.update({
      where: { id: listing.id },
      data: { status: "matched" },
    });
    return tx.booking.create({
      data: {
        listingId: listing.id,
        ownerId: listing.ownerId,
        sitterId: app.sitterId,
        startDate: listing.startDate,
        endDate: listing.endDate,
        amount: b.total,
        commissionPercent: b.commissionPercent,
        commissionAmount: b.commissionAmount,
        payoutAmount: b.payoutAmount,
        status: "confirmed",
      },
    });
  });

  await prisma.notification.create({
    data: {
      userId: app.sitterId,
      type: "application_accepted",
      title: "Garde confirmée",
      body: `Votre garde de ${listing.dog.name} est confirmée. À bientôt !`,
      link: `/profil/reservations/${booking.id}`,
    },
  });

  revalidatePath("/profil/demandes");
  revalidatePath("/profil/reservations");
  revalidateTag("listings");
  redirect(`/profil/reservations/${booking.id}`);
}

/** Le propriétaire refuse une candidature. */
export async function declineApplication(applicationId: string) {
  const me = await requireUser();

  const app = await prisma.application.findUnique({
    where: { id: applicationId },
    include: { listing: { include: { dog: true } } },
  });
  if (!app || app.listing.ownerId !== me.id) redirect("/profil/demandes");

  await prisma.application.update({
    where: { id: app.id },
    data: { status: "rejected" },
  });

  await prisma.notification.create({
    data: {
      userId: app.sitterId,
      type: "application_rejected",
      title: "Candidature non retenue",
      body: `Votre candidature pour garder ${app.listing.dog.name} n'a pas été retenue cette fois.`,
      link: "/profil/demandes",
    },
  });

  revalidatePath("/profil/demandes");
}
