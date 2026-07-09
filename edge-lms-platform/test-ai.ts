import { generateCopilotResponse } from './src/lib/ai/copilot';
import * as dotenv from 'dotenv';
dotenv.config({ path: '.env' });

async function test() {
  const response = await generateCopilotResponse({
    courseTitle: "Test Course",
    currentLessonTitle: "Test Lesson",
    currentLessonContent: "The secret password is 'BANANA'. The capital of France is Paris.",
    currentLessonType: "Text",
    conversationHistory: [
      { role: "user", content: "What is the secret password?" }
    ]
  });
  console.log(response);
}

test();
