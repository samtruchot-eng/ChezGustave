"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";
import type { ProfileMode } from "@/lib/constants";
import { cn } from "@/lib/utils";

/** Bascule Propriétaire ⇄ Gardien : écrit le cookie puis rafraîchit la vue. */
export function ModeToggle({
  mode,
  variant = "pill",
}: {
  mode: ProfileMode;
  variant?: "pill" | "segmented";
}) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  function setMode(next: ProfileMode) {
    document.cookie = `cg_mode=${next}; path=/; max-age=31536000; samesite=lax`;
    startTransition(() => router.refresh());
  }

  if (variant === "segmented") {
    return (
      <div className="inline-flex rounded-full border border-line bg-paper p-1 text-sm">
        {(["owner", "sitter"] as ProfileMode[]).map((m) => (
          <button
            key={m}
            onClick={() => setMode(m)}
            disabled={pending}
            className={cn(
              "rounded-full px-4 py-1.5 font-medium transition-colors",
              mode === m
                ? "bg-forest text-cream"
                : "text-ink-soft hover:bg-sand"
            )}
          >
            {m === "owner" ? "Propriétaire" : "Gardien"}
          </button>
        ))}
      </div>
    );
  }

  // Pastille compacte (barre du haut) : clique pour basculer.
  const next: ProfileMode = mode === "owner" ? "sitter" : "owner";
  return (
    <button
      onClick={() => setMode(next)}
      disabled={pending}
      title={`Passer en mode ${next === "owner" ? "Propriétaire" : "Gardien"}`}
      className="inline-flex items-center gap-1.5 rounded-full border border-line bg-paper px-2.5 py-1.5 text-xs font-medium text-ink-soft hover:bg-sand"
    >
      <span
        className={cn(
          "inline-block h-2 w-2 rounded-full",
          mode === "owner" ? "bg-forest" : "bg-gold"
        )}
      />
      {mode === "owner" ? "Propriétaire" : "Gardien"}
    </button>
  );
}
