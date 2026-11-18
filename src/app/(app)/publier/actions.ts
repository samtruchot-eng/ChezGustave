"use server";

import { redirect } from "next/navigation";
import { revalidatePath, revalidateTag } from "next/cache";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/session";
import { toJsonList } from "@/lib/utils";
import { GEO_FALLBACK } from "@/lib/geo";

const listingSchema = z.object({
  dogName: z.string().min(1, "Le nom du chien est requis"),
  dogBreed: z.string().optional(),
  title: z.string().min(3, "Un titre est requis"),
  region: z.string().min(1, "La région est requise"),
  startDate: z.string().min(1),
  endDate: z.string().min(1),
  careType: z.enum(["onsite", "visits"]),
  ambiance: z.enum(["lac", "campagne", "montagne"]).optional(),
  price: z.coerce.number().int().min(0),
  description: z.string().optional(),
  lastMinute: z.coerce.boolean().optional(),
});

export type ActionResult = { ok: boolean; error?: string };

export async function createListing(
  _prev: ActionResult,
  formData: FormData
): Promise<ActionResult> {
  const me = await requireUser();
  if (!me) return { ok: false, error: "Vous devez être connecté." };

  const parsed = listingSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) {
    return { ok: false, error: parsed.error.issues[0]?.message ?? "Formulaire invalide." };
  }
  const d = parsed.data;

  // Réutilise un chien existant du même nom, sinon le crée.
  let dog = await prisma.dog.findFirst({
    where: { ownerId: me.id, name: d.dogName },
  });
  if (!dog) {
    dog = await prisma.dog.create({
      data: { ownerId: me.id, name: d.dogName, breed: d.dogBreed || null },
    });
  }

  const geo = GEO_FALLBACK.byRegion[d.region] ?? GEO_FALLBACK;

  const listing = await prisma.listing.create({
    data: {
      ownerId: me.id,
      dogId: dog.id,
      title: d.title,
      region: d.region,
      lat: geo.lat,
      lng: geo.lng,
      startDate: new Date(d.startDate),
      endDate: new Date(d.endDate),
      careType: d.careType,
      ambiance: d.ambiance ?? null,
      price: d.price,
      description: d.description || null,
      lastMinute: !!d.lastMinute,
      status: "open",
    },
  });

  revalidatePath("/decouvrir");
  revalidateTag("listings");
  redirect(`/decouvrir/escapade/${listing.id}`);
}

const sitterSchema = z.object({
  firstName: z.string().min(1, "Le prénom est requis"),
  region: z.string().min(1, "La zone est requise"),
  headline: z.string().optional(),
  bio: z.string().optional(),
  dailyRate: z.coerce.number().int().min(0),
  animals: z.array(z.string()).optional(),
  ambiances: z.array(z.string()).optional(),
});

export async function upsertSitterProfile(
  _prev: ActionResult,
  formData: FormData
): Promise<ActionResult> {
  const me = await requireUser();
  if (!me) return { ok: false, error: "Vous devez être connecté." };

  const raw = {
    firstName: formData.get("firstName"),
    region: formData.get("region"),
    headline: formData.get("headline"),
    bio: formData.get("bio"),
    dailyRate: formData.get("dailyRate"),
    animals: formData.getAll("animals"),
    ambiances: formData.getAll("ambiances"),
  };
  const parsed = sitterSchema.safeParse(raw);
  if (!parsed.success) {
    return { ok: false, error: parsed.error.issues[0]?.message ?? "Formulaire invalide." };
  }
  const d = parsed.data;

  await prisma.sitterProfile.upsert({
    where: { userId: me.id },
    create: {
      userId: me.id,
      firstName: d.firstName,
      region: d.region,
      headline: d.headline || null,
      bio: d.bio || null,
      dailyRate: d.dailyRate,
      animalsAccepted: toJsonList(d.animals ?? ["chiens"]),
      ambiances: toJsonList(d.ambiances ?? []),
    },
    update: {
      firstName: d.firstName,
      region: d.region,
      headline: d.headline || null,
      bio: d.bio || null,
      dailyRate: d.dailyRate,
      animalsAccepted: toJsonList(d.animals ?? ["chiens"]),
      ambiances: toJsonList(d.ambiances ?? []),
    },
  });

  revalidatePath("/decouvrir");
  revalidateTag("listings");
  redirect(`/decouvrir/gardien/${me.id}`);
}
