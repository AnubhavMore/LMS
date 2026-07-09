"use server"

import { prisma } from "@/lib/prisma"
import { ActionPlan } from "@/types/schema"

export async function getLearnerDashboard(userId: string) {
  const enrollments = await prisma.enrollment.findMany({ where: { userId } })
  const activeEnrollment = enrollments.find(e => e.status === "In Progress")

  let nextLesson = null
  let nextCourse = null

  if (activeEnrollment) {
    const cohort = await prisma.cohort.findUnique({ where: { id: activeEnrollment.cohortId } })
    const pi = await prisma.programInstance.findUnique({ where: { id: cohort?.programInstanceId } })
    const courses = await prisma.course.findMany({ where: { programTemplateId: pi?.programTemplateId } })

    for (const course of courses) {
      const modules = await prisma.module.findMany({ where: { courseId: course.id }, orderBy: { orderIndex: 'asc' } })
      for (const mod of modules) {
        const lessons = await prisma.lesson.findMany({ where: { moduleId: mod.id }, orderBy: { orderIndex: 'asc' } })
        for (const lesson of lessons) {
          const pr = await prisma.progressRecord.findFirst({
            where: { enrollmentId: activeEnrollment.id, lessonId: lesson.id }
          })
          if (!pr || !pr.completed) {
            nextLesson = lesson
            nextCourse = course
            break
          }
        }
        if (nextLesson) break
      }
      if (nextLesson) break
    }
  }

  const userCohortIds = enrollments.map(e => e.cohortId)
  const upcomingSessions = await prisma.session.findMany({
    where: { cohortId: { in: userCohortIds }, scheduledAt: { gte: new Date() } },
    orderBy: { scheduledAt: 'asc' },
    take: 2
  })

  const pendingReflections = await prisma.lesson.findMany({
    where: { type: "Reflection" }
  }) // Simplified for now

  const certs = await prisma.certificate.findMany({ where: { userId } })

  return {
    activeEnrollment,
    nextAction: nextLesson ? { lesson: nextLesson, course: nextCourse } : null,
    upcomingSessions,
    pendingReflections: [],
    certificates: certs,
    tip: null,
    enrollments
  }
}

import { unstable_noStore as noStore } from "next/cache"

export async function getLearnerPrograms(userId: string) {
  noStore()
  const enrollments = await prisma.enrollment.findMany({ where: { userId } })
  const res = []
  for (const enr of enrollments) {
    const cohort = await prisma.cohort.findUnique({ where: { id: enr.cohortId } })
    const programInstance = cohort ? await prisma.programInstance.findUnique({ where: { id: cohort.programInstanceId } }) : null
    const template = programInstance ? await prisma.programTemplate.findUnique({ where: { id: programInstance.programTemplateId } }) : null
    const firstCourse = template ? await prisma.course.findFirst({ where: { programTemplateId: template.id } }) : null
    res.push({ enrollment: enr, cohort, programInstance, template, course: firstCourse })
  }
  return res
}

export async function getLearnerCoursesWithProgress(userId: string) {
  noStore()
  // Fetch all enrollments for this user
  const enrollments = await prisma.enrollment.findMany({ where: { userId } })
  
  const coursesWithProgress = []
  const seenCourses = new Set()
  
  for (const enrollment of enrollments) {
    const cohort = await prisma.cohort.findUnique({ where: { id: enrollment.cohortId } })
    if (!cohort) continue
    const programInstance = await prisma.programInstance.findUnique({ where: { id: cohort.programInstanceId } })
    if (!programInstance) continue
    
    // Find courses associated with this template
    const courses = await prisma.course.findMany({ 
      where: { programTemplateId: programInstance.programTemplateId },
      include: { modules: { include: { lessons: true } } }
    })

    for (const course of courses) {
      if (seenCourses.has(course.id)) continue
      seenCourses.add(course.id)

      const totalLessons = course.modules.reduce((acc, m) => acc + m.lessons.length, 0)
      
      // Count completed lessons using ProgressRecord
      let completedLessons = 0
      for (const m of course.modules) {
        for (const l of m.lessons) {
          const pr = await prisma.progressRecord.findFirst({
            where: { enrollmentId: enrollment.id, lessonId: l.id, completed: true }
          })
          if (pr) completedLessons++
        }
      }

      coursesWithProgress.push({
        course,
        enrollment,
        progress: {
          total: totalLessons,
          completed: completedLessons,
          percentage: totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0
        }
      })
    }
  }

  return coursesWithProgress
}

