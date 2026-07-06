**EDGE LMS 2030**

**Chapter 5**

**Workflow Architecture, Automation Logic,\
and Operational Process Design**

*Developer-facing specification for Devansh • Bubble-first, minimal-code, API-orchestrated build*

|**Purpose of this chapter**<br>Define the operational workflows that make Edge LMS work reliably at scale: onboarding, enrollment, payment activation, learning progression, AI insight generation, notifications, reporting refresh, certificate issuance, and escalation paths.|
| :- |

# **5.1 Overview Chart**

|**Workflow Domain**|**Primary Trigger**|**Primary System Owner**|**Design Intent**|
| :- | :- | :- | :- |
|Access & Identity|Invite, signup, role change, subscription activation|Bubble|Create secure tenant-aware access without manual cleanup|
|Learning Assignment|Manual assignment, bulk assignment, auto-enrollment rule|Bubble|Ensure the right learner sees the right journey at the right time|
|Course Consumption|Lesson complete, quiz submit, inactivity, deadline breach|Bubble|Track progress accurately and support nudges before learners fall behind|
|Commerce & Billing|Razorpay payment, renewal, failure, refund, seat expansion|Razorpay + Make|Convert money events into account state changes with minimal ops work|
|AI Insight Engine|Assessment upload, dropdown question, context selection|Bubble + AI API|Generate controlled consulting-grade outputs rather than generic chatbot replies|
|Certificates & Compliance|Completion threshold, quiz pass, validity date, re-certification due|Bubble + Make|Automate issue, revoke, renew, and evidence trails|
|Reporting & Heat Maps|Schedule, completion event, admin refresh request|Bubble + background workflows|Keep dashboards fast while avoiding real-time reporting overload|
|Escalations & Support|Payment failure, stalled upload, AI error, permission mismatch|Bubble + Make|Route exceptions predictably so the product remains usable and trustworthy|
# **5.2 Workflow Design Principles**
Edge LMS should be built as a workflow-led system rather than a page-led system. Pages are the visible layer, but trust, scalability, and operational ease come from what happens when a trigger fires, what object changes state, what automations run, and what exceptions are handled without human intervention.

- Every workflow must begin from a clear trigger and end at a stored, auditable state.
- No workflow should rely on a hidden human step if the same step can be automated via Bubble backend workflows or Make.
- All workflows that can create billing, access, or compliance disputes must leave an evidence trail.
- User-facing workflows must feel immediate; heavy workflows should run asynchronously and update status cleanly.
- Devansh should prefer reusable workflow modules over page-specific one-off logic.

|<p>**Minimal-code build doctrine**</p><p>- - Use Bubble backend workflows for internal orchestration first.</p><p>- - Use Make only when the trigger or action sits outside Bubble, or when multi-system logic becomes visually messy inside Bubble.</p><p>- - Use AI to generate payload schemas, test cases, naming conventions, and repetitive workflow documentation—not to improvise core architecture.</p>|
| :- |

# **5.3 Master Workflow Framework**
Each critical process in Edge LMS should be described using the same frame so that implementation remains consistent across modules.

|**Step**|**Question to Answer**|**Bubble Object**|**Automation Layer**|**Failure Mode to Capture**|
| :- | :- | :- | :- | :- |
|Trigger|What starts the process?|User, Company, Enrollment, PaymentRecord, AIRequest|Bubble/Make|Duplicate start, missing trigger data|
|Validation|What must be true before proceeding?|Any source object|Bubble|Permission mismatch, missing foreign key, invalid status|
|State Change|What object status is written?|Target object|Bubble|Half-complete state, race condition|
|Side Effects|What else is created, updated, or notified?|Logs, emails, tasks, reports|Bubble/Make|Unsent email, broken webhook, stale report|
|Recovery|What happens if external service fails?|ErrorLog, RetryQueue|Bubble/Make|Silent failure, duplicate retry|
# **5.4 Identity, Invitation, and Access Workflows**

|Invite single learner|Bulk invite learners|Accept invite and set password|Manual role update|Automatic activation after payment|Suspension for non-payment or admin action|
| :-: | :-: | :-: | :-: | :-: | :-: |

