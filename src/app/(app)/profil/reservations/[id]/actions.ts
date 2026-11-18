"use server";

import { redirect } from "next/navigation";
import { revalidatePath, revalidateTag } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/session";
import {
  appBaseUrl,
  createBookingCheckoutSession,
  isStripeConfigured,
} from "@/lib/stripe";
import { formatDateRange } from "@/lib/utils";
import { recomputeSitterRating } from "@/lib/reviews";

async function loadOwnBooking(bookingId: string) {
  const me = await requireUser();
  const booking = await prisma.booking.findUnique({
    where: { id: bookingId },
  });
  if (!booking) return null;
  if (booking.ownerId !== me.id && booking.sitterId !== me.id) return null;
  return { me, booking };
}

/**
 * Le propriétaire règle la garde en ligne : crée une session Stripe Checkout
 * (charge à destination du gardien, commission prélevée) et redirige.
 */
export async function payForBooking(bookingId: string) {
  const me = await requireUser();
  if (!isStripeConfigured()) redirect(`/profil/reservations/${bookingId}`);

  const booking = await prisma.booking.findUnique({
    where: { id: bookingId },
    include: { listing: { include: { dog: true } } },
  });
  if (!booking || booking.ownerId !== me.id)
    redirect(`/profil/reservations/${bookingId}`);
  if (booking.paymentStatus === "paid")
    redirect(`/profil/reservations/${bookingId}`);
  if (!["confirmed", "in_progress"].includes(booking.status))
    redirect(`/profil/reservations/${bookingId}`);

  const sitterProfile = await prisma.sitterProfile.findUnique({
    where: { userId: booking.sitterId },
  });
  if (!sitterProfile?.stripeAccountId || !sitterProfile.stripeChargesEnabled)
    redirect(`/profil/reservations/${bookingId}?error=sitter_not_ready`);

  const base = `${appBaseUrl()}/profil/reservations/${bookingId}`;
  const session = await createBookingCheckoutSession({
    bookingId: booking.id,
    amountChf: booking.amount,
    commissionChf: booking.commissionAmount,
    sitterAccountId: sitterProfile.stripeAccountId,
    productName: `Garde de ${booking.listing.dog.name}`,
    productDescription: formatDateRange(booking.startDate, booking.endDate),
    ownerEmail: me.email,
    successUrl: `${base}?session_id={CHECKOUT_SESSION_ID}`,
    cancelUrl: `${base}?canceled=1`,
  });
  if (!session?.url) redirect(`/profil/reservations/${bookingId}`);

  await prisma.booking.update({
    where: { id: booking.id },
    data: { stripeCheckoutSessionId: session.id },
  });

  redirect(session.url);
}

/**
 * Laisse un avis (note 1–5 + commentaire) après une garde terminée.
 * Un seul avis par auteur et par réservation ; met à jour la note du gardien.
 */
export async function submitReview(bookingId: string, formData: FormData) {
  const me = await requireUser();

  const rating = Number(formData.get("rating"));
  const comment = String(formData.get("comment") ?? "").trim() || null;
  if (!Number.isInteger(rating) || rating < 1 || rating > 5) return;

  const booking = await prisma.booking.findUnique({ where: { id: bookingId } });
  if (!booking) return;
  const iAmOwner = booking.ownerId === me.id;
  const iAmSitter = booking.sitterId === me.id;
  if (!iAmOwner && !iAmSitter) return;
  if (booking.status !== "completed") return;

  const targetId = iAmOwner ? booking.sitterId : booking.ownerId;

  const existing = await prisma.review.findFirst({
    where: { bookingId, authorId: me.id },
  });
  if (existing) return;

  await prisma.review.create({
    data: {
      authorId: me.id,
      targetId,
      bookingId,
      listingId: booking.listingId,
      rating,
      comment,
    },
  });

  await recomputeSitterRating(targetId);

  await prisma.notification.create({
    data: {
      userId: targetId,
      type: "review_received",
      title: "Nouvel avis reçu",
      body: comment ? comment.slice(0, 120) : `Vous avez reçu ${rating}/5 ★.`,
      link: `/profil/reservations/${bookingId}`,
    },
  });

  revalidatePath(`/profil/reservations/${bookingId}`);
  revalidatePath("/decouvrir");
  revalidateTag("sitters");
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
  revalidateTag("listings");
}
