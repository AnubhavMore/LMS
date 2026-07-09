import * as React from "react"
import { cn } from "@/lib/utils"
import { AlertCircle, CheckCircle2, Info, AlertTriangle } from "lucide-react"

interface AlertBannerProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string
  description: string
  variant?: "info" | "warning" | "success" | "error"
}

export function AlertBanner({ title, description, variant = "info", className, ...props }: AlertBannerProps) {
  const Icon = {
    info: Info,
    warning: AlertTriangle,
    success: CheckCircle2,
    error: AlertCircle,
  }[variant]

  const styles = {
    info: "bg-blue-50 border-blue-200 text-brand-blue",
    warning: "bg-yellow-50 border-brand-yellow/30 text-yellow-800",
    success: "bg-green-50 border-brand-green/30 text-green-800",
    error: "bg-red-50 border-red-200 text-brand-maroon",
  }[variant]

  const iconStyles = {
    info: "text-blue-500",
    warning: "text-brand-yellow",
    success: "text-brand-green",
    error: "text-brand-maroon",
  }[variant]

  return (
    <div className={cn("flex gap-3 p-4 border rounded-xl", styles, className)} {...props}>
      <Icon className={cn("h-5 w-5 shrink-0 mt-0.5", iconStyles)} />
      <div>
        {title && <h4 className="text-sm font-semibold mb-1">{title}</h4>}
        <p className="text-sm opacity-90">{description}</p>
      </div>
    </div>
  )
}
