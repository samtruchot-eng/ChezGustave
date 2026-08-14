"use client";

import { useActionState } from "react";
import { Button } from "@/components/ui/Button";
import {
  upsertSitterProfile,
  type ActionResult,
} from "@/app/(app)/publier/actions";
import {
  LAUNCH_REGIONS,
  AMBIANCES,
  AMBIANCE_LABELS,
  ANIMALS,
  ANIMAL_LABELS,
} from "@/lib/constants";

const initial: ActionResult = { ok: true };

interface Defaults {
  firstName?: string;
  region?: string;
  headline?: string;
  bio?: string;
  dailyRate?: number;
  animals?: string[];
  ambiances?: string[];
}

export function SitterProfileForm({ defaults }: { defaults?: Defaults }) {
  const [state, action, pending] = useActionState(
    upsertSitterProfile,
    initial
  );

  return (
    <form action={action} className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <Field label="Prénom">
          <input
            name="firstName"
            defaultValue={defaults?.firstName}
            required
            className={input}
          />
        </Field>
        <Field label="Zone d'action">
          <select
            name="region"
            defaultValue={defaults?.region}
            className={input}
          >
            {LAUNCH_REGIONS.map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <Field label="Accroche" hint="Une phrase qui vous résume">
        <input
          name="headline"
          defaultValue={defaults?.headline}
          className={input}
        />
      </Field>

      <Field label="Présentation">
        <textarea
          name="bio"
          rows={4}
          defaultValue={defaults?.bio}
          className={input}
        />
      </Field>

      <Field label="Tarif indicatif (CHF / jour)">
        <input
          type="number"
          name="dailyRate"
          min={0}
          defaultValue={defaults?.dailyRate ?? 45}
          className={input}
        />
      </Field>

      <fieldset>
        <legend className="mb-1 text-sm font-medium text-ink-soft">
          Animaux acceptés
        </legend>
        <div className="flex flex-wrap gap-3">
          {ANIMALS.map((a) => (
            <label key={a} className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                name="animals"
                value={a}
                defaultChecked={
                  defaults?.animals?.includes(a) ?? a === "chiens"
                }
              />
              {ANIMAL_LABELS[a]}
            </label>
          ))}
        </div>
      </fieldset>

      <fieldset>
        <legend className="mb-1 text-sm font-medium text-ink-soft">
          Ambiances préférées
        </legend>
        <div className="flex flex-wrap gap-3">
          {AMBIANCES.map((a) => (
            <label key={a} className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                name="ambiances"
                value={a}
                defaultChecked={defaults?.ambiances?.includes(a)}
              />
              {AMBIANCE_LABELS[a]}
            </label>
          ))}
        </div>
      </fieldset>

      {state.error && (
        <p className="rounded-xl bg-terracotta/10 px-3 py-2 text-sm text-terracotta">
          {state.error}
        </p>
      )}

      <Button type="submit" size="lg" disabled={pending} className="w-full">
        {pending ? "Enregistrement…" : "Enregistrer mon profil de gardien"}
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
