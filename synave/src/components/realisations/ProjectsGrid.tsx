"use client";

import { useState } from "react";
import { projectCategories, projects } from "@/lib/projects";
import { IconCheck, IconSparkles } from "@/components/ui/icons";
import { cn } from "@/lib/utils";

export function ProjectsGrid() {
  const [category, setCategory] =
    useState<(typeof projectCategories)[number]>("Tous");

  const visible =
    category === "Tous"
      ? projects
      : projects.filter((project) => project.category === category);

  return (
    <div>
      {/* Filtres */}
      <div
        role="group"
        aria-label="Filtrer par type de projet"
        className="flex flex-wrap gap-2"
      >
        {projectCategories.map((item) => {
          const active = item === category;
          return (
            <button
              key={item}
              type="button"
              onClick={() => setCategory(item)}
              aria-pressed={active}
              className={cn(
                "h-10 rounded-full border px-4 text-sm font-medium transition-all",
                active
                  ? "border-signal bg-signal text-white"
                  : "border-line bg-paper text-ink-soft hover:border-signal-300 hover:text-ink",
              )}
            >
              {item}
            </button>
          );
        })}
      </div>

      <p className="mt-5 text-sm text-muted" aria-live="polite">
        {visible.length} projet{visible.length > 1 ? "s" : ""} affiché
        {visible.length > 1 ? "s" : ""}
      </p>

      {/* Cas */}
      <div className="mt-8 space-y-6">
        {visible.map((project) => (
          <article
            key={project.slug}
            id={project.slug}
            className="card scroll-mt-28 overflow-hidden"
          >
            <div className="grid gap-8 p-7 sm:p-9 lg:grid-cols-[0.85fr_1.15fr] lg:gap-12">
              {/* Colonne identité */}
              <div>
                <span className="chip bg-mist">{project.category}</span>
                <h3 className="mt-5 text-balance text-2xl font-semibold leading-tight">
                  {project.title}
                </h3>
                <p className="mt-2 text-sm text-muted">{project.sector}</p>
                <p className="mt-5 text-pretty leading-relaxed text-ink-soft">
                  {project.summary}
                </p>

                <dl className="mt-7 space-y-4 border-t border-line pt-6 text-sm">
                  <div>
                    <dt className="font-mono text-xs uppercase tracking-[0.14em] text-muted">
                      Durée
                    </dt>
                    <dd className="mt-1.5 text-ink">{project.duration}</dd>
                  </div>
                  <div>
                    <dt className="font-mono text-xs uppercase tracking-[0.14em] text-muted">
                      Briques techniques
                    </dt>
                    <dd className="mt-2 flex flex-wrap gap-1.5">
                      {project.stack.map((tech) => (
                        <span
                          key={tech}
                          className="rounded-lg bg-mist px-2.5 py-1 font-mono text-xs text-ink-soft"
                        >
                          {tech}
                        </span>
                      ))}
                    </dd>
                  </div>
                </dl>
              </div>

              {/* Colonne récit */}
              <div className="space-y-7">
                <div className="rounded-2xl bg-mist p-6">
                  <h4 className="font-mono text-xs uppercase tracking-[0.14em] text-muted">
                    Le point de départ
                  </h4>
                  <p className="mt-3 text-pretty leading-relaxed text-ink">
                    {project.challenge}
                  </p>
                </div>

                <div>
                  <h4 className="font-mono text-xs uppercase tracking-[0.14em] text-muted">
                    Ce que nous avons construit
                  </h4>
                  <ul className="mt-4 space-y-2.5">
                    {project.solution.map((item) => (
                      <li key={item} className="flex gap-3">
                        <IconCheck className="mt-1 h-4 w-4 shrink-0 text-signal-600" />
                        <span className="text-[0.95rem] leading-relaxed text-ink-soft">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="font-mono text-xs uppercase tracking-[0.14em] text-muted">
                    Ce que cela a changé
                  </h4>
                  <ul className="mt-4 space-y-2.5">
                    {project.outcomes.map((item) => (
                      <li key={item} className="flex gap-3">
                        <IconSparkles className="mt-1 h-4 w-4 shrink-0 text-mint-600" />
                        <span className="text-[0.95rem] leading-relaxed text-ink-soft">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
