"use client"

import * as React from "react"
import { PageHeader } from "@/components/ui/PageHeader"
import { Card, CardContent } from "@/components/ui/Card"
import { DataTable } from "@/components/ui/DataTable"
import { SearchInput } from "@/components/ui/SearchInput"
import { Modal } from "@/components/ui/Modal"
import { Button } from "@/components/ui/Button"
import { Loader2 } from "lucide-react"

export default function LearnersPage() {
  const [learners, setLearners] = React.useState<any[]>([])
  const [search, setSearch] = React.useState("")
  const [loading, setLoading] = React.useState(true)

  const [deletingId, setDeletingId] = React.useState<string | null>(null)
  const [removalTarget, setRemovalTarget] = React.useState<any>(null)
  const [isRemoving, setIsRemoving] = React.useState(false)

  React.useEffect(() => {
    fetch("/api/users?role=Learner")
      .then(res => res.json())
      .then(data => {
        setLearners(data.users || [])
        setLoading(false)
      })
      .catch(err => {
        console.error(err)
        setLoading(false)
      })
  }, [])

  const filtered = learners.filter(u => 
    (u.name || "").toLowerCase().includes(search.toLowerCase()) || 
    (u.email || "").toLowerCase().includes(search.toLowerCase())
  )

  const confirmRemoval = async () => {
    if (!removalTarget) return;
    
    setIsRemoving(true)
    setDeletingId(removalTarget.id)
    
    try {
      const res = await fetch(`/api/users?id=${removalTarget.id}`, {
        method: "DELETE"
      });
      if (res.ok) {
        setTimeout(() => {
          setLearners(prev => prev.filter(u => u.id !== removalTarget.id))
          setDeletingId(null)
        }, 300)
      } else {
        alert("Failed to remove learner.")
        setDeletingId(null)
      }
    } catch (err) {
      console.error(err)
      alert("Error removing learner.")
      setDeletingId(null)
    } finally {
      setIsRemoving(false)
      setRemovalTarget(null)
    }
  }

  const columns = [
    { 
      header: "Learner Name", 
      accessor: (row: any) => <span className="font-medium text-brand-blue">{row.name}</span>
    },
    { 
      header: "Email ID", 
      accessor: (row: any) => row.email 
    },
    { 
      header: "Courses Enrolled", 
      accessor: (row: any) => {
        if (!row.enrollments || row.enrollments.length === 0) return "None";
        return row.enrollments.map((e: any) => e.programInstance?.name).filter(Boolean).join(", ");
      }
    },
    { 
      header: "Company", 
      accessor: (row: any) => row.company?.name || "No Company" 
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
    <div className="space-y-6 animate-in fade-in duration-500 max-w-5xl mx-auto p-6">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Enrollments</h1>
          <p className="text-gray-500 mt-2">Manage all learner accounts across the platform.</p>
        </div>
      </div>

      <Card>
        <div className="p-4 border-b border-gray-50">
          <SearchInput placeholder="Search learners by name or email..." onChange={setSearch} className="max-w-md" />
        </div>
        <CardContent className="p-0">
          {loading ? (
            <div className="p-8 text-center"><Loader2 className="mx-auto h-6 w-6 animate-spin text-gray-400" /></div>
          ) : (
            <DataTable 
              data={filtered} 
              columns={columns} 
              emptyMessage="No learners found." 
              className="border-0 rounded-none"
              rowClassName={(row) => deletingId === row.id ? "opacity-0 scale-95 pointer-events-none" : "opacity-100 scale-100"}
            />
          )}
        </CardContent>
      </Card>

      <Modal open={!!removalTarget} onClose={() => setRemovalTarget(null)} title="Remove Learner">
        <div className="space-y-6">
          <p className="text-sm text-brand-dark-grey">
            Are you sure you want to permanently remove <span className="font-semibold text-brand-blue">{removalTarget?.name}</span>?
          </p>
          <p className="text-sm text-brand-neutral">
            This will delete their account and all associated progress. This action cannot be undone.
          </p>
          <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
            <Button variant="outline" onClick={() => setRemovalTarget(null)} disabled={isRemoving}>
              Cancel
            </Button>
            <Button className="bg-red-500 hover:bg-red-600 text-white" onClick={confirmRemoval} disabled={isRemoving}>
              {isRemoving ? "Removing..." : "Remove Learner"}
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  )
}
