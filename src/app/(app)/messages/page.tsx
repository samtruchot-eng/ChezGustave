import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/session";
import { Avatar } from "@/components/ui/Avatar";

export const metadata = { title: "Messages" };

export default async function MessagesPage() {
  const me = await requireUser();

  const conversations = await prisma.conversation.findMany({
    where: { OR: [{ userAId: me.id }, { userBId: me.id }] },
    include: {
      userA: { select: { id: true, name: true, image: true } },
      userB: { select: { id: true, name: true, image: true } },
      messages: { orderBy: { createdAt: "desc" }, take: 1 },
    },
    orderBy: { updatedAt: "desc" },
  });

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold text-ink">Messages</h1>

      {conversations.length === 0 ? (
        <div className="card p-10 text-center">
          <span className="text-4xl">💬</span>
          <p className="mt-2 font-medium text-ink">Aucune conversation</p>
          <p className="text-sm text-muted">
            Contactez un gardien ou postulez à une escapade pour démarrer un
            échange.
          </p>
        </div>
      ) : (
        <ul className="space-y-2">
          {conversations.map((c) => {
            const other = c.userAId === me.id ? c.userB : c.userA;
            const last = c.messages[0];
            return (
              <li key={c.id}>
                <Link
                  href={`/messages/${c.id}`}
                  className="card flex items-center gap-3 p-4 hover:bg-cream"
                >
                  <Avatar src={other.image} name={other.name} size={48} />
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-ink">{other.name}</p>
                    {last && (
                      <p className="truncate text-sm text-muted">
                        {last.senderId === me.id ? "Vous : " : ""}
                        {last.body}
                      </p>
                    )}
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
