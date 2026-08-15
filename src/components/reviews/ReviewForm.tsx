"use client";

import { useActionState, useState } from "react";
import { Button } from "@/components/ui/Button";

/**
 * Formulaire d'avis après garde : sélecteur d'étoiles (1–5) + commentaire.
 */
export function ReviewForm({
  action,
  targetName,
}: {
  action: (formData: FormData) => Promise<void>;
  targetName: string;
}) {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [, submit, pending] = useActionState(async (_p: number, fd: FormData) => {
    await action(fd);
    return Date.now();
  }, 0);

  const shown = hover || rating;

  return (
    <form action={submit} className="space-y-3">
      <input type="hidden" name="rating" value={rating} />
      <p className="text-sm text-muted">Votre note pour {targetName}</p>
      <div className="flex gap-1" role="radiogroup" aria-label="Note">
        {[1, 2, 3, 4, 5].map((n) => (
          <button
            key={n}
            type="button"
            aria-label={`${n} sur 5`}
            onClick={() => setRating(n)}
            onMouseEnter={() => setHover(n)}
            onMouseLeave={() => setHover(0)}
            className={`text-3xl leading-none transition-transform hover:scale-110 ${
              n <= shown ? "text-gold" : "text-line"
            }`}
          >
            ★
          </button>
        ))}
      </div>
      <textarea
        name="comment"
        rows={3}
        placeholder="Un mot sur cette garde ? (optionnel)"
        className="w-full resize-none rounded-xl border border-line bg-paper px-3 py-2.5 text-sm outline-none focus:border-sage"
      />
      <Button type="submit" disabled={pending || rating === 0} className="w-full">
        {pending ? "Envoi…" : "Publier mon avis"}
      </Button>
    </form>
  );
}
