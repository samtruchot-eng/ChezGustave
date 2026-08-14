"use client";

import { useActionState } from "react";
import { Button } from "@/components/ui/Button";
import { createListing, type ActionResult } from "@/app/(app)/publier/actions";
import { LAUNCH_REGIONS, AMBIANCES, AMBIANCE_LABELS } from "@/lib/constants";

const initial: ActionResult = { ok: true };

export function OwnerPublishForm({ defaultRegion }: { defaultRegion?: string }) {
  const [state, action, pending] = useActionState(createListing, initial);

  return (
    <form action={action} className="space-y-4">
      <Field label="Titre de l'escapade" hint="Ex. « Garde de Gustave à Hermance »">
        <input name="title" required className={input} />
      </Field>

      <div className="grid grid-cols-2 gap-3">
        <Field label="Nom du chien">
          <input name="dogName" required className={input} />
        </Field>
        <Field label="Race">
          <input name="dogBreed" className={input} />
        </Field>
      </div>

      <Field label="Région">
        <select name="region" defaultValue={defaultRegion} className={input}>
          {LAUNCH_REGIONS.map((r) => (
            <option key={r} value={r}>
              {r}
            </option>
          ))}
        </select>
      </Field>

      <div className="grid grid-cols-2 gap-3">
        <Field label="Du">
          <input type="date" name="startDate" required className={input} />
        </Field>
        <Field label="Au">
          <input type="date" name="endDate" required className={input} />
        </Field>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <Field label="Type de garde">
          <select name="careType" className={input}>
            <option value="onsite">Sur place (jour et nuit)</option>
            <option value="visits">Visites à domicile</option>
          </select>
        </Field>
        <Field label="Ambiance">
          <select name="ambiance" className={input}>
            {AMBIANCES.map((a) => (
              <option key={a} value={a}>
                {AMBIANCE_LABELS[a]}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <Field label="Rémunération proposée (CHF)" hint="Montant total pour la garde">
        <input
          type="number"
          name="price"
          min={0}
          defaultValue={300}
          required
          className={input}
        />
      </Field>

      <Field label="Description">
        <textarea name="description" rows={4} className={input} />
      </Field>

      <label className="flex items-center gap-2 text-sm text-ink-soft">
        <input type="checkbox" name="lastMinute" value="true" />
        C&apos;est une garde de dernière minute ⏱️
      </label>

      {state.error && (
        <p className="rounded-xl bg-terracotta/10 px-3 py-2 text-sm text-terracotta">
          {state.error}
        </p>
      )}

      <Button type="submit" size="lg" disabled={pending} className="w-full">
        {pending ? "Publication…" : "Publier l'escapade"}
      </Button>
    </form>
  );
}

const input =
  "w-full rounded-xl border border-line bg-paper px-3 py-2.5 text-sm outline-none focus:border-sage";

function Field({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1 block text-sm font-medium text-ink-soft">
        {label}
      </span>
      {children}
      {hint && <span className="mt-1 block text-xs text-muted">{hint}</span>}
    </label>
  );
}
