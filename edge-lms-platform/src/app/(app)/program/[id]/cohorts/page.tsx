"use client"

/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from "react"
import { getProgramCohorts } from "@/lib/api"
import { PageHeader } from "@/components/ui/PageHeader"
import { Card, CardContent } from "@/components/ui/Card"
import { DataTable } from "@/components/ui/DataTable"
import { Button } from "@/components/ui/Button"
import { Plus } from "lucide-react"
import { useParams } from "next/navigation"

export default function ProgramCohortsPage() {
  const params = useParams()
  const id = params.id as string
  const [cohorts, setCohorts] = React.useState<any[]>([])

  React.useEffect(() => {
    if (!id) return
    getProgramCohorts(id).then(setCohorts)
  }, [id])

  const columns = [
    { header: "Cohort Name", accessor: "name" },
    { header: "Facilitator", accessor: "facilitatorName" },
    { header: "Learners", accessor: "learnerCount" },
    { 
      header: "Actions", 
      accessor: () => (
        <Button variant="ghost" size="sm" className="text-brand-blue">Manage</Button>
      ),
      className: "text-right"
    }
  ]

  return (
    <div className="space-y-6">
      <PageHeader 
        title="Cohorts" 
        description="Manage learner groups and facilitator assignments for this program."
        action={<Button className="gap-2"><Plus className="h-4 w-4" /> Create Cohort</Button>}
      />

      <Card>
        <CardContent className="p-0">
          <DataTable 
            data={cohorts} 
            columns={columns} 
            emptyMessage="No cohorts created yet." 
            className="border-0 rounded-none"
          />
        </CardContent>
      </Card>
    </div>
  )
}
