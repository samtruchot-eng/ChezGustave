"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/session";

/**
 * Le gardien ajoute une entrée au carnet (photo et/ou petit mot) pendant la
 * garde, et le propriétaire reçoit une notification.
 */
export async function addCareLogEntry(bookingId: string, formData: FormData) {
  const me = await requireUser();

  const note = String(formData.get("note") ?? "").trim();
  let photo: string | null = String(formData.get("photo") ?? "").trim() || null;
  // Garde-fou : évite un payload trop lourd (l'image est déjà réduite côté client).
  if (photo && photo.length > 2_500_000) photo = null;
  if (!note && !photo) return;

  const booking = await prisma.booking.findUnique({
    where: { id: bookingId },
    include: { listing: { include: { dog: true } } },
  });
  if (!booking || booking.sitterId !== me.id) return;
  if (!["in_progress", "confirmed"].includes(booking.status)) return;

  await prisma.careLogEntry.create({
    data: {
      bookingId,
      note: note || null,
      photo,
      date: new Date(),
    },
  });

  await prisma.notification.create({
    data: {
      userId: booking.ownerId,
      type: "carnet_update",
      title: `Des nouvelles de ${booking.listing.dog.name}`,
      body: note ? note.slice(0, 120) : "Une nouvelle photo dans le carnet.",
      link: "/carnet",
    },
  });

  revalidatePath("/carnet");
}
