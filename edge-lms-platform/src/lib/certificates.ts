import { Certificate } from "@/types/schema"

// Generates a unique certificate number like EDGE-2024-A3F9
export function buildCertificateNumber(): string {
  const year = new Date().getFullYear()
  const random = Math.random().toString(36).substring(2, 6).toUpperCase()
  return `EDGE-${year}-${random}`
}

// Generates a secure verification token
export function buildVerificationToken(): string {
  return Math.random().toString(36).substring(2, 12).toUpperCase() +
    Math.random().toString(36).substring(2, 12).toUpperCase()
}

export interface EligibilityResult {
  eligible: boolean
  reasons: string[]
  failedChecks: string[]
}

export interface EligibilityInput {
  completionPercentage: number
  requiredCompletion?: number // default 100
  quizPassed?: boolean | null  // null = not applicable
  reflectionSubmitted?: boolean | null // null = not applicable
  attendancePresent?: boolean | null // null = not applicable
}

export function checkEligibility(input: EligibilityInput): EligibilityResult {
  const reasons: string[] = []
  const failedChecks: string[] = []
  const required = input.requiredCompletion ?? 100

  // Check 1: Course completion
  if (input.completionPercentage >= required) {
    reasons.push(`Course completed (${input.completionPercentage}%)`)
  } else {
    failedChecks.push(`Course not complete (${input.completionPercentage}% of required ${required}%)`)
  }

  // Check 2: Quiz (if applicable)
  if (input.quizPassed !== null && input.quizPassed !== undefined) {
    if (input.quizPassed) {
      reasons.push("Quiz passed")
    } else {
      failedChecks.push("Quiz not passed")
    }
  }

  // Check 3: Reflection (if applicable)
  if (input.reflectionSubmitted !== null && input.reflectionSubmitted !== undefined) {
    if (input.reflectionSubmitted) {
      reasons.push("Required reflection submitted")
    } else {
      failedChecks.push("Required reflection not submitted")
    }
  }

  // Check 4: Attendance (if applicable)
  if (input.attendancePresent !== null && input.attendancePresent !== undefined) {
    if (input.attendancePresent) {
      reasons.push("Session attendance confirmed")
    } else {
      failedChecks.push("Required session attendance not confirmed")
    }
  }

  return {
    eligible: failedChecks.length === 0,
    reasons,
    failedChecks
  }
}

export function issueCertificate(
  userId: string,
  companyId: string,
  programInstanceId: string,
  learnerName: string,
  programTitle: string
): Certificate {
  return {
    id: `cert_${Date.now()}`,
    userId,
    companyId,
    programInstanceId,
    learnerName,
    programTitle,
    issuedAt: new Date().toISOString(),
    expiresAt: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000 * 2).toISOString(), // 2 years
    certificateNumber: buildCertificateNumber(),
    verificationToken: buildVerificationToken(),
    certificateUrl: `/certificate/${userId}-${programInstanceId}`,
    status: "Issued"
  }
}
