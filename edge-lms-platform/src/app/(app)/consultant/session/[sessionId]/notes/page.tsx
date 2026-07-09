"use client"

/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from "react"
import { PageHeader } from "@/components/ui/PageHeader"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"
import { getSessionNotes, saveSessionNotes } from "@/lib/api"
import { useParams, useRouter } from "next/navigation"
import { ArrowLeft, Save, Check } from "lucide-react"

export default function SessionNotesPage() {
  const params = useParams()
  const sessionId = params.sessionId as string
  const router = useRouter()
  
  const [formData, setFormData] = React.useState({
    energyRating: 3,
    participationRating: 3,
    noteText: "",
    resistanceNoted: "",
    examplesHeard: "",
    commitmentsMade: "",
    risksIdentified: "",
    followUpNeeded: "",
    resourcesToSend: "",
    expansionSignalDetected: false,
    isInternalOnly: true
  })
  
  const [saving, setSaving] = React.useState(false)
  const [saved, setSaved] = React.useState(false)

  React.useEffect(() => {
    if (!sessionId) return
    getSessionNotes(sessionId).then(existing => {
      if (existing) {
        setFormData(prev => ({ ...prev, ...existing }))
      }
    })
  }, [sessionId])

  const handleChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    setSaved(false)
  }

  const handleSave = async () => {
    setSaving(true)
    await saveSessionNotes({ sessionId, ...formData })
    setSaving(false)
    setSaved(true)
  }

  return (
    <div className="space-y-6 max-w-4xl mx-auto py-8 animate-in fade-in duration-500">
      <div className="flex justify-between items-center">
        <div>
          <button onClick={() => router.back()} className="text-gray-500 hover:text-gray-900 flex items-center text-sm font-medium mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" /> Back
          </button>
          <PageHeader 
            title="Capture Session Notes" 
            description="Document qualitative observations and risks immediately after delivery."
          />
        </div>
        <Button onClick={handleSave} disabled={saving} className="bg-brand-blue hover:bg-blue-700">
          {saved ? <><Check className="w-4 h-4 mr-2" /> Saved</> : <><Save className="w-4 h-4 mr-2" /> Save Notes</>}
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Qualitative Ratings</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium mb-2">Energy Rating (1-5)</label>
            <input 
              type="range" min="1" max="5" 
              value={formData.energyRating} 
              onChange={e => handleChange("energyRating", parseInt(e.target.value))}
              className="w-full"
            />
            <div className="text-center font-bold text-brand-blue">{formData.energyRating}</div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Participation Rating (1-5)</label>
            <input 
              type="range" min="1" max="5" 
              value={formData.participationRating} 
              onChange={e => handleChange("participationRating", parseInt(e.target.value))}
              className="w-full"
            />
            <div className="text-center font-bold text-brand-blue">{formData.participationRating}</div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Session Observations</CardTitle>
            <div className="flex items-center space-x-2">
              <input 
                type="checkbox" 
                id="internalOnly" 
                checked={formData.isInternalOnly}
                onChange={e => handleChange("isInternalOnly", e.target.checked)}
                className="rounded border-gray-300"
              />
              <label htmlFor="internalOnly" className="text-sm font-medium text-red-600 dark:text-red-400">
                Internal Only (Hide from Client)
              </label>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">General Notes</label>
            <textarea 
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-brand-blue focus:ring-brand-blue dark:bg-gray-800 dark:border-gray-700 p-2"
              rows={3}
              value={formData.noteText}
              onChange={e => handleChange("noteText", e.target.value)}
              placeholder="Overall summary of the session..."
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Resistance Noted</label>
              <textarea 
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-brand-blue focus:ring-brand-blue dark:bg-gray-800 dark:border-gray-700 p-2"
                rows={2}
                value={formData.resistanceNoted}
                onChange={e => handleChange("resistanceNoted", e.target.value)}
                placeholder="Pushback or disagreements..."
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Examples Heard</label>
              <textarea 
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-brand-blue focus:ring-brand-blue dark:bg-gray-800 dark:border-gray-700 p-2"
                rows={2}
                value={formData.examplesHeard}
                onChange={e => handleChange("examplesHeard", e.target.value)}
                placeholder="Real stories shared by learners..."
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Commitments Made</label>
              <textarea 
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-brand-blue focus:ring-brand-blue dark:bg-gray-800 dark:border-gray-700 p-2"
                rows={2}
                value={formData.commitmentsMade}
                onChange={e => handleChange("commitmentsMade", e.target.value)}
                placeholder="What did they agree to try?"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 text-red-600">Risks Identified</label>
              <textarea 
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 dark:bg-gray-800 dark:border-gray-700 p-2"
                rows={2}
                value={formData.risksIdentified}
                onChange={e => handleChange("risksIdentified", e.target.value)}
                placeholder="Late arrivals, dropping out, toxicity..."
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Next Steps</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Follow-Up Needed</label>
              <textarea 
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-brand-blue focus:ring-brand-blue dark:bg-gray-800 dark:border-gray-700 p-2"
                rows={2}
                value={formData.followUpNeeded}
                onChange={e => handleChange("followUpNeeded", e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Resources to Send</label>
              <textarea 
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-brand-blue focus:ring-brand-blue dark:bg-gray-800 dark:border-gray-700 p-2"
                rows={2}
                value={formData.resourcesToSend}
                onChange={e => handleChange("resourcesToSend", e.target.value)}
              />
            </div>
          </div>

          <div className="pt-4 border-t flex items-center space-x-2">
            <input 
              type="checkbox" 
              id="expansion" 
              checked={formData.expansionSignalDetected}
              onChange={e => handleChange("expansionSignalDetected", e.target.checked)}
              className="rounded border-gray-300 text-brand-green focus:ring-brand-green"
            />
            <label htmlFor="expansion" className="text-sm font-bold text-brand-green">
              Expansion Signal Detected (I will log a detailed signal after this)
            </label>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
