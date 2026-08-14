"use server";

import { cookies } from "next/headers";
import { AuthError } from "next-auth";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { signIn } from "@/auth";
import { MODE_COOKIE } from "@/lib/mode";

const schema = z.object({
  name: z.string().min(1, "Votre nom est requis."),
  email: z.string().email("E-mail invalide."),
  password: z
    .string()
    .min(6, "Le mot de passe doit faire au moins 6 caractères."),
  role: z.enum(["owner", "sitter"]).default("owner"),
});

export async function register(
  _prev: string | undefined,
  formData: FormData
): Promise<string | undefined> {
  const parsed = schema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) {
    return parsed.error.issues[0]?.message ?? "Formulaire invalide.";
  }
  const { name, email, password, role } = parsed.data;
  const normalizedEmail = email.toLowerCase();

  const existing = await prisma.user.findUnique({
    where: { email: normalizedEmail },
  });
  if (existing) {
    return "Un compte existe déjà avec cet e-mail. Essayez de vous connecter.";
  }

  const passwordHash = await bcrypt.hash(password, 10);
  const firstName = name.trim().split(/\s+/)[0];
  const referralCode =
    firstName.toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 8) +
    Math.floor(1000 + Math.random() * 9000);

  await prisma.user.create({
    data: {
      name: name.trim(),
      email: normalizedEmail,
      passwordHash,
      referralCode,
      ...(role === "sitter"
        ? {
            sitterProfile: {
              create: { firstName, region: "Genève" },
            },
          }
        : {
            ownerProfile: {
              create: { region: "Genève" },
            },
          }),
    },
  });

  // Pré-sélectionne le bon mode (Propriétaire / Gardien).
  const store = await cookies();
  store.set(MODE_COOKIE, role, {
    path: "/",
    maxAge: 60 * 60 * 24 * 365,
    sameSite: "lax",
  });

  try {
    await signIn("credentials", {
      email: normalizedEmail,
      password,
      redirectTo: "/decouvrir",
    });
  } catch (error) {
    if (error instanceof AuthError) {
      return "Compte créé, mais la connexion a échoué. Essayez de vous connecter.";
    }
    throw error;
  }
}
