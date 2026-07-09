import { ProgramInstance, Cohort, Enrollment, ProgressRecord, Session, ActionPlan, Certificate, Attendance, DeliveryHandoff, FacilitatorNote, ExpansionSignal, ReportSnapshot, ProgramSnapshot, ExportRecord } from "@/types/schema"

export const seedProgramInstances: ProgramInstance[] = [
  {
    id: "pi_acme_ftm_01", programTemplateId: "pt_ftm", companyId: "comp_acme",
    name: "Acme Q3 First-Time Managers", status: "Active",
    startDate: "2024-07-01T00:00:00Z", endDate: "2024-09-30T00:00:00Z",
    edge10OpportunityId: "OPP-90210",
    deliveryHandoffId: "dh_acme_01",
    businessNeed: "Need to standardise manager training across recently merged teams.",
    audienceSummary: "45 first-time managers, mostly from engineering backgrounds.",
    successMeasures: ["NPS > 45", "100% completion of action plans"],
    competencyTags: ["Delegation", "Feedback", "Coaching"],
    ownerId: "usr_sa_01",
    facilitatorIds: ["usr_cn_01", "usr_cn_02"]
  },
  {
    id: "pi_acme_disc_01", programTemplateId: "pt_disc", companyId: "comp_acme",
    name: "Acme Sales Team DiSC", status: "Completed",
    startDate: "2024-01-15T00:00:00Z", endDate: "2024-02-15T00:00:00Z",
    edge10OpportunityId: "OPP-80512",
    deliveryHandoffId: "dh_acme_02",
    businessNeed: "Improve sales communication styles.",
    audienceSummary: "20 senior account executives.",
    successMeasures: ["Higher close rate Q2"],
    competencyTags: ["Communication", "Sales"],
    ownerId: "usr_sa_01",
    facilitatorIds: ["usr_cn_01"]
  }
]

export const seedDeliveryHandoffs: DeliveryHandoff[] = [
  {
    id: "dh_acme_01",
    companyId: "comp_acme",
    opportunityId: "ZOHO-OPP-2024-05A",
    programTitle: "Acme Corp - Q3 FTM Rollout",
    businessNeed: "Acme just merged with BetaInc. The new management layer is struggling with delegation and giving critical feedback. The sponsor wants a highly interactive, practical program.",
    targetAudience: "Highly technical, skeptical of 'fluffy' HR training. They want tools they can use immediately. Time-poor.",
    competencies: ["Delegation", "Giving Feedback", "Coaching"],
    assessmentPlan: "Pre-program 360 review. Post-program self-assessment at 30 days.",
    successMeasures: ["Reduced turnover", "Higher ENPS scores"],
    promisedDeliverables: ["3 live virtual sessions", "Customized action plan template", "Post-program report to sponsor"],
    status: "Processed",
    receivedAt: new Date().toISOString()
  },
  {
    id: "dh_acme_02",
    companyId: "comp_acme",
    opportunityId: "ZOHO-OPP-2024-06B",
    programTitle: "Sales DiSC Workshop",
    businessNeed: "Sales team missing quotas due to poor client reading.",
    targetAudience: "High energy, competitive.",
    competencies: ["Communication"],
    assessmentPlan: "Pre-program DiSC assessment",
    successMeasures: ["Quota attainment"],
    promisedDeliverables: ["1 live workshop", "DiSC Profiles"],
    status: "Received",
    receivedAt: new Date().toISOString()
  }
]

export const seedCohorts: Cohort[] = [
  { id: "coh_acme_ftm_a", programInstanceId: "pi_acme_ftm_01", name: "Cohort A (US)", facilitatorId: "usr_cn_01" },
  { id: "coh_acme_ftm_b", programInstanceId: "pi_acme_ftm_01", name: "Cohort B (EMEA)", facilitatorId: "usr_cn_02" },
  { id: "coh_acme_disc_a", programInstanceId: "pi_acme_disc_01", name: "Sales Cohort A", facilitatorId: "usr_cn_01" }
]

