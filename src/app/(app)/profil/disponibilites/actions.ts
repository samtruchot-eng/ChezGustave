"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/session";

async function myProfile(userId: string) {
  return prisma.sitterProfile.findUnique({ where: { userId } });
}

/** Ajoute une période de disponibilité pour le gardien. */
export async function addAvailability(formData: FormData) {
  const me = await requireUser();
  const profile = await myProfile(me.id);
  if (!profile) return;

  const startStr = String(formData.get("start") ?? "");
  const endStr = String(formData.get("end") ?? "");
  if (!startStr || !endStr) return;

  const start = new Date(startStr);
  const end = new Date(endStr);
  if (isNaN(+start) || isNaN(+end)) return;
  if (end < start) return;

  // Pas de période entièrement passée.
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  if (end < today) return;

  await prisma.availability.create({
    data: { sitterId: profile.id, startDate: start, endDate: end },
  });
  revalidatePath("/profil/disponibilites");
}

/** Supprime une période de disponibilité (si elle m'appartient). */
export async function removeAvailability(id: string) {
  const me = await requireUser();
  const profile = await myProfile(me.id);
  if (!profile) return;

  const avail = await prisma.availability.findUnique({ where: { id } });
  if (!avail || avail.sitterId !== profile.id) return;

  await prisma.availability.delete({ where: { id } });
  revalidatePath("/profil/disponibilites");
}
