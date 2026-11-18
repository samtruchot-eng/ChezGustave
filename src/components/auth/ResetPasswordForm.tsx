"use client";

import { useActionState } from "react";
import { Button } from "@/components/ui/Button";
import { resetPassword } from "@/app/reinitialiser-mot-de-passe/actions";

const input =
  "w-full rounded-xl border border-line bg-paper px-3 py-2.5 text-sm outline-none focus:border-sage";

export function ResetPasswordForm({ token }: { token: string }) {
  const [error, action, pending] = useActionState(resetPassword, undefined);

  return (
    <form action={action} className="space-y-4">
      <input type="hidden" name="token" value={token} />

      <label className="block">
        <span className="mb-1 block text-sm font-medium text-ink-soft">
          Nouveau mot de passe
        </span>
        <input
          type="password"
          name="password"
          autoComplete="new-password"
          required
          minLength={6}
          className={input}
          placeholder="Au moins 6 caractères"
        />
      </label>

      <label className="block">
        <span className="mb-1 block text-sm font-medium text-ink-soft">
          Confirmer le mot de passe
        </span>
        <input
          type="password"
          name="confirm"
          autoComplete="new-password"
          required
          minLength={6}
          className={input}
        />
      </label>

      {error && (
        <p role="alert" className="rounded-xl bg-terracotta/10 px-3 py-2 text-sm text-terracotta">
          {error}
        </p>
      )}

      <Button type="submit" size="lg" disabled={pending} className="w-full">
        {pending ? "Enregistrement…" : "Enregistrer le mot de passe"}
      </Button>
    </form>
  );
}
