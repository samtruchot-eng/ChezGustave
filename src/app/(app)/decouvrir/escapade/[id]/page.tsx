import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getListingById } from "@/lib/queries";
import { Badge, InsuranceBadge } from "@/components/ui/Badge";
import { Avatar } from "@/components/ui/Avatar";
import { Rating } from "@/components/ui/Rating";
import { ButtonLink } from "@/components/ui/Button";
import { GustaveMark } from "@/components/ui/Logo";
import {
  IconClock,
  IconPin,
  IconHome,
  IconCalendar,
  IconMountain,
  IconPaw,
  IconBowl,
  IconBulb,
  IconGraduation,
  IconHeartPulse,
  AmbianceIcon,
} from "@/components/ui/icons";
import {
  formatCHF,
  formatDateRange,
  jsonList,
  nightsBetween,
} from "@/lib/utils";
import {
  AMBIANCE_LABELS,
  CARE_TYPE_LABELS,
  type Ambiance,
  type CareType,
} from "@/lib/constants";

type IconType = (props: { className?: string }) => React.ReactElement;

export default async function EscapadePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const listing = await getListingById(id);
  if (!listing) notFound();

  const dog = listing.dog;
  const nights = nightsBetween(listing.startDate, listing.endDate);
  const ambiance = listing.ambiance as Ambiance | null;
  const nearby = jsonList(listing.nearbyActivities);

  const passport: { label: string; value: string | null; icon: IconType }[] = [
    { label: "Caractère", value: dog.character, icon: IconPaw },
    { label: "Alimentation", value: dog.food, icon: IconBowl },
    { label: "À savoir", value: dog.goodToKnow, icon: IconBulb },
    { label: "Commandes", value: dog.commands, icon: IconGraduation },
    { label: "Vétérinaire", value: dog.vet, icon: IconHeartPulse },
  ];

  return (
    <div className="space-y-5 pb-4">
      <BackLink />

      {/* Photo */}
      <div className="card relative aspect-[16/10] overflow-hidden">
        {dog.photo ? (
          <Image
            src={dog.photo}
            alt={dog.name}
            fill
            sizes="640px"
            className="object-cover"
            priority
          />
        ) : (
          <div className="flex h-full items-center justify-center">
            <GustaveMark className="h-20 w-20 opacity-70" />
          </div>
        )}
        <div className="absolute left-3 top-3 flex flex-wrap gap-2">
          {listing.lastMinute && (
            <Badge tone="terracotta">
              <IconClock className="h-3.5 w-3.5" /> Dernière minute
            </Badge>
          )}
          {ambiance && (
            <span className="chip bg-cream/90">
              <AmbianceIcon value={ambiance} className="h-3.5 w-3.5" />{" "}
              {AMBIANCE_LABELS[ambiance]}
            </span>
          )}
        </div>
      </div>

      {/* Titre & infos clés */}
      <div>
        <h1 className="text-2xl font-bold text-ink">{listing.title}</h1>
        <p className="mt-1 flex items-center gap-1 text-muted">
          <IconPin className="h-4 w-4" /> {listing.region} ·{" "}
          {formatDateRange(listing.startDate, listing.endDate)}
        </p>
        <div className="mt-3 flex flex-wrap items-center gap-2">
          <span className="chip">
            <IconCalendar className="h-3.5 w-3.5" /> {nights} nuit
            {nights > 1 ? "s" : ""}
          </span>
          <span className="chip">
            <IconHome className="h-3.5 w-3.5" />{" "}
            {CARE_TYPE_LABELS[listing.careType as CareType]}
          </span>
          <span className="chip font-semibold text-brand">
            {formatCHF(listing.price)}
          </span>
        </div>
      </div>

      <InsuranceBadge />

      {listing.description && (
        <p className="text-ink-soft">{listing.description}</p>
      )}

      {/* Passeport du chien */}
      <section className="card p-5">
        <div className="flex items-center gap-3">
          <GustaveMark className="h-9 w-9" />
          <div>
            <h2 className="font-semibold text-ink">
              Le passeport de {dog.name}
            </h2>
            <p className="text-sm text-muted">
              {dog.breed}
              {dog.ageYears ? ` · ${dog.ageYears} ans` : ""}
            </p>
          </div>
        </div>
        <dl className="mt-4 space-y-3">
          {passport
            .filter((p) => p.value)
            .map((p) => (
              <div key={p.label} className="flex gap-3">
                <p.icon className="mt-0.5 h-5 w-5 shrink-0 text-brand" />
                <div>
                  <dt className="text-xs font-medium uppercase tracking-wide text-muted">
                    {p.label}
                  </dt>
                  <dd className="text-sm text-ink-soft">{p.value}</dd>
                </div>
              </div>
            ))}
        </dl>
      </section>

      {/* Que faire autour */}
      {nearby.length > 0 && (
        <section className="card p-5">
          <h2 className="flex items-center gap-2 font-semibold text-ink">
            <IconMountain className="h-5 w-5 text-brand" /> Que faire autour
          </h2>
          <p className="text-sm text-muted">
            Transformez la garde en mini-séjour.
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            {nearby.map((n) => (
              <span key={n} className="chip">
                {n}
              </span>
            ))}
          </div>
        </section>
      )}

      {/* Avis */}
      {listing.reviews.length > 0 && (
        <section className="card p-5">
          <h2 className="font-semibold text-ink">Avis</h2>
          <div className="mt-3 space-y-4">
            {listing.reviews.slice(0, 3).map((r) => (
              <div key={r.id} className="flex gap-3">
                <Avatar src={r.author.image} name={r.author.name} size={36} />
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-ink">
                      {r.author.name}
                    </span>
                    <Rating value={r.rating} />
                  </div>
                  {r.comment && (
                    <p className="text-sm text-ink-soft">{r.comment}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Propriétaire */}
      <section className="card flex items-center gap-3 p-5">
        <Avatar src={listing.owner.image} name={listing.owner.name} size={44} />
        <div>
          <p className="text-sm text-muted">Publié par</p>
          <p className="font-medium text-ink">{listing.owner.name}</p>
        </div>
      </section>

      {/* Action Postuler */}
      <section className="card flex flex-wrap items-center justify-between gap-3 p-4">
        <div>
          <p className="font-semibold text-brand">
            {formatCHF(listing.price)}
          </p>
          <p className="text-xs text-muted">
            {nights} nuit{nights > 1 ? "s" : ""} ·{" "}
            {listing._count.applications} candidature
            {listing._count.applications > 1 ? "s" : ""}
          </p>
        </div>
        <ButtonLink
          href={`/decouvrir/escapade/${listing.id}/postuler`}
          className="flex-1 justify-center sm:flex-none"
        >
          Postuler à cette escapade
        </ButtonLink>
      </section>
    </div>
  );
}

function BackLink() {
  return (
    <Link
      href="/decouvrir"
      className="inline-flex items-center gap-1 text-sm text-ink-soft hover:text-brand"
    >
      ← Retour
    </Link>
  );
}
