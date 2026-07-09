# DATABASE SCHEMA: Edge LMS 2030

## Core Principles
- Relational schema mindset is strictly enforced, even when using local mock data.
- Every tenant-specific record must relate directly to a `Company` record.
- Options sets (Enums) are used instead of free-text for statuses and roles to ensure reporting reliability.

## Core Entities

### 1. Company (Tenant Root)
- `id`: string (UUID)
- `name`: string
- `industry`: string
- `accountType`: string
- `isDemo`: boolean

### 2. User
- `id`: string (UUID)
- `email`: string
- `name`: string
- `companyId`: string (FK -> Company)
- `role`: enum [SuperAdmin, StrengthscapeAdmin, ContentAdmin, Consultant, ClientAdmin, ClientManager, Learner, Finance]
- `isActive`: boolean

### 3. Course
- `id`: string (UUID)
- `title`: string
- `description`: string
- `status`: enum [Draft, Published, Archived]
- `isInternal`: boolean

### 4. Module
- `id`: string (UUID)
- `courseId`: string (FK -> Course)
- `title`: string
- `orderIndex`: integer

### 5. Lesson
- `id`: string (UUID)
- `moduleId`: string (FK -> Module)
- `title`: string
- `type`: enum [Video, Text, PDF, Quiz, Reflection]
- `videoUrl`: string (Vimeo Link)
- `orderIndex`: integer

### 6. Enrollment
- `id`: string (UUID)
- `learnerId`: string (FK -> User)
- `courseId`: string (FK -> Course)
- `companyId`: string (FK -> Company)
- `status`: enum [NotStarted, InProgress, Completed, Overdue]
- `completionPercentage`: float

### 7. Progress
- `id`: string (UUID)
- `enrollmentId`: string (FK -> Enrollment)
- `lessonId`: string (FK -> Lesson)
- `completed`: boolean
- `completedAt`: DateTime

### 8. InsightResponse (Phase 2)
- `id`: string (UUID)
- `companyId`: string (FK -> Company)
- `question`: string
- `responseText`: text
- `submittedById`: string (FK -> User)
- `aiGenerated`: boolean
