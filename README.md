# EDGE LMS Project

Welcome to the EDGE LMS monorepo. This repository contains the full source code for the EDGE LMS platform, as well as the complete set of architecture documents, blueprints, and handover prompts.

## 📂 Project Structure

This repository is split into three main components:

### 1. `edge-lms-app` (Frontend Application)
A React Single Page Application (SPA) built with Vite. 
- **Tech Stack**: React, Vite, Tailwind CSS.
- **Purpose**: Contains the frontend workspaces for Learners, Facilitators, Client Admins, and Super Admins.
- **How to run**:
  ```bash
  cd edge-lms-app
  npm install
  npm run dev
  ```
  It will usually be available at `http://localhost:5173`.

### 2. `edge-lms-platform` (Full-stack Platform)
A full-stack application built with Next.js (App Router), Prisma, and Supabase.
- **Tech Stack**: Next.js 16+, Prisma ORM, Supabase (PostgreSQL), Tailwind CSS.
- **Purpose**: Serves as the main backend and routing platform. Contains API endpoints, server-side rendering, and database integrations.
- **How to run**:
  ```bash
  cd edge-lms-platform
  npm install
  npm run dev
  ```
  It will usually be available at `http://localhost:3000`.

  > **⚠️ IMPORTANT DATABASE NOTE**: The `.env` file is currently configured to connect to a Supabase database that is paused or unreachable. To prevent the app from crashing on load, the `getCourses()` and `getCourseById()` functions in `src/lib/courses.ts` have been temporarily **mocked to return dummy data**. 
  > 
  > *Next steps for the developer:* You will need to either unpause the Supabase instance, provide a new `DATABASE_URL` in the `.env` file, or switch the Prisma schema to use a local SQLite database to restore full functionality. Additionally, client-side authentication redirects in `AuthContext.tsx` and `middleware.ts` have been temporarily bypassed so you can view the UI without logging in.

### 3. Documentation & Blueprints
The root of this repository contains multiple Word documents (`.docx`) and Markdown files (`.md`) that outline the full architectural strategy of the EDGE LMS 2030 project. This includes Data Architecture, System Architecture, Workflow, UI/UX Experience, and Commercial integrations.

## 📝 Handover Prompt
Please refer to the `antigravity_handover_prompt.md` file in the root directory. This contains the latest updated AI prompt and handover context outlining the exact state of the project, what has been built, and instructions for continuing development.
