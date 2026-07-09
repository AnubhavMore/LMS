"use client"

import * as React from "react"
import { PageHeader } from "@/components/ui/PageHeader"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"
import { processDeliveryHandoff } from "@/lib/integrations"
import { Upload, CheckCircle2, AlertCircle, Copy, Link as LinkIcon } from "lucide-react"

const SAMPLE_JSON = `{
  "companyId": "comp_acme_01",
  "opportunityId": "ZOHO-OPP-98234",
  "programTitle": "Acme Corp - NextGen Leaders 2026",
  "businessNeed": "High turnover among first-time managers due to lack of coaching skills.",
  "targetAudience": "30 newly promoted technical managers across EMEA and NA.",
  "competencies": ["Coaching", "Delegation", "Conflict Resolution"],
  "assessmentPlan": "Pre and Post 360 Degree Feedback",
  "successMeasures": ["15% increase in retention", "Improved ENPS scores"],
  "promisedDeliverables": ["3 Live Workshops", "12 weeks of micro-learning", "Manager Toolkit"]
}`

export default function Edge10ImportPage() {
  const [jsonInput, setJsonInput] = React.useState("")
  const [loading, setLoading] = React.useState(false)
  const [result, setResult] = React.useState<{ success: boolean; programInstance?: any; error?: string } | null>(null)

  const handleProcess = async () => {
    setLoading(true)
    setResult(null)
    try {
      const payload = JSON.parse(jsonInput)
      const res = await processDeliveryHandoff(payload)
      setResult(res)
    } catch (e: any) {
      setResult({ success: false, error: "Invalid JSON format: " + e.message })
    }
    setLoading(false)
  }

  const loadSample = () => setJsonInput(SAMPLE_JSON)

  return (
    <div className="space-y-6 animate-in fade-in duration-500 max-w-4xl">
      <PageHeader
        title="Edge10 Delivery Handoff"
        description="Ingest won opportunities from Zoho/Edge10 to automatically provision LMS environments."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>JSON Payload</span>
              <Button variant="ghost" size="sm" onClick={loadSample}>
                <Copy className="w-4 h-4 mr-2" /> Load Sample
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <textarea
              className="w-full h-80 p-4 font-mono text-xs bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-md focus:ring-2 focus:ring-brand-blue outline-none"
              placeholder="Paste Edge10 Handoff JSON here..."
              value={jsonInput}
              onChange={(e) => setJsonInput(e.target.value)}
            />
            <Button className="w-full bg-brand-blue" onClick={handleProcess} disabled={loading || !jsonInput}>
              <Upload className="w-4 h-4 mr-2" />
              {loading ? "Processing..." : "Process Handoff & Provision"}
            </Button>
          </CardContent>
        </Card>

        <div>
          {result && (
            <Card className={result.success ? "border-green-200" : "border-red-200"}>
              <CardHeader className={result.success ? "bg-green-50 dark:bg-green-900/20" : "bg-red-50 dark:bg-red-900/20"}>
                <CardTitle className={`flex items-center ${result.success ? "text-green-700 dark:text-green-400" : "text-red-700 dark:text-red-400"}`}>
                  {result.success ? <CheckCircle2 className="w-5 h-5 mr-2" /> : <AlertCircle className="w-5 h-5 mr-2" />}
                  {result.success ? "Provisioning Successful" : "Validation Failed"}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                {result.success && result.programInstance ? (
                  <div className="space-y-4">
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      Successfully ingested Edge10 handoff and created the following environment:
                    </p>
                    <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-md border border-gray-100 dark:border-gray-700">
                      <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Program Instance ID</p>
                      <p className="font-mono text-sm font-bold text-brand-blue">{result.programInstance.id}</p>
                      
                      <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                        <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Status</p>
                        <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-gray-200 text-gray-700">
                          {result.programInstance.status}
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex items-center text-sm text-blue-600 bg-blue-50 p-3 rounded-md">
                      <LinkIcon className="w-4 h-4 mr-2 flex-shrink-0" />
                      External links (Zoho Opportunity) successfully mapped.
                    </div>
                  </div>
                ) : (
                  <p className="text-sm text-red-600 font-mono bg-red-50 p-4 rounded border border-red-100">
                    {result.error}
                  </p>
                )}
              </CardContent>
            </Card>
          )}

          {!result && (
            <div className="h-full flex flex-col items-center justify-center text-gray-400 text-center p-8 border-2 border-dashed border-gray-200 dark:border-gray-800 rounded-lg">
              <Upload className="w-12 h-12 mb-4 text-gray-300" />
              <p className="text-sm">Paste a valid handoff payload and process it to see the provisioning results here.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
