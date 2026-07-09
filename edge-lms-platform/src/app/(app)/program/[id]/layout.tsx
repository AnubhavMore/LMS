"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname, useParams } from "next/navigation"
import { LayoutDashboard, FileText, Users, CalendarDays, ArrowLeft } from "lucide-react"

export default function ProgramWorkspaceLayout({
  children
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const params = useParams()
  const id = params.id as string
  
  const navItems = [
    { label: "Overview", href: `/program/${id}/overview`, icon: LayoutDashboard },
    { label: "Delivery Handoff", href: `/program/${id}/delivery-handoff`, icon: FileText },
    { label: "Cohorts", href: `/program/${id}/cohorts`, icon: Users },
    { label: "Sessions", href: `/program/${id}/sessions`, icon: CalendarDays },
  ]

  return (
    <div className="flex flex-col h-full animate-in fade-in duration-500">
      <div className="flex items-center gap-2 text-sm text-brand-neutral mb-4 px-2">
        <Link href="/platform/program-instances" className="flex items-center gap-1 hover:text-brand-blue">
          <ArrowLeft className="h-4 w-4" /> Back to Programs
        </Link>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 h-full">
        {/* Workspace Sidebar */}
        <div className="w-full lg:w-64 shrink-0 flex flex-col gap-2">
          <div className="bg-white rounded-xl border border-gray-100 p-3 shadow-sm h-full">
            <h3 className="text-xs font-bold text-brand-neutral uppercase tracking-wider mb-3 px-3 pt-2">Program Workspace</h3>
            <nav className="space-y-1">
              {navItems.map((item) => {
                const isActive = pathname.startsWith(item.href)
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
                      isActive 
                        ? "bg-brand-blue/10 text-brand-blue font-medium" 
                        : "text-brand-dark-grey hover:bg-gray-50"
                    }`}
                  >
                    <item.icon className="h-4 w-4" />
                    {item.label}
                  </Link>
                )
              })}
            </nav>
          </div>
        </div>

        {/* Workspace Content */}
        <div className="flex-1 min-w-0">
          {children}
        </div>
      </div>
    </div>
  )
}
