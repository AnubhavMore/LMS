# Production Architecture Decisions

## Stack Selection (Phase 2)
The following technologies were explicitly chosen by the client during the Phase 1 handover to transition the prototype to a Staging Pilot.

| Layer | Technology | Justification |
| :--- | :--- | :--- |
| **Framework** | Next.js (App Router) | Existing Phase 1 foundation; best-in-class React framework. |
| **Database** | MongoDB | Document store flexibility is ideal for dynamic recommendation templates and deep LMS session telemetry. |
| **ORM / Models** | Mongoose | Industry standard for MongoDB. Enforces schema validations that map directly to our TypeScript types. |
| **Authentication** | NextAuth.js (Auth.js) | Flexible authentication provider. We will start with Email/Password (Credentials) and Magic Links (Email provider), which natively supports future SAML/SSO integration for enterprise tenants. |
| **Hosting** | Vercel | Seamless integration with Next.js, Edge functions, and zero-config deployment. |
| **File Storage** | AWS S3 | Standard for massive object storage. We will use signed URLs to serve PDFs and SCORM assets securely without routing through the Vercel edge. |
| **Background Jobs** | Inngest | Vercel-friendly event-driven queue. Does not require provisioning a separate Redis cluster like BullMQ. |
| **Transactional Email** | Resend | Modern email API that uses React Email to construct beautiful HTML templates (e.g. Action Plan reminders). |

## Integration Strategy
- **Edge10 & Zoho CRM:** Will remain as safe API stubs during the staging pilot. The application will store `IntegrationEvent` records in MongoDB, but the Inngest workers will simply log them as "Processed" without pushing actual API calls to external systems to prevent staging data pollution.

## Security Controls
- **Tenant Isolation:** Staging will enforce multi-tenant separation at the API layer. A client admin for `Company A` will only be able to query MongoDB documents where `companyId === session.user.companyId`.
