"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"
import { ProgressBar } from "@/components/ui/ProgressBar"
import { getQuizForLesson, submitQuizAttempt, getQuizAttempts } from "@/lib/api"
import { CheckCircle, XCircle, RotateCcw, ArrowRight } from "lucide-react"

export function QuizPlayer({ lessonId, userId, onComplete }: { lessonId: string, userId: string, onComplete: () => void }) {
  const [quiz, setQuiz] = useState<any>(null)
  const [attempts, setAttempts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  
  // State: "intro" | "taking" | "review" | "results"
  const [stage, setStage] = useState<"intro" | "taking" | "review" | "results">("intro")
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0)
  const [answers, setAnswers] = useState<number[]>([]) // indexes of selected options
  
  const [results, setResults] = useState<any>(null)
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    async function load() {
      const q = await getQuizForLesson(lessonId)
      if (q) {
        setQuiz(q)
        setAnswers(new Array(q.questions.length).fill(-1))
        
        const past = await getQuizAttempts(userId, q.id)
        setAttempts(past)
        
        // If they already passed, we might just show results, but let's let them retake if they want
        // or just show intro with "You have passed this quiz"
      }
      setLoading(false)
    }
    load()
  }, [lessonId, userId])

  if (loading) {
    return <div className="py-8 text-center text-brand-neutral animate-pulse">Loading Quiz...</div>
  }

  if (!quiz || quiz.questions.length === 0) {
    return <div className="py-8 text-center text-brand-neutral">No quiz questions available.</div>
  }

  const handleStart = () => {
    setStage("taking")
    setCurrentQuestionIdx(0)
    setAnswers(new Array(quiz.questions.length).fill(-1))
  }

  const handleSelectOption = (optIndex: number) => {
    const newAnswers = [...answers]
    newAnswers[currentQuestionIdx] = optIndex
    setAnswers(newAnswers)
  }

  const handleNext = () => {
    if (currentQuestionIdx < quiz.questions.length - 1) {
      setCurrentQuestionIdx(currentQuestionIdx + 1)
    } else {
      setStage("review")
    }
  }

  const handlePrev = () => {
    if (currentQuestionIdx > 0) {
      setCurrentQuestionIdx(currentQuestionIdx - 1)
    }
  }

  const handleSubmit = async () => {
    setSubmitting(true)
    const res = await submitQuizAttempt(userId, quiz.id, answers)
    setResults(res)
    setStage("results")
    setSubmitting(false)
  }

  if (stage === "intro") {
    const highestScore = attempts.length > 0 ? Math.max(...attempts.map(a => a.score)) : null
    const passed = attempts.some(a => a.passed)

    return (
      <Card className="max-w-2xl mx-auto shadow-sm">
        <CardHeader className="text-center pb-2">
          <CardTitle className="text-2xl text-brand-blue">{quiz.title}</CardTitle>
          <p className="text-brand-neutral mt-2">
            This quiz has {quiz.questions.length} questions. You need {quiz.passingScore}% to pass.
          </p>
        </CardHeader>
        <CardContent className="flex flex-col items-center pt-6">
          {highestScore !== null && (
            <div className={`mb-6 p-4 rounded-lg w-full text-center ${passed ? 'bg-brand-green/10 text-brand-green' : 'bg-red-50 text-red-600'}`}>
              <p className="font-medium text-lg">Your highest score: {highestScore}%</p>
              <p className="text-sm mt-1">{passed ? 'You have passed this quiz.' : 'You have not passed yet.'}</p>
            </div>
          )}
          
          <Button onClick={handleStart} size="lg" className="w-full sm:w-auto px-12">
            {attempts.length > 0 ? "Retake Quiz" : "Start Quiz"}
          </Button>

          {attempts.length > 0 && (
            <div className="mt-8 w-full border-t border-gray-100 pt-6">
              <h4 className="text-sm font-semibold text-brand-dark-grey mb-3 uppercase tracking-wider">Previous Attempts</h4>
              <div className="space-y-2">
                {attempts.slice(0, 5).map(a => (
                  <div key={a.id} className="flex justify-between items-center text-sm py-2 px-3 bg-gray-50 rounded">
                    <span className="text-brand-neutral">{new Date(a.attemptedAt).toLocaleDateString()}</span>
                    <span className={`font-medium ${a.passed ? 'text-brand-green' : 'text-red-500'}`}>
                      {a.score}% - {a.passed ? 'Pass' : 'Fail'}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    )
  }

  if (stage === "taking") {
    const question = quiz.questions[currentQuestionIdx]
    const progress = Math.round(((currentQuestionIdx) / quiz.questions.length) * 100)
    const selectedAns = answers[currentQuestionIdx]

    return (
      <div className="max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-300">
        <div className="mb-6">
          <div className="flex justify-between text-sm font-medium text-brand-neutral mb-2">
            <span>Question {currentQuestionIdx + 1} of {quiz.questions.length}</span>
            <span>{progress}%</span>
          </div>
          <ProgressBar value={progress} />
        </div>

        <Card className="shadow-sm border-gray-200">
          <CardHeader className="pb-4">
            <h3 className="text-xl font-medium text-brand-dark-grey leading-snug">
              {question.questionText}
            </h3>
          </CardHeader>
          <CardContent className="space-y-3">
            {question.options.map((opt: string, idx: number) => {
              const isSelected = selectedAns === idx
              return (
                <div 
                  key={idx}
                  onClick={() => handleSelectOption(idx)}
                  className={`border rounded-lg p-4 cursor-pointer transition-all ${
                    isSelected 
                      ? 'border-brand-blue bg-brand-blue/5 ring-2 ring-brand-blue/20' 
                      : 'border-gray-200 hover:border-brand-blue/50 hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-5 h-5 rounded-full border flex items-center justify-center flex-shrink-0 ${isSelected ? 'border-brand-blue bg-brand-blue' : 'border-gray-300'}`}>
                      {isSelected && <div className="w-2 h-2 rounded-full bg-white" />}
                    </div>
                    <span className={`text-[15px] ${isSelected ? 'text-brand-blue font-medium' : 'text-brand-dark-grey'}`}>
                      {opt}
                    </span>
                  </div>
                </div>
              )
            })}
          </CardContent>
        </Card>

        <div className="flex justify-between mt-6">
          <Button variant="outline" onClick={handlePrev} disabled={currentQuestionIdx === 0}>
            Previous
          </Button>
          <Button onClick={handleNext} disabled={selectedAns === -1} className="bg-brand-blue hover:bg-brand-blue/90 text-white">
            {currentQuestionIdx === quiz.questions.length - 1 ? 'Review Answers' : 'Next Question'}
          </Button>
        </div>
      </div>
    )
  }

  if (stage === "review") {
    return (
      <div className="max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-300">
        <h2 className="text-2xl font-semibold text-brand-dark-grey mb-6 text-center">Review Your Answers</h2>
        
        <div className="space-y-4 mb-8">
          {quiz.questions.map((q: any, i: number) => (
            <div key={q.id} className="border border-gray-200 rounded-lg p-4 bg-white shadow-sm flex items-start gap-4">
              <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center font-semibold text-brand-neutral flex-shrink-0">
                {i + 1}
              </div>
              <div>
                <p className="font-medium text-brand-dark-grey mb-2">{q.questionText}</p>
                <p className="text-sm text-brand-blue bg-brand-blue/5 inline-block px-3 py-1.5 rounded border border-brand-blue/20">
                  {q.options[answers[i]]}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-between items-center bg-gray-50 p-4 rounded-lg border border-gray-200">
          <Button variant="ghost" onClick={() => setStage("taking")}>
            Go Back
          </Button>
          <Button 
            onClick={handleSubmit} 
            disabled={submitting}
            className="bg-brand-blue hover:bg-brand-blue/90 text-white min-w-[150px]"
          >
            {submitting ? 'Submitting...' : 'Submit Quiz'}
          </Button>
        </div>
      </div>
    )
  }

  if (stage === "results" && results) {
    const isPass = results.passed

    return (
      <div className="max-w-2xl mx-auto animate-in fade-in zoom-in-95 duration-500">
        <Card className={`border-2 ${isPass ? 'border-brand-green/30 shadow-brand-green/10' : 'border-red-200 shadow-red-100/50'} shadow-lg mb-8`}>
          <CardContent className="flex flex-col items-center pt-8 pb-8 text-center">
            
            <div className={`relative w-40 h-40 rounded-full flex items-center justify-center mb-6 border-8 ${isPass ? 'border-brand-green/20' : 'border-red-100'}`}>
              <svg className="absolute inset-0 w-full h-full transform -rotate-90">
                <circle cx="72" cy="72" r="68" fill="none" stroke="currentColor" strokeWidth="8" className={isPass ? 'text-brand-green' : 'text-red-500'} strokeDasharray="427" strokeDashoffset={427 - (427 * results.score) / 100} style={{ transition: 'stroke-dashoffset 1s ease-out' }} />
              </svg>
              <div className="flex flex-col items-center">
                <span className={`text-5xl font-bold ${isPass ? 'text-brand-green' : 'text-red-500'}`}>{results.score}%</span>
              </div>
            </div>

            <h2 className="text-3xl font-bold mb-2 text-brand-dark-grey">
              {isPass ? 'Congratulations!' : 'Keep Trying!'}
            </h2>
            <p className="text-lg text-brand-neutral mb-8">
              You scored {results.correct} out of {results.total}. Passing score is {quiz.passingScore}%.
            </p>

            {isPass ? (
              <Button onClick={onComplete} size="lg" className="bg-brand-green hover:bg-brand-green/90 text-white px-8 gap-2">
                Continue to Next Lesson <ArrowRight className="w-4 h-4" />
              </Button>
            ) : (
              <Button onClick={handleStart} size="lg" variant="outline" className="px-8 gap-2 border-brand-blue text-brand-blue hover:bg-brand-blue/5">
                <RotateCcw className="w-4 h-4" /> Retake Quiz
              </Button>
            )}
          </CardContent>
        </Card>

        <h3 className="text-xl font-semibold mb-4 text-brand-dark-grey">Detailed Feedback</h3>
        <div className="space-y-4">
          {results.questions.map((q: any, i: number) => {
            const isCorrect = answers[i] === q.correctIndex
            return (
              <Card key={q.id} className={`overflow-hidden border-l-4 ${isCorrect ? 'border-l-brand-green' : 'border-l-red-500'}`}>
                <CardContent className="p-5">
                  <div className="flex gap-3 mb-3">
                    {isCorrect ? (
                      <CheckCircle className="w-6 h-6 text-brand-green flex-shrink-0 mt-0.5" />
                    ) : (
                      <XCircle className="w-6 h-6 text-red-500 flex-shrink-0 mt-0.5" />
                    )}
                    <div>
                      <p className="font-medium text-brand-dark-grey">{q.questionText}</p>
                    </div>
                  </div>
                  
                  <div className="ml-9 space-y-3">
                    <div className="bg-gray-50 rounded p-3 text-sm">
                      <span className="text-brand-neutral block mb-1 text-xs uppercase tracking-wider font-semibold">Your Answer</span>
                      <span className={`${isCorrect ? 'text-brand-green font-medium' : 'text-red-500 font-medium'}`}>
                        {q.options[answers[i]]}
                      </span>
                    </div>

                    {!isCorrect && (
                      <div className="bg-brand-green/5 border border-brand-green/20 rounded p-3 text-sm">
                        <span className="text-brand-green block mb-1 text-xs uppercase tracking-wider font-semibold">Correct Answer</span>
                        <span className="text-brand-dark-grey font-medium">
                          {q.options[q.correctIndex]}
                        </span>
                      </div>
                    )}

                    {q.explanationText && (
                      <div className="bg-blue-50/50 rounded p-3 text-sm text-brand-dark-grey italic border-l-2 border-brand-blue/30">
                        {q.explanationText}
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    )
  }

  return null
}