export const seedEnrollments: Enrollment[] = [
  { id: "enr_1", userId: "usr_acme_lrn1", cohortId: "coh_acme_ftm_a", companyId: "comp_acme", status: "In Progress", progressPercentage: 40, enrolledAt: "2024-06-15T00:00:00Z" },
  { id: "enr_2", userId: "usr_acme_lrn2", cohortId: "coh_acme_ftm_a", companyId: "comp_acme", status: "In Progress", progressPercentage: 15, enrolledAt: "2024-06-15T00:00:00Z" },
  { id: "enr_3", userId: "usr_acme_lrn3", cohortId: "coh_acme_ftm_b", companyId: "comp_acme", status: "Not Started", progressPercentage: 0, enrolledAt: "2024-06-15T00:00:00Z" },
  { id: "enr_4", userId: "usr_acme_lrn1", cohortId: "coh_acme_disc_a", companyId: "comp_acme", status: "Completed", progressPercentage: 100, enrolledAt: "2024-01-10T00:00:00Z" }
]

export const seedProgressRecords: ProgressRecord[] = [
  { id: "pr_1", enrollmentId: "enr_1", lessonId: "l_ftm_1_1_1", completed: true, completedAt: "2024-07-02T10:00:00Z" },
  { id: "pr_2", enrollmentId: "enr_1", lessonId: "l_ftm_1_1_2", completed: true, completedAt: "2024-07-03T11:00:00Z" },
  { id: "pr_3", enrollmentId: "enr_1", lessonId: "l_ftm_1_1_3", completed: false },
]

export const seedSessions: Session[] = [
  {
    id: "ses_1", cohortId: "coh_acme_ftm_a", title: "Live Workshop: Leading Conversations",
    scheduledAt: "2024-08-15T14:00:00Z", durationMinutes: 90,
    meetingLink: "https://zoom.us/j/mock-session-1",
    prepNotes: "Review the case study 'The Reluctant Team Member'. Prepare a 2-minute intro about a leadership challenge you're facing."
  },
  {
    id: "ses_2", cohortId: "coh_acme_ftm_a", title: "Peer Coaching Circle: Delegation Wins",
    scheduledAt: "2024-08-22T15:00:00Z", durationMinutes: 60,
    meetingLink: "https://zoom.us/j/mock-session-2",
    prepNotes: "Bring one example of a successful delegation from the past week. Be ready to share what worked and what you'd change."
  },
  {
    id: "ses_3", cohortId: "coh_acme_ftm_a", title: "Final Showcase & Reflections",
    scheduledAt: "2024-09-10T14:00:00Z", durationMinutes: 120,
    meetingLink: "https://zoom.us/j/mock-session-3",
    prepNotes: "Prepare your 5-minute leadership journey presentation. Include key learnings, action plan progress, and one commitment for the next quarter."
  }
]

export const seedActionPlans: ActionPlan[] = [
  {
    id: "ap_1", userId: "usr_acme_lrn1", programInstanceId: "pi_acme_ftm_01",
    commitment: "Hold weekly 1:1s with every direct report",
    whyItMatters: "Building trust requires consistent, dedicated face time. My team has expressed they feel disconnected.",
    dueDate: "2024-08-30", status: "Active", evidenceNote: "Started with 3 of 5 reports. Positive feedback so far.",
  },
  {
    id: "ap_2", userId: "usr_acme_lrn1", programInstanceId: "pi_acme_ftm_01",
    commitment: "Delegate the monthly reporting task to Jamie",
    whyItMatters: "I'm spending 4 hours/week on this. Jamie has expressed interest in more visibility.",
    dueDate: "2024-08-15", status: "Completed", evidenceNote: "Jamie took over the task on Aug 5. Quality is maintained.",
  },
  {
    id: "ap_3", userId: "usr_acme_lrn1", programInstanceId: "pi_acme_ftm_01",
    commitment: "Practice SBI feedback framework in at least 2 conversations",
    whyItMatters: "I avoid giving critical feedback. This framework gives me structure.",
    dueDate: "2024-09-15", status: "Draft"
  }
]

