"use client"

import * as React from "react"
import { useAuth } from "@/lib/auth/AuthContext"
import { Role } from "@/types/schema"
import { useRouter, usePathname } from "next/navigation"

interface ProtectedRouteProps {
  children: React.ReactNode
  allowedRoles?: Role[]
}

export function ProtectedRoute({ children, allowedRoles }: ProtectedRouteProps) {
  const { currentUser, isAuthenticated, isLoading } = useAuth()
  const router = useRouter()
  const pathname = usePathname()

  React.useEffect(() => {
    if (isLoading) return

    // Temporarily disabled for dev
  }, [isLoading, isAuthenticated, currentUser, allowedRoles, router, pathname])

  if (isLoading) return null

  return <>{children}</>
}
