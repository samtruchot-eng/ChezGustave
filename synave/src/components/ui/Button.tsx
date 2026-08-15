import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost" | "onDark" | "swiss";
type Size = "sm" | "md" | "lg";

const variants: Record<Variant, string> = {
  primary:
    "bg-signal text-white shadow-[0_10px_30px_-12px_rgba(59,108,255,0.75)] hover:bg-signal-600 active:bg-signal-700",
  secondary:
    "bg-paper text-ink border border-line hover:border-signal-300 hover:text-signal-600",
  ghost: "text-ink-soft hover:text-signal-600 hover:bg-signal-100/60",
  onDark:
    "bg-white/10 text-white border border-white/20 backdrop-blur hover:bg-white/18",
  swiss:
    "bg-swiss text-white shadow-[0_10px_30px_-12px_rgba(225,56,43,0.7)] hover:bg-swiss-600",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-4 text-sm gap-1.5",
  md: "h-11 px-5 text-[0.95rem] gap-2",
  lg: "h-13 px-7 text-base gap-2.5",
};

const base =
  "inline-flex items-center justify-center rounded-full font-medium transition-all duration-200 disabled:opacity-55 disabled:pointer-events-none";

type CommonProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
};

export function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  ...props
}: CommonProps & ComponentProps<"button">) {
  return (
    <button
      className={cn(base, variants[variant], sizes[size], className)}
      {...props}
    >
      {children}
    </button>
  );
}

export function ButtonLink({
  variant = "primary",
  size = "md",
  className,
  children,
  ...props
}: CommonProps & ComponentProps<typeof Link>) {
  return (
    <Link
      className={cn(base, variants[variant], sizes[size], className)}
      {...props}
    >
      {children}
    </Link>
  );
}
