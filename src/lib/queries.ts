import { prisma } from "./prisma";

export interface DiscoverFilters {
  q?: string;
  ambiance?: string; // côté gardien
  animal?: string; // côté propriétaire
  lastMinute?: boolean;
}

/** Escapades ouvertes (vue côté gardien : je cherche une garde). */
export async function getListings(filters: DiscoverFilters = {}) {
  const { q, ambiance, lastMinute } = filters;
  return prisma.listing.findMany({
    where: {
      status: "open",
      ...(ambiance ? { ambiance } : {}),
      ...(lastMinute ? { lastMinute: true } : {}),
      ...(q
        ? {
            OR: [
              { title: { contains: q } },
              { region: { contains: q } },
              { description: { contains: q } },
              { dog: { is: { name: { contains: q } } } },
              { dog: { is: { breed: { contains: q } } } },
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
  const { q, animal } = filters;
  const sitters = await prisma.sitterProfile.findMany({
    where: {
      ...(q
        ? {
            OR: [
              { firstName: { contains: q } },
              { region: { contains: q } },
              { headline: { contains: q } },
              { bio: { contains: q } },
            ],
          }
        : {}),
      ...(animal ? { animalsAccepted: { contains: animal } } : {}),
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
