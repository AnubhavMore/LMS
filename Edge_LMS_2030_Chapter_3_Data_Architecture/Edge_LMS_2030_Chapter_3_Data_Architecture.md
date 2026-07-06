**Strengthscape Edge LMS 2030**

**Chapter 3**

Data Architecture, Role Model, Permissions Logic, and Bubble Data Structure

|Document purpose|Define the full Bubble-ready information architecture before workflow construction begins.|
| :- | :- |
|Primary build outcome|A stable, extensible, multi-tenant schema that supports internal academy, client portals, AI insights, reporting, and future assessment integration.|
|Audience|Devansh, Strengthscape product owners, consultants, and any future Bubble support partner.|

This chapter specifies the data backbone of Edge LMS. The intent is to prevent the most common low-code failure pattern: building pages and workflows first, then patching the data model later. Bubble development must begin from a deliberate entity structure, role model, permissions logic, and relationship map so that the platform remains stable as it grows from an LMS into a long-term learning and insight operating system.

**3.1 Overview chart**

|Architecture block|What it stores|Why it exists|Bubble guidance|
| :- | :- | :- | :- |
|Identity layer|Users, roles, companies, status, managers|Controls access and tenancy|Build first; all other records depend on it|
|Learning layer|Courses, modules, lessons, resources, quizzes, paths|Operational learning delivery core|Use explicit parent-child relationships|
|Transaction layer|Enrollments, progress, submissions, certificates, payments|Captures user activity and outcomes|Treat as event and state records, not static content|
|Insight layer|Assessment uploads, AI requests, AI responses, heat map snapshots|Enables guided recommendations and analytics|Keep separate from learning objects|
|Governance layer|Audit logs, tags, plans, permissions flags, config|Supports scale, support, and future automation|Do not hide these in ad hoc fields|

**3.2 Data design principles**

Bubble development should follow six data principles. First, each object must have a single clear purpose; avoid hybrid records that act as both content and transaction data. Second, tenant separation must be explicit through company linkage or a clearly governed visibility rule. Third, data should be normalized enough to support reuse, but not split so aggressively that every page becomes workflow-heavy. Fourth, future analytics should be anticipated by storing structured fields, not only long text. Fifth, all AI interactions that may later require audit, export, or refinement should be saved as their own records. Sixth, where a future module is likely, such as assessment centre integration, the LMS should store summaries and links rather than prematurely copying complex scoring logic into Bubble.

**3.3 Role model**

Edge LMS should support a strict role model because Bubble interfaces and privacy rules become fragile when access is inferred loosely. The recommended top-level roles are Platform Super Admin, Strengthscape Content Admin, Strengthscape Consultant or Facilitator, Client Company Admin, Client Manager, Learner, and Finance or Operations user. Each role should be represented both as an option-set style value for UI logic and as structured permission flags for future flexibility. Bubble pages should render from role conditions, while sensitive server-side access should still depend on privacy rules and workflow checks.

**3.4 Role matrix**

|Role|Primary responsibilities|Can view across companies|Can edit learning content|Can access insight tools|
| :- | :- | :- | :- | :- |
|Platform Super Admin|Global platform control, tenant management, support, integrations|Yes|Yes|Yes|
|Content Admin|Courses, modules, lessons, quizzes, templates, resources|Optional|Yes|Limited|
|Consultant / Facilitator|Client cohort review, notes, reports, recommendations|Assigned only|No|Yes|
|Client Company Admin|Learners, assignments, reports, billing visibility, uploads|Own company|No|Plan-based|
|Client Manager|Team view, progress view, manager actions|Own team|No|Limited|
|Learner|Consume learning, submit responses, download certificate|No|No|Very limited|
|Finance / Ops|Payments, subscription state, operational reconciliation|Platform or assigned|No|No|

**3.5 Core entity groups**

The Bubble database should be grouped into five families so that Devansh can reason about the product in layers rather than as a flat list of tables.

|Entity family|Representative objects|
| :- | :- |
|Identity and tenancy|User, Company, Role, Permission Profile, Department, Team, Manager Map, Client Plan|
|Learning content|Course, Module, Lesson, Quiz, Question Bank, Resource File, Learning Path, Announcement|
|Operational transactions|Enrollment, Progress Record, Quiz Attempt, Reflection Submission, Certificate, Payment Record, Subscription Record|
|Insight and AI|Assessment Upload, AI Insight Request, AI Insight Response, Heat Map Snapshot, Recommendation Note|
|Governance and metadata|Tag, Category, Audit Log, File Reference, Configuration Record, Integration Event|

**3.6 Identity objects**

The identity layer is the most critical foundation. Every transactional and insight object will point back to it.

**User**

