"use client";

import { useActionState, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

/**
 * Annulation en deux temps : on annonce d'abord ce qu'elle déclenche
 * (remboursement, somme conservée), puis on demande de confirmer.
 */
export function CancelBookingForm({
  action,
  consequence,
  showTermsLink,
}: {
  action: (prev: string | undefined) => Promise<string | undefined>;
  consequence: string;
  showTermsLink: boolean;
}) {
  const [open, setOpen] = useState(false);
  const [error, formAction, pending] = useActionState(action, undefined);

  if (!open) {
    return (
      <Button type="button" variant="ghost" size="sm" onClick={() => setOpen(true)}>
        Annuler la garde
      </Button>
    );
  }

  return (
    <form
      action={formAction}
      className="w-full space-y-3 rounded-xl border border-terracotta/30 bg-terracotta/5 p-4"
    >
      <p className="text-sm font-medium text-ink">Annuler cette garde ?</p>
      <p className="text-sm text-ink-soft">{consequence}</p>
      {showTermsLink && (
        <p className="text-xs text-muted">
          Règle détaillée dans les{" "}
          <Link href="/conditions" className="underline hover:text-brand">
            conditions générales
          </Link>
          .
        </p>
      )}

      {error && (
        <p role="alert" className="rounded-xl bg-terracotta/10 px-3 py-2 text-sm text-terracotta">
          {error}
        </p>
      )}

      <div className="flex flex-wrap gap-2">
        <Button type="submit" variant="danger" size="sm" disabled={pending}>
          {pending ? "Annulation…" : "Confirmer l'annulation"}
        </Button>
        <Button
          type="button"
          variant="secondary"
          size="sm"
          disabled={pending}
          onClick={() => setOpen(false)}
        >
          Garder la garde
        </Button>
      </div>
    </form>
  );
}
