**Edge LMS 2030\
Chapter 10**

**Implementation Roadmap, Sprint Architecture, Acceptance Criteria, and AI-Assisted Development Playbook**

*Chapter overview chart*

|**Section**|**Purpose**|**Primary Owner**|**Output / Decision**|
| :-: | :-: | :-: | :-: |
|10\.1–10.2|Lock the implementation philosophy and development operating stance|Strengthscape + Devansh|Common build doctrine and 2030 delivery mindset|
|10\.3–10.5|Define phase plan, MVP boundary, and sprint sequencing|Product lead + Bubble developer|Realistic roadmap with dependency-aware build order|
|10\.6–10.8|Specify AI-assisted development methods and low-code efficiency rules|Devansh|Faster build velocity with less custom code and fewer unstable patterns|
|10\.9–10.11|Establish detailed acceptance criteria, UAT, and launch readiness|Product, QA, client stakeholders|Testable definition of done for every module|
|10\.12–10.14|Define post-launch governance, optimization loop, and 2030 expansion path|Strengthscape ops + product|Scalable operating model and future roadmap|
# **10.1 Why this chapter matters**
Chapter 10 converts the strategy, architecture, data model, workflow logic, AI design, reporting design, and governance rules from the earlier chapters into an execution plan Devansh can actually build from. It is the bridge between product thinking and delivery discipline. The purpose of this chapter is to reduce ambiguity, prevent Bubble rework, and create an implementation sequence that respects both low-code realities and the 2030 ambition for Edge LMS.
# **10.2 Final implementation doctrine**
Devansh should build Edge LMS as a modular Bubble product with clear platform boundaries, reusable workflows, minimal custom code, and heavy use of external services where those services are better than Bubble at a specific function. The implementation doctrine is simple: keep Bubble responsible for experience, permissions, workflows, dashboards, and data orchestration; push streaming, billing events, heavy automation, and advanced AI processing to specialized external systems. This keeps the system elegant, maintainable, and scalable.
# **10.3 Phase structure for delivery**
Edge LMS should be implemented in three working phases rather than one oversized build. Phase 1 creates the commercial and operational core. Phase 2 deepens reporting, guided intelligence, and customer-administration power. Phase 3 moves the product into a strategic consulting and culture-journey platform. The decision to phase the build is not simply about budget or time; it is about protecting architectural coherence and ensuring that early adoption produces usable learning value without waiting for every advanced feature to exist.
# **10.4 Phase 1: MVP boundary**
Phase 1 should deliver a complete, saleable, internally usable LMS core. That means user authentication, tenant-aware access, internal and client learning portals, course and lesson structures, video and resource delivery, quizzes, progress tracking, certificates, basic company administration, Razorpay-triggered access activation, and standard reporting. Guided AI should be included in controlled form, with the standard dropdown question pattern rather than open-ended chat. The MVP is complete only when a client can pay, gain access, assign learning, consume learning, complete a course, download certificates, and review completion status without manual engineering intervention.
# **10.5 Phase 2: operational and analytical deepening**
Phase 2 should add the capabilities that turn Edge from a clean LMS into a differentiated training platform. This includes advanced filters in reporting, heat maps, overdue dashboards, manager views, assignment rules, richer assessment upload logic, guided AI interpretation at admin level, bulk actions, survey and form layers, certificate validity logic, and stronger operational automations. This phase should make the platform valuable to client HR and L&D leaders, not only to learners.
# **10.6 Phase 3: strategic platform evolution**
Phase 3 should turn Edge into an insight-led consulting operating system. That means longer-term trend analytics, cohort comparisons over time, culture-journey views, structured consultant notes, action-plan tracking, intervention memory, and stronger role-based recommendation engines. This is also the phase where Strengthscape can explore external ecosystem expansion: customer academies, partner portals, advanced benchmarking, and stronger integration with a separate assessment centre.
# **10.7 Program roadmap and sprint architecture**
The roadmap below should guide Devansh’s sequencing. It is intentionally dependency-driven so that the app is stable at each checkpoint instead of becoming a partially connected collection of unfinished modules.

|**Sprint Block**|**Primary Goal**|**Must-Have Deliverables**|**Dependencies / Notes**|
| :-: | :-: | :-: | :-: |
|Sprint 0|Foundation and naming discipline|Data types, role model, option sets, privacy strategy, API key plan, page naming, reusable component strategy|No visible product build should start before this is locked|
|Sprint 1|Auth and tenant shell|Login, invite flow, company structure, user roles, dashboard skeletons, environment setup|Depends on Chapter 3 data model|
|Sprint 2|Learning core|Courses, modules, lessons, progress, learner dashboard, resource delivery, video embeds|Depends on Vimeo pattern and content object model|
|Sprint 3|Evaluation and completion|Quizzes, pass logic, certificates, completion states, exports|Depends on lesson and progress architecture|
|Sprint 4|Commerce and provisioning|Razorpay plans, payment workflows, Make triggers, seat activation, company onboarding|Depends on company plan model and external integration keys|
|Sprint 5|Admin operations|Company admin views, bulk invites, assignments, reporting basics, notifications|Depends on stable learner and course data|
|Sprint 6|Guided AI v1|Assessment upload intake, 10 standard question flow, AI response storage, admin insight panel|Depends on file storage and AI connector setup|
|Sprint 7|Advanced reporting|Heat maps, filters, manager dashboards, overdue logic, trend snapshots|Depends on sufficient real data or seeded test data|
|Sprint 8|Hardening and launch prep|QA sweep, UAT, access edge cases, subscription error cases, performance cleanup|No new major feature logic should be added here|
# **10.8 AI-assisted development playbook for Devansh**
AI should be used aggressively for speed, but only inside a disciplined architecture. The purpose of AI here is to reduce repetitive configuration work, improve documentation quality, generate test cases, and accelerate API mapping. It should not be allowed to invent random object models, duplicate logic, or create fragile one-off workflows.
## **Best use of AI during build**
Generate workflow checklists, API request bodies, JSON schema samples, prompt templates, test cases, UX copy, naming conventions, and edge-case lists.
## **Best use of AI before build**
Convert each module into a Bubble implementation brief containing: page name, data types touched, conditions, workflows, external calls, and acceptance criteria.
## **Best use of AI after build**
Generate QA test scripts, regression scenarios, user onboarding text, release notes, and support documentation.
## **What AI should not own**
Final architecture decisions, privacy rule logic, tenant isolation rules, payment state truth, or irreversible data migration logic.
# **10.9 Minimal-coding rules for Bubble implementation**
• Prefer native Bubble data types, privacy rules, backend workflows, and reusable groups before any plugin or custom script.

