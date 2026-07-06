Edge10 LMS - Bubble Developer Master Build Guide

**Edge10 LMS Bubble Developer\
Master Build Guide**

*Exhaustive, beginner-friendly implementation guide for building on the current Bubble AI-generated prototype*

|**Important:** This document assumes the first Bubble LMS prototype has already been generated. The developer should not restart the app. The task is to convert the existing prototype into a secure, multi-tenant, AI-enabled learning and client-insight platform for Strengthscape.|
| :- |

|**Item**|**Details**|
| :- | :- |
|Prepared for|Developer / Bubble builder / Edge10 implementation team|
|Platform|Bubble.io as application shell; Make/Apps Script/API layer later as automation bus; external services for video, AI, storage, and integrations|
|Build posture|Beginner-friendly, step-by-step, use existing pages and components where possible|
|Scope|LMS, client portal, facilitator workspace, internal academy, AI-guided insights, assessment-report interpretation layer, feedback and governance|
|Not in immediate V1|Full psychometric engine, SCORM/xAPI, deep CRM writeback, trainer marketplace, payment gateway, production certificate PDF engine|


# **Table of Contents - working navigation**
**•** 1. Executive build summary

**•** 2. Source logic and Edge10 context

**•** 3. What already exists in Bubble

**•** 4. Product vision and roles

**•** 5. Feature architecture by module

**•** 6. Data model master specification

**•** 7. Option sets and controlled values

**•** 8. Privacy and multi-tenant security

**•** 9. Authentication, signup, invite, and role routing

**•** 10. Page-by-page build instructions

**•** 11. Core learner journey workflows

**•** 12. Client admin and HR/L&D portal

**•** 13. Facilitator workspace

**•** 14. Super admin and content operations

**•** 15. Internal Strengthscape academy and sales enablement layer

**•** 16. AI-guided insights and assessment-report layer

**•** 17. Feedback, QR, certification, and evidence capture

**•** 18. Reports and dashboards

**•** 19. Integrations and automation roadmap

**•** 20. Bubble AI prompt bank

**•** 21. QA checklist and definition of done

**•** 22. Build phase plan


# **1. Executive build summary**
Edge LMS should become a practical operating platform for Strengthscape learning delivery, client-facing program visibility, facilitator execution, and AI-guided post-program insight. The first prototype already has useful screens and data types. The developer’s job is to strengthen the backend, add missing workflows, and expand the platform into the broader Edge10 ecosystem without overloading the first release.
## **1.1 The most important build principle**

|**Build principle:** Keep Bubble as the user-facing shell. Use Bubble for dashboards, role-based portals, learning pages, admin CRUD, reporting views, and lightweight workflows. Use external services later for video hosting, AI model calls, file storage, certificate generation, and CRM/Notion/Zoho integrations.|
| :- |

## **1.2 Current state verdict**

|**Area**|**Current status**|**Action now**|
| :- | :- | :- |
|UI shell|Good first-pass UI across dashboard, courses, enrollments, admin, reports, login/signup.|Keep and refine. Do not rebuild from scratch.|
|Data model|Mostly correct core types exist, but several are thin and many fields use text instead of controlled values.|Clean schema, add missing fields, create option sets.|
|Privacy|Most core data types are publicly visible.|Fix immediately before any production demo with real data.|
|Workflows|Some CRUD modals exist, but real workflow wiring must be verified.|Audit every button and workflow.|
|AI layer|Basic insight panel exists.|Expand into guided insight engine and assessment-report interpretation layer.|
|Reports|Strong visual shell but data consistency is not guaranteed.|Rebind all KPIs and tables to scoped Enrollment, Progress, Feedback, and Insight data.|

## **1.3 V1 must be useful to four audiences**

|**Audience**|**What they must be able to do in V1**|
| :- | :- |
|Learner|See assigned courses, continue learning, complete lessons, view announcements, submit reflections, download certificates.|
|Client Admin / HR or L&D|Assign learners, monitor progress, view cohort dashboards, submit AI-guided insights, download reports, track actions.|
|Facilitator / Trainer|See assigned cohorts, sessions, learner progress, resources, attendance, feedback, and post-session action notes.|
|Strengthscape Super Admin / Ops|Manage companies, courses, modules, lessons, cohorts, enrollments, facilitators, reports, AI prompts, and governance.|

# **2. Source logic and Edge10 context**
This guide expands the LMS beyond a generic course portal. The platform should fit the broader Edge10 direction: CRM truth remains in Zoho, Notion/Edge10 holds execution and intelligence workflows where relevant, and LMS becomes the learning, client insight, and enablement surface.
## **2.1 Edge10 design assumptions used**
**•** Zoho CRM remains the source of commercial truth for accounts, contacts, opportunities, tasks, campaigns, and sales reporting.

**•** The LMS should not try to replace CRM, proposal intelligence, or the assessment engine.

**•** The LMS should consume selected program, company, learner, cohort, facilitator, and insight data.

**•** The LMS must support assessment-led learning journeys, not only video courses.

**•** The AI layer should be guided and structured first, using fixed questions and constrained prompts rather than open-ended chat.

**•** The system should be built in sandbox/prototype mode first and then hardened before live client use.

**•** Microsoft environment should be respected where relevant, especially for Outlook, Teams, OneDrive, and SharePoint in later phases.
## **2.2 What LMS should own vs not own**

|**Layer**|**LMS should own**|**Should stay outside or later**|
| :- | :- | :- |
|Learning delivery|Courses, modules, lessons, learner progress, completion, certificates.|Full SCORM/xAPI engine in V1.|
|Client visibility|Company dashboard, cohort dashboard, progress, feedback, insights.|CRM pipeline and sales opportunity stages.|
|Assessment usage|Upload/link summary reports, display insights, generate rituals/action plans.|Full psychometric scoring engine and item-level assessment administration.|
|Facilitator operations|Assigned cohorts, resources, attendance, QR feedback, session notes.|Full trainer marketplace in V1.|
|AI guidance|Fixed question insight engine, facilitator prep brief, learner action plan suggestions.|Unrestricted chatbot that reads all company data without controls.|
|Internal academy|Sales training, play-based learning, pitch quizzes, enablement content.|Yoodli-like video coaching in V1 unless integrated later.|

