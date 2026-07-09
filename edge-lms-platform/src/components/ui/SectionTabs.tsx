"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

export interface TabOption {
  label: string
  value: string
}

interface SectionTabsProps {
  tabs: TabOption[]
  activeTab: string
  onChange: (value: string) => void
  className?: string
}

export function SectionTabs({ tabs, activeTab, onChange, className }: SectionTabsProps) {
  return (
    <div className={cn("flex items-center gap-6 border-b border-gray-200", className)}>
      {tabs.map((tab) => {
        const isActive = activeTab === tab.value
        return (
          <button
            key={tab.value}
            onClick={() => onChange(tab.value)}
            className={cn(
              "pb-3 text-sm font-medium transition-colors border-b-2 relative -mb-[1px]",
              isActive
                ? "border-brand-maroon text-brand-maroon"
                : "border-transparent text-brand-neutral hover:text-brand-dark-grey hover:border-gray-300"
            )}
          >
            {tab.label}
          </button>
        )
      })}
    </div>
  )
}
