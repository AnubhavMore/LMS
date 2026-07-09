import * as React from "react"
import { EmptyState } from "@/components/ui/EmptyState"
import Link from "next/link"
import { Button } from "@/components/ui/Button"

export default function UnauthorizedPage() {
  return (
    <div className="min-h-screen bg-brand-warm flex flex-col items-center justify-center p-8">
      <div className="w-full max-w-lg">
        <EmptyState 
          title="Access Denied"
          description="You do not have the required permissions to view this page. If you believe this is an error, please contact your administrator."
          icon={
            <div className="h-16 w-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
          }
          action={
            <Link href="/dashboard">
              <Button>Return to Dashboard</Button>
            </Link>
          }
        />
      </div>
    </div>
  )
}