## **2.3 Edge10 modules that should eventually connect**

|**Edge10 module**|**How LMS should connect later**|
| :- | :- |
|CRM Intelligence|Import client/account/course/enrollment data selectively; show learning history relevant to accounts and proposals.|
|Sales Cockpit|Host internal sales learning paths, product pitch training, play cards, objection handling, quizzes.|
|Sales Pursuits|Train sales team on active pursuits; attach play-specific learning assets and pitch scripts.|
|Proposal Intelligence|Use LMS outcome and assessment insight data as evidence for proposals and renewal conversations.|
|Assessment Engine|Consume completed assessment reports or summary outputs; display team heatmaps and guided action prompts.|
|Trainer Portal|Share facilitator assignments, materials, feedback summaries, and trainer readiness data.|
|Website Intake|Route post-webinar learners/certification prospects into LMS journeys once commercial conversion is complete.|

# **3. What already exists in Bubble**
## **3.1 Pages created**

|**Current page**|**Observed purpose**|**Keep?**|**Main fixes**|
| :- | :- | :- | :- |
|index|Unified role dashboard with learner/admin/facilitator/super admin blocks.|Yes|Show only one role dashboard at a time; fix role navigation.|
|my-courses|Learner-specific enrolled course page with filters and cards.|Yes|Fix status labels, dynamic data, and CTA logic.|
|courses|Course catalog and content management page.|Yes|Add course outline editor and role-based visibility.|
|enrollments|Admin enrollment management page.|Yes|Wire real workflows and cohort bulk enrollment.|
|admin|Company, user, cohort, and announcement management hub.|Yes|Add role scoping, better tables, soft-delete.|
|reports|Analytics and insights page.|Yes|Rebind to one scoped data source; improve filters.|
|login/signup popups|Authentication UI.|Yes|Fix signup company handling and role assignment.|
|404 / reset\_pw|Standard Bubble pages.|Yes|Brand lightly if needed.|

## **3.2 Current data types**
**•** Announcement, Certificate, Cohort, CohortLearner, Company, Course, Enrollment, InsightResponse, Lesson, Module, Progress, User
## **3.3 Critical current issue**

|**Security warning:** Most data types are currently publicly visible. Do not put real client data into the app until privacy rules are fixed and tested with Run as for every role.|
| :- |

# **4. Product vision and roles**
## **4.1 User roles to implement**

|**Role**|**Who it represents**|**Core permissions**|
| :- | :- | :- |
|Super Admin|Strengthscape platform owner|All data, all companies, all content, global reports, settings, AI prompt library, integrations.|
|Strengthscape Ops Admin|Internal LMS operator|Manage companies, users, enrollments, cohorts, content, sessions, reports; no app settings.|
|Content Manager|Internal learning content owner|Create/edit courses, modules, lessons, resources, quizzes, templates.|
|Client Admin|HR/L&D or business sponsor|Own company learners, cohorts, enrollments, progress, feedback, reports, insights.|
|Learner|Participant|Assigned courses, sessions, lessons, reflections, action plans, certificates.|
|Facilitator|Trainer/coach delivering program|Assigned cohorts, session materials, learner progress, attendance, feedback summaries, action notes.|
|Reviewer/Leadership Viewer|Client sponsor or Strengthscape leadership|Read-only dashboards and summary reports.|
|Sales/Internal Learner|Strengthscape salesperson or employee|Internal academy, play training, quizzes, sales certification.|

## **4.2 Minimum role implementation in Bubble**
**•** Create an Option Set called UserRole.

**•** Keep the four roles from the existing app for immediate V1: Learner, Client Admin, Facilitator, Super Admin.

**•** Add Strengthscape Ops Admin, Content Manager, Reviewer, and Sales/Internal Learner in V1.5 or V2 if time allows.

**•** Do not use plain text for roles.
# **5. Feature architecture by module**

|**Module**|**Features to build**|
| :- | :- |
|Foundation|Multi-tenant companies, role-based dashboards, privacy rules, secure auth, role navigation.|
|Learning Delivery|Courses, modules, lessons, resources, lesson types, learner progress, completion tracking, certificates.|
|Cohorts and Sessions|Cohort creation, learner grouping, facilitator assignment, session schedule, session resources.|
|Client Portal|Company dashboard, cohort progress, completion data, overdue learners, feedback, AI insights, action plans.|
|Facilitator Portal|Assigned cohorts, learner progress, session prep, attendance, QR feedback, post-session notes.|
|AI Insights|Fixed question insight engine, HR/L&D guidance, ritual/action plan generator, facilitator prep brief.|
|Assessment Interpretation|Upload/link assessment summaries, team heatmap, style/behavior insights, recommended rituals.|
|Feedback and Evidence|QR feedback, session feedback, trainer feedback, testimonial capture, evidence of behavior change.|
|Internal Academy|Sales training, product/play certification, pitch quizzes, CRM/Edge10 process learning.|
|Reports|Learner, cohort, company, facilitator, course, assessment, feedback, and internal academy reports.|
|Integrations|Video hosting, AI API, Make/Apps Script, Microsoft, Notion/Zoho roadmap, storage, certificate generator.|

# **6. Data model master specification**
This section is the developer’s database checklist. Existing Bubble types should be updated rather than recreated unless field conversion is blocked.

