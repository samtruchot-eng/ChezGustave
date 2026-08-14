import { notFound } from "next/navigation";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/session";
import { Avatar } from "@/components/ui/Avatar";
import { cn } from "@/lib/utils";
import { MessageComposer } from "@/components/messages/MessageComposer";
import { IconChat } from "@/components/ui/icons";
import { sendMessage } from "./actions";

export default async function ConversationPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const me = await requireUser();
  if (!me) notFound();

  const convo = await prisma.conversation.findUnique({
    where: { id },
    include: {
      userA: { select: { id: true, name: true, image: true } },
      userB: { select: { id: true, name: true, image: true } },
      messages: { orderBy: { createdAt: "asc" } },
    },
  });
  if (!convo || (convo.userAId !== me.id && convo.userBId !== me.id))
    notFound();

  const other = convo.userAId === me.id ? convo.userB : convo.userA;

  return (
    <div className="flex min-h-[70vh] flex-col">
      <div className="mb-3 flex items-center gap-3">
        <Link
          href="/messages"
          className="text-ink-soft hover:text-brand"
          aria-label="Retour"
        >
          ←
        </Link>
        <Avatar src={other.image} name={other.name} size={40} />
        <div>
          <p className="font-semibold text-ink">{other.name}</p>
          <p className="flex items-center gap-1 text-xs text-muted">
            <IconChat className="h-3.5 w-3.5" /> Discussion Chez Gustave
          </p>
        </div>
      </div>

      <div className="flex-1 space-y-2">
        {convo.messages.map((m) => {
          const mine = m.senderId === me.id;
          return (
            <div
              key={m.id}
              className={cn("flex", mine ? "justify-end" : "justify-start")}
            >
              <div
                className={cn(
                  "max-w-[80%] rounded-2xl px-4 py-2 text-sm",
                  mine
                    ? "bg-brand text-cream"
                    : "bg-paper text-ink border border-line"
                )}
              >
                {m.body}
              </div>
            </div>
          );
        })}
      </div>

      <div className="sticky bottom-16 mt-4">
        <MessageComposer conversationId={convo.id} action={sendMessage} />
      </div>
    </div>
  );
}
