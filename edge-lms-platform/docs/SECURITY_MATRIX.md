# Edge Learning & Delivery OS: Security & Routing Matrix

## Role-Based Access Control (RBAC) Matrix

| Role | Organization Scope | Access Level | Target Route / Dashboard |
|---|---|---|---|
| **SuperAdmin** | Global (All Tenants) | Full System Access | `/platform/control-centre` |
| **StrengthscapeAdmin** | Global (All Client Tenants) | Program & Content Management | `/platform/control-centre` |
| **ContentAdmin** | Internal Only | Template & Library Editing | `/platform/library` |
| **Consultant** | Assigned Cohorts/Companies | Facilitation, Session Management | `/consultant/programs` |
| **ClientAdmin** | Tenant Specific (Own Company) | User Mgmt, Global Reporting | `/admin/company-dashboard` |
| **ClientManager** | Tenant Specific (Own Team) | Team Reporting, Check-ins | `/admin/team` |
| **Learner** | Tenant Specific (Own Enrollments) | Course Consumption | `/learner/my-learning` |
| **Finance/Ops** | Global | Billing, Seats, Exceptions | `/platform/billing` |

## Tenant Isolation Strategy

1. **Authentication Context (`MockAuthContext`)**
   - The user's role and `companyId` are resolved at login.
   - The `ProtectedRoute` component intercepts navigation and validates the `role` before rendering the layout.

2. **Database Query Protection (`TenantSecurity`)**
   - All external data fetches MUST pass through the `TenantSecurity.enforceTenantQuery` helper.
   - This prevents parameter tampering. E.g., if a Client Admin tries to fetch `/api/reports?companyId=other_company`, the helper forcefully overrides `companyId` with the user's actual `companyId`.

3. **Audit Logging (`AuditLogger`)**
   - Critical system actions (creating cohorts, updating templates, viewing cross-tenant data) are logged with timestamps, user IDs, and target IDs to ensure compliance and traceability.
