# ACCEPTANCE CRITERIA: Edge LMS 2030

## Core Functionality Tests (Definition of Done)

### 1. User Invitation
- **Criteria**: An admin invites a user by email. The user receives the email, clicks the link, sets a password, logs in, and sees the correct dashboard corresponding exactly to their assigned role.

### 2. Multi-Tenant Isolation (Critical)
- **Criteria**: A learner from Company A logs in and cannot see any data (users, courses, insights) from Company B. Searches return scoped results only. Direct URL manipulation attempts must be rejected or redirected.

### 3. Course Completion
- **Criteria**: A learner completes all lessons and passes required quizzes. The system definitively marks the course complete, rendering the completion marker persistent across refresh, logout, and role switching. A certificate is generated.

### 4. Payment Flow (When Integrated)
- **Criteria**: A client pays via Razorpay. The system grants access ONLY after the payment webhook arrives and is validated. The admin receives a welcome email and immediate access. Failed or paused payments must restrict or suspend access accurately.

### 5. Report Export
- **Criteria**: An admin filters the completion report and clicks Export CSV. The downloaded file contains exactly the filtered data visible on the screen, adhering strictly to the user's role permissions.

### 6. AI Insight Request (Phase 2)
- **Criteria**: An admin selects a predefined question, role, and challenge. A structured AI response appears, is stored in history, and is irrevocably tied to the tenant's data scope. No open-ended generative chat is permitted.
