import { NextResponse } from "next/server";
import type Stripe from "stripe";
import { prisma } from "@/lib/prisma";
import { constructWebhookEvent } from "@/lib/stripe";
import { markBookingPaid } from "@/lib/payments";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Webhook Stripe : confirme les paiements et met à jour le statut
 * d'onboarding des gardiens. Sans clés Stripe, la route répond simplement 200.
 */
export async function POST(req: Request) {
  const signature = req.headers.get("stripe-signature");
  const body = await req.text();

  if (!signature) {
    return NextResponse.json({ received: true, skipped: "no-signature" });
  }

  let event: Stripe.Event | null;
  try {
    event = constructWebhookEvent(body, signature);
  } catch (err) {
    const message = err instanceof Error ? err.message : "invalid signature";
    return NextResponse.json({ error: message }, { status: 400 });
  }
  if (!event) {
    // Stripe non configuré côté serveur : on ignore proprement.
    return NextResponse.json({ received: true, skipped: "not-configured" });
  }

  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object as Stripe.Checkout.Session;
      const bookingId = session.metadata?.bookingId;
      if (bookingId && session.payment_status === "paid") {
        await markBookingPaid({
          bookingId,
          paymentIntentId:
            typeof session.payment_intent === "string"
              ? session.payment_intent
              : null,
        });
      }
      break;
    }
    case "payment_intent.succeeded": {
      const pi = event.data.object as Stripe.PaymentIntent;
      const bookingId = pi.metadata?.bookingId;
      if (bookingId) {
        await markBookingPaid({ bookingId, paymentIntentId: pi.id });
      }
      break;
    }
    case "account.updated": {
      const account = event.data.object as Stripe.Account;
      const ready =
        !!account.details_submitted &&
        !!account.payouts_enabled &&
        account.capabilities?.transfers === "active";
      await prisma.sitterProfile.updateMany({
        where: { stripeAccountId: account.id },
        data: { stripeChargesEnabled: ready },
      });
      break;
    }
    default:
      break;
  }

  return NextResponse.json({ received: true });
}
