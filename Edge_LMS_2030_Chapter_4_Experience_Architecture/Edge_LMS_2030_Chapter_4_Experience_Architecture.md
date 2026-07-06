Edge LMS 2030 - Chapter 4

**EDGE LMS 2030**

**Chapter 4**

**Experience Architecture, Page Specifications, and User Journey Design**

Developer build document for Devansh — Bubble-first, minimal-code implementation with contemporary LMS design principles and AI-assisted workflow generation.

|**Purpose of this chapter: translate the strategic blueprint, system architecture, and data model into the actual experience layer — what users see, how they navigate, what pages exist, and how core journeys should behave in Bubble.**|
| :- |

|**Document role**|UX and workflow specification chapter for the Edge LMS development pack|
| :- | :- |
|**Primary builder**|Devansh using Bubble as the core application shell|
|**Design intent**|Keep learner experience elegant and low-friction while preserving admin, consultant, and reporting depth|
|**Implementation stance**|Prefer native Bubble components, reusable groups, conditionals, backend workflows, and AI-assisted specification-to-workflow generation before writing custom code|

# **4.1 Overview Chart**

|**Experience Layer**|**Primary Users**|**Key Pages**|**Bubble Build Pattern**|**Design Rule**|
| :- | :- | :- | :- | :- |
|Learner workspace|Learners|Dashboard, My Courses, Course Player, Quiz, Certificates|Reusable groups + conditional states|Show only what to do next, what is pending, and where to get help|
|Client admin workspace|HR, L&D, company admins|Company Dashboard, Learners, Assignments, Reports, Billing|Admin page cluster + filtered repeating groups|Operational clarity matters more than visual complexity|
|Strengthscape admin workspace|Super admins, content admins, ops|Global Dashboard, Companies, Courses, Templates, AI Prompt Controls|Central admin shell with tabs and detail drawers|One control plane, many tenants|
|Consultant insight workspace|Consultants, facilitators|Cohort View, Heat Maps, Insight Panels, Notes|High-information pages with filters and exports|Surface patterns, not raw clutter|
|Sales enablement workspace|Internal sales team|Playbook Hub, Pitch Prep, AI Briefing, Practice Tracking|Simple guided tools with strong prompts|Fast prep and high reuse|

# **4.2 Experience Architecture Principles**
**•** Design three visibly different workspaces: Learner, Admin, and Insight. Do not overload a single interface with all functions.

**•** Reduce page count through reusable groups, tab states, and conditional panels rather than duplicating pages for each role.

**•** Prefer guided actions over freeform exploration. Every primary page should answer one simple question: what should I do here?

**•** Use consistent information hierarchy: page title, quick summary, key actions, primary data block, secondary detail, export or help.

**•** Any AI interaction exposed to clients should remain structured, bounded, and context-aware rather than open-ended.

**•** Assume a large share of users will be non-technical and time-poor. Speed to clarity is more important than feature visibility.
# **4.3 Master Navigation Model**
Edge LMS should use a role-aware navigation shell rather than independent page designs. In Bubble, this should be built as a shared application frame with a dynamic sidebar, page title region, breadcrumb line, notification area, and a consistent action bar.

|**Navigation Zone**|**Description**|**Bubble Recommendation**|**Notes**|
| :- | :- | :- | :- |
|Top bar|Logo, tenant or company name, search, notifications, profile menu|Reusable header group on all authenticated pages|Do not hardcode tenant styling into separate pages|
|Left navigation|Role-based menu items and collapsible sections|Conditionally visible group based on Current User role|Keep maximum 7 top-level items per role|
|Context header|Page title, summary, quick actions, filter chips|Reusable group fed by page-level custom states|Improves consistency and reduces clutter|
|Content region|Core repeating groups, charts, forms, tables|Main page container|Must remain responsive without layout breakage|

# **4.4 Page Inventory by Role**
The following pages should exist as the baseline Bubble page architecture. Some may be separate pages; others may be tab-states within a master admin shell. The point is functional coverage, not unnecessary page proliferation.

