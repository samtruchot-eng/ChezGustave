import { TopBar } from "@/components/layout/TopBar";
import { BottomNav } from "@/components/layout/BottomNav";
import { getMode } from "@/lib/mode";
import { prisma } from "@/lib/prisma";

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const mode = await getMode();

  // Compteur de notifications non lues (démo : toutes non lues).
  const notificationCount = await prisma.notification
    .count({ where: { readAt: null } })
    .catch(() => 0);

  return (
    <div className="bg-leaf-pattern min-h-dvh">
      <TopBar mode={mode} notificationCount={notificationCount} />
      <main className="mx-auto max-w-2xl px-4 pb-28 pt-4">{children}</main>
      <BottomNav />
    </div>
  );
}