• Use Make for orchestration across Razorpay, certificate generation, email dispatch, and external system sync instead of writing unnecessary custom middleware.

• Use option sets for stable enumerations such as roles, lesson types, plan types, question types, and status values.

• Build reusable workflow patterns for create, update, assign, notify, complete, archive, and export actions so they can be reused across modules.

• Use external services for large video delivery, large document processing, and provider-side subscription events.

• Store AI prompts and response templates as configurable admin assets rather than burying them inside page workflows.
# **10.10 Detailed acceptance criteria framework**
Devansh should define completion not by whether a page exists, but by whether the module behaves correctly under normal and edge conditions. Every major module should be tested against five dimensions: functional correctness, permissions correctness, operational durability, reporting correctness, and user clarity.

|**Module Type**|**Acceptance Questions**|
| :-: | :-: |
|Authentication and access|Can invited users onboard correctly? Can suspended users be blocked? Can one company never see another company’s data?|
|Course and lesson delivery|Do lessons load correctly? Do progress states save reliably? Do completion markers survive refresh, logout, and role switching?|
|Quizzes and certificates|Are pass thresholds enforced? Are retakes governed? Are certificates generated only when rules are truly met?|
|Payments and subscriptions|Do successful payments activate access? Do failures suspend correctly? Do renewals and payment-link flows stay auditable?|
|AI insight flows|Does the system accept the right input context? Are guided questions logged? Are outputs stored per tenant and request?|
|Reporting and heat maps|Do filters work? Do counts match source data? Do exports reflect exactly the visible filtered state?|
# **10.11 UAT design and launch-readiness protocol**
• Run UAT by role, not only by page. A learner, client admin, consultant, super admin, and finance/ops user should each have separate scenario packs.

• Seed the system with realistic test companies, courses, learners, payments, assessment uploads, and overdue states. Empty systems hide bugs.

• Test every critical workflow twice: once through the expected path and once through a broken or interrupted path.

• Treat launch readiness as a controlled gate: all critical bugs closed, no cross-tenant data issue, payment state reconciled, certificate generation validated, and key reporting numbers matched to sample source data.
# **10.12 Operational handover model after launch**
After launch, Edge should not depend on Devansh for every content, tenant, and reporting action. Strengthscape should establish an operating model with clearly separated ownership: product owner for roadmap decisions, content admin for course changes, ops/finance for payment and access reconciliation, consultant/admin users for client-facing reporting, and Devansh for structured enhancements and controlled fixes. If this separation is not designed, the product will quietly become a developer-operated LMS rather than a business-operated one.
# **10.13 Optimization loop for the first 90 days**
The first 90 days after launch should be treated as a structured optimization window. Strengthscape should review activation, completion, drop-off, admin effort, payment exceptions, and the usefulness of guided AI outputs. The first post-launch improvements should come from observed friction, not from adding many new ideas too early.

|**Review Window**|**Primary Questions**|**Expected Actions**|
| :-: | :-: | :-: |
|Week 1–2|Are onboarding, assignments, and access flows stable?|Fix friction, clarify copy, tighten workflow guards|
|Week 3–4|Are courses being completed and understood?|Improve lesson structure, reminders, and quiz logic if needed|
|Month 2|Are client admins using reports and guided AI meaningfully?|Refine dashboards, filters, and prompt framing|
|Month 3|What features are now clearly justified by usage?|Prioritize roadmap based on evidence, not assumptions|
# **10.14 Edge LMS 2030 north-star roadmap**
By 2030, Edge should function as a learning-and-insight operating system rather than a content bucket. The product should support employee learning, client portals, guided diagnostics, intervention memory, culture-journey dashboards, and AI-assisted application support. Bubble can remain the experience shell if architecture discipline is preserved, external services remain modular, and the product continues to separate learner simplicity from administrative depth.
# **10.15 Final implementation mandate for Devansh**
Build Edge in the following order: structure first, permissions second, learning core third, commerce and automation fourth, intelligence fifth, analytics sixth, and strategic expansion last. Reuse everything that can be reused. Push complexity outward when Bubble should not own it. Use AI as an accelerator, not as a substitute for architecture. The outcome Strengthscape needs is not a flashy prototype. It is a disciplined 2030-ready learning platform that can grow without collapsing under its own logic.
# **Chapter 10 delivery checklist**
□ Implementation phases are explicitly defined and dependency-aware.

□ Devansh has a sprint sequence that matches Bubble realities.

□ Minimal-code rules are explicit.

□ AI-assisted development is encouraged within clear limits.

□ Acceptance criteria and UAT gates are documented.

□ Post-launch governance and 90-day optimization are defined.

□ The 2030 north-star direction is clear without forcing Phase 1 overbuild.
