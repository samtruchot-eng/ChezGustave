import Link from "next/link";
import { requireUser } from "@/lib/session";
import { ChangePasswordForm } from "@/components/auth/ChangePasswordForm";

export const metadata = { title: "Sécurité" };

export default async function SecuritePage() {
  const me = await requireUser();

  return (
    <div className="space-y-5">
      <Link
        href="/profil"
        className="inline-flex items-center gap-1 text-sm text-ink-soft hover:text-brand"
      >
        ← Profil
      </Link>

      <div>
        <h1 className="text-2xl font-bold text-ink">Sécurité</h1>
        <p className="mt-1 text-sm text-muted">{me.email}</p>
      </div>

      <section className="card p-5">
        <h2 className="font-semibold text-ink">Changer mon mot de passe</h2>
        <p className="mt-1 mb-4 text-sm text-muted">
          Choisissez un mot de passe que vous n&apos;utilisez pas ailleurs.
        </p>
        <ChangePasswordForm />
      </section>
    </div>
  );
}
