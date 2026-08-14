import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/session";
import { formatDistanceToNow } from "date-fns";
import { fr } from "date-fns/locale";
import {
  IconInbox,
  IconCheck,
  IconCamera,
  IconLeaf,
  IconBell,
} from "@/components/ui/icons";

export const metadata = { title: "Notifications" };

type IconType = (props: { className?: string }) => React.ReactElement;

const ICONS: Record<string, IconType> = {
  new_application: IconInbox,
  application_accepted: IconCheck,
  new_photo: IconCamera,
  new_sitter: IconLeaf,
  reminder: IconBell,
};

export default async function NotificationsPage() {
  const me = await requireUser();
  const notifications = await prisma.notification.findMany({
    where: { userId: me.id },
    orderBy: { createdAt: "desc" },
    take: 30,
  });

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold text-ink">Notifications</h1>

      {notifications.length === 0 ? (
        <div className="card p-10 text-center">
          <IconBell className="mx-auto h-9 w-9 text-muted" />
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
                {(() => {
                  const NotifIcon = ICONS[n.type] ?? IconBell;
                  return (
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-brand/10 text-brand">
                      <NotifIcon className="h-5 w-5" />
                    </span>
                  );
                })()}
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
