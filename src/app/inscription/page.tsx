import Link from "next/link";
import { redirect } from "next/navigation";
import { Logo } from "@/components/ui/Logo";
import { SignupForm } from "@/components/auth/SignupForm";
import { getCurrentUser } from "@/lib/session";
import type { ProfileMode } from "@/lib/constants";

export const metadata = { title: "Inscription" };

export default async function InscriptionPage({
  searchParams,
}: {
  searchParams: Promise<{ role?: string }>;
}) {
  const user = await getCurrentUser();
  if (user) redirect("/decouvrir");

  const { role } = await searchParams;
  const defaultRole: ProfileMode = role === "sitter" ? "sitter" : "owner";

  return (
    <div className="bg-leaf-pattern flex min-h-dvh flex-col items-center justify-center px-4 py-10">
      <Link href="/" className="mb-6">
        <Logo />
      </Link>

      <div className="card w-full max-w-sm p-6">
        <h1 className="text-xl font-bold text-ink">Rejoindre Chez Gustave</h1>
        <p className="mb-5 text-sm text-muted">
          Quelques secondes pour créer votre compte.
        </p>

        <SignupForm defaultRole={defaultRole} />

        <p className="mt-5 text-center text-sm text-muted">
          Déjà un compte ?{" "}
          <Link href="/connexion" className="font-medium text-brand hover:underline">
            Se connecter
          </Link>
        </p>
      </div>

      <p className="mt-4 max-w-sm text-center text-xs text-muted">
        En créant un compte, vous acceptez les conditions de Chez Gustave.
      </p>
    </div>
  );
}
