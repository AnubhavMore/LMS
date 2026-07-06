**Edge LMS 2030**

**Chapter 7**

**Reporting, Analytics, Heat Maps, and Insight Dashboard Architecture**

*Developer-facing specification for Bubble implementation of learner reporting, client analytics, consulting dashboards, executive views, and long-term culture insight tracking.*

Prepared for Bubble-based development by Devansh with a minimal-code, API-first, AI-assisted build doctrine.

# **7.1 Overview chart**

|**Reporting Layer**|**Primary Audience**|**Core Metrics**|**Bubble vs External**|**Strategic Value**|
| :- | :- | :- | :- | :- |
|Learner Progress Reporting|Learner, manager|completion, due status, certificates, scores|Bubble-native|drives adoption|
|Client Admin Analytics|HR, L&D, client admin|team completion, usage, risk, exports|Bubble-native with scheduled summaries|supports governance|
|Heat Maps|Client admin, consultant|team, role, function, cohort patterns|Bubble UI + precomputed metrics|reveals patterns|
|Consulting Dashboards|Strengthscape consultant|journey trends, intervention needs, action clusters|Bubble + optional AI summarisation|creates leverage|
|Executive Dashboards|Client sponsor, leadership|high-level adoption, capability risk, progress signals|Bubble-native curated view|supports sponsor communication|
|Data Exports and Scheduled Reports|Ops, admin, client|CSV/PDF/email snapshots|Bubble + Make|reduces manual effort|
# **7.2 Why this chapter matters**
If Chapter 6 defined the intelligence layer, Chapter 7 defines the evidence layer. A 2030-ready LMS cannot stop at course access and completion badges. It must show who is progressing, where engagement is dropping, which cohorts are at risk, what themes are emerging across functions, and how learning data should inform next actions.

For Strengthscape, reporting is not only an operational requirement. It is also a consulting asset. The same platform must serve learner accountability, client governance, and strategic interpretation over time.

Design doctrine for this chapter:

- Make operational reporting fast, filterable, and exportable.
- Make pattern recognition visual through heat maps and cohort comparisons.
- Separate learner-facing simplicity from admin-facing depth.
- Support both live dashboards and scheduled summary outputs.
- Store enough structured data to enable future AI-generated insights without rebuilding the platform.
# **7.3 Reporting philosophy for Edge LMS**
Edge LMS should be designed around a layered reporting philosophy. Not every user should see the same density of information, and not every metric should be calculated in real time. The platform should deliberately distinguish between operational views, management views, consulting views, and executive summaries.

1. Operational: Who has started, who is overdue, what is complete, what is missing?
1. Managerial: Which teams or managers are seeing weak adoption or poor follow-through?
1. Consulting: What patterns suggest a capability gap, implementation problem, or reinforcement need?
1. Strategic: What trends over time can be presented to client leadership as evidence of movement or risk?

This layered reporting philosophy should inform every metric, dashboard, and export.
# **7.4 Reporting tiers and user-specific dashboards**
Devansh should implement reporting in tiers so page complexity stays manageable and permissions stay clear. A single mega-dashboard is the wrong pattern for Bubble because it becomes difficult to filter, expensive to query, and confusing for users.

|**Dashboard Tier**|**Primary User**|**What they see**|**Design Rule**|
| :- | :- | :- | :- |
|Learner|Learner|assigned courses, due dates, completion, scores, certificates|keep it motivating and uncluttered|
|Manager|Line manager, team lead|team completion, overdue members, low score flags, follow-up prompts|show team health first|
|Client Admin|HR, L&D, program owner|cohort analytics, exports, heat maps, assignment status|support governance|
|Consultant|Strengthscape consultant|patterns, intervention clues, heat maps, journey trends|support interpretation|
|Executive|Client sponsor|high-level metrics, risk signals, milestone movement|show only decision-grade summaries|
# **7.5 Core metric families**
The data model and workflows must support a stable set of metric families from day one. Even if every chart is not built immediately, the underlying records should be structured so the platform can compute them later without redesign.

|**Metric Family**|**Examples**|**Notes for Bubble**|
| :- | :- | :- |
|Adoption|first login, first course start, first meaningful action|store timestamps explicitly|
|Engagement|video watched, lessons completed, notes submitted, quiz attempts|avoid over-computing from raw events|
|Progress|in progress, completed, overdue, due soon|precompute status fields where possible|
|Performance|quiz score, pass/fail, retake count|question-level analytics optional later|
|Certification|issued, downloaded, expired, renewal due|support compliance journeys|
|Cohort Health|cohort completion, team variance, manager follow-through|best shown as comparisons|
|Content Health|module drop-off, low-score lesson, repeat-failure lesson|use for content improvement|
|Journey Insight|team reinforcement need, ritual adoption gap, long-term follow-up|consulting-facing layer|
# **7.6 Learner dashboard reporting components**
The learner should experience reporting as self-navigation, not surveillance. The dashboard should tell the learner what is assigned, what is due, what is complete, what remains blocked, and what certificate or milestone is next.

- Assigned learning summary: total assigned, in progress, completed, overdue.
- Continue learning card: most recent active course and next lesson.
- Due soon card: highlights deadlines in the next 7 to 14 days.
- Progress bar by course or learning path.
- Certificate shelf: completed certificates available for download.
- Optional lightweight milestone markers such as streak or completion badge.
# **7.7 Manager and client admin analytics**
Manager and client admin reporting is where the LMS becomes genuinely useful in larger deployments. These users need quick situational awareness and the ability to drill down when something looks wrong.

