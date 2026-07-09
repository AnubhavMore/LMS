# Phase 2 Backend Transition Plan

This document outlines the prompt sequence and strategy to migrate the Edge LMS from a static mock frontend to a live, production-ready Mongoose + NextAuth application.

## 1. Goal
Transition `src/lib/api.ts` to execute live database queries. Preserve the existing `src/types/schema.ts` as the source of truth for Mongoose models. Replace `MockAuthContext` with NextAuth.js. Ensure staging pilot readiness.

## 2. Constraints (Frozen)
- **Do not modify the UI/React components in `src/app/(app)`** unless strictly required to handle loading states or new NextAuth session hooks.
- **Do not rewrite `schema.ts`**. It accurately models the business domain.
- **Zero-token AI limitation remains**. Live AI will not be implemented yet.
- **Edge10 integration remains a stub** on the API layer (receive payload and log to DB, no outbound webhook).

## 3. Execution Prompts

### Prompt 14 — Database connection and Mongoose Models
**Goal:** Setup MongoDB and define schemas.
- Install `mongoose`.
- Create `src/lib/db/mongoose.ts` for connection pooling.
- Create Mongoose models in `src/models/` matching exactly to `schema.ts`.
- Build a seed script `scripts/seed.ts` that ports data from `src/data/seed/execution.ts` into MongoDB.

### Prompt 15 — Auth implementation and Tenant Middleware
**Goal:** Implement NextAuth.js.
- Install `next-auth`.
- Configure Credentials/Email providers.
- Extend NextAuth session type to include `role` and `companyId`.
- Replace `MockAuthContext` throughout the app.
- Ensure the `RoleSwitcher` component is disabled except in development.

### Prompt 16 — Learner Workspace API Migration
**Goal:** Hook up the learner frontend to MongoDB.
- Update `api.ts` functions: `getLearnerDashboard`, `getCourse`, `submitActionPlan`, `getLearnerCertificates`.
- Must securely filter all queries by `session.user.id`.

### Prompt 17 — Admin & Consultant API Migration
**Goal:** Hook up the operational frontends.
- Update `api.ts` functions: `getCompanyDashboard`, `getConsultantDashboard`, `getCohortReadiness`, `queueExpansionSignal`.
- Must securely filter queries by `session.companyId` or `session.user.id` (if facilitator).

### Prompt 18 — S3 Integration & Inngest Setup
**Goal:** Setup file uploads and background queues.
- Install AWS SDK and Inngest.
- Create an API route for presigned S3 URLs (certificates).
- Configure Inngest client to handle the `IntegrationEvent` processing queue (stubbed logic).
