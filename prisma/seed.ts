// Runner CLI : `npm run db:seed`
// La logique de seed vit dans seed-data.ts (réutilisée aussi par /api/seed).
import { PrismaClient } from "@prisma/client";
import { seedDatabase } from "./seed-data";

const prisma = new PrismaClient();

seedDatabase(prisma)
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
