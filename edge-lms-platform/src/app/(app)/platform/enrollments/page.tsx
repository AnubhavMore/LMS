"use client"

import * as React from "react"
import { Users, CheckCircle2, Search, ChevronDown, X, BookOpen, Building2, AlertCircle, Loader2 } from "lucide-react"

interface CourseOption {
  id: string
  title: string
  description: string
  programTemplate?: { title: string } | null
}

interface CompanyOption {
  id: string
  name: string
  industry: string | null
  isInternal: boolean
}

export default function EnrollmentsPage() {
  // Data state
  const [courses, setCourses] = React.useState<CourseOption[]>([])
  const [companies, setCompanies] = React.useState<CompanyOption[]>([])
  const [loadingData, setLoadingData] = React.useState(true)

  // Form state
  const [selectedCourse, setSelectedCourse] = React.useState<CourseOption | null>(null)
  const [selectedCompany, setSelectedCompany] = React.useState<CompanyOption | null>(null)
  const [emails, setEmails] = React.useState("")
  const [status, setStatus] = React.useState<"idle" | "submitting" | "success" | "error">("idle")
  const [enrollResult, setEnrollResult] = React.useState<any>(null)
  const [errorMessage, setErrorMessage] = React.useState("")

  // Dropdown state
  const [courseSearch, setCourseSearch] = React.useState("")
  const [companySearch, setCompanySearch] = React.useState("")
  const [courseDropdownOpen, setCourseDropdownOpen] = React.useState(false)
  const [companyDropdownOpen, setCompanyDropdownOpen] = React.useState(false)

  // Refs for click-outside
  const courseDropdownRef = React.useRef<HTMLDivElement>(null)
  const companyDropdownRef = React.useRef<HTMLDivElement>(null)

  // Fetch courses and companies on mount
  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const [coursesRes, companiesRes] = await Promise.all([
          fetch("/api/courses"),
          fetch("/api/companies")
        ])
        if (coursesRes.ok) setCourses(await coursesRes.json())
        if (companiesRes.ok) setCompanies(await companiesRes.json())
      } catch (err) {
        console.error("Failed to load dropdown data:", err)
      } finally {
        setLoadingData(false)
      }
    }
    fetchData()
  }, [])

  // Click outside to close dropdowns
  React.useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (courseDropdownRef.current && !courseDropdownRef.current.contains(e.target as Node)) {
        setCourseDropdownOpen(false)
      }
      if (companyDropdownRef.current && !companyDropdownRef.current.contains(e.target as Node)) {
        setCompanyDropdownOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const filteredCourses = courses.filter(c =>
    c.title.toLowerCase().includes(courseSearch.toLowerCase()) ||
    (c.programTemplate?.title || "").toLowerCase().includes(courseSearch.toLowerCase())
  )

  const filteredCompanies = companies.filter(c =>
    c.name.toLowerCase().includes(companySearch.toLowerCase()) ||
    (c.industry || "").toLowerCase().includes(companySearch.toLowerCase())
  )

  const handleEnroll = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrorMessage("")

    if (!selectedCourse) {
      setErrorMessage("Please select a course.")
      return
    }
    if (!emails.trim()) {
      setErrorMessage("Please enter at least one email address.")
      return
    }

    setStatus("submitting")

    try {
      const res = await fetch("/api/enroll", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          companyId: selectedCompany?.id || "",
          courseId: selectedCourse.id,
          emails,
        })
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || "Failed to enroll")
      }

      setEnrollResult(data)
      setStatus("success")
      setTimeout(() => {
        setStatus("idle")
        setEmails("")
        setSelectedCourse(null)
        setSelectedCompany(null)
        setCourseSearch("")
        setCompanySearch("")
        setEnrollResult(null)
      }, 5000)
    } catch (err: any) {
      setErrorMessage(err.message || "Something went wrong")
      setStatus("error")
      setTimeout(() => setStatus("idle"), 4000)
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-gray-900">Allot Course</h1>
        <p className="text-gray-500 mt-1">Assign courses to learners by entering their email addresses.</p>
      </div>

      <form onSubmit={handleEnroll} className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-200 bg-gray-50/50">
          <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
            <Users className="h-5 w-5 text-brand-maroon" />
            New Course Allotment
          </h2>
        </div>

        <div className="p-6 space-y-6">
          {/* Course Selection - Required */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 flex items-center gap-1">
              <BookOpen className="h-4 w-4 text-gray-400" />
              Select Course <span className="text-red-500">*</span>
            </label>
            <div ref={courseDropdownRef} className="relative">
              <button
                type="button"
                onClick={() => { setCourseDropdownOpen(!courseDropdownOpen); setCompanyDropdownOpen(false) }}
                className="w-full h-11 px-3 py-2 rounded-lg border border-gray-300 bg-white text-sm text-left focus:outline-none focus:ring-2 focus:ring-brand-maroon focus:border-transparent flex items-center justify-between transition-all hover:border-gray-400"
              >
                <span className={selectedCourse ? "text-gray-900 font-medium" : "text-gray-400"}>
                  {selectedCourse ? selectedCourse.title : "Search and select a course..."}
                </span>
                <div className="flex items-center gap-1">
                  {selectedCourse && (
                    <span
                      onClick={(e) => { e.stopPropagation(); setSelectedCourse(null); setCourseSearch("") }}
                      className="p-0.5 rounded hover:bg-gray-100 text-gray-400 hover:text-gray-600 cursor-pointer"
                    >
                      <X className="h-3.5 w-3.5" />
                    </span>
                  )}
                  <ChevronDown className={`h-4 w-4 text-gray-400 transition-transform ${courseDropdownOpen ? "rotate-180" : ""}`} />
                </div>
              </button>

              {courseDropdownOpen && (
                <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-72 overflow-hidden">
                  <div className="p-2 border-b border-gray-100 sticky top-0 bg-white">
                    <div className="relative">
                      <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Search courses..."
                        value={courseSearch}
                        onChange={(e) => setCourseSearch(e.target.value)}
                        className="w-full pl-8 pr-3 py-2 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-brand-maroon"
                        autoFocus
                      />
                    </div>
                  </div>
                  <div className="overflow-y-auto max-h-56">
                    {loadingData ? (
                      <div className="p-4 text-center text-sm text-gray-400 flex items-center justify-center gap-2">
                        <Loader2 className="h-4 w-4 animate-spin" /> Loading courses...
                      </div>
                    ) : filteredCourses.length === 0 ? (
                      <div className="p-4 text-center text-sm text-gray-400">No courses found</div>
                    ) : (
                      filteredCourses.map((course) => (
                        <button
                          key={course.id}
                          type="button"
                          onClick={() => {
                            setSelectedCourse(course)
                            setCourseDropdownOpen(false)
                            setCourseSearch("")
                          }}
                          className={`w-full text-left px-3 py-2.5 text-sm hover:bg-brand-maroon/5 transition-colors border-b border-gray-50 last:border-0 ${
                            selectedCourse?.id === course.id ? "bg-brand-maroon/10 font-medium" : ""
                          }`}
                        >
                          <div className="font-medium text-gray-900">{course.title}</div>
                          {course.programTemplate?.title && (
                            <div className="text-xs text-gray-500 mt-0.5">Program: {course.programTemplate.title}</div>
                          )}
                        </button>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Company Selection - Optional */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 flex items-center gap-1">
              <Building2 className="h-4 w-4 text-gray-400" />
              Company <span className="text-xs text-gray-400 font-normal ml-1">(Optional)</span>
            </label>
            <div ref={companyDropdownRef} className="relative">
              <button
                type="button"
                onClick={() => { setCompanyDropdownOpen(!companyDropdownOpen); setCourseDropdownOpen(false) }}
                className="w-full h-11 px-3 py-2 rounded-lg border border-gray-300 bg-white text-sm text-left focus:outline-none focus:ring-2 focus:ring-brand-maroon focus:border-transparent flex items-center justify-between transition-all hover:border-gray-400"
              >
                <span className={selectedCompany ? "text-gray-900 font-medium" : "text-gray-400"}>
                  {selectedCompany ? selectedCompany.name : "Select a company (optional)..."}
                </span>
                <div className="flex items-center gap-1">
                  {selectedCompany && (
                    <span
                      onClick={(e) => { e.stopPropagation(); setSelectedCompany(null); setCompanySearch("") }}
                      className="p-0.5 rounded hover:bg-gray-100 text-gray-400 hover:text-gray-600 cursor-pointer"
                    >
                      <X className="h-3.5 w-3.5" />
                    </span>
                  )}
                  <ChevronDown className={`h-4 w-4 text-gray-400 transition-transform ${companyDropdownOpen ? "rotate-180" : ""}`} />
                </div>
              </button>

              {companyDropdownOpen && (
                <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-72 overflow-hidden">
                  <div className="p-2 border-b border-gray-100 sticky top-0 bg-white">
                    <div className="relative">
                      <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Search companies..."
                        value={companySearch}
                        onChange={(e) => setCompanySearch(e.target.value)}
                        className="w-full pl-8 pr-3 py-2 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-brand-maroon"
                        autoFocus
                      />
                    </div>
                  </div>
                  <div className="overflow-y-auto max-h-56">
                    {loadingData ? (
                      <div className="p-4 text-center text-sm text-gray-400 flex items-center justify-center gap-2">
                        <Loader2 className="h-4 w-4 animate-spin" /> Loading companies...
                      </div>
                    ) : filteredCompanies.length === 0 ? (
                      <div className="p-4 text-center text-sm text-gray-400">No companies found</div>
                    ) : (
                      filteredCompanies.map((company) => (
                        <button
                          key={company.id}
                          type="button"
                          onClick={() => {
                            setSelectedCompany(company)
                            setCompanyDropdownOpen(false)
                            setCompanySearch("")
                          }}
                          className={`w-full text-left px-3 py-2.5 text-sm hover:bg-brand-maroon/5 transition-colors border-b border-gray-50 last:border-0 ${
                            selectedCompany?.id === company.id ? "bg-brand-maroon/10 font-medium" : ""
                          }`}
                        >
                          <div className="font-medium text-gray-900">{company.name}</div>
                          {company.industry && (
                            <div className="text-xs text-gray-500 mt-0.5">{company.industry}</div>
                          )}
                        </button>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Email Input - Required */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 flex justify-between">
              <span>Learner Email Addresses <span className="text-red-500">*</span></span>
              <span className="text-xs text-gray-400 font-normal">Comma-separated for multiple</span>
            </label>
            <textarea
              required
              value={emails}
              onChange={(e) => setEmails(e.target.value)}
              placeholder="e.g. john.doe@company.com, jane.smith@company.com"
              className="w-full h-28 px-3 py-2.5 rounded-lg border border-gray-300 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-brand-maroon focus:border-transparent resize-none transition-all hover:border-gray-400"
            />
            {emails.trim() && (
              <p className="text-xs text-gray-500">
                {emails.split(",").filter(e => e.trim().length > 0).length} email(s) entered
              </p>
            )}
          </div>

          {/* Email Notification - Disabled Notice */}
          <div className="flex items-start gap-3 p-4 bg-gray-50 text-gray-500 rounded-lg border border-gray-200 opacity-60">
            <AlertCircle className="h-5 w-5 text-gray-400 mt-0.5 shrink-0" />
            <div className="flex-1 space-y-1">
              <p className="text-sm font-medium text-gray-500">Email Notification</p>
              <p className="text-sm text-gray-400">Email notifications are currently disabled. Learners will not receive an email upon enrollment.</p>
            </div>
          </div>

          {/* Error Message */}
          {errorMessage && (
            <div className="p-3 bg-red-50 text-red-700 border border-red-200 rounded-lg flex items-center gap-2 text-sm">
              <AlertCircle className="h-4 w-4 shrink-0" />
              {errorMessage}
            </div>
          )}
        </div>

        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex justify-end">
          <button
            type="submit"
            disabled={status === "submitting" || status === "success"}
            className="inline-flex items-center justify-center rounded-lg text-sm font-medium bg-brand-maroon text-white hover:bg-brand-maroon/90 h-11 px-8 py-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-sm"
          >
            {status === "submitting" ? (
              <span className="flex items-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin" /> Allotting...
              </span>
            ) : status === "success" ? (
              <span className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4" /> Allotted Successfully
              </span>
            ) : (
              "Allot Course"
            )}
          </button>
        </div>
      </form>

      {/* Success banner */}
      {status === "success" && enrollResult && (
        <div className="p-4 bg-green-50 text-green-900 border border-green-200 rounded-lg space-y-3">
          <div className="flex items-start gap-3">
            <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 shrink-0" />
            <div>
              <h4 className="text-sm font-semibold">Allotment Complete</h4>
              <p className="text-sm text-green-800 mt-1">
                {enrollResult.enrolledCount} learner(s) enrolled out of {enrollResult.totalProcessed} processed.
              </p>
            </div>
          </div>
          {enrollResult.results && enrollResult.results.length > 0 && (
            <div className="ml-8 space-y-1">
              {enrollResult.results.map((r: any, i: number) => (
                <div key={i} className="flex items-center gap-2 text-xs">
                  <span className={`w-2 h-2 rounded-full ${
                    r.status === "enrolled" ? "bg-green-500" :
                    r.status === "already_enrolled" ? "bg-yellow-500" : "bg-red-500"
                  }`} />
                  <span className="text-green-800 font-mono">{r.email}</span>
                  <span className="text-green-600">
                    {r.status === "enrolled" ? "✓ Enrolled" :
                     r.status === "already_enrolled" ? "Already enrolled" : "Error"}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
