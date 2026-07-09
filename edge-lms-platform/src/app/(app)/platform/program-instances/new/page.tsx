"use client"

import * as React from "react"
import { PageHeader } from "@/components/ui/PageHeader"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"
import Link from "next/link"
import { ArrowLeft, Save } from "lucide-react"

export default function NewProgramInstancePage() {
  return (
    <div className="space-y-6 max-w-3xl animate-in fade-in duration-500">
      <div className="flex items-center gap-2 text-sm text-brand-neutral mb-2">
        <Link href="/platform/program-instances" className="flex items-center gap-1 hover:text-brand-blue">
          <ArrowLeft className="h-4 w-4" /> Back to Programs
        </Link>
      </div>

      <PageHeader 
        title="Create Program Instance" 
        description="Initialize a new delivery program linked to a client and template."
      />

      <Card>
        <CardHeader>
          <CardTitle>Program Details</CardTitle>
          <CardDescription>Basic information for the delivery operating system.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-brand-dark-grey">Program Name</label>
              <input type="text" className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm" placeholder="e.g., Acme Q4 Leadership" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-brand-dark-grey">Edge10 Opportunity ID</label>
              <input type="text" className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm" placeholder="e.g., OPP-12345" />
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-brand-dark-grey">Client Company</label>
              <select className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm bg-white">
                <option value="">Select a company...</option>
                <option value="comp_acme">Acme Corp</option>
                <option value="comp_globex">Globex Inc</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-brand-dark-grey">Program Template</label>
              <select className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm bg-white">
                <option value="">Select a curriculum template...</option>
                <option value="pt_ftm">First-Time Managers</option>
                <option value="pt_disc">Sales DiSC</option>
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-brand-dark-grey">Delivery Owner</label>
            <select className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm bg-white">
              <option value="">Select internal owner...</option>
              <option value="usr_sa_01">Jane Doe (Strengthscape Admin)</option>
            </select>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end gap-3">
        <Link href="/platform/program-instances">
          <Button variant="outline">Cancel</Button>
        </Link>
        <Link href="/program/pi_acme_ftm_01/overview">
          <Button className="gap-2"><Save className="h-4 w-4" /> Save & Initialize Workspace</Button>
        </Link>
      </div>
    </div>
  )
}
