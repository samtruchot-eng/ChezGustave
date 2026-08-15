"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  CAPITAL_ACCOUNT_FEE,
  cantons,
  extraOptions,
  getLegalForm,
  legalForms,
  type LegalFormId,
} from "@/lib/company";
import { IconArrowRight, IconCheck, IconClock } from "@/components/ui/icons";
import { cn, formatCHF } from "@/lib/utils";

/** Arrondi à la cinquantaine la plus proche, pour ne pas afficher de faux précis. */
function roundTo50(value: number): number {
  return Math.round(value / 50) * 50;
}

export function Simulateur() {
  const [formId, setFormId] = useState<LegalFormId>("sarl");
  const [cantonId, setCantonId] = useState(cantons[0].id);
  const [capital, setCapital] = useState(20000);
  const [founders, setFounders] = useState(1);
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  const form = getLegalForm(formId);
  const canton = cantons.find((c) => c.id === cantonId) ?? cantons[0];

  /** Change de forme juridique et réaligne le capital sur le minimum légal. */
  function selectForm(id: LegalFormId) {
    setFormId(id);
    setCapital(getLegalForm(id).capitalMin);
  }

  function toggleOption(id: string) {
    setSelectedOptions((current) =>
      current.includes(id)
        ? current.filter((value) => value !== id)
        : [...current, id],
    );
  }

  const result = useMemo(() => {
    const needsCapital = form.capitalMin > 0;
    const effectiveCapital = Math.max(capital, form.capitalMin);

    // Part du capital à verser sur le compte de consignation
    let capitalToPay = 0;
    if (formId === "sarl") {
      capitalToPay = effectiveCapital;
    } else if (formId === "sa") {
      capitalToPay = Math.max(50000, Math.round(effectiveCapital * 0.2));
    }

    // Frais officiels (notaire + registre du commerce + banque)
    const notaryLow = form.notaryRange
      ? roundTo50(form.notaryRange[0] * canton.notaryFactor)
      : 0;
    const notaryHigh = form.notaryRange
      ? roundTo50(form.notaryRange[1] * canton.notaryFactor)
      : 0;
    const bankFee = needsCapital ? CAPITAL_ACCOUNT_FEE : 0;
    const officialLow = notaryLow + form.rcFee + bankFee;
    const officialHigh = notaryHigh + form.rcFee + bankFee;

    // Honoraires Synave
    const extraFounders = Math.max(0, founders - 2) * 250;
    const options = extraOptions.filter((option) =>
      selectedOptions.includes(option.id),
    );
    const optionsTotal = options.reduce((sum, option) => sum + option.price, 0);
    const synaveTotal = form.synaveFee + extraFounders + optionsTotal;

    // Délai
    const addedWeeks = options.reduce(
      (max, option) => Math.max(max, option.addedWeeks),
      0,
    );
    const delayLow = form.delayWeeks[0] + addedWeeks;
    const delayHigh = form.delayWeeks[1] + addedWeeks;

    return {
      needsCapital,
      capitalToPay,
      notaryLow,
      notaryHigh,
      officialLow,
      officialHigh,
      bankFee,
      synaveTotal,
      optionsTotal,
      options,
      totalLow: officialLow + synaveTotal,
      totalHigh: officialHigh + synaveTotal,
      delayLow,
      delayHigh,
    };
  }, [form, formId, canton, capital, founders, selectedOptions]);

  return (
    <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
      {/* ------------------------------------------------------------ */}
      {/* Paramètres                                                    */}
      {/* ------------------------------------------------------------ */}
      <div className="card p-7 sm:p-8">
        {/* Forme juridique */}
        <fieldset>
          <legend className="font-mono text-xs uppercase tracking-[0.16em] text-muted">
            1 · Forme juridique
          </legend>
          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            {legalForms.map((option) => {
              const active = option.id === formId;
              return (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => selectForm(option.id)}
                  aria-pressed={active}
                  className={cn(
                    "rounded-2xl border p-4 text-left transition-all",
                    active
                      ? "border-signal bg-signal-100/60 shadow-[0_0_0_3px_rgba(59,108,255,0.12)]"
                      : "border-line bg-paper hover:border-signal-300",
                  )}
                >
                  <span className="block font-display font-semibold text-ink">
                    {option.shortName}
                  </span>
                  <span className="mt-1 block text-xs text-muted">
                    {option.capitalMin > 0
                      ? `Capital dès ${formatCHF(option.capitalMin)}`
                      : "Sans capital minimum"}
                  </span>
                </button>
              );
            })}
          </div>
        </fieldset>

        {/* Canton */}
        <div className="mt-8">
          <label
            htmlFor="canton"
            className="font-mono text-xs uppercase tracking-[0.16em] text-muted"
          >
            2 · Canton de domiciliation
          </label>
          <select
            id="canton"
            value={cantonId}
            onChange={(event) => setCantonId(event.target.value)}
            className="mt-4 h-12 w-full rounded-xl border border-line bg-paper px-4 text-ink transition-colors hover:border-signal-300 focus:border-signal"
          >
            {cantons.map((option) => (
              <option key={option.id} value={option.id}>
                {option.name}
              </option>
            ))}
          </select>
        </div>

        {/* Capital */}
        {result.needsCapital && (
          <div className="mt-8">
            <div className="flex items-baseline justify-between gap-4">
              <label
                htmlFor="capital"
                className="font-mono text-xs uppercase tracking-[0.16em] text-muted"
              >
                3 · Capital social
              </label>
              <span className="font-display text-lg font-semibold text-ink">
                {formatCHF(capital)}
              </span>
            </div>

            <input
              id="capital"
              type="range"
              min={form.capitalMin}
              max={form.capitalMin * 5}
              step={formId === "sa" ? 10000 : 1000}
              value={Math.max(capital, form.capitalMin)}
              onChange={(event) => setCapital(Number(event.target.value))}
              className="mt-4 w-full accent-[var(--color-signal)]"
            />

            <div className="mt-2 flex justify-between text-xs text-muted">
              <span>Minimum légal : {formatCHF(form.capitalMin)}</span>
              <span>{formatCHF(form.capitalMin * 5)}</span>
            </div>

            <p className="mt-4 rounded-xl bg-mist px-4 py-3 text-sm leading-relaxed text-ink-soft">
              À verser sur le compte de consignation :{" "}
              <strong className="font-semibold text-ink">
                {formatCHF(result.capitalToPay)}
              </strong>
              . {form.capitalLibere}. Ce montant n&apos;est pas un frais : il
              est débloqué après l&apos;inscription au registre du commerce.
            </p>
          </div>
        )}

        {/* Fondateurs */}
        <div className="mt-8">
          <label
            htmlFor="founders"
            className="font-mono text-xs uppercase tracking-[0.16em] text-muted"
          >
            {result.needsCapital ? "4" : "3"} · Nombre de fondateurs
          </label>
          <div className="mt-4 flex flex-wrap gap-2">
            {[1, 2, 3, 4, 5].map((count) => (
              <button
                key={count}
                type="button"
                id={count === 1 ? "founders" : undefined}
                onClick={() => setFounders(count)}
                aria-pressed={founders === count}
                className={cn(
                  "h-11 w-11 rounded-xl border font-medium transition-all",
                  founders === count
                    ? "border-signal bg-signal text-white"
                    : "border-line bg-paper text-ink-soft hover:border-signal-300",
                )}
              >
                {count === 5 ? "5+" : count}
              </button>
            ))}
          </div>
        </div>

        {/* Options */}
        <fieldset className="mt-8">
          <legend className="font-mono text-xs uppercase tracking-[0.16em] text-muted">
            {result.needsCapital ? "5" : "4"} · Prestations complémentaires
          </legend>
          <div className="mt-4 space-y-2.5">
            {extraOptions.map((option) => {
              const checked = selectedOptions.includes(option.id);
              return (
                <label
                  key={option.id}
                  className={cn(
                    "flex cursor-pointer items-start gap-3.5 rounded-2xl border p-4 transition-all",
                    checked
                      ? "border-signal bg-signal-100/50"
                      : "border-line bg-paper hover:border-signal-300",
                  )}
                >
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={() => toggleOption(option.id)}
                    className="sr-only"
                  />
                  <span
                    aria-hidden="true"
                    className={cn(
                      "mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border transition-colors",
                      checked
                        ? "border-signal bg-signal text-white"
                        : "border-line bg-paper",
                    )}
                  >
                    {checked && <IconCheck className="h-3 w-3" />}
                  </span>
                  <span className="flex-1">
                    <span className="flex flex-wrap items-baseline justify-between gap-x-3">
                      <span className="font-medium text-ink">
                        {option.label}
                      </span>
                      <span className="font-mono text-sm text-signal-600">
                        + {formatCHF(option.price)}
                      </span>
                    </span>
                    <span className="mt-1 block text-sm leading-relaxed text-ink-soft">
                      {option.description}
                    </span>
                  </span>
                </label>
              );
            })}
          </div>
        </fieldset>
      </div>

      {/* ------------------------------------------------------------ */}
      {/* Résultat                                                      */}
      {/* ------------------------------------------------------------ */}
      <div className="lg:sticky lg:top-24">
        <div className="overflow-hidden rounded-3xl border border-night-600 bg-night text-white">
          <div className="border-b border-white/10 px-7 py-6">
            <p className="font-mono text-xs uppercase tracking-[0.16em] text-mint">
              Votre estimation
            </p>
            <p className="mt-2 font-display text-xl font-semibold">
              {form.shortName} · {canton.name}
            </p>
          </div>

          <div className="space-y-6 px-7 py-7">
            {/* Capital */}
            {result.needsCapital && (
              <div>
                <p className="text-sm text-white/50">
                  Capital à verser à la constitution
                </p>
                <p className="mt-1 font-display text-2xl font-semibold">
                  {formatCHF(result.capitalToPay)}
                </p>
                <p className="mt-1 text-xs text-white/40">
                  Débloqué après l&apos;inscription — ce n&apos;est pas une
                  dépense.
                </p>
              </div>
            )}

            {/* Frais officiels */}
            <div className="border-t border-white/10 pt-6">
              <p className="text-sm text-white/50">Frais officiels estimés</p>
              <p className="mt-1 font-display text-2xl font-semibold">
                {result.officialLow === result.officialHigh
                  ? formatCHF(result.officialLow)
                  : `${formatCHF(result.officialLow)} – ${formatCHF(result.officialHigh)}`}
              </p>
              <ul className="mt-3 space-y-1.5 text-sm text-white/50">
                {form.notaryRange && (
                  <li className="flex justify-between gap-4">
                    <span>Notaire ({canton.name})</span>
                    <span className="font-mono text-white/70">
                      {formatCHF(result.notaryLow)} –{" "}
                      {formatCHF(result.notaryHigh)}
                    </span>
                  </li>
                )}
                <li className="flex justify-between gap-4">
                  <span>Registre du commerce</span>
                  <span className="font-mono text-white/70">
                    {formatCHF(form.rcFee)}
                  </span>
                </li>
                {result.bankFee > 0 && (
                  <li className="flex justify-between gap-4">
                    <span>Compte de consignation</span>
                    <span className="font-mono text-white/70">
                      {formatCHF(result.bankFee)}
                    </span>
                  </li>
                )}
              </ul>
            </div>

            {/* Honoraires */}
            <div className="border-t border-white/10 pt-6">
              <p className="text-sm text-white/50">Accompagnement Synave</p>
              <p className="mt-1 font-display text-2xl font-semibold">
                {formatCHF(result.synaveTotal)}
              </p>
              <ul className="mt-3 space-y-1.5 text-sm text-white/50">
                <li className="flex justify-between gap-4">
                  <span>Constitution {form.shortName}</span>
                  <span className="font-mono text-white/70">
                    {formatCHF(form.synaveFee)}
                  </span>
                </li>
                {founders > 2 && (
                  <li className="flex justify-between gap-4">
                    <span>{founders === 5 ? "5+" : founders} fondateurs</span>
                    <span className="font-mono text-white/70">
                      {formatCHF(Math.max(0, founders - 2) * 250)}
                    </span>
                  </li>
                )}
                {result.options.map((option) => (
                  <li key={option.id} className="flex justify-between gap-4">
                    <span>{option.label}</span>
                    <span className="font-mono text-white/70">
                      {formatCHF(option.price)}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Total */}
            <div className="rounded-2xl bg-white/5 p-5">
              <p className="text-sm text-white/60">Budget total hors capital</p>
              <p className="text-gradient mt-1.5 font-display text-3xl font-semibold">
                {result.totalLow === result.totalHigh
                  ? formatCHF(result.totalLow)
                  : `${formatCHF(result.totalLow)} – ${formatCHF(result.totalHigh)}`}
              </p>
              <p className="mt-4 flex items-center gap-2 text-sm text-white/55">
                <IconClock className="h-4 w-4 text-mint" />
                Délai estimé : {result.delayLow} à {result.delayHigh} semaines
              </p>
            </div>

            <Link
              href="/contact"
              className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-signal font-medium text-white transition-colors hover:bg-signal-600"
            >
              Recevoir un devis ferme
              <IconArrowRight className="h-4 w-4" />
            </Link>

            <p className="text-xs leading-relaxed text-white/40">
              Estimation indicative, calculée à partir de fourchettes observées.
              Les émoluments du registre du commerce et les honoraires notariaux
              varient selon le canton, le notaire et la complexité du dossier.
              Cette page ne constitue ni un conseil juridique ni un conseil
              fiscal ; le devis ferme est établi après un entretien.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
