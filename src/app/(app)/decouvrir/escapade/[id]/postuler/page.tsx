import { notFound } from "next/navigation";
import Link from "next/link";
import { getListingById } from "@/lib/queries";
import { requireUser } from "@/lib/session";
import { Button } from "@/components/ui/Button";
import { InsuranceBadge } from "@/components/ui/Badge";
import { formatCHF, formatDateRange, nightsBetween } from "@/lib/utils";
import { computeBreakdown } from "@/lib/money";
import { applyToListing } from "./actions";

export const metadata = { title: "Postuler" };

export default async function PostulerPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await requireUser();
  const { id } = await params;
  const listing = await getListingById(id);
  if (!listing) notFound();

  const nights = nightsBetween(listing.startDate, listing.endDate);
  const breakdown = computeBreakdown(listing.price);
  const apply = applyToListing.bind(null, listing.id);

  return (
    <div className="space-y-5">
      <Link
        href={`/decouvrir/escapade/${listing.id}`}
        className="inline-flex items-center gap-1 text-sm text-ink-soft hover:text-brand"
      >
        ← Retour à l&apos;escapade
      </Link>

      <h1 className="text-2xl font-bold text-ink">Postuler</h1>

      {/* Récapitulatif */}
      <section className="card p-5">
        <h2 className="font-semibold text-ink">{listing.title}</h2>
        <p className="mt-1 text-sm text-muted">
          📍 {listing.region} · {listing.dog.name}
        </p>
        <div className="mt-3 space-y-1 text-sm">
          <Row label="Dates">
            {formatDateRange(listing.startDate, listing.endDate)}
          </Row>
          <Row label="Durée">
            {nights} nuit{nights > 1 ? "s" : ""}
          </Row>
          <Row label="Rémunération totale">
            {formatCHF(breakdown.total)}
          </Row>
          <Row label={`Commission Chez Gustave (${breakdown.commissionPercent}%)`}>
            − {formatCHF(breakdown.commissionAmount)}
          </Row>
          <div className="mt-1 border-t border-line pt-2">
            <Row label="Vous recevez">
              <span className="font-semibold text-brand">
                {formatCHF(breakdown.payoutAmount)}
              </span>
            </Row>
          </div>
        </div>
      </section>

      <InsuranceBadge />

      {/* Formulaire */}
      <form action={apply} className="card space-y-3 p-5">
        <label className="block">
          <span className="mb-1 block text-sm font-medium text-ink-soft">
            Un mot à l&apos;hôte
          </span>
          <textarea
            name="message"
            rows={4}
            placeholder={`Bonjour, je serais ravi·e de m'occuper de ${listing.dog.name}…`}
            className="w-full rounded-xl border border-line bg-paper px-3 py-2.5 text-sm outline-none focus:border-sage"
          />
        </label>
        <Button type="submit" size="lg" className="w-full">
          Envoyer ma candidature
        </Button>
        <p className="text-center text-xs text-muted">
          En postulant, vous acceptez les conditions de garde de Chez Gustave.
        </p>
      </form>
    </div>
  );
}

function Row({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-muted">{label}</span>
      <span className="text-ink-soft">{children}</span>
    </div>
  );
}