|**Data type**|**Status**|**Fields**|**Developer notes**|
| :- | :- | :- | :- |
|Company|Existing; enhance|name text; logo image; status CompanyStatus; primary\_admin User; enabled\_courses list of Course; industry text; account\_type text; company\_code text; notes text; is\_demo yes/no|Tenant root. Every company-specific record should link to Company.|
|User|Existing; enhance|name text; email built-in; avatar image; company Company; role UserRole; is\_active yes/no; job\_title text; department text; manager User optional|User is also Bubble auth user. Do not create separate Profile unless needed.|
|Course|Existing; enhance|title text; short\_description text; description text; thumbnail image; status CourseStatus; category CourseCategory; created\_by User; estimated\_duration text; enabled\_companies list of Company; is\_internal yes/no|Master learning asset. Published courses visible based on company/internal logic.|
|Module|Existing|course Course; title text; order\_index number; description text optional|Container for lessons.|
|Lesson|Existing; enhance|module Module; title text; content text; type LessonType; order\_index number; video\_url text; resource\_file file; duration\_minutes number; is\_required yes/no|Supports video/text/PDF/live/quiz placeholders.|
|Enrollment|Existing; enhance|learner User; course Course; company Company; cohort Cohort optional; start\_date date; due\_date date; status EnrollmentStatus; completion\_percentage number; assigned\_by User|Company field makes privacy/reporting easier. Set it from learner company.|
|Progress|Existing|enrollment Enrollment; lesson Lesson; completed yes/no; completed\_at date; learner User optional|Can add learner for easier searches but keep enrollment as source.|
|Cohort|Existing; enhance|name text; company Company; course Course; facilitator User; start\_date date; end\_date date; status CohortStatus; cohort\_type CohortType; notes text|Client program delivery unit.|
|CohortLearner|Existing|cohort Cohort; learner User; added\_by User; status text optional|Join table for many learners in one cohort.|
|Session|New|title text; company Company; cohort Cohort; course Course; facilitator User; start\_datetime date; end\_datetime date; location\_or\_link text; status SessionStatus; session\_notes text|Needed for real program delivery.|
|Certificate|Existing|learner User; course Course; enrollment Enrollment; issued\_at date; certificate\_file file; certificate\_id text|Create at 100% completion.|
|Announcement|Existing; enhance|title text; message text; company Company; cohort Cohort optional; course Course optional; created\_by User; expiry\_date date; visibility\_scope AnnouncementVisibility|Learner sees only relevant announcements.|
|InsightQuestion|New|question text; category InsightCategory; role\_visibility list of UserRole; active yes/no; display\_order number; default\_prompt text|Controlled question bank for AI-guided insights.|
|InsightResponse|Existing; enhance|company Company; cohort Cohort optional; course Course optional; question text or InsightQuestion; response\_text text; submitted\_by User; submitted\_at date; ai\_generated yes/no; status InsightStatus|Stores client/admin insights and AI outputs.|
|ActionPlan|New|company Company; cohort Cohort optional; learner User optional; title text; description text; owner User optional; due\_date date; status ActionStatus; source InsightResponse optional|Turns insights into next actions.|
|AssessmentReport|New|company Company; cohort Cohort optional; learner User optional; assessment\_type AssessmentType; report\_file file; summary\_text text; uploaded\_by User; report\_date date; visibility AssessmentVisibility|Stores report summaries and uploaded PDFs, not full assessment engine.|
|AssessmentInsight|New|assessment\_report AssessmentReport; company Company; cohort Cohort optional; theme text; risk\_level RiskLevel; recommended\_ritual text; generated\_by\_ai yes/no|AI/readout layer on assessments.|
|FeedbackForm|New|title text; company Company optional; course Course optional; session Session optional; active yes/no; qr\_code\_url text optional|Template for QR feedback.|
|FeedbackResponse|New|company Company; cohort Cohort optional; session Session optional; facilitator User optional; learner User optional; rating number; nps number; comments text; submitted\_at date|Evidence and trainer quality layer.|
|Notification|New|user User; title text; body text; notification\_type NotificationType; read yes/no; related\_course Course optional; related\_session Session optional; created\_at date|In-app notification center.|
|InternalPlay|New optional|name text; play\_family text; buyer text; pitch\_summary text; resources list of file/text; status text|Supports internal sales academy and Edge10 play training.|
|Quiz|New optional|course Course; title text; passing\_score number; active yes/no|Lightweight knowledge checks.|
|QuizQuestion|New optional|quiz Quiz; question text; option\_a text; option\_b text; option\_c text; option\_d text; correct\_option text; explanation text|Simple quizzes; not SCORM.|
|QuizAttempt|New optional|quiz Quiz; learner User; score number; passed yes/no; submitted\_at date|Internal academy and learner checks.|

## **6.1 Beginner-friendly field naming rules**
**•** Use lowercase\_with\_underscores or simple Bubble-style names consistently.

**•** Do not keep both old and new fields forever. If you create role\_os or status\_os temporarily, migrate data and then stop using the old text field.

**•** Every tenant-specific record must have a Company field directly or indirectly.

**•** For easier reporting and privacy, add company directly to Enrollment, Session, FeedbackResponse, InsightResponse, AssessmentReport, and ActionPlan.

**•** Use option sets for values that drive conditions, filters, and workflows.
# **7. Option sets and controlled values**
## **UserRole**
**•** Learner

**•** Client Admin

**•** Facilitator

**•** Super Admin

**•** Strengthscape Ops Admin

**•** Content Manager

**•** Reviewer

**•** Sales/Internal Learner
## **CourseStatus**
**•** Draft

**•** Published

**•** Archived
## **EnrollmentStatus**
**•** Not Started

**•** In Progress

**•** Completed

**•** Overdue

**•** Dropped
## **CohortStatus**
**•** Planned

**•** Active

**•** Completed

**•** Archived
## **LessonType**
**•** Video

**•** Text

**•** PDF

**•** Live Session

**•** Quiz Placeholder

