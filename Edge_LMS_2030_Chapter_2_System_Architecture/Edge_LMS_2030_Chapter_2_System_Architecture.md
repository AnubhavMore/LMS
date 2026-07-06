**EDGE LMS 2030**

**Chapter 2\
System Architecture, Module Map,\
and Platform Boundary Specification**

*Developer-facing specification for Bubble-based development by Devansh*

|**Document role**|**Architecture chapter defining the module inventory, system boundaries, integrations, and dependency model for Edge LMS.**|
| :- | :-: |
|**Primary build shell**|Bubble|
|**External services**|Razorpay, Make, Vimeo, AI provider (Gemini/OpenAI), file storage, certificate engine|
|**Design intent**|2030-ready, multi-tenant, AI-enabled learning and insight platform for internal academy and client portals|

# **2.1 Overview chart**

|**Layer**|**Primary capability**|**Owned by**|**Bubble exposure**|**Why it exists**|
| :-: | :-: | :-: | :-: | :-: |
|Experience|Dashboards, learner pages, admin pages, role-aware UI|Bubble|Direct|Single interaction shell for all personas|
|Learning Core|Courses, modules, lessons, enrollments, progress, quizzes|Bubble|Direct|Operational center of the LMS|
|Commerce|Purchases, subscriptions, renewals, payment links|Razorpay|Via API/webhooks|Monetization and access activation|
|Automation|Reminders, sync, certificate jobs, access updates|Make + Bubble workflows|Triggered|Reduces manual operations|
|Media|Video upload, privacy, transcoding, playback|Vimeo|Embedded|Reliable streaming without overloading Bubble|
|Files|PDFs, templates, assessment uploads, downloads|Uploadcare/S3-style|Referenced|Stable storage and retrieval of large assets|
|AI|Guided insight answers, summaries, quiz generation|External AI service|Prompt UI + output display|Differentiates Edge beyond static LMS use|
|Insights|Heat maps, cohort analytics, consultant dashboards|Bubble + external processing when needed|Direct|Turns learning data into consulting value|

This chapter translates the Edge LMS vision into an implementable architecture. The purpose is to help Devansh decide what must live natively in Bubble, what should be connected through APIs, and what should remain outside the LMS boundary altogether.
# **2.2 Architecture objective**
The architecture must support three modes from a single product shell: Strengthscape internal academy, client learning portals, and premium insight-driven consulting support.

The system must stay simple for learners, structured for client admins, and deep for Strengthscape consultants and platform admins.

The product should be designed as a multi-tenant SaaS foundation rather than a one-off portal for a single customer.
# **2.3 System boundary**
Bubble owns the product experience, user management, role-based pages, course objects, learning logic, reporting views, and guided AI request forms.

External tools own specialized workloads that Bubble should orchestrate rather than replicate: subscriptions and payment links, video hosting, file handling, heavy automations, and AI processing.

The assessment centre remains a separate integrated engine. Edge LMS should consume selected assessment outputs but should not be architected as a full psychometric scoring platform.
# **2.4 Platform boundary matrix**

|**Capability block**|**Default owner**|**Reason for ownership**|**Build note for Devansh**|
| :-: | :-: | :-: | :-: |
|Authentication, roles, tenant-aware UI|Bubble|Core application behavior and permissions depend on Bubble privacy rules and page conditions.|Design reusable role gates and tenant filters from day one.|
|Course structures and lesson sequencing|Bubble|This is native LMS logic and should stay close to the user interface.|Model Course > Module > Lesson cleanly and avoid duplicate structures.|
|Video storage and playback|Vimeo|Bubble should not handle large video files, privacy controls, or transcoding natively.|Store Vimeo metadata in Bubble and embed video securely in lessons.|
|Payments and recurring plans|Razorpay|Local payments, subscriptions, payment links, and billing webhooks are stronger here.|Bubble stores payment state; Razorpay remains source of truth for charge events.|
|Access automation and operational jobs|Make + Bubble backend workflows|This reduces manual admin load and avoids overcomplicated front-end workflows.|Use Make for webhook choreography and Bubble backend workflows for internal record creation.|
|AI generation and guided answer processing|External AI via API|Models evolve quickly and should remain provider-swappable.|Keep prompts in config tables; store request and response logs in Bubble.|
|Certificates|Bubble + PDF generation tool|Business logic belongs in Edge, but rendering may be external.|Trigger generation only after completion rules pass.|
|Heat maps and consultant dashboards|Bubble first, external processing if heavy|Most visualizations can start in Bubble; only offload when computation becomes heavy.|Do not overengineer analytics in phase 1.|
# **2.5 Core module map**

|**Module**|**Submodules**|**Primary users**|**Phase priority**|**Notes**|
| :-: | :-: | :-: | :-: | :-: |
|Identity & Access|Login, invite flow, role engine, tenant permissions|All|P1|Non-negotiable foundation|
|Company Management|Tenant setup, seat limits, billing profile, branding basics|Super admin, client admin|P1|Needed for multi-tenant scale|
|Learning Core|Courses, modules, lessons, learning paths|Admins, learners|P1|Operational heart of the LMS|
|Learning Delivery|Course player, notes, resources, progress, completion rules|Learners|P1|Surface must remain simple|
|Quizzes & Forms|Knowledge quizzes, surveys, self-checks, reflections|Learners, admins|P1|Treat forms separately from quizzes|
|Certificates|Templates, issue logic, download, audit trail|Learners, admins|P1|Add validity later|
|Commerce|One-time purchase, subscriptions, seat top-up, payment links|Finance, admins, buyers|P1/P2|Razorpay-backed|
|Reporting|Completion, overdue, score, activity dashboards|Admins, managers|P1|Start with operational reports|
|Heat Maps & Insights|Team matrix views, cohort comparisons, trend signals|Consultants, client admins|P2|Major differentiator|
|AI Guided Insights|10 dropdown questions, role/challenge context, outputs|Client admins, managers, consultants|P1/P2|Keep guided, not open-ended|
|AI Content Engine|Summaries, quiz drafts, flashcards, facilitator notes|Strengthscape admins|P2|Internal leverage multiplier|
|Sales Enablement Hub|Product academy, pitch prep, discovery support, roleplay prep|Internal sales team|P2|Internal academy use case|
|Announcements & Nudges|Broadcasts, reminders, overdue notifications|Admins, learners|P2|Automation-heavy|
|Assessment Integration|Upload summary reports, map outputs to actions|Client admins, consultants|P2|Integrates with external assessment centre|
|Consultant Workspace|Client snapshots, notes, follow-up actions, culture journey tracking|Strengthscape consultants|P3|Strategic layer|


