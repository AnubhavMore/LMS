"use client"

import React from "react"
import { useAuth } from "@/lib/auth/AuthContext"
import Link from "next/link"
import { BookOpen, Clock, ChevronRight, CheckCircle2, Loader2 } from "lucide-react"

interface CourseProgress {
  course: {
    id: string
    title: string
    description: string
    modules: { lessons: any[] }[]
  }
  enrollment: any
  progress: {
    total: number
    completed: number
    percentage: number
  }
}

export default function CoursesPage() {
  const { currentUser } = useAuth()
  const [coursesWithProgress, setCoursesWithProgress] = React.useState<CourseProgress[]>([])
  const [loading, setLoading] = React.useState(true)

  React.useEffect(() => {
    if (!currentUser?.id) return

    const fetchCourses = async () => {
      try {
        const res = await fetch(`/api/learner/courses?userId=${currentUser.id}`)
        if (res.ok) {
          const data = await res.json()
          setCoursesWithProgress(data)
        }
      } catch (err) {
        console.error("Failed to load courses:", err)
      } finally {
        setLoading(false)
      }
    }
    fetchCourses()
  }, [currentUser?.id])

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center text-brand-neutral">
        <Loader2 className="h-6 w-6 animate-spin mr-2" /> Loading your courses...
      </div>
    )
  }

  const activeCourses = coursesWithProgress.filter(c => c.progress.percentage < 100)
  const completedCourses = coursesWithProgress.filter(c => c.progress.percentage === 100)

  return (
    <div className="max-w-7xl mx-auto space-y-12">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-brand-dark-blue">Course Catalog</h1>
          <p className="text-brand-neutral mt-2">
            Explore your active learning programs and review completed courses.
          </p>
        </div>
      </div>

      {/* ACTIVE COURSES */}
      <div>
        <h2 className="text-xl font-bold text-brand-dark-blue mb-6 flex items-center gap-2">
          <BookOpen className="w-5 h-5" /> Active Courses
        </h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {activeCourses.map(({ course, progress }) => {
            const lessonCount = progress.total
            
            return (
              <div key={course.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow flex flex-col">
                <div className="h-40 bg-gradient-to-br from-brand-blue/10 to-brand-blue/5 flex items-center justify-center border-b border-gray-100 relative">
                  <BookOpen className="h-12 w-12 text-brand-blue/40" />
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <h3 className="text-lg font-semibold text-brand-dark-blue mb-2 line-clamp-1">
                    {course.title}
                  </h3>
                  <p className="text-sm text-brand-neutral line-clamp-2 mb-4 h-10">
                    {course.description || "No description provided."}
                  </p>

                  <div className="mb-6 mt-auto">
                    <div className="flex justify-between items-center text-xs text-brand-neutral mb-2 font-medium">
                      <div className="flex items-center gap-1.5">
                        <Clock className="h-4 w-4 text-brand-orange" />
                        <span>{lessonCount} Lessons</span>
                      </div>
                      <span className="font-bold text-brand-blue">{progress.percentage}%</span>
                    </div>
                    <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-brand-blue transition-all duration-500 ease-in-out" 
                        style={{ width: `${progress.percentage}%` }}
                      />
                    </div>
                  </div>

                  <Link
                    href={`/learner/course/${course.id}`}
                    className="w-full inline-flex items-center justify-center gap-2 px-4 py-2 bg-brand-blue text-white rounded-lg hover:bg-brand-blue/90 font-medium transition-colors"
                  >
                    {progress.percentage > 0 ? "Continue Course" : "Start Course"}
                    <ChevronRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            )
          })}

          {activeCourses.length === 0 && (
            <div className="col-span-full py-16 text-center text-brand-neutral bg-white rounded-xl border border-gray-100 border-dashed">
              <BookOpen className="h-12 w-12 mx-auto text-gray-300 mb-4" />
              <p className="text-lg font-medium text-brand-dark-blue">No Active Courses</p>
              <p className="text-sm">You are caught up on all your assigned learning!</p>
            </div>
          )}
        </div>
      </div>

      {/* COMPLETED COURSES */}
      {completedCourses.length > 0 && (
        <div>
          <h2 className="text-xl font-bold text-brand-dark-blue mb-6 flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-green-600" /> Completed Courses
          </h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {completedCourses.map(({ course, progress }) => {
              const lessonCount = progress.total
              
              return (
                <div key={course.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow flex flex-col opacity-80 hover:opacity-100">
                  <div className="h-32 bg-gradient-to-br from-green-50 to-emerald-50 flex items-center justify-center border-b border-green-100 relative">
                    <CheckCircle2 className="h-12 w-12 text-green-500/40" />
                    <div className="absolute top-4 right-4 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" /> 100%
                    </div>
                  </div>
                  <div className="p-6 flex-1 flex flex-col">
                    <h3 className="text-lg font-semibold text-brand-dark-blue mb-2 line-clamp-1">
                      {course.title}
                    </h3>
                    
                    <div className="flex items-center gap-4 text-xs text-brand-neutral mb-6 font-medium mt-auto">
                      <div className="flex items-center gap-1.5">
                        <Clock className="h-4 w-4 text-brand-orange" />
                        <span>{lessonCount} Lessons Completed</span>
                      </div>
                    </div>

                    <Link
                      href={`/learner/course/${course.id}`}
                      className="w-full inline-flex items-center justify-center gap-2 px-4 py-2 bg-white text-brand-blue border border-brand-blue/20 rounded-lg hover:bg-brand-blue/5 font-medium transition-colors"
                    >
                      Review Material
                    </Link>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}
