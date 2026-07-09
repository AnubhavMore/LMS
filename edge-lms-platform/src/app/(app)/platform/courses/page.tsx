import { getCourses, createCourse, deleteCourse } from "@/lib/courses"
import { Button } from "@/components/ui/Button"
import Link from "next/link"
import { redirect } from "next/navigation"
import { Plus, BookOpen, Edit, Trash2 } from "lucide-react"

export default async function CoursesPage() {
  const courses = await getCourses()

  async function handleCreateCourse(formData: FormData) {
    "use server"
    const title = formData.get("title") as string
    const desc = formData.get("description") as string
    
    if (title) {
      const course = await createCourse({ title, description: desc || "" })
      redirect(`/platform/courses/${course.id}/builder`)
    }
  }

  return (
    <div className="max-w-5xl mx-auto p-6">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Course Library</h1>
          <p className="text-gray-500 mt-2">Manage your LMS courses and modules</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="md:col-span-1 bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <Plus className="w-5 h-5 mr-2 text-[#2D4569]" />
            New Course
          </h2>
          <form action={handleCreateCourse} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Course Title</label>
              <input 
                name="title" 
                required 
                placeholder="e.g. Leadership 101" 
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea 
                name="description" 
                rows={3} 
                className="w-full px-3 py-2 border rounded-md"
                placeholder="A short summary of this course..."
              ></textarea>
            </div>
            <Button type="submit" className="w-full">Create Course</Button>
          </form>
        </div>

        <div className="md:col-span-2 space-y-4">
          <h2 className="text-xl font-semibold mb-4">Existing Courses</h2>
          {courses.map(course => (
            <div key={course.id} className="bg-white p-4 rounded-xl border border-gray-200 flex items-center justify-between hover:shadow-md transition">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center mr-4">
                  <BookOpen className="w-6 h-6 text-[#2D4569]" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">{course.title}</h3>
                  <p className="text-gray-500 text-sm">{course.modules.length} Modules</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Link href={`/platform/courses/${course.id}/builder`}>
                  <Button variant="outline" size="sm">
                    <Edit className="w-4 h-4 mr-2" />
                    Builder
                  </Button>
                </Link>
                <form action={async () => {
                  "use server"
                  await deleteCourse(course.id)
                }}>
                  <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700 hover:bg-red-50 border-red-200">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </form>
              </div>
            </div>
          ))}

          {courses.length === 0 && (
            <div className="text-center py-12 bg-gray-50 rounded-xl border border-dashed border-gray-300">
              <BookOpen className="w-12 h-12 text-gray-400 mx-auto mb-3" />
              <p className="text-gray-500">No courses created yet.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
