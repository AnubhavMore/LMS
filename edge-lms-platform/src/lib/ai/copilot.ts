import { GoogleGenAI } from '@google/genai';
import { buildCopilotSystemPrompt } from './systemPrompt';

export interface CopilotContext {
  courseTitle: string
  currentLessonTitle: string
  currentLessonContent?: string | null // the contentMarkdown of the active lesson
  currentLessonType: string
  keyTakeaway?: string
  conversationHistory: { role: string; content: string }[]
  modules?: any[]
}

export interface CopilotResponse {
  content: string
  suggestedFollowUps?: string[]
}

/**
 * Real LLM implementation using Gemini API.
 */
export async function generateCopilotResponse(context: CopilotContext): Promise<CopilotResponse> {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
    
    const systemInstruction = buildCopilotSystemPrompt({
      courseTitle: context.courseTitle,
      lessonTitle: context.currentLessonTitle,
      lessonContent: context.currentLessonContent,
      lessonType: context.currentLessonType,
      modules: context.modules,
    });

    const contents = context.conversationHistory.map((msg) => ({
      role: msg.role === "assistant" ? "model" : "user",
      parts: [{ text: msg.content }]
    }));

    // Generate response using gemini-2.5-flash, with a fallback to gemini-2.0-flash on 503
    let response;
    try {
      response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents,
        config: {
          systemInstruction,
          temperature: 0.7,
        }
      });
    } catch (e: any) {
      if (e?.status === 503 || e?.status === 429) {
        console.warn("gemini-2.5-flash unavailable, falling back to gemini-2.0-flash...");
        response = await ai.models.generateContent({
          model: 'gemini-2.0-flash',
          contents,
          config: {
            systemInstruction,
            temperature: 0.7,
          }
        });
      } else {
        throw e;
      }
    }

    const outputText = response.text || "I'm sorry, I couldn't generate a response.";

    // Fallback contextual follow-ups based on lesson type
    let suggestedFollowUps: string[] = [];
    if (context.currentLessonType === "Quiz") {
      suggestedFollowUps = ["Help me prepare", "What concepts should I review?"];
    } else {
      suggestedFollowUps = ["Summarize the key takeaway", "Explain the most complex part", "How does this apply to my job?"];
    }

    return {
      content: outputText,
      suggestedFollowUps
    };

  } catch (error) {
    console.error("Gemini API Error:", error);
    return {
      content: "I'm sorry, but I'm having trouble connecting to my AI core right now. Please try again in a moment.",
      suggestedFollowUps: ["Try again"]
    };
  }
}