# **2.6 Page inventory**

|**Persona**|**Page / screen**|**Purpose**|**Priority**|
| :-: | :-: | :-: | :-: |
|Public|Home / product landing|Explain platform and route to login or purchase|P1|
|Public|Pricing / plans|Commercial page for self-serve or assisted sales|P2|
|Public|Login / invite accept / reset password|Entry points|P1|
|Learner|Dashboard|Show assigned learning, continue learning, due items, certificates|P1|
|Learner|Course player|Main learning consumption screen|P1|
|Learner|Quiz / form page|Assessments and surveys|P1|
|Learner|My certificates|Downloads and completion history|P1|
|Client admin|Company dashboard|Team progress, alerts, seats, reports|P1|
|Client admin|Learner management|Invite, assign, deactivate, filter|P1|
|Client admin|Reports|Completion, overdue, score exports|P1|
|Client admin|Assessment insights|Guided AI questions on uploaded assessment outputs|P2|
|Strengthscape admin|Global dashboard|Cross-tenant health and operations|P1|
|Strengthscape admin|Course studio|Create and edit content|P1|
|Strengthscape admin|AI prompt manager|Maintain guided questions, templates, model settings|P2|
|Consultant|Client insight view|Heat maps, cohort trend, notes, next actions|P3|
# **2.7 Integration dependency map**
Razorpay -> Make/Bubble: payment captured, subscription created, renewal failed, payment link settled.

Bubble -> Vimeo: store video IDs, titles, durations, privacy metadata, and embed URLs in lesson objects.

Bubble -> AI provider: send structured prompt payloads, course context, assessment summary context, and selected dropdown question; receive stored outputs.

Bubble -> File storage: upload and reference PDFs, worksheets, assessment uploads, and generated assets.

Bubble -> PDF engine: pass completion data for certificate rendering and save downloadable document references.
# **2.8 Reference workflow sequences**

|**Workflow**|**Sequence**|**Design note**|
| :-: | :-: | :-: |
|New client purchase|Razorpay payment -> Make trigger -> Bubble company record -> admin invite -> seat allocation|Keep Razorpay as source of payment truth; Bubble stores access state.|
|Learner completion|Lesson completion rules satisfied -> Bubble marks course complete -> certificate job triggered -> learner notified|Completion logic should be deterministic and auditable.|
|AI guided insight request|Client admin selects uploaded assessment + role + challenge + one standard question -> AI response generated -> output stored and displayed|Avoid freeform prompting as default.|
|Internal content generation|Admin uploads deck or transcript -> AI generates summary/quiz draft -> admin reviews before publish|Keep human approval before learner release.|
|Overdue reminder|Scheduled job checks due dates -> Make or Bubble backend workflow sends nudges -> dashboard updated|Do not hardcode reminders page by page.|
# **2.9 Minimal-coding doctrine for Devansh**
Use Bubble native data types, privacy rules, reusable elements, conditional visibility, backend workflows, and API Connector before introducing custom code.

Use Make for operational choreography instead of writing ad hoc glue logic in multiple places.

Use AI for specification-to-build acceleration: JSON schemas, API payload examples, naming conventions, test cases, prompt templates, and workflow documentation.

Do not let AI invent architecture. AI should speed execution inside approved boundaries, not redefine the system model mid-build.

Treat every integration as replaceable. Keep provider-specific configuration in admin tables where possible.
# **2.10 Bubble build rules**
1\. Create one canonical tenant model and reuse it everywhere.

2\. Do not duplicate pages by client. Use role and tenant conditions.

3\. Keep course, module, lesson, quiz, and form as separate data concepts.

4\. Store external IDs for Razorpay, Vimeo, AI jobs, and file references in dedicated fields.

5\. Add audit logging for critical admin actions from phase 1 where practical.

6\. Build export-friendly report tables and filters early.

7\. Plan page loading carefully; large report pages should paginate or lazy-load data.
# **2.11 Chapter 2 decisions locked**

|**Decision**|**Implication**|
| :-: | :-: |
|Bubble remains the primary product shell.|All user experiences, permissions, and learning flows are centered here.|
|Specialized services stay external.|Video, payments, AI processing, and storage are integrated rather than rebuilt.|
|Multi-tenant design is mandatory from day one.|No client-specific forks of the core app architecture.|
|Guided AI remains the default client experience.|The 10 dropdown questions become the first-class AI interface pattern.|
|Assessment centre stays separate.|Edge LMS consumes outputs and turns them into action and learning.|
|Module development follows phase priorities.|Devansh should build foundation before strategic layers.|
# **2.12 What Chapter 3 will cover**
Chapter 3 should define personas, permission logic, tenant rules, and the role-based operating model in detail so Devansh can configure privacy rules, page conditions, admin controls, and access boundaries correctly.
