"use client"

/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from "react"
import { PageHeader } from "@/components/ui/PageHeader"
import { DataTable } from "@/components/ui/DataTable"
import { Button } from "@/components/ui/Button"
import { CalendarDays, Edit3 } from "lucide-react"
import { getProgramSessions } from "@/lib/api"
import { useParams } from "next/navigation"
import Link from "next/link"

export default function ConsultantProgramSessionsPage() {
  const params = useParams()
  const id = params.id as string
  const [sessions, setSessions] = React.useState<any[]>([])

  React.useEffect(() => {
    if (!id) return
    getProgramSessions(id).then(setSessions)
  }, [id])

  const columns = [
    { header: "Session Title", accessor: "title" },
    { 
      header: "Scheduled", 
      accessor: "scheduledAt",
      cell: (val: string) => new Date(val).toLocaleString() 
    },
    { header: "Duration", accessor: "durationMinutes", cell: (val: number) => `${val} min` },
    {
      header: "Actions",
      accessor: "id",
      cell: (sessionId: string) => (
        <div className="flex space-x-2">
          <Button variant="outline" size="sm">
            <CalendarDays className="w-4 h-4 mr-2" /> Start Session
          </Button>
          <Link href={`/consultant/session/${sessionId}/notes`}>
            <Button variant="secondary" size="sm">
              <Edit3 className="w-4 h-4 mr-2" /> Capture Notes
            </Button>
          </Link>
        </div>
      )
    }
  ]

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <PageHeader 
        title="Delivery Sessions" 
        description="Launch live sessions and capture qualitative notes post-delivery."
      />

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700">
        <DataTable data={sessions} columns={columns} />
        {sessions.length === 0 && (
          <div className="p-8 text-center text-gray-500">
            No sessions scheduled yet for this program.
          </div>
        )}
      </div>
    </div>
  )
}
