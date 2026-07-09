"use client"

import * as React from "react"
import { FileUp, Link as LinkIcon, Video, CheckCircle2, FileText } from "lucide-react"

export default function LibraryPage() {
  const [activeTab, setActiveTab] = React.useState<"file" | "link">("file")
  const [status, setStatus] = React.useState<"idle" | "uploading" | "success">("idle")
  
  // File State
  const [file, setFile] = React.useState<File | null>(null)
  
  // Link State
  const [videoUrl, setVideoUrl] = React.useState("")
  const [videoTitle, setVideoTitle] = React.useState("")

  const handleFileUpload = (e: React.FormEvent) => {
    e.preventDefault()
    if (!file) return
    
    setStatus("uploading")
    // Simulate S3 Upload
    setTimeout(() => {
      console.log(`[MOCK S3 UPLOAD] Uploaded ${file.name} successfully to edge-lms-storage bucket.`)
      setStatus("success")
      setTimeout(() => {
        setStatus("idle")
        setFile(null)
      }, 3000)
    }, 2000)
  }

  const handleLinkSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!videoUrl || !videoTitle) return
    
    setStatus("uploading")
    // Simulate DB save
    setTimeout(() => {
      console.log(`[MOCK DB] Saved Video Link: ${videoTitle} -> ${videoUrl}`)
      setStatus("success")
      setTimeout(() => {
        setStatus("idle")
        setVideoUrl("")
        setVideoTitle("")
      }, 3000)
    }, 1000)
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-gray-900">Content Library</h1>
        <p className="text-gray-500 mt-1">Upload PDFs, documents, or link videos for use in courses.</p>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="flex border-b border-gray-200">
          <button
            onClick={() => setActiveTab("file")}
            className={`flex-1 py-4 text-sm font-medium flex items-center justify-center gap-2 ${
              activeTab === "file" 
                ? "bg-gray-50 text-brand-maroon border-b-2 border-brand-maroon" 
                : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
            }`}
          >
            <FileUp className="h-4 w-4" />
            Upload Document (PDF)
          </button>
          <button
            onClick={() => setActiveTab("link")}
            className={`flex-1 py-4 text-sm font-medium flex items-center justify-center gap-2 ${
              activeTab === "link" 
                ? "bg-gray-50 text-brand-maroon border-b-2 border-brand-maroon" 
                : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
            }`}
          >
            <Video className="h-4 w-4" />
            Add Video Link
          </button>
        </div>

        <div className="p-8">
          {activeTab === "file" ? (
            <form onSubmit={handleFileUpload} className="space-y-6">
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center hover:bg-gray-50 transition-colors">
                <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <div className="space-y-2">
                  <label htmlFor="file-upload" className="cursor-pointer">
                    <span className="text-brand-maroon font-medium hover:underline">Click to upload</span>
                    <span className="text-gray-500"> or drag and drop</span>
                    <input 
                      id="file-upload" 
                      type="file" 
                      accept=".pdf,.doc,.docx"
                      className="hidden" 
                      onChange={(e) => setFile(e.target.files?.[0] || null)}
                    />
                  </label>
                  <p className="text-xs text-gray-500">PDF, DOC up to 50MB</p>
                </div>
                {file && (
                  <div className="mt-4 inline-flex items-center gap-2 px-3 py-1 bg-gray-100 rounded-full text-sm font-medium text-gray-700">
                    <FileText className="h-4 w-4 text-brand-maroon" />
                    {file.name}
                  </div>
                )}
              </div>
              
              <div className="flex justify-end">
                <button 
                  type="submit"
                  disabled={!file || status === "uploading" || status === "success"}
                  className="inline-flex items-center justify-center rounded-md text-sm font-medium bg-brand-maroon text-white hover:bg-brand-maroon/90 h-10 px-6 py-2 disabled:opacity-50 transition-all"
                >
                  {status === "uploading" ? "Uploading to S3..." : status === "success" ? "Uploaded!" : "Upload Document"}
                </button>
              </div>
            </form>
          ) : (
            <form onSubmit={handleLinkSubmit} className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Video Title</label>
                  <input 
                    required
                    type="text"
                    value={videoTitle}
                    onChange={(e) => setVideoTitle(e.target.value)}
                    placeholder="e.g. Consultative Selling Process"
                    className="w-full h-10 px-3 py-2 rounded-md border border-gray-300 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-brand-maroon focus:border-transparent"
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Video URL (Vimeo, YouTube, or SharePoint)</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <LinkIcon className="h-4 w-4 text-gray-400" />
                    </div>
                    <input 
                      required
                      type="url"
                      value={videoUrl}
                      onChange={(e) => setVideoUrl(e.target.value)}
                      placeholder="https://vimeo.com/..."
                      className="w-full h-10 pl-10 pr-3 py-2 rounded-md border border-gray-300 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-brand-maroon focus:border-transparent"
                    />
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end">
                <button 
                  type="submit"
                  disabled={!videoUrl || !videoTitle || status === "uploading" || status === "success"}
                  className="inline-flex items-center justify-center rounded-md text-sm font-medium bg-brand-maroon text-white hover:bg-brand-maroon/90 h-10 px-6 py-2 disabled:opacity-50 transition-all"
                >
                  {status === "uploading" ? "Saving..." : status === "success" ? "Saved!" : "Add Video Link"}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
      
      {status === "success" && (
        <div className="p-4 bg-green-50 text-green-900 border border-green-200 rounded-lg flex items-center gap-3">
          <CheckCircle2 className="h-5 w-5 text-green-600 shrink-0" />
          <p className="text-sm font-medium">Successfully added to Content Library!</p>
        </div>
      )}
    </div>
  )
}
