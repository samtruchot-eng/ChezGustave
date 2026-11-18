"use server";

import { redirect } from "next/navigation";
import { after } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/session";
import { sendUserEmail } from "@/lib/email";

export async function applyToListing(listingId: string, formData: FormData) {
  const me = await requireUser();
  if (!me) redirect("/decouvrir");

  const message = String(formData.get("message") ?? "").trim();

  const listing = await prisma.listing.findUnique({
    where: { id: listingId },
    select: { ownerId: true, dog: { select: { name: true } } },
  });
  if (!listing) redirect("/decouvrir");

  // Idempotent : une seule candidature par gardien et escapade.
  await prisma.application.upsert({
    where: { listingId_sitterId: { listingId, sitterId: me.id } },
    create: { listingId, sitterId: me.id, message: message || null },
    update: { message: message || null, status: "pending" },
  });

  // Notifie le propriétaire.
  await prisma.notification.create({
    data: {
      userId: listing.ownerId,
      type: "new_application",
      title: "Nouvelle candidature",
      body: `${me.name} a postulé pour garder ${listing.dog.name}.`,
      link: "/profil/demandes",
    },
  });

  after(() =>
    sendUserEmail(listing.ownerId, {
      subject: "Nouvelle candidature sur votre escapade",
      heading: "Vous avez une nouvelle candidature 🎉",
      intro: `${me.name} souhaite garder ${listing.dog.name}.`,
      bodyLines: message ? [`« ${message} »`] : [],
      ctaText: "Voir la candidature",
      ctaPath: "/profil/demandes",
    })
  );

  redirect(`/decouvrir/escapade/${listingId}?applied=1`);
}
