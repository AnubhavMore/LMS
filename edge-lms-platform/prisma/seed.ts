import { PrismaClient } from '@prisma/client'
import crypto from 'crypto'
import { seedCompanies } from '../src/data/seed/companies'
import { seedUsers } from '../src/data/seed/users'
import { seedProgramTemplates, seedCourses, seedModules, seedLessons, seedResources, seedQuizzes, seedQuizQuestions } from '../src/data/seed/curriculum'
import { seedProgramInstances, seedCohorts, seedEnrollments, seedProgressRecords, seedSessions, seedActionPlans, seedCertificates, seedAttendance, seedDeliveryHandoffs, seedFacilitatorNotes, seedExpansionSignals, seedReportSnapshots, seedProgramSnapshots, seedExportRecords } from '../src/data/seed/execution'
import { seedRecommendationTemplates } from '../src/data/seed/ai'

const prisma = new PrismaClient()

// Deterministically converts a mock string ID into a valid 24-character hex MongoDB ObjectId
function o(id: string | undefined | null): string | undefined {
  if (!id) return undefined
  return crypto.createHash('md5').update(id).digest('hex').substring(0, 24)
}

function oArr(ids: string[] | undefined | null): string[] {
  if (!ids) return []
  return ids.map(id => o(id) as string)
}

