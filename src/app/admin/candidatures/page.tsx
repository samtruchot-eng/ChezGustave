import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { Avatar } from "@/components/ui/Avatar";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { formatDateRange } from "@/lib/utils";
import {
  APPLICATION_STATUS_LABELS,
  type ApplicationStatus,
} from "@/lib/constants";
import { setApplicationStatus } from "@/app/admin/actions";

export const metadata = { title: "Candidatures · Admin" };

const tone: Record<ApplicationStatus, "gold" | "sage" | "terracotta" | "neutral"> =
  {
    pending: "gold",
    accepted: "sage",
    rejected: "terracotta",
    withdrawn: "neutral",
  };

export default async function AdminApplicationsPage() {
  const applications = await prisma.application.findMany({
    orderBy: [{ status: "asc" }, { createdAt: "desc" }],
    include: {
      sitter: { select: { id: true, name: true, image: true } },
      listing: {
        select: {
          id: true,
          title: true,
          startDate: true,
          endDate: true,
          dog: { select: { name: true } },
          owner: { select: { name: true } },
        },
      },
    },
  });

  const pending = applications.filter((a) => a.status === "pending");

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-ink">Candidatures</h1>
        <span className="text-sm text-muted">
          {pending.length} en attente · {applications.length} au total
        </span>
      </div>

      {applications.length === 0 ? (
        <div className="card p-10 text-center text-sm text-muted">
          Aucune candidature pour l&apos;instant.
        </div>
      ) : (
        <ul className="space-y-3">
          {applications.map((a) => {
            const accept = setApplicationStatus.bind(null, a.id, "accepted");
            const reject = setApplicationStatus.bind(null, a.id, "rejected");
            return (
              <li key={a.id} className="card p-4">
                <div className="flex items-start gap-3">
                  <Avatar src={a.sitter.image} name={a.sitter.name} size={44} />
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <Link
                        href={`/admin/utilisateurs/${a.sitter.id}`}
                        className="font-medium text-ink hover:text-brand"
                      >
                        {a.sitter.name}
                      </Link>
                      <Badge tone={tone[a.status as ApplicationStatus]}>
                        {APPLICATION_STATUS_LABELS[a.status as ApplicationStatus]}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted">
                      → {a.listing.dog.name} · {a.listing.title}
                    </p>
                    <p className="text-xs text-muted">
                      Proprio : {a.listing.owner.name} ·{" "}
                      {formatDateRange(
                        a.listing.startDate,
                        a.listing.endDate
                      )}
                    </p>
                    {a.message && (
                      <p className="mt-2 rounded-xl bg-cream px-3 py-2 text-sm text-ink-soft">
                        « {a.message} »
                      </p>
                    )}
                  </div>
                </div>

                <div className="mt-3 flex justify-end gap-2">
                  {a.status !== "accepted" && (
                    <form action={accept}>
                      <Button type="submit" size="sm">
                        Accepter
                      </Button>
                    </form>
                  )}
                  {a.status !== "rejected" && (
                    <form action={reject}>
                      <Button type="submit" size="sm" variant="secondary">
                        Refuser
                      </Button>
                    </form>
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
