import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const userId = searchParams.get("userId")

  if (!userId) {
    return NextResponse.json({ error: "Missing userId" }, { status: 400 })
  }

  try {
    // Fetch all enrollments for this user
    const enrollments = await prisma.enrollment.findMany({ where: { userId } })

    const coursesWithProgress = []
    const seenCourses = new Set()

    for (const enrollment of enrollments) {
      const cohort = await prisma.cohort.findUnique({ where: { id: enrollment.cohortId } })
      if (!cohort) continue
      const programInstance = await prisma.programInstance.findUnique({ where: { id: cohort.programInstanceId } })
      if (!programInstance) continue

      // Find courses associated with this template
      const courses = await prisma.course.findMany({
        where: { programTemplateId: programInstance.programTemplateId },
        include: { modules: { include: { lessons: true } } }
      })

      for (const course of courses) {
        if (seenCourses.has(course.id)) continue
        seenCourses.add(course.id)

        const totalLessons = course.modules.reduce((acc, m) => acc + m.lessons.length, 0)

        // Count completed lessons using ProgressRecord
        let completedLessons = 0
        for (const m of course.modules) {
          for (const l of m.lessons) {
            const pr = await prisma.progressRecord.findFirst({
              where: { enrollmentId: enrollment.id, lessonId: l.id, completed: true }
            })
            if (pr) completedLessons++
          }
        }

        coursesWithProgress.push({
          course,
          enrollment,
          progress: {
            total: totalLessons,
            completed: completedLessons,
            percentage: totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0
          }
        })
      }
    }

    return NextResponse.json(coursesWithProgress)
  } catch (error) {
    console.error("Error fetching learner courses:", error)
    return NextResponse.json({ error: "Failed to fetch courses" }, { status: 500 })
  }
}
