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
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M15.6 8.4l-2 5.2-5.2 2 2-5.2z" />
      </>
    ),
  },
  {
    href: "/messages",
    label: "Messages",
    icon: (
      <path d="M21 11.5a8.4 8.4 0 0 1-9 8.4 8.7 8.7 0 0 1-3.8-.9L3 20.5l1.5-4.2A8.4 8.4 0 0 1 12 3.1a8.4 8.4 0 0 1 9 8.4z" />
    ),
  },
  {
    href: "/publier",
    label: "Publier",
    icon: <path d="M12 6v12M6 12h12" strokeWidth="2.2" />,
  },
  {
    href: "/carnet",
    label: "Carnet",
    icon: (
      <>
        <path d="M5 4h12a2 2 0 0 1 2 2v14l-3-2-3 2-3-2-3 2V6a2 2 0 0 1 2-2z" />
        <path d="M9 8h6M9 12h4" />
      </>
    ),
  },
  {
    href: "/profil",
    label: "Profil",
    icon: (
      <>
        <circle cx="12" cy="8" r="4" />
        <path d="M5.5 20a6.5 6.5 0 0 1 13 0" />
      </>
    ),
  },
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 flex justify-center pb-[max(0.6rem,env(safe-area-inset-bottom))]">
      <div className="mx-3 flex w-full max-w-md items-end justify-between rounded-[1.6rem] border border-line bg-paper/95 px-2 py-1.5 shadow-[0_10px_30px_-12px_rgba(46,38,32,0.35)] backdrop-blur">
        {tabs.map((tab) => {
          const active =
            pathname === tab.href || pathname.startsWith(tab.href + "/");
          const isPublish = tab.href === "/publier";

          if (isPublish) {
            return (
              <Link
                key={tab.href}
                href={tab.href}
                aria-label="Publier"
                className="group flex flex-1 flex-col items-center gap-1"
              >
                <span className="-mt-6 inline-flex h-14 w-14 items-center justify-center rounded-full bg-brand text-cream shadow-[0_8px_18px_-6px_rgba(192,86,42,0.7)] ring-4 ring-paper transition-transform group-hover:scale-105 group-active:scale-95">
                  <Icon>{tab.icon}</Icon>
                </span>
                <span className="text-[0.62rem] font-medium text-brand">
                  {tab.label}
                </span>
              </Link>
            );
          }

          return (
            <Link
              key={tab.href}
              href={tab.href}
              className="flex flex-1 flex-col items-center gap-1 py-1.5"
            >
              <span
                className={cn(
                  "inline-flex h-9 w-9 items-center justify-center rounded-2xl transition-colors",
                  active ? "bg-brand/10 text-brand" : "text-muted"
                )}
              >
                <Icon>{tab.icon}</Icon>
              </span>
              <span
                className={cn(
                  "text-[0.62rem] font-medium transition-colors",
                  active ? "text-brand" : "text-muted"
                )}
              >
                {tab.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

function Icon({ children }: { children: ReactNode }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-[1.35rem] w-[1.35rem]"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}