**•** Reflection

**•** Action Plan
## **AnnouncementVisibility**
**•** Company-wide

**•** Cohort-specific

**•** Course-specific

**•** Internal-only
## **SessionStatus**
**•** Planned

**•** Completed

**•** Cancelled

**•** Rescheduled
## **InsightCategory**
**•** Rituals

**•** Next 30 Days

**•** Risks

**•** Manager Application

**•** Leader Communication

**•** Behaviors

**•** Sustainment

**•** HR Monitoring

**•** Quick Wins

**•** Assessment Interpretation
## **InsightStatus**
**•** Draft

**•** Submitted

**•** Reviewed

**•** Converted to Action Plan
## **ActionStatus**
**•** Open

**•** In Progress

**•** Completed

**•** Deferred

**•** Cancelled
## **AssessmentType**
**•** Everything DiSC Workplace

**•** Everything DiSC Management

**•** Everything DiSC Work of Leaders

**•** Five Behaviors

**•** Team Report

**•** Custom Survey

**•** Other
## **RiskLevel**
**•** Low

**•** Medium

**•** High
## **FeedbackScale**
**•** Poor

**•** Fair

**•** Good

**•** Very Good

**•** Excellent
## **NotificationType**
**•** Course Assigned

**•** Session Scheduled

**•** Announcement Posted

**•** Certificate Earned

**•** Overdue Reminder

**•** Insight Created

**•** Feedback Requested
## **CohortType**
**•** Client Cohort

**•** Internal Cohort

**•** Certification Cohort

**•** Sales Academy Cohort
## **7.1 Bubble prompt - option sets**
Create option sets for UserRole, CourseStatus, EnrollmentStatus, CohortStatus, LessonType, AnnouncementVisibility, SessionStatus, InsightCategory, InsightStatus, ActionStatus, AssessmentType, RiskLevel, NotificationType, and CohortType. Replace text-based role and status logic wherever possible.
# **8. Privacy and multi-tenant security**

|**Production warning:** This is the first production gate. Until privacy is fixed, the app must use dummy data only.|
| :- |

|**Type**|**Privacy rule**|**Notes**|
| :- | :- | :- |
|User|Self: This User is Current User. Client Admin: This User company = Current User company. Super Admin/Ops: all.|Learners cannot browse other users. Facilitators see learners only through assigned cohorts.|
|Company|Super Admin/Ops: all. Client Admin/Learner/Facilitator: only Current User company.|Never leave Company public.|
|Course|Super Admin/Content Manager: all. Learners: published and enabled for company or enrolled. Client Admin: company-enabled published courses. Facilitator: cohort course.|Draft/Archived hidden from learners.|
|Module|Inherit Course visibility.|Module is visible only if related Course is visible.|
|Lesson|Learner: lesson belongs to enrolled course. Admin/facilitator: based on course/cohort access.|Do not expose draft lessons to learners.|
|Enrollment|Learner: own enrollment. Client Admin: learner company = Current User company. Facilitator: assigned cohort learners. Super Admin/Ops: all.|Enrollment is main reporting object.|
|Progress|Learner: own enrollment progress. Client Admin: same company. Facilitator: assigned cohort. Super Admin/Ops: all.|Avoid public visibility.|
|Cohort|Client Admin: own company. Facilitator: facilitator = Current User. Learner: linked via CohortLearner. Super Admin/Ops: all.|Cohort is sensitive.|
|Certificate|Learner: own certificates. Client Admin: same company. Super Admin/Ops: all.|Facilitator access optional only if needed.|
|Announcement|Company-wide by company; Cohort-specific by cohort membership/access; Course-specific by enrollment/course access.|Expiry\_date should hide old announcements.|
|InsightResponse|Client Admin: own company. Super Admin/Ops: all. Facilitator: only if assigned cohort and explicitly allowed.|Learners do not need broad access.|
|AssessmentReport|Client Admin: own company summary only. Learner: own report if allowed. Facilitator: assigned cohort summary. Super Admin/Ops: all.|Very sensitive. Start with strict rules.|
|FeedbackResponse|Client Admin: aggregate only if possible. Facilitator: session feedback summary, not necessarily individual names. Super Admin/Ops: all.|Protect anonymity where promised.|
|ActionPlan|Company/cohort/owner scoped.|Only owners and admins should edit.|

## **8.1 Manual steps to set privacy in Bubble**
**1.** Open Data > Privacy.

**2.** Select each data type one by one.

**3.** Click Define a new rule.

**4.** Name rules clearly: learner\_own\_record, client\_admin\_same\_company, facilitator\_assigned\_cohort, super\_admin\_all.

**5.** Set conditions exactly using Current User role and company relationships.

**6.** Uncheck fields that should not be visible for that role.

**7.** After creating rules, confirm the type no longer says Publicly visible.

**8.** Use Run as from App Data to test each role.
## **8.2 Bubble prompt - privacy**
Apply strict privacy rules across all LMS data types. Learners see only their own records. Client Admins see only their company. Facilitators see assigned cohort data. Super Admin and Ops Admin see all. Remove public visibility from tenant data.
# **9. Authentication, signup, invite, and role routing**
## **9.1 Current issue**
The signup modal currently asks for free-text company name. This is risky because users can create duplicate companies or self-assign to the wrong tenant.
## **9.2 Recommended V1 signup flow**
**1.** Public signup should create a User only in Pending state, or should be disabled for client tenants.

**2.** Client users should normally be invited by Super Admin or Client Admin.

**3.** Invite link should carry company\_id and intended\_role as URL parameters, or the admin should create the user from the Admin page.

**4.** New user role should default to Learner unless created by an authorized admin.

**5.** Company should be selected from an existing Company record, not typed freely by the learner.
## **9.3 Login redirect logic**

