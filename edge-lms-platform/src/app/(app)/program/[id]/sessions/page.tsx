"use client"

/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from "react"
import { getProgramSessions } from "@/lib/api"
import { PageHeader } from "@/components/ui/PageHeader"
import { Card, CardContent } from "@/components/ui/Card"
import { DataTable } from "@/components/ui/DataTable"
import { Button } from "@/components/ui/Button"
import { CalendarPlus, Video } from "lucide-react"
import { useParams } from "next/navigation"

export default function ProgramSessionsPage() {
  const params = useParams()
  const id = params.id as string
  const [sessions, setSessions] = React.useState<any[]>([])

  React.useEffect(() => {
    if (!id) return
    getProgramSessions(id).then(setSessions)
  }, [id])

  const columns = [
    { header: "Session Title", accessor: "title" },
    { header: "Cohort", accessor: "cohortName" },
    { 
      header: "Scheduled At", 
      accessor: (row: any) => new Date(row.scheduledAt).toLocaleString() 
    },
    { 
      header: "Duration", 
      accessor: (row: any) => `${row.durationMinutes || 60} min` 
    },
    { 
      header: "Meeting Link", 
      accessor: (row: any) => row.meetingLink ? (
        <a href={row.meetingLink} target="_blank" rel="noreferrer" className="text-brand-blue flex items-center gap-1 hover:underline">
          <Video className="h-3 w-3" /> Join
        </a>
      ) : <span className="text-brand-neutral text-sm italic">Not set</span>
    },
    { 
      header: "Actions", 
      accessor: () => (
        <Button variant="ghost" size="sm" className="text-brand-blue">Edit</Button>
      ),
      className: "text-right"
    }
  ]

  return (
    <div className="space-y-6">
      <PageHeader 
        title="Live Sessions" 
        description="Schedule and manage live workshops for all cohorts."
        action={<Button className="gap-2"><CalendarPlus className="h-4 w-4" /> Schedule Session</Button>}
      />

      <Card>
        <CardContent className="p-0">
          <DataTable 
            data={sessions} 
            columns={columns} 
            emptyMessage="No sessions scheduled yet." 
            className="border-0 rounded-none"
          />
        </CardContent>
      </Card>
    </div>
  )
}
