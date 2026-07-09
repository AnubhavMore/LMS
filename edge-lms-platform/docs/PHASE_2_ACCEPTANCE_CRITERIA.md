# Phase 2 Acceptance Criteria

The backend staging pilot will be considered successful when the following criteria are met:

## 1. Database & Schema
- [ ] MongoDB is connected via Mongoose.
- [ ] All 12 core models are defined and strictly typed to match `schema.ts`.
- [ ] A seed script successfully populates the MongoDB instance with the `execution.ts` test data.

## 2. Authentication
- [ ] NextAuth.js successfully authenticates users via Email/Password.
- [ ] The `RoleSwitcher` component is completely hidden or disabled if `NODE_ENV === "production"`.
- [ ] Unauthorized users are redirected to `/login` via middleware.

## 3. The API Layer
- [ ] Every function in `src/lib/api.ts` (or its Server Action equivalent) queries MongoDB instead of the static arrays.
- [ ] Tenant isolation checks (`session.companyId`) are enforced on all Client Admin queries.
- [ ] Manager queries successfully enforce `managerId` restrictions.

## 4. UI Stability
- [ ] No frontend routes break or throw `500` errors due to schema mismatches.
- [ ] All dashboards, tables, and detail drawers render identical information to Phase 1, but sourced from MongoDB.

## 5. Infrastructure
- [ ] Inngest is configured and successfully processes a mock `IntegrationEvent` queue.
- [ ] AWS S3 client is configured and can generate presigned URLs.
- [ ] Application is successfully deployed to a Vercel staging environment.