async function main() {
  console.log("Seeding MongoDB...")

  // 1. Companies
  for (const c of seedCompanies) {
    await prisma.company.upsert({
      where: { id: o(c.id)! },
      update: {},
      create: {
        id: o(c.id)!,
        name: c.name,
        industry: c.industry,
        isInternal: c.isInternal,
        createdAt: new Date(c.createdAt)
      }
    })
  }

  // 2. Users
  for (const u of seedUsers) {
    await prisma.user.upsert({
      where: { id: o(u.id)! },
      update: {},
      create: {
        id: o(u.id)!,
        companyId: o(u.companyId)!,
        name: u.name,
        email: u.email,
        role: u.role,
        avatarUrl: u.avatarUrl,
        isActive: u.isActive
      }
    })
  }



  // 4. Program Templates
  for (const pt of seedProgramTemplates) {
    await prisma.programTemplate.upsert({
      where: { id: o(pt.id)! },
      update: {},
      create: {
        id: o(pt.id)!,
        title: pt.title,
        description: pt.description,
        isInternal: pt.isInternal,
        authorId: o(pt.authorId)
      }
    })
  }

  // 5. Courses
  for (const c of seedCourses) {
    await prisma.course.upsert({
      where: { id: o(c.id)! },
      update: {},
      create: {
        id: o(c.id)!,
        title: c.title,
        description: c.description,
        programTemplateId: o(c.programTemplateId)
      }
    })
  }

  // 6. Modules
  for (const m of seedModules) {
    await prisma.module.upsert({
      where: { id: o(m.id)! },
      update: {},
      create: {
        id: o(m.id)!,
        courseId: o(m.courseId)!,
        title: m.title,
        orderIndex: m.orderIndex
      }
    })
  }

  // 7. Lessons
  for (const l of seedLessons) {
    await prisma.lesson.upsert({
      where: { id: o(l.id)! },
      update: {},
      create: {
        id: o(l.id)!,
        moduleId: o(l.moduleId)!,
        title: l.title,
        type: l.type,
        orderIndex: l.orderIndex,
        videoUrl: l.videoUrl,
        contentMarkdown: l.contentMarkdown,
        estimatedMinutes: l.estimatedMinutes,
        keyTakeaway: l.keyTakeaway
      }
    })
  }

  // 8. Resources
  for (const r of seedResources) {
    await prisma.resource.upsert({
      where: { id: o(r.id)! },
      update: {},
      create: {
        id: o(r.id)!,
        lessonId: o(r.lessonId),
        courseId: o(r.courseId),
        title: r.title,
        fileUrl: r.fileUrl,
        type: r.type
      }
    })
  }

  // 9. Quizzes
  for (const q of seedQuizzes) {
    await prisma.quiz.upsert({
      where: { id: o(q.id)! },
      update: {},
      create: {
        id: o(q.id)!,
        lessonId: o(q.lessonId)!,
        title: q.title,
        passingScore: q.passingScore
      }
    })
  }

  // 9.5 Quiz Questions
  for (const qq of seedQuizQuestions) {
    await prisma.quizQuestion.upsert({
      where: { id: o(qq.id)! },
      update: {},
      create: {
        id: o(qq.id)!,
        quizId: o(qq.quizId)!,
        questionText: qq.questionText,
        options: qq.options,
        correctIndex: qq.correctIndex,
        explanationText: qq.explanationText,
        orderIndex: qq.orderIndex
      }
    })
  }

  // 10. Delivery Handoffs
  for (const dh of seedDeliveryHandoffs) {
    await prisma.deliveryHandoff.upsert({
      where: { id: o(dh.id)! },
      update: {},
      create: {
        id: o(dh.id)!,
        companyId: o(dh.companyId)!,
        opportunityId: dh.opportunityId,
        programTitle: dh.programTitle,
        businessNeed: dh.businessNeed,
        targetAudience: dh.targetAudience,
        competencies: dh.competencies,
        assessmentPlan: dh.assessmentPlan,
        successMeasures: dh.successMeasures,
        promisedDeliverables: dh.promisedDeliverables,
        status: dh.status,
        receivedAt: new Date(dh.receivedAt)
      }
    })
  }

  // 11. Program Instances
  for (const pi of seedProgramInstances) {
    await prisma.programInstance.upsert({
      where: { id: o(pi.id)! },
      update: {},
      create: {
        id: o(pi.id)!,
        programTemplateId: o(pi.programTemplateId)!,
        companyId: o(pi.companyId)!,
        name: pi.name,
        status: pi.status,
        startDate: pi.startDate ? new Date(pi.startDate) : undefined,
        endDate: pi.endDate ? new Date(pi.endDate) : undefined,
        edge10OpportunityId: pi.edge10OpportunityId,
        deliveryHandoffId: o(pi.deliveryHandoffId),
        businessNeed: pi.businessNeed,
        audienceSummary: pi.audienceSummary,
        successMeasures: pi.successMeasures,
        competencyTags: pi.competencyTags,
        assessmentPlanSummary: pi.assessmentPlanSummary,
        ownerId: o(pi.ownerId),
        facilitatorIds: oArr(pi.facilitatorIds)
      }
    })
  }

  // 12. Cohorts
  for (const c of seedCohorts) {
    await prisma.cohort.upsert({
      where: { id: o(c.id)! },
      update: {},
      create: {
        id: o(c.id)!,
        programInstanceId: o(c.programInstanceId)!,
        name: c.name,
        facilitatorId: o(c.facilitatorId)
      }
    })
  }

  // 13. Sessions
  for (const s of seedSessions) {
    await prisma.session.upsert({
      where: { id: o(s.id)! },
      update: {},
      create: {
        id: o(s.id)!,
        cohortId: o(s.cohortId)!,
        title: s.title,
        scheduledAt: new Date(s.scheduledAt),
        durationMinutes: s.durationMinutes,
        meetingLink: s.meetingLink,
        prepNotes: s.prepNotes
      }
    })
  }

  // 14. Enrollments
  for (const e of seedEnrollments) {
    await prisma.enrollment.upsert({
      where: { id: o(e.id)! },
      update: {},
      create: {
        id: o(e.id)!,
        userId: o(e.userId)!,
        cohortId: o(e.cohortId)!,
        companyId: o(e.companyId)!,
        status: e.status,
        progressPercentage: e.progressPercentage,
        enrolledAt: new Date(e.enrolledAt)
      }
    })
  }

  // 15. Progress Records
  for (const pr of seedProgressRecords) {
    await prisma.progressRecord.upsert({
      where: { id: o(pr.id)! },
      update: {},
      create: {
        id: o(pr.id)!,
        enrollmentId: o(pr.enrollmentId)!,
        lessonId: o(pr.lessonId)!,
        completed: pr.completed,
        completedAt: pr.completedAt ? new Date(pr.completedAt) : undefined
      }
    })
  }

  // 16. Action Plans
  for (const ap of seedActionPlans) {
    await prisma.actionPlan.upsert({
      where: { id: o(ap.id)! },
      update: {},
      create: {
        id: o(ap.id)!,
        userId: o(ap.userId)!,
        programInstanceId: o(ap.programInstanceId)!,
        commitment: ap.commitment,
        whyItMatters: ap.whyItMatters,
        dueDate: new Date(ap.dueDate),
        status: ap.status,
        evidenceNote: ap.evidenceNote
      }
    })
  }



  // 18. Certificates
  for (const cert of seedCertificates) {
    await prisma.certificate.upsert({
      where: { id: o(cert.id)! },
      update: {},
      create: {
        id: o(cert.id)!,
        userId: o(cert.userId)!,
        companyId: o(cert.companyId)!,
        programInstanceId: o(cert.programInstanceId)!,
        programTitle: cert.programTitle,
        learnerName: cert.learnerName,
        issuedAt: cert.issuedAt ? new Date(cert.issuedAt) : undefined,
        expiresAt: cert.expiresAt ? new Date(cert.expiresAt) : undefined,
        certificateUrl: cert.certificateUrl,
        certificateNumber: cert.certificateNumber,
        verificationToken: cert.verificationToken,
        status: cert.status
      }
    })
  }

  // 19. Attendance
  for (const att of seedAttendance) {
    await prisma.attendance.upsert({
      where: { id: o(att.id)! },
      update: {},
      create: {
        id: o(att.id)!,
        sessionId: o(att.sessionId)!,
        userId: o(att.userId)!,
        status: att.status
      }
    })
  }

  // 20. Facilitator Notes
  for (const fn of seedFacilitatorNotes) {
    await prisma.facilitatorNote.upsert({
      where: { id: o(fn.id)! },
      update: {},
      create: {
        id: o(fn.id)!,
        sessionId: o(fn.sessionId)!,
        consultantId: o(fn.consultantId)!,
        noteText: fn.noteText,
        energyRating: fn.energyRating,
        participationRating: fn.participationRating,
        resistanceNoted: fn.resistanceNoted,
        examplesHeard: fn.examplesHeard,
        commitmentsMade: fn.commitmentsMade,
        risksIdentified: fn.risksIdentified,
        followUpNeeded: fn.followUpNeeded,
        resourcesToSend: fn.resourcesToSend,
        expansionSignalDetected: fn.expansionSignalDetected,
        isInternalOnly: fn.isInternalOnly,
        createdAt: new Date(fn.createdAt)
      }
    })
  }

  // 21. Expansion Signals
  for (const es of seedExpansionSignals) {
    await prisma.expansionSignal.upsert({
      where: { id: o(es.id)! },
      update: {},
      create: {
        id: o(es.id)!,
        companyId: o(es.companyId)!,
        userId: o(es.userId),
        programInstanceId: o(es.programInstanceId),
        signalType: es.signalType,
        summary: es.summary,
        suggestedPlay: es.suggestedPlay,
        urgency: es.urgency,
        evidence: es.evidence,
        recommendedOwner: es.recommendedOwner,
        status: es.status,
        notes: es.notes,
        detectedAt: new Date(es.detectedAt)
      }
    })
  }

  // 22. Report Snapshots
  for (const rs of seedReportSnapshots) {
    await prisma.reportSnapshot.upsert({
      where: { id: o(rs.id)! },
      update: {},
      create: {
        id: o(rs.id)!,
        programInstanceId: o(rs.programInstanceId)!,
        authorId: o(rs.authorId)!,
        sectionsIncluded: rs.sectionsIncluded,
        contentMarkdown: rs.contentMarkdown,
        generatedAt: new Date(rs.generatedAt)
      }
    })
  }

  // 23. Program Snapshots
  for (const ps of seedProgramSnapshots) {
    await prisma.programSnapshot.upsert({
      where: { id: o(ps.id)! },
      update: {},
      create: {
        id: o(ps.id)!,
        programInstanceId: o(ps.programInstanceId)!,
        companyId: o(ps.companyId)!,
        refreshedAt: new Date(ps.refreshedAt),
        learnersInvited: ps.learnersInvited,
        learnersActive: ps.learnersActive,
        learnersNotStarted: ps.learnersNotStarted,
        learnersInProgress: ps.learnersInProgress,
        learnersCompleted: ps.learnersCompleted,
        learnersOverdue: ps.learnersOverdue,
        certificatesIssued: ps.certificatesIssued,
        attendanceRate: ps.attendanceRate,
        actionPlansActive: ps.actionPlansActive,
        actionPlansCompleted: ps.actionPlansCompleted
      }
    })
  }

  // 24. Export Records
  for (const er of seedExportRecords) {
    await prisma.exportRecord.upsert({
      where: { id: o(er.id)! },
      update: {},
      create: {
        id: o(er.id)!,
        type: er.type,
        requestedBy: o(er.requestedBy)!,
        requestedAt: new Date(er.requestedAt),
        status: er.status,
        downloadUrl: er.downloadUrl,
        errorMessage: er.errorMessage,
        filename: er.filename
      }
    })
  }

  // 25. Recommendation Templates
  for (const rt of seedRecommendationTemplates) {
    await prisma.recommendationTemplate.upsert({
      where: { id: o(rt.id)! },
      update: {},
      create: {
        id: o(rt.id)!,
        questionCode: rt.questionCode,
        play: rt.play,
        role: rt.role,
        challengeTag: rt.challengeTag,
        answerShort: rt.answerShort,
        answerLong: rt.answerLong,
        actions: rt.actions,
        risks: rt.risks,
        managerTalkingPoints: rt.managerTalkingPoints,
        direction30: rt.direction30,
        direction60: rt.direction60,
        direction90: rt.direction90,
        relatedModules: rt.relatedModules,
        audienceRole: rt.audienceRole
      }
    })
  }



  console.log("Seeding complete!")
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
