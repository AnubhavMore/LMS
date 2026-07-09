import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function POST(request: Request) {
  try {
    const { email, id } = await request.json()
    
    // Support either email or id
    const lookupId = email || id;
    
    if (!lookupId) {
      return NextResponse.json({ error: "Email or ID is required" }, { status: 400 })
    }

    const user = await prisma.user.findFirst({
      where: { 
        OR: [
          { email: lookupId },
          { id: lookupId }
        ]
      },
      include: { company: true }
    })

    if (!user) {
      return NextResponse.json({ error: "Invalid email" }, { status: 401 })
    }

    const response = NextResponse.json({ success: true, user })
    
    // Set mock cookie
    response.cookies.set("edge_lms_user", JSON.stringify(user), { 
      path: "/",
      maxAge: 60 * 60 * 24 * 7 // 1 week
    })
    
    return response
  } catch (error) {
    console.error("Mock login error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
