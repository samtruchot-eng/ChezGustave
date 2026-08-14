"use client";

import { useActionState } from "react";
import { Button } from "@/components/ui/Button";
import { login } from "@/app/connexion/actions";

const input =
  "w-full rounded-xl border border-line bg-paper px-3 py-2.5 text-sm outline-none focus:border-sage";

export function LoginForm({ callbackUrl }: { callbackUrl: string }) {
  const [error, action, pending] = useActionState(login, undefined);

  return (
    <form action={action} className="space-y-4">
      <input type="hidden" name="callbackUrl" value={callbackUrl} />

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

      <label className="block">
        <span className="mb-1 block text-sm font-medium text-ink-soft">
          Mot de passe
        </span>
        <input
          type="password"
          name="password"
          autoComplete="current-password"
          required
          className={input}
          placeholder="••••••••"
        />
      </label>

      {error && (
        <p className="rounded-xl bg-terracotta/10 px-3 py-2 text-sm text-terracotta">
          {error}
        </p>
      )}

      <Button type="submit" size="lg" disabled={pending} className="w-full">
        {pending ? "Connexion…" : "Se connecter"}
      </Button>
    </form>
  );
}
