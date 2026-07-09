import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  try {
    await prisma.$executeRawUnsafe(`insert into public.users (id, email, name, role, company_id, created_at, updated_at) values ('test_id_999', 'test_auth999@acme.com', 'Test User', 'Learner'::"Role", 'de816d10a0c00bc7ccf6588d', now(), now())`)
    console.log('Success')
    await prisma.user.delete({where: {id: 'test_id_999'}})
  } catch(e) {
    console.error('Error:', e)
  }
}
main().finally(async () => await prisma.$disconnect())
