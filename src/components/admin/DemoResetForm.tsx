"use client";

import { useActionState } from "react";
import { Button } from "@/components/ui/Button";
import { resetDemoData } from "@/app/admin/actions";

/**
 * Formulaire de suppression des données de démo, avec confirmation textuelle.
 */
export function DemoResetForm({ demoCount }: { demoCount: number }) {
  const [message, action, pending] = useActionState(resetDemoData, undefined);

  return (
    <form action={action} className="mt-3 space-y-3">
      <p className="text-sm text-ink-soft">
        {demoCount} compte{demoCount > 1 ? "s" : ""} de démo (
        <code className="text-xs">@example.ch</code>) et toutes leurs données
        seront <strong>définitivement supprimés</strong>. Vos vrais comptes ne
        sont pas touchés.
      </p>
      <input
        name="confirm"
        autoComplete="off"
        placeholder="Tapez SUPPRIMER pour confirmer"
        className="w-full rounded-xl border border-terracotta/40 bg-paper px-3 py-2.5 text-sm outline-none focus:border-terracotta"
      />
      <Button
        type="submit"
        disabled={pending}
        className="w-full bg-terracotta text-cream hover:opacity-90"
      >
        {pending ? "Suppression…" : "Supprimer les données de démo"}
      </Button>
      {message && (
        <p className="rounded-xl bg-sand/60 px-3 py-2 text-sm text-ink-soft">
          {message}
        </p>
      )}
    </form>
  );
}
