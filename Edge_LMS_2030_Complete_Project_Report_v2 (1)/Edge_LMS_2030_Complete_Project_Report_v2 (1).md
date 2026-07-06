EDGE LMS 2030 — Complete Project Report  |  Built on Antegravity  |  Strengthscape

**EDGE LMS 2030**

*Complete Project Report & Implementation Playbook*

Beginner-Friendly Guide for Strengthscape

**Built on: Antegravity Platform**

Prepared for: Strengthscape Leadership Team   |   May 2026


# **📋  Table of Contents**

1\.  1. What Is This Project? (Plain Language Overview)

2\.  2. Who Is Involved and What Are Their Roles?

3\.  3. What Does the Final Product Look Like?

4\.  4. Priority Framework: P1, P2, and P3 Explained

5\.  5. Step-by-Step Build Plan — Phase 1 (P1 Priorities)

6\.  6. Step-by-Step Build Plan — Phase 2 (P2 Priorities)

7\.  7. Step-by-Step Build Plan — Phase 3 (P3 Priorities)

8\.  8. Sprint-by-Sprint Roadmap

9\.  9. Gen AI Tools That Will Help You Build This

10\.  10. Other Tools You Will Need

11\.  11. Security Rules — Simple Explanation

12\.  12. What 'Done' Looks Like (Acceptance Criteria)

13\.  13. Post-Launch: What Happens After You Go Live?

14\.  14. Key Warnings and Things Not to Do

15\.  15. Quick Reference Summary Table


# **Section 1: What Is This Project? (Plain Language Overview)**

Think of Edge LMS 2030 as Strengthscape's own private online school platform — but much smarter and more powerful than a typical school portal.

The word 'LMS' stands for Learning Management System. In simple terms, it is a website or app where:

• Employees and clients can log in and take online training courses

• Managers can check who has completed their training and who is behind

• Strengthscape's team can upload new courses, videos, and quizzes

• An AI assistant helps answer questions about training and gives recommendations

• The system automatically sends reminders, certificates, and reports

**📄 Source:** *Chapter 1 – Strategic Blueprint*

What makes Edge LMS different from a regular course website? Three big things:

|**Feature**|**What It Means in Simple Terms**|
| :- | :- |
|Multi-Tenant|Many different client companies can each have their own private area — like separate rooms in the same building|
|AI-Enabled|A built-in AI assistant that gives smart answers based on the training content and assessment results|
|Insight Platform|It does not just deliver training — it shows you patterns, risks, and recommended actions from the data|

**📄 Source:** *Chapter 1 – Strategic Blueprint  •  Chapter 2 – System Architecture*


## **1.1  The Three Main Use Cases**
The platform serves three groups of people at the same time:

|**Use Case**|**Who Uses It**|**What They Do**|
| :- | :- | :- |
|Internal Academy|Strengthscape employees & sales team|Onboarding, skills training, sales preparation, product learning|
|Client Learning Portal|Clients and their employees|Attend training programs, complete courses, download certificates|
|Consulting Insight Layer|Strengthscape consultants|View data, analyse patterns, give recommendations to clients|

**📄 Source:** *Chapter 1 – Strategic Blueprint*

**💡 Beginner Tip**

Imagine Strengthscape is a training company that teaches leadership skills to other businesses. Right now they might be sending courses by email or using basic tools. Edge LMS is the single professional platform that replaces all of that — with tracking, AI help, and beautiful reports built in.

## **1.2  Why Antegravity Is Being Used as the Primary Platform**
Antegravity is the chosen application development platform for this project. It allows the team to build a fully working website and app quickly, with role-based dashboards, conditional interfaces, course structures, learner experiences, multi-tenant logic, internal tools, and API-based orchestration — without the overhead of a traditional software engineering team.

Antegravity will act as the experience and workflow shell. It will own users, roles, companies, learning paths, lessons, quizzes, progress, certificates, dashboards, AI request forms, and reporting views.

• External services will own streaming video, subscription billing events, payment links, large file storage, AI processing, and advanced automation chains

• This produces a cleaner and more durable architecture because each system does what it is best at

• Antegravity should be responsible for experience, permissions, workflows, dashboards, and data orchestration — not media infrastructure, billing engines, or AI computation

**📄 Source:** *Chapter 1 – Strategic Blueprint  •  Chapter 2 – System Architecture*


# **Section 2: Who Is Involved and What Are Their Roles?**

Think of this project like building a new office building. You need an architect, a builder, a client who tells you what they want, and people who will eventually work in the building. Here are the equivalent people for Edge LMS:

|**Person / Team**|**Role in This Project**|**Real-World Analogy**|
| :- | :- | :- |
|Strengthscape Leadership|The client — they decide what the platform must do|The building owner who decides the layout|
|Developer (Antegravity)|The builder — constructs the platform in Antegravity|The construction team who does the physical work|
|Product Lead / Owner|Approves features, manages roadmap, makes key decisions|The project manager on the owner's side|
|Strengthscape Admins|Will manage the platform day-to-day after launch|The facilities manager who runs the building|
|Client Company Admins|Clients who manage their own team's training|The tenant of a floor in the building|
|Learners|The end users who take the courses|The people who work in the building every day|
|Consultants|Strengthscape experts who use data insights from the platform|Specialist advisors who review how people use the space|

**📄 Source:** *Chapter 2 – System Architecture  •  Chapter 4 – Experience Architecture*


## **2.1  User Roles Inside the Platform**
Every person who logs into Edge LMS gets a 'role' — like a job title that decides what they can see and do inside the system:

|**Role Name**|**What They Can See & Do**|**Priority to Set Up**|
| :- | :- | :- |
|Super Admin (Strengthscape)|Everything — all companies, all data, all settings|P1 — must be first|
|Content Admin|Create and edit courses, videos, quizzes, templates|P1|
|Client Company Admin|Manage their own team's learning, view reports, run AI insights|P1|
|Client Manager|See their team's progress only|P2|
|Learner|Take courses, see their own certificates and progress|P1|
|Facilitator / Trainer|See their assigned groups, attendance, session notes|P2|
|Finance / Ops|View payment and subscription status|P2|

