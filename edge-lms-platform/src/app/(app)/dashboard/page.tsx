"use client"

import * as React from "react"
import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth/AuthContext"

export default function DashboardRouter() {
  const { currentUser, isAuthenticated } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isAuthenticated) {
      router.replace("/platform/courses")
      return
    }

    const role = currentUser?.role
    switch (role) {
      case "Learner":
        router.replace("/learner/courses")
        break

      case "Consultant":
        router.replace("/consultant/programs")
        break

      case "StrengthscapeAdmin":
      case "SuperAdmin":
        router.replace("/platform/courses")
        break
      case "Finance":
        router.replace("/platform/billing")
        break
      default:
        router.replace("/unauthorized")
    }
  }, [currentUser, isAuthenticated, router])

  return (
    <div className="flex h-full items-center justify-center text-brand-neutral">
      Loading workspace...
    </div>
  )
}
