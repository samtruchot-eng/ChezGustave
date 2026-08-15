import type { FaqItem } from "@/lib/company";

/**
 * Accordéon bâti sur `<details>` : accessible au clavier et fonctionnel sans
 * JavaScript.
 */
export function FaqList({ items }: { items: FaqItem[] }) {
  return (
    <div className="divide-y divide-line overflow-hidden rounded-2xl border border-line bg-paper">
      {items.map((item) => (
        <details key={item.question} className="group">
          <summary className="flex cursor-pointer list-none items-start justify-between gap-6 px-6 py-5 transition-colors hover:bg-mist sm:px-7">
            <span className="font-display text-lg font-medium text-ink">
              {item.question}
            </span>
            <span
              aria-hidden="true"
              className="mt-1 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-line text-signal-600 transition-transform duration-300 group-open:rotate-45"
            >
              <svg viewBox="0 0 24 24" className="h-3.5 w-3.5">
                <path
                  d="M12 5v14M5 12h14"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  fill="none"
                />
              </svg>
            </span>
          </summary>
          <div className="px-6 pb-6 sm:px-7">
            <p className="max-w-3xl text-pretty leading-relaxed text-ink-soft">
              {item.answer}
            </p>
          </div>
        </details>
      ))}
    </div>
  );
}
