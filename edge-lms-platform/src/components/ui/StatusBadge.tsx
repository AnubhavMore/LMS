import * as React from "react"
import { cn } from "@/lib/utils"

export type BadgeStatus =
  | "Not Started"
  | "Invited"
  | "Active"
  | "In Progress"
  | "Overdue"
  | "Completed"
  | "Certificate Issued"
  | "Needs Review"
  | "Failed"
  | "Suspended"
  | "Eligible"
  | "Issued"
  | "Delivered"
  | "Expiring Soon"
  | "Expired"
  | "Revoked"
  | "Reissued"
  | "Pending"
  | "Ineligible"
  | "Draft"
  | "Reviewed"
  | "Stuck"

interface StatusBadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  status: BadgeStatus
}

export function StatusBadge({ status, className, ...props }: StatusBadgeProps) {
  const statusStyles: Record<BadgeStatus, string> = {
    "Not Started": "bg-gray-100 text-brand-neutral border-gray-200",
    "Invited": "bg-blue-50 text-blue-600 border-blue-200",
    "Active": "bg-green-50 text-brand-green border-green-200",
    "In Progress": "bg-blue-50 text-brand-blue border-blue-200",
    "Overdue": "bg-red-50 text-brand-maroon border-red-200",
    "Completed": "bg-green-50 text-brand-green border-green-200",
    "Certificate Issued": "bg-yellow-50 text-brand-yellow border-yellow-200",
    "Needs Review": "bg-orange-50 text-orange-600 border-orange-200",
    "Failed": "bg-red-50 text-brand-maroon border-red-200",
    "Suspended": "bg-gray-100 text-gray-500 border-gray-200",
    "Eligible": "bg-blue-50 text-blue-700 border-blue-200",
    "Issued": "bg-green-50 text-green-700 border-green-200",
    "Delivered": "bg-green-100 text-green-800 border-green-300",
    "Expiring Soon": "bg-orange-50 text-orange-700 border-orange-200",
    "Expired": "bg-gray-100 text-gray-500 border-gray-200",
    "Revoked": "bg-red-100 text-red-700 border-red-200",
    "Reissued": "bg-purple-50 text-purple-700 border-purple-200",
    "Pending": "bg-yellow-50 text-yellow-700 border-yellow-200",
    "Ineligible": "bg-red-50 text-red-600 border-red-200",
    "Draft": "bg-gray-50 text-gray-600 border-gray-200",
    "Reviewed": "bg-teal-50 text-teal-700 border-teal-200",
    "Stuck": "bg-red-50 text-red-700 border-red-200",
  }

  return (
    <div
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border",
        statusStyles[status],
        className
      )}
      {...props}
    >
      {status}
    </div>
  )
}
