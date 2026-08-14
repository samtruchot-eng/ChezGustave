import Link from "next/link";
import { Logo } from "@/components/ui/Logo";
import { ModeToggle } from "./ModeToggle";
import type { ProfileMode } from "@/lib/constants";

export function TopBar({
  mode,
  notificationCount = 0,
}: {
  mode: ProfileMode;
  notificationCount?: number;
}) {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-cream/85 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-2xl items-center justify-between px-4">
        <Link href="/decouvrir" aria-label="Accueil Chez Gustave">
          <Logo />
        </Link>

        <div className="flex items-center gap-2">
          <Link
            href="/notifications"
            aria-label="Notifications"
            className="relative inline-flex h-9 w-9 items-center justify-center rounded-full border border-line bg-paper text-ink-soft hover:bg-sand"
          >
            <BellIcon />
            {notificationCount > 0 && (
              <span className="absolute -right-0.5 -top-0.5 inline-flex h-4 min-w-4 items-center justify-center rounded-full bg-terracotta px-1 text-[0.6rem] font-semibold text-cream">
                {notificationCount > 9 ? "9+" : notificationCount}
              </span>
            )}
          </Link>
          <ModeToggle mode={mode} />
        </div>
      </div>
    </header>
  );
}

function BellIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-5 w-5"
      aria-hidden="true"
    >
      <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
      <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
    </svg>
  );
}
