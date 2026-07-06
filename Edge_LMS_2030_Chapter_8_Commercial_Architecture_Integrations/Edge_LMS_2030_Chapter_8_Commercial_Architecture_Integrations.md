**Strengthscape • Edge LMS 2030 Development Specification**

|<p>**Chapter 8**</p><p>Commercial Architecture, Integrations, Billing Logic, and 2030 Implementation Strategy</p><p>This chapter defines how Edge LMS will commercialize learning, provision client access, connect external services, and implement a low-code operating model that minimizes custom engineering while preserving enterprise readiness.</p>|
| :- |

|**Document role**|**Primary audience**|**Build intent**|
| :- | :- | :- |
|Developer handover chapter|Devansh, product owner, operations|Lean Bubble implementation with strong external service orchestration|

***Chapter intent:** Bubble remains the application shell; monetization, media, AI, and automation are deliberately delegated to specialized services so Devansh can build faster with less code and lower maintenance overhead.*



**1. Commercial overview chart**

|**Commercial layer**|**Primary function**|**System owner**|**Bubble dependency**|**Why it matters**|
| :- | :- | :- | :- | :- |
|Plan catalogue|Defines internal, client, and premium AI plans|Bubble|High|Controls entitlements and packaging|
|Checkout and collection|Collects one-time fees, subscriptions, and payment links|Razorpay|Medium|Supports India-first revenue capture|
|Provisioning|Creates or upgrades access after payment|Make + Bubble backend workflows|High|Removes manual ops and access errors|
|Video delivery|Hosts, secures, and streams learning video|Vimeo|Medium|Protects playback quality and access control|
|AI services|Generates summaries, quizzes, guided responses, and internal enablement outputs|Gemini / OpenAI via API|High|Creates differentiated intelligence without heavy custom code|
|File storage|Stores PDFs, assessments, templates, and downloads|Uploadcare / S3-style store|Medium|Prevents Bubble from becoming a file-heavy repository|
|Certificate output|Generates branded PDFs and completion artefacts|PDF service / Bubble plugin|High|Essential for compliance and value perception|
|Reporting sync|Triggers exports, reminders, failed renewal alerts, and ops tasks|Make|High|Turns LMS into an operating system, not just a portal|

The commercial model of Edge LMS should be modular. Bubble controls plans, entitlements, and user experience, but payment capture, video handling, AI processing, and automation should sit outside Bubble where specialist services already solve those problems well.

**2. Product packaging and revenue model**

Edge LMS should be packaged as a platform with commercial flexibility rather than a single static LMS subscription. Strengthscape needs the ability to sell self-paced programs, blended cohorts, internal academy access, client portals, premium AI insight add-ons, and long-term culture journey dashboards from one commercial backbone.

**2.1 Recommended packaging tiers**

**•** Internal Academy Plan: for Strengthscape employees, facilitators, and sales team users; usually not billed externally but governed by the same entitlement engine.

**•** Client Portal Standard: includes learner access, course delivery, quizzes, certificates, basic reports, and admin controls.

**•** Client Portal Advanced: adds heat maps, team reports, manager views, and selected guided AI insight features.

**•** Strategic Journey Plan: adds assessment-upload interpretation, ritual recommendations, extended analytics, and consulting-grade dashboards.

**•** Premium AI Add-on: enables guided question packs, role-based recommendations, summary generation, and internal or client-facing intelligence features.

**2.2 Commercial packaging objects**

Devansh should not hardcode plan logic into page conditions alone. Bubble should use reusable commercial objects so pricing and entitlements can evolve without redesign.

**•** Plan: the commercial product definition, such as Standard or Advanced.

**•** Entitlement bundle: the feature rights linked to a plan, such as heat maps enabled or AI responses per month.

**•** Subscription record: the active commercial instance for a company or user.

**•** Seat policy: governs how many active learners are included, soft limits, and top-up logic.

**•** Billing profile: stores payment owner, status, renewal data, and commercial notes.

**•** Add-on record: stores optional features purchased on top of the main plan.

**3. Payments, checkout, and billing logic**

For Strengthscape’s India-first commercial context, Razorpay should be the primary payment layer. Bubble should manage pricing display and commercial state, but the actual collection flow, recurring charge events, and payment links should be delegated to Razorpay.

**3.1 Payment patterns to support**

**•** One-time purchase for individual courses, bundles, or cohort registrations.

**•** Subscription billing for client portals and recurring access plans.

**•** Payment links for sales-led deals where the commercial team closes the opportunity manually.

**•** Seat top-up payments for additional learner capacity.

**•** Premium AI add-on purchase on top of an existing client plan.

**3.2 Billing workflow doctrine**

**•** Never grant paid access from a front-end page click alone; access should only change after a verified payment event.

**•** Use Razorpay as the source of truth for payment status, with Bubble storing mirrored commercial state.

**•** Use Make or Bubble backend workflows to process payment webhooks and update subscriptions centrally.

