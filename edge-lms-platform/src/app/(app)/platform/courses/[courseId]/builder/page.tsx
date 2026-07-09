import { getCourseById, createModule, createLesson, deleteModule, deleteLesson } from "@/lib/courses"
import { Button } from "@/components/ui/Button"
import { LessonType } from "@prisma/client"
import { redirect } from "next/navigation"
import { PlayCircle, Plus, FileText, ArrowLeft, GripVertical } from "lucide-react"
import Link from "next/link"

async function handleAddModule(formData: FormData) {
  "use server"
  const title = formData.get("title") as string
  const courseId = formData.get("courseId") as string
  const orderIndex = Number(formData.get("orderIndex")) || 0
  if (title && courseId) {
    await createModule({ courseId, title, orderIndex })
  }
}

async function handleAddLesson(formData: FormData) {
  "use server"
  const moduleId = formData.get("moduleId") as string
  const title = formData.get("title") as string
  const videoUrl = formData.get("videoUrl") as string
  const orderIndex = Number(formData.get("orderIndex")) || 0
  
  if (moduleId && title && videoUrl) {
    await createLesson({
      moduleId,
      title,
      type: LessonType.Video,
      videoUrl,
      orderIndex,
      estimatedMinutes: 5
    })
  }
}

async function handleDeleteModule(formData: FormData) {
  "use server"
  const moduleId = formData.get("moduleId") as string
  if (moduleId) {
    await deleteModule(moduleId)
  }
}

async function handleDeleteLesson(formData: FormData) {
  "use server"
  const lessonId = formData.get("lessonId") as string
  if (lessonId) {
    await deleteLesson(lessonId)
  }
}

export default async function CourseBuilderPage({ params }: { params: Promise<{ courseId: string }> }) {
  const resolvedParams = await params
  const course = await getCourseById(resolvedParams.courseId)

  if (!course) {
    redirect("/platform/courses")
  }

  return (
    <div className="max-w-5xl mx-auto p-6 pb-24">
      <div className="mb-6">
        <Link href="/platform/courses" className="text-sm font-medium text-blue-600 hover:text-blue-800 flex items-center">
          <ArrowLeft className="w-4 h-4 mr-1" />
          Back to Courses
        </Link>
      </div>

      <div className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">{course.title}</h1>
        <p className="text-gray-600">{course.description}</p>
      </div>

      <div className="space-y-8">
        {course.modules.map((mod, modIdx) => (
          <div key={mod.id} className="bg-gray-50 border border-gray-200 rounded-xl overflow-hidden">
            <div className="bg-gray-100 px-6 py-4 border-b border-gray-200 flex items-center justify-between">
              <h2 className="text-lg font-bold flex items-center">
                <GripVertical className="w-5 h-5 mr-2 text-gray-400" />
                Module {modIdx + 1}: {mod.title}
              </h2>
              <form action={handleDeleteModule}>
                <input type="hidden" name="moduleId" defaultValue={mod.id} />
                <button type="submit" className="text-sm font-medium text-red-600 hover:text-red-800">
                  Delete Module
                </button>
              </form>
            </div>
            
            <div className="p-6 space-y-4">
              {mod.lessons.map((lesson, lessonIdx) => (
                <div key={lesson.id} className="bg-white border border-gray-200 rounded-lg p-4 flex items-start group relative">
                  <GripVertical className="w-5 h-5 mr-3 text-gray-300 mt-1" />
                  <div className="flex-1">
                    <div className="flex items-center mb-1 pr-16">
                      {lesson.type === 'Video' ? <PlayCircle className="w-4 h-4 mr-2 text-red-500" /> : <FileText className="w-4 h-4 mr-2 text-blue-500" />}
                      <span className="font-semibold">{lessonIdx + 1}. {lesson.title}</span>
                      <span className="ml-3 text-xs font-medium bg-gray-100 px-2 py-1 rounded text-gray-600">{lesson.type}</span>
                    </div>
                    {lesson.videoUrl && (
                      <a href={lesson.videoUrl} target="_blank" rel="noreferrer" className="text-sm text-blue-600 hover:underline truncate block max-w-lg mt-2">
                        {lesson.videoUrl}
                      </a>
                    )}
                  </div>
                  <form action={handleDeleteLesson} className="absolute right-4 top-4">
                    <input type="hidden" name="lessonId" defaultValue={lesson.id} />
                    <button type="submit" className="text-xs font-medium text-red-500 hover:text-red-700 opacity-0 group-hover:opacity-100 transition-opacity px-2 py-1 bg-red-50 hover:bg-red-100 rounded">
                      Remove
                    </button>
                  </form>
                </div>
              ))}

              <div className="bg-white border border-dashed border-gray-300 rounded-lg p-5 mt-4">
                <h4 className="text-sm font-semibold mb-3 flex items-center">
                  <PlayCircle className="w-4 h-4 mr-2 text-[#2D4569]" />
                  Add YouTube Video Lesson
                </h4>
                <form action={handleAddLesson} className="flex gap-3 items-end">
                  <input type="hidden" name="moduleId" defaultValue={mod.id} />
                  <input type="hidden" name="orderIndex" defaultValue={mod.lessons.length || 0} />
                  <div className="flex-1">
                    <label className="block text-xs font-medium text-gray-600 mb-1">Lesson Title</label>
                    <input name="title" required placeholder="e.g. Introduction" className="w-full text-sm px-3 py-2 border rounded-md" />
                  </div>
                  <div className="flex-1">
                    <label className="block text-xs font-medium text-gray-600 mb-1">YouTube URL</label>
                    <input name="videoUrl" required placeholder="https://youtu.be/..." className="w-full text-sm px-3 py-2 border rounded-md" />
                  </div>
                  <Button type="submit" size="sm">Add Lesson</Button>
                </form>
              </div>

            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 bg-white border border-dashed border-gray-300 rounded-xl p-6 text-center max-w-lg mx-auto">
        <h3 className="text-lg font-semibold mb-2 flex justify-center items-center">
          <Plus className="w-5 h-5 mr-2" />
          Add New Module
        </h3>
        <form action={handleAddModule} className="flex gap-3">
          <input type="hidden" name="courseId" defaultValue={resolvedParams.courseId} />
          <input type="hidden" name="orderIndex" defaultValue={course?.modules.length || 0} />
          <input name="title" required placeholder="Module Title" className="flex-1 px-3 py-2 border rounded-md" />
          <Button type="submit">Create Module</Button>
        </form>
      </div>

    </div>
  )
}
