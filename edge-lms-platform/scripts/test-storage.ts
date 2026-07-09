import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  try {
    const buckets = await prisma.$queryRaw`SELECT id, name, public FROM storage.buckets;`
    console.log("Buckets:", buckets)
  } catch (e) {
    console.error("Error:", e)
  }
}

main().finally(async () => await prisma.$disconnect())
