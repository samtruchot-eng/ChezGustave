import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { seedDatabase } from "../../../../prisma/seed-data";

// Route Node (Prisma), jamais mise en cache.
export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 60;

/**
 * Remplit la base avec les données de démonstration.
 *
 * Sécurité : désactivée tant que la variable d'environnement SEED_SECRET
 * n'est pas définie. Une fois définie, appelez :
 *   GET /api/seed?key=VOTRE_SECRET
 *
 * ⚠️ Cette opération RÉINITIALISE les tables (données de démo). À utiliser
 * pour peupler un aperçu, pas sur une base contenant de vraies données.
 * Pensez à retirer SEED_SECRET ensuite.
 */
async function handle(req: Request) {
  const secret = process.env.SEED_SECRET;
  if (!secret) {
    return NextResponse.json(
      { error: "Seed désactivé. Définissez SEED_SECRET pour l'activer." },
      { status: 404 }
    );
  }

  const url = new URL(req.url);
  const provided = url.searchParams.get("key") ?? req.headers.get("x-seed-key");
  if (provided !== secret) {
    return NextResponse.json({ error: "Clé invalide." }, { status: 401 });
  }

  try {
    const result = await seedDatabase(prisma);
    return NextResponse.json({
      ok: true,
      message: "Base remplie avec les données de démonstration. 🐾",
      ...result,
      demoLogin: "pierre@example.ch / lea@example.ch (mot de passe : gustave123)",
    });
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { error: "Échec du seed.", detail: String(e) },
      { status: 500 }
    );
  }
}

export const GET = handle;
export const POST = handle;