**📄 Source:** *Chapter 3 – Data Architecture  •  Antegravity Developer Master Build Guide*


# **Section 3: What Does the Final Product Look Like?**

The platform has several different areas depending on who is logged in. Think of it like a shopping mall where different shops are only visible to specific people:

## **3.1  The Learner Experience (What a Student Sees)**
When a regular learner logs in, the interface is clean, simple, and focused. They see:

• A welcome screen showing their upcoming courses and deadlines

• A 'Continue Learning' button that takes them straight to where they left off

• A course player — like a YouTube-style video page with a lesson menu on the left

• Quizzes that appear after relevant lessons

• A certificate shelf where they can download their completion certificates

• A progress bar so they always know how much of a course they have completed

**📄 Source:** *Chapter 4 – Experience Architecture*

**💡 Beginner Tip**

Think of the learner experience like Netflix but for workplace training. The learner sees only what they need to do, gets nudged when something is overdue, and feels a sense of progress and achievement. The interface must feel calm, directed, and winnable.

## **3.2  The Client Admin Experience (What an HR Manager Sees)**
A client company's HR or L&D manager sees a control room view:

• Dashboard showing how many people are on track, overdue, or have completed their courses

• A list of all learners with their status and last login date

• Tools to assign courses to specific people or teams

• Heat maps — colour-coded grids showing which departments are engaged and which are falling behind

• An AI Insight tool where they can ask structured questions and get smart recommendations

• Download buttons for reports in Excel or PDF format

**📄 Source:** *Chapter 4 – Experience Architecture  •  Chapter 7 – Reporting & Analytics*

## **3.3  The Strengthscape Admin Experience (What the Platform Owner Sees)**
Strengthscape's own team sees everything:

• A global dashboard showing all client companies and their health

• A course builder to create new training modules, upload videos, and set quizzes

• An AI Prompt Manager to configure what questions clients can ask the AI assistant

• Payment and subscription tracking for all client accounts

• Audit logs showing every major action taken in the system

**📄 Source:** *Chapter 4 – Experience Architecture  •  Chapter 9 – Security, QA & Release Governance*

## **3.4  The External Services That Power Edge LMS**
Edge LMS does not do everything by itself. Antegravity is the dining room and menu, but the kitchen has specialist equipment:

|**External Service**|**What It Does**|**Real-World Analogy**|
| :- | :- | :- |
|Razorpay|Handles all payments, subscriptions, and billing|The payment machine at the restaurant counter|
|Vimeo|Hosts and streams training videos securely|The cinema projector in the back room|
|Make (formerly Integromat)|Runs automatic tasks when things happen (e.g. send email when payment fails)|The restaurant manager who coordinates everything|
|AI API (Gemini / OpenAI)|Powers the intelligent question-answering and content generation features|A brilliant consultant on call 24/7|
|Uploadcare / S3 Storage|Safely stores PDF files, templates, and large documents|The filing cabinet that never gets full|
|PDF Generator|Creates certificates and formatted reports|The printer that makes official documents|

**📄 Source:** *Chapter 2 – System Architecture  •  Chapter 8 – Commercial Architecture & Integrations*


# **Section 4: Priority Framework — P1, P2, and P3 Explained**

Building an entire platform at once is impossible — or very risky. Instead, this project uses a priority system to decide what to build first, second, and later. Think of it like building a house: you build the foundation and walls (P1) before you add nice furniture and a swimming pool (P3).

|**Priority**|**What It Means**|**Analogy**|**Timeline**|
| :- | :- | :- | :- |
|**🔴 P1**|Must-have. The platform cannot launch without these.|Foundation and walls of the house|Phase 1 — First ~16 weeks|
|**🔵 P2**|Important but not launch-blocking. These make the platform truly powerful.|Furniture and interior design|Phase 2 — Weeks 17–28|
|**🟢 P3**|Strategic and advanced. Makes Edge a long-term competitive platform.|Swimming pool and smart home features|Phase 3 — Weeks 29+|

**📄 Source:** *Chapter 10 – Implementation Roadmap & Playbook*


## **4.1  What Falls Under P1 (Must Have Before Launch)**
These features must exist before any real client can use the platform:

• User login, sign-up, and password reset

• Role-based access — Super Admin, Client Admin, Learner (the basic three)

• Multi-tenant isolation — one company cannot see another company's data

• Course creation — title, description, modules, lessons

• Video embedding via Vimeo

• Quiz builder — questions, answers, pass mark

• Progress tracking — which lessons are done, percentage complete

• Certificate generation when a course is fully completed

• Basic admin dashboard — completion count, overdue count

• Payment via Razorpay and automatic access activation

• Basic reporting with CSV export

• Learner invitation and onboarding flow

**📄 Source:** *Chapter 2 – System Architecture  •  Chapter 10 – Implementation Roadmap & Playbook*

## **4.2  What Falls Under P2 (Important — Added After Launch)**
These features make the platform genuinely powerful and differentiated:

• Heat maps showing completion patterns by department or team

• Advanced filters in reports — by date, course, team, manager

• Manager view — team leaders can see their team's progress

• AI-guided insight questions — the structured 10-question dropdown system

• Assessment file upload and AI interpretation

• Bulk user invites and bulk course assignments

• Certificate validity and renewal logic

• Survey and reflection forms — separate from graded quizzes

• Overdue notifications sent automatically

• Sales enablement hub for Strengthscape's internal sales team

**📄 Source:** *Chapter 2 – System Architecture  •  Chapter 6 – AI & Assessment Intelligence  •  Chapter 7 – Reporting & Analytics*

## **4.3  What Falls Under P3 (Strategic — Longer Term)**
These turn Edge LMS into a premium consulting platform that no typical LMS offers:

• Consultant workspace with long-term client notes and action tracking

• Culture journey dashboards with trends over 6–12 months

• Cohort comparison analytics over time

• External partner portals — client's clients can also access learning

• Advanced AI benchmarking and pattern synthesis across many clients

