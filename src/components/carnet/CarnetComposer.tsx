"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/Button";
import { IconCamera } from "@/components/ui/icons";

/**
 * Composer du carnet : le gardien poste une photo (redimensionnée côté client,
 * donc aucun stockage externe requis) + un petit mot. Le propriétaire est notifié.
 */
export function CarnetComposer({
  action,
  dogName,
}: {
  action: (formData: FormData) => Promise<void>;
  dogName: string;
}) {
  const [photo, setPhoto] = useState<string | null>(null);
  const [busyPhoto, setBusyPhoto] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const [, submit, pending] = useActionState(async (_prev: number, fd: FormData) => {
    await action(fd);
    return Date.now();
  }, 0);

  // Réinitialise après publication.
  const [lastReset, setLastReset] = useState(0);
  useEffect(() => {
    if (lastReset) {
      setPhoto(null);
      formRef.current?.reset();
    }
  }, [lastReset]);

  async function onPick(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setBusyPhoto(true);
    try {
      const dataUrl = await downscale(file, 1000, 0.72);
      setPhoto(dataUrl);
    } catch {
      setPhoto(null);
    } finally {
      setBusyPhoto(false);
    }
  }

  return (
    <form
      ref={formRef}
      action={async (fd) => {
        if (photo) fd.set("photo", photo);
        await submit(fd);
        setLastReset(Date.now());
      }}
      className="card space-y-3 p-4"
    >
      <div className="flex items-center gap-2">
        <IconCamera className="h-5 w-5 text-brand" />
        <h2 className="font-semibold text-ink">Partager une nouvelle</h2>
      </div>

      {photo && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={photo}
          alt="Aperçu"
          className="max-h-64 w-full rounded-xl object-cover"
        />
      )}

      <textarea
        name="note"
        rows={3}
        placeholder={`Comment se passe la journée de ${dogName} ?`}
        className="w-full resize-none rounded-xl border border-line bg-paper px-3 py-2.5 text-sm outline-none focus:border-sage"
      />

      <div className="flex items-center justify-between gap-2">
        <label className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-line bg-paper px-3 py-2 text-sm font-medium text-ink-soft hover:bg-cream">
          <IconCamera className="h-4 w-4" />
          {busyPhoto ? "Chargement…" : photo ? "Changer la photo" : "Ajouter une photo"}
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={onPick}
          />
        </label>
        <Button type="submit" disabled={pending || busyPhoto}>
          {pending ? "Publication…" : "Publier"}
        </Button>
      </div>
    </form>
  );
}

/** Redimensionne une image (max `maxDim` px) et renvoie un data URL JPEG. */
function downscale(file: File, maxDim: number, quality: number): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error("read"));
    reader.onload = () => {
      const img = new Image();
      img.onerror = () => reject(new Error("img"));
      img.onload = () => {
        const scale = Math.min(1, maxDim / Math.max(img.width, img.height));
        const w = Math.round(img.width * scale);
        const h = Math.round(img.height * scale);
        const canvas = document.createElement("canvas");
        canvas.width = w;
        canvas.height = h;
        const ctx = canvas.getContext("2d");
        if (!ctx) return reject(new Error("ctx"));
        ctx.drawImage(img, 0, 0, w, h);
        resolve(canvas.toDataURL("image/jpeg", quality));
      };
      img.src = reader.result as string;
    };
    reader.readAsDataURL(file);
  });
}