The access layer is the first workflow group Devansh should stabilize because every later workflow assumes identity, tenant separation, and role visibility are already correct.
## **Recommended object sequence**
- Create User shell record with status = Invited.
- Create CompanyUser link or equivalent tenant binding before the invite is sent.
- Store invited role, invited by, source campaign/client, and invite expiry timestamp.
- On invite accept, change status to Active only after password is set and company binding is verified.
- For payment-led self-serve signups, activation should occur only after Razorpay webhook confirmation, not merely after front-end redirect.
## **Failure handling**
- Expired invite should route to a resend screen, not to a dead-end error.
- Duplicate email should merge into existing user logic instead of creating tenant confusion.
- If payment succeeds but user creation fails, Make should retry or notify admin with a clear task object.

# **5.5 Learning Assignment and Enrollment Workflows**

|Assign course|Assign learning path|Bulk assign by team|Auto-enroll after plan activation|Re-open course|Seat validation|
| :-: | :-: | :-: | :-: | :-: | :-: |

This workflow family determines who sees what. It must be deterministic, query-efficient, and auditable.
## **Core logic**
- Assignments should write to Enrollment records rather than only to user fields.
- Every Enrollment should store source type: manual, bulk, automated, imported, or payment-linked.
- Deadline logic should be stored at Enrollment level, not Course level, so the same course can behave differently for different cohorts.
- Learning paths should create child enrollments or path-step records rather than forcing page logic to infer sequencing.
## **Minimum statuses**
- Not Started
- In Progress
- Completed
- Overdue
- Locked
- Archived
- Reassigned

# **5.6 Course Progression, Quiz, and Completion Workflows**

|Lesson viewed|Lesson marked complete|Quiz submitted|Retake allowed|Course complete|Path complete|
| :-: | :-: | :-: | :-: | :-: | :-: |

Progress logic should feel simple to learners but be exact in the database. Completion should never be calculated only on the fly if certificates, dashboards, and nudges depend on it.
## **Design rules**
- Each lesson completion must create or update a ProgressRecord.
- Quiz attempts should be stored separately from lesson completion state to preserve review history.
- Course completion should be a saved status change triggered once rules are satisfied, not a UI-only calculation.
- If the course requires a passing score, completion should wait until the pass condition is met.
- If recertification applies, a validity end date should be written at completion time.

# **5.7 Commerce and Billing Workflows**

|One-time purchase|Subscription start|Renewal success|Renewal failure|Seat expansion|Refund or cancellation|
| :-: | :-: | :-: | :-: | :-: | :-: |

Commerce is not just money collection; it is entitlement logic. Devansh should treat payment events as system-of-record triggers that alter plan state, seat availability, and access rules.
## **Recommended orchestration**
- Bubble handles checkout initiation and product selection UI.
- Razorpay handles payment event truth.
- Make receives webhooks and normalizes them into a standard event structure.
- Bubble backend workflows apply account, seat, and access changes using that normalized event.
## **Non-negotiable statuses**
- Payment Pending
- Payment Captured
- Subscription Active
- Subscription Past Due
- Cancelled
- Refunded
- Manual Review

# **5.8 AI Insight and Assessment-Linked Guidance Workflows**

|Assessment upload|Question selection|AI request creation|Response save|Human review optional|Export later|
| :-: | :-: | :-: | :-: | :-: | :-: |

The AI layer should feel intelligent without becoming uncontrolled. The standard dropdown-question model is ideal because it constrains the query space and allows prompt engineering that is more reliable than open prompting.
## **Required interaction sequence**
- User uploads or selects assessment source.
- User selects role or challenge context.
- User picks one of the 10 standard dropdown questions.
- Bubble creates AIInsightRequest with source references and parameters.
- AI service returns structured answer sections, not only one unformatted paragraph.
- Bubble saves both concise and expanded response versions.
## **Output blocks recommended**
- Executive answer
- Recommended rituals or actions
- Manager talking points
- 30-60-90 day direction
- Risks to watch
- Suggested follow-up learning modules

# **5.9 Notification, Reminder, and Escalation Workflows**

|Invite reminder|Overdue nudge|Manager alert|Payment failure notice|Certificate issue mail|AI failure alert|
| :-: | :-: | :-: | :-: | :-: | :-: |