|Field|Type|Purpose|Notes|
| :- | :- | :- | :- |
|full\_name|text|Primary display identity|Required|
|email|email|Login and communication|Unique|
|mobile|text|Optional contact and OTP support|Phase 2 use|
|role\_name|option|Primary role for UI logic|Required|
|company|link|Primary tenant|Required for non-platform users|
|manager\_user|link|Reporting manager|Optional but useful|
|department|text/link|Departmental reporting|Use link if standardized|
|status|option|Active, invited, suspended, inactive|Required|
|last\_login\_at|date|Engagement tracking|System managed|
|language\_pref|option|Localization and messaging|Future-ready|

**Company**

|Field|Type|Purpose|Notes|
| :- | :- | :- | :- |
|company\_name|text|Tenant identifier|Required|
|company\_code|text|Stable short code|Useful for exports|
|plan|link|Commercial plan reference|Required for client tenants|
|seat\_limit|number|Commercial capacity|Can be derived but cache it|
|active\_status|yes/no|Controls access state|Required|
|branding\_pack|link/file|Logo, color, banner references|Phase 2|
|assigned\_consultant|link|Strengthscape owner|Useful for servicing|
|subscription\_state|option|Active, grace, unpaid, paused|Synced from billing|

**Permission Profile**

|Field|Type|Purpose|Notes|
| :- | :- | :- | :- |
|profile\_name|text|Named set of permissions|Example: Consultant-Lite|
|can\_edit\_content|yes/no|Content creation rights|Server-checked|
|can\_view\_reports|yes/no|Report visibility|Role override possible|
|can\_view\_ai\_insights|yes/no|Access to guided AI tools|Plan-linked possible|
|can\_manage\_users|yes/no|User administration capability|Important for client admins|
|scope\_rule|option|Global, assigned-clients, own-company, own-team|Core access rule|

**3.7 Learning content objects**

Learning records should be cleanly separated from activity records. Courses and lessons describe content; enrollments and progress records describe what happened.

**Course**

|Field|Type|Purpose|Notes|
| :- | :- | :- | :- |
|title|text|Course name shown to users|Required|
|course\_code|text|Stable internal identifier|Useful for imports and analytics|
|summary|text|Short public description|Card view|
|audience\_tags|list|Role or theme targeting|Use tag links|
|duration\_mins|number|Estimated effort|Shown in catalog|
|certificate\_enabled|yes/no|Completion certificate logic|Course-level flag|
|published\_status|option|Draft, published, archived|Required|
|company\_visibility|option/link|Global or selected tenants|Phase-based|

**Module**

|Field|Type|Purpose|Notes|
| :- | :- | :- | :- |
|course|link|Parent course|Required|
|title|text|Module title|Required|
|sequence\_no|number|Order in course|Required|
|description|text|Optional support description|Short|
|estimated\_duration|number|Navigation aid|Optional|

**Lesson**

|Field|Type|Purpose|Notes|
| :- | :- | :- | :- |
|module|link|Parent module|Required|
|lesson\_type|option|Video, PDF, text, quiz, reflection, AI insight|Required|
|title|text|Lesson title|Required|
|sequence\_no|number|Order in module|Required|
|video\_ref|text/link|External Vimeo reference|Only for video lessons|
|resource\_file|link|Supporting document or deck|Optional|
|completion\_rule|option|Auto, manual, quiz-pass, submission-required|Required|
|ai\_enabled|yes/no|Allows contextual AI help|Use selectively|

**3.8 Relationship rules**

**•** One Company has many Users, Enrollments, Assessment Uploads, AI Insight Requests, and Payment or Subscription records.

**•** One Course has many Modules; one Module has many Lessons. Lessons should never be attached directly to a Course without a Module in the production model.

**•** One User can have many Enrollments and many Progress Records. Progress should be lesson-level to preserve detailed analytics.

**•** One Learning Path can contain many Courses, and the same Course can appear in more than one Learning Path via an intermediary mapping object if needed.

**•** AI Insight Requests should point to a User, Company, optional Assessment Upload, selected standard question, role context, and challenge context.

**•** Certificates should point to the User, the completed Course or Learning Path, issue date, certificate ID, and source completion record.

**3.9 Transaction objects**

Transaction objects are the operational heartbeat of the platform. They should be treated as state and activity records rather than overloaded content fields.

**Enrollment**

|Field|Type|Purpose|Notes|
| :- | :- | :- | :- |
|user|link|Learner receiving access|Required|
|course\_or\_path|link|Assigned unit of learning|Required|
|assigned\_by|link|Admin or system source|Required|
|assigned\_at|date|Audit and reporting|Required|
|due\_date|date|Deadline logic|Optional but important|
|enrollment\_status|option|Assigned, started, completed, expired|Required|
|mandatory\_flag|yes/no|Compliance and reporting logic|Useful|

**Progress Record**

|Field|Type|Purpose|Notes|
| :- | :- | :- | :- |
|user|link|Learner|Required|
|lesson|link|Lesson being tracked|Required|
|course|link|Course cache for reporting|Optional but helpful|
|started\_at|date|Engagement tracking|Optional|
|completed\_at|date|Completion timestamp|Optional|
|progress\_status|option|Not started, in progress, completed|Required|
|time\_spent\_secs|number|Future engagement metric|Optional|

