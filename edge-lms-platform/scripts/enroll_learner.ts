import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()

async function main() {
  const userId = "usr_acme_lrn1"
  const companyId = "comp_strengthscape"
  
  // Upsert company
  await prisma.company.upsert({
    where: { id: companyId },
    update: {},
    create: {
      id: companyId,
      name: "Strengthscape"
    }
  })



  // Upsert the mock learner into the database to satisfy FK constraints
  await prisma.user.upsert({
    where: { id: userId },
    update: {},
    create: {
      id: userId,
      email: "learner_acme_2030@strengthscape.com",
      name: "Learner User",
      role: "Learner",
      companyId: companyId
    }
  })

  // Get all courses
  const courses = await prisma.course.findMany()
  console.log(`Found ${courses.length} courses...`)

  // Enroll the mock learner into all courses by creating necessary hierarchy
  for (const c of courses) {
    let templateId = c.programTemplateId
    if (!templateId) {
      const template = await prisma.programTemplate.create({
        data: {
          title: `${c.title} Template`,
          description: `Auto-generated template for ${c.title}`
        }
      })
      templateId = template.id
      await prisma.course.update({ where: { id: c.id }, data: { programTemplateId: templateId } })
    }

    // Create Program Instance
    const pi = await prisma.programInstance.create({
      data: {
        programTemplateId: templateId,
        companyId: companyId,
        name: `${c.title} Program Run`,
        status: "Active"
      }
    })

    // Create Cohort
    const cohort = await prisma.cohort.create({
      data: {
        programInstanceId: pi.id,
        name: "Learner Cohort"
      }
    })

    // Create Enrollment
    await prisma.enrollment.create({
      data: {
        userId,
        cohortId: cohort.id,
        companyId: companyId,
        programInstanceId: pi.id,
        status: "In Progress",
        progressPercentage: 0
      }
    })

    console.log(`Successfully enrolled Learner in: ${c.title}`)
  }
}

main().then(() => {
  console.log("Done!")
  process.exit(0)
}).catch(e => {
  console.error(e)
  process.exit(1)
})
