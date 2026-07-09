"use server"

import { LessonType } from "@prisma/client"
import { revalidatePath } from "next/cache"
import { prisma } from "@/lib/prisma"

export async function getCourses() {
  // MOCK DATA
  return [
    {
      id: "mock_course_1",
      title: "Introduction to Edge LMS",
      description: "Learn the basics of the Edge Learning Management System.",
      programTemplateId: "mock_template_1",
      modules: [
        {
          id: "mock_module_1",
          courseId: "mock_course_1",
          title: "Getting Started",
          orderIndex: 1,
          lessons: [
            {
              id: "mock_lesson_1",
              moduleId: "mock_module_1",
              title: "Welcome to Edge",
              type: LessonType.Video,
              orderIndex: 1,
              videoUrl: "https://example.com/video",
              contentMarkdown: "Welcome content",
              estimatedMinutes: 5,
              keyTakeaway: "Edge is powerful."
            }
          ]
        }
      ]
    }
  ];
}

export async function getCourseById(id: string) {
  // MOCK DATA
  return {
    id: id,
    title: "Introduction to Edge LMS",
    description: "Learn the basics of the Edge Learning Management System.",
    programTemplateId: "mock_template_1",
    modules: [
      {
        id: "mock_module_1",
        courseId: id,
        title: "Getting Started",
        orderIndex: 1,
        lessons: [
          {
            id: "mock_lesson_1",
            moduleId: "mock_module_1",
            title: "Welcome to Edge",
            type: LessonType.Video,
            orderIndex: 1,
            videoUrl: "https://example.com/video",
            contentMarkdown: "Welcome content",
            estimatedMinutes: 5,
            keyTakeaway: "Edge is powerful."
          }
        ]
      }
    ]
  };
}

export async function createCourse(data: { title: string; description: string; programTemplateId?: string }) {
  // 1. Create the Course
  let templateId = data.programTemplateId

  // For the demo environment, if no template is provided, we auto-create the whole hierarchy 
  // so the test learner sees it immediately.
  if (!templateId) {
    const template = await prisma.programTemplate.create({
      data: {
        title: `${data.title} Template`,
        description: `Auto-generated template for ${data.title}`
      }
    })
    templateId = template.id
  }

  const course = await prisma.course.create({
    data: {
      title: data.title,
      description: data.description,
      programTemplateId: templateId
    }
  })

  // Auto-enroll the test learner (usr_acme_lrn1) if we just created a new template
  if (!data.programTemplateId) {
    const companyId = "comp_strengthscape"
    
    // Ensure company exists
    await prisma.company.upsert({
      where: { id: companyId },
      update: {},
      create: { id: companyId, name: "Strengthscape" }
    })



    // Ensure user exists
    await prisma.user.upsert({
      where: { id: "usr_acme_lrn1" },
      update: {},
      create: {
        id: "usr_acme_lrn1",
        email: "learner_acme_2030@strengthscape.com",
        name: "Learner User",
        role: "Learner",
        companyId
      }
    })

    const pi = await prisma.programInstance.create({
      data: {
        programTemplateId: templateId as string,
        companyId,
        name: `${data.title} Program Run`,
        status: "Active"
      }
    })

    const cohort = await prisma.cohort.create({
      data: {
        programInstanceId: pi.id,
        name: "Learner Cohort"
      }
    })

    await prisma.enrollment.create({
      data: {
        userId: "usr_acme_lrn1",
        cohortId: cohort.id,
        companyId,
        programInstanceId: pi.id,
        status: "In Progress",
        progressPercentage: 0
      }
    })
  }

  try {
    revalidatePath('/platform/courses')
    revalidatePath('/learner/dashboard')
    revalidatePath('/learner/my-learning')
  } catch (e) {
    // Ignore if called outside Next.js context
  }
  return course
}

export async function createModule(data: { courseId: string; title: string; orderIndex: number }) {
  const mod = await prisma.module.create({
    data
  })
  revalidatePath(`/platform/courses/${data.courseId}/builder`)
  return mod
}

export async function createLesson(data: { moduleId: string; title: string; type: LessonType; orderIndex: number; videoUrl?: string; contentMarkdown?: string; estimatedMinutes?: number }) {
  const mod = await prisma.module.findUnique({ where: { id: data.moduleId }, select: { courseId: true } })
  const lesson = await prisma.lesson.create({
    data
  })
  if (mod) revalidatePath(`/platform/courses/${mod.courseId}/builder`)
  return lesson
}

export async function deleteModule(moduleId: string) {
  const mod = await prisma.module.findUnique({ where: { id: moduleId } })
  if (mod) {
    await prisma.module.delete({ where: { id: moduleId } })
    revalidatePath(`/platform/courses/${mod.courseId}/builder`)
  }
}

export async function deleteLesson(lessonId: string) {
  const lesson = await prisma.lesson.findUnique({ where: { id: lessonId }, include: { module: true } })
  if (lesson) {
    await prisma.lesson.delete({ where: { id: lessonId } })
    revalidatePath(`/platform/courses/${lesson.module.courseId}/builder`)
  }
}
export async function deleteCourse(id: string) {
  // Find the course
  const course = await prisma.course.findUnique({
    where: { id }
  })
  if (!course) return false

  // Check if we should delete the program template
  let shouldDeleteTemplate = false
  if (course.programTemplateId) {
    const remaining = await prisma.course.count({ where: { programTemplateId: course.programTemplateId, NOT: { id: course.id } } })
    if (remaining === 0) {
      shouldDeleteTemplate = true
    }
  }

  // Delete the course (cascades will handle modules, lessons, quizzes, resources, etc.)
  await prisma.course.delete({ where: { id } })

  // Delete the template if it was the last course (cascades will handle ProgramInstances, Cohorts, etc.)
  if (shouldDeleteTemplate && course.programTemplateId) {
    await prisma.programTemplate.delete({ where: { id: course.programTemplateId } })
  }

  try {
    revalidatePath('/platform/courses')
    revalidatePath('/learner/courses')
  } catch (e) {}

  return true
}
