"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

export interface FilterOption {
  label: string
  value: string
}

interface FilterChipsProps {
  options: FilterOption[]
  activeValue: string
  onChange: (value: string) => void
  className?: string
}

export function FilterChips({ options, activeValue, onChange, className }: FilterChipsProps) {
  return (
    <div className={cn("flex flex-wrap items-center gap-2", className)}>
      {options.map((option) => {
        const isActive = activeValue === option.value
        return (
          <button
            key={option.value}
            onClick={() => onChange(option.value)}
            className={cn(
              "px-3 py-1.5 rounded-full text-xs font-medium transition-colors border",
              isActive 
                ? "bg-brand-blue text-white border-brand-blue" 
                : "bg-white text-brand-dark-grey border-gray-200 hover:bg-gray-50"
            )}
          >
            {option.label}
          </button>
        )
      })}
    </div>
  )
}
