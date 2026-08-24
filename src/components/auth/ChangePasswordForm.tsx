"use client";

import { useActionState } from "react";
import { Button } from "@/components/ui/Button";
import { changePassword } from "@/app/(app)/profil/securite/actions";

const input =
  "w-full rounded-xl border border-line bg-paper px-3 py-2.5 text-sm outline-none focus:border-sage";

export function ChangePasswordForm() {
  const [state, action, pending] = useActionState(changePassword, undefined);

  return (
    <form action={action} className="space-y-4" key={state?.ok ? "reset" : "form"}>
      <Field label="Mot de passe actuel" name="current" />
      <Field label="Nouveau mot de passe" name="password" hint="6 caractères minimum" />
      <Field label="Confirmer le nouveau mot de passe" name="confirm" />

      {state && (
        <p
          className={`rounded-xl px-3 py-2 text-sm ${
            state.ok
              ? "bg-sage-100 text-pine"
              : "bg-terracotta/10 text-terracotta"
          }`}
        >
          {state.message}
        </p>
      )}

      <Button type="submit" disabled={pending} className="w-full">
        {pending ? "Mise à jour…" : "Changer mon mot de passe"}
      </Button>
    </form>
  );
}

function Field({
  label,
  name,
  hint,
}: {
  label: string;
  name: string;
  hint?: string;
}) {
  return (
    <label className="block">
      <span className="mb-1 block text-sm font-medium text-ink-soft">
        {label}
      </span>
      <input type="password" name={name} required autoComplete="off" className={input} />
      {hint && <span className="mt-1 block text-xs text-muted">{hint}</span>}
    </label>
  );
}
