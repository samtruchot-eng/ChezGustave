import { prisma } from "./prisma";

export interface DiscoverFilters {
  q?: string;
  ambiance?: string; // côté gardien
  animal?: string; // côté propriétaire
  lastMinute?: boolean;
  region?: string; // zone (les deux modes)
  maxPrice?: number; // budget max — prix escapade / tarif jour
  superSitter?: boolean; // uniquement les Super Gardiens (mode propriétaire)
}

/** Escapades ouvertes (vue côté gardien : je cherche une garde). */
export async function getListings(filters: DiscoverFilters = {}) {
  const { q, ambiance, lastMinute, region, maxPrice } = filters;
  return prisma.listing.findMany({
    where: {
      status: "open",
      ...(ambiance ? { ambiance } : {}),
      ...(lastMinute ? { lastMinute: true } : {}),
      ...(region ? { region } : {}),
      ...(maxPrice ? { price: { lte: maxPrice } } : {}),
      ...(q
        ? {
            OR: [
              { title: { contains: q, mode: "insensitive" } },
              { region: { contains: q, mode: "insensitive" } },
              { description: { contains: q, mode: "insensitive" } },
              { dog: { is: { name: { contains: q, mode: "insensitive" } } } },
              { dog: { is: { breed: { contains: q, mode: "insensitive" } } } },
            ],
          }
        : {}),
    },
    include: {
      dog: true,
      owner: { select: { id: true, name: true, image: true } },
    },
    orderBy: [{ lastMinute: "desc" }, { startDate: "asc" }],
  });
}

export async function getListingById(id: string) {
  return prisma.listing.findUnique({
    where: { id },
    include: {
      dog: true,
      owner: {
        select: { id: true, name: true, image: true, ownerProfile: true },
      },
      reviews: {
        include: { author: { select: { name: true, image: true } } },
        orderBy: { createdAt: "desc" },
      },
      _count: { select: { applications: true } },
    },
  });
}

/** Profils gardiens (vue côté propriétaire : je cherche un gardien). */
export async function getSitters(filters: DiscoverFilters = {}) {
  const { q, animal, region, maxPrice, superSitter } = filters;
  const sitters = await prisma.sitterProfile.findMany({
    where: {
      ...(q
        ? {
            OR: [
              { firstName: { contains: q, mode: "insensitive" } },
              { region: { contains: q, mode: "insensitive" } },
              { headline: { contains: q, mode: "insensitive" } },
              { bio: { contains: q, mode: "insensitive" } },
            ],
          }
        : {}),
      ...(animal ? { animalsAccepted: { contains: animal } } : {}),
      ...(region ? { region } : {}),
      ...(maxPrice ? { dailyRate: { lte: maxPrice } } : {}),
      ...(superSitter ? { isSuperSitter: true } : {}),
    },
    include: {
      user: { select: { id: true, name: true, image: true } },
    },
    orderBy: [{ isSuperSitter: "desc" }, { ratingAvg: "desc" }],
  });
  return sitters;
}

export async function getSitterByUserId(userId: string) {
  return prisma.sitterProfile.findUnique({
    where: { userId },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          image: true,
          reviewsReceived: {
            include: { author: { select: { name: true, image: true } } },
            orderBy: { createdAt: "desc" },
          },
        },
      },
      availabilities: { orderBy: { startDate: "asc" } },
    },
  });
}
