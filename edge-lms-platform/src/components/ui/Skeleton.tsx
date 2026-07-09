import * as React from "react"
import { cn } from "@/lib/utils"

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "text" | "circular" | "rectangular"
  width?: string | number
  height?: string | number
}

export function Skeleton({ variant = "text", width, height, className, style, ...props }: SkeletonProps) {
  const variantClasses = {
    text: "h-4 rounded",
    circular: "rounded-full",
    rectangular: "rounded-xl"
  }

  return (
    <div
      className={cn(
        "bg-gray-200 animate-pulse",
        variantClasses[variant],
        className
      )}
      style={{ width, height, ...style }}
      {...props}
    />
  )
}

export function SkeletonCard() {
  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-6 space-y-4">
      <Skeleton variant="rectangular" height={120} />
      <Skeleton width="70%" />
      <Skeleton width="90%" />
      <Skeleton width="40%" />
    </div>
  )
}

export function SkeletonStatCard() {
  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-6 space-y-3">
      <div className="flex items-center justify-between">
        <Skeleton width={100} />
        <Skeleton variant="circular" width={32} height={32} />
      </div>
      <Skeleton width={60} height={28} />
      <Skeleton width={120} />
    </div>
  )
}

export function SkeletonTable({ rows = 5, cols = 4 }: { rows?: number; cols?: number }) {
  return (
    <div className="rounded-xl border border-gray-100 overflow-hidden">
      <div className="bg-gray-50 px-4 py-3 flex gap-4">
        {Array.from({ length: cols }).map((_, i) => (
          <Skeleton key={i} width={`${100 / cols}%`} />
        ))}
      </div>
      {Array.from({ length: rows }).map((_, rowIdx) => (
        <div key={rowIdx} className="px-4 py-3 flex gap-4 border-t border-gray-50">
          {Array.from({ length: cols }).map((_, colIdx) => (
            <Skeleton key={colIdx} width={`${100 / cols}%`} />
          ))}
        </div>
      ))}
    </div>
  )
}
