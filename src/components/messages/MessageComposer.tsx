"use client";

import { useRef } from "react";
import { Button } from "@/components/ui/Button";

export function MessageComposer({
  conversationId,
  action,
}: {
  conversationId: string;
  action: (conversationId: string, formData: FormData) => Promise<void>;
}) {
  const formRef = useRef<HTMLFormElement>(null);

  return (
    <form
      ref={formRef}
      action={async (formData) => {
        await action(conversationId, formData);
        formRef.current?.reset();
      }}
      className="flex gap-2 rounded-full border border-line bg-paper p-1.5 shadow-sm"
    >
      <input
        name="body"
        placeholder="Écrire un message…"
        autoComplete="off"
        className="flex-1 bg-transparent px-3 text-sm outline-none"
      />
      <Button type="submit" size="sm">
        Envoyer
      </Button>
    </form>
  );
}
