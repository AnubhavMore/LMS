"use client"

/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from "react"
import { PageHeader } from "@/components/ui/PageHeader"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card"
import { getCohortReadiness } from "@/lib/api"
import { useParams } from "next/navigation"

export default function ConsultantCohortReadinessPage() {
  const params = useParams()
  const id = params.id as string
  const [readiness, setReadiness] = React.useState<any>(null)

  React.useEffect(() => {
    if (!id) return
    getCohortReadiness(id).then(setReadiness)
  }, [id])

  if (!readiness) return <PageHeader title="Loading Readiness..." />

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <PageHeader 
        title="Cohort Readiness" 
        description="Monitor learner preparation before your live sessions."
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Learner Activation</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-500">Total Invited</span>
                <span className="font-bold">{readiness.totalLearners}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-500">Active</span>
                <span className="font-bold text-green-600">{readiness.activeCount}</span>
              </div>
              <div className="flex justify-between items-center border-t pt-2">
                <span className="text-gray-500">Not Started</span>
                <span className="font-bold text-red-500">{readiness.notStartedCount}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Prework Completion</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center h-32">
            <div className="text-4xl font-bold text-brand-blue">{readiness.preworkCompletionPct}%</div>
            <p className="text-sm text-gray-500 mt-2">of active learners completed modules</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Reflection Submission</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center h-32">
            <div className="text-4xl font-bold text-purple-600">{readiness.reflectionCompletionPct}%</div>
            <p className="text-sm text-gray-500 mt-2">of requested reflections submitted</p>
          </CardContent>
        </Card>
      </div>

      <Card className="border-red-200 dark:border-red-900">
        <CardHeader className="bg-red-50 dark:bg-red-900/10 text-red-800 dark:text-red-200">
          <CardTitle>Risk Flags</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y">
            {readiness.riskFlags?.map((flag: any, idx: number) => (
              <div key={idx} className="p-4 flex flex-col md:flex-row justify-between md:items-center">
                <div>
                  <h4 className="font-semibold text-red-600">{flag.type}</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{flag.message}</p>
                </div>
                <div className="mt-2 md:mt-0 px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded text-xs font-medium">
                  {flag.cohort}
                </div>
              </div>
            ))}
            {(!readiness.riskFlags || readiness.riskFlags.length === 0) && (
              <div className="p-6 text-center text-gray-500">No risk flags detected.</div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
