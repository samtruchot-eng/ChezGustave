"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

export type RevealVariant =
  | "up"
  | "down"
  | "left"
  | "right"
  | "scale"
  | "zoom"
  | "tilt"
  | "fade";

const INITIAL: Record<RevealVariant, string> = {
  up: "translateY(30px)",
  down: "translateY(-30px)",
  left: "translateX(-40px)",
  right: "translateX(40px)",
  scale: "scale(0.88)",
  zoom: "scale(1.08)",
  tilt: "translateY(22px) rotate(-3deg)",
  fade: "translateY(0)",
};

/**
 * Révèle son contenu quand il entre dans le champ de vision, avec plusieurs
 * variantes de mouvement. Respecte « prefers-reduced-motion ».
 */
export function Reveal({
  children,
  className,
  delay = 0,
  duration = 800,
  variant = "up",
  as: Tag = "div",
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  variant?: RevealVariant;
  as?: "div" | "section" | "li" | "span";
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reduce) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const Comp = Tag as "div";

  return (
    <Comp
      ref={ref}
      style={{
        transitionProperty: "transform, opacity, filter",
        transitionDuration: `${duration}ms`,
        transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
        transitionDelay: visible ? `${delay}ms` : "0ms",
        transform: visible ? "none" : INITIAL[variant],
        opacity: visible ? 1 : 0,
        filter: visible ? "blur(0)" : "blur(3px)",
      }}
      className={cn("motion-reduce:!transform-none will-change-transform", className)}
    >
      {children}
    </Comp>
  );
}
