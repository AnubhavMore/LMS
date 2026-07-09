# Auth and Tenant Isolation Plan

## High-Risk Tenant Isolation Points
Because Edge LMS is a B2B SaaS application, data leakage between tenants (companies) is a critical security vulnerability. 

### 1. The Session Context
NextAuth.js will be configured to extend the standard session object. Upon successful login, the JWT callback must embed:
- `userId` (ObjectId)
- `role` (Learner, ClientAdmin, Consultant, etc.)
- `companyId` (ObjectId)
- `managerId` (ObjectId, if applicable)

### 2. API Route Protection (Server-Side)
The Phase 1 mock `api.ts` inherently trusted the `id` parameters passed by the client. In Phase 2, this MUST be stopped.
All database queries must enforce the following multi-tenant filters automatically based on the caller's session:

**Learner Restrictions:**
```javascript
// MUST ALWAYS INCLUDE:
{ _id: requestedId, userId: session.user.id }
```

**Client Admin Restrictions:**
```javascript
// MUST ALWAYS INCLUDE:
{ _id: requestedId, companyId: session.user.companyId }
```

**Manager Restrictions:**
```javascript
// MUST ALWAYS INCLUDE:
{ _id: requestedId, managerId: session.user.id }
```

### 3. Edge Cases
- **Consultants:** A consultant does not belong to a specific client company, but rather to Strengthscape. However, they are assigned to `ProgramInstances`. Their queries must filter by `programInstanceId { $in: assignedProgramIds }`.
- **Global Assets:** Courses, Modules, and RecommendationTemplates do not have a `companyId`. They are global read-only assets. Queries for these do not need tenant isolation checks, but write-operations must be strictly protected by a `role === "ContentAdmin"` or `role === "StrengthscapeAdmin"` check.