|**Role**|**After login show**|
| :- | :- |
|Learner|index with Learner dashboard group visible; My Courses and Course Catalog nav.|
|Client Admin|index with Client Admin dashboard group visible; Enrollments, Reports, Management.|
|Facilitator|index with Facilitator dashboard group visible; assigned cohorts and session views.|
|Super Admin / Ops|index with Super Admin dashboard group visible; admin, courses, enrollments, reports.|
|Sales/Internal Learner|internal academy dashboard when implemented.|

## **9.4 Bubble prompt - login and invite**
Make authentication role-aware. Disable free-text company creation for learners. Admins invite or create users and assign existing Company plus UserRole. After login, route users to index and show only their role-specific dashboard and navigation.
# **10. Page-by-page build instructions**

|**Page**|**Purpose**|**Developer instructions**|
| :- | :- | :- |
|index|Unified dashboard shell|Keep one page but create separate visible groups for Learner, Client Admin, Facilitator, Super Admin/Ops, Internal Sales. Only one group visible at a time.|
|my-courses|Learner enrolled courses|Data source: Enrollments where learner = Current User. Filter by status. CTA goes to course player.|
|courses|Course catalog and content management|Learners see published enabled courses. Admins manage all. Add course outline editor.|
|enrollments|Assign and track learner-course records|Client Admin sees own company. Super Admin sees all. Add cohort bulk enrollment later.|
|admin|Companies, users, cohorts, announcements|Make tabs role-scoped. Add soft delete/deactivate.|
|reports|Analytics and insights|Rebuild from one filtered data source. Add filters by company/course/cohort/status/date.|
|course-player|New page/reusable|Displays modules, lessons, content, Mark Complete, progress.|
|cohort-detail|New page/reusable|Shows learners, course, sessions, facilitator, progress, announcements, feedback.|
|session-detail|New page/reusable|Shows agenda, resources, attendance, feedback link, facilitator notes.|
|assessment-insights|New page or tab|Upload/link assessment report, show summaries, heatmap, AI-guided rituals/action plan.|
|internal-academy|New page later|Strengthscape sales/team learning paths, play training, quizzes.|
|trainer/facilitator profile|New page later|Trainer profile, skills, DISC certification status, city, fee band, assigned cohorts.|

## **10.1 Common page cleanup tasks**
**•** Remove placeholder labels like Parent group’s Enrollment’s status from the UI.

**•** Add empty states for no courses, no enrollments, no reports, no feedback, no insights.

**•** Check every button has a workflow or is clearly labelled Prototype only.

**•** Keep reusable header and sidebar; do not duplicate navigation manually on every page if reusable elements already exist.

**•** Use the same page width, spacing, and card style across all pages.
# **11. Core learner journey workflows**
## **11.1 Course assignment to completion flow**
**1.** Admin creates Course, Modules, Lessons.

**2.** Admin publishes Course.

**3.** Admin creates Enrollment for Learner and Course, with due date and default status Not Started.

**4.** Learner logs in and sees the course under My Courses.

**5.** Learner opens Course Player.

**6.** Learner completes lesson by clicking Mark Complete.

**7.** System creates or updates Progress record.

**8.** System recalculates Enrollment completion\_percentage.

**9.** When completion reaches 100%, system sets status Completed and creates Certificate.

**10.** Reports update automatically from Enrollment, Progress, and Certificate.
## **11.2 Progress formula**
completion\_percentage = (completed Progress records for this Enrollment / total Lessons in the Course) \* 100
## **11.3 Mark Complete workflow - Bubble steps**
**1.** Button: Mark Complete.

**2.** Only when Current User is logged in and Current Page Enrollment’s learner is Current User.

**3.** Search for Progress where enrollment = current enrollment and lesson = current lesson.

**4.** If count is 0: Create a new Progress.

**5.** If count is > 0: Make changes to first item.

**6.** Set completed = yes and completed\_at = Current date/time.

**7.** Calculate completed lesson count and update Enrollment.completion\_percentage.

**8.** Update Enrollment.status based on the percentage and due date.

**9.** If percentage = 100 and no Certificate exists, create Certificate.
## **11.4 Bubble prompt - course player**
Create a learner course player. Show modules and lessons in order, lesson content, Previous, Next, and Mark Complete. Mark Complete creates or updates Progress, recalculates Enrollment completion, updates status, and creates Certificate at 100%.
# **12. Client Admin and HR/L&D portal**
This is one of the most important client-facing features. The LMS must help HR/L&D see whether learning is moving into action, not only whether videos were watched.
## **12.1 Client dashboard components**
**•** Company KPI cards: active learners, active cohorts, average completion, overdue learners, certificates issued.

**•** Cohort cards: cohort name, course, facilitator, learner count, average progress, next session.

**•** Learner table: learner, email, courses enrolled, completion %, status, overdue flag.

**•** Program action panel: open action plans, next 30-day actions, rituals created.

**•** Insight history: recent AI-guided or admin-submitted insights.

**•** Feedback summary: average session rating, NPS, comments themes.
## **12.2 Client Admin workflows**
**1.** Add learner to company.

**2.** Enroll learner in course.

**3.** Create cohort and add learners.

**4.** Assign facilitator to cohort.

**5.** View progress and overdue learners.

**6.** Submit guided insight response.

**7.** Convert insight into action plan.

**8.** Download or export simple progress report.
## **12.3 Bubble prompt - client portal**
Enhance Client Admin dashboard with company KPIs, cohort cards, learner table, overdue alerts, feedback summary, recent insights, and action plans. Scope all data to Current User company only.
# **13. Facilitator workspace**
## **13.1 Why facilitator workspace matters**
Strengthscape delivery depends on facilitators. The LMS should help facilitators prepare, deliver, capture evidence, and follow up.
## **13.2 Facilitator dashboard components**
**•** Assigned cohorts only.

**•** Upcoming sessions.

**•** Course outline and facilitator resources.