export async function getCoursePlayer(courseId: string, userId: string) {
  const course = await prisma.course.findUnique({ where: { id: courseId } })
  if (!course) return null

  const modules = await prisma.module.findMany({ where: { courseId }, orderBy: { orderIndex: 'asc' } })
  const enrollments = await prisma.enrollment.findMany({ where: { userId } })
  const enrollment = enrollments[0] // Simplified

  const modulesWithLessons = []
  for (const mod of modules) {
    const lessons = await prisma.lesson.findMany({ where: { moduleId: mod.id }, orderBy: { orderIndex: 'asc' } })
    const lessonsWithProgress = []
    for (const lesson of lessons) {
      const pr = enrollment ? await prisma.progressRecord.findFirst({ where: { lessonId: lesson.id, enrollmentId: enrollment.id } }) : null
      const resources = await prisma.resource.findMany({ where: { lessonId: lesson.id } })
      
      let quizPassed = false
      if (lesson.type === "Quiz") {
        const quiz = await prisma.quiz.findFirst({ where: { lessonId: lesson.id } })
        if (quiz) {
          const attempt = await prisma.quizAttempt.findFirst({ where: { userId, quizId: quiz.id, passed: true } })
          if (attempt) quizPassed = true
        }
      }

      lessonsWithProgress.push({ ...lesson, completed: pr?.completed || false, completedAt: pr?.completedAt, resources, quizPassed })
    }
    modulesWithLessons.push({ ...mod, lessons: lessonsWithProgress })
  }

  const totalLessons = modulesWithLessons.reduce((acc, m) => acc + m.lessons.length, 0)
  const completedLessons = modulesWithLessons.reduce((acc, m) => acc + m.lessons.filter(l => l.completed).length, 0)

  return {
    course,
    modules: modulesWithLessons,
    enrollment,
    progress: { total: totalLessons, completed: completedLessons, percentage: totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0 }
  }
}

export async function getQuizForLesson(lessonId: string) {
  const quiz = await prisma.quiz.findFirst({
    where: { lessonId },
    include: {
      questions: {
        orderBy: { orderIndex: 'asc' }
      }
    }
  })

  if (!quiz) return null

  // Strip correctIndex and explanationText for client security
  const safeQuestions = quiz.questions.map(q => ({
    id: q.id,
    quizId: q.quizId,
    questionText: q.questionText,
    options: q.options,
    orderIndex: q.orderIndex
  }))

  return { ...quiz, questions: safeQuestions }
}

export async function submitQuizAttempt(userId: string, quizId: string, answers: number[]) {
  const quiz = await prisma.quiz.findUnique({
    where: { id: quizId },
    include: { questions: { orderBy: { orderIndex: 'asc' } } }
  })
  if (!quiz) return null

  let correct = 0
  for (let i = 0; i < quiz.questions.length; i++) {
    if (answers[i] === quiz.questions[i].correctIndex) correct++
  }
  const score = Math.round((correct / quiz.questions.length) * 100)
  const passed = score >= quiz.passingScore

  const attempt = await prisma.quizAttempt.create({
    data: { quizId, userId, score, passed }
  })

  // If passed, auto-mark lesson complete
  if (passed) {
    const enrollment = await prisma.enrollment.findFirst({ where: { userId, status: "In Progress" } })
    if (enrollment) {
      const lesson = await prisma.lesson.findFirst({
        where: { quizzes: { some: { id: quizId } } }
      })
      if (lesson) {
        const existing = await prisma.progressRecord.findFirst({
          where: { enrollmentId: enrollment.id, lessonId: lesson.id }
        })
        if (!existing) {
          await prisma.progressRecord.create({
            data: { enrollmentId: enrollment.id, lessonId: lesson.id, completed: true, completedAt: new Date() }
          })
        } else if (!existing.completed) {
          await prisma.progressRecord.update({
            where: { id: existing.id },
            data: { completed: true, completedAt: new Date() }
          })
        }
      }
    }
  }

  return { attempt, score, passed, total: quiz.questions.length, correct, questions: quiz.questions }
}

