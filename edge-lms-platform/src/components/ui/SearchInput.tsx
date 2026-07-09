"use client"

import * as React from "react"
import { Search } from "lucide-react"
import { cn } from "@/lib/utils"

interface SearchInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange"> {
  onSearch?: (value: string) => void
  onChange?: (value: string) => void
}

export function SearchInput({ onSearch, onChange, placeholder = "Search...", className, ...props }: SearchInputProps) {
  const [value, setValue] = React.useState("")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
    onChange?.(e.target.value)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") onSearch?.(value)
  }

  return (
    <div className={cn(
      "flex items-center bg-gray-50 rounded-lg px-3 py-2 border border-gray-200",
      "focus-within:border-brand-blue focus-within:ring-1 focus-within:ring-brand-blue transition-all",
      className
    )}>
      <Search className="h-4 w-4 text-brand-neutral mr-2 shrink-0" />
      <input
        type="text"
        value={value}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        className="bg-transparent border-none outline-none text-sm w-full text-brand-dark-grey placeholder:text-gray-400"
        {...props}
      />
    </div>
  )
}