• Deep integration with Zoho CRM and Microsoft 365

**📄 Source:** *Chapter 2 – System Architecture  •  Chapter 10 – Implementation Roadmap & Playbook*


# **Section 5: Step-by-Step Build Plan — Phase 1 (P1 Priorities)**

This section explains exactly what needs to be built in Phase 1, in the correct order, and WHY the order matters. Think of each step like a floor in a building — you cannot build Floor 3 before Floor 1 is solid.

## **🔴 Step 1 — Sprint 0: The Foundation Setup (Do This Before Anything Else)**
**⚠️ Why This Comes First**

If you skip foundation setup and start building pages immediately, you will have to redo everything later. No visible product build should start before data types, roles, option sets, privacy strategy, and API key plans are locked. This is the most common and most costly mistake in platform development.

**What to do in Sprint 0:**

**1.** Create all your 'Data Types' — these are like database tables. The main objects the system will store are: User, Company, Course, Module, Lesson, Enrollment, Progress Record, Quiz, Quiz Attempt, Certificate, Payment Record, Subscription Record, AI Insight Request, AI Insight Response, Audit Log, Assessment Upload, Heat Map Snapshot.

**2.** Create 'Option Sets' — controlled dropdown lists. Examples: UserRole (Learner, Admin, Super Admin), LessonType (Video, PDF, Quiz, Reflection), EnrollmentStatus (Not Started, In Progress, Completed, Overdue, Locked, Archived), SubscriptionState (Active, Grace, Unpaid, Paused). NEVER use free-text for these.

**3.** Plan your page names and write them down before creating any pages. Examples: index (home), learner-dashboard, course-player, admin-dashboard, login, reports, ai-insights.

**4.** Plan Privacy Rules on paper — these are the security rules that prevent one company's data from being visible to another company's users. These must be designed before writing any logic.

**5.** Gather all API keys: Razorpay API key, Vimeo API key, AI provider key (Gemini or OpenAI), file storage credentials. Store these securely — NEVER expose them in front-end logic.

**📄 Source:** *Chapter 3 – Data Architecture  •  Chapter 10 – Implementation Roadmap & Playbook  •  Antegravity Developer Master Build Guide*

**💡 Beginner Explanation**

Think of Option Sets like official job title lists in an HR system. Instead of typing 'manager' or 'Manager' or 'MANAGER' freely (which causes confusion), you pick from a controlled list. This makes searching, filtering, and reporting reliable across the entire platform.

## **🔴 Step 2 — Sprint 1: Login, Users, and Company Setup**
**1.** The Login page — where users enter their email and password.

**2.** The Invitation Flow — when an admin adds a new learner, that learner gets an email with a link to set their password and join. This uses a unique invite token stored on the User record.

**3.** Company / Tenant Record — each client company gets their own Company record. Every User must be linked to a Company. This is the foundation of multi-tenant isolation.

**4.** Role Assignment — when a user is created or invited, give them a role from your Option Set. Never infer admin rights from page navigation alone.

**5.** Dashboard Skeleton Pages — create empty dashboard pages for each role. They will be filled in later sprints but the routing logic should be correct from day one.

**📄 Source:** *Chapter 3 – Data Architecture  •  Chapter 5 – Workflow Architecture  •  Chapter 9 – Security, QA & Release Governance*

**💡 Beginner Explanation — Multi-Tenant**

Multi-tenant means many different companies sharing the same software, but each in their own private space. Like an apartment building: everyone uses the same building, but you can only enter your own flat. You achieve this by always filtering data with 'Company = Current User's Company' in every search and query throughout the platform.

## **🔴 Step 3 — Sprint 2: Courses, Modules, Lessons, and Video**
**1.** Course Record with fields: Title, Description, Duration, Status (Draft/Published/Archived), Certificate Enabled (Yes/No), Visibility (which companies can see it), Audience Tags.

**2.** Module Record linked to Course. A Module is a chapter inside a course.

**3.** Lesson Record linked to Module. A Lesson is a single unit of content — a video, a PDF, or a reading.

**4.** Vimeo Integration — when an admin uploads a video to Vimeo, they paste the Vimeo video ID into the Lesson record. Antegravity then embeds the video securely using an HTML element with the privacy controls preserved.

**5.** Course Player Page — this is the main learning screen. Left side: a menu of modules and lessons. Centre: the current lesson content. Right side: resources, notes, transcript, or AI help.

**6.** Progress Record — every time a learner completes a lesson, the system creates or updates a Progress Record linking the User to the Lesson with a completion status field.

**📄 Source:** *Chapter 2 – System Architecture  •  Chapter 3 – Data Architecture  •  Chapter 4 – Experience Architecture*

## **🔴 Step 4 — Sprint 3: Quizzes and Certificates**
**1.** Quiz Builder — admin can add questions (multiple choice, true/false), set correct answers, and set a pass mark percentage. Treat quiz forms separately from standard learning surveys.

**2.** Quiz Player — learner sees questions one at a time, selects answers, submits, and sees their score. If they pass, move to the next step. If they fail, show the retake option.

**3.** Completion Logic — the course is only marked 'Complete' when ALL required lessons and quizzes are finished and passed. Store this as a calculated field on the Enrollment record, not just page logic.

**4.** Certificate Generation — when a course is completed, trigger a workflow that creates a Certificate record and generates a downloadable PDF. Trigger generation ONLY after completion rules are truly met.

**5.** Certificate Validity — design the data structure to support renewal dates from the start, even if the enforcement logic comes in Phase 2.

**📄 Source:** *Chapter 3 – Data Architecture  •  Chapter 5 – Workflow Architecture  •  Chapter 10 – Implementation Roadmap & Playbook*

## **🔴 Step 5 — Sprint 4: Payments and Access Activation**
**⚠️ Critical Rule**

Never grant paid access based on a button click alone. Access must only be granted AFTER you receive a confirmed payment event from Razorpay via webhook. Never use a front-end redirect as the trigger for access activation — anyone could manipulate that.

