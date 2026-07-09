"use client"

import * as React from "react"
import { PageHeader } from "@/components/ui/PageHeader"
import { Card, CardContent } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"
import Link from "next/link"
import { Lightbulb, ArrowRight, Target, Users } from "lucide-react"

export default function InsightsLibraryPage() {
  const plays = [
    {
      id: "play_ftm",
      title: "First-Time Managers",
      description: "Navigating the transition from peer to leader, focusing on delegation and feedback.",
      challenges: ["Delegation", "Giving Critical Feedback", "Time Management"],
      roles: ["Learner", "Consultant"],
      color: "bg-blue-50 text-blue-700"
    },
    {
      id: "play_disc",
      title: "DiSC & Communication",
      description: "Adapting communication styles for high-stakes conversations and conflict resolution.",
      challenges: ["Handling Conflict", "Selling to High-D", "Supporting High-S"],
      roles: ["Learner", "Consultant"],
      color: "bg-green-50 text-green-700"
    }
  ]

  return (
    <div className="space-y-6 animate-in fade-in duration-500 max-w-5xl">
      <div className="flex flex-col md:flex-row justify-between md:items-end gap-4 border-b border-gray-200 dark:border-gray-800 pb-6">
        <div>
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-purple-100 text-purple-700 text-xs font-semibold mb-4">
            <Lightbulb className="w-4 h-4 mr-1.5" />
            Guided Insight Engine
          </div>
          <PageHeader
            title="Insight Library"
            description="Select a play to access contextual, role-specific recommendations and action plans."
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {plays.map(play => (
          <Card key={play.id} className="flex flex-col h-full hover:shadow-md transition-shadow">
            <CardContent className="p-6 flex flex-col h-full">
              <div className="flex items-start justify-between mb-4">
                <div className={`px-3 py-1 rounded-md text-sm font-medium ${play.color}`}>
                  {play.title}
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-400 mb-6 flex-grow">{play.description}</p>
              
              <div className="space-y-4 mb-6">
                <div>
                  <p className="text-xs font-medium text-gray-500 uppercase flex items-center mb-2">
                    <Target className="w-3.5 h-3.5 mr-1" /> Key Challenges
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {play.challenges.map(c => (
                      <span key={c} className="px-2.5 py-1 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 text-xs rounded-full">
                        {c}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-xs font-medium text-gray-500 uppercase flex items-center mb-2">
                    <Users className="w-3.5 h-3.5 mr-1" /> Supported Roles
                  </p>
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    {play.roles.join(", ")}
                  </p>
                </div>
              </div>

              <Link href={`/insights/ask-guided?play=${encodeURIComponent(play.title)}`} className="mt-auto">
                <Button className="w-full justify-between bg-brand-blue hover:bg-blue-700">
                  Explore Insights <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
