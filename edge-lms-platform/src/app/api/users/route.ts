import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const role = searchParams.get("role")

    const users = await prisma.user.findMany({
      where: role ? { role } : undefined,
      include: {
        company: true,
        enrollments: { include: { programInstance: true } }
      },
      orderBy: {
        createdAt: "desc"
      }
    })

    return NextResponse.json({ users })
  } catch (error) {
    console.error("Users API GET Error:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get("id")

    if (!userId) {
      return NextResponse.json({ error: "Missing user ID" }, { status: 400 })
    }

    // Must delete related records manually or rely on cascading deletes if configured in schema.
    // Based on previous issues, deleting progress records, enrollments, forms, etc might be needed.
    // Assuming cascading is partially broken, we'll manually clean up some records first.
    
    await prisma.enrollment.deleteMany({
      where: { userId }
    })
    
    await prisma.progressRecord.deleteMany({
      where: { userId }
    })
    
    await prisma.quizAttempt.deleteMany({
      where: { userId }
    })
    
    await prisma.formSubmission.deleteMany({
      where: { userId }
    })
    
    await prisma.copilotThread.deleteMany({
      where: { userId }
    })

    await prisma.user.delete({
      where: { id: userId }
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Users API DELETE Error:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}
