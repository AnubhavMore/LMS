import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  const users = await prisma.user.findMany({ select: { id: true, email: true, name: true } });
  
  // Find test emails to delete
  const testUsers = users.filter(u => 
    u.email === 'learner@strengthscape.com' || 
    u.email === 'learner_acme_2030@strengthscape.com'
  );

  console.log("All users:", users.map(u => u.email));
  console.log("Test users to delete:", testUsers.map(u => u.email));

  if (testUsers.length > 0) {
    const userIds = testUsers.map(u => u.id);
    
    // Delete enrollments first
    await prisma.enrollment.deleteMany({
      where: { userId: { in: userIds } }
    });
    
    const res = await prisma.user.deleteMany({
      where: {
        id: { in: userIds }
      }
    });
    console.log("Deleted users count:", res.count);
  }
}

main().finally(() => prisma.$disconnect());
