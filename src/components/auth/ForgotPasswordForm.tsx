"use client";

import { useActionState } from "react";
import { Button } from "@/components/ui/Button";
import { requestPasswordReset } from "@/app/mot-de-passe-oublie/actions";

const input =
  "w-full rounded-xl border border-line bg-paper px-3 py-2.5 text-sm outline-none focus:border-sage";

export function ForgotPasswordForm() {
  const [state, action, pending] = useActionState(requestPasswordReset, undefined);

  if (state?.ok) {
    return (
      <p role="status" className="rounded-xl bg-sage-100 px-3 py-2 text-sm text-pine">
        {state.message}
      </p>
    );
  }

  return (
    <form action={action} className="space-y-4">
      <label className="block">
        <span className="mb-1 block text-sm font-medium text-ink-soft">
          E-mail
        </span>
        <input
          type="email"
          name="email"
          autoComplete="email"
          required
          className={input}
          placeholder="vous@exemple.ch"
        />
      </label>

      {state && (
        <p role="alert" className="rounded-xl bg-terracotta/10 px-3 py-2 text-sm text-terracotta">
          {state.message}
        </p>
      )}

      <Button type="submit" size="lg" disabled={pending} className="w-full">
        {pending ? "Envoi…" : "Recevoir le lien"}
      </Button>
    </form>
  );
}
