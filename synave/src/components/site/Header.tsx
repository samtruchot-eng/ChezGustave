"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/ui/Logo";
import { IconArrowRight, IconClose, IconMenu } from "@/components/ui/icons";
import { navigation, site } from "@/lib/site";
import { cn } from "@/lib/utils";

/**
 * En-tête posé par-dessus le héro sombre de chaque page : transparent en haut,
 * puis fond clair dès que la page défile.
 */
export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Referme le menu à chaque changement de page
  useEffect(() => setOpen(false), [pathname]);

  // Verrouille le défilement de la page quand le menu mobile est ouvert
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Ferme au clavier
  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const solid = scrolled || open;

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-300",
          solid
            ? "border-b border-line"
            : "border-b border-transparent bg-transparent",
          // Menu ouvert : fond plein, pour ne pas laisser transparaître le
          // héro sombre à travers le flou.
          open ? "bg-paper" : solid && "bg-paper/85 backdrop-blur-xl",
        )}
      >
        <Container className="flex h-18 items-center justify-between gap-6">
          <Logo tone={solid ? "dark" : "light"} idPrefix="header" />

          <nav
            className="hidden items-center gap-1 lg:flex"
            aria-label="Navigation principale"
          >
            {navigation.map((item) => {
              const active =
                pathname === item.href || pathname.startsWith(`${item.href}/`);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "rounded-full px-4 py-2 text-[0.95rem] transition-colors",
                    solid
                      ? active
                        ? "bg-signal-100 text-signal-700"
                        : "text-ink-soft hover:bg-mist hover:text-ink"
                      : active
                        ? "bg-white/15 text-white"
                        : "text-white/75 hover:bg-white/10 hover:text-white",
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <a
              href={`tel:${site.contact.phoneHref}`}
              className={cn(
                "hidden text-sm font-medium transition-colors xl:block",
                solid
                  ? "text-ink-soft hover:text-signal-600"
                  : "text-white/70 hover:text-white",
              )}
            >
              {site.contact.phone}
            </a>

            <Link
              href="/contact"
              className={cn(
                "hidden h-10 items-center gap-2 rounded-full px-5 text-sm font-medium transition-all sm:inline-flex",
                solid
                  ? "bg-signal text-white hover:bg-signal-600"
                  : "bg-white text-ink hover:bg-white/90",
              )}
            >
              Parlons de votre projet
              <IconArrowRight className="h-4 w-4" />
            </Link>

            <button
              type="button"
              onClick={() => setOpen((value) => !value)}
              aria-expanded={open}
              aria-controls="menu-mobile"
              aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
              className={cn(
                "inline-flex h-10 w-10 items-center justify-center rounded-full border transition-colors lg:hidden",
                solid
                  ? "border-line text-ink hover:bg-mist"
                  : "border-white/25 text-white hover:bg-white/10",
              )}
            >
              {open ? (
                <IconClose className="h-5 w-5" />
              ) : (
                <IconMenu className="h-5 w-5" />
              )}
            </button>
          </div>
        </Container>
      </header>

      {/* Panneau mobile */}
      <div
        id="menu-mobile"
        hidden={!open}
        className="fixed inset-0 top-18 z-40 overflow-y-auto bg-paper lg:hidden"
      >
        <Container className="py-8">
          <ul className="flex flex-col gap-2">
            {navigation.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="block rounded-2xl border border-line px-5 py-4 transition-colors hover:border-signal-300 hover:bg-mist"
                >
                  <span className="font-display text-lg font-medium text-ink">
                    {item.label}
                  </span>
                  {item.description && (
                    <span className="mt-1 block text-sm text-ink-soft">
                      {item.description}
                    </span>
                  )}
                </Link>
              </li>
            ))}
          </ul>

          <Link
            href="/contact"
            className="mt-6 flex h-13 items-center justify-center gap-2 rounded-full bg-signal px-6 font-medium text-white"
          >
            Parlons de votre projet
            <IconArrowRight className="h-4 w-4" />
          </Link>

          <div className="mt-8 space-y-1 text-sm text-ink-soft">
            <a
              className="block hover:text-signal-600"
              href={`mailto:${site.contact.email}`}
            >
              {site.contact.email}
            </a>
            <a
              className="block hover:text-signal-600"
              href={`tel:${site.contact.phoneHref}`}
            >
              {site.contact.phone}
            </a>
          </div>
        </Container>
      </div>
    </>
  );
}
