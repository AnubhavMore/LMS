"use client"

import * as React from "react"
import { useAuth } from "@/lib/auth/AuthContext"
import { cn } from "@/lib/utils"
import { useRouter } from "next/navigation"

import { DropdownMenu, DropdownMenuItem } from "@/components/ui/DropdownMenu"
import { Monitor } from "lucide-react"

const mockPersonas = [
  { id: "priya.sharma@strengthscape.com", name: "Super Admin", role: "SuperAdmin" },
  { id: "rahul.v@strengthscape.com", name: "Strengthscape Admin", role: "StrengthscapeAdmin" },

  { id: "vikram.s@strengthscape.com", name: "Consultant", role: "Consultant" },
  { id: "usr_acme_lrn1", name: "Learner", role: "Learner" },
  { id: "finance@strengthscape.com", name: "Finance/Ops", role: "Finance" }
]

export function RoleSwitcher() {
  const { currentUser, loginAs, logout } = useAuth()
  const router = useRouter()
  
  if (process.env.NODE_ENV === "production") return null

  const handleLogin = async (id: string) => {
    await loginAs(id)
  }

  const handleLogout = () => {
    logout()
    router.replace("/login")
  }

  return (
    <DropdownMenu
      trigger={
        <button className="flex items-center gap-2 text-sm font-medium text-brand-maroon hover:bg-red-50 py-1.5 px-3 rounded-lg transition-colors border border-brand-maroon/20">
          <Monitor className="h-4 w-4" />
          <span className="hidden sm:inline-block">Dev: {currentUser ? currentUser.role : "None"}</span>
        </button>
      }
    >
      <div className="px-4 py-3 border-b border-gray-100">
        <p className="text-sm font-semibold text-brand-maroon">Switch Persona</p>
      </div>
      <div className="max-h-[60vh] overflow-y-auto">
        <DropdownMenuItem onClick={handleLogout} className={!currentUser ? "bg-gray-100" : ""}>
          Logged Out
        </DropdownMenuItem>
        {mockPersonas.map(p => (
          <DropdownMenuItem 
            key={p.id} 
            onClick={() => handleLogin(p.id)}
            className={currentUser?.id === p.id ? "bg-brand-maroon text-white hover:bg-brand-maroon hover:text-white" : ""}
          >
            {p.name} ({p.role})
          </DropdownMenuItem>
        ))}
      </div>
    </DropdownMenu>
  )
}
