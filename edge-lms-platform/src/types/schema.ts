// Core Entities
export type Role = "Learner" | "Consultant" | "StrengthscapeAdmin" | "SuperAdmin" | "Finance"
export type BadgeStatus = "Not Started" | "Invited" | "Active" | "In Progress" | "Overdue" | "Completed" | "Certificate Issued" | "Needs Review" | "Failed" | "Suspended" | "Eligible" | "Issued" | "Delivered" | "Expiring Soon" | "Expired" | "Revoked" | "Reissued" | "Pending" | "Ineligible" | "Reviewed" | "Stuck" | "Draft"

export interface Company {
  id: string
  name: string
  industry?: string
  isInternal: boolean
  createdAt: string
}

export interface User {
  id: string
  companyId: string
  name: string
  email: string
  role: Role
  avatarUrl?: string
  isActive: boolean
}

// Curriculum
export interface ProgramTemplate {
  id: string
  title: string
  description: string
  isInternal: boolean
  authorId?: string
}

export interface Course {
  id: string
  title: string
  description: string
  programTemplateId?: string
}

export interface Module {
  id: string
  courseId: string
  title: string
  orderIndex: number
}

export type LessonType = "Video" | "Text" | "Quiz" | "Assignment" | "Reflection" | "Resource" | "LiveSessionPrep"

export interface Lesson {
  id: string
  moduleId: string
  title: string
  type: LessonType
  orderIndex: number
  videoUrl?: string
  contentMarkdown?: string
  estimatedMinutes?: number
  keyTakeaway?: string
}

export interface Resource {
  id: string
  lessonId?: string
  courseId?: string
  title: string
  fileUrl: string
  type: "PDF" | "Link" | "Document"
}

export interface Quiz {
  id: string
  lessonId: string
  title: string
  passingScore: number
}

export interface QuizQuestion {
  id: string
  quizId: string
  questionText: string
  options: string[]
  correctIndex: number
  explanationText?: string
  orderIndex: number
}

// Execution & Instances
export type ProgramStatus = "Setup" | "Active" | "Delivery In Progress" | "Reporting" | "Completed" | "Archived"

export interface ProgramInstance {
  id: string
  programTemplateId: string
  companyId: string
  name: string
  status: ProgramStatus | BadgeStatus
  startDate?: string
  endDate?: string
  
  // Prompt 6 Fields
  edge10OpportunityId?: string
  deliveryHandoffId?: string
  businessNeed?: string
  audienceSummary?: string
  successMeasures?: string[]
  competencyTags?: string[]
  assessmentPlanSummary?: string
  ownerId?: string
  facilitatorIds?: string[]
}

export interface Cohort {
  id: string
  programInstanceId: string
  name: string
  facilitatorId?: string
}

export interface Session {
  id: string
  cohortId: string
  title: string
  scheduledAt: string
  durationMinutes?: number
  meetingLink?: string
  prepNotes?: string
}

export interface FacilitatorNote {
  id: string
  sessionId: string
  consultantId: string
  noteText: string
  
  // Prompt 7 Qualitative Data
  energyRating?: number // 1-5
  participationRating?: number // 1-5
  resistanceNoted?: string
  examplesHeard?: string
  commitmentsMade?: string
  risksIdentified?: string
  followUpNeeded?: string
  resourcesToSend?: string
  expansionSignalDetected: boolean
  isInternalOnly: boolean

  createdAt: string
}


// Learner Progress
export interface Enrollment {
  id: string
  userId: string
  cohortId: string
  companyId: string
  status: BadgeStatus
  progressPercentage: number
  enrolledAt: string
}

export interface ProgressRecord {
  id: string
  enrollmentId: string
  lessonId: string
  completed: boolean
  completedAt?: string
}

export interface QuizAttempt {
  id: string
  quizId: string
  userId: string
  score: number
  passed: boolean
  attemptedAt: string
}

export interface ActionPlan {
  id: string
  userId: string
  programInstanceId: string
  commitment: string
  whyItMatters: string
  dueDate: string
  status: "Draft" | "Active" | "Reviewed" | "Completed" | "Stuck"
  evidenceNote?: string
}

