import Link from "next/link";
import { redirect } from "next/navigation";
import { Logo } from "@/components/ui/Logo";
import { ForgotPasswordForm } from "@/components/auth/ForgotPasswordForm";
import { getCurrentUser } from "@/lib/session";

export const metadata = { title: "Mot de passe oublié" };

export default async function MotDePasseOubliePage() {
  const user = await getCurrentUser();
  if (user) redirect("/profil/securite");

  return (
    <div className="bg-leaf-pattern flex min-h-dvh flex-col items-center justify-center px-4 py-10">
      <Link href="/" className="mb-6">
        <Logo />
      </Link>

      <div className="card w-full max-w-sm p-6">
        <h1 className="text-xl font-bold text-ink">Mot de passe oublié</h1>
        <p className="mb-5 text-sm text-muted">
          Indiquez l&apos;e-mail de votre compte : nous vous envoyons un lien
          pour choisir un nouveau mot de passe.
        </p>

        <ForgotPasswordForm />

        <p className="mt-5 text-center text-sm text-muted">
          <Link href="/connexion" className="font-medium text-brand hover:underline">
            ← Retour à la connexion
          </Link>
        </p>
      </div>
    </div>
  );
}