Edge LMS should be proactive. The system should not wait for humans to notice that users are stalled, invoices failed, or certificates were not delivered.
## **Best practice**
- Use a NotificationLog object to prevent duplicate sends and to support auditability.
- Create reminder windows based on enrollment due date and inactivity thresholds.
- Escalate to manager or client admin only after learner-level nudges have failed.
- All failed external sends should write to an error queue rather than disappearing silently.

# **5.10 Reporting, Heat Map Refresh, and Snapshot Workflows**

|Daily refresh|On-demand refresh|Cohort completion update|Heat map calculation|Export request|
| :-: | :-: | :-: | :-: | :-: |

Real-time dashboards are attractive but expensive in Bubble. A snapshot strategy will make the platform faster and easier to maintain.
## **Recommended reporting pattern**
- Event-driven records update source facts immediately.
- Summary tables or snapshot objects refresh on schedule or after key milestones.
- Heat maps should read from summary objects, not raw progress tables whenever possible.
- Exports should be generated asynchronously and surfaced through a ready-to-download status.

# **5.11 Certificate, Recertification, and Compliance Workflows**

|Eligibility met|Certificate generated|Validity expiry approaching|Recertification assigned|Certificate revoked|
| :-: | :-: | :-: | :-: | :-: |

Certificates are part learning artifact, part compliance evidence. This workflow must support both graceful learner experience and rigorous auditability.
## **Core states**
- Eligible
- Issued
- Delivered
- Expiring Soon
- Expired
- Revoked
- Reissued
## **Implementation notes**
- Generate certificate data first, then render PDF.
- Store certificate ID and hash or verification token for future validation.
- If validity exists, create future reminder jobs at issuance time.

# **5.12 Error Management and Retry Architecture**
Devansh should build a lightweight operational resilience layer even in Bubble. This does not need enterprise-grade microservices, but it does need predictable retry behavior, clear statuses, and visibility into what failed.

|**Error Type**|**Example**|**Immediate Response**|**Recovery Pattern**|
| :- | :- | :- | :- |
|External webhook failure|Razorpay webhook not processed|Log event + flag account review|Retry via Make and notify admin if threshold exceeded|
|AI timeout|Assessment insight response delayed|Show processing state to user|Retry request or allow admin re-run|
|File processing error|Assessment PDF upload unreadable|Block insight generation|Ask for re-upload; keep diagnostic error reason|
|Email delivery failure|Invite mail bounced|Keep account in invited state|Allow resend or alternate email update|
# **5.13 AI-Assisted Development Guidance for Devansh**
Because the build is Bubble-first and minimal-code, AI should be used to accelerate structured implementation work rather than to improvise product logic. Below is the recommended usage model.

- Use AI to draft API Connector payload schemas for Razorpay, Vimeo, and AI providers.
- Use AI to generate repeatable naming conventions for workflows, custom states, and option sets.
- Use AI to generate test scenarios and edge-case checklists before implementing each workflow family.
- Use AI to draft prompt templates for the 10 guided assessment questions and for admin content-generation tools.
- Do not let AI invent data fields or workflow branches without aligning them to the approved object model from Chapter 3.

|<p>**Recommended workflow naming convention**</p><p>- - WF-IDENTITY-INVITE-SINGLE</p><p>- - WF-ENROLLMENT-BULK-ASSIGN</p><p>- - WF-PAYMENT-WEBHOOK-ACTIVATE</p><p>- - WF-AI-INSIGHT-CREATE-REQUEST</p><p>- - WF-CERTIFICATE-ISSUE-AND-NOTIFY</p>|
| :- |

# **5.14 Chapter 5 Acceptance Criteria**
- Each mission-critical workflow has a documented trigger, validation logic, state change, side effects, and failure path.
- Commerce events can change access without manual database editing.
- Learner progress and completion are written as durable records, not calculated only in the UI.
- AI insight requests can be created from structured dropdown prompts and saved with response history.
- Notifications, reminders, and escalations are logged and de-duplicated.
- Certificates and recertification logic are event-driven and auditable.
- Reporting and heat map refresh logic is snapshot-based to protect app performance.
# **5.15 What Chapter 6 Will Cover**
Chapter 6 should define the complete AI layer: guided prompts, prompt governance, structured output design, provider abstraction, internal sales coaching workflows, assessment interpretation logic, and AI safety boundaries for client-facing use.
Chapter 5 • Edge LMS 2030 • 
