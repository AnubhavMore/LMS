import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  try {
    await prisma.user.create({
      data: {
        id: 'test_uuid_123',
        email: 'test_trigger@acme.com',
        name: 'Test Trigger',
        role: 'Learner',
        companyId: 'comp_acme'
      }
    })
    console.log('Success!')
    
    await prisma.user.delete({
      where: { id: 'test_uuid_123' }
    })
  } catch (e) {
    console.error('Error:', e)
  }
}

main().finally(async () => await prisma.$disconnect())
