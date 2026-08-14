import Link from "next/link";
import { Logo, GustaveMark } from "@/components/ui/Logo";
import { ButtonLink } from "@/components/ui/Button";
import { EnterAppButton } from "@/components/home/EnterAppButton";

export default function HomePage() {
  return (
    <div className="bg-leaf-pattern min-h-dvh">
      {/* En-tête */}
      <header className="mx-auto flex max-w-5xl items-center justify-between px-5 py-5">
        <Logo />
        <Link
          href="/connexion"
          className="text-sm font-medium text-brand hover:underline"
        >
          Se connecter
        </Link>
      </header>

      {/* Hero */}
      <section className="mx-auto max-w-5xl px-5 pt-6 pb-12 md:pt-14">
        <div className="grid items-center gap-10 md:grid-cols-2">
          <div className="animate-fade-in-up">
            <p className="mb-3 inline-flex items-center gap-2 rounded-full bg-brand/10 px-3 py-1 text-sm font-medium text-brand">
              🌿 Genève et sa région · lancement cet été
            </p>
            <h1 className="text-4xl font-bold leading-tight tracking-tight text-ink md:text-5xl">
              Gardez un chien,
              <br />
              <span className="text-brand">partez au vert.</span>
            </h1>
            <p className="mt-5 max-w-md text-lg text-ink-soft">
              La garde de chien à domicile qui change tout : votre compagnon
              reste chez lui, et un gardien passionné vient s&apos;en occuper.
              Une vraie escapade à la campagne — payée et logée.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <EnterAppButton mode="owner">
                🐶 Je fais garder mon chien
              </EnterAppButton>
              <EnterAppButton mode="sitter" variant="gold">
                🌿 Je deviens gardien
              </EnterAppButton>
            </div>

            <p className="mt-4 text-sm text-muted">
              Déjà inscrit ?{" "}
              <Link href="/connexion" className="text-brand hover:underline">
                Se connecter
              </Link>
            </p>
          </div>

          {/* Carte-histoire de Gustave */}
          <div className="card animate-fade-in-up p-6 md:p-8">
            <div className="flex items-center gap-4">
              <GustaveMark className="h-16 w-16" />
              <div>
                <p className="text-sm text-muted">Voici</p>
                <p className="text-xl font-semibold text-brand">Gustave</p>
              </div>
            </div>
            <p className="mt-5 text-ink-soft">
              « Quand je pars en vacances, le confier à une pension me brise un
              peu le cœur — il est tellement mieux chez lui, dans ses repères.
              C&apos;est de là qu&apos;est née une idée : Chez Gustave. »
            </p>
            <div className="mt-6 grid grid-cols-3 gap-3 text-center">
              {[
                { emoji: "🏡", label: "Chez lui" },
                { emoji: "🛡️", label: "Assuré" },
                { emoji: "📔", label: "Carnet de garde" },
              ].map((f) => (
                <div
                  key={f.label}
                  className="rounded-2xl bg-cream px-2 py-4"
                >
                  <div className="text-2xl">{f.emoji}</div>
                  <div className="mt-1 text-xs font-medium text-ink-soft">
                    {f.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Comment ça marche */}
      <section className="mx-auto max-w-5xl px-5 py-12">
        <h2 className="text-center text-2xl font-bold text-ink">
          Comment ça marche
        </h2>
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {[
            {
              n: "1",
              title: "Publiez ou découvrez",
              body: "Le propriétaire publie une escapade ; le gardien parcourt les gardes disponibles près de chez lui.",
            },
            {
              n: "2",
              title: "Faites connaissance",
              body: "Échangez par message, proposez un appel vidéo, et validez ensemble les dates.",
            },
            {
              n: "3",
              title: "Une garde sereine",
              body: "Paiement sécurisé, garde assurée, et un carnet de garde avec photos chaque jour.",
            },
          ].map((s) => (
            <div key={s.n} className="card p-6">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-brand text-cream font-semibold">
                {s.n}
              </div>
              <h3 className="mt-4 font-semibold text-ink">{s.title}</h3>
              <p className="mt-2 text-sm text-ink-soft">{s.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Bandeau gardien */}
      <section className="mx-auto max-w-5xl px-5 pb-16">
        <div className="card overflow-hidden bg-brand p-8 text-cream md:p-10">
          <div className="max-w-xl">
            <h2 className="text-2xl font-bold md:text-3xl">
              Et si vos prochaines vacances, c&apos;était à la campagne —
              payées ?
            </h2>
            <p className="mt-3 text-cream/85">
              Vous séjournez chez le propriétaire, vous veillez sur son chien…
              et vous êtes payé <em>et</em> logé. Une vraie escapade, pas une
              corvée.
            </p>
            <div className="mt-6">
              <ButtonLink href="/decouvrir" variant="gold">
                Découvrir les escapades
              </ButtonLink>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-line py-8 text-center text-sm text-muted">
        <p>
          Chez Gustave · Plateforme de garde de chien à domicile · Genève et sa
          région
        </p>
        <p className="mt-1">
          Prototype — les paiements et l&apos;assurance sont en cours de mise en
          place.
        </p>
      </footer>
    </div>
  );
}
