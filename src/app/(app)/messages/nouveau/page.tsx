import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/session";

/** Trouve ou crée une conversation avec le destinataire, puis redirige. */
export default async function NouveauMessagePage({
  searchParams,
}: {
  searchParams: Promise<{ to?: string }>;
}) {
  const { to } = await searchParams;
  const me = await getCurrentUser();

  if (!me || !to || to === me.id) redirect("/messages");

  const target = await prisma.user.findUnique({ where: { id: to } });
  if (!target) redirect("/messages");

  const existing = await prisma.conversation.findFirst({
    where: {
      OR: [
        { userAId: me.id, userBId: to },
        { userAId: to, userBId: me.id },
      ],
    },
  });

  if (existing) redirect(`/messages/${existing.id}`);

  const convo = await prisma.conversation.create({
    data: { userAId: me.id, userBId: to },
  });

  redirect(`/messages/${convo.id}`);
}
