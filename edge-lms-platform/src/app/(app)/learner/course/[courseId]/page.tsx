"use client"

/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from "react"
import { useParams } from "next/navigation"
import { useAuth } from "@/lib/auth/AuthContext"
import { getCoursePlayer, markLessonComplete } from "@/lib/api"
import { QuizPlayer } from "@/components/learner/QuizPlayer"
import { CopilotChat } from "@/components/learner/CopilotChat"
import { PageHeader } from "@/components/ui/PageHeader"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"
import { StatusBadge } from "@/components/ui/StatusBadge"
import { ProgressBar } from "@/components/ui/ProgressBar"
import { SkeletonCard } from "@/components/ui/Skeleton"
import { cn } from "@/lib/utils"
import { CheckCircle, Circle, PlayCircle, FileText, HelpCircle, MessageSquare, Download, Clock, Lightbulb, ChevronDown, Video, BookOpen } from "lucide-react"
import YouTube from "react-youtube"

const lessonIcons: Record<string, React.ElementType> = {
  Video: Video, Text: BookOpen, Quiz: HelpCircle, Reflection: MessageSquare,
  Resource: Download, LiveSessionPrep: PlayCircle, Assignment: FileText
}

export default function CoursePlayerPage() {
  const params = useParams()
  const courseId = params.courseId as string
  const { currentUser } = useAuth()
  const [data, setData] = React.useState<any>(null)
  const [activeLesson, setActiveLesson] = React.useState<any>(null)
  const [sidebarOpen, setSidebarOpen] = React.useState(false)
  const [completing, setCompleting] = React.useState(false)

  const loadData = React.useCallback(async () => {
    if (currentUser && courseId) {
      const result = await getCoursePlayer(courseId, currentUser.id)
      setData(result)
      if (result && !activeLesson) {
        // Auto-select first incomplete lesson
        for (const mod of result.modules) {
          const incomplete = mod.lessons.find((l: any) => !l.completed)
          if (incomplete) { setActiveLesson(incomplete); break }
        }
        if (!activeLesson && result.modules[0]?.lessons[0]) {
          setActiveLesson(result.modules[0].lessons[0])
        }
      }
    }
  }, [currentUser, courseId, activeLesson])

  // eslint-disable-next-line react-hooks/set-state-in-effect
  React.useEffect(() => { loadData() }, [loadData])

  const handleMarkComplete = async () => {
    if (!currentUser || !activeLesson) return
    setCompleting(true)
    await markLessonComplete(currentUser.id, activeLesson.id)
    const result = await getCoursePlayer(courseId, currentUser.id)
    setData(result)
    // Find updated lesson
    for (const mod of result!.modules) {
      const updated = mod.lessons.find((l: any) => l.id === activeLesson.id)
      if (updated) { setActiveLesson(updated); break }
    }
    setCompleting(false)
  }

  if (!data) {
    return <div className="space-y-6"><PageHeader title="Loading course..." /><SkeletonCard /><SkeletonCard /></div>
  }



  return (
    <div className="flex flex-col lg:flex-row gap-6 animate-in fade-in duration-500 -mx-4 md:-mx-8 -mt-4 md:-mt-8">
      {/* Mobile toggle */}
      <button onClick={() => setSidebarOpen(!sidebarOpen)} className="lg:hidden flex items-center gap-2 px-6 py-3 bg-white border-b text-sm font-medium text-brand-blue">
        <ChevronDown className={cn("h-4 w-4 transition-transform", sidebarOpen && "rotate-180")} /> Modules & Lessons
      </button>

      {/* Left: Module/Lesson Navigation */}
      <aside className={cn(
        "w-full lg:w-72 xl:w-80 bg-white border-r border-gray-100 lg:min-h-screen overflow-y-auto shrink-0",
        sidebarOpen ? "block" : "hidden lg:block"
      )}>
        <div className="p-4 border-b border-gray-100">
          <h2 className="font-bold text-brand-blue text-sm">{data.course.title}</h2>
          <div className="flex items-center gap-2 mt-2">
            <ProgressBar value={data.progress.percentage} className="flex-1" />
            <span className="text-xs font-medium text-brand-neutral">{data.progress.percentage}%</span>
          </div>
        </div>
        {data.modules.map((mod: any) => (
          <div key={mod.id} className="border-b border-gray-50">
            <div className="px-4 py-3 text-xs font-semibold text-brand-neutral uppercase tracking-wider bg-gray-50">
              {mod.title}
            </div>
            {mod.lessons.map((lesson: any) => {
              const Icon = lessonIcons[lesson.type] || FileText
              const isActive = activeLesson?.id === lesson.id
              return (
                <button
                  key={lesson.id}
                  onClick={() => { setActiveLesson(lesson); setSidebarOpen(false) }}
                  className={cn(
                    "w-full flex items-center gap-3 px-4 py-3 text-left text-sm transition-colors",
                    isActive ? "bg-brand-blue/5 text-brand-blue font-medium" : "hover:bg-gray-50 text-brand-dark-grey"
                  )}
                >
                  {lesson.completed
                    ? <CheckCircle className="h-4 w-4 text-brand-green shrink-0" />
                    : <Circle className="h-4 w-4 text-gray-300 shrink-0" />}
                  <Icon className="h-4 w-4 shrink-0 text-brand-neutral" />
                  <span className="truncate">{lesson.title}</span>
                </button>
              )
            })}
          </div>
        ))}
      </aside>

      {/* Center: Content Area */}
      <main className="flex-1 min-w-0 p-4 md:p-8">
        {activeLesson ? (
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-3 mb-2 flex-wrap">
                <StatusBadge status={activeLesson.completed ? "Completed" : "In Progress"} />
                <span className="text-xs text-brand-neutral flex items-center gap-1">
                  <Clock className="h-3 w-3" /> {activeLesson.estimatedMinutes || 10} min
                </span>
                <span className="text-xs text-brand-neutral capitalize px-2 py-0.5 bg-gray-100 rounded">{activeLesson.type}</span>
              </div>
              <h1 className="text-2xl font-bold text-brand-blue">{activeLesson.title}</h1>
            </div>

            {/* Video Player */}
            {activeLesson.type === "Video" && (
              <div className="aspect-video bg-black rounded-lg overflow-hidden relative mb-8 shadow-sm w-full">
                {activeLesson.videoUrl ? (
                  <div className="absolute inset-0 w-full h-full">
                    {activeLesson.videoUrl.includes("youtube.com") || activeLesson.videoUrl.includes("youtu.be") ? (
                      <YouTube
                        videoId={(() => {
                          const match = activeLesson.videoUrl.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([^&?]+)/);
                          return match ? match[1] : "";
                        })()}
                        className="w-full h-full absolute inset-0"
                        iframeClassName="w-full h-full"
                        opts={{
                          width: '100%',
                          height: '100%',
                          playerVars: {
                            rel: 0,
                            modestbranding: 1
                          }
                        }}
                        onEnd={() => {
                          if (!activeLesson.completed) {
                            handleMarkComplete();
                          }
                        }}
                      />
                    ) : (
                      <video 
                        className="w-full h-full object-cover"
                        controls
                        src={activeLesson.videoUrl}
                        onEnded={() => {
                          if (!activeLesson.completed) {
                            handleMarkComplete();
                          }
                        }}
                      />
                    )}
                  </div>
                ) : (
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-center z-10">
                    <PlayCircle className="h-16 w-16 text-white/80 mx-auto mb-2" />
                    <p className="text-white/60 text-sm">Video content will be available here</p>
                  </div>
                )}
              </div>
            )}

            {/* Content */}
            {activeLesson.contentMarkdown && (
              <Card>
                <CardContent className="py-6">
                  <div className="prose prose-sm max-w-none text-brand-dark-grey leading-relaxed whitespace-pre-line">
                    {activeLesson.contentMarkdown}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Resources */}
            {activeLesson.resources?.length > 0 && (
              <Card>
                <CardHeader><CardTitle className="text-base">Downloadable Resources</CardTitle></CardHeader>
                <CardContent className="space-y-2">
                  {activeLesson.resources.map((r: any) => (
                    <a key={r.id} href={r.fileUrl} className="flex items-center gap-3 p-3 rounded-lg border border-gray-100 hover:bg-gray-50 transition-colors">
                      <Download className="h-4 w-4 text-brand-maroon shrink-0" />
                      <span className="text-sm font-medium text-brand-dark-grey">{r.title}</span>
                      <span className="text-xs text-brand-neutral ml-auto">{r.type}</span>
                    </a>
                  ))}
                </CardContent>
              </Card>
            )}

            {/* Reflection prompt */}
            {activeLesson.type === "Reflection" && !activeLesson.completed && (
              <Card className="border-violet-200 bg-violet-50/30">
                <CardHeader><CardTitle className="text-base text-violet-700">Your Reflection</CardTitle></CardHeader>
                <CardContent>
                  <textarea className="w-full border border-violet-200 rounded-lg p-3 text-sm min-h-[120px] focus:ring-1 focus:ring-violet-400 outline-none" placeholder="Write your reflection here..." />
                </CardContent>
              </Card>
            )}

            {/* Quiz */}
            {activeLesson.type === "Quiz" && (
              <QuizPlayer
                lessonId={activeLesson.id}
                userId={currentUser!.id}
                onComplete={() => {
                  loadData()
                }}
              />
            )}
          </div>
        ) : (
          <div className="text-center py-12 text-brand-neutral">Select a lesson to begin.</div>
        )}
      </main>

      {/* Right: Progress & Actions */}
      <aside className="w-full lg:w-72 xl:w-80 shrink-0 space-y-4 p-4 md:p-0 lg:pr-8 lg:pt-8">
        {/* Progress Ring */}
        <Card>
          <CardContent className="py-6 text-center">
            <div className="relative inline-flex items-center justify-center w-24 h-24 mb-3">
              <svg className="w-24 h-24 -rotate-90" viewBox="0 0 36 36">
                <path d="M18 2.0845a 15.9155 15.9155 0 0 1 0 31.831a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#e5e7eb" strokeWidth="3" />
                <path d="M18 2.0845a 15.9155 15.9155 0 0 1 0 31.831a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#4FBC85" strokeWidth="3" strokeDasharray={`${data.progress.percentage}, 100`} strokeLinecap="round" />
              </svg>
              <span className="absolute text-xl font-bold text-brand-blue">{data.progress.percentage}%</span>
            </div>
            <p className="text-sm text-brand-neutral">{data.progress.completed} of {data.progress.total} lessons</p>
          </CardContent>
        </Card>

        {/* Key Takeaway */}
        {activeLesson?.keyTakeaway && (
          <Card className="bg-amber-50/50 border-amber-200">
            <CardHeader>
              <div className="flex items-center gap-2 text-amber-600">
                <Lightbulb className="h-4 w-4" />
                <CardTitle className="text-sm">Key Takeaway</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-amber-900 leading-relaxed">{activeLesson.keyTakeaway}</p>
            </CardContent>
          </Card>
        )}

        {/* Mark Complete */}
        {activeLesson && (
          <Button
            onClick={handleMarkComplete}
            disabled={
              activeLesson.completed || 
              completing || 
              (activeLesson.type === 'Video' && !activeLesson.completed) ||
              (activeLesson.type === 'Quiz' && !activeLesson.quizPassed)
            }
            className="w-full"
            variant={activeLesson.completed ? "outline" : "primary"}
          >
            {activeLesson.completed ? "✓ Completed" : 
             completing ? "Saving..." : 
             activeLesson.type === 'Video' ? "Finish video to complete" : 
             activeLesson.type === 'Quiz' ? "Pass quiz to complete" : "Mark as Complete"}
          </Button>
        )}
      </aside>
      
      {/* Learner Copilot Widget */}
      {data?.course && activeLesson && currentUser && (
        <CopilotChat 
          userId={currentUser.id} 
          courseId={courseId as string} 
          courseTitle={data.course.title} 
          activeLesson={activeLesson} 
          modules={data.modules}
        />
      )}
    </div>
  )
}
