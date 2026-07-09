"use client"

import * as React from "react"
import { User, Role } from "@/types/schema"
import { useRouter, usePathname } from "next/navigation"

interface AuthContextType {
  currentUser: User | null
  isAuthenticated: boolean
  isLoading: boolean
  loginByEmail: (email: string) => Promise<boolean>
  loginAs: (email: string) => Promise<void>
  signupByEmail: (email: string, name: string) => Promise<boolean | string>
  logout: () => void
}

const AuthContext = React.createContext<AuthContextType | undefined>(undefined)

// Helper to check for mock cookie
function getMockUser(): User | null {
  if (typeof document === "undefined") return null
  const match = document.cookie.match(new RegExp('(^| )edge_lms_user=([^;]+)'))
  if (match) {
    try {
      return JSON.parse(decodeURIComponent(match[2])) as User
    } catch (e) {
      return null
    }
  }
  return null
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [currentUser, setCurrentUser] = React.useState<User | null>(null)
  const [isMounted, setIsMounted] = React.useState(false)
  const [isLoading, setIsLoading] = React.useState(true)
  const router = useRouter()
  const pathname = usePathname()

  React.useEffect(() => {
    setIsMounted(true)
    const user = getMockUser()
    setCurrentUser(user)
    setIsLoading(false)

    // if (!user && !pathname.startsWith("/login") && !pathname.startsWith("/signup")) {
    //   router.push("/login")
    // }
  }, [pathname, router])

  const loginByEmail = async (email: string) => {
    setIsLoading(true)
    try {
      const res = await fetch("/api/auth/mock-login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email })
      })
      
      if (res.ok) {
        const data = await res.json()
        setCurrentUser(data.user)
        return true
      }
      return false
    } catch (error) {
      console.error("Login failed:", error)
      return false
    } finally {
      setIsLoading(false)
    }
  }

  const signupByEmail = async (email: string, name: string) => {
    setIsLoading(true)
    try {
      const res = await fetch("/api/auth/mock-signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, name })
      })
      
      if (res.ok) {
        const data = await res.json()
        setCurrentUser(data.user)
        return true
      }
      const data = await res.json()
      return data.error || "Signup failed"
    } catch (error) {
      console.error("Signup failed:", error)
      return "Network error"
    } finally {
      setIsLoading(false)
    }
  }

  const loginAs = async (email: string) => {
    await loginByEmail(email)
    window.location.href = "/dashboard"
  }

  const logout = React.useCallback(() => {
    document.cookie = "edge_lms_user=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;"
    setCurrentUser(null)
    router.push("/login")
  }, [router])

  if (!isMounted) return null

  return (
    <AuthContext.Provider value={{ 
      currentUser, 
      isAuthenticated: !!currentUser, 
      isLoading, 
      loginByEmail,
      loginAs,
      signupByEmail,
      logout 
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = React.useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

export function useRole() {
  const { currentUser } = useAuth()
  return { role: currentUser?.role || ("None" as Role | "None") }
}
