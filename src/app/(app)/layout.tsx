import { TopBar } from "@/components/layout/TopBar";
import { BottomNav } from "@/components/layout/BottomNav";
import { getMode } from "@/lib/mode";
import { getCurrentUser } from "@/lib/session";
import { prisma } from "@/lib/prisma";

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const mode = await getMode();
  const user = await getCurrentUser();

  const notificationCount = user
    ? await prisma.notification
        .count({ where: { userId: user.id, readAt: null } })
        .catch(() => 0)
    : 0;

  return (
    <div className="bg-leaf-pattern min-h-dvh">
      <TopBar
        mode={mode}
        notificationCount={notificationCount}
        user={
          user
            ? { id: user.id, name: user.name, image: user.image }
            : null
        }
      />
      <main className="mx-auto max-w-2xl px-4 pb-28 pt-4">{children}</main>
      <BottomNav />
    </div>
  );
}