**•** Learner progress summary.

**•** Attendance capture.

**•** Session notes.

**•** Feedback summary.

**•** Post-session action recommendations.
## **13.3 Facilitator workflow**
**1.** Facilitator logs in.

**2.** Sees only assigned cohorts.

**3.** Opens cohort detail.

**4.** Reviews course, learner list, progress, and upcoming session.

**5.** Downloads or opens session resources.

**6.** After session, marks attendance and adds notes.

**7.** Shares QR feedback link if feedback module is enabled.

**8.** Views feedback summary and suggested follow-up actions.
## **13.4 Bubble prompt - facilitator workspace**
Build facilitator workspace for assigned cohorts only. Show upcoming sessions, learner progress, course resources, attendance, session notes, feedback summary, and post-session action prompts. Keep permissions read-only except attendance and notes.
# **14. Super admin and content operations**
## **14.1 Content lifecycle**

|**Status**|**Meaning**|**Visibility**|
| :- | :- | :- |
|Draft|Course/module/lesson being built.|Only Super Admin, Ops Admin, Content Manager.|
|Published|Ready for enrollment and learner visibility.|Visible to enrolled/enabled users.|
|Archived|No new enrollment; preserve history.|Admin only; learner access only if already completed and allowed.|

## **14.2 Content authoring steps**
**1.** Create Course with title, description, thumbnail, category, status Draft.

**2.** Open Course Outline.

**3.** Add Modules in sequence.

**4.** Add Lessons under each module.

**5.** Set lesson type and content/resource/video placeholder.

**6.** Preview as learner.

**7.** Set Course status to Published.

**8.** Enable course for selected companies if using company-level enabled\_courses.

**9.** Create enrollments or cohorts.
## **14.3 Course quality fields to add later**
**•** Learning outcomes

**•** Target audience

**•** Estimated time

**•** Competencies covered

**•** Mapped Edge10 Play

**•** Assessment/report required yes/no

**•** Certificate enabled yes/no

**•** Recommended follow-up rituals
## **14.4 Bubble prompt - content management**
Improve content management. Courses have Draft, Published, Archived. Add course outline editor with modules and lessons. Allow Super Admin and Content Manager to create, edit, preview, publish, and archive content.
# **15. Internal Strengthscape academy and sales enablement layer**
The LMS should also become Strengthscape’s internal academy for sales, delivery, and operations. This connects directly to Edge10 Sales Cockpit, Sales Pursuits, and Play Taxonomy work.
## **15.1 Internal academy learning paths**

|**Learning path**|**Suggested content**|
| :- | :- |
|Sales Onboarding|Selling cycle, CRM hygiene, consultative selling, discovery questions, proposal handoff.|
|Product/Play Training|DiSC Certification, Five Behaviors, Jamavaar, AI for Leaders, Work of Leaders, First Time Manager, MDP, Culture Transformation.|
|Pitch Practice|Persona-based pitch scripts, objection handling, value proposition, call opening, closing.|
|CRM/Edge10 Training|How to use Zoho/Notion/CRM Intelligence, Sales Cockpit, Sales Pursuits, lead qualification.|
|Facilitator Enablement|Delivery standards, assessment debriefing, session rituals, QR feedback process.|
|Policy/Compliance|POSH awareness, data privacy, AI usage guardrails, client confidentiality.|

## **15.2 Data model additions for internal academy**
**•** Use existing Course with is\_internal = yes.

**•** Create cohorts for internal learners such as Sales Team, Facilitators, New Joiners.

**•** Add Quiz, QuizQuestion, and QuizAttempt if knowledge checks are needed.

**•** Use certificates/badges for internal completion: DiSC Certification Sales Ready, Jamavaar Pitch Ready, CRM Ready.
## **15.3 Bubble prompt - internal academy**
Add an Internal Academy mode using existing Course and Enrollment types. Internal courses can be assigned to Strengthscape users for sales play training, CRM training, facilitator enablement, quizzes, and completion certificates.
# **16. AI-guided insights and assessment-report layer**
## **16.1 Guided AI approach**
The AI layer should begin with controlled dropdown questions, not an open chatbot. This keeps client-facing guidance safer and easier to explain.
## **16.2 Standard insight questions**
**•** What should this team do in the next 30 days?

**•** What rituals should this team create?

**•** What risks should we watch for?

**•** How should a first-time manager apply this?

**•** What should leaders communicate next?

**•** What behaviors should be reinforced?

**•** What are the likely blockers to progress?

**•** How should this be sustained after training?

**•** What should HR or L&D monitor?

**•** What quick wins are possible immediately?

**•** What does the assessment data suggest about team dynamics?

**•** What should the facilitator emphasize in the next session?

**•** What follow-up action should managers take?

**•** What should be converted into an action plan?

**•** What evidence should we capture before the next review?
## **16.3 Assessment report interpretation module**
**•** AssessmentReport stores uploaded report or summary.

**•** AssessmentInsight stores themes, risks, strengths, recommended rituals, and action suggestions.

**•** Client Admin sees company/cohort-level interpretation only.

**•** Learner sees only individual report if explicitly allowed.

**•** Facilitator sees assigned cohort insights to prepare sessions.

**•** AI should generate suggestions from selected prompt templates and report summaries, not unrestricted database access.
## **16.4 AI output workflow**
**1.** User selects insight question.

**2.** User selects scope: company, cohort, course, or assessment report.

**3.** Bubble sends structured prompt to Make/API workflow later.

**4.** AI response is saved as InsightResponse or AssessmentInsight.

**5.** User can mark response as Reviewed.

**6.** User can convert response into ActionPlan.
## **16.5 Beginner-friendly V1 without real API**
**•** Keep AI response as manual text field in V1.

**•** Use the question bank and history UI now.

