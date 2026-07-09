"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useAuth } from "@/lib/auth/AuthContext"
import { cn } from "@/lib/utils"
import { 
  LayoutDashboard, 
  BookOpen,
  Briefcase,
  Users,
  BarChart,
  FileText,
  Award,
  CalendarDays,
  Target,
  FolderDown,
  BellRing,
  Lightbulb,
  Settings,
  Shield
} from "lucide-react"

interface NavItem {
  label: string
  href: string
  icon: React.ElementType
}

const navConfig: Record<string, NavItem[]> = {
  Learner: [
    { label: "Courses", href: "/learner/courses", icon: BookOpen },
  ],
  Consultant: [],
  StrengthscapeAdmin: [
    { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { label: "Course Library", href: "/platform/courses", icon: FolderDown },
    { label: "Allot Course", href: "/platform/enrollments", icon: BookOpen },
    { label: "Program Instances", href: "/platform/program-instances", icon: Briefcase },
  ],
  SuperAdmin: [
    { label: "Courses", href: "/platform/courses", icon: BookOpen },
    { label: "Enrollments", href: "/platform/learners", icon: Users },
    { label: "Allotments", href: "/platform/program-instances", icon: LayoutDashboard },
  ],
  Finance: [],
  None: []
}

export function Sidebar() {
  const { currentUser } = useAuth()
  const pathname = usePathname()
  
  const role = currentUser?.role || "None"
  if (role === "None") return null

  const items = navConfig[role] || []
  const displayRole = role === "StrengthscapeAdmin" ? "Admin" : role

  return (
    <aside className="w-64 bg-brand-blue text-white flex flex-col h-full border-r border-brand-blue/90 shrink-0 hidden md:flex">
      <div className="h-16 flex items-center px-6 border-b border-white/10 font-bold text-lg tracking-tight">
        Edge<span className="text-brand-green font-normal">OS</span>
      </div>
      
      <nav className="flex-1 py-6 px-3 space-y-1 overflow-y-auto">
        <div className="text-xs font-semibold text-white/50 uppercase tracking-wider mb-4 px-3">
          {displayRole} Workspace
        </div>
        
        {items.slice(0, 7).map((item) => {
          const isActive = pathname.startsWith(item.href) && item.href !== "/" || pathname === item.href
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors group",
                isActive 
                  ? "bg-white/10 text-white" 
                  : "text-white/70 hover:bg-white/5 hover:text-white"
              )}
            >
              <item.icon className={cn("h-5 w-5", isActive ? "text-brand-green" : "text-white/50 group-hover:text-white/70")} />
              {item.label}
            </Link>
          )
        })}
      </nav>
      
      <div className="p-4 border-t border-white/10 text-xs text-white/40">
        &copy; Strengthscape
      </div>
    </aside>
  )
}
