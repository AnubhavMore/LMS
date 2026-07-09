"use client"

/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from "react"
import { getDeliveryHandoff } from "@/lib/api"
import { PageHeader } from "@/components/ui/PageHeader"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card"
import { StatusBadge } from "@/components/ui/StatusBadge"
import { FileText, Target, Users, ShieldAlert, Sparkles } from "lucide-react"
import { useParams } from "next/navigation"

export default function DeliveryHandoffPage() {
  const params = useParams()
  const id = params.id as string
  const [handoff, setHandoff] = React.useState<any>(null)

  React.useEffect(() => {
    if (!id) return
    getDeliveryHandoff(id).then(setHandoff)
  }, [id])

  if (!handoff) {
    return (
      <div className="space-y-6">
        <PageHeader title="Delivery Handoff" description="Consultant briefing document from Sales & Design." />
        <Card className="border-dashed border-2 bg-gray-50/50">
          <CardContent className="flex flex-col items-center justify-center p-12 text-center">
            <FileText className="h-10 w-10 text-brand-neutral mb-4 opacity-50" />
            <h3 className="text-lg font-medium text-brand-dark-grey mb-1">No Handoff Found</h3>
            <p className="text-brand-neutral text-sm max-w-md">The design team has not yet completed the delivery handoff for this program instance.</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-500 max-w-5xl">
      <PageHeader 
        title="Delivery Handoff Briefing" 
        description={`Source: ${handoff.sourceDetails.accountName} / ${handoff.sourceDetails.opportunityName}`}
        action={<StatusBadge status={handoff.status} />}
      />

      {/* Critical Cues & Sensitivities */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="border-brand-amber bg-brand-amber/5">
          <CardHeader className="pb-3">
            <CardTitle className="text-brand-amber flex items-center gap-2">
              <ShieldAlert className="h-5 w-5" /> Stakeholder Sensitivities & Risks
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {handoff.stakeholderSensitivities && (
              <div>
                <h4 className="text-xs font-bold text-brand-dark-grey uppercase tracking-wider mb-1">Sensitivities</h4>
                <p className="text-sm text-brand-dark-grey">{handoff.stakeholderSensitivities}</p>
              </div>
            )}
            {handoff.risks && handoff.risks.length > 0 && (
              <div>
                <h4 className="text-xs font-bold text-brand-dark-grey uppercase tracking-wider mb-1">Known Risks</h4>
                <ul className="list-disc pl-4 text-sm text-brand-dark-grey space-y-1">
                  {handoff.risks.map((r: string, i: number) => <li key={i}>{r}</li>)}
                </ul>
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="border-brand-blue bg-brand-blue/5">
          <CardHeader className="pb-3">
            <CardTitle className="text-brand-blue flex items-center gap-2">
              <Sparkles className="h-5 w-5" /> Facilitator Cues
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-brand-dark-grey">{handoff.facilitatorCues || "No specific cues provided."}</p>
          </CardContent>
        </Card>
      </div>

      {/* Context & Plan */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><FileText className="h-4 w-4 text-brand-neutral" /> Business Context</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h4 className="text-sm font-semibold text-brand-dark-grey mb-1">The Need</h4>
              <p className="text-sm text-brand-neutral leading-relaxed">{handoff.businessContext}</p>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-brand-dark-grey mb-1">Audience Profile</h4>
              <p className="text-sm text-brand-neutral leading-relaxed">{handoff.audienceProfile}</p>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-brand-dark-grey mb-1">Assessment Plan</h4>
              <p className="text-sm text-brand-neutral leading-relaxed">{handoff.assessmentPlan}</p>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><Target className="h-4 w-4 text-brand-neutral" /> Competencies</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {handoff.confirmedCompetencies.map((c: string, i: number) => (
                  <span key={i} className="px-2 py-1 bg-gray-100 text-brand-dark-grey text-xs rounded-md font-medium">
                    {c}
                  </span>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><Users className="h-4 w-4 text-brand-neutral" /> Deliverables</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc pl-4 text-sm text-brand-neutral space-y-2">
                {handoff.promisedDeliverables.map((d: string, i: number) => (
                  <li key={i}>{d}</li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
