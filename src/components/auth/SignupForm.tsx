"use client";

import { useActionState, useState } from "react";
import { Button } from "@/components/ui/Button";
import { register } from "@/app/inscription/actions";
import { cn } from "@/lib/utils";
import type { ProfileMode } from "@/lib/constants";

const input =
  "w-full rounded-xl border border-line bg-paper px-3 py-2.5 text-sm outline-none focus:border-sage";

export function SignupForm({ defaultRole }: { defaultRole: ProfileMode }) {
  const [error, action, pending] = useActionState(register, undefined);
  const [role, setRole] = useState<ProfileMode>(defaultRole);

  return (
    <form action={action} className="space-y-4">
      {/* Choix du rôle */}
      <div>
        <span className="mb-1 block text-sm font-medium text-ink-soft">
          Je m&apos;inscris comme…
        </span>
        <input type="hidden" name="role" value={role} />
        <div className="grid grid-cols-2 gap-2">
          {(
            [
              { value: "owner", label: "🐶 Propriétaire", hint: "Je fais garder mon chien" },
              { value: "sitter", label: "🌿 Gardien", hint: "Je garde des chiens" },
            ] as const
          ).map((opt) => (
            <button
              type="button"
              key={opt.value}
              onClick={() => setRole(opt.value)}
              className={cn(
                "rounded-2xl border p-3 text-left transition-colors",
                role === opt.value
                  ? "border-brand bg-brand/10"
                  : "border-line hover:bg-sand"
              )}
            >
              <span className="block text-sm font-semibold text-ink">
                {opt.label}
              </span>
              <span className="block text-xs text-muted">{opt.hint}</span>
            </button>
          ))}
        </div>
      </div>

      <label className="block">
        <span className="mb-1 block text-sm font-medium text-ink-soft">Nom</span>
        <input
          name="name"
          autoComplete="name"
          required
          className={input}
          placeholder="Prénom Nom"
        />
      </label>

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
          autoComplete="new-password"
          required
          minLength={6}
          className={input}
          placeholder="Au moins 6 caractères"
        />
      </label>

      {error && (
        <p className="rounded-xl bg-terracotta/10 px-3 py-2 text-sm text-terracotta">
          {error}
        </p>
      )}

      <Button type="submit" size="lg" disabled={pending} className="w-full">
        {pending ? "Création…" : "Créer mon compte"}
      </Button>
    </form>
  );
}
