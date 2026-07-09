"use client"

/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from "react"
import { PageHeader } from "@/components/ui/PageHeader"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card"
import { getConsultantDashboard } from "@/lib/api"
import { useAuth } from "@/lib/auth/AuthContext"
import { Calendar, Users, AlertTriangle, MessageSquare, FileText, Target } from "lucide-react"

export default function ConsultantDashboardPage() {
  const { currentUser } = useAuth()
  const [data, setData] = React.useState<any>(null)

  React.useEffect(() => {
    if (currentUser) {
      getConsultantDashboard(currentUser.id).then(setData)
    }
  }, [currentUser])

  if (!data) return <PageHeader title="Loading..." />

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <PageHeader 
        title={`Welcome back, ${currentUser?.name}`}
        description="Here is your facilitation overview for today."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6 flex items-center space-x-4">
            <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
              <Calendar className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Today&apos;s Sessions</p>
              <h3 className="text-2xl font-bold">{data.todaySessions.length}</h3>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 flex items-center space-x-4">
            <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
              <Target className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Active Programs</p>
              <h3 className="text-2xl font-bold">{data.activeProgramsCount}</h3>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 flex items-center space-x-4">
            <div className="p-3 bg-red-100 dark:bg-red-900/30 rounded-lg">
              <AlertTriangle className="w-6 h-6 text-red-600 dark:text-red-400" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Cohorts Not Ready</p>
              <h3 className="text-2xl font-bold text-red-600">{data.cohortsNotReady}</h3>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 flex items-center space-x-4">
            <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-lg">
              <MessageSquare className="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Reflections to Review</p>
              <h3 className="text-2xl font-bold">{data.reflectionsToReview}</h3>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 flex items-center space-x-4">
            <div className="p-3 bg-orange-100 dark:bg-orange-900/30 rounded-lg">
              <FileText className="w-6 h-6 text-orange-600 dark:text-orange-400" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Pending Reports</p>
              <h3 className="text-2xl font-bold">{data.pendingReports}</h3>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 flex items-center space-x-4">
            <div className="p-3 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg">
              <Users className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Expansion Signals</p>
              <h3 className="text-2xl font-bold">{data.pendingSignals}</h3>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Today&apos;s Schedule</CardTitle>
        </CardHeader>
        <CardContent>
          {data.todaySessions.length === 0 ? (
            <p className="text-gray-500">No sessions scheduled for today.</p>
          ) : (
            <div className="space-y-4">
              {data.todaySessions.map((session: any) => (
                <div key={session.id} className="p-4 border rounded-lg flex justify-between items-center bg-gray-50 dark:bg-gray-800/50">
                  <div>
                    <h4 className="font-semibold">{session.title}</h4>
                    <p className="text-sm text-gray-500">
                      {new Date(session.scheduledAt).toLocaleTimeString()} - {session.durationMinutes} mins
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
