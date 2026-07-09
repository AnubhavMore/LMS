"use client"

import * as React from "react"
import { PageHeader } from "@/components/ui/PageHeader"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"
import { generateReportSnapshot } from "@/lib/api"
import { useParams } from "next/navigation"
import { Check, FileText } from "lucide-react"

export default function ConsultantReportBuilderPage() {
  const params = useParams()
  const id = params.id as string
  
  const [sections, setSections] = React.useState<Record<string, boolean>>({
    summary: true,
    attendance: true,
    completion: true,
    reflections: true,
    actionPlans: true,
    observations: true,
    nextSteps: true
  })

  const [generating, setGenerating] = React.useState(false)
  const [snapshotId, setSnapshotId] = React.useState<string | null>(null)

  const toggleSection = (key: string) => {
    setSections(prev => ({ ...prev, [key]: !prev[key] }))
  }

  const handleGenerate = async () => {
    setGenerating(true)
    const included = Object.entries(sections).filter(([, v]) => v).map(([k]) => k)
    const res = await generateReportSnapshot(id, included)
    if (res) {
      setSnapshotId(res.id)
    }
    setGenerating(false)
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-500 max-w-4xl">
      <PageHeader 
        title="Report Builder" 
        description="Compile structured data and your qualitative notes into a client-ready snapshot."
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Select Sections</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {Object.entries(sections).map(([key, isIncluded]) => (
                <div key={key} className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    id={key}
                    checked={isIncluded}
                    onChange={() => toggleSection(key)}
                    className="rounded border-gray-300 text-brand-blue focus:ring-brand-blue"
                  />
                  <label htmlFor={key} className="text-sm font-medium text-gray-700 dark:text-gray-300 capitalize">
                    {key.replace(/([A-Z])/g, ' $1').trim()}
                  </label>
                </div>
              ))}
            </CardContent>
          </Card>
          
          <Button 
            className="w-full bg-brand-blue" 
            onClick={handleGenerate}
            disabled={generating}
          >
            {generating ? "Compiling..." : "Generate Snapshot"}
          </Button>

          {snapshotId && (
            <div className="p-4 bg-green-50 dark:bg-green-900/20 text-green-800 dark:text-green-300 rounded-lg text-sm flex items-center">
              <Check className="w-4 h-4 mr-2" />
              Snapshot created: {snapshotId}
            </div>
          )}
        </div>

        <div className="md:col-span-2">
          <Card className="h-full bg-gray-50 dark:bg-gray-900/50">
            <CardContent className="p-8 h-full flex flex-col items-center justify-center text-gray-500 border-2 border-dashed border-gray-200 dark:border-gray-800 m-4 rounded-lg">
              {snapshotId ? (
                <div className="w-full space-y-4">
                  <div className="flex items-center space-x-2 text-brand-blue mb-6">
                    <FileText className="w-6 h-6" />
                    <h3 className="text-lg font-bold">Client Report Preview</h3>
                  </div>
                  {Object.entries(sections).map(([key, v]) => v && (
                    <div key={key} className="p-4 bg-white dark:bg-gray-800 rounded shadow-sm">
                      <h4 className="font-semibold capitalize text-gray-900 dark:text-white mb-2">
                        {key.replace(/([A-Z])/g, ' $1').trim()}
                      </h4>
                      <div className="h-2 w-full bg-gray-100 dark:bg-gray-700 rounded mb-1"></div>
                      <div className="h-2 w-3/4 bg-gray-100 dark:bg-gray-700 rounded"></div>
                    </div>
                  ))}
                  <Button className="w-full mt-4" variant="outline">Export PDF</Button>
                </div>
              ) : (
                <>
                  <FileText className="w-12 h-12 mb-4 text-gray-300 dark:text-gray-600" />
                  <p>Select sections and click generate to preview the report.</p>
                  <p className="text-sm mt-2 text-gray-400">All metrics and your public session notes will be automatically injected.</p>
                </>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