**1.** Create Plan Records — e.g. Standard, Advanced, Premium AI Add-on — with their prices and entitlements (what features are unlocked per plan).

**2.** Connect Razorpay — when a client clicks 'Buy', they go to Razorpay's checkout. Razorpay handles the card processing. Antegravity stores only the payment state mirror.

**3.** Webhook Setup — Razorpay sends a 'payment successful' signal to your endpoint. Only after receiving and verifying this signal does the system activate the company's access.

**4.** Make Automation — set up a Make scenario that listens for Razorpay events and triggers the right Antegravity workflow: activate company, set seat limit, send welcome email.

**5.** Payment Record — store every payment event in your database for audit purposes. Failed payment, paused plan, refunded plan, and expired plan must be separate statuses — do not collapse them into one 'inactive' state.

**📄 Source:** *Chapter 5 – Workflow Architecture  •  Chapter 8 – Commercial Architecture & Integrations*

## **🔴 Step 6 — Sprint 5: Admin Tools and Basic Reports**
**1.** Learner Management Page for Client Admins — a list of all their users with filters, invite button, deactivate button, and a slide-out detail panel. Use a single admin shell with tabs rather than separate pages.

**2.** Course Assignment — admin can assign a course to one learner or a group. Assignments should write to Enrollment Records, not just user fields.

**3.** Basic Reporting Page — showing completion count, overdue count, average score, and a list of who has and has not completed each course.

**4.** CSV Export — add an export button that downloads the current filtered view as a spreadsheet. Exports must reflect exactly the visible filtered state.

**5.** Email Notifications — set up automated emails for: invite received, course assigned, overdue reminder, certificate available. Use Make for this, not page-level workflows.

**📄 Source:** *Chapter 4 – Experience Architecture  •  Chapter 5 – Workflow Architecture  •  Chapter 7 – Reporting & Analytics*


# **Section 6: Step-by-Step Build Plan — Phase 2 (P2 Priorities)**

Phase 2 is where Edge LMS becomes genuinely powerful and different from competitors. These features should only be built after Phase 1 is stable and tested with real users.

## **🔵 Step 7 — Sprint 6: AI-Guided Insights (The Smart Question Engine)**
This is one of Edge LMS's biggest differentiators. Instead of a generic chatbot, clients get a structured AI tool that asks smart questions and gives consulting-grade answers. The system must behave like a disciplined digital consultant: asking for the right context, interpreting structured inputs, and returning business-usable outputs rather than generic text.

**1.** Create a set of 10 standard questions that clients can ask. Store these as records so they can be edited later without code changes. Approved examples include: 'What rituals should this team create?', 'What should we do in the next 30 days?', 'What risks should we watch for?', 'How should a first-time manager apply this?', 'What should HR or L&D reinforce after this program?'

**2.** Build the AI Request Form — client admin selects: (a) which assessment report or course to ask about, (b) the role or audience, (c) a challenge or theme, and (d) one of the 10 standard questions. Default to this form — do NOT offer a blank text box.

**3.** Send the Request to the AI API. The platform sends a structured prompt that includes all the selected context. Responses should be segmented into: Summary, Recommendations, Risks, Suggested Ritual or Habit, and Next Steps Block.

**4.** Store the AI Response as a record — linked to the company, the user who asked, the question asked, the model used, the prompt version, and the date. This allows history viewing and auditing.

**5.** Admin and consultants must be able to edit or supplement AI outputs. Save generated results as editable records, not transient text only.

**📄 Source:** *Chapter 6 – AI & Assessment Intelligence*

**💡 Beginner Explanation**

Imagine you have a brilliant consultant on speed-dial who has read all the training materials and assessment reports. You ask them one of 10 specific questions and they give you a structured, professional answer in 30 seconds. That is what this feature does — but automatically, at any time of day. The key is that the questions are fixed and structured — not a blank search box.

## **🔵 Step 8 — Sprint 7: Heat Maps and Advanced Reporting**
**1.** Heat Map Concept — a grid where each row is a team or department, each column is a course or module, and the colour of each cell shows completion level (green = done, amber = in progress, red = not started). This is one of the clearest differentiators for Edge because it translates many rows of status data into instant pattern recognition.

**2.** Pre-Compute Completion Percentages — do not calculate these live on every page load. Run a background job that calculates and stores summary numbers regularly, then display the stored values.

**3.** Advanced Filters — add filters for: date range, department, team, manager, course, completion status. Every filter combination should update the display correctly.

**4.** Manager View — a simplified dashboard where a team manager can see only their team members and their course status. Show team health first.

**5.** Scheduled Reports — set up Make to automatically send a weekly or monthly summary email to client admins with a PDF or CSV attachment.

**📄 Source:** *Chapter 7 – Reporting & Analytics*

## **🔵 Step 9 — Assessment File Upload and AI Interpretation**
**1.** Upload area in the client admin portal where they can upload PDF assessment reports or structured summary files. Store the file reference in your storage service — not directly in the database.

**2.** The AI interprets the assessment in the context of the guided questions — giving team-specific recommendations rather than generic advice. The LMS should be a translation layer: from diagnostic signals to learning actions, team rituals, communication strategies, and program follow-through.

**3.** Allowed input types: uploaded PDF reports (interpretation only, not primary scoring), structured summary outputs from a separate assessment centre. NOT allowed inside the LMS: raw psychometric item engines, 360 rater workflows.

**4.** Show the interpretation result alongside the uploaded document so the admin can compare source to output.

**📄 Source:** *Chapter 6 – AI & Assessment Intelligence*

## **🔵 Step 10 — AI Content Engine (For Strengthscape's Internal Team)**
**1.** Admin uploads a training deck, transcript, or facilitator notes. AI generates: lesson summaries, quiz question drafts, flashcards, facilitator debrief notes, and nudge message copy.

**2.** IMPORTANT: These AI outputs must go through a human review step before they become visible to learners. Build an Approve / Reject workflow for every generated asset.

**3.** Store every generated asset as an editable record so admins can refine the wording before publishing. Generated results are never treated as automatically final.

