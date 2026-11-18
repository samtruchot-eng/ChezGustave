import type { Metadata } from "next";
import Link from "next/link";
import { Logo } from "@/components/ui/Logo";
import { ResetPasswordForm } from "@/components/auth/ResetPasswordForm";
import { findValidResetToken } from "@/lib/password-reset";

// Le jeton est dans l'adresse : la page ne doit ni être indexée ni transmettre
// son adresse à un autre site.
export const metadata: Metadata = {
  title: "Nouveau mot de passe",
  referrer: "no-referrer",
  robots: { index: false, follow: false },
};

export default async function ReinitialiserMotDePassePage({
  searchParams,
}: {
  searchParams: Promise<{ token?: string }>;
}) {
  const { token = "" } = await searchParams;
  const valid = !!(await findValidResetToken(token));

  return (
    <div className="bg-leaf-pattern flex min-h-dvh flex-col items-center justify-center px-4 py-10">
      <Link href="/" className="mb-6">
        <Logo />
      </Link>

      <div className="card w-full max-w-sm p-6">
        {valid ? (
          <>
            <h1 className="text-xl font-bold text-ink">Nouveau mot de passe</h1>
            <p className="mb-5 text-sm text-muted">
              Choisissez un mot de passe que vous n&apos;utilisez pas ailleurs.
            </p>
            <ResetPasswordForm token={token} />
          </>
        ) : (
          <>
            <h1 className="text-xl font-bold text-ink">Lien expiré</h1>
            <p className="mb-5 text-sm text-muted">
              Ce lien n&apos;est plus valable : il a déjà servi, ou il date de
              plus d&apos;une heure.
            </p>
            <Link
              href="/mot-de-passe-oublie"
              className="font-medium text-brand hover:underline"
            >
              Demander un nouveau lien
            </Link>
          </>
        )}
      </div>
    </div>
  );
}
