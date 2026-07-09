import * as React from "react"
import { cn } from "@/lib/utils"

interface PageHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string
  description?: string
  action?: React.ReactNode
}

export function PageHeader({ title, description, action, className, ...props }: PageHeaderProps) {
  return (
    <div className={cn("flex flex-col md:flex-row md:items-center justify-between pb-6 mb-6 border-b border-gray-100 gap-4", className)} {...props}>
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-brand-blue">{title}</h1>
        {description && <p className="text-brand-neutral mt-1 text-sm">{description}</p>}
      </div>
      {action && (
        <div className="flex items-center gap-2">
          {action}
        </div>
      )}
    </div>
  )
}