**•** Keep failed payment, paused plan, refunded plan, and expired plan as separate statuses; do not collapse them into a single inactive state.

**3.3 Payment lifecycle table**

|**Stage**|**Trigger**|**Source of truth**|**Bubble action**|**Ops note**|
| :- | :- | :- | :- | :- |
|Checkout initiated|User clicks buy or sales creates payment request|Bubble|Create pending commercial intent record|No access yet|
|Payment captured|Razorpay success event|Razorpay|Activate plan or enrollment|Trigger welcome and provisioning|
|Renewal due|Subscription approaching renewal|Razorpay + Bubble mirror|Show renewal status and reminders|Use Make for reminders|
|Payment failed|Recurring charge fails|Razorpay|Mark at-risk status; schedule grace logic|Do not instantly delete history|
|Refund / cancellation|Ops or finance action|Razorpay + ops process|Adjust entitlement and keep audit log|Preserve completion records|



**4. Client provisioning and entitlement activation**

The most important low-code commercial workflow is not checkout itself; it is what happens immediately after money is collected. Edge LMS should treat provisioning as a first-class system, because that is where manual errors usually happen in training businesses.

**4.1 Provisioning scenarios**

**•** New company purchase: create company tenant, billing profile, admin user, plan, and seat limits.

**•** Existing company upgrade: add feature entitlements, increase seat limit, or unlock premium AI layer.

**•** Individual learner purchase: create user, assign course or path, and trigger certificate eligibility logic.

**•** Manual sales-led deal: finance confirms collection, then provisioning workflow is triggered from admin panel or Make.

**•** Internal activation: non-billed internal users receive access through entitlement rules instead of payment.

**4.2 Provisioning sequence**

The recommended sequence is: commercial intent is created in Bubble, Razorpay confirms payment or subscription state, Make receives or polls the event, then a Bubble backend workflow performs controlled access creation. This prevents front-end logic from becoming the gatekeeper of paid access.

**•** Create pending commercial intent.

**•** Receive confirmed payment or subscription event.

**•** Locate company or user target.

**•** Apply plan and entitlement bundle.

**•** Assign seat capacity or course rights.

**•** Send invite or confirmation message.

**•** Write audit log and billing trail.

**•** Raise exception queue if any mapping fails.

**5. Integration architecture and system boundaries**

Devansh should build Edge LMS as a composable low-code platform. Each system should own a clear responsibility. This reduces custom code, improves debuggability, and makes AI-assisted build generation much more reliable.

|**Service**|**What it owns**|**Why Bubble should not own it fully**|**Implementation note**|
| :- | :- | :- | :- |
|Razorpay|Checkout, subscriptions, payment links, renewal events|Billing engines are complex and best externalized|Use webhook-driven sync with mirrored commercial state|
|Vimeo|Video upload, transcoding, privacy, playback|Bubble file storage is not a media platform|Store video ID and playback rights in Bubble|
|Gemini / OpenAI|Content generation and guided responses|Model calls, prompt versions, and usage metering should be external API concerns|Store prompts, inputs, outputs, and quotas in Bubble|
|Uploadcare / S3|Large documents and downloads|Bubble performance degrades with file-heavy use at scale|Store URLs, metadata, and access tags only|
|Make|Cross-system orchestration|Complex event chains become messy in page workflows|Use Make for triggers, notifications, and exception routing|
|PDF generation layer|Certificate PDFs and formatted outputs|Document rendering is best handled as a specialized output service|Use tokenized templates and result URLs|

**5.1 Bubble integration rules**

**•** All integrations should be encapsulated as reusable API actions or backend workflows.

**•** Do not scatter payment or AI logic across multiple front-end buttons when one server-side workflow can own it.

**•** Store external identifiers explicitly: Razorpay customer ID, subscription ID, Vimeo video ID, AI request ID, file object ID.

**•** Every integration should have a recoverable failure state and audit trail.

**6. AI-assisted low-code build strategy for Devansh**

Because Devansh wants minimal coding, AI should be used as an acceleration layer for repetitive, structured engineering tasks. The goal is not to let AI invent the platform. The goal is to let AI speed up implementation inside a deliberately designed architecture.

**6.1 High-value AI use cases during development**

**•** Generate API payload schemas and request-response maps for Razorpay, Vimeo, and AI providers.

**•** Draft Bubble field lists, option sets, and naming conventions from finalized module definitions.

**•** Generate prompt libraries for guided AI question types, summaries, quiz creation, and internal enablement.

**•** Draft test cases and exception scenarios for payment, provisioning, and seat logic.

**•** Produce reusable workflow documentation and pseudo-logic before Devansh builds workflows visually.

**6.2 AI usage guardrails**

**•** Do not let AI decide the data model after the data model has been locked.

**•** Do not copy raw AI code into production workflows without reviewing field names, statuses, and security implications.

**•** Use AI to accelerate structured assets, not to replace product architecture thinking.

**•** Keep prompt versions, API contracts, and integration mappings documented so changes stay traceable.



**7. Commerce-facing admin screens**

