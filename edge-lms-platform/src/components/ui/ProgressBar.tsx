import * as React from "react"
import { cn } from "@/lib/utils"

interface ProgressBarProps extends React.HTMLAttributes<HTMLDivElement> {
  value: number // 0 to 100
  showLabel?: boolean
}

export function ProgressBar({ value, showLabel = false, className, ...props }: ProgressBarProps) {
  const safeValue = Math.min(Math.max(value, 0), 100)
  
  return (
    <div className={cn("w-full flex items-center gap-3", className)} {...props}>
      <div className="relative w-full h-2 bg-gray-100 rounded-full overflow-hidden">
        <div 
          className="absolute top-0 left-0 h-full bg-brand-green transition-all duration-500 ease-in-out" 
          style={{ width: `${safeValue}%` }}
        />
      </div>
      {showLabel && (
        <span className="text-xs font-medium text-brand-dark-grey w-8 text-right">
          {Math.round(safeValue)}%
        </span>
      )}
    </div>
  )
}
