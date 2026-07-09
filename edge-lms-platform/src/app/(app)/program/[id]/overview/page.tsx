"use client"

/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from "react"
import { getProgramInstance, getProgramSetupChecklist } from "@/lib/api"
import { PageHeader } from "@/components/ui/PageHeader"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card"
import { StatusBadge } from "@/components/ui/StatusBadge"
import { CheckCircle2, Circle } from "lucide-react"
import { useParams } from "next/navigation"

export default function ProgramOverviewPage() {
  const params = useParams()
  const id = params.id as string
  const [program, setProgram] = React.useState<any>(null)
  const [checklist, setChecklist] = React.useState<any>(null)

  React.useEffect(() => {
    if (!id) return
    getProgramInstance(id).then(setProgram)
    getProgramSetupChecklist(id).then(setChecklist)
  }, [id])

  if (!program || !checklist) return <PageHeader title="Loading..." />

  const setupItems = [
    { label: "Delivery Handoff Completed", done: checklist.handoffComplete },
    { label: "Cohorts Created", done: checklist.cohortsCreated },
    { label: "Learners Invited", done: checklist.learnersInvited },
    { label: "Live Sessions Scheduled", done: checklist.sessionsScheduled },
    { label: "Facilitators Assigned", done: checklist.facilitatorsAssigned },
  ]
  const isReady = setupItems.every(i => i.done)

  return (
    <div className="space-y-6">
      <PageHeader 
        title={program.name}
        description={`Template: ${program.templateName} | Client: ${program.companyName}`}
        action={<StatusBadge status={program.status} />}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Delivery Metadata</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <div className="text-brand-neutral mb-1 text-xs">Edge10 Opportunity ID</div>
                <div className="font-medium text-brand-dark-grey">{program.edge10OpportunityId || "N/A"}</div>
              </div>
              <div>
                <div className="text-brand-neutral mb-1 text-xs">Owner</div>
                <div className="font-medium text-brand-dark-grey">{program.ownerName}</div>
              </div>
              <div>
                <div className="text-brand-neutral mb-1 text-xs">Start Date</div>
                <div className="font-medium text-brand-dark-grey">{program.startDate ? new Date(program.startDate).toLocaleDateString() : "TBD"}</div>
              </div>
              <div>
                <div className="text-brand-neutral mb-1 text-xs">End Date</div>
                <div className="font-medium text-brand-dark-grey">{program.endDate ? new Date(program.endDate).toLocaleDateString() : "TBD"}</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className={isReady ? "border-brand-green bg-brand-green/5" : "border-brand-amber bg-brand-amber/5"}>
          <CardHeader>
            <CardTitle className={isReady ? "text-brand-green" : "text-brand-amber"}>Setup Checklist</CardTitle>
            <CardDescription>Required steps before launch</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {setupItems.map((item, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  {item.done 
                    ? <CheckCircle2 className="h-5 w-5 text-brand-green" /> 
                    : <Circle className="h-5 w-5 text-brand-neutral" />
                  }
                  <span className={`text-sm ${item.done ? "text-brand-dark-grey line-through opacity-70" : "text-brand-dark-grey font-medium"}`}>
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
