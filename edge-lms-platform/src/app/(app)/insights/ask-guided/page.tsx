"use client"

import * as React from "react"
import { useSearchParams } from "next/navigation"
import { PageHeader } from "@/components/ui/PageHeader"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"
import { STANDARD_QUESTIONS, InsightResult } from "@/lib/insights"
import { getGuidedInsight } from "@/lib/api"
import { useAuth } from "@/lib/auth/AuthContext"
import { Bot, Lightbulb, Target, AlertTriangle, ShieldCheck, ArrowRight, CheckCircle2, ChevronRight } from "lucide-react"

export default function AskGuidedPage() {
  const searchParams = useSearchParams()
  const playParam = searchParams?.get("play") || "First-Time Managers"
  const { currentUser } = useAuth()
  
  const [play, setPlay] = React.useState(playParam)
  const [challengeTag, setChallengeTag] = React.useState("Delegation")
  const [questionCode, setQuestionCode] = React.useState("Q1")
  
  const [loading, setLoading] = React.useState(false)
  const [result, setResult] = React.useState<InsightResult | null>(null)

  const handleAsk = async () => {
    if (!currentUser) return
    setLoading(true)
    setResult(null)
    const res = await getGuidedInsight(questionCode, play, currentUser.role, challengeTag)
    setResult(res)
    setLoading(false)
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-500 max-w-5xl">
      <PageHeader
        title="Ask Guided Insight"
        description="Get structured, role-specific recommendations for common challenges."
      />

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Left Col: Query Builder */}
        <div className="md:col-span-4 space-y-4">
          <Card>
            <CardContent className="p-5 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Play</label>
                <select 
                  className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800"
                  value={play}
                  onChange={e => setPlay(e.target.value)}
                >
                  <option value="First-Time Managers">First-Time Managers</option>
                  <option value="DiSC & Communication">DiSC & Communication</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Challenge</label>
                <select 
                  className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800"
                  value={challengeTag}
                  onChange={e => setChallengeTag(e.target.value)}
                >
                  <option value="Delegation">Delegation</option>
                  <option value="Giving Critical Feedback">Giving Critical Feedback</option>
                  <option value="Time Management">Time Management</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Standard Question</label>
                <div className="space-y-2 max-h-[300px] overflow-y-auto pr-2">
                  {STANDARD_QUESTIONS.map(q => (
                    <button
                      key={q.code}
                      onClick={() => setQuestionCode(q.code)}
                      className={`w-full text-left p-3 rounded-md text-sm transition-colors border ${
                        questionCode === q.code
                          ? "bg-purple-50 border-purple-200 text-purple-900 font-medium"
                          : "bg-white border-gray-200 text-gray-600 hover:bg-gray-50 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-300"
                      }`}
                    >
                      <span className="text-xs font-bold mr-2 text-purple-600">{q.code}</span>
                      {q.text}
                    </button>
                  ))}
                </div>
              </div>

              <Button className="w-full bg-brand-blue" onClick={handleAsk} disabled={loading}>
                {loading ? "Generating Insight..." : "Get Insight"}
                {!loading && <ArrowRight className="w-4 h-4 ml-2" />}
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Right Col: Output */}
        <div className="md:col-span-8">
          {loading && (
            <Card className="h-full min-h-[400px] flex items-center justify-center border-dashed">
              <div className="text-center text-gray-500">
                <RefreshCw className="w-8 h-8 animate-spin mx-auto mb-3 text-purple-500" />
                <p>Retrieving best practice framework...</p>
              </div>
            </Card>
          )}

          {!loading && !result && (
            <Card className="h-full min-h-[400px] flex items-center justify-center border-dashed bg-gray-50/50 dark:bg-gray-800/50">
              <div className="text-center text-gray-500 max-w-sm px-6">
                <Lightbulb className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                <p className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">Ready to Guide</p>
                <p className="text-sm">Select your play, challenge, and question on the left to receive a structured insight template.</p>
              </div>
            </Card>
          )}

          {!loading && result && (
            <div className="space-y-4 animate-in slide-in-from-bottom-4 duration-500">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
                  <span className="text-purple-600 mr-2">{result.template.questionCode}</span>
                  {result.question}
                </h3>
                <div className="inline-flex items-center px-2.5 py-1 rounded-full bg-green-100 text-green-700 text-xs font-medium border border-green-200">
                  <ShieldCheck className="w-3.5 h-3.5 mr-1" />
                  Guided Recommendation — Not AI Generated
                </div>
              </div>

              <Card className="border-purple-100 dark:border-purple-900 shadow-sm">
                <CardHeader className="bg-purple-50/50 dark:bg-purple-900/10 border-b border-purple-100 dark:border-purple-900 pb-4">
                  <CardTitle className="text-xl text-purple-900 dark:text-purple-300 flex items-start">
                    <Bot className="w-6 h-6 mr-3 mt-1 flex-shrink-0 text-purple-600" />
                    <div>
                      <span className="block text-sm font-normal text-purple-600 uppercase tracking-wider mb-1">Executive Summary</span>
                      {result.template.answerShort}
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6 space-y-8">
                  
                  {/* Long Answer */}
                  <div>
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg">
                      {result.template.answerLong}
                    </p>
                  </div>

                  {/* Actions & Risks Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {result.template.actions.length > 0 && (
                      <div className="bg-blue-50/50 dark:bg-blue-900/10 rounded-lg p-5 border border-blue-100 dark:border-blue-900/30">
                        <h4 className="font-semibold text-blue-900 dark:text-blue-300 flex items-center mb-3">
                          <Target className="w-4 h-4 mr-2" /> Recommended Actions
                        </h4>
                        <ul className="space-y-2">
                          {result.template.actions.map((act, i) => (
                            <li key={i} className="flex items-start text-sm text-blue-800 dark:text-blue-200">
                              <CheckCircle2 className="w-4 h-4 mr-2 mt-0.5 text-blue-500 flex-shrink-0" />
                              {act}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    
                    {result.template.risks.length > 0 && (
                      <div className="bg-red-50/50 dark:bg-red-900/10 rounded-lg p-5 border border-red-100 dark:border-red-900/30">
                        <h4 className="font-semibold text-red-900 dark:text-red-300 flex items-center mb-3">
                          <AlertTriangle className="w-4 h-4 mr-2" /> Risks to Watch
                        </h4>
                        <ul className="space-y-2">
                          {result.template.risks.map((risk, i) => (
                            <li key={i} className="flex items-start text-sm text-red-800 dark:text-red-200">
                              <span className="w-1.5 h-1.5 rounded-full bg-red-400 mr-2 mt-1.5 flex-shrink-0" />
                              {risk}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>

                  {/* 30/60/90 */}
                  {(result.template.direction30 || result.template.direction60) && (
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-700 pb-2 mb-4">
                        30-60-90 Day Direction
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="p-4 rounded-md bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700">
                          <p className="text-xs font-bold text-gray-400 uppercase mb-1">30 Days</p>
                          <p className="text-sm font-medium text-gray-700 dark:text-gray-300">{result.template.direction30 || "—"}</p>
                        </div>
                        <div className="p-4 rounded-md bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700">
                          <p className="text-xs font-bold text-gray-400 uppercase mb-1">60 Days</p>
                          <p className="text-sm font-medium text-gray-700 dark:text-gray-300">{result.template.direction60 || "—"}</p>
                        </div>
                        <div className="p-4 rounded-md bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700">
                          <p className="text-xs font-bold text-gray-400 uppercase mb-1">90 Days</p>
                          <p className="text-sm font-medium text-gray-700 dark:text-gray-300">{result.template.direction90 || "—"}</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Manager Talking Points */}
                  {result.template.managerTalkingPoints.length > 0 && (
                    <div className="border-l-4 border-brand-yellow pl-4 py-1">
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Manager Talking Points</h4>
                      <ul className="space-y-1">
                        {result.template.managerTalkingPoints.map((pt, i) => (
                          <li key={i} className="text-sm text-gray-600 dark:text-gray-400 italic">"{pt}"</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  {/* Modules */}
                  {result.template.relatedModules.length > 0 && (
                    <div className="pt-4 border-t border-gray-100 dark:border-gray-800">
                      <p className="text-sm font-medium text-gray-900 dark:text-white mb-2 flex items-center">
                        Suggested Follow-up Modules <ChevronRight className="w-4 h-4 ml-1 text-gray-400" />
                      </p>
                      <div className="flex gap-2 flex-wrap">
                        {result.template.relatedModules.map(mod => (
                          <span key={mod} className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 text-xs rounded border border-gray-200 dark:border-gray-700 font-mono">
                            {mod}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
// Stub for lucide missing icon
const RefreshCw = ({ className }: { className?: string }) => <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/></svg>
