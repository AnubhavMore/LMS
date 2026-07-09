import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function POST(request: Request) {
  try {
    const { email, name } = await request.json()
    
    if (!email || !name) {
      return NextResponse.json({ error: "Email and name are required" }, { status: 400 })
    }

    // See if user exists
    let user = await prisma.user.findUnique({
      where: { email },
      include: { company: true }
    })

    if (!user) {
      // Find a default company or create one
      let company = await prisma.company.findFirst({
        where: { isInternal: false }
      })

      if (!company) {
        company = await prisma.company.create({
          data: {
            name: "Default Company",
            isInternal: false
          }
        })
      }

      user = await prisma.user.create({
        data: {
          email,
          name,
          role: "Learner",
          companyId: company.id
        },
        include: { company: true }
      })
    }

    const response = NextResponse.json({ success: true, user })
    
    // Set mock cookie
    response.cookies.set("edge_lms_user", JSON.stringify(user), { 
      path: "/",
      maxAge: 60 * 60 * 24 * 7 // 1 week
    })
    
    return response
  } catch (error) {
    console.error("Mock signup error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
