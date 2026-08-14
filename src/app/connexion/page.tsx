import Link from "next/link";
import { redirect } from "next/navigation";
import { Logo } from "@/components/ui/Logo";
import { LoginForm } from "@/components/auth/LoginForm";
import { getCurrentUser } from "@/lib/session";

export const metadata = { title: "Connexion" };

export default async function ConnexionPage({
  searchParams,
}: {
  searchParams: Promise<{ callbackUrl?: string }>;
}) {
  const user = await getCurrentUser();
  if (user) redirect("/decouvrir");

  const { callbackUrl } = await searchParams;

  return (
    <div className="bg-leaf-pattern flex min-h-dvh flex-col items-center justify-center px-4 py-10">
      <Link href="/" className="mb-6">
        <Logo />
      </Link>

      <div className="card w-full max-w-sm p-6">
        <h1 className="text-xl font-bold text-ink">Bon retour ! 🐾</h1>
        <p className="mb-5 text-sm text-muted">
          Connectez-vous pour retrouver vos gardes et messages.
        </p>

        <LoginForm callbackUrl={callbackUrl || "/decouvrir"} />

        <p className="mt-5 text-center text-sm text-muted">
          Pas encore de compte ?{" "}
          <Link href="/inscription" className="font-medium text-brand hover:underline">
            Créer un compte
          </Link>
        </p>
      </div>

      <p className="mt-4 max-w-sm rounded-xl bg-sand/60 px-4 py-3 text-center text-xs text-ink-soft">
        💡 Comptes de démo : <strong>pierre@example.ch</strong> ou{" "}
        <strong>lea@example.ch</strong> — mot de passe{" "}
        <strong>gustave123</strong>
      </p>
    </div>
  );
}