export const seedCertificates: Certificate[] = [
  {
    id: "cert_1", userId: "usr_acme_lrn1", companyId: "comp_acme",
    programInstanceId: "pi_acme_disc_01",
    programTitle: "DiSC Workplace Profile",
    learnerName: "Alice Johnson",
    issuedAt: "2024-02-20T00:00:00Z",
    expiresAt: "2026-02-20T00:00:00Z",
    certificateUrl: "/certificate/cert_1",
    certificateNumber: "EDGE-2024-A3F9",
    verificationToken: "VRF8A3FK9D2XQ7PL",
    status: "Issued"
  },
  {
    id: "cert_2", userId: "usr_acme_lrn1", companyId: "comp_acme",
    programInstanceId: "pi_acme_ftm_01",
    programTitle: "First-Time Managers Program",
    learnerName: "Alice Johnson",
    status: "Eligible"
  },
  {
    id: "cert_3", userId: "usr_acme_lrn2", companyId: "comp_acme",
    programInstanceId: "pi_acme_ftm_01",
    programTitle: "First-Time Managers Program",
    learnerName: "Bob Smith",
    status: "Eligible"
  },
  {
    id: "cert_4", userId: "usr_acme_lrn3", companyId: "comp_acme",
    programInstanceId: "pi_acme_disc_01",
    programTitle: "DiSC Workplace Profile",
    learnerName: "Carol Davis",
    status: "Ineligible"
  },
]

export const seedAttendance: Attendance[] = [
  { id: "att_1", sessionId: "ses_1", userId: "usr_acme_lrn1", status: "Present" },
]

export const seedFacilitatorNotes: FacilitatorNote[] = [
  {
    id: "fn_01",
    sessionId: "ses_1",
    consultantId: "usr_cn_01",
    noteText: "Session went well. Group was highly engaged but struggled with the delegation model.",
    energyRating: 4,
    participationRating: 5,
    resistanceNoted: "Some pushback from senior engineers on trusting juniors with critical tasks.",
    examplesHeard: "John shared a great story about a failed sprint due to micromanagement.",
    commitmentsMade: "Everyone committed to trying 'Delegation Poker' this week.",
    risksIdentified: "Two learners arrived 30 mins late. Might be an ongoing issue with their team's standup clashing.",
    followUpNeeded: "Send the extra reading on psychological safety.",
    resourcesToSend: "Psych Safety PDF",
    expansionSignalDetected: true,
    isInternalOnly: true,
    createdAt: "2024-07-15T14:00:00Z"
  }
]

export const seedExpansionSignals: ExpansionSignal[] = [
  {
    id: "es_01",
    companyId: "comp_acme",
    programInstanceId: "pi_acme_ftm_01",
    signalType: "ConsultingNeed",
    summary: "Need help redesigning the onboarding process.",
    suggestedPlay: "Process Redesign",
    urgency: "Medium",
    evidence: "VP of HR mentioned they are struggling to onboard the new hires from BetaInc.",
    recommendedOwner: "Account Manager",
    status: "Queued",
    notes: "VP mentioned this during the mid-program check-in.",
    detectedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: "es_02",
    companyId: "comp_acme",
    programInstanceId: "pi_acme_ftm_01",
    signalType: "ExecutiveCoaching",
    summary: "Director of Engineering needs 1:1 coaching.",
    suggestedPlay: "Executive Coaching 6-month pack",
    urgency: "High",
    evidence: "Director asked for specific help managing peer conflict.",
    recommendedOwner: "Delivery Director",
    status: "Queued",
    notes: "Follow up immediately.",
    detectedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString()
  }
]

export const seedReportSnapshots: ReportSnapshot[] = []

export const seedManagerCheckIns: any[] = []

export const seedProgramSnapshots: ProgramSnapshot[] = [
  {
    id: "snap_1",
    programInstanceId: "pi_acme_ftm_01",
    companyId: "comp_acme",
    refreshedAt: "2024-07-20T10:00:00Z",
    learnersInvited: 45,
    learnersActive: 38,
    learnersNotStarted: 7,
    learnersInProgress: 25,
    learnersCompleted: 13,
    learnersOverdue: 5,
    certificatesIssued: 12,
    attendanceRate: 87,
    actionPlansActive: 30,
    actionPlansCompleted: 18
  }
]

export const seedExportRecords: ExportRecord[] = [
  {
    id: "exp_1",
    type: "CSV",
    requestedBy: "usr_acme_admin",
    requestedAt: "2024-07-19T09:00:00Z",
    status: "Ready",
    filename: "acme_ftm_completion_report.csv",
    downloadUrl: "#"
  },
  {
    id: "exp_2",
    type: "PDF",
    requestedBy: "usr_acme_admin",
    requestedAt: "2024-07-18T14:30:00Z",
    status: "Failed",
    errorMessage: "PDF generation service timeout after 30s"
  }
]
