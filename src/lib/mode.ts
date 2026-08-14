import { cookies } from "next/headers";
import type { ProfileMode } from "./constants";

export const MODE_COOKIE = "cg_mode";

/** Lit le mode actif (Propriétaire / Gardien) depuis le cookie, côté serveur. */
export async function getMode(): Promise<ProfileMode> {
  const store = await cookies();
  const value = store.get(MODE_COOKIE)?.value;
  return value === "sitter" ? "sitter" : "owner";
}
