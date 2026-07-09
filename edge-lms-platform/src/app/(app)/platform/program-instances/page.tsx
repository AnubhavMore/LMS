"use client"

/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from "react"
import { getPlatformEnrollments } from "@/lib/api"
import { PageHeader } from "@/components/ui/PageHeader"
import { Card, CardContent } from "@/components/ui/Card"
import { DataTable } from "@/components/ui/DataTable"
import { SearchInput } from "@/components/ui/SearchInput"
import { Modal } from "@/components/ui/Modal"
import { Button } from "@/components/ui/Button"

export default function PlatformProgramInstancesPage() {
  const [enrollments, setEnrollments] = React.useState<any[]>([])
  const [search, setSearch] = React.useState("")
  const [loading, setLoading] = React.useState(true)

  const [deletingId, setDeletingId] = React.useState<string | null>(null)
  const [removalTarget, setRemovalTarget] = React.useState<any>(null)
  const [isRemoving, setIsRemoving] = React.useState(false)

  React.useEffect(() => {
    getPlatformEnrollments().then((data) => {
      setEnrollments(data)
      setLoading(false)
    })
  }, [])

  const filtered = enrollments.filter(e => {
    const userName = e.user?.name || ""
    const userEmail = e.user?.email || ""
    const companyName = e.user?.company?.name || ""
    const courseName = e.programInstance?.name || ""
    const query = search.toLowerCase()
    
    return userName.toLowerCase().includes(query) || 
           userEmail.toLowerCase().includes(query) ||
           companyName.toLowerCase().includes(query) ||
           courseName.toLowerCase().includes(query)
  })

  const confirmRemoval = async () => {
    if (!removalTarget) return;
    
    setIsRemoving(true)
    setDeletingId(removalTarget.id)
    
    try {
      const res = await fetch(`/api/enroll?id=${removalTarget.id}`, {
        method: "DELETE"
      });
      if (res.ok) {
        // Wait a tiny bit for the opacity transition before removing from array
        setTimeout(() => {
          setEnrollments(prev => prev.filter(e => e.id !== removalTarget.id))
          setDeletingId(null)
        }, 300)
      } else {
        alert("Failed to de-allocate course.")
        setDeletingId(null)
      }
    } catch (err) {
      console.error(err)
      alert("Error removing course allocation.")
      setDeletingId(null)
    } finally {
      setIsRemoving(false)
      setRemovalTarget(null)
    }
  }

  const columns = [
    { 
      header: "User Name", 
      accessor: (row: any) => row.user?.name || "Unknown"
    },
    { 
      header: "Email ID", 
      accessor: (row: any) => row.user?.email || "Unknown"
    },
    { 
      header: "Course Allotted", 
      accessor: (row: any) => row.programInstance?.name || "Unknown Course"
    },
    { 
      header: "Company Name", 
      accessor: (row: any) => row.user?.company?.name || "No Company"
    },
    {
      header: "Action",
      accessor: (row: any) => (
        <button 
          onClick={() => setRemovalTarget(row)}
          disabled={deletingId === row.id}
          className="text-red-500 hover:text-red-700 text-sm font-medium disabled:opacity-50 transition-opacity"
        >
          {deletingId === row.id ? "Removing..." : "Remove"}
        </button>
      ),
      className: "text-right w-24"
    }
  ]

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <PageHeader 
        title="Program Instances" 
        description="View the details of all users, their allotted courses, and company associations."
      />

      <Card>
        <div className="p-4 border-b border-gray-50">
          <SearchInput placeholder="Search users, emails, courses, or companies..." onChange={setSearch} className="max-w-md" />
        </div>
        <CardContent className="p-0">
          {loading ? (
            <div className="p-8 text-center text-brand-neutral">Loading...</div>
          ) : (
            <DataTable 
              data={filtered} 
              columns={columns} 
              emptyMessage="No enrollments found." 
              className="border-0 rounded-none"
              rowClassName={(row) => deletingId === row.id ? "opacity-0 scale-95 pointer-events-none" : "opacity-100 scale-100"}
            />
          )}
        </CardContent>
      </Card>

      <Modal open={!!removalTarget} onClose={() => setRemovalTarget(null)} title="Remove Course Allocation">
        <div className="space-y-6">
          <p className="text-sm text-brand-dark-grey">
            Are you sure you want to de-allocate <span className="font-semibold text-brand-blue">{removalTarget?.programInstance?.name || "this course"}</span> from <span className="font-semibold">{removalTarget?.user?.name}</span>?
          </p>
          <p className="text-sm text-brand-neutral">
            This will permanently remove their access to this course and all associated progress records.
          </p>
          <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
            <Button variant="outline" onClick={() => setRemovalTarget(null)} disabled={isRemoving}>
              Cancel
            </Button>
            <Button variant="destructive" className="bg-red-500 hover:bg-red-600 text-white" onClick={confirmRemoval} disabled={isRemoving}>
              {isRemoving ? "Removing..." : "Remove Course"}
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  )
}