**4.** For the sales team, the system should support: product understanding, pitch preparation, discovery questions, positioning ideas, and follow-up drafting.

**📄 Source:** *Chapter 6 – AI & Assessment Intelligence*


# **Section 7: Step-by-Step Build Plan — Phase 3 (P3 Priorities)**

Phase 3 turns Edge from a great LMS into a strategic consulting platform. These should only begin after Phase 2 has been in production for at least 3 months and you have real data to work with.

## **🟢 Step 11 — Consultant Workspace**
**1.** A dedicated area where Strengthscape consultants can see only their assigned client companies. Consultants see only assigned clients unless explicitly elevated by a super admin.

**2.** Client Snapshot — a one-page summary of a client's learning journey, AI insights history, key risks, and next planned actions.

**3.** Consultant Notes — ability to add private notes against a client company, linked to a date and consultant name.

**4.** Action Tracking — record recommended actions and mark them as in progress or completed over time. This supports long-term culture journeys and follow-through planning.

**📄 Source:** *Chapter 2 – System Architecture  •  Chapter 4 – Experience Architecture*

## **🟢 Step 12 — Culture Journey and Long-Term Analytics**
**1.** Store historical snapshots of completion data at monthly intervals so you can show trends over time.

**2.** Build cohort-over-time charts — showing how a group's engagement and completion evolved across a 6–12 month program.

**3.** Culture Journey View — a visual timeline showing key milestones, interventions, AI insight sessions, and outcome markers for a client.

**4.** Journey Insight metrics: team reinforcement need, ritual adoption gap, long-term follow-up signals. These are consulting-facing, not learner-facing.

**📄 Source:** *Chapter 7 – Reporting & Analytics  •  Chapter 10 – Implementation Roadmap & Playbook*

## **🟢 Step 13 — Extended Ecosystem Integrations**
**1.** Zoho CRM Connection — selected LMS data (completion, AI insights) flows back into Zoho so the sales and consulting teams have context during client conversations. CRM truth remains in Zoho; LMS consumes selected data.

**2.** Microsoft 365 Integration — calendar sync with Outlook for session scheduling, OneDrive links for shared materials. Respect the Microsoft environment especially for Outlook, Teams, OneDrive, and SharePoint.

**3.** Partner / External Academy — allow clients' own clients or partners to access selected learning content under a co-branded portal. This is extended enterprise support from the same multi-tenant model.

**📄 Source:** *Chapter 8 – Commercial Architecture & Integrations  •  Antegravity Developer Master Build Guide*


# **Section 8: Sprint-by-Sprint Roadmap**

A 'sprint' is a fixed period of focused building — typically 2 weeks. Think of sprints like chapters in a book: each one builds on the last and the story only makes sense if read in order. The roadmap is intentionally dependency-driven so the platform is stable at each checkpoint instead of becoming a partially connected collection of unfinished modules.

|**Sprint**|**What Gets Built**|**Priority**|**Est. Duration**|
| :- | :- | :- | :- |
|Sprint 0|Foundation: data types, option sets, page naming, privacy plan, API key collection|P1|1–2 weeks|
|Sprint 1|Login, invite flow, company setup, role assignment, dashboard skeletons|P1|2 weeks|
|Sprint 2|Courses, modules, lessons, Vimeo video embedding, course player, progress tracking|P1|2 weeks|
|Sprint 3|Quizzes, pass/fail logic, certificate generation, completion workflows|P1|2 weeks|
|Sprint 4|Razorpay payments, provisioning automation, seat management, Make integration|P1|2 weeks|
|Sprint 5|Admin tools, bulk invites, course assignments, basic reports, CSV export, emails|P1|2 weeks|
|Sprint 6|AI guided insights: 10 standard questions, structured prompts, AI response storage|P1/P2|2–3 weeks|
|Sprint 7|Heat maps, advanced reporting filters, manager view, scheduled reports|P2|2–3 weeks|
|Sprint 8|Quality assurance, user testing, bug fixing, launch checklist, performance check|P1|2 weeks|
|Phase 2+|Assessment upload/AI interpretation, AI content engine, sales enablement hub|P2|8–10 weeks|
|Phase 3+|Consultant workspace, culture journey analytics, CRM/Microsoft integrations|P3|Ongoing|

**📄 Source:** *Chapter 10 – Implementation Roadmap & Playbook*


# **Section 9: Gen AI Tools That Will Help You Build This**

Generative AI tools are not just products to build INTO Edge LMS — they are also powerful tools to help you BUILD Edge LMS faster. There are two categories: tools that help with development, and AI APIs that power the product's features. AI should be used aggressively for speed, but only inside a disciplined architecture — it should not be allowed to invent random data models, duplicate logic, or create fragile one-off workflows.

**📄 Source:** *Chapter 10 – Implementation Roadmap & Playbook*

## **9.1  Tools for Building the Platform (Developer Tools)**

|**AI Tool**|**What It Helps You Do During Build**|**Best Use**|
| :- | :- | :- |
|Claude (Anthropic)|Write workflow specifications, data model documents, API prompt templates, QA test cases, user onboarding copy, and implementation briefs for each module|Converting requirements into step-by-step Antegravity implementation instructions|
|ChatGPT / GPT-4o|Generate data model schemas, JSON examples for API calls, naming conventions, edge case lists, and workflow logic descriptions|Ask: 'Write me a JSON schema for an API call to Razorpay to create a subscription'|
|Google Gemini|Tasks involving Google ecosystem (Sheets, Docs, Gmail). Also strong for generating course outlines and training content|Use when working with Google Workspace integrations|
|GitHub Copilot|If writing any JavaScript or custom API connector code, Copilot writes and completes code for you|Autocomplete for code — install in VS Code and it suggests completions as you type|
|Cursor AI|A full AI code editor. Useful for any server-side code or scripts for automation|Describe what you want in plain English; Cursor writes the code and explains it|
|v0 by Vercel|Generates React component designs you can reference for how UI elements should look and behave|Designing how cards, tables, and dashboards should appear before building them|

**📄 Source:** *Chapter 10 – Implementation Roadmap & Playbook*