**•** Add real AI API in V1.5 once privacy and workflow are stable.
## **16.6 Bubble prompt - guided AI insight module**
Upgrade Insights into a guided question engine. Add InsightQuestion bank, optional company/cohort/course/report scope, response history, reviewed status, and Convert to Action Plan. Keep AI response manual until API integration is added.
# **17. Feedback, QR, certification, and evidence capture**
## **17.1 Feedback features**
**•** Create feedback form per course, session, or cohort.

**•** Generate or store QR feedback link for facilitators.

**•** Capture rating, NPS, comments, trainer feedback, and learning usefulness.

**•** Show facilitator feedback summary to Super Admin and Ops.

**•** Show client-friendly aggregate summary to Client Admin.

**•** Use feedback as evidence for renewal/proposal intelligence later.
## **17.2 QR feedback V1 implementation**
**1.** Create FeedbackForm record linked to Session or Cohort.

**2.** Create a public feedback page with URL parameter feedback\_form\_id.

**3.** Learner scans QR or opens link.

**4.** User submits rating/comments.

**5.** Create FeedbackResponse linked to form, company, cohort, session, facilitator.

**6.** Show aggregate results on session/cohort/report pages.
## **17.3 Certificate improvements**
**•** Certificate ID format: EDGE-LMS-[course slug]-[date]-[short unique id].

**•** Certificate preview can be HTML/card in V1.

**•** Real PDF generation can be done later with a PDF generator or backend workflow.

**•** Certificates should be created only once per enrollment.
## **17.4 Bubble prompt - feedback and QR**
Add FeedbackForm and FeedbackResponse. Let admins create feedback forms for sessions/cohorts and show a QR/link placeholder. Capture rating, NPS, comments, learner, facilitator, session, and company. Show aggregate feedback summaries.
# **18. Reports and dashboards**
## **18.1 Report families**

|**Report**|**Primary data types**|**What to show**|
| :- | :- | :- |
|Learner progress|Enrollment, Progress|Completion %, status, overdue, certificates.|
|Cohort report|Cohort, Enrollment, Session, Feedback|Cohort completion, attendance, feedback, actions.|
|Company report|Company, User, Enrollment, Feedback, Insight|Learner count, courses, cohorts, completion, insights, action plan status.|
|Facilitator report|Session, Feedback, Cohort|Assigned sessions, learner progress, feedback score.|
|Course report|Course, Enrollment, Progress, Feedback|Course usage, completion, lesson bottlenecks.|
|Assessment insight report|AssessmentReport, AssessmentInsight, ActionPlan|Themes, risks, rituals, next actions.|
|Internal academy report|Enrollment, QuizAttempt, Certificate|Sales/team readiness, quiz scores, completion.|

## **18.2 Main reporting rule**

|**Reporting rule:** Every report page should use one scoped filtered source, then derive all KPI cards, charts, and tables from that same source. This prevents mismatches such as cards showing 0% while charts show 71%.|
| :- |

## **18.3 Suggested filters**
**•** Company

**•** Course

**•** Cohort

**•** Facilitator

**•** Status

**•** Date range

**•** Internal vs client program

**•** Assessment type

**•** Play/category
## **18.4 Bubble prompt - reports**
Rebuild reports from one role-scoped data source. Add filters for Company, Course, Cohort, Facilitator, Status, Date Range, and Internal/Client. Show learner progress, cohort progress, feedback, insights, certificates, and overdue learners.
# **19. Integrations and automation roadmap**

|**Integration**|**Tool/Layer**|**Use**|**Phase**|
| :- | :- | :- | :- |
|Video hosting|Vimeo/YouTube private/other|Use external hosted video URL in Lesson.video\_url. Do not upload large videos into Bubble database.|V1.5|
|File storage|Bubble file manager initially; later S3/Uploadcare/OneDrive if needed|Store PDFs/resources as files; avoid large media overload.|V1/V1.5|
|AI API|OpenAI/Gemini via Make/API Connector|Use for guided insights, action plans, facilitator briefs, report summaries.|V1.5|
|Make/Apps Script|Automation bus|Connect LMS to AI, email, certificates, Zoho/Notion later.|V1.5/V2|
|Microsoft|Outlook/Teams/OneDrive|Send reminders, store client reports, link resources.|V2|
|Zoho CRM|Commercial source of truth|Later sync company/client/program completion summaries or account insights.|V2|
|Notion Edge10|Execution/intelligence workspace|Later mirror LMS insights into proposal/client intelligence workflows.|V2|
|Certificate PDF|PDF generator/backend workflow|Generate downloadable branded certificate PDFs.|V2|
|Payments|Razorpay/Stripe|Only needed if selling B2C certifications or paid courses inside LMS.|V3|

# **20. Bubble AI prompt bank**
Use these prompts one at a time. After each prompt, inspect the result before applying the next prompt.

