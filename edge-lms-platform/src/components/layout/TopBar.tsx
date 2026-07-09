"use client"

import * as React from "react"
import { Bell, LogOut, Settings, User } from "lucide-react"
import { useAuth } from "@/lib/auth/AuthContext"
import { Avatar } from "@/components/ui/Avatar"
import { SearchInput } from "@/components/ui/SearchInput"
import { DropdownMenu, DropdownMenuItem, DropdownMenuSeparator } from "@/components/ui/DropdownMenu"
import { RoleSwitcher } from "@/components/layout/RoleSwitcher"

export function TopBar() {
  const { currentUser, logout } = useAuth()

  return (
    <header className="h-16 bg-white border-b border-gray-100 flex items-center justify-between px-6 shrink-0">
      <SearchInput
        placeholder="Search programs, users, or insights..."
        className="flex-1 max-w-xl"
      />

      <div className="flex items-center gap-2 ml-4">
        <RoleSwitcher />
        {/* Notification Menu */}
        <DropdownMenu
          trigger={
            <button className="relative p-2 text-brand-neutral hover:bg-gray-50 rounded-full transition-colors">
              <Bell className="h-5 w-5" />
              <span className="absolute top-1.5 right-1.5 h-2 w-2 bg-brand-maroon rounded-full border-2 border-white"></span>
            </button>
          }
        >
          <div className="px-4 py-3 border-b border-gray-100">
            <p className="text-sm font-semibold text-brand-blue">Notifications</p>
          </div>
          <div className="px-4 py-6 text-center text-sm text-brand-neutral">
            No new notifications
          </div>
        </DropdownMenu>

        <div className="h-8 w-px bg-gray-200"></div>

        {/* Profile Menu */}
        <DropdownMenu
          trigger={
            <button className="flex items-center gap-2 text-sm font-medium text-brand-dark-grey hover:bg-gray-50 py-1.5 px-2 rounded-lg transition-colors">
              {currentUser ? (
                <Avatar name={currentUser.name} size="sm" />
              ) : (
                <User className="h-7 w-7 text-brand-neutral" />
              )}
              <span className="hidden sm:inline-block">
                {currentUser?.name || "Guest"}
              </span>
            </button>
          }
        >
          {currentUser && (
            <>
              <div className="px-4 py-3 border-b border-gray-100">
                <p className="text-sm font-semibold text-brand-dark-grey">{currentUser.name}</p>
                <p className="text-xs text-brand-neutral">{currentUser.email}</p>
                <p className="text-xs text-brand-neutral mt-0.5 capitalize">{currentUser.role}</p>
              </div>
              <DropdownMenuItem icon={<Settings className="h-4 w-4" />}>Account Settings</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem icon={<LogOut className="h-4 w-4" />} destructive onClick={logout}>
                Sign Out
              </DropdownMenuItem>
            </>
          )}
        </DropdownMenu>
      </div>
    </header>
  )
}