|**Widget**|**Manager View**|**Client Admin View**|**Priority**|
| :- | :- | :- | :- |
|Completion overview|team completion percentage|company / cohort completion percentage|MVP|
|Overdue list|named team members overdue|sortable overdue roster across groups|MVP|
|Low score watchlist|people below pass threshold|team / cohort trend by score band|Phase 2|
|Assignment coverage|who has not started|who was invited but inactive|MVP|
|Heat map entry|optional mini heat map|full heat map suite|Phase 2|
|Export|CSV for team only|CSV/PDF for company slices|MVP|
# **7.8 Heat map architecture**
Heat maps are one of the clearest differentiators for Edge because they translate many rows of status data into pattern recognition. They are especially useful in long-term culture journeys where the client needs to see variation by function, location, level, or cohort instead of one overall completion percentage.

- Completion heat map by department, function, location, level, or manager.
- Quiz score heat map by cohort or team.
- Overdue risk heat map by role or business unit.
- Engagement heat map by module or topic.
- Intervention uptake heat map for culture-journey follow-through.

Heat maps should support filters for company, date range, cohort, course, learning path, department, location, manager, and level. The default visual pattern should use simple colour bands rather than overly detailed charting that becomes unreadable inside Bubble.
# **7.9 Consulting and culture-journey dashboards**
Strengthscape’s long-term advantage comes from turning LMS data into consulting intelligence. These dashboards should therefore not be generic BI clones. They should be tailored to program delivery, reinforcement, manager follow-through, and culture-change conversations.

- Journey timeline view: prework, workshop, reinforcement, follow-up, review.
- Cohort comparison view across locations, functions, or participant levels.
- Manager reinforcement signal: where learning is complete but team adoption is weak.
- AI-guided summary block using structured metrics as input, not freeform narrative alone.
- Consultant notes layer for interpretations, risks, and next-step recommendations.
# **7.10 Report filters, exports, and scheduled summaries**
Reporting is only useful if users can get to the slice they need quickly and share it in a usable form. Devansh should therefore treat filtering and export behavior as core functional requirements rather than optional polish.

|**Capability**|**Specification**|**Implementation Note**|
| :- | :- | :- |
|Filter persistence|remember last used filters per user where sensible|reduces repetitive admin work|
|CSV export|export current filtered dataset|MVP requirement|
|PDF summary|high-level dashboard snapshot for sponsor sharing|Phase 2|
|Scheduled email summary|weekly or monthly digest to selected admins|Bubble + Make|
|Saved views|optional saved report presets|Phase 2/3|
# **7.11 Bubble implementation strategy for analytics**
Bubble can support significant analytics if the reporting architecture is designed with discipline. The main technical risk is not visualisation itself, but expensive searches and overly dynamic calculations on large datasets.

- Use explicit status fields and timestamps instead of inferring everything from lesson rows at runtime.
- Store aggregate counters at enrollment, course, cohort, and company level where helpful.
- Use backend workflows to refresh heavy summaries on schedule or after key events.
- Precompute heat-map inputs rather than recalculating large matrix views on page load.
- Use Make only where cross-system scheduled distribution or document generation adds value.
# **7.12 Data structures needed for reporting**
Chapter 3 defined the core data model. This chapter adds the reporting-oriented structures and aggregated fields that make analytics efficient.

|**Data Object / Field**|**Purpose**|**Example Fields**|**Phase**|
| :- | :- | :- | :- |
|ProgressRecord|lesson or module progress detail|started\_at, completed\_at, score, status|MVP|
|Enrollment aggregates|quick course-level status|pct\_complete, due\_state, last\_activity\_at|MVP|
|CohortMetrics|cohort dashboard summaries|completion\_pct, avg\_score, overdue\_count|Phase 2|
|HeatmapSnapshot|matrix-ready data|dimension\_a, dimension\_b, metric\_value, colour\_band|Phase 2|
|ReportPreset|saved filters and layouts|user, filters\_json, report\_type|Phase 2/3|
|InsightSummary|consulting or AI summary cache|scope, summary\_text, generated\_at|Phase 3|
# **7.13 Acceptance criteria for Chapter 7**
Reporting features should only be considered complete if they serve actual decision-making, not just visual display. The acceptance criteria below define what Devansh should prove before this chapter is marked ready.

- A learner can see assigned, in-progress, completed, and overdue learning without confusion.
- A manager can filter their team and export completion and overdue status.
- A client admin can view completion by cohort, team, or department and export filtered data.
- Heat maps can be generated for at least one completion metric and one score metric.
- Reports respect company isolation and role permissions.
- Heavy dashboards do not depend on inefficient full-table live calculations for every page load.
- The platform can produce at least one scheduled summary flow through Bubble or Make.
# **7.14 Build recommendations for later phases**
Some analytics should be built now, some should be designed now but activated later. This avoids unnecessary early complexity while preserving long-term architectural readiness.

- **Now:** completion dashboards, overdue tracking, learner progress, CSV exports
- **Design now, build later:** heat maps, scheduled reports, cohort comparisons, saved report presets
- **Future 2030 direction:** predictive risk scoring, AI executive narration, intervention recommendations

**Chapter 8 will cover Commerce, Subscription, Billing, Access Control by Plan, and Monetisation Design.**
