"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/session";

export async function sendMessage(conversationId: string, formData: FormData) {
  const body = String(formData.get("body") ?? "").trim();
  if (!body) return;

  const me = await requireUser();
  if (!me) return;

  const convo = await prisma.conversation.findUnique({
    where: { id: conversationId },
  });
  if (!convo || (convo.userAId !== me.id && convo.userBId !== me.id)) return;

  await prisma.message.create({
    data: { conversationId, senderId: me.id, body },
  });
  await prisma.conversation.update({
    where: { id: conversationId },
    data: { updatedAt: new Date() },
  });

  revalidatePath(`/messages/${conversationId}`);
}
