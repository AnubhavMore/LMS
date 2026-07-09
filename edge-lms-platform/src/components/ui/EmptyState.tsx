import * as React from "react"
import { cn } from "@/lib/utils"
import { FolderOpen } from "lucide-react"

interface EmptyStateProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string
  description?: string
  icon?: React.ReactNode
  action?: React.ReactNode
}

export function EmptyState({ title, description, icon, action, className, ...props }: EmptyStateProps) {
  return (
    <div className={cn("flex flex-col items-center justify-center p-12 text-center border border-dashed border-gray-200 rounded-2xl bg-gray-50/50", className)} {...props}>
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 text-brand-neutral mb-4">
        {icon || <FolderOpen className="h-6 w-6" />}
      </div>
      <h3 className="text-sm font-medium text-brand-blue">{title}</h3>
      {description && <p className="mt-1 text-sm text-brand-neutral max-w-sm">{description}</p>}
      {action && <div className="mt-6">{action}</div>}
    </div>
  )
}
