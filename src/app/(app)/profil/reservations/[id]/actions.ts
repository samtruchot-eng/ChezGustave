"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/session";

async function loadOwnBooking(bookingId: string) {
  const me = await requireUser();
  const booking = await prisma.booking.findUnique({
    where: { id: bookingId },
  });
  if (!booking) return null;
  if (booking.ownerId !== me.id && booking.sitterId !== me.id) return null;
  return { me, booking };
}

/** Passe la garde « en cours ». */
export async function startBooking(bookingId: string) {
  const ctx = await loadOwnBooking(bookingId);
  if (!ctx || ctx.booking.status !== "confirmed") return;
  await prisma.booking.update({
    where: { id: bookingId },
    data: { status: "in_progress" },
  });
  revalidatePath(`/profil/reservations/${bookingId}`);
  revalidatePath("/carnet");
}

/** Termine la garde. */
export async function completeBooking(bookingId: string) {
  const ctx = await loadOwnBooking(bookingId);
  if (!ctx || !["confirmed", "in_progress"].includes(ctx.booking.status)) return;
  await prisma.booking.update({
    where: { id: bookingId },
    data: { status: "completed" },
  });
  revalidatePath(`/profil/reservations/${bookingId}`);
}

/** Annule la garde (et rouvre l'escapade). */
export async function cancelBooking(bookingId: string) {
  const ctx = await loadOwnBooking(bookingId);
  if (!ctx || ["completed", "cancelled"].includes(ctx.booking.status)) return;

  await prisma.$transaction([
    prisma.booking.update({
      where: { id: bookingId },
      data: { status: "cancelled" },
    }),
    prisma.listing.update({
      where: { id: ctx.booking.listingId },
      data: { status: "open" },
    }),
  ]);

  // Notifie l'autre partie.
  const other =
    ctx.me.id === ctx.booking.ownerId
      ? ctx.booking.sitterId
      : ctx.booking.ownerId;
  await prisma.notification.create({
    data: {
      userId: other,
      type: "booking_cancelled",
      title: "Garde annulée",
      body: "Une garde a été annulée.",
      link: `/profil/reservations/${bookingId}`,
    },
  });

  revalidatePath(`/profil/reservations/${bookingId}`);
  revalidatePath("/profil/reservations");
}
