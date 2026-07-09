"use client"

/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from "react"
import { PageHeader } from "@/components/ui/PageHeader"
import { DataTable } from "@/components/ui/DataTable"
import { StatusBadge } from "@/components/ui/StatusBadge"
import { getConsultantPrograms } from "@/lib/api"
import { useAuth } from "@/lib/auth/AuthContext"
import Link from "next/link"
import { ExternalLink } from "lucide-react"

export default function ConsultantProgramsPage() {
  const { currentUser } = useAuth()
  const [programs, setPrograms] = React.useState<any[]>([])

  React.useEffect(() => {
    if (currentUser) {
      getConsultantPrograms(currentUser.id).then(setPrograms)
    }
  }, [currentUser])

  const columns = [
    { header: "Company", accessor: "companyName" },
    { header: "Program Title", accessor: "title" },
    { header: "Template", accessor: "templateName" },
    { 
      header: "Status", 
      accessor: "status",
      cell: (val: string) => <StatusBadge status={val as any} />
    },
    {
      header: "Action",
      accessor: "id",
      cell: (id: string) => (
        <Link href={`/consultant/program/${id}/overview`} className="text-brand-blue flex items-center hover:underline">
          Workspace <ExternalLink className="w-4 h-4 ml-1" />
        </Link>
      )
    }
  ]

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <PageHeader 
        title="My Programs" 
        description="Programs assigned to you for delivery and facilitation."
      />

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700">
        <DataTable data={programs} columns={columns} />
      </div>
    </div>
  )
}
