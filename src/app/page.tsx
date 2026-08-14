import Link from "next/link";
import { Logo, GustaveMark } from "@/components/ui/Logo";
import { ButtonLink } from "@/components/ui/Button";
import { EnterAppButton } from "@/components/home/EnterAppButton";

export default function HomePage() {
  return (
    <div className="relative overflow-hidden bg-cream">
      {/* Halos décoratifs */}
      <div
        aria-hidden
        className="pointer-events-none absolute -left-32 -top-24 h-80 w-80 rounded-full bg-brand/10 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute right-[-6rem] top-40 h-72 w-72 rounded-full bg-sage/20 blur-3xl"
      />

      {/* En-tête */}
      <header className="relative z-10">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
          <Logo showTagline={false} />
          <div className="flex items-center gap-2">
            <Link
              href="/connexion"
              className="rounded-full px-4 py-2 text-sm font-medium text-ink-soft hover:bg-sand"
            >
              Se connecter
            </Link>
            <ButtonLink href="/inscription" size="sm">
              S&apos;inscrire
            </ButtonLink>
          </div>
        </div>
      </header>

      {/* HERO */}
      <section className="relative z-10 mx-auto max-w-6xl px-5 pb-10 pt-6 md:pt-12">
        <div className="grid items-center gap-12 md:grid-cols-2">
          <div className="animate-fade-in-up">
            <span className="inline-flex items-center gap-2 rounded-full border border-line bg-paper px-3 py-1 text-sm font-medium text-brand shadow-sm">
              🌿 Genève et sa région · lancement cet été
            </span>
            <h1 className="mt-5 font-serif text-5xl font-semibold leading-[1.05] tracking-tight text-ink md:text-6xl">
              Gardez un chien,
              <br />
              <span className="text-brand">partez au vert.</span>
            </h1>
            <p className="mt-6 max-w-md text-lg leading-relaxed text-ink-soft">
              La garde de chien à domicile qui change tout : votre compagnon
              reste chez lui, un gardien passionné vient s&apos;en occuper. Et
              pour le gardien, une vraie escapade à la campagne — payée et logée.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <EnterAppButton mode="owner">
                🐶 Je fais garder mon chien
              </EnterAppButton>
              <EnterAppButton mode="sitter" variant="gold">
                🌿 Je deviens gardien
              </EnterAppButton>
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-muted">
              <span className="inline-flex items-center gap-1.5">
                <Dot /> Garde assurée
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Dot /> Gardiens vérifiés
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Dot /> Carnet de garde quotidien
              </span>
            </div>
          </div>

          {/* Visuel hero : panneau dégradé + cartes flottantes */}
          <div className="relative animate-fade-in-up">
            <div className="relative aspect-square overflow-hidden rounded-[2rem] bg-gradient-to-br from-brand via-brand-600 to-brand-700 p-8 shadow-[0_30px_60px_-25px_rgba(141,61,28,0.6)]">
              {/* motif */}
              <div
                aria-hidden
                className="absolute inset-0 opacity-20"
                style={{
                  backgroundImage:
                    "radial-gradient(circle at 1px 1px, rgba(255,255,255,.6) 1px, transparent 0)",
                  backgroundSize: "20px 20px",
                }}
              />
              <div className="relative flex h-full flex-col items-center justify-center">
                <div className="rounded-full bg-cream/15 p-6 ring-1 ring-cream/20">
                  <GustaveMark className="h-28 w-28" />
                </div>
                <p className="mt-5 font-serif text-2xl font-semibold text-cream">
                  Chez Gustave
                </p>
                <p className="text-sm text-cream/80">
                  Le teckel qui a tout déclenché
                </p>
              </div>
            </div>

            {/* Carte flottante : carnet */}
            <div className="absolute -bottom-5 -left-5 w-52 rotate-[-4deg] rounded-2xl border border-line bg-paper p-3 shadow-xl">
              <div className="flex items-center gap-2">
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-sage-100 text-lg">
                  📸
                </span>
                <div>
                  <p className="text-xs font-semibold text-ink">
                    Nouvelle photo
                  </p>
                  <p className="text-[0.7rem] text-muted">
                    Gustave a adoré sa balade !
                  </p>
                </div>
              </div>
            </div>

            {/* Chip flottante : super gardien */}
            <div className="absolute -right-3 top-6 rotate-[5deg] rounded-full border border-line bg-paper px-3 py-1.5 text-sm font-semibold text-gold-600 shadow-lg">
              ⭐ Super Gardien
            </div>
          </div>
        </div>
      </section>

      {/* BANDE DE CONFIANCE */}
      <section className="relative z-10 border-y border-line bg-paper/60">
        <div className="mx-auto grid max-w-5xl grid-cols-2 gap-6 px-5 py-8 sm:grid-cols-4">
          {[
            { icon: "🏡", label: "À domicile", sub: "Chez lui, dans ses repères" },
            { icon: "🛡️", label: "Assuré", sub: "Chaque garde couverte" },
            { icon: "📔", label: "Carnet de garde", sub: "Photos & nouvelles" },
            { icon: "✓", label: "Vérifié", sub: "Profils de confiance" },
          ].map((t) => (
            <div key={t.label} className="text-center">
              <div className="text-2xl">{t.icon}</div>
              <p className="mt-1 font-semibold text-ink">{t.label}</p>
              <p className="text-xs text-muted">{t.sub}</p>
            </div>
          ))}
        </div>
      </section>

      {/* POUR QUI */}
      <section className="relative z-10 mx-auto max-w-6xl px-5 py-16">
        <Eyebrow>Deux façons de vivre l&apos;aventure</Eyebrow>
        <h2 className="mt-2 max-w-2xl font-serif text-3xl font-semibold text-ink md:text-4xl">
          Que vous ayez un chien ou l&apos;envie d&apos;en garder un
        </h2>

        <div className="mt-8 grid gap-5 md:grid-cols-2">
          {/* Propriétaire */}
          <div className="rounded-3xl border border-line bg-gradient-to-br from-paper to-sand/40 p-7">
            <span className="text-3xl">🐶</span>
            <h3 className="mt-3 font-serif text-2xl font-semibold text-ink">
              Vous avez un chien
            </h3>
            <p className="mt-2 text-ink-soft">
              Partez l&apos;esprit tranquille : votre compagnon reste à la
              maison, choyé par un gardien passionné. Vous suivez ses journées en
              photos.
            </p>
            <ul className="mt-4 space-y-2 text-sm text-ink-soft">
              <Check2>Pas de stress de transport ni de pension</Check2>
              <Check2>Un gardien qui vit chez vous, jour et nuit</Check2>
              <Check2>Des nouvelles quotidiennes, un prix contenu</Check2>
            </ul>
            <div className="mt-6">
              <EnterAppButton mode="owner">Trouver un gardien</EnterAppButton>
            </div>
          </div>

          {/* Gardien */}
          <div className="rounded-3xl border border-sage/40 bg-gradient-to-br from-sage-100 to-paper p-7">
            <span className="text-3xl">🌿</span>
            <h3 className="mt-3 font-serif text-2xl font-semibold text-ink">
              Vous aimez les chiens
            </h3>
            <p className="mt-2 text-ink-soft">
              Offrez-vous une parenthèse à la campagne : vous séjournez chez le
              propriétaire, veillez sur son chien… et vous êtes payé{" "}
              <em>et</em> logé.
            </p>
            <ul className="mt-4 space-y-2 text-sm text-ink-soft">
              <Check2>Une escapade au vert, pas une corvée</Check2>
              <Check2>Rémunéré pour chaque garde</Check2>
              <Check2>Idéal pour étudiants et amoureux des chiens</Check2>
            </ul>
            <div className="mt-6">
              <EnterAppButton mode="sitter" variant="gold">
                Devenir gardien
              </EnterAppButton>
            </div>
          </div>
        </div>
      </section>

      {/* COMMENT ÇA MARCHE */}
      <section className="relative z-10 bg-paper/60 py-16">
        <div className="mx-auto max-w-6xl px-5">
          <div className="text-center">
            <Eyebrow center>Simple comme bonjour</Eyebrow>
            <h2 className="mt-2 font-serif text-3xl font-semibold text-ink md:text-4xl">
              Comment ça marche
            </h2>
          </div>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {[
              {
                n: "1",
                title: "Publiez ou découvrez",
                body: "Le propriétaire publie une escapade ; le gardien parcourt les gardes près de chez lui.",
              },
              {
                n: "2",
                title: "Faites connaissance",
                body: "Échangez par message, proposez un appel vidéo, et validez ensemble les dates.",
              },
              {
                n: "3",
                title: "Une garde sereine",
                body: "Garde assurée, paiement sécurisé, et un carnet de garde avec photos chaque jour.",
              },
            ].map((s) => (
              <div
                key={s.n}
                className="relative rounded-3xl border border-line bg-cream p-6"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-brand font-serif text-lg font-semibold text-cream">
                  {s.n}
                </div>
                <h3 className="mt-4 font-serif text-xl font-semibold text-ink">
                  {s.title}
                </h3>
                <p className="mt-2 text-sm text-ink-soft">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOCUS CARNET DE GARDE */}
      <section className="relative z-10 mx-auto max-w-6xl px-5 py-16">
        <div className="grid items-center gap-10 md:grid-cols-2">
          <div className="order-2 md:order-1">
            <Eyebrow>Le petit plus qui rassure</Eyebrow>
            <h2 className="mt-2 font-serif text-3xl font-semibold text-ink md:text-4xl">
              Le carnet de garde
            </h2>
            <p className="mt-3 text-ink-soft">
              Chaque jour, le gardien envoie une photo et un mot du chien. Le
              parcours de la balade, un moment de complicité… et à la fin du
              séjour, un album souvenir remis au propriétaire.
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              {["📸 Photo du jour", "🐾 Balade tracée", "📖 Album souvenir"].map(
                (t) => (
                  <span key={t} className="chip">
                    {t}
                  </span>
                )
              )}
            </div>
          </div>

          {/* aperçu carnet */}
          <div className="order-1 md:order-2">
            <div className="mx-auto max-w-sm rounded-3xl border border-line bg-paper p-4 shadow-xl">
              <div className="flex aspect-[4/3] items-center justify-center rounded-2xl bg-gradient-to-br from-sage-100 to-sand text-6xl">
                🐕
              </div>
              <p className="mt-3 text-xs font-medium uppercase tracking-wide text-muted">
                Aujourd&apos;hui
              </p>
              <p className="mt-1 text-sm text-ink-soft">
                « Belle journée ! Gustave a adoré la balade au bord du lac ce
                matin. Grosse sieste au soleil. 🌞 »
              </p>
              <div className="mt-3 flex items-center gap-2 text-xs text-muted">
                🐾 Balade du jour
                <span className="chip">2,4 km · 45 min</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TÉMOIGNAGE */}
      <section className="relative z-10 mx-auto max-w-4xl px-5 pb-16">
        <figure className="rounded-3xl border border-line bg-paper p-8 text-center md:p-12">
          <div className="text-3xl text-gold">★★★★★</div>
          <blockquote className="mt-4 font-serif text-2xl font-medium leading-snug text-ink md:text-3xl">
            « Notre chien était aux anges, comme à la maison. Des photos tous les
            jours, on est partis l&apos;esprit tranquille. »
          </blockquote>
          <figcaption className="mt-5 text-sm text-muted">
            Marie, propriétaire de Gustave · Hermance
          </figcaption>
        </figure>
      </section>

      {/* CTA FINAL */}
      <section className="relative z-10 mx-auto max-w-6xl px-5 pb-20">
        <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-brand to-brand-700 px-6 py-14 text-center text-cream md:px-10">
          <div
            aria-hidden
            className="pointer-events-none absolute -right-10 -top-10 h-48 w-48 rounded-full bg-cream/10 blur-2xl"
          />
          <h2 className="relative font-serif text-3xl font-semibold md:text-4xl">
            Prêt à tenter l&apos;aventure ?
          </h2>
          <p className="relative mx-auto mt-3 max-w-xl text-cream/85">
            On lance cet été à Genève et dans sa région. Rejoignez les tout
            premiers — propriétaires comme gardiens.
          </p>
          <div className="relative mt-7 flex flex-wrap justify-center gap-3">
            <EnterAppButton mode="owner" variant="gold">
              🐶 J&apos;ai un chien
            </EnterAppButton>
            <ButtonLink
              href="/inscription?role=sitter"
              variant="secondary"
              size="lg"
              className="bg-cream/15 text-cream hover:bg-cream/25"
            >
              🌿 Je veux garder
            </ButtonLink>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="relative z-10 border-t border-line bg-paper/60">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-2 px-5 py-8 text-center text-sm text-muted">
          <Logo />
          <p className="mt-2">
            Plateforme de garde de chien à domicile · Genève et sa région
          </p>
          <p className="text-xs">
            Prototype — les paiements et l&apos;assurance sont en cours de mise
            en place.
          </p>
        </div>
      </footer>
    </div>
  );
}

function Eyebrow({
  children,
  center,
}: {
  children: React.ReactNode;
  center?: boolean;
}) {
  return (
    <p
      className={`text-xs font-semibold uppercase tracking-[0.15em] text-brand ${
        center ? "" : ""
      }`}
    >
      {children}
    </p>
  );
}

function Dot() {
  return <span className="inline-block h-1.5 w-1.5 rounded-full bg-sage" />;
}

function Check2({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-2">
      <span className="mt-0.5 text-brand">✓</span>
      <span>{children}</span>
    </li>
  );
}
