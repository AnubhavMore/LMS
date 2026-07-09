"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ChevronRight, Home } from "lucide-react"
import { cn } from "@/lib/utils"

interface BreadcrumbItem {
  label: string
  href?: string
}

function generateBreadcrumbs(pathname: string): BreadcrumbItem[] {
  const segments = pathname.split("/").filter(Boolean)
  const crumbs: BreadcrumbItem[] = [{ label: "Home", href: "/dashboard" }]

  let currentPath = ""
  for (const segment of segments) {
    // Skip route groups like (app)
    if (segment.startsWith("(") && segment.endsWith(")")) continue

    currentPath += `/${segment}`
    let label = segment
      .replace(/-/g, " ")
      .replace(/\b\w/g, c => c.toUpperCase())

    // Hide long database IDs (like CUIDs or UUIDs) from the breadcrumb
    if (segment.length > 20 && !segment.includes("-")) {
      label = "Details"
    }

    crumbs.push({ label, href: currentPath })
  }

  // Last item should not be a link
  if (crumbs.length > 1) {
    const last = crumbs[crumbs.length - 1]
    crumbs[crumbs.length - 1] = { label: last.label }
  }

  return crumbs
}

export function Breadcrumb({ className }: { className?: string }) {
  const pathname = usePathname()
  const crumbs = generateBreadcrumbs(pathname)

  if (crumbs.length <= 1) return null

  return (
    <nav aria-label="Breadcrumb" className={cn("flex items-center gap-1 text-xs text-brand-neutral", className)}>
      {crumbs.map((crumb, idx) => (
        <React.Fragment key={idx}>
          {idx > 0 && <ChevronRight className="h-3 w-3 text-gray-300" />}
          {crumb.href ? (
            <Link
              href={crumb.href}
              className="hover:text-brand-blue transition-colors flex items-center gap-1"
            >
              {idx === 0 && <Home className="h-3 w-3" />}
              {crumb.label}
            </Link>
          ) : (
            <span className="font-medium text-brand-dark-grey">{crumb.label}</span>
          )}
        </React.Fragment>
      ))}
    </nav>
  )
}