|**Area**|**Bubble prompt**|
| :- | :- |
|Schema|Enhance schema with Session, InsightQuestion, AssessmentReport, AssessmentInsight, ActionPlan, FeedbackForm, FeedbackResponse, Notification, Quiz, QuizQuestion, and QuizAttempt. Link all company-scoped records to Company.|
|Privacy|Apply strict privacy rules. Learners see own records. Client Admins see only their company. Facilitators see only assigned cohorts. Super Admin/Ops see all. Remove public visibility from tenant data.|
|Sidebar|Make reusable sidebar role-aware. Learner sees Dashboard/My Courses/Catalog. Client Admin sees Dashboard/Enrollments/Reports/Management. Facilitator sees assigned cohorts. Super Admin sees all.|
|Course player|Create learner course player with module/lesson navigation, lesson content, Previous/Next, Mark Complete, progress update, status update, and certificate creation at 100%.|
|Course editor|Create course outline editor. Admin can add/edit/delete modules and lessons, set lesson type, order\_index, content, video\_url, and resource\_file. Sort modules and lessons by order\_index.|
|Cohorts|Enhance cohort management with start/end date, status, facilitator, learners, linked course, sessions, announcements, progress summary, and feedback summary.|
|Sessions|Add Session feature linked to Company, Cohort, Course, Facilitator with title, date/time, link/location, status, resources, attendance, and notes. Show upcoming sessions on dashboards.|
|Client portal|Enhance Client Admin dashboard with company KPIs, learner table, cohort cards, overdue alerts, feedback summary, recent insights, and action plans. Scope all data to Current User company.|
|Facilitator|Build facilitator workspace for assigned cohorts only. Show upcoming sessions, resources, learner progress, attendance, notes, feedback summary, and post-session action prompts.|
|Insights|Upgrade insights with InsightQuestion bank, scope selector for company/cohort/course/assessment report, response history, reviewed status, and Convert to Action Plan.|
|Assessment|Add assessment-report layer. Admin uploads report file/summary, links to company/cohort/learner, stores assessment type, and creates AssessmentInsights with themes, risks, rituals, and actions.|
|Feedback|Add QR-ready feedback forms for sessions/cohorts. Capture rating, NPS, comments, learner, facilitator, session, company. Show aggregate feedback summaries.|
|Internal academy|Add Internal Academy mode using existing Course/Enrollment. Internal courses support sales play training, CRM training, quizzes, sales readiness certificates, and internal cohort reports.|
|Reports|Rebuild reports from one role-scoped source. Add filters for company, course, cohort, facilitator, status, date range, and internal/client. Show progress, feedback, insights, certificates, overdue.|
|Notifications|Add Notification type and top-nav notification panel. Create notifications for course assigned, session scheduled, announcement posted, certificate earned, overdue reminder, insight created, feedback requested.|

# **21. QA checklist and definition of done**
## **21.1 Test users to create**

|**Test user**|**Role**|**Company**|
| :- | :- | :- |
|superadmin@test.com|Super Admin|Strengthscape/internal|
|ops@test.com|Strengthscape Ops Admin|Strengthscape/internal|
|clientadmin1@companyA.com|Client Admin|Company A|
|clientadmin2@companyB.com|Client Admin|Company B|
|facilitator@strengthscape.com|Facilitator|Strengthscape/internal|
|learner1@companyA.com|Learner|Company A|
|learner2@companyB.com|Learner|Company B|
|sales@strengthscape.com|Sales/Internal Learner|Strengthscape/internal|

## **21.2 Security tests**
**•** Learner from Company A cannot see learner, enrollment, certificate, insight, or feedback data from Company B.

**•** Client Admin from Company A cannot see Company B data.

**•** Facilitator sees only assigned cohorts.

**•** Draft courses are not visible to learners.

**•** Expired announcements are not visible.

**•** Publicly visible label is removed from tenant data types.
## **21.3 Workflow tests**
**•** Admin creates company and user.

**•** Admin creates course, module, lesson.

**•** Admin publishes course.

**•** Admin enrolls learner.

**•** Learner completes lessons.

**•** Enrollment progress updates correctly.

**•** Certificate created once at 100%.

**•** Client Admin report updates.

**•** Facilitator sees assigned cohort.

**•** Feedback form creates feedback response.

**•** Insight response saves and converts to action plan.
## **21.4 Definition of done for V1**
**•** Role-based login and navigation work.

**•** All tenant data has privacy rules.

**•** Core learner course completion workflow works end to end.

**•** Client Admin can manage learners/enrollments and see reports.

**•** Super Admin can manage companies, users, courses, cohorts, announcements.

**•** Facilitator can see assigned cohorts and sessions.

**•** Reports show consistent data from same source.

**•** Insights module stores structured responses.

**•** No real client data used until privacy passes testing.
# **22. Build phase plan**

|**Phase**|**Duration**|**Work**|**Output**|
| :- | :- | :- | :- |
|Phase 0 - Stabilize existing prototype|1-2 days|Option sets, schema cleanup, privacy, role navigation, login redirect.|Safe prototype foundation.|
|Phase 1 - Core LMS working flow|3-5 days|Course editor, course player, enrollment, progress, certificates.|Learner can complete a course end to end.|
|Phase 2 - Client and facilitator operations|4-7 days|Client dashboard, cohort detail, sessions, facilitator workspace, announcements.|Client program can be managed.|
|Phase 3 - Insights and reports|4-7 days|Guided insights, action plans, feedback, reports rebind.|Client-visible value layer.|
|Phase 4 - Internal academy|3-5 days|Internal courses, quizzes, sales/play training, readiness reports.|Strengthscape team enablement.|
|Phase 5 - Integrations|As needed|AI API, video hosting, Microsoft, Notion/Zoho sync, certificate PDF.|Connected Edge10 LMS.|

# **23. Developer quick-start checklist**
**1.** Do not add new client data yet.

**2.** Create option sets.

**3.** Add missing data types and fields.

**4.** Migrate text role/status values to option sets.

**5.** Create privacy rules and verify types are no longer public.

**6.** Fix reusable sidebar conditional visibility.

**7.** Fix index dashboard group visibility.

**8.** Test login/signup/logout.

**9.** Build course outline editor.

**10.** Build course player and Mark Complete workflow.

**11.** Build certificates at 100%.

**12.** Build client dashboard and reports.

**13.** Build cohort/session/facilitator workspace.

**14.** Build insights/action plans.

**15.** Build feedback forms.

**16.** Only then consider AI API and integrations.
# **24. Final implementation note**

|**Final instruction:** The current Bubble app should be treated as a working visual prototype. The developer’s success will depend on making it secure, role-scoped, and workflow-complete before adding advanced AI or integrations. The LMS should first become reliable for real Strengthscape learning delivery and then expand into Edge10 intelligence, sales enablement, assessment insights, and trainer operations.|
| :- |

Strengthscape / Edge10 - Internal developer handoff
