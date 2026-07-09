# Database Schema Notes (Phase 2)

## Modeling Choices

### MongoDB & Prisma
We are using MongoDB via Prisma (`provider = "mongodb"`). Unlike PostgreSQL, MongoDB does not use strict foreign key constraints at the database engine level, but Prisma enforces these relations at the ORM application layer.
This gives us the schema safety of a SQL database with the document flexibility of MongoDB.

### ID Generation
All models use `@id @default(auto()) @map("_id") @db.ObjectId` mapped to a TypeScript `String`. This allows Prisma to automatically generate native MongoDB `ObjectIds` but interact with them as standard 24-character hexadecimal strings in our Next.js backend, preserving all existing frontend API contracts.

### Naming Conventions
- **Collections (Tables):** We use `snake_case` and plural names (e.g. `@@map("program_instances")`).
- **Fields (Columns):** We use `snake_case` in the database (e.g. `@map("company_id")`) but Prisma will expose them as `camelCase` (e.g. `companyId`) to match the exact `src/types/schema.ts` structures used in Phase 1.

### Soft Deletion
Core models (`Company`, `User`, `ProgramInstance`, `Certificate`) have a `deletedAt DateTime? @map("deleted_at")` field. When a user "deletes" an object, we will simply set this timestamp. We must ensure all Prisma queries append `{ deletedAt: null }` to exclude archived records.

### Tenant Isolation
Every model that belongs to a specific tenant has a `companyId` field that references the `Company` model. 
Global models (like `ProgramTemplate` and `RecommendationTemplate`) intentionally lack a `companyId` because they are owned by Strengthscape globally. 
The `Enrollment`, `Certificate`, and `Team` models also have direct `companyId` fields rather than only relying on joining through a `ProgramInstance` or `User`. This denormalization makes multi-tenant read queries faster and safer.
