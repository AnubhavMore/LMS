import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { generateCopilotResponse, CopilotContext } from "@/lib/ai/copilot"
import { buildCopilotSystemPrompt } from "@/lib/ai/systemPrompt"

// POST: Send a message and get AI response
export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { threadId, userId, message, courseContext } = body

    if (!threadId || !userId || !message || !courseContext) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // 1. Save user's message
    const userMessage = await prisma.copilotMessage.create({
      data: {
        threadId,
        role: "user",
        content: message,
      },
    })

    // 2. Fetch conversation history (last 20 messages)
    const history = await prisma.copilotMessage.findMany({
      where: { threadId },
      orderBy: { createdAt: "asc" },
      take: 20,
    })

    // 3. Optional: Map history and build system prompt 
    // (System prompt isn't used by the mock right now, but ready for real LLM)
    const systemPrompt = buildCopilotSystemPrompt({
      courseTitle: courseContext.courseTitle,
      lessonTitle: courseContext.lessonTitle,
      lessonContent: courseContext.lessonContent,
      lessonType: courseContext.lessonType,
      modules: courseContext.modules,
    })

    const conversationHistory = history.map((msg) => ({
      role: msg.role,
      content: msg.content,
    }))

    // 4. Build context for the AI
    const aiContext: CopilotContext = {
      courseTitle: courseContext.courseTitle,
      currentLessonTitle: courseContext.lessonTitle,
      currentLessonContent: courseContext.lessonContent,
      currentLessonType: courseContext.lessonType,
      keyTakeaway: courseContext.keyTakeaway,
      conversationHistory,
      modules: courseContext.modules,
    }

    // 5. Call AI Service (Mock or Real)
    const aiResponse = await generateCopilotResponse(aiContext)

    // 6. Save AI's response
    const assistantMessage = await prisma.copilotMessage.create({
      data: {
        threadId,
        role: "assistant",
        content: aiResponse.content,
      },
    })

    // Update the thread updatedAt timestamp
    await prisma.copilotThread.update({
      where: { id: threadId },
      data: { updatedAt: new Date() },
    })

    // 7. Return payload
    return NextResponse.json({
      userMessage,
      assistantMessage,
      suggestedFollowUps: aiResponse.suggestedFollowUps || [],
    })
  } catch (error) {
    console.error("Error in Copilot chat route:", error)
    return NextResponse.json({ error: "Failed to process chat message" }, { status: 500 })
  }
}
