"use client"

import * as React from "react"
import { PageHeader } from "@/components/ui/PageHeader"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"
import { logExpansionSignal } from "@/lib/api"
import { useParams } from "next/navigation"
import { Check, Rocket, ArrowRight, Activity, Target, ShieldAlert } from "lucide-react"
import { ExpansionSignal } from "@/types/schema"

export default function ConsultantExpansionSignalPage() {
  const params = useParams()
  const id = params.id as string
  
  const [signal, setSignal] = React.useState<Partial<ExpansionSignal>>({
    signalType: "HighEngagement",
    summary: "",
    suggestedPlay: "Executive Coaching",
    urgency: "Medium",
    evidence: "",
    recommendedOwner: "Account Manager",
  })
  
  const [saving, setSaving] = React.useState(false)
  const [saved, setSaved] = React.useState(false)

  const handleSave = async () => {
    setSaving(true)
    const fullSignal: any = {
      id: `es_${Math.random().toString(36).substring(2, 10)}`,
      programInstanceId: id,
      companyId: "comp_acme_01", // Placeholder
      ...signal,
      status: "Queued",
      detectedAt: new Date().toISOString()
    }
    await logExpansionSignal(fullSignal)
    setSaving(false)
    setSaved(true)
  }

  if (saved) {
    return (
      <div className="space-y-6 animate-in fade-in duration-500 max-w-2xl">
        <PageHeader title="Signal Queued" description="Your observation has been captured." />
        <Card className="border-green-200">
          <CardContent className="p-8 text-center space-y-4">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
              <Check className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">Expansion Signal Queued</h3>
            <p className="text-gray-600 dark:text-gray-400">
              The signal has been logged and wrapped in an Integration Event. It will be pushed to the Account Manager in Edge10 during the next sync cycle.
            </p>
            <Button onClick={() => setSaved(false)} className="mt-4 bg-brand-blue">
              Log Another Signal
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-500 max-w-3xl">
      <PageHeader 
        title="Log Expansion Signal" 
        description="Notify Sales/Operations about new opportunities discovered during delivery. This will be pushed to Edge10."
      />

      <Card className="border-brand-green/30 shadow-brand-green/5">
        <CardHeader className="bg-brand-green/5 border-b border-brand-green/20">
          <CardTitle className="flex items-center text-brand-green">
            <Rocket className="w-5 h-5 mr-2" /> Edge10 Integration Payload
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 pt-6">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-1 flex items-center"><Activity className="w-4 h-4 mr-1 text-gray-400"/> Signal Type</label>
              <select 
                className="w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 p-2 text-sm"
                value={signal.signalType}
                onChange={e => setSignal({ ...signal, signalType: e.target.value as any })}
              >
                <option value="HighEngagement">High Engagement / Champion</option>
                <option value="ConsultingNeed">Consulting Need Discovered</option>
                <option value="NewCohortRequested">New Cohort Requested</option>
                <option value="ExecutiveCoaching">Executive Coaching Need</option>
                <option value="TeamDysfunction">Team Dysfunction (Intervention needed)</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1 flex items-center"><ShieldAlert className="w-4 h-4 mr-1 text-gray-400"/> Urgency</label>
              <select 
                className="w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 p-2 text-sm"
                value={signal.urgency}
                onChange={e => setSignal({ ...signal, urgency: e.target.value as any })}
              >
                <option value="Low">Low - Nurture for later</option>
                <option value="Medium">Medium - Follow up next quarter</option>
                <option value="High">High - Immediate action required</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Headline Summary</label>
            <input 
              type="text"
              className="w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 p-2 text-sm"
              placeholder="e.g. VP of Eng asked about coaching for their directors"
              value={signal.summary}
              onChange={e => setSignal({ ...signal, summary: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Observed Evidence</label>
            <textarea 
              className="w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 p-3 text-sm font-mono"
              rows={4}
              value={signal.evidence}
              onChange={e => setSignal({ ...signal, evidence: e.target.value })}
              placeholder="Provide exact quotes, context, or data points that support this signal..."
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg border border-gray-200 dark:border-gray-700">
            <div>
              <label className="block text-xs font-bold uppercase text-gray-500 mb-1 flex items-center">
                <Target className="w-3.5 h-3.5 mr-1" /> Suggested Play
              </label>
              <input 
                type="text"
                className="w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 p-2 text-sm"
                value={signal.suggestedPlay}
                onChange={e => setSignal({ ...signal, suggestedPlay: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase text-gray-500 mb-1 flex items-center">
                <Rocket className="w-3.5 h-3.5 mr-1" /> Route To
              </label>
              <select 
                className="w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 p-2 text-sm"
                value={signal.recommendedOwner}
                onChange={e => setSignal({ ...signal, recommendedOwner: e.target.value })}
              >
                <option value="Account Manager">Account Manager (Sales)</option>
                <option value="Delivery Director">Delivery Director</option>
                <option value="Product Team">Product / Content Team</option>
              </select>
            </div>
          </div>

          <Button 
            onClick={handleSave} 
            disabled={saving || !signal.summary || !signal.evidence}
            className="w-full bg-brand-green hover:bg-green-700 h-12 text-base"
          >
            {saving ? "Queueing Integration Event..." : "Push Signal to Edge10"}
            {!saving && <ArrowRight className="w-5 h-5 ml-2" />}
          </Button>
          <p className="text-center text-xs text-gray-400 mt-2">
            This will create an IntegrationEvent payload in the Edge LMS queue.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
