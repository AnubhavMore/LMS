import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()

async function main() {
  const enrollments = await prisma.enrollment.findMany({
    include: { user: true }
  })
  console.log("Total Enrollments:", enrollments.length)
  if (enrollments.length > 0) {
    console.log("First enrollment:", enrollments[0].user?.email)
  }
}
main()
