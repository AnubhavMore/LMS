"use client"

import * as React from "react"
import { Button } from "@/components/ui/Button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth/AuthContext"

export default function LoginPage() {
  const [email, setEmail] = React.useState("")
  const [password, setPassword] = React.useState("")
  const [loading, setLoading] = React.useState(false)
  const [error, setError] = React.useState<string | null>(null)
  
  const router = useRouter()
  const { loginByEmail } = useAuth()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    // Try mock login by email (looks up user in DB)
    const success = await loginByEmail(email)
    if (success) {
      router.push("/dashboard")
      router.refresh()
    } else {
      setError("Invalid email or user not found.")
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-brand-warm relative overflow-hidden">
      {/* Decorative background element */}
      <div className="absolute top-[-10%] right-[-5%] w-96 h-96 bg-brand-blue/5 rounded-full blur-3xl"></div>

      <div className="w-full max-w-md z-10">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-brand-blue tracking-tight">Edge Learning & Delivery OS</h1>
          <p className="text-brand-neutral mt-2">Powered by Strengthscape</p>
        </div>

        <Card className="border-gray-200 shadow-sm">
          <CardHeader className="space-y-1 pb-4">
            <CardTitle className="text-2xl text-center">Sign In</CardTitle>
            <CardDescription className="text-center">
              Enter your corporate email to access your workspace
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-brand-dark-grey" htmlFor="email">Email</label>
                <input 
                  id="email"
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="name@company.com" 
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue/50 focus:border-brand-blue transition-colors"
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-brand-dark-grey" htmlFor="password">Password</label>
                  <a href="#" className="text-xs text-brand-blue hover:underline font-medium">Forgot password?</a>
                </div>
                <input 
                  id="password"
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue/50 focus:border-brand-blue transition-colors"
                />
              </div>

              {error && (
                <div className="text-red-500 text-sm font-medium">{error}</div>
              )}
              
              <Button type="submit" className="w-full mt-2 bg-brand-blue text-white" size="lg" disabled={loading}>
                {loading ? "Signing In..." : "Sign In"}
              </Button>
              
              <div className="text-center mt-4 text-sm text-brand-neutral">
                Don't have an account? <a href="/signup" className="text-brand-blue font-medium hover:underline">Sign up</a>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
