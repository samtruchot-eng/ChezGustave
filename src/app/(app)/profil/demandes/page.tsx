import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/session";
import { getMode } from "@/lib/mode";
import { Badge } from "@/components/ui/Badge";
import { Avatar } from "@/components/ui/Avatar";
import {
  APPLICATION_STATUS_LABELS,
  type ApplicationStatus,
} from "@/lib/constants";
import { formatDateRange } from "@/lib/utils";
import { IconInbox, IconPin, IconChevronRight } from "@/components/ui/icons";

export const metadata = { title: "Mes demandes" };

const statusTone: Record<ApplicationStatus, "gold" | "sage" | "terracotta" | "neutral"> = {
  pending: "gold",
  accepted: "sage",
  rejected: "terracotta",
  withdrawn: "neutral",
};

export default async function DemandesPage() {
  const me = await requireUser();
  const mode = await getMode();
  if (!me) return null;

  return (
    <div className="space-y-4">
      <BackLink />
      <h1 className="text-2xl font-bold text-ink">Mes demandes</h1>

      {mode === "sitter" ? (
        <SitterApplications userId={me.id} />
      ) : (
        <OwnerApplications userId={me.id} />
      )}
    </div>
  );
}

async function SitterApplications({ userId }: { userId: string }) {
  const apps = await prisma.application.findMany({
    where: { sitterId: userId },
    include: { listing: { include: { dog: true } } },
    orderBy: { createdAt: "desc" },
  });

  if (apps.length === 0)
    return <Empty text="Vous n'avez pas encore postulé à une escapade." />;

  return (
    <ul className="space-y-2">
      {apps.map((a) => (
        <li key={a.id}>
          <Link
            href={`/decouvrir/escapade/${a.listingId}`}
            className="card flex items-center justify-between gap-3 p-4 hover:bg-cream"
          >
            <div>
              <p className="font-medium text-ink">{a.listing.title}</p>
              <p className="flex items-center gap-1 text-sm text-muted">
                <IconPin className="h-3.5 w-3.5" /> {a.listing.region} ·{" "}
                {formatDateRange(a.listing.startDate, a.listing.endDate)}
              </p>
            </div>
            <Badge tone={statusTone[a.status as ApplicationStatus]}>
              {APPLICATION_STATUS_LABELS[a.status as ApplicationStatus]}
            </Badge>
          </Link>
        </li>
      ))}
    </ul>
  );
}

async function OwnerApplications({ userId }: { userId: string }) {
  const apps = await prisma.application.findMany({
    where: { listing: { ownerId: userId } },
    include: {
      listing: { include: { dog: true } },
      sitter: {
        select: { id: true, name: true, image: true, sitterProfile: true },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  if (apps.length === 0)
    return <Empty text="Aucune candidature reçue pour l'instant." />;

  return (
    <ul className="space-y-2">
      {apps.map((a) => (
        <li key={a.id} className="card p-4">
          <div className="flex items-center gap-3">
            <Avatar src={a.sitter.image} name={a.sitter.name} size={44} />
            <div className="min-w-0 flex-1">
              <p className="font-medium text-ink">{a.sitter.name}</p>
              <p className="text-sm text-muted">
                pour {a.listing.dog.name} · {a.listing.title}
              </p>
            </div>
            <Badge tone={statusTone[a.status as ApplicationStatus]}>
              {APPLICATION_STATUS_LABELS[a.status as ApplicationStatus]}
            </Badge>
          </div>
          {a.message && (
            <p className="mt-2 rounded-xl bg-cream px-3 py-2 text-sm text-ink-soft">
              « {a.message} »
            </p>
          )}
          <div className="mt-3 flex justify-end">
            <Link
              href={`/messages/nouveau?to=${a.sitter.id}`}
              className="inline-flex items-center gap-1 text-sm font-medium text-brand hover:underline"
            >
              Répondre <IconChevronRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </li>
      ))}
    </ul>
  );
}

function Empty({ text }: { text: string }) {
  return (
    <div className="card p-10 text-center">
      <IconInbox className="mx-auto h-9 w-9 text-muted" />
      <p className="mt-2 text-sm text-muted">{text}</p>
    </div>
  );
}

function BackLink() {
  return (
    <Link
      href="/profil"
      className="inline-flex items-center gap-1 text-sm text-ink-soft hover:text-brand"
    >
      ← Profil
    </Link>
  );
}
