import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { formatDistanceToNow } from "date-fns";
import { fr } from "date-fns/locale";

export const metadata = { title: "Notifications" };

const ICONS: Record<string, string> = {
  new_application: "📨",
  application_accepted: "✅",
  new_photo: "📸",
  new_sitter: "🧑‍🌾",
  reminder: "🔔",
};

export default async function NotificationsPage() {
  const notifications = await prisma.notification.findMany({
    orderBy: { createdAt: "desc" },
    take: 30,
  });

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold text-ink">Notifications</h1>

      {notifications.length === 0 ? (
        <div className="card p-10 text-center">
          <span className="text-4xl">🔔</span>
          <p className="mt-2 font-medium text-ink">Rien de neuf</p>
          <p className="text-sm text-muted">
            Vous serez prévenu ici des demandes, photos et rappels.
          </p>
        </div>
      ) : (
        <ul className="card divide-y divide-line">
          {notifications.map((n) => (
            <li key={n.id}>
              <Link
                href={n.link ?? "#"}
                className="flex items-start gap-3 p-4 hover:bg-cream"
              >
                <span className="text-xl">{ICONS[n.type] ?? "🔔"}</span>
                <div className="flex-1">
                  <p className="font-medium text-ink">{n.title}</p>
                  {n.body && (
                    <p className="text-sm text-ink-soft">{n.body}</p>
                  )}
                  <p className="mt-0.5 text-xs text-muted">
                    {formatDistanceToNow(n.createdAt, {
                      addSuffix: true,
                      locale: fr,
                    })}
                  </p>
                </div>
                {!n.readAt && (
                  <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-terracotta" />
                )}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
