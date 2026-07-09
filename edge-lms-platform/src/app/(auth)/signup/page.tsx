"use client"

import * as React from "react"
import { Button } from "@/components/ui/Button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth/AuthContext"

export default function SignUpPage() {
  const [email, setEmail] = React.useState("")
  const [password, setPassword] = React.useState("")
  const [name, setName] = React.useState("")
  const [loading, setLoading] = React.useState(false)
  const [error, setError] = React.useState<string | null>(null)
  
  const router = useRouter()
  const { signupByEmail } = useAuth()

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    
    // Use the mock signup flow
    const result = await signupByEmail(email, name)
    
    if (result === true) {
      router.push("/dashboard")
      router.refresh()
      return
    } else {
      setError(typeof result === "string" ? result : "Failed to sign up")
      setLoading(false)
      return
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-brand-warm relative overflow-hidden">
      <div className="absolute top-[-10%] right-[-5%] w-96 h-96 bg-brand-blue/5 rounded-full blur-3xl"></div>

      <div className="w-full max-w-md z-10">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-brand-blue tracking-tight">Create Account</h1>
        </div>

        <Card className="border-gray-200 shadow-sm">
          <CardHeader className="space-y-1 pb-4">
            <CardTitle className="text-2xl text-center">Sign Up</CardTitle>
            <CardDescription className="text-center">
              Create a new account for testing
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSignUp} className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-brand-dark-grey" htmlFor="name">Full Name</label>
                <input 
                  id="name"
                  type="text" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  placeholder="John Doe" 
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue/50 focus:border-brand-blue transition-colors"
                />
              </div>
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
                <label className="text-sm font-medium text-brand-dark-grey" htmlFor="password">Password</label>
                <input 
                  id="password"
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={6}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue/50 focus:border-brand-blue transition-colors"
                />
              </div>

              {error && (
                <div className="text-red-500 text-sm font-medium">{error}</div>
              )}
              
              <Button type="submit" className="w-full mt-2 bg-brand-blue text-white" size="lg" disabled={loading}>
                {loading ? "Signing Up..." : "Sign Up"}
              </Button>
              
              <div className="text-center mt-4 text-sm text-brand-neutral">
                Already have an account? <a href="/login" className="text-brand-blue font-medium hover:underline">Log in</a>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
