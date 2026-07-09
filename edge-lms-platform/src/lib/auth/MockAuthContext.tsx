"use client"

import * as React from "react"
import { User, Role } from "@/types/schema"
import { seedUsers } from "@/data/seed/users"

interface AuthContextType {
  currentUser: User | null
  isAuthenticated: boolean
  loginAs: (userId: string) => void
  logout: () => void
}

const AuthContext = React.createContext<AuthContextType | undefined>(undefined)

// Default user for dev if none selected
const defaultUser = seedUsers.find(u => u.id === "usr_acme_lrn1") || null

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [currentUser, setCurrentUser] = React.useState<User | null>(null)
  const [isMounted, setIsMounted] = React.useState(false)

  React.useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsMounted(true)
    const savedUserId = localStorage.getItem("mock_auth_user_id")
    if (savedUserId) {
      const user = seedUsers.find(u => u.id === savedUserId)
      if (user) setCurrentUser(user)
    } else {
      setCurrentUser(defaultUser)
    }
  }, [])

  const loginAs = React.useCallback((userId: string) => {
    const user = seedUsers.find(u => u.id === userId)
    if (user) {
      setCurrentUser(user)
      localStorage.setItem("mock_auth_user_id", userId)
    }
  }, [])

  const logout = React.useCallback(() => {
    setCurrentUser(null)
    localStorage.removeItem("mock_auth_user_id")
  }, [])

  // Prevent hydration mismatch
  if (!isMounted) return null

  return (
    <AuthContext.Provider value={{ currentUser, isAuthenticated: !!currentUser, loginAs, logout }}>
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

// Temporary helper until we fully refactor useRole references
export function useRole() {
  const { currentUser } = useAuth()
  return { role: currentUser?.role || "None" as Role | "None" }
}
