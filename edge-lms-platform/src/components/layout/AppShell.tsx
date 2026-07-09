"use client"

import * as React from "react"
import { Sidebar } from "./Sidebar"
import { TopBar } from "./TopBar"
import { Breadcrumb } from "@/components/ui/Breadcrumb"

interface AppShellProps {
  children: React.ReactNode
}

export function AppShell({ children }: AppShellProps) {
  return (
    <div className="flex h-screen w-full bg-brand-warm overflow-hidden text-brand-dark-grey">
      <Sidebar />
      <div className="flex flex-col flex-1 min-w-0">
        <TopBar />
        <main className="flex-1 overflow-y-auto p-4 md:p-8">
          <div className="max-w-7xl mx-auto w-full">
            <Breadcrumb className="mb-4" />
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}
