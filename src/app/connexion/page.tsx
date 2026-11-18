import Link from "next/link";
import { redirect } from "next/navigation";
import { Logo } from "@/components/ui/Logo";
import { LoginForm } from "@/components/auth/LoginForm";
import { IconBulb } from "@/components/ui/icons";
import { getCurrentUser } from "@/lib/session";

export const metadata = { title: "Connexion" };

export default async function ConnexionPage({
  searchParams,
}: {
  searchParams: Promise<{ callbackUrl?: string; reinitialise?: string }>;
}) {
  const user = await getCurrentUser();
  if (user) redirect("/decouvrir");

  const { callbackUrl, reinitialise } = await searchParams;

  return (
    <div className="bg-leaf-pattern flex min-h-dvh flex-col items-center justify-center px-4 py-10">
      <Link href="/" className="mb-6">
        <Logo />
      </Link>

      <div className="card w-full max-w-sm p-6">
        <h1 className="text-xl font-bold text-ink">Bon retour !</h1>
        <p className="mb-5 text-sm text-muted">
          Connectez-vous pour retrouver vos gardes et messages.
        </p>

        {reinitialise && (
          <p role="status" className="mb-4 rounded-xl bg-sage-100 px-3 py-2 text-sm text-pine">
            Mot de passe enregistré. Vous pouvez vous connecter.
          </p>
        )}

        <LoginForm callbackUrl={callbackUrl || "/decouvrir"} />

        <p className="mt-3 text-center text-sm">
          <Link href="/mot-de-passe-oublie" className="text-ink-soft hover:text-brand hover:underline">
            Mot de passe oublié ?
          </Link>
        </p>

        <p className="mt-5 text-center text-sm text-muted">
          Pas encore de compte ?{" "}
          <Link href="/inscription" className="font-medium text-brand hover:underline">
            Créer un compte
          </Link>
        </p>
      </div>

      <p className="mt-4 flex max-w-sm items-start gap-2 rounded-xl bg-sand/60 px-4 py-3 text-xs text-ink-soft">
        <IconBulb className="mt-0.5 h-4 w-4 shrink-0 text-gold-600" />
        <span>
          Comptes de démo : <strong>pierre@example.ch</strong> ou{" "}
          <strong>lea@example.ch</strong> — mot de passe{" "}
          <strong>gustave123</strong>
        </span>
      </p>
    </div>
  );
}
