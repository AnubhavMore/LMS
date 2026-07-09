const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function run() {
  try {
    const triggers = await prisma.$queryRawUnsafe(`
      SELECT trigger_name, event_object_table, action_statement 
      FROM information_schema.triggers 
      WHERE event_object_table = 'users' AND trigger_schema = 'auth'
    `);
    console.log("Triggers:", triggers);
  } catch (err) {
    console.error(err);
  } finally {
    await prisma.$disconnect();
  }
}

run();
