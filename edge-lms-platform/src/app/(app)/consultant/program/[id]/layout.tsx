"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname, useParams } from "next/navigation"
import { LayoutDashboard, Users, CalendarDays, FileText, ArrowLeft, Rocket } from "lucide-react"

export default function ConsultantProgramLayout({
  children
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const params = useParams()
  const id = params.id as string
  
  const navItems = [
    { label: "Program Brief", href: `/consultant/program/${id}/overview`, icon: LayoutDashboard },
    { label: "Cohort Readiness", href: `/consultant/program/${id}/cohort-readiness`, icon: Users },
    { label: "Sessions", href: `/consultant/program/${id}/sessions`, icon: CalendarDays },
    { label: "Report Builder", href: `/consultant/program/${id}/report-builder`, icon: FileText },
    { label: "Expansion Signal", href: `/consultant/program/${id}/expansion-signal`, icon: Rocket },
  ]

  return (
    <div className="flex h-[calc(100vh-4rem)]">
      {/* Workspace Sidebar */}
      <div className="w-64 bg-gray-50 dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 flex flex-col hidden md:flex">
        <div className="p-4">
          <Link href="/consultant/programs" className="flex items-center text-sm font-medium text-gray-500 hover:text-gray-900 dark:hover:text-gray-100 mb-6">
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Programs
          </Link>
          <h2 className="text-sm font-bold uppercase tracking-wider text-gray-400 mb-4">Consultant Ops</h2>
        </div>
        <nav className="flex-1 px-3 space-y-1">
          {navItems.map((item) => {
            const isActive = pathname.startsWith(item.href)
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                  isActive 
                    ? "bg-brand-blue/10 text-brand-blue" 
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                }`}
              >
                <item.icon className={`mr-3 h-5 w-5 ${isActive ? "text-brand-blue" : "text-gray-400"}`} />
                {item.label}
              </Link>
            )
          })}
        </nav>
      </div>

      {/* Main Workspace Content */}
      <div className="flex-1 overflow-y-auto bg-white dark:bg-gray-950 p-6 md:p-8">
        {children}
      </div>
    </div>
  )
}
