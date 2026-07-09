import * as React from "react"
import { cn } from "@/lib/utils"

interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  src?: string
  name: string
  size?: "sm" | "md" | "lg"
}

const sizeMap = {
  sm: "h-7 w-7 text-xs",
  md: "h-9 w-9 text-sm",
  lg: "h-12 w-12 text-base"
}

function getInitials(name: string) {
  return name
    .split(" ")
    .map(n => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2)
}

function getColorFromName(name: string) {
  const colors = [
    "bg-brand-blue", "bg-brand-maroon", "bg-brand-green",
    "bg-indigo-500", "bg-teal-500", "bg-amber-600", "bg-violet-500"
  ]
  let hash = 0
  for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash)
  return colors[Math.abs(hash) % colors.length]
}

export function Avatar({ src, name, size = "md", className, ...props }: AvatarProps) {
  if (src) {
    return (
      <div className={cn("rounded-full overflow-hidden shrink-0", sizeMap[size], className)} {...props}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} alt={name} className="h-full w-full object-cover" />
      </div>
    )
  }

  return (
    <div
      className={cn(
        "rounded-full shrink-0 flex items-center justify-center font-semibold text-white",
        sizeMap[size],
        getColorFromName(name),
        className
      )}
      title={name}
      {...props}
    >
      {getInitials(name)}
    </div>
  )
}
