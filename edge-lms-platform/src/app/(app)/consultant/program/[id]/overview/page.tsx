"use client"

/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from "react"
import { PageHeader } from "@/components/ui/PageHeader"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card"
import { getProgramInstance, getDeliveryHandoff } from "@/lib/api"
import { useParams } from "next/navigation"

export default function ConsultantProgramOverviewPage() {
  const params = useParams()
  const id = params.id as string
  const [program, setProgram] = React.useState<any>(null)
  const [handoff, setHandoff] = React.useState<any>(null)

  React.useEffect(() => {
    if (!id) return
    getProgramInstance(id).then(setProgram)
    getDeliveryHandoff(id).then(setHandoff)
  }, [id])

  if (!program) return <PageHeader title="Loading Brief..." />

  return (
    <div className="space-y-6 animate-in fade-in duration-500 max-w-4xl">
      <PageHeader 
        title={`${program.title} - Program Brief`} 
        description="The core strategy and context for your facilitation."
      />

      {handoff ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="col-span-1 md:col-span-2">
            <CardHeader>
              <CardTitle>Business Context & Need</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                {handoff.businessNeed}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Audience Profile</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 dark:text-gray-300">
                {handoff.targetAudience}
              </p>
            </CardContent>
          </Card>



          <Card className="col-span-1 md:col-span-2">
            <CardHeader>
              <CardTitle>Competencies & Success Measures</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-sm text-gray-500 uppercase tracking-wider mb-2">Target Competencies</h4>
                  <div className="flex flex-wrap gap-2">
                    {handoff.competencies?.map((c: string) => (
                      <span key={c} className="px-2 py-1 bg-brand-blue/10 text-brand-blue rounded text-sm font-medium">{c}</span>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-sm text-gray-500 uppercase tracking-wider mb-2 mt-4">Assessment Plan</h4>
                  <p className="text-sm text-gray-700 dark:text-gray-300">{handoff.assessmentPlan}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      ) : (
        <Card>
          <CardContent className="p-12 text-center text-gray-500">
            No delivery handoff has been completed for this program yet.
          </CardContent>
        </Card>
      )}
    </div>
  )
}
