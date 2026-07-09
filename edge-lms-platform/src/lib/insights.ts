import { RecommendationTemplate, Role } from "@/types/schema"

export interface InsightResult {
  question: string
  template: RecommendationTemplate
}

export const STANDARD_QUESTIONS = [
  { code: "Q1", text: "What should this learner do in the next 30 days?" },
  { code: "Q2", text: "What should the manager reinforce?" },
  { code: "Q3", text: "What risks should we watch for?" },
  { code: "Q4", text: "What rituals should this team create?" },
  { code: "Q5", text: "How should this be communicated to leaders?" },
  { code: "Q6", text: "What is the most important behavior shift?" },
  { code: "Q7", text: "What follow-up activity should we assign?" },
  { code: "Q8", text: "What should the facilitator focus on?" },
  { code: "Q9", text: "What evidence suggests progress?" },
  { code: "Q10", text: "What should HR/L&D do after the program?" }
]

// Pure function engine - zero token matching
export function matchTemplate(
  templates: RecommendationTemplate[],
  questionCode: string,
  play: string,
  role: Role,
  challengeTag: string
): InsightResult | null {
  // 1. Filter by play, challenge tag, and question code
  const candidates = templates.filter(t => 
    t.questionCode === questionCode &&
    t.play === play &&
    t.challengeTag === challengeTag &&
    (t.audienceRole.includes(role) || t.audienceRole.includes("Any" as any))
  )

  if (candidates.length === 0) return null

  // 2. Score by specificity
  const scored = candidates.map(t => {
    let score = 0
    if (t.role === role) score += 10 // Exact role match is best
    if (t.role === "Any") score += 1
    return { template: t, score }
  })

  // 3. Return highest score
  scored.sort((a, b) => b.score - a.score)
  const bestMatch = scored[0].template

  const questionText = STANDARD_QUESTIONS.find(q => q.code === questionCode)?.text || questionCode

  return {
    question: questionText,
    template: bestMatch
  }
}