## **9.2  AI APIs to Build INTO the Platform (The AI Features)**

|**AI Service**|**What It Powers Inside Edge LMS**|**Integration Method**|
| :- | :- | :- |
|Google Gemini API|Primary AI engine for guided insight questions and content generation. Strong performance and cost efficiency for India-based teams|Connect via Antegravity's API Connector using Gemini's REST endpoint. Keep prompts in config tables.|
|OpenAI GPT-4o API|Alternative or backup AI engine. Excellent for structured output, JSON mode responses, and summarisation tasks|Same method as Gemini — via API Connector. Use JSON mode for structured response parsing.|
|Anthropic Claude API|Strong for longer-context tasks like reading an entire uploaded assessment report and generating a structured interpretation|Via API Connector. Best choice for the assessment interpretation feature in Phase 2.|
|Make.com AI Modules|Make has built-in AI processing steps. Useful for automating content generation pipelines without writing extra code|In Make, add an OpenAI or Anthropic module into your automation scenario directly.|

**📄 Source:** *Chapter 6 – AI & Assessment Intelligence  •  Chapter 8 – Commercial Architecture & Integrations*


## **9.3  AI Tools for Content Creation (Building Course Content)**

|**Tool**|**What It Helps Create**|**Best For**|
| :- | :- | :- |
|Claude or ChatGPT|Write course outlines, lesson scripts, quiz questions, facilitator guides, nudge emails, reflection prompts|Full text-based training content creation|
|Canva AI / Adobe Express|Design course thumbnails, certificate templates, presentation slides for courses|Visual design without a graphic designer|
|ElevenLabs|Convert written lesson scripts into professional voiceovers for video lessons|Audio narration for training videos|
|Loom + AI Transcription|Record video lessons quickly, get automatic transcripts for subtitles and lesson notes|Rapidly creating video content at scale|
|Synthesia or HeyGen|Create AI avatar-based training videos from a script — no filming equipment needed|Scalable video production for many courses|
|Notion AI|Organise and plan your content library, write content briefs, summarise research|Content planning and knowledge management|

**📄 Source:** *Chapter 6 – AI & Assessment Intelligence*

**💡 Which AI Tool Should You Start With?**

If you are not a developer and want to begin using AI immediately: use Claude or ChatGPT to help you describe your requirements in structured documents, plan each sprint, write email templates, and create quiz content. These two tools alone will save dozens of hours across the project.


# **Section 10: Other Tools You Will Need**

|**Tool**|**Category**|**What It Does**|**Priority**|
| :- | :- | :- | :- |
|Antegravity|Platform|The main application builder where the entire LMS is constructed — owns users, roles, companies, learning paths, lessons, quizzes, progress, certificates, dashboards, AI request forms, and reporting views|P1 — Essential|
|Razorpay|Payments|India's leading payment gateway — handles subscriptions, one-time payments, payment links, recurring billing, seat top-ups|P1 — Essential|
|Vimeo Pro/Business|Video|Securely hosts and streams training videos. Privacy settings ensure videos only play inside your platform|P1 — Essential|
|Make (formerly Integromat)|Automation|Connects different tools and runs automatic tasks: payment received, user invited, deadline reached, certificate dispatch, renewal reminders|P1 — Essential|
|Uploadcare or AWS S3|File Storage|Stores PDFs, assessment reports, templates, and other large files securely. Prevents the platform from becoming a file-heavy repository|P1 — Essential|
|PDF Generator Plugin|Certificates|Generates nicely formatted PDF certificates when a learner completes a course. Triggered only after completion rules pass.|P1 — Essential|
|Postman|Developer Tool|Tests API connections before connecting them to Antegravity. Works as a 'test call' button for external services|P1 — Developer|
|Notion or Confluence|Documentation|Stores project decisions, sprint plans, build notes, and documentation. Also useful with Notion AI for content planning.|P1 — Recommended|
|Linear or Trello|Project Management|Tracks tasks, bugs, and sprint progress. Every sprint should have cards for each task with acceptance criteria.|P1 — Recommended|
|Loom|Communication|Record short videos to show progress, explain bugs, or give feedback without long meetings|P2 — Recommended|
|Figma|Design|Design how pages look before building them in Antegravity. Saves time and prevents rework.|P2 — Recommended|
|Google Analytics or Mixpanel|User Analytics|Track how users behave on the platform — which pages are visited most, where people drop off|P2|
|Intercom or Crisp|Support Chat|Add a live chat or help widget to the platform so learners can get help quickly|P2|
|Zoho CRM|CRM|Strengthscape's existing customer database — eventually LMS data will sync here. CRM truth remains in Zoho.|P3|

**📄 Source:** *Chapter 2 – System Architecture  •  Chapter 8 – Commercial Architecture & Integrations  •  Antegravity Developer Master Build Guide*


# **Section 11: Security Rules — Simple Explanation**

Security is not just a technical concern — it is a business and legal responsibility. Edge LMS will host internal learning, client data, completion records, assessment-linked uploads, payment states, and AI-generated outputs. That means security must be designed at the data model, page visibility, workflow, and integration layers simultaneously.

**📄 Source:** *Chapter 9 – Security, QA & Release Governance*

## **11.1  The Three Most Important Security Rules**
**🚨 Rule 1: Tenant Isolation — The Most Critical Rule**

Every piece of data in the system must be 'owned' by a company. When a learner from Company A logs in, they must never be able to see Company B's learners, courses, or reports — even if they somehow guess the URL. Tenant isolation is the first non-negotiable discipline. A single privacy rule error can expose data across clients. This must be set up BEFORE any real client data is added.

**📄 Source:** *Chapter 9 – Security, QA & Release Governance*

**🚨 Rule 2: API Keys Must Be Hidden**

Your Razorpay, Vimeo, and AI API keys are like master passwords. They must ONLY be stored and used in backend workflows — never in front-end page actions that anyone with a browser tool can inspect. Do not expose payment or AI credentials in any client-side calls.

**📄 Source:** *Chapter 9 – Security, QA & Release Governance*

