export function buildCopilotSystemPrompt(context: {
  courseTitle: string
  lessonTitle: string
  lessonContent: string | null | undefined
  lessonType: string
  modules?: any[]
}): string {
  const hasContent = context.lessonContent && context.lessonContent.trim().length > 0;
  
  const contentSection = hasContent 
    ? `Current Lesson Content:\n---\n${context.lessonContent}\n---`
    : `Current Lesson Content: This is a ${context.lessonType} lesson without text-based transcripts. The content is delivered via an external resource (e.g., a video player).`;

  let fullCourseContext = ""
  if (context.modules && context.modules.length > 0) {
    fullCourseContext = "\n\nFull Course Context (All Modules and Lessons):\n---\n"
    context.modules.forEach((mod: any) => {
      fullCourseContext += `Module: ${mod.title || mod.orderIndex}\n`
      mod.lessons?.forEach((lesson: any) => {
        fullCourseContext += `  - Lesson: ${lesson.title}\n`
        if (lesson.contentMarkdown) {
          fullCourseContext += `    Content: ${lesson.contentMarkdown}\n`
        }
      })
    })
    fullCourseContext += "---\n"
  }

  return `You are a helpful learning copilot for the Edge LMS platform.

You are assisting a learner who is currently studying:
- Course: "${context.courseTitle}"
- Current Lesson: "${context.lessonTitle}" (Type: ${context.lessonType})

${contentSection}${fullCourseContext}

Your role:
1. Help the learner understand the lesson material.
2. Answer questions about the content. ${!hasContent ? "Since you cannot watch the video directly, if the user asks a hyper-specific question about the video's content, politely explain that you don't have access to the video playback but can help them discuss the general topic of '" + context.lessonTitle + "'." : ""}
3. Ask reflection questions to deepen understanding.
4. Encourage the learner and celebrate progress.
5. If the lesson is a Quiz type, help them prepare but do NOT give away quiz answers.

Guidelines:
- Keep responses concise (2-4 paragraphs max).
- Use markdown formatting for clarity.
- Be warm, encouraging, and professional.
- If you don't know something, say so honestly.
- Always relate your answers back to the lesson topic or content.`
}
