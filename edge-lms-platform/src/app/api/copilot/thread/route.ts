import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

// GET: List threads for a user (query param: userId)
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const userId = searchParams.get("userId")
  const courseId = searchParams.get("courseId")

  if (!userId) {
    return NextResponse.json({ error: "Missing userId" }, { status: 400 })
  }

  const where: any = { userId }
  if (courseId) {
    where.courseId = courseId
  }

  try {
    const threads = await prisma.copilotThread.findMany({
      where,
      orderBy: { updatedAt: "desc" },
    })
    return NextResponse.json(threads)
  } catch (error) {
    console.error("Error fetching threads:", error)
    return NextResponse.json({ error: "Failed to fetch threads" }, { status: 500 })
  }
}

// POST: Create a new thread
export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { userId, courseId, lessonId, title } = body

    if (!userId) {
      return NextResponse.json({ error: "Missing userId" }, { status: 400 })
    }

    // Ensure user exists to avoid foreign key constraint error
    await prisma.user.upsert({
      where: { id: userId },
      update: {},
      create: {
        id: userId,
        email: `${userId}@mock.edge-lms.com`,
        name: `Mock User (${userId})`,
        role: "Learner",
        companyId: "comp_acme" // Assuming a default for mock testing
      }
    })

    const thread = await prisma.copilotThread.create({
      data: {
        userId,
        courseId,
        lessonId,
        title: title || "New Chat",
      },
    })

    return NextResponse.json(thread)
  } catch (error) {
    console.error("Error creating thread:", error)
    return NextResponse.json({ error: "Failed to create thread" }, { status: 500 })
  }
}