**Certificate**

|Field|Type|Purpose|Notes|
| :- | :- | :- | :- |
|certificate\_id|text|Unique verification reference|Required|
|user|link|Recipient|Required|
|course\_or\_path|link|Credential source|Required|
|issued\_at|date|Certificate date|Required|
|valid\_until|date|Recertification support|Optional now, strategic later|
|pdf\_file|file/link|Generated certificate asset|Required|

**3.10 Insight and AI objects**

The AI layer must be auditable and structured. Because Strengthscape plans to use 10 standard dropdown questions instead of open-ended client prompting, the request and response model should reflect guided interactions.

**Assessment Upload**

|Field|Type|Purpose|Notes|
| :- | :- | :- | :- |
|company|link|Tenant source|Required|
|uploaded\_by|link|Admin or consultant uploader|Required|
|subject\_scope|option|Individual, team, cohort, manager group|Required|
|source\_file|file/link|Assessment document|Required|
|role\_context|text/option|Role for interpretation|Optional|
|challenge\_context|text/option|Current business challenge|Optional|
|processing\_status|option|Uploaded, parsed, reviewed, archived|Required|

**AI Insight Request**

|Field|Type|Purpose|Notes|
| :- | :- | :- | :- |
|requester|link|Who asked the question|Required|
|company|link|Tenant linkage|Required|
|assessment\_upload|link|Optional source document|Optional but typical|
|standard\_question|option|One of the approved dropdown prompts|Required|
|role\_context|text/option|Manager, HR, leader, facilitator etc.|Recommended|
|challenge\_context|text|Business challenge framing|Recommended|
|request\_status|option|Queued, complete, failed, reviewed|Required|

**AI Insight Response**

|Field|Type|Purpose|Notes|
| :- | :- | :- | :- |
|request|link|Parent request|Required|
|short\_response|text|UI-friendly summary|Required|
|detailed\_response|long text|Expanded structured answer|Required|
|recommended\_rituals|long text/list|Action output|Question-dependent|
|thirty\_day\_actions|long text/list|Execution support|Question-dependent|
|risk\_flags|long text/list|Escalation and watch-outs|Question-dependent|
|reviewed\_by\_human|yes/no|Optional consulting validation|Highly recommended|

**3.11 Permissions logic**

Bubble privacy rules should mirror business logic, not page assumptions. Pages can hide or show components, but data access must still be constrained at the database level.

|Data scope|Typical access|Implementation rule|
| :- | :- | :- |
|Platform records|Super Admin only|Global system configuration, all-tenant reports, integration settings|
|Own company records|Client Company Admin, own-company Consultant if assigned|Users, enrollments, reports, uploads, certificates|
|Own team records|Client Manager|Direct reports or mapped team members only|
|Own learner records|Learner|Profile, enrollments, progress, certificates, own submissions|
|Assigned clients only|Strengthscape Consultant|Only companies specifically assigned to that consultant|

**3.12 Bubble implementation guidance**

**•** Use option sets for fixed values such as role names, lesson types, enrollment status, and standard AI questions.

**•** Use dedicated data types for transaction records rather than storing everything on the User or Course object.

**•** Where a dashboard will repeatedly query the same relationship, include a cached parent field such as course on Progress Record to simplify reporting.

**•** Do not duplicate tenant logic in each workflow step; make company linkage mandatory in the relevant objects.

**•** Store AI prompts and response artifacts separately so that future prompt tuning and audits are possible.

**•** Add created\_by, created\_at, updated\_at, and source flags to the most important admin-generated records.

**3.13 Minimal-code doctrine for Devansh**

Because this platform will be developed in Bubble with minimal custom coding, Devansh should use low-code-friendly patterns first and only reach for custom code when there is a clear product or performance reason.

|Prefer this first|Avoid early|Reason|
| :- | :- | :- |
|Bubble option sets, native privacy rules, backend workflows|Custom plugin logic for simple state changes|Native structures are easier to maintain|
|Make for orchestration across payments, reminders, and certificates|Manual admin-triggered repetition|Reduces operational load|
|AI-assisted generation of API payloads, docs, and prompt templates|AI-generated architecture invented on the fly|Use AI for efficiency, not for core design decisions|
|External services for video, billing, and large files|Storing heavy assets directly inside Bubble|Improves performance and stability|

**3.14 Acceptance criteria for Chapter 3**

**•** The team can list every primary data object and explain why it exists.

**•** Every user-facing record is traceable to a company or an allowed scope rule.

**•** Roles, permissions, and visibility assumptions are explicit rather than implied.

**•** Course, module, lesson, enrollment, and progress relationships are clearly separated.

**•** AI insight requests and responses are saved as independent records.

**•** The schema can support both internal academy and client portals without redesign.

**3.15 What Chapter 4 should cover**

The next chapter should define the full UX and page architecture: screen inventory, navigation logic, learner journeys, admin journeys, dashboard blocks, and the exact Bubble page structure needed to render the data model into a usable product.
