# SECURITY RULES: Edge LMS 2030

## 1. Tenant Isolation (Most Critical Rule)
- Edge LMS is a multi-tenant platform. Every piece of client data MUST be owned by a `Company`.
- All database queries and server-side data fetching MUST filter by the current user's `companyId`.
- A Learner or Client Admin from Company A must never be able to see Company B's learners, courses, or reports—even if they manipulate URL parameters.

## 2. API Key Protection
- Secrets and API keys (Razorpay, Vimeo, AI providers) MUST be stored server-side only (e.g., inside `.env.local`).
- Under no circumstances should sensitive credentials be exposed to the browser or in client-side components.
- All requests to third-party services must be brokered through Next.js API Routes or Server Actions.

## 3. Role-Based Access Control (RBAC)
- Client-side navigation hiding is NOT security.
- Any attempt to access an administrative API route or server action must verify the user's role on the server.
- Super Admin actions must restrict execution to users explicitly carrying the `SuperAdmin` role.

## 4. Payment Access (Future Phase)
- Never grant paid access based solely on a frontend button click.
- Access activation must only occur after receiving and cryptographically verifying a webhook event from the payment provider (Razorpay).

## 5. Pre-Launch Validation
- The application must support running strict "Run As Role" tests.
- Cross-company isolation must be manually verified prior to any production deployment.