|**Role**|**Core Pages**|**Optional Phase 2 Pages**|**Implementation Note**|
| :- | :- | :- | :- |
|Learner|Dashboard; My Courses; Course Player; Quiz; Certificates; Profile|AI Notes; Reflection Journal; Discussion Wall|Keep flow linear and low-friction|
|Client Admin|Company Dashboard; Learners; Assignments; Reports; Assessment Uploads; Billing|Manager View; Cohort Analytics; Export Center|Use a single admin shell with tabs|
|Strengthscape Admin|Global Dashboard; Companies; Users; Courses; Modules/Lessons; AI Prompt Manager; Payments|Theme Manager; Audit Viewer; Content Operations|Centralized control plane|
|Consultant|Assigned Clients; Cohorts; Insight Dashboard; Heat Maps; Notes; Exports|Intervention Tracker; Recommendation Builder|Data-heavy but filter-first|
|Sales Team|Playbook Hub; Product Pages; AI Pitch Prep; Practice Log|Roleplay Integration; Manager Review|Can sit inside internal academy tenant|

# **4.5 Learner Experience Specification**

|**Learner design rule: the interface must feel calm, directed, and winnable. Avoid analytics overload. Avoid menu sprawl. Use progress, deadlines, and next-step clarity as the main design language.**|
| :- |

## **Primary learner pages**
**Learner Dashboard:** Show welcome block, continue-learning card, pending courses, overdue items, recently completed items, and certificates. Surface one strong call to action: Continue learning.

**My Courses:** Support filters such as Assigned, In Progress, Completed, Optional, and Overdue. Keep card layout visually clean with progress bars and due dates.

**Course Player:** Use a split layout: left module navigation, central lesson content, right support rail for resources, notes, transcript, or AI help.

**Quiz Page:** Show instructions, timer only if required, progress across questions, clear submit logic, and visible retake or pass criteria.

**Certificates:** List completed credentials with issue date and download action. Avoid mixing in partial or unavailable certificates.
## **Learner micro-interactions**
**•** Mark-complete actions should feel explicit but lightweight.

**•** Video completion should not depend solely on watching 100% unless specifically required by policy.

**•** If a lesson has resources, downloads should sit close to the content rather than in a separate hidden library.

**•** AI help for learners should answer only content-linked or application-linked questions.

**•** Any due-date risk should show as a visible but not alarming status chip.
# **4.6 Client Admin Experience Specification**
Client admins need operational confidence. Their pages should feel like a control room, not like a consumer learning app.

|**Page**|**Purpose**|**Required Blocks**|**Primary Actions**|**Bubble Note**|
| :- | :- | :- | :- | :- |
|Company Dashboard|See overall learning status|Completion KPIs, overdue count, top courses, recent activity, quick links|Invite learners, assign course, export report|Build from summary cards + filtered repeating groups|
|Learners|Manage people records and status|Learner list, role filter, team filter, status, last login|Invite, deactivate, resend invite, view progress|Use sliding detail group rather than separate pages|
|Assignments|Control course or path assignment|Assignment table, due dates, mandatory flags, target groups|Assign, reassign, extend deadline|Backend workflow support recommended|
|Reports|View and export operational reports|Course completion, quiz scores, overdue list, certificates|Export CSV/PDF, filter by team/date/course|Paginate large datasets|
|Assessment Uploads / AI Insights|Run guided insight flows|Upload area, metadata, standard question dropdown, response history|Upload, ask, save, export|Keep AI structured and audited|

# **4.7 Strengthscape Admin Experience Specification**
The Strengthscape admin environment is the master operating system. It must support content operations, tenant management, billing oversight, AI configuration, and intervention visibility without page chaos.

**•** Use one master admin shell with top-level tabs for Companies, Users, Courses, Content Operations, Payments, AI Controls, and System Logs.

**•** Support quick drill-down from tenant summaries into tenant-specific detail views without requiring separate page families.

**•** Create a modular course builder: Course > Module > Lesson > Quiz > Certificate settings.

**•** Expose AI prompt templates and standard dropdown question sets as editable configuration objects, not hardcoded text.

**•** Design a safe operations layer for publishing, archiving, cloning, and versioning content.
# **4.8 Consultant and Insight Workspace Specification**
This workspace is where Strengthscape differentiates itself. It should transform learning activity into consulting intelligence.

|**Insight Page**|**What it shows**|**Why it matters**|**Recommended visual structure**|
| :- | :- | :- | :- |
|Cohort View|Completion, engagement, assessment-linked signals, recent prompts|Shows adoption by program cohort|Summary cards + team table + trend chart|
|Heat Maps|Completion, quiz performance, overdue risk, topic difficulty|Makes friction visible quickly|Matrix or grid with color scale and filters|
|Insight History|Saved AI responses and consultant notes|Builds continuity over long journeys|Chronological cards with tags and export|
|Recommendations Workspace|Curated actions, rituals, manager prompts, 30-60-90 plans|Turns analytics into intervention design|Two-column: evidence left, action right|

