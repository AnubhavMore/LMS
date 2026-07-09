import { PrismaClient } from '@prisma/client';
import { YoutubeTranscript } from 'youtube-transcript';
import { GoogleGenAI } from '@google/genai';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env' });
const prisma = new PrismaClient();
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

async function processVideoLessons() {
  console.log("Fetching Video lessons without contentMarkdown...");
  const lessons = await prisma.lesson.findMany({
    where: {
      type: 'Video',
      OR: [
        { contentMarkdown: null },
        { contentMarkdown: '' }
      ],
      videoUrl: { not: null }
    }
  });

  if (lessons.length === 0) {
    console.log("No video lessons need processing.");
    return;
  }

  console.log(`Found ${lessons.length} video lessons to process.`);

  for (const lesson of lessons) {
    if (!lesson.videoUrl || !lesson.videoUrl.includes('youtu')) {
      console.log(`Skipping lesson ${lesson.id} - not a YouTube URL (${lesson.videoUrl})`);
      continue;
    }

    try {
      console.log(`\nProcessing: "${lesson.title}" (${lesson.videoUrl})`);
      
      // 1. Fetch transcript from YouTube
      console.log(`Fetching transcript...`);
      const transcriptRaw = await YoutubeTranscript.fetchTranscript(lesson.videoUrl);
      const fullText = transcriptRaw.map(t => t.text).join(' ');
      
      if (!fullText) {
        console.log("No transcript found.");
        continue;
      }

      console.log(`Transcript fetched (${fullText.length} characters). Summarizing with Gemini...`);

      // 2. Ask Gemini to format it nicely into Markdown
      const prompt = `
I have the raw subtitle transcript from an educational video lesson titled "${lesson.title}".
Please summarize this transcript and format it into clean, professional Markdown. 
Include headings, bullet points, and highlight the key takeaways. Do not include timestamps.

Raw Transcript:
${fullText}
`;

      // Retry logic for Gemini API
      let markdownOutput = null;
      let retries = 3;
      while (retries > 0) {
        try {
          const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt
          });
          markdownOutput = response.text;
          break; // Success, exit retry loop
        } catch (e: any) {
          if (e.status === 503) {
            console.log(`Model overloaded (503). Retrying in 5 seconds... (${retries} retries left)`);
            await new Promise(res => setTimeout(res, 5000));
            retries--;
          } else {
            throw e; // Throw other errors immediately
          }
        }
      }

      if (!markdownOutput) {
        console.error("Gemini returned empty output or failed after retries.");
        continue;
      }

      // 3. Save to database
      await prisma.lesson.update({
        where: { id: lesson.id },
        data: { contentMarkdown: markdownOutput }
      });

      console.log(`Successfully generated and saved contentMarkdown for "${lesson.title}".`);

    } catch (error) {
      console.error(`Failed to process lesson ${lesson.title}:`, error);
    }
  }

  console.log("\nDone processing all video lessons!");
}

processVideoLessons()
  .then(() => prisma.$disconnect())
  .catch(e => {
    console.error(e);
    prisma.$disconnect();
    process.exit(1);
  });
