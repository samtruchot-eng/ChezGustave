import { prisma } from "@/lib/prisma";
import { formatCHF } from "@/lib/utils";
import { PLATFORM_COMMISSION_PERCENT } from "@/lib/constants";

export const metadata = { title: "Finances · Admin" };

// Objectif business plan : ~5 600 CHF de commission ≈ 5 000 CHF net / mois.
const MONTHLY_COMMISSION_GOAL = 5600;
// Seuil de rentabilité indicatif : ~31 gardes / mois.
const BREAKEVEN_BOOKINGS = 31;

const MONTHS = [
  "janv.",
  "févr.",
  "mars",
  "avr.",
  "mai",
  "juin",
  "juil.",
  "août",
  "sept.",
  "oct.",
  "nov.",
  "déc.",
];

export default async function AdminFinancesPage() {
  // Réservations comptabilisées (hors annulées / non payées).
  const bookings = await prisma.booking.findMany({
    where: { status: { in: ["confirmed", "in_progress", "completed"] } },
    select: {
      amount: true,
      commissionAmount: true,
      payoutAmount: true,
      startDate: true,
    },
  });

  const now = new Date();
  const startOfYear = new Date(now.getFullYear(), 0, 1);
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const startOfWeek = new Date(now);
  startOfWeek.setDate(now.getDate() - ((now.getDay() + 6) % 7));
  startOfWeek.setHours(0, 0, 0, 0);

  const sum = (list: typeof bookings) =>
    list.reduce(
      (acc, b) => {
        acc.volume += b.amount;
        acc.commission += b.commissionAmount;
        acc.payout += b.payoutAmount;
        acc.count += 1;
        return acc;
      },
      { volume: 0, commission: 0, payout: 0, count: 0 }
    );

  const total = sum(bookings);
  const week = sum(bookings.filter((b) => b.startDate >= startOfWeek));
  const month = sum(bookings.filter((b) => b.startDate >= startOfMonth));
  const year = sum(bookings.filter((b) => b.startDate >= startOfYear));
  const avgBasket = total.count ? Math.round(total.volume / total.count) : 0;

  // 6 derniers mois
  const monthly: { label: string; commission: number; count: number }[] = [];
  for (let k = 5; k >= 0; k--) {
    const s = new Date(now.getFullYear(), now.getMonth() - k, 1);
    const e = new Date(now.getFullYear(), now.getMonth() - k + 1, 1);
    const inMonth = bookings.filter((b) => b.startDate >= s && b.startDate < e);
    const agg = sum(inMonth);
    monthly.push({
      label: MONTHS[s.getMonth()],
      commission: agg.commission,
      count: agg.count,
    });
  }
  const maxCommission = Math.max(1, ...monthly.map((m) => m.commission));

  const goalPct = Math.min(
    100,
    Math.round((month.commission / MONTHLY_COMMISSION_GOAL) * 100)
  );
  const breakevenPct = Math.min(
    100,
    Math.round((month.count / BREAKEVEN_BOOKINGS) * 100)
  );

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-ink">Finances</h1>
        <p className="text-sm text-muted">
          Commission de {PLATFORM_COMMISSION_PERCENT}% ·{" "}
          {total.count} garde{total.count > 1 ? "s" : ""} comptabilisée
          {total.count > 1 ? "s" : ""}.
        </p>
      </div>

      {/* Chiffres clés */}
      <section className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <Metric label="Volume total" value={formatCHF(total.volume)} accent />
        <Metric
          label="Commission encaissée"
          value={formatCHF(total.commission)}
          accent
        />
        <Metric label="Reversé aux gardiens" value={formatCHF(total.payout)} />
        <Metric label="Panier moyen" value={formatCHF(avgBasket)} />
      </section>

      {/* Par période */}
      <section className="card overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-line text-left text-xs uppercase tracking-wide text-muted">
              <th className="p-3">Période</th>
              <th className="p-3 text-right">Gardes</th>
              <th className="p-3 text-right">Volume</th>
              <th className="p-3 text-right">Commission</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            <PeriodRow label="Cette semaine" data={week} />
            <PeriodRow label="Ce mois" data={month} highlight />
            <PeriodRow label="Cette année" data={year} />
          </tbody>
        </table>
      </section>

      {/* Graphique 6 mois */}
      <section className="card p-5">
        <h2 className="font-semibold text-ink">
          Commission — 6 derniers mois
        </h2>
        <div className="mt-5 flex items-end justify-between gap-2 sm:gap-4">
          {monthly.map((m, i) => {
            const h = Math.round((m.commission / maxCommission) * 100);
            return (
              <div key={i} className="flex flex-1 flex-col items-center gap-2">
                <span className="text-xs font-medium text-ink-soft">
                  {m.commission > 0 ? formatCHF(m.commission) : "—"}
                </span>
                <div className="flex h-40 w-full items-end">
                  <div
                    className="w-full rounded-t-lg bg-brand/80 transition-all"
                    style={{ height: `${Math.max(2, h)}%` }}
                    title={`${m.count} garde(s)`}
                  />
                </div>
                <span className="text-xs text-muted">{m.label}</span>
              </div>
            );
          })}
        </div>
      </section>

      {/* Objectifs */}
      <section className="grid gap-4 sm:grid-cols-2">
        <Goal
          title="Objectif : 5 000 CHF net / mois"
          hint={`${formatCHF(month.commission)} / ${formatCHF(
            MONTHLY_COMMISSION_GOAL
          )} de commission ce mois`}
          pct={goalPct}
        />
        <Goal
          title="Seuil de rentabilité"
          hint={`${month.count} / ${BREAKEVEN_BOOKINGS} gardes ce mois`}
          pct={breakevenPct}
        />
      </section>

      <p className="text-xs text-muted">
        Chiffres calculés sur les réservations confirmées, en cours et
        terminées. Les hypothèses (objectif, seuil) proviennent de votre
        business plan et sont indicatives.
      </p>
    </div>
  );
}

function Metric({
  label,
  value,
  accent,
}: {
  label: string;
  value: string;
  accent?: boolean;
}) {
  return (
    <div className="card p-4">
      <p className="text-xs text-muted">{label}</p>
      <p
        className={`mt-1 text-xl font-bold ${accent ? "text-brand" : "text-ink"}`}
      >
        {value}
      </p>
    </div>
  );
}

function PeriodRow({
  label,
  data,
  highlight,
}: {
  label: string;
  data: { volume: number; commission: number; count: number };
  highlight?: boolean;
}) {
  return (
    <tr className={highlight ? "bg-cream/60" : ""}>
      <td className="p-3 font-medium text-ink">{label}</td>
      <td className="p-3 text-right text-ink-soft">{data.count}</td>
      <td className="p-3 text-right text-ink-soft">
        {formatCHF(data.volume)}
      </td>
      <td className="p-3 text-right font-semibold text-brand">
        {formatCHF(data.commission)}
      </td>
    </tr>
  );
}

function Goal({
  title,
  hint,
  pct,
}: {
  title: string;
  hint: string;
  pct: number;
}) {
  return (
    <div className="card p-5">
      <div className="flex items-baseline justify-between">
        <h3 className="font-semibold text-ink">{title}</h3>
        <span className="text-sm font-semibold text-brand">{pct}%</span>
      </div>
      <div className="mt-3 h-2.5 w-full overflow-hidden rounded-full bg-sand">
        <div
          className="h-full rounded-full bg-brand"
          style={{ width: `${pct}%` }}
        />
      </div>
      <p className="mt-2 text-xs text-muted">{hint}</p>
    </div>
  );
}
