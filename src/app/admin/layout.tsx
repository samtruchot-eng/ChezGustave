import Link from "next/link";
import { requireAdmin } from "@/lib/admin";
import { GustaveMark } from "@/components/ui/Logo";

export const metadata = { title: "Admin" };

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const admin = await requireAdmin();

  const nav = [
    { href: "/admin", label: "Tableau de bord" },
    { href: "/admin/utilisateurs", label: "Utilisateurs" },
    { href: "/admin/candidatures", label: "Candidatures" },
    { href: "/admin/escapades", label: "Escapades" },
    { href: "/admin/reservations", label: "Réservations" },
  ];

  return (
    <div className="min-h-dvh bg-cream">
      <header className="border-b border-line bg-ink text-cream">
        <div className="mx-auto max-w-5xl px-4 py-3">
          <div className="flex items-center justify-between">
            <Link href="/admin" className="flex items-center gap-2">
              <GustaveMark className="h-8 w-8" />
              <span className="font-semibold">
                Chez Gustave <span className="text-gold">· Admin</span>
              </span>
            </Link>
            <div className="flex items-center gap-3 text-sm">
              <span className="hidden text-cream/70 sm:inline">
                {admin.email}
              </span>
              <Link
                href="/decouvrir"
                className="rounded-full bg-cream/15 px-3 py-1.5 hover:bg-cream/25"
              >
                ← Retour à l&apos;app
              </Link>
            </div>
          </div>
          <nav className="mt-3 flex gap-1 overflow-x-auto">
            {nav.map((n) => (
              <Link
                key={n.href}
                href={n.href}
                className="whitespace-nowrap rounded-full px-3 py-1.5 text-sm text-cream/85 hover:bg-cream/15"
              >
                {n.label}
              </Link>
            ))}
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-4 py-6">{children}</main>
    </div>
  );
}
