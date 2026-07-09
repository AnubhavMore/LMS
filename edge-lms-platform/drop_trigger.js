const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function run() {
  try {
    await prisma.$executeRawUnsafe(`DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;`);
    await prisma.$executeRawUnsafe(`DROP FUNCTION IF EXISTS public.handle_new_user();`);
    console.log("Trigger and function dropped successfully.");
  } catch(e) {
    console.error(e);
  } finally {
    await prisma.$disconnect();
  }
}

run();
