# ARCHITECTURE: Edge LMS 2030

## Application Framework
- **Framework**: React / Next.js (App Router).
- **Language**: TypeScript (Strict mode enabled).
- **Styling**: Tailwind CSS utilizing the Strengthscape design tokens.
- **Database Strategy**: Relational schema mindset (using mock data in Phase 1 if DB is not attached, preparing for a relational DB like PostgreSQL and an ORM like Prisma).

## Architecture Principles
1. **Separation of Concerns**: 
   - Next.js acts as the experience and workflow shell.
   - It manages users, roles, tenants (companies), UI state, and permissions.
2. **External Delegation**:
   - Next.js should not handle heavy video streaming, payment processing, or complex AI processing natively.
   - Payments & Billing: Razorpay
   - Video Hosting: Vimeo
   - File Storage: Uploadcare / AWS S3
   - Automations / Background Workflows: Make (formerly Integromat)
   - AI Processing: Gemini / OpenAI API via secure server-side calls.

## Multi-Tenant Architecture
- Every query to the database MUST include a tenant filter (e.g., `where companyId = currentUser.companyId`).
- Admin/Super Admin access must verify the user's role explicitly on the server-side before serving data.

## Directory Structure Strategy
- `src/app/(auth)`: Unauthenticated routes (login, invitation accept).
- `src/app/(learner)`: Routes isolated for the Learner role (course player, dashboard).
- `src/app/(admin)`: Administrative views (client portal, super admin dashboards).
- `src/components/ui`: Base design system components (buttons, cards).
- `src/components/features`: Complex domain components (CoursePlayer, HeatMap).
- `src/lib`: Utilities, AI connectors, Auth configurations.
- `src/data/seed`: Mock/Seed data simulating realistic Strengthscape content.
