"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface DropdownMenuProps {
  trigger: React.ReactNode
  children: React.ReactNode
  align?: "left" | "right"
}

export function DropdownMenu({ trigger, children, align = "right" }: DropdownMenuProps) {
  const [open, setOpen] = React.useState(false)
  const ref = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  return (
    <div className="relative inline-block" ref={ref}>
      <div onClick={() => setOpen(!open)} className="cursor-pointer">
        {trigger}
      </div>
      {open && (
        <div className={cn(
          "absolute top-full mt-2 min-w-[200px] bg-white rounded-xl shadow-lg border border-gray-100 py-1 z-50",
          "animate-in fade-in slide-in-from-top-1 duration-200",
          align === "right" ? "right-0" : "left-0"
        )}>
          <div onClick={() => setOpen(false)}>
            {children}
          </div>
        </div>
      )}
    </div>
  )
}

interface DropdownMenuItemProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: React.ReactNode
  destructive?: boolean
}

export function DropdownMenuItem({ children, icon, destructive, className, ...props }: DropdownMenuItemProps) {
  return (
    <button
      className={cn(
        "w-full flex items-center gap-3 px-4 py-2 text-sm text-left transition-colors",
        destructive
          ? "text-red-600 hover:bg-red-50"
          : "text-brand-dark-grey hover:bg-gray-50",
        className
      )}
      {...props}
    >
      {icon && <span className="text-brand-neutral shrink-0">{icon}</span>}
      {children}
    </button>
  )
}

export function DropdownMenuSeparator() {
  return <div className="h-px bg-gray-100 my-1" />
}
