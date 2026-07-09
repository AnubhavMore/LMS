import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { companyId, courseId, emails } = body

    if (!courseId || !emails) {
      return NextResponse.json({ error: "Missing required fields: courseId and emails are required" }, { status: 400 })
    }

    const emailList = emails.split(",").map((e: string) => e.trim()).filter((e: string) => e.length > 0)
    if (emailList.length === 0) {
      return NextResponse.json({ error: "No valid emails provided" }, { status: 400 })
    }

    // Fetch the course and program template
    const course = await prisma.course.findUnique({
      where: { id: courseId },
      include: { programTemplate: true }
    })

    if (!course) {
      return NextResponse.json({ error: "Course not found" }, { status: 404 })
    }

    // Resolve companyId: use provided one, or fall back to a default
    let resolvedCompanyId = companyId
    if (!resolvedCompanyId) {
      // Use the first non-internal company, or the first company available
      const defaultCompany = await prisma.company.findFirst({
        where: { isInternal: false },
        orderBy: { name: "asc" }
      })
      if (!defaultCompany) {
        return NextResponse.json({ error: "No company found. Please create a company first." }, { status: 400 })
      }
      resolvedCompanyId = defaultCompany.id
    }

    // Ensure a ProgramInstance exists for this company + programTemplate
    const programTemplateId = course.programTemplateId
    if (!programTemplateId) {
      return NextResponse.json({ error: "Course has no linked program template" }, { status: 400 })
    }

    let programInstance = await prisma.programInstance.findFirst({
      where: { companyId: resolvedCompanyId, programTemplateId }
    })

    if (!programInstance) {
      programInstance = await prisma.programInstance.create({
        data: {
          companyId: resolvedCompanyId,
          programTemplateId,
          name: `${course.programTemplate?.title || course.title} - ${new Date().getFullYear()}`,
          status: "Active"
        }
      })
    }

    // Ensure a default Cohort exists for this instance
    let cohort = await prisma.cohort.findFirst({
      where: { programInstanceId: programInstance.id }
    })

    if (!cohort) {
      cohort = await prisma.cohort.create({
        data: {
          programInstanceId: programInstance.id,
          name: "General Cohort"
        }
      })
    }

    // Process each user
    let enrolledCount = 0
    const results: { email: string; status: string }[] = []

    for (const email of emailList) {
      try {
        // Create or find user
        const user = await prisma.user.upsert({
          where: { email },
          update: {},
          create: {
            email,
            name: email.split("@")[0],
            role: "Learner",
            companyId: resolvedCompanyId
          }
        })

        // Create enrollment if it doesn't exist
        const existingEnrollment = await prisma.enrollment.findFirst({
          where: { userId: user.id, cohortId: cohort.id }
        })

        if (!existingEnrollment) {
          await prisma.enrollment.create({
            data: {
              userId: user.id,
              cohortId: cohort.id,
              companyId: resolvedCompanyId,
              programInstanceId: programInstance.id,
              status: "In Progress",
              progressPercentage: 0
            }
          })
          enrolledCount++
          results.push({ email, status: "enrolled" })
        } else {
          results.push({ email, status: "already_enrolled" })
        }
      } catch (userError) {
        console.error(`Error enrolling ${email}:`, userError)
        results.push({ email, status: "error" })
      }
    }

    return NextResponse.json({ 
      success: true, 
      enrolledCount,
      totalProcessed: emailList.length,
      results
    })
  } catch (error) {
    console.error("Enrollment API Error:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const enrollmentId = searchParams.get("id")

    if (!enrollmentId) {
      return NextResponse.json({ error: "Missing enrollment ID" }, { status: 400 })
    }

    // Delete the enrollment
    await prisma.enrollment.delete({
      where: { id: enrollmentId }
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Delete Enrollment API Error:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}
