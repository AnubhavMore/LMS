"use client"

import { useState, useEffect, useRef } from "react"
import { Sparkles, X, Send } from "lucide-react"
import { cn } from "@/lib/utils"
import ReactMarkdown from 'react-markdown'

interface CopilotChatProps {
  userId: string
  courseId: string
  courseTitle: string
  activeLesson: any
  modules?: any[]
}

export function CopilotChat({ userId, courseId, courseTitle, activeLesson, modules = [] }: CopilotChatProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [threadId, setThreadId] = useState<string | null>(null)
  const [messages, setMessages] = useState<any[]>([])
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [suggestedFollowUps, setSuggestedFollowUps] = useState<string[]>(["Summarize this lesson", "Quiz me", "I'm stuck"])
  
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Auto-scroll
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [messages, isTyping, isOpen])

  // Fetch or create thread on load
  useEffect(() => {
    async function initThread() {
      try {
        const res = await fetch(`/api/copilot/thread?userId=${userId}&courseId=${courseId}`)
        const threads = await res.json()
        if (threads && threads.length > 0) {
          setThreadId(threads[0].id)
          // Ideally fetch messages for this thread here, but omitting for simplicity in mock
        } else {
          const createRes = await fetch('/api/copilot/thread', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userId, courseId, title: courseTitle })
          })
          const newThread = await createRes.json()
          setThreadId(newThread.id)
        }
      } catch (error) {
        console.error("Failed to init thread", error)
      }
    }
    if (userId && courseId) {
      initThread()
    }
  }, [userId, courseId, courseTitle])

  const handleSendMessage = async (text: string) => {
    if (!text.trim() || !threadId) return

    const newMessage = { role: "user", content: text, createdAt: new Date().toISOString() }
    setMessages(prev => [...prev, newMessage])
    setInputValue("")
    setIsTyping(true)
    setSuggestedFollowUps([])

    try {
      const res = await fetch('/api/copilot/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          threadId,
          userId,
          message: text,
          courseContext: {
            courseId,
            courseTitle,
            lessonId: activeLesson.id,
            lessonTitle: activeLesson.title,
            lessonContent: activeLesson.contentMarkdown,
            lessonType: activeLesson.type,
            keyTakeaway: activeLesson.keyTakeaway,
            modules
          }
        })
      })
      
      const data = await res.json()
      
      if (data.assistantMessage) {
        setMessages(prev => [...prev, data.assistantMessage])
      }
      if (data.suggestedFollowUps) {
        setSuggestedFollowUps(data.suggestedFollowUps)
      }
    } catch (error) {
      console.error("Failed to send message", error)
      setMessages(prev => [...prev, { 
        role: "assistant", 
        content: "Sorry, I'm having trouble connecting right now. Please try again later.",
        createdAt: new Date().toISOString()
      }])
    } finally {
      setIsTyping(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage(inputValue)
    }
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      
      {/* Chat Panel */}
      <div 
        className={cn(
          "transition-all duration-300 transform origin-bottom-right flex flex-col overflow-hidden mb-4",
          "w-[90vw] sm:w-96 h-[520px] max-h-[80vh]",
          "bg-white/95 backdrop-blur-xl border border-white/40 shadow-2xl rounded-2xl",
          isOpen ? "scale-100 opacity-100" : "scale-90 opacity-0 pointer-events-none absolute bottom-16 right-0"
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-100 bg-gradient-to-r from-brand-blue/5 to-indigo-600/5">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-brand-blue to-indigo-600 flex items-center justify-center text-white">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-semibold text-brand-dark-grey text-sm">Learner Copilot</h3>
              <p className="text-xs text-brand-neutral truncate max-w-[200px]">
                {activeLesson?.title ? `Lesson: ${activeLesson.title}` : "AI Assistant"}
              </p>
            </div>
          </div>
          <button 
            onClick={() => setIsOpen(false)}
            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Message Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50/50">
          {messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center space-y-4 opacity-80 mt-8">
              <div className="w-16 h-16 bg-brand-blue/10 rounded-full flex items-center justify-center">
                <Sparkles className="w-8 h-8 text-brand-blue" />
              </div>
              <div>
                <p className="text-brand-dark-grey font-medium">Hi! I'm your learning copilot.</p>
                <p className="text-sm text-brand-neutral mt-1 px-4">Ask me anything about "{activeLesson?.title || 'this course'}"</p>
              </div>
            </div>
          ) : (
            messages.map((msg, i) => (
              <div key={i} className={cn("flex flex-col max-w-[85%]", msg.role === "user" ? "ml-auto items-end" : "mr-auto items-start")}>
                <div 
                  className={cn(
                    "px-4 py-2.5 rounded-2xl text-[15px] leading-relaxed",
                    msg.role === "user" 
                      ? "bg-brand-blue text-white rounded-br-sm" 
                      : "bg-white border border-gray-100 shadow-sm text-brand-dark-grey rounded-bl-sm prose prose-sm prose-p:my-1 prose-ul:my-1"
                  )}
                >
                  {msg.role === "user" ? (
                    msg.content
                  ) : (
                    <ReactMarkdown>{msg.content}</ReactMarkdown>
                  )}
                </div>
                {msg.createdAt && (
                  <span className="text-[10px] text-gray-400 mt-1 px-1">
                    {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                )}
              </div>
            ))
          )}
          
          {isTyping && (
            <div className="flex flex-col max-w-[85%] mr-auto items-start">
              <div className="px-4 py-3.5 bg-white border border-gray-100 shadow-sm text-brand-dark-grey rounded-2xl rounded-bl-sm flex gap-1">
                <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Suggested Follow-ups */}
        {suggestedFollowUps.length > 0 && (
          <div className="px-4 py-2 bg-gray-50/50 flex gap-2 overflow-x-auto no-scrollbar border-t border-gray-100">
            {suggestedFollowUps.map((chip, i) => (
              <button
                key={i}
                onClick={() => handleSendMessage(chip)}
                className="whitespace-nowrap border border-brand-blue/20 bg-white text-brand-blue text-[13px] px-3 py-1.5 rounded-full hover:bg-brand-blue/5 transition-colors"
              >
                {chip}
              </button>
            ))}
          </div>
        )}

        {/* Input Area */}
        <div className="p-3 border-t border-gray-100 bg-white rounded-b-2xl">
          <div className="relative flex items-center">
            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask a question..."
              className="w-full bg-gray-100 border-transparent focus:bg-white focus:border-brand-blue/30 focus:ring-2 focus:ring-brand-blue/10 rounded-full py-2.5 pl-4 pr-12 text-sm transition-all outline-none"
            />
            <button
              onClick={() => handleSendMessage(inputValue)}
              disabled={!inputValue.trim() || isTyping}
              className="absolute right-2 p-1.5 text-brand-blue hover:bg-brand-blue/10 rounded-full disabled:opacity-50 transition-colors"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Floating Trigger Button */}
      <button
        onClick={() => {
          setIsOpen(!isOpen)
          if (!isOpen) {
            setTimeout(() => inputRef.current?.focus(), 300)
          }
        }}
        className={cn(
          "w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-all transform hover:scale-105 active:scale-95",
          isOpen ? "bg-gray-800 rotate-90" : "bg-gradient-to-tr from-brand-blue to-indigo-600 animate-pulse-subtle"
        )}
      >
        {isOpen ? <X className="w-6 h-6 text-white" /> : <Sparkles className="w-6 h-6 text-white" />}
      </button>
    </div>
  )
}
