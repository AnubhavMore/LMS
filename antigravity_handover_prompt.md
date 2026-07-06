# EDGE LMS Platform: Context & Next Phase Prompt

**Instructions for Antigravity (or any AI Assistant):**
You are acting as an expert Next.js 16.2.6, Prisma, and Tailwind CSS developer. The user already has all the files from GitHub related to this project locally on their machine. You do not need to clone the repository. Read the "Current State" carefully, understand the architecture, and then execute the "Next Phase Tasks" requested at the bottom.

---

## 1. Project Architecture & Stack
- **Framework:** Next.js 16.2.6 (App Router, Turbopack)
- **Database / ORM:** PostgreSQL (hosted on Supabase) managed via Prisma (`schema.prisma`)
- **Styling:** Tailwind CSS with standard UI components (Lucide React icons, custom Buttons/Cards)
- **Authentication:** Currently utilizing a "Mock Authentication" flow (`AuthContext.tsx`). The app queries the database via an API route (`/api/auth/mock-login`) and sets a cookie (`edge_lms_user`) to simulate login. This bypasses complex magic-link setups for development simplicity.
- **Video Processing:** Native HTML5 `<video>` tags and `react-youtube` for robust YouTube iframe API integration.
- **AI Integrations:** Integrated with Google Gemini API (`@google/genai`) for a Learner Copilot chatbot.

---

## 2. What We Have Built So Far (Current State)

### A. Mock Authentication & Role Switching
- We reverted a complex Supabase Magic Link authentication system back to a reliable Mock Authentication flow.
- A `RoleSwitcher` component in the UI allows instantly swapping between different roles (Admin, Learner, Manager) by querying valid emails from the database and updating the `AuthContext` cookie.

### B. Learner Copilot (AI Chatbot)
- We built a floating AI Copilot chat interface (`CopilotChat.tsx`) powered by Google's Gemini API (`gemini-2.5-flash` with automatic fallback to `gemini-2.0-flash` on `503 Unavailable` or `429 Too Many Requests` errors).
- **Context Injection:** The Copilot is deeply integrated into the course player. It reads the full transcripts and text content of *all modules and lessons* within the course to provide highly accurate, contextual answers.

### C. Database Connection Stability
- Addressed Supabase `pgBouncer` transaction pooler issues by updating the `.env` to connect directly to the database via port `5432`. This resolved "Server has closed the connection" and connection pool exhaustion errors during Next.js hot-reloads.

### D. Learner Quiz Engine & Video Tracking
- A fully functional Quiz engine inside the course player (`QuizPlayer.tsx`) that logs `QuizAttempts` and tracks scores.
- Video playback tracking (via `react-youtube` `onEnd` events) that securely records progress via `markLessonComplete` server actions.

---

## 3. Next Phase Tasks (Your Mission)

Please review the codebase and execute the following tasks. Begin by creating an implementation plan.

### Task 1: Bug Squashing & Polish
**Objective:** Perform a comprehensive sweep of the application to identify and remove any remaining bugs.
- Verify that course allotment triggers work correctly with the mock auth users.
- Ensure that UI elements (dashboards, sidebars) render gracefully when data is missing or empty.
- Check the console for any React hydration errors or unhandled promise rejections and fix them.

### Task 2: Extra Feature Implementation
**Objective:** Identify and add low-effort, high-impact features that enhance the learning experience.
- Suggest and implement 1-2 extra features (e.g., a simple certificate generation view for completed courses, or an admin dashboard widget showing course completion stats).

### Task 3: Production Deployment (Hosting)
**Objective:** Host this project so it is accessible over the internet for all users (Admins, Learners, etc.).
- Prepare the Next.js application for deployment (e.g., Vercel).
- Ensure environment variables (`DATABASE_URL`, `DIRECT_URL`, `GEMINI_API_KEY`, etc.) are properly documented for the deployment platform.
- Make any necessary code changes to ensure the build script (`npm run build`) passes cleanly without TypeScript or Prisma generation errors.
- Provide the user with exact, step-by-step instructions on how to push this code to Vercel and connect their Supabase database for production use.