# **4.9 Standard User Journeys**
**Journey A: learner first login -** Invite received -> password set -> landing dashboard -> first assigned course -> first lesson -> quiz -> completion -> certificate.

**Journey B: client admin activation -** Payment confirmed -> company activated -> admin onboarded -> learners invited -> courses assigned -> first dashboard check -> export report.

**Journey C: consultant follow-through -** Open assigned client -> review cohort dashboard -> inspect heat map -> trigger AI insight using standard question -> save note -> export recommendations.

**Journey D: internal sales prep -** Select product playbook -> enter prospect role and challenge -> generate AI briefing -> review discovery questions -> record preparation note.
# **4.10 Guided AI Interaction Design**
The UX pattern for AI should be based on guided prompts, not blank prompting. Bubble should display a standard selector flow before sending the request to Gemini or another provider.

|**Step**|**UI element**|**User input**|**Output**|
| :- | :- | :- | :- |
|1|Source selector|Assessment report, course, team, or uploaded document|Context for AI processing|
|2|Role/challenge selector|First-time manager, team leader, HR, consultant, sales etc.|Adds framing|
|3|Standard question dropdown|One of the 10 approved questions|Prevents vague or unsafe prompting|
|4|Response panel|Short answer, detailed answer, suggested actions, saved history|Actionable output|

Bubble implementation note: store the standard question list as editable data or option sets. Do not hardcode prompt text into page workflows.
# **4.11 Bubble Implementation Guidance for Minimal Coding**
**•** Use a common authenticated shell page pattern with reusable header, navigation, and context banner groups.

**•** Prefer tabs and custom states for sub-views when page weight remains manageable; use separate pages only when SEO, performance, or permissions make it necessary.

**•** Create reusable cards for course summaries, KPI blocks, assignment rows, certificates, and notification banners.

**•** Use backend workflows for assignment bulk actions, reminder triggers, certificate generation triggers, and heavy AI requests.

**•** Use Make where external orchestration is cleaner than deep Bubble workflow chains, especially for payment events and email automation.

**•** Use AI to draft endpoint payload mappings, field naming conventions, prompt templates, UI copy variants, and test cases — but keep the final workflow logic deterministic and documented.
# **4.12 Accessibility and Responsive Design Rules**
**•** All key actions must remain visible and usable on common laptop widths; the platform should degrade gracefully on tablets.

**•** Use strong contrast for progress chips, status labels, and filter tags.

**•** Avoid icon-only actions for operational pages unless labels appear on hover and in compact responsive views.

**•** Ensure long table content has filter and search support rather than forcing ultra-wide layouts.

**•** Where charts or heat maps appear, provide text summaries or downloadable underlying data for operational clarity.
# **4.13 Failure States and Empty States**
Well-designed empty and failure states reduce support burden and make Bubble applications feel mature. Every primary page should have defined empty-state behavior.

|**Scenario**|**Bad Pattern to Avoid**|**Desired Response**|**Builder Note**|
| :- | :- | :- | :- |
|No assigned courses|Blank dashboard|Show welcome plus “No courses assigned yet” with support contact or admin note|Use conditional group|
|No report results for filter|Empty white space|Show filtered empty state with reset option|Keep filters visible|
|AI response delayed or failed|Silent spinner forever|Show safe retry state and log the request|Asynchronous workflow tracking|
|Payment active but seats full|Access confusion|Show seat-limit explanation and upgrade contact path|Tie to billing state|

# **4.14 Acceptance Criteria for This Chapter**
**•** Devansh can list all baseline pages and map them to roles without ambiguity.

**•** The learner, admin, consultant, and internal sales experiences are clearly separated in intent.

**•** The navigation shell can be designed once and reused across authenticated experiences.

**•** The AI interaction model is defined as guided, structured, and auditable.

**•** The page strategy supports minimal coding by emphasizing reusable groups, conditional visibility, and backend workflows over fragmented custom pages.

**•** The UX design rules align with the 2030 product direction: simple learner surface, deep admin and insight layers.
# **4.15 What Chapter 5 Should Cover**
Chapter 5 should move from page architecture into operational process design: assignment workflows, enrollment logic, notification flows, completion logic, certificate lifecycle, reminder automation, and client reporting operations.
Strengthscape | Experience Architecture, Page Specifications, and User Journey Design