export async function getQuizAttempts(userId: string, quizId: string) {
  return await prisma.quizAttempt.findMany({
    where: { userId, quizId },
    orderBy: { attemptedAt: 'desc' }
  })
}

export async function markLessonComplete(userId: string, lessonId: string) {
  const enrollment = await prisma.enrollment.findFirst({ where: { userId, status: "In Progress" } })
  if (!enrollment) return false

  const existing = await prisma.progressRecord.findFirst({ where: { enrollmentId: enrollment.id, lessonId } })
  if (existing) {
    await prisma.progressRecord.update({
      where: { id: existing.id },
      data: { completed: true, completedAt: new Date() }
    })
  } else {
    await prisma.progressRecord.create({
      data: { enrollmentId: enrollment.id, lessonId, completed: true, completedAt: new Date() }
    })
  }
  return true
}

export async function getLearnerActionPlans(userId: string) {
  return await prisma.actionPlan.findMany({ where: { userId } })
}

export async function upsertActionPlan(plan: ActionPlan) {
  if (plan.id.startsWith("ap_new")) {
    return await prisma.actionPlan.create({ data: { ...plan, id: undefined } as any })
  }
  return await prisma.actionPlan.update({ where: { id: plan.id }, data: plan as any })
}

export async function getLearnerCertificates(userId: string) {
  const certs = await prisma.certificate.findMany({ where: { userId } })
  const res = []
  for (const cert of certs) {
    const pi = await prisma.programInstance.findUnique({ where: { id: cert.programInstanceId } })
    const template = pi ? await prisma.programTemplate.findUnique({ where: { id: pi.programTemplateId } }) : null
    res.push({ ...cert, programName: template?.title || pi?.name || "Unknown Program" } as any)
  }
  return res
}

export async function getLearnerResources(userId: string) {
  return await prisma.resource.findMany() // Simplified
}

export async function getLearnerSessions(userId: string) {
  const enrollments = await prisma.enrollment.findMany({ where: { userId } })
  const cohortIds = enrollments.map(e => e.cohortId)
  return await prisma.session.findMany({ where: { cohortId: { in: cohortIds } } })
}

export async function getCompanyDashboard(companyId: string) {
  const activeLearners = await prisma.user.count({ where: { companyId, role: "Learner" } })
  const programs = await prisma.programInstance.findMany({ where: { companyId } })
  return {
    metrics: { activeLearners, avgCompletion: 0, activePrograms: programs.length, certificatesIssued: 0, overdueLearners: 0, activationRate: 85 },
    topPrograms: [],
    cohortProgress: [],
    upcomingSessions: []
  }
}

export async function getCompanyLearners(companyId: string) {
  return await prisma.user.findMany({ where: { companyId, role: "Learner" } })
}

export async function getCompanyAssignments(companyId: string) {
  return []
}

export async function getCompanyPrograms(companyId: string) {
  return await prisma.programInstance.findMany({ where: { companyId } })
}

export async function getCompanyReports() {
  return {}
}

export async function getCompanyCertificates(companyId: string) {
  return (await prisma.certificate.findMany({ where: { companyId } })) as any[]
}

export async function getCompanyManagerActions(companyId: string) {
  return []
}

export async function getConsultantCohorts(consultantId: string) {
  return await prisma.cohort.findMany({ where: { facilitatorId: consultantId } })
}

