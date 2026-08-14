import { prisma } from "./prisma";

/**
 * Marque une réservation comme payée (idempotent).
 * Appelé au retour de Checkout et depuis le webhook Stripe.
 */
export async function markBookingPaid(opts: {
  bookingId: string;
  paymentIntentId?: string | null;
}): Promise<void> {
  const booking = await prisma.booking.findUnique({
    where: { id: opts.bookingId },
  });
  if (!booking || booking.paymentStatus === "paid") return;

  await prisma.booking.update({
    where: { id: opts.bookingId },
    data: {
      paymentStatus: "paid",
      paidAt: new Date(),
      stripePaymentIntentId:
        opts.paymentIntentId ?? booking.stripePaymentIntentId,
      // Une garde réglée est au minimum confirmée.
      status: booking.status === "pending" ? "confirmed" : booking.status,
    },
  });

  await prisma.notification.create({
    data: {
      userId: booking.sitterId,
      type: "booking_paid",
      title: "Paiement reçu",
      body: "Une garde vient d'être réglée. Votre versement est en route.",
      link: `/profil/reservations/${booking.id}`,
    },
  });
}