**🚨 Rule 3: Payment Access Only After Confirmed Payment**

Never write logic that gives someone access when they click a button. Access should only be granted after Razorpay sends a confirmed payment webhook. Antegravity stores payment state; Razorpay remains the source of truth for charge events.

**📄 Source:** *Chapter 8 – Commercial Architecture & Integrations  •  Chapter 9 – Security, QA & Release Governance*

## **11.2  Full Security Architecture Layers**

|**Security Layer**|**Minimum Control**|**When to Implement**|
| :- | :- | :- |
|User Identity|Invite-based onboarding and strong role assignment. Never infer admin rights from page navigation alone.|MVP — Sprint 1|
|Tenant Isolation|Company-based privacy rules on every searchable object. Filter data at source, not only in UI conditions.|MVP — Sprint 0 plan, enforced Sprint 1|
|Admin Actions|Audit logs for create, edit, delete, assign, and export actions. Track who did what and when.|MVP|
|API Secrets|Keep keys server-side only. Do not expose payment or AI credentials in client-side calls.|MVP — Sprint 0|
|File Access|Restrict downloads by company and entitlement. Sensitive uploads must never be public by default.|Phase 2|
|AI Requests|Log prompts, outputs, actor, model, prompt version, and source context. Required for debugging and governance.|Phase 2|
|Exports|Limit report exports by role and scope. Avoid cross-client data assembly errors.|Phase 2|

**📄 Source:** *Chapter 9 – Security, QA & Release Governance*

## **11.3  Security Test Checklist (Run Before Launch)**

|**Security Check**|**How to Test It**|
| :- | :- |
|Privacy rules on all data types|Log in as a test learner from Company A and search for Company B's data — it should return nothing|
|Role enforcement|Log in as a learner and try to access the admin URL directly — you should be redirected or blocked|
|API keys hidden|Right-click any page, inspect the source code, search for your API key — it must NOT appear anywhere|
|Payment then access|Complete a test payment in Razorpay sandbox mode and confirm access only activates after the webhook fires|
|Cross-company isolation|Create two test companies, log in as each, confirm you cannot see the other company's data at all|

**📄 Source:** *Chapter 9 – Security, QA & Release Governance*


# **Section 12: What 'Done' Looks Like (Acceptance Criteria)**

'Acceptance Criteria' is a fancy term for: how do we know this feature is actually finished and working correctly? Every module should be tested against five dimensions: functional correctness, permissions correctness, operational durability, reporting correctness, and user clarity.

**📄 Source:** *Chapter 10 – Implementation Roadmap & Playbook*

|**Feature Area**|**It Is 'Done' When...**|**Priority**|
| :- | :- | :- |
|User Invitation|An admin invites a user by email. The user receives the email. The user clicks the link, sets a password, logs in, and sees the correct dashboard for their role.|P1|
|Multi-Tenant Isolation|Learner from Company A logs in and cannot see any data from Company B — not in searches, not by guessing URLs. Can one company NEVER see another company's data?|P1 — Critical|
|Course Completion|A learner completes all lessons and passes the quiz. The system marks the course complete. A certificate is generated. The admin dashboard shows this learner as 'Completed'. Do completion markers survive refresh, logout, and role switching?|P1|
|Payment Flow|A client pays via Razorpay. Access is NOT given until the payment webhook arrives. After the webhook, the company is activated, the admin receives a welcome email, and they can log in. Do failures suspend correctly?|P1|
|AI Insight Request|An admin selects a question from the dropdown, selects a role and challenge, and submits. Within 30 seconds a structured AI response appears, is stored in history, and is stored per tenant.|P2|
|Heat Map Display|The heat map shows each team/department as a row, each course as a column, with correct colour coding. Do filters work? Do counts match source data?|P2|
|Report Export|An admin filters the completion report and clicks Export CSV. The downloaded file contains exactly the data visible on screen, with correct column headers. Do exports reflect exactly the visible filtered state?|P1|
|Certificate Download|A learner goes to their Certificates page. They click Download on a completed course. A correctly formatted PDF opens with their name, course name, and completion date. Are certificates generated only when rules are truly met?|P1|

**📄 Source:** *Chapter 10 – Implementation Roadmap & Playbook*

## **12.1  UAT Design and Launch-Readiness Protocol**
• Run UAT by role, not only by page. A learner, client admin, consultant, super admin, and finance/ops user should each have separate scenario packs.

• Seed the system with realistic test companies, courses, learners, payments, assessment uploads, and overdue states. Empty systems hide bugs.

• Test every critical workflow twice: once through the expected path and once through a broken or interrupted path.

• Treat launch readiness as a controlled gate: all critical bugs closed, no cross-tenant data issue, payment state reconciled, certificate generation validated, key reporting numbers matched to sample source data.

**📄 Source:** *Chapter 10 – Implementation Roadmap & Playbook*


# **Section 13: Post-Launch — What Happens After You Go Live?**

Going live is NOT the end of the project. The first 90 days after launch should be treated as a structured optimization window. The first post-launch improvements should come from observed friction, not from adding many new ideas too early.

**📄 Source:** *Chapter 10 – Implementation Roadmap & Playbook*

## **13.1  The First 90 Days After Launch**

|**Period**|**What to Focus On**|
| :- | :- |
|Weeks 1–2|Watch for errors and bugs in real usage. Fix any access or permission issues immediately. Monitor payment webhook reliability. Review activation, completion, and drop-off data.|
|Weeks 3–4|Gather feedback from first real learners and admins. Fix usability issues not caught in testing. Check usefulness of guided AI outputs.|
|Weeks 5–8|Review which reports are being used most. Review admin effort and payment exceptions. Start planning P2 features based on real user requests, not a wishlist.|
|Weeks 9–12|Analyse completion and engagement data. Identify which courses have high drop-off. Present first insights to the Strengthscape leadership team. Begin P2 build planning.|

**📄 Source:** *Chapter 10 – Implementation Roadmap & Playbook*


## **13.2  Who Should Own What After Launch**

