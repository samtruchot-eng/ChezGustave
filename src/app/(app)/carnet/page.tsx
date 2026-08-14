import Image from "next/image";
import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/session";
import { getMode } from "@/lib/mode";
import { Avatar } from "@/components/ui/Avatar";
import { Badge } from "@/components/ui/Badge";
import { GustaveMark } from "@/components/ui/Logo";
import { IconBook, IconRoute, IconCamera } from "@/components/ui/icons";
import { formatDateRange } from "@/lib/utils";

export const metadata = { title: "Carnet de garde" };

export default async function CarnetPage() {
  const me = await requireUser();
  const mode = await getMode();
  if (!me) return null;

  const booking = await prisma.booking.findFirst({
    where: {
      status: { in: ["in_progress", "confirmed", "completed"] },
      OR: [{ ownerId: me.id }, { sitterId: me.id }],
    },
    include: {
      listing: { include: { dog: true } },
      owner: { select: { name: true, image: true } },
      sitter: { select: { name: true, image: true } },
      careLog: { orderBy: { date: "desc" } },
    },
    orderBy: { updatedAt: "desc" },
  });

  if (!booking) {
    return (
      <div className="space-y-4">
        <h1 className="text-2xl font-bold text-ink">Carnet de garde</h1>
        <div className="card p-10 text-center">
          <IconBook className="mx-auto h-9 w-9 text-muted" />
          <p className="mt-2 font-medium text-ink">Aucune garde en cours</p>
          <p className="text-sm text-muted">
            Le carnet s&apos;anime dès qu&apos;une garde démarre : une photo et
            un mot du chien chaque jour.
          </p>
        </div>
      </div>
    );
  }

  const dog = booking.listing.dog;
  const counterpart = mode === "sitter" ? booking.owner : booking.sitter;

  return (
    <div className="space-y-5">
      <h1 className="text-2xl font-bold text-ink">Carnet de garde</h1>

      {/* En-tête garde */}
      <section className="card overflow-hidden">
        <div className="relative h-40 w-full bg-sand">
          {dog.photo ? (
            <Image
              src={dog.photo}
              alt={dog.name}
              fill
              sizes="640px"
              className="object-cover"
            />
          ) : (
            <div className="flex h-full items-center justify-center">
              <GustaveMark className="h-16 w-16 opacity-70" />
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-ink/60 to-transparent" />
          <div className="absolute bottom-3 left-4 text-cream">
            <p className="text-lg font-bold">{dog.name}</p>
            <p className="text-sm opacity-90">
              {formatDateRange(booking.startDate, booking.endDate)}
            </p>
          </div>
          <div className="absolute right-3 top-3">
            <Badge tone="brand">
              {booking.status === "in_progress" ? "En cours" : "Garde"}
            </Badge>
          </div>
        </div>
        <div className="flex items-center gap-3 p-4">
          <Avatar src={counterpart.image} name={counterpart.name} size={40} />
          <p className="text-sm text-muted">
            {mode === "sitter" ? "Chez " : "Gardé par "}
            <span className="font-medium text-ink">{counterpart.name}</span>
          </p>
        </div>
      </section>

      {/* Nouvelles quotidiennes */}
      <div className="space-y-4">
        {booking.careLog.map((entry) => (
          <article key={entry.id} className="card overflow-hidden">
            {entry.photo && (
              <div className="relative aspect-[16/10] w-full bg-sand">
                <Image
                  src={entry.photo}
                  alt="Photo du jour"
                  fill
                  sizes="640px"
                  className="object-cover"
                />
              </div>
            )}
            <div className="p-4">
              <p className="text-xs font-medium uppercase tracking-wide text-muted">
                {new Intl.DateTimeFormat("fr-CH", {
                  weekday: "long",
                  day: "numeric",
                  month: "long",
                }).format(entry.date)}
              </p>
              {entry.note && (
                <p className="mt-1 text-ink-soft">{entry.note}</p>
              )}
              <div className="mt-3 flex items-center gap-2 text-sm text-muted">
                <IconRoute className="h-4 w-4 text-brand" /> Balade du jour
                <span className="chip">2,4 km · 45 min</span>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* Album souvenir */}
      <section className="card bg-sage-100 p-5 text-center">
        <IconCamera className="mx-auto h-8 w-8 text-pine" />
        <h2 className="mt-1 font-semibold text-brand">Album souvenir</h2>
        <p className="text-sm text-ink-soft">
          À la fin du séjour, toutes les photos et les mots seront réunis dans
          un album, remis au propriétaire.
        </p>
      </section>
    </div>
  );
}