export interface Certificate {
  id: string
  userId: string
  companyId: string
  programInstanceId: string
  programTitle?: string
  learnerName?: string
  issuedAt?: string
  expiresAt?: string
  revokedAt?: string
  revokedReason?: string
  certificateUrl?: string
  certificateNumber?: string
  verificationToken?: string
  status: "Eligible" | "Issued" | "Delivered" | "Expiring Soon" | "Expired" | "Revoked" | "Reissued" | "Pending" | "Ineligible"
}

export interface Form {
  id: string
  title: string
  programInstanceId?: string
}

export interface FormSubmission {
  id: string
  formId: string
  userId: string
  responses: Record<string, unknown>
  submittedAt: string
}

export interface Attendance {
  id: string
  sessionId: string
  userId: string
  status: "Present" | "Absent" | "Excused"
}

// AI & System
export interface RitualTemplate {
  id: string
  title: string
  frequency: "Daily" | "Weekly" | "Monthly"
  description: string
}

export interface ClientReportSnapshot {
  id: string
  companyId: string
  generatedAt: string
  metricsData: Record<string, unknown>
}

export interface RecommendationTemplate {
  id: string
  questionCode: string // e.g., "Q1"
  play: string // e.g., "First-Time Managers"
  role: Role | "Any" // Target role
  challengeTag: string // e.g., "Delegation"
  answerShort: string
  answerLong: string
  actions: string[]
  risks: string[]
  managerTalkingPoints: string[]
  direction30: string
  direction60: string
  direction90: string
  relatedModules: string[]
  audienceRole: Role[] // Roles that can see this template
}

export interface ExpansionSignal {
  id: string
  companyId: string
  userId?: string
  programInstanceId?: string
  signalType: "HighEngagement" | "FeatureRequest" | "ConsultingNeed" | "NewCohortRequested" | "ExecutiveCoaching" | "TeamDysfunction"
  summary: string
  suggestedPlay: string
  urgency: "Low" | "Medium" | "High"
  evidence: string
  recommendedOwner: string
  status: "Draft" | "Queued" | "Pushed" | "Reviewed"
  notes?: string
  detectedAt: string
}

export interface DeliveryHandoff {
  id: string
  companyId: string
  opportunityId: string
  programTitle: string
  businessNeed: string
  targetAudience: string
  competencies: string[]
  assessmentPlan: string
  successMeasures: string[]
  promisedDeliverables: string[]
  status: "Received" | "Processed" | "Failed"
  receivedAt: string
}

export interface IntegrationEvent {
  id: string
  type: "Push" | "Pull"
  targetSystem: "Edge10" | "Zoho" | "Notion"
  payload: any
  status: "Pending" | "Success" | "Failed"
  createdAt: string
  processedAt?: string
}

export interface ExternalSystemLink {
  id: string
  entityType: "Company" | "ProgramInstance" | "User"
  entityId: string
  systemName: "Edge10" | "Zoho" | "Notion"
  externalId: string
  externalUrl?: string
}

export interface ReportSnapshot {
  id: string
  programInstanceId: string
  authorId: string
  sectionsIncluded: string[]
  contentMarkdown: string
  generatedAt: string
}

export interface AuditLog {
  id: string
  userId: string
  action: string
  details: string
  timestamp: string
}


export interface ProgramSnapshot {
  id: string
  programInstanceId: string
  companyId: string
  refreshedAt: string
  learnersInvited: number
  learnersActive: number
  learnersNotStarted: number
  learnersInProgress: number
  learnersCompleted: number
  learnersOverdue: number
  certificatesIssued: number
  attendanceRate: number
  actionPlansActive: number
  actionPlansCompleted: number
}

export interface ExportRecord {
  id: string
  type: "CSV" | "PDF"
  requestedBy: string
  requestedAt: string
  status: "Pending" | "Ready" | "Failed"
  downloadUrl?: string
  errorMessage?: string
  filename?: string
}
