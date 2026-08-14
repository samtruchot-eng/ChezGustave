import { getMode } from "@/lib/mode";
import { requireUser } from "@/lib/session";
import { OwnerPublishForm } from "@/components/publish/OwnerPublishForm";
import { SitterProfileForm } from "@/components/publish/SitterProfileForm";
import { jsonList } from "@/lib/utils";

export const metadata = { title: "Publier" };

export default async function PublierPage() {
  const mode = await getMode();
  const me = await requireUser();

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-bold text-ink">
          {mode === "owner"
            ? "Publier une escapade"
            : "Mon profil de gardien"}
        </h1>
        <p className="text-sm text-muted">
          {mode === "owner"
            ? "Décrivez la garde : votre chien apparaîtra aussitôt dans les résultats."
            : "Créez votre profil pour recevoir des propositions de garde."}
        </p>
      </div>

      <div className="card p-5">
        {mode === "owner" ? (
          <OwnerPublishForm defaultRegion={me?.ownerProfile?.region ?? undefined} />
        ) : (
          <SitterProfileForm
            defaults={
              me?.sitterProfile
                ? {
                    firstName: me.sitterProfile.firstName,
                    region: me.sitterProfile.region,
                    headline: me.sitterProfile.headline ?? undefined,
                    bio: me.sitterProfile.bio ?? undefined,
                    dailyRate: me.sitterProfile.dailyRate,
                    animals: jsonList(me.sitterProfile.animalsAccepted),
                    ambiances: jsonList(me.sitterProfile.ambiances),
                  }
                : { firstName: me?.name?.split(" ")[0] }
            }
          />
        )}
      </div>
    </div>
  );
}