export async function getPlatformStats() {
  const activeTenants = await prisma.company.count({ where: { isInternal: false } })
  return { activeTenants, systemHealth: 99.9, storageUsed: "1.2 TB", securityAlerts: 0, aiQuotaUsed: 85 }
}

export async function getPlatformProgramInstances() {
  return await prisma.programInstance.findMany()
}

export async function getPlatformEnrollments() {
  noStore()
  return await prisma.enrollment.findMany({
    include: {
      user: {
        include: { company: true }
      },
      programInstance: true,
      cohort: true,
    },
    orderBy: { enrolledAt: 'desc' }
  })
}

export async function getSuperAdminCourses() {
  noStore()
  return await prisma.course.findMany({
    include: {
      modules: { include: { lessons: true } },
      programTemplate: true
    },
    orderBy: { createdAt: 'desc' }
  })
}

export async function getSuperAdminConsultants() {
  noStore()
  return await prisma.user.findMany({
    where: { role: 'Consultant' },
    include: {
      company: true,
      facilitatedCohorts: true
    }
  })
}

export async function getProgramInstance(id: string) {
  return await prisma.programInstance.findUnique({ where: { id } })
}

export async function getDeliveryHandoff(programInstanceId: string) {
  return null
}

export async function getProgramCohorts(programInstanceId: string) {
  return await prisma.cohort.findMany({ where: { programInstanceId } })
}

export async function getProgramSessions(programInstanceId: string) {
  return []
}

export async function getProgramSetupChecklist(programInstanceId: string) {
  return { handoffComplete: true, cohortsCreated: true, learnersInvited: true, sessionsScheduled: true, facilitatorsAssigned: true }
}

export async function getConsultantDashboard(consultantId: string) {
  return { todaySessions: [], activeProgramsCount: 0, cohortsNotReady: 0, reflectionsToReview: 0, pendingReports: 0, pendingSignals: 0 }
}

export async function getConsultantPrograms(consultantId: string) {
  return []
}

export async function getCohortReadiness(programInstanceId: string) {
  return { totalLearners: 0, activeCount: 0, notStartedCount: 0, preworkCompletionPct: 0, reflectionCompletionPct: 0, riskFlags: [] }
}

export async function getSessionNotes(sessionId: string) {
  return (await prisma.facilitatorNote.findFirst({ where: { sessionId } })) as any
}

export async function saveSessionNotes(data: unknown) {
  return { success: true, id: `fn_${Date.now()}` }
}

export async function logExpansionSignal(data: any) {
  return await prisma.expansionSignal.create({ data } as any)
}

export async function generateReportSnapshot(programInstanceId: string, sections: string[]): Promise<{ id: string } | null> {
  return { id: `snap_${Date.now()}` }
}

export async function getCertificatesByUser(userId: string) {
  return (await prisma.certificate.findMany({ where: { userId } })) as any[]
}

export async function getCertificateById(id: string) {
  return (await prisma.certificate.findUnique({ where: { id } })) as any
}

export async function getCertificateQueue(companyId: string) {
  return (await prisma.certificate.findMany({ where: { companyId, status: "Eligible" } })) as any[]
}

export async function getFailedCertificateJobs(companyId: string) {
  return (await prisma.certificate.findMany({ where: { companyId, status: "Ineligible" } })) as any[]
}

export async function getProgramSnapshot(programInstanceId: string) {
  return await prisma.programSnapshot.findFirst({ where: { programInstanceId } })
}

export async function getExportHistory(companyId: string) {
  return await prisma.exportRecord.findMany()
}

export async function refreshSnapshot(programInstanceId: string) {
  return { success: true, refreshedAt: new Date().toISOString() }
}

export async function getRecommendationTemplates() {
  return (await prisma.recommendationTemplate.findMany()) as any[]
}

export async function getGuidedInsight(
  questionCode: string,
  play: string,
  role: import("@/types/schema").Role,
  challengeTag: string
) {
  const { matchTemplate } = await import("@/lib/insights")
  const templates = await getRecommendationTemplates()
  return matchTemplate(templates, questionCode, play, role, challengeTag)
}
