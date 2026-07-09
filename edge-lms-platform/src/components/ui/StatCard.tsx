import * as React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "./Card"
import { cn } from "@/lib/utils"

interface StatCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string
  value: string | number
  description?: string
  icon?: React.ReactNode
}

export function StatCard({ title, value, description, icon, className, ...props }: StatCardProps) {
  return (
    <Card className={cn("overflow-hidden", className)} {...props}>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-brand-neutral">
          {title}
        </CardTitle>
        {icon && <div className="text-brand-neutral/70">{icon}</div>}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-brand-blue">{value}</div>
        {description && (
          <p className="text-xs text-brand-neutral mt-1">
            {description}
          </p>
        )}
      </CardContent>
    </Card>
  )
}
