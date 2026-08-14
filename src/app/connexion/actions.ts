"use server";

import { AuthError } from "next-auth";
import { signIn } from "@/auth";

export async function login(
  _prev: string | undefined,
  formData: FormData
): Promise<string | undefined> {
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  const callbackUrl = String(formData.get("callbackUrl") ?? "/decouvrir");

  if (!email || !password) return "Merci de renseigner e-mail et mot de passe.";

  try {
    await signIn("credentials", {
      email: email.toLowerCase(),
      password,
      redirectTo: callbackUrl,
    });
  } catch (error) {
    // signIn lève une redirection en cas de succès : il faut la laisser passer.
    if (error instanceof AuthError) {
      return "E-mail ou mot de passe incorrect.";
    }
    throw error;
  }
}
