/**
 * Squelette affiché instantanément pendant le chargement d'une page de l'app.
 * Donne un retour immédiat à chaque navigation (perception de rapidité).
 */
export default function AppLoading() {
  return (
    <div className="animate-pulse space-y-5" aria-hidden="true">
      <div className="h-7 w-2/5 rounded-lg bg-sand" />
      <div className="h-4 w-3/5 rounded bg-sand/70" />
      <div className="mt-2 h-11 w-full rounded-full bg-sand/70" />
      <div className="grid gap-4 sm:grid-cols-2">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="card overflow-hidden">
            <div className="aspect-[16/10] w-full bg-sand" />
            <div className="space-y-2 p-4">
              <div className="h-4 w-3/4 rounded bg-sand" />
              <div className="h-3 w-1/2 rounded bg-sand/70" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