Edge LMS needs dedicated commercial screens in Bubble. If billing state lives only in hidden fields, the operations team will lose clarity and commercial mistakes will multiply.

**•** Plans and entitlements manager.

**•** Company billing profile page.

**•** Subscription detail view with status history.

**•** Seat utilization and top-up panel.

**•** Payment link request panel for sales-assisted deals.

**•** Failed payment and exception queue.

**•** Add-on management screen, including Premium AI enablement.

**7.1 Minimum fields for billing profile**

**•** Billing contact name and email.

**•** Company legal or billing name.

**•** Active plan.

**•** Seat limit and seat usage.

**•** Subscription status and renewal date.

**•** Payment source type: subscription, manual link, internal, or waived.

**•** Razorpay customer/subscription identifiers.

**•** Grace period end date where relevant.

**•** Commercial notes and internal owner.

**8. Client plan entitlements and usage logic**

The LMS should not rely on page visibility alone to enforce plans. Plan entitlement logic should be explicit and queryable so reporting, UI gating, and upgrades remain consistent.

**8.1 Example entitlement matrix**

|**Feature**|**Internal**|**Standard**|**Advanced**|**Strategic Journey**|
| :- | :- | :- | :- | :- |
|Course delivery|Yes|Yes|Yes|Yes|
|Certificates|Yes|Yes|Yes|Yes|
|Basic reports|Yes|Yes|Yes|Yes|
|Heat maps|Optional|No|Yes|Yes|
|Guided AI insights|Internal-first|Optional add-on|Yes|Yes|
|Assessment upload interpretation|Internal-first|No|Optional|Yes|
|Consultant dashboard|Yes|No|Optional|Yes|
|Premium sales enablement features|Yes|No|No|Optional|

**8.2 Usage metering**

**•** Track active learners by plan and company.

**•** Track AI request count where AI access is metered.

**•** Track assessment upload count for premium tiers.

**•** Track certificate output count where needed for special programs.

**•** Track storage or large-file thresholds only if commercially necessary later.

**9. Video, file, and content delivery strategy**

A 2030-ready LMS must handle content delivery professionally. The biggest mistake in Bubble-first systems is letting the app database become the media warehouse.

**9.1 Video delivery rules**

**•** All formal video lessons should be hosted externally, preferably in Vimeo with privacy controls.

**•** Bubble should store metadata, lesson linkage, and allowed playback context, not the media file itself.

**•** Use consistent upload naming, transcript storage, and lesson status logic so AI and reporting can reuse content cleanly.

**9.2 File handling rules**

**•** Keep downloadable templates, PDFs, and assessment uploads in an external file layer.

**•** Store file metadata in Bubble: file type, source, owner, company, access tag, upload date, and processing status.

**•** Separate client-visible documents from admin-only source files to avoid accidental exposure.

**10. Security, auditability, and commercial resilience**

Commercial integrity is as important as learner experience. A low-code LMS becomes fragile when billing logic, provisioning logic, and entitlement logic are not auditable.

**•** Every payment-driven access change must write an audit record.

**•** Every plan change should preserve historical commercial state for reporting and dispute resolution.

**•** Every failed provisioning event should enter an exception queue instead of silently failing.

**•** Access removal should never delete learning history; it should change current entitlement only.

**•** Role-based privacy rules must prevent one company from seeing another company’s records, billing data, or uploaded files.

**11. Implementation roadmap for Devansh**

This chapter should translate into a phased commercial build rather than a single giant milestone.

|**Phase**|**Commercial outcome**|**Low-code priority**|**Notes**|
| :- | :- | :- | :- |
|Phase 1|One-time payments, manual provisioning fallback, basic company plans|Very high|Get revenue flow working first|
|Phase 2|Subscriptions, seat management, automated provisioning, add-ons|High|Stabilize commercial backbone|
|Phase 3|Advanced metering, renewal dashboards, premium AI usage logic|Medium|Used when client mix matures|
|Phase 4|Enterprise billing variants, consultant-led strategic journey packaging|Selective|Add only when market need is proven|

**12. Acceptance criteria for Chapter 8 implementation**

**•** Devansh can create plans, entitlements, and billing profiles without hardcoding page logic.

**•** Payment confirmation can activate learner or company access through a backend workflow.

**•** Seat limits and subscription statuses are visible and queryable in Bubble.

**•** Video, file, and AI services are integrated without storing heavy assets directly in Bubble.

**•** Commercial exceptions, failed payments, and provisioning errors are visible in admin workflows.

**•** All commercial changes preserve auditability and tenant isolation.

**13. Chapter 8 conclusion**

The commercial architecture of Edge LMS must feel invisible to the learner but explicit to the system. Bubble should remain the command layer, not the owner of every infrastructure responsibility. If Devansh follows this doctrine, the platform will stay lean enough for minimal-code development and robust enough for Strengthscape’s 2030 vision of an AI-enabled, monetized, multi-tenant learning and insight platform.
Edge LMS 2030 • Chapter 8 • Page 
