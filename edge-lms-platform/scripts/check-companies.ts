import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const companies = await prisma.company.findMany();
  console.log("Companies:", companies.map(c => c.id));
}

main().finally(async () => await prisma.$disconnect())
