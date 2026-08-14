import { notFound } from "next/navigation";
import Link from "next/link";
import { getSitterByUserId } from "@/lib/queries";
import { Avatar } from "@/components/ui/Avatar";
import { Rating } from "@/components/ui/Rating";
import { Badge, SuperSitterBadge } from "@/components/ui/Badge";
import { ButtonLink } from "@/components/ui/Button";
import { formatCHF, formatDateRange, jsonList } from "@/lib/utils";
import {
  AMBIANCE_EMOJI,
  AMBIANCE_LABELS,
  ANIMAL_EMOJI,
  ANIMAL_LABELS,
  type Ambiance,
  type Animal,
} from "@/lib/constants";

export default async function GardienPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const sitter = await getSitterByUserId(id);
  if (!sitter) notFound();

  const animals = jsonList(sitter.animalsAccepted) as Animal[];
  const ambiances = jsonList(sitter.ambiances) as Ambiance[];
  const reviews = sitter.user.reviewsReceived;

  return (
    <div className="space-y-5 pb-4">
      <Link
        href="/decouvrir"
        className="inline-flex items-center gap-1 text-sm text-ink-soft hover:text-forest"
      >
        ← Retour
      </Link>

      {/* En-tête profil */}
      <section className="card p-6 text-center">
        <div className="mx-auto w-fit">
          <Avatar
            src={sitter.user.image}
            name={sitter.firstName}
            size={88}
          />
        </div>
        <h1 className="mt-3 text-2xl font-bold text-ink">{sitter.firstName}</h1>
        <p className="text-muted">📍 {sitter.region}</p>
        <div className="mt-2 flex items-center justify-center gap-2">
          <Rating value={sitter.ratingAvg} count={sitter.ratingCount} />
          {sitter.verified && <Badge tone="sage">✓ Vérifié</Badge>}
          {sitter.isSuperSitter && <SuperSitterBadge />}
        </div>
        {sitter.headline && (
          <p className="mt-3 text-ink-soft">{sitter.headline}</p>
        )}
        <p className="mt-3 text-lg font-semibold text-forest">
          {formatCHF(sitter.dailyRate)}
          <span className="text-sm font-normal text-muted"> /jour</span>
        </p>
      </section>

      {/* Présentation */}
      {sitter.bio && (
        <section className="card p-5">
          <h2 className="font-semibold text-ink">À propos</h2>
          <p className="mt-2 text-ink-soft">{sitter.bio}</p>
        </section>
      )}

      {/* Animaux & ambiances */}
      <section className="card p-5">
        <h2 className="font-semibold text-ink">Ce que propose {sitter.firstName}</h2>
        <div className="mt-3 space-y-3 text-sm">
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-muted">
              Animaux acceptés
            </p>
            <div className="mt-1 flex flex-wrap gap-2">
              {animals.map((a) => (
                <span key={a} className="chip">
                  {ANIMAL_EMOJI[a]} {ANIMAL_LABELS[a]}
                </span>
              ))}
            </div>
          </div>
          {ambiances.length > 0 && (
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-muted">
                Ambiances préférées
              </p>
              <div className="mt-1 flex flex-wrap gap-2">
                {ambiances.map((a) => (
                  <span key={a} className="chip">
                    {AMBIANCE_EMOJI[a]} {AMBIANCE_LABELS[a]}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Disponibilités */}
      {sitter.availabilities.length > 0 && (
        <section className="card p-5">
          <h2 className="font-semibold text-ink">Disponibilités</h2>
          <div className="mt-2 flex flex-wrap gap-2">
            {sitter.availabilities.map((a) => (
              <span key={a.id} className="chip">
                🗓️ {formatDateRange(a.startDate, a.endDate)}
              </span>
            ))}
          </div>
        </section>
      )}

      {/* Avis */}
      {reviews.length > 0 && (
        <section className="card p-5">
          <h2 className="font-semibold text-ink">
            Avis ({sitter.ratingCount})
          </h2>
          <div className="mt-3 space-y-4">
            {reviews.slice(0, 4).map((r) => (
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

      {/* Barre d'action Contact */}
      <div className="fixed inset-x-0 bottom-16 z-30 border-t border-line bg-paper/95 backdrop-blur">
        <div className="mx-auto flex max-w-2xl items-center justify-end gap-2 px-4 py-3">
          <ButtonLink
            href={`/messages/nouveau?to=${sitter.user.id}`}
            variant="secondary"
          >
            📹 Appel vidéo
          </ButtonLink>
          <ButtonLink href={`/messages/nouveau?to=${sitter.user.id}`}>
            Contacter {sitter.firstName}
          </ButtonLink>
        </div>
      </div>
    </div>
  );
}
