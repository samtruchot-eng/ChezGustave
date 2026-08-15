import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/session";
import { Button } from "@/components/ui/Button";
import { IconCalendar, IconCheck } from "@/components/ui/icons";
import { formatDateRange } from "@/lib/utils";
import { addAvailability, removeAvailability } from "./actions";

export const metadata = { title: "Mes disponibilités" };

export default async function DisponibilitesPage() {
  const me = await requireUser();
  const profile = await prisma.sitterProfile.findUnique({
    where: { userId: me.id },
    include: {
      availabilities: { orderBy: { startDate: "asc" } },
    },
  });

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const upcoming =
    profile?.availabilities.filter((a) => a.endDate >= today) ?? [];

  const todayStr = today.toISOString().slice(0, 10);

  return (
    <div className="space-y-5">
      <Link
        href="/profil"
        className="inline-flex items-center gap-1 text-sm text-ink-soft hover:text-brand"
      >
        ← Profil
      </Link>

      <div>
        <h1 className="text-2xl font-bold text-ink">Mes disponibilités</h1>
        <p className="mt-1 text-sm text-muted">
          Indiquez quand vous pouvez accueillir un chien : c&apos;est affiché sur
          votre profil et rassure les propriétaires.
        </p>
      </div>

      {!profile ? (
        <section className="card p-5">
          <p className="text-ink-soft">
            Complétez d&apos;abord votre profil gardien pour gérer vos
            disponibilités.
          </p>
          <Link
            href="/profil"
            className="mt-3 inline-block font-medium text-brand hover:underline"
          >
            Aller au profil →
          </Link>
        </section>
      ) : (
        <>
          {/* Ajouter une période */}
          <section className="card p-5">
            <h2 className="font-semibold text-ink">Ajouter une période</h2>
            <form action={addAvailability} className="mt-3 space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <label className="block">
                  <span className="mb-1 block text-xs font-medium text-muted">
                    Du
                  </span>
                  <input
                    type="date"
                    name="start"
                    required
                    min={todayStr}
                    defaultValue={todayStr}
                    className="w-full rounded-xl border border-line bg-paper px-3 py-2.5 text-sm outline-none focus:border-sage"
                  />
                </label>
                <label className="block">
                  <span className="mb-1 block text-xs font-medium text-muted">
                    Au
                  </span>
                  <input
                    type="date"
                    name="end"
                    required
                    min={todayStr}
                    className="w-full rounded-xl border border-line bg-paper px-3 py-2.5 text-sm outline-none focus:border-sage"
                  />
                </label>
              </div>
              <Button type="submit" className="w-full">
                <IconCheck className="h-4 w-4" /> Ajouter
              </Button>
            </form>
          </section>

          {/* Périodes à venir */}
          <section className="card divide-y divide-line">
            {upcoming.length === 0 ? (
              <div className="p-6 text-center">
                <IconCalendar className="mx-auto h-8 w-8 text-muted" />
                <p className="mt-2 text-sm text-muted">
                  Aucune disponibilité pour l&apos;instant.
                </p>
              </div>
            ) : (
              upcoming.map((a) => (
                <div
                  key={a.id}
                  className="flex items-center gap-3 p-4 first:rounded-t-2xl last:rounded-b-2xl"
                >
                  <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand/10 text-brand">
                    <IconCalendar className="h-5 w-5" />
                  </span>
                  <span className="flex-1 text-sm font-medium text-ink">
                    {formatDateRange(a.startDate, a.endDate)}
                  </span>
                  <form action={removeAvailability.bind(null, a.id)}>
                    <button
                      type="submit"
                      className="text-sm text-muted hover:text-terracotta"
                    >
                      Retirer
                    </button>
                  </form>
                </div>
              ))
            )}
          </section>
        </>
      )}
    </div>
  );
}
