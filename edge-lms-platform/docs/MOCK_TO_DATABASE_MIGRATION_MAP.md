# Mock to Database Migration Map

This document maps the Phase 1 TypeScript interfaces (`src/types/schema.ts`) to Phase 2 Mongoose models.

## Core Tenets
1. Every collection (except `Company`, `User`, `RecommendationTemplate`, `ProgramTemplate`) **MUST** include a `companyId` field for strict tenant isolation.
2. String `id` fields in mock data will be replaced by MongoDB `ObjectId` types, mapped virtually to `id` in JSON responses to prevent breaking the frontend contracts.

## Model Mapping

| Phase 1 Interface | MongoDB Collection | Foreign Keys / References |
| :--- | :--- | :--- |
| `Company` | `companies` | None |
| `User` | `users` | `companyId`, `managerId` -> `users`, `teamId` |
| `ProgramTemplate` | `programTemplates` | None (Global Strengthscape assets) |
| `ProgramInstance` | `programInstances` | `companyId`, `programTemplateId`, `ownerId`, `facilitatorIds` |
| `Cohort` | `cohorts` | `programInstanceId`, `facilitatorId` |
| `Course` / `Module` / `Lesson` | `learningContent` | Generic parent-child relationships via `parentId`. |
| `Enrollment` | `enrollments` | `userId`, `programInstanceId`, `cohortId`, `courseId` |
| `ActionPlan` | `actionPlans` | `userId`, `programInstanceId`, `managerId` |
| `ManagerCheckIn` | `managerCheckIns` | `managerId`, `learnerUserId`, `actionPlanId` |
| `Certificate` | `certificates` | `userId`, `courseId`, `programInstanceId`, `companyId` |
| `DeliveryHandoff` | `deliveryHandoffs` | `companyId` |
| `IntegrationEvent`| `integrationEvents`| None |

## Frontend Contract Preservation
The frontend components expect specific property names (e.g. `programTemplateId` not `program_template_id`). Mongoose schemas must strictly enforce `camelCase` to match `src/types/schema.ts`. Mongoose's `.set('toJSON', { virtuals: true })` must be enabled on all models to ensure `_id` is serialized as `id`.
