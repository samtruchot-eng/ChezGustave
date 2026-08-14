"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import type { ProfileMode } from "@/lib/constants";
import type { ReactNode } from "react";

/** Choisit le mode (cookie) puis entre dans l'application sur Découvrir. */
export function EnterAppButton({
  mode,
  variant = "primary",
  children,
}: {
  mode: ProfileMode;
  variant?: "primary" | "gold";
  children: ReactNode;
}) {
  const router = useRouter();

  function enter() {
    document.cookie = `cg_mode=${mode}; path=/; max-age=31536000; samesite=lax`;
    router.push("/decouvrir");
  }

  return (
    <Button onClick={enter} variant={variant} size="lg">
      {children}
    </Button>
  );
}
