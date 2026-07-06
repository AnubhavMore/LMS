**EDGE LMS 2030**

**Chapter 1 - Strategic Blueprint**

*Development specification for Bubble-based implementation by Devansh*

|**Purpose.** This chapter defines the long-term product direction, architectural boundary, design doctrine, and non-negotiable build principles for Edge LMS. It is the foundation chapter that should guide all later module, workflow, and data-model decisions.|
| :- |

Prepared for Strengthscape | Vision horizon: 2030


# **1. Overview chart**

|**Layer**|**What it does**|**Primary user**|**Bubble or external**|**Why it matters**|
| :-: | :-: | :-: | :-: | :-: |
|**Experience Layer**|Dashboards, portals, AI prompt entry, admin views, reports|Learners, client admins, Strengthscape admins|Bubble|Controls the visible product experience and workflow logic|
|**Learning Core**|Courses, modules, lessons, quizzes, paths, certificates|Learners and admins|Bubble|Holds the operational LMS engine|
|**Intelligence Layer**|Guided AI responses, summaries, quiz generation, role-based recommendations|Learners, managers, consultants, sales team|External AI via API|Creates differentiation and efficiency|
|**Media Layer**|Video upload, transcoding, secure playback|Content admins, learners|Vimeo or similar|Prevents Bubble from becoming a media infrastructure layer|
|**Commerce Layer**|Payments, subscriptions, renewals, payment links|Buyers, finance, ops|Razorpay|Enables India-first monetization|
|**Automation Layer**|Access activation, reminders, sync, certificate dispatch|Admins, ops|Make|Reduces manual coordination work|
|**File Layer**|PDFs, templates, assessment uploads, downloadable assets|Learners and admins|Uploadcare or S3-style|Supports reliable file handling at scale|
|**Insight Layer**|Completion reports, heat maps, cohort analytics, culture journey signals|Client admins, consultants|Bubble + optional external processing|Turns the LMS into a consulting asset|
|**Assessment Integration Layer**|Consumes diagnostic outputs and converts them into actions|Client admins, consultants|Integrated, but separate from full assessment engine|Keeps product boundaries clean|
# **2. What Edge LMS is**
Edge LMS is a multi-tenant, AI-enabled learning and insight platform designed to serve three parallel use cases. The first is the Strengthscape Internal Academy for onboarding, sales enablement, facilitator readiness, policy learning, culture learning, and internal capability building. The second is the Client Learning Portal for customer delivery, self-paced and blended journeys, certificates, progress reporting, and cohort management. The third is the Insight-led Consulting Layer, where the platform becomes a data and action system for leadership development, culture journeys, role-based recommendations, ritual design, and follow-through planning.
# **3. What Edge LMS is not**
Edge LMS is not a raw video library, a generic file repository, a blank open-ended chatbot, a full psychometric assessment engine, or a custom media streaming stack. It should not be treated as a legacy SCORM-first clone or as an overloaded community platform. The product should remain a clean, premium, highly usable training operating system with strong analytics and guided intelligence beneath the surface.
# **4. Design philosophy for 2030**
The product should be designed for Strengthscape in 2030, not merely to satisfy a present-day checklist. Learner-facing surfaces must stay simple, while administrative and consulting layers must become progressively richer. AI should be structured rather than chaotic. Bubble should function as the application shell and orchestration layer, while specialized external services should handle video, commerce, automation, and heavy intelligence tasks. Every major feature must reduce manual service effort over time.
# **5. Product doctrines**

|**Code**|**Principle**|**Implication for build**|
| :-: | :-: | :-: |
|**Doctrine 1**|Keep the learner surface simple|Learners should mainly see what to do next, what is pending, what is complete, and where to get help.|
|**Doctrine 2**|Make admin depth stronger than learner depth|Strengthscape's advantage will come from reporting, cohort analysis, heat maps, assignments, action planning, and guided interpretation.|
|**Doctrine 3**|Use guided AI, not uncontrolled AI|Client-facing AI should follow structured journeys, including the planned 10 standard dropdown questions.|
|**Doctrine 4**|Use Bubble as the shell, not the whole machine|Bubble should drive UI, workflows, roles, data access, and orchestration; external systems should do specialized work.|
|**Doctrine 5**|Design every feature to reduce manual service load|Automation, reusable templates, and AI-assisted generation must lower future operational dependency.|


# **6. Why Bubble is the right primary platform**
Bubble is the right primary environment because it can assemble role-based dashboards, conditional interfaces, course structures, learner experiences, multi-tenant logic, internal tools, and API-based orchestration quickly. It should remain the experience and workflow shell rather than being forced to act as the heavy media engine, billing engine, or psychometric scoring engine.
# **7. Recommended architecture boundary**
Bubble should own users, roles, companies, learning paths, lessons, quizzes, progress, certificates, dashboards, AI request forms, and reporting views. External services should own streaming video, subscription billing events, payment links, large file storage, AI processing, and advanced automation chains. This produces a cleaner and more durable architecture because each system does what it is best at.
# **8. LMS versus Assessment Centre**
Edge LMS should include learning-linked assessments such as quizzes, self-checks, surveys, reflections, manager check-ins, action-planning forms, and pulse surveys. It should not become a full psychometric or 360 assessment engine. The assessment centre should remain a separate but integrated layer for complex scoring, benchmarking, rater architecture, and formal report generation. The LMS should consume selected assessment outputs and convert them into learning actions, recommendations, and follow-through guidance.
# **9. Contemporary LMS capabilities to reserve now**

|**Capability**|**Why it matters**|
| :-: | :-: |
|**Forms and surveys**|Separate forms from graded quizzes so the platform can support pulse checks, reflection forms, and post-program feedback.|
|**Skills and competency mapping**|Allow future mapping between courses, roles, capability areas, and proficiency levels.|
|**Content engagement analytics**|Track activation, drop-off, and usage patterns rather than relying only on completion.|
|**Certificate validity and recertification**|Support renewal cycles for compliance and internal certification journeys.|
|**Extended enterprise support**|Serve employees, clients, and possibly partners from one core multi-tenant model.|
|**Guided intelligence**|Use structured AI prompts and dropdown-led questions rather than blank prompting.|
|**Subjective review workflow**|Reserve future support for assignment review, facilitator comments, and manager sign-off.|
# **10. Non-negotiable build rules**
**•** Every record must respect tenant isolation from day one.

**•** Every page must use role-based visibility rather than duplicate page structures wherever possible.

**•** All major external integrations should be wrapped in reusable Bubble workflows or API actions.

**•** Anything computationally heavy should be processed asynchronously or externally.

**•** Videos must be externally hosted.

**•** Client-facing AI should be guided rather than open-ended.

**•** Reports must be export-friendly from the first serious version.

**•** The same core data model must support both internal academy use and monetized client portals.

|**Chapter 1 locked decisions.** Edge LMS will be built as a multi-tenant Bubble-based platform serving internal, client, and consulting insight use cases. Bubble will act as the application shell, while Razorpay, Make, Vimeo, AI services, and external file infrastructure will support commerce, automation, media, intelligence, and storage. Learning-linked assessments belong in the LMS; full diagnostic assessment-centre logic remains a separate integrated layer.|
| :- |

Edge LMS 2030 - Chapter 1
