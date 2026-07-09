"use client"

import * as React from "react"
import { PageHeader } from "@/components/ui/PageHeader"
import { Card, CardContent } from "@/components/ui/Card"
import { DataTable } from "@/components/ui/DataTable"
import { Button } from "@/components/ui/Button"
import { getRecommendationTemplates } from "@/lib/api"
import { RecommendationTemplate } from "@/types/schema"
import { Plus, Edit } from "lucide-react"

export default function RecommendationTemplatesPage() {
  const [templates, setTemplates] = React.useState<RecommendationTemplate[]>([])
  
  React.useEffect(() => {
    getRecommendationTemplates().then(setTemplates)
  }, [])

  const columns = [
    { header: "Question Code", accessor: "questionCode", cell: (val: string) => <span className="font-mono text-xs font-bold text-purple-600">{val}</span> },
    { header: "Play", accessor: "play" },
    { header: "Role", accessor: "role" },
    { header: "Challenge Tag", accessor: "challengeTag" },
    { header: "Short Answer", accessor: "answerShort", cell: (val: string) => <span className="truncate max-w-[200px] block">{val}</span> },
    { 
      header: "Actions", 
      accessor: "id", 
      cell: () => (
        <Button variant="ghost" size="sm">
          <Edit className="w-4 h-4 mr-2" /> Edit
        </Button>
      ) 
    }
  ]

  return (
    <div className="space-y-6 animate-in fade-in duration-500 max-w-6xl">
      <div className="flex justify-between items-end border-b border-gray-200 dark:border-gray-800 pb-4">
        <PageHeader
          title="Recommendation Templates"
          description="Manage the static logic for the Guided Insight Engine."
        />
        <Button className="bg-brand-blue">
          <Plus className="w-4 h-4 mr-2" /> New Template
        </Button>
      </div>

      <Card>
        <CardContent className="p-0">
          <DataTable data={templates as any} columns={columns} />
          {templates.length === 0 && (
            <div className="p-8 text-center text-gray-500">
              No templates found.
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
