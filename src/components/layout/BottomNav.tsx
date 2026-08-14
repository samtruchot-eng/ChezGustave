"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

const tabs: { href: string; label: string; icon: ReactNode }[] = [
  {
    href: "/decouvrir",
    label: "Découvrir",
    icon: (
      <path d="M11 3a8 8 0 1 0 4.9 14.3l4.4 4.4 1.4-1.4-4.4-4.4A8 8 0 0 0 11 3zm0 2a6 6 0 1 1 0 12 6 6 0 0 1 0-12z" />
    ),
  },
  {
    href: "/messages",
    label: "Messages",
    icon: (
      <path d="M4 4h16a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H8l-4 4V5a1 1 0 0 1 1-1z" />
    ),
  },
  {
    href: "/publier",
    label: "Publier",
    icon: <path d="M12 5v14M5 12h14" strokeWidth="2.2" />,
  },
  {
    href: "/profil",
    label: "Profil",
    icon: (
      <path d="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zm0 2c-4.4 0-8 2.4-8 5.5V21h16v-1.5c0-3.1-3.6-5.5-8-5.5z" />
    ),
  },
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-paper/95 backdrop-blur">
      <div className="mx-auto flex max-w-2xl items-stretch justify-around px-2">
        {tabs.map((tab) => {
          const active =
            pathname === tab.href || pathname.startsWith(tab.href + "/");
          const isPublish = tab.href === "/publier";
          return (
            <Link
              key={tab.href}
              href={tab.href}
              className={cn(
                "flex flex-1 flex-col items-center gap-1 py-2.5 text-[0.68rem] font-medium transition-colors",
                active ? "text-brand" : "text-muted hover:text-ink-soft"
              )}
            >
              <span
                className={cn(
                  "inline-flex h-9 w-9 items-center justify-center rounded-full",
                  isPublish && "bg-brand text-cream",
                  active && !isPublish && "bg-brand/10"
                )}
              >
                <svg
                  viewBox="0 0 24 24"
                  className="h-5 w-5"
                  fill={isPublish ? "none" : "currentColor"}
                  stroke={isPublish ? "currentColor" : "none"}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  {tab.icon}
                </svg>
              </span>
              {tab.label}
            </Link>
          );
        })}
      </div>
      <div className="h-[env(safe-area-inset-bottom)]" />
    </nav>
  );
}
