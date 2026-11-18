import Link from "next/link";
import { cn } from "@/lib/utils";
import type { ComponentProps } from "react";

export type Variant = "primary" | "secondary" | "ghost" | "gold" | "danger";
export type Size = "sm" | "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-sage focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none";

const variants: Record<Variant, string> = {
  primary: "bg-brand text-cream hover:bg-brand-700",
  secondary: "bg-brand/10 text-brand hover:bg-brand/20",
  ghost: "text-ink-soft hover:bg-sand",
  gold: "bg-gold text-ink hover:bg-gold-600",
  danger: "bg-terracotta text-cream hover:opacity-90",
};

const sizes: Record<Size, string> = {
  sm: "text-sm px-3 py-1.5",
  md: "text-sm px-5 py-2.5",
  lg: "text-base px-6 py-3",
};

/** Classes partagées par Button, ButtonLink et SubmitButton. */
export function buttonClasses(
  variant: Variant = "primary",
  size: Size = "md",
  className?: string
) {
  return cn(base, variants[variant], sizes[size], className);
}

interface CommonProps {
  variant?: Variant;
  size?: Size;
  className?: string;
}

export function Button({
  variant = "primary",
  size = "md",
  className,
  ...props
}: CommonProps & ComponentProps<"button">) {
  return (
    <button
      className={cn(base, variants[variant], sizes[size], className)}
      {...props}
    />
  );
}

export function ButtonLink({
  variant = "primary",
  size = "md",
  className,
  ...props
}: CommonProps & ComponentProps<typeof Link>) {
  return (
    <Link
      className={cn(base, variants[variant], sizes[size], className)}
      {...props}
    />
  );
}
