"use client";

import { useFormStatus } from "react-dom";
import type { ComponentProps } from "react";
import { buttonClasses, type Variant, type Size } from "./Button";

/**
 * Bouton de soumission avec retour visuel immédiat : dès le clic, il passe en
 * état « occupé » (spinner + désactivé) grâce à useFormStatus — l'utilisateur
 * voit tout de suite que l'action est prise en compte.
 */
export function SubmitButton({
  variant = "primary",
  size = "md",
  className,
  children,
  ...props
}: {
  variant?: Variant;
  size?: Size;
  className?: string;
} & ComponentProps<"button">) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      aria-busy={pending}
      className={buttonClasses(variant, size, className)}
      {...props}
    >
      {pending && <Spinner />}
      {children}
    </button>
  );
}

function Spinner() {
  return (
    <svg
      className="h-4 w-4 animate-spin"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <circle
        cx="12"
        cy="12"
        r="9"
        stroke="currentColor"
        strokeWidth="3"
        strokeOpacity="0.25"
      />
      <path
        d="M21 12a9 9 0 0 0-9-9"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
}