|**Team / Person**|**Their Ongoing Responsibility**|
| :- | :- |
|Developer (Antegravity)|Bug fixes, controlled feature additions, performance improvements, integration updates. Should not be needed for every content, tenant, and reporting action.|
|Strengthscape Product Owner|Deciding which P2/P3 features to build next, approving releases, managing roadmap. Roadmap decisions must not be owned by the developer.|
|Content Admin|Adding new courses, updating lessons, managing quiz content, uploading resources — fully self-service.|
|Ops / Finance|Monitoring payments, reconciling subscription states, managing access exceptions.|
|Client Admins|Inviting learners, assigning courses, viewing reports — fully self-service by launch.|
|Consultants|Running AI insight sessions, adding client notes, tracking recommended actions in their workspace.|

**📄 Source:** *Chapter 10 – Implementation Roadmap & Playbook*

**⚠️ Important Warning**

After launch, resist the temptation to add many new features very quickly. The product will quietly become a developer-operated LMS rather than a business-operated one if this separation of ownership is not designed and respected. Build based on observed friction, not enthusiasm.

**📄 Source:** *Chapter 10 – Implementation Roadmap & Playbook*


# **Section 14: Key Warnings and Things Not to Do**

These are the most common and most expensive mistakes made when building platforms like this. These rules are part of the product architecture — not suggestions.

|**Warning**|**What It Means in Plain Language**|**How to Avoid It**|
| :- | :- | :- |
|❌ Do not skip Sprint 0 (Foundation)|Building pages before the data model is set up is like painting walls before the bricks are laid. No visible product build should start before this is locked.|Spend the first 2 weeks doing nothing but data model, option sets, and privacy rule planning.|
|❌ Do not use plain text for roles and statuses|If you type 'admin' as text in different places, searches and filters will break unpredictably.|Always use Option Sets for roles, statuses, and any value that should come from a fixed list.|
|❌ Do not allow open-ended AI for clients|A blank chatbot with no guardrails gives inconsistent, unreliable answers and reduces client trust. Client-facing AI should be guided, not open-ended.|Always use the structured 10-question dropdown system for client-facing AI. Store prompts as configurable admin assets.|
|❌ Do not build everything in one giant release|If you try to launch with every feature ready, you will delay for months and accumulate hidden bugs.|Launch with P1 only. Use real usage to guide P2. This is called phased delivery.|
|❌ Do not grant payment access from front-end logic|Anyone who can open browser developer tools could potentially manipulate front-end code to bypass payment.|Always trigger access activation from a backend workflow that only fires after a Razorpay webhook is verified.|
|❌ Do not ignore the regression test checklist before each release|Adding a new feature can accidentally break an old one (called a regression bug).|Before every release, run the regression checklist covering login, payment, completion, certificates, and cross-tenant privacy.|
|❌ Do not put real client data in before privacy rules are set|If privacy rules are not set, ALL data in your database may be visible to ALL users — a serious data breach.|Fix privacy rules in Sprint 0. Test with 'Run as' for each role. Only then add real data.|
|❌ Do not let AI own final architecture decisions|AI tools are excellent for generating suggestions, documentation, and test cases — but a human must make final decisions about security, payments, and data structure.|Use AI as an accelerator, not as an architect. Review every AI suggestion before implementing it.|

**📄 Source:** *Chapter 9 – Security, QA & Release Governance  •  Chapter 10 – Implementation Roadmap & Playbook  •  Antegravity Developer Master Build Guide*


# **Section 15: Quick Reference Summary Table**

|**Category**|**Key Points to Remember**|
| :- | :- |
|What We Are Building|A multi-tenant, AI-enabled Learning Management System (LMS) on Antegravity for Strengthscape|
|Who Uses It|Learners, Client Admins, Facilitators, Strengthscape Admins, Consultants|
|Main Platform|Antegravity (application development platform)|
|Key External Services|Razorpay (payments), Vimeo (video), Make (automation), AI API (Gemini/OpenAI), Uploadcare (files)|
|P1 Features|Login, roles, multi-tenant, courses, lessons, video, quizzes, certificates, payments, basic reports|
|P2 Features|Heat maps, AI insights, assessment upload, advanced reports, manager view, content generation AI|
|P3 Features|Consultant workspace, culture journey analytics, CRM integrations, partner portals|
|Build Order|Sprint 0 (Foundation) → Sprint 1 (Auth) → Sprint 2 (Courses) → Sprint 3 (Quizzes/Certs) → Sprint 4 (Payments) → Sprint 5 (Admin) → Sprint 6 (AI) → Sprint 7 (Heat Maps) → Sprint 8 (QA/Launch)|
|Top AI Tools to Build With|Claude, ChatGPT, Gemini, GitHub Copilot, Make AI modules, Cursor AI|
|Top AI APIs to Build Into the Product|Gemini API, OpenAI GPT-4o API, Anthropic Claude API|
|Critical Security Rules|Tenant isolation (privacy rules), API keys in backend only, payment access after webhook only|
|Definition of Done|Works correctly for all roles, passes cross-tenant privacy test, passes regression checklist|
|Biggest Risk|Skipping foundation setup (Sprint 0) and starting page-building too early|
|First 90 Days Post-Launch|Monitor bugs, gather user feedback, analyse engagement data, plan P2 based on real usage|

**📄 Source:** *Chapter 1 – Strategic Blueprint  •  Chapter 2 – System Architecture  •  Chapter 3 – Data Architecture  •  Chapter 4 – Experience Architecture  •  Chapter 5 – Workflow Architecture  •  Chapter 6 – AI & Assessment Intelligence  •  Chapter 7 – Reporting & Analytics  •  Chapter 8 – Commercial Architecture & Integrations  •  Chapter 9 – Security, QA & Release Governance  •  Chapter 10 – Implementation Roadmap & Playbook  •  Antegravity Developer Master Build Guide*



*Edge LMS 2030 — Complete Project Report & Implementation Playbook*

Prepared for Strengthscape  |  Built on Antegravity  |  Based on all 11 source chapters  |  May 2026
Page  of 
