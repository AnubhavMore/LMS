"use client"

import * as React from "react"
import { uploadFile } from "@/lib/storage"
import { Button } from "./Button"
import { UploadCloud, Loader2, X } from "lucide-react"

interface FileUploadProps {
  onUploadSuccess: (url: string) => void
  onUploadError?: (error: Error) => void
  folderPath: string
  accept?: string
  buttonText?: string
}

export function FileUpload({
  onUploadSuccess,
  onUploadError,
  folderPath,
  accept = "image/*,application/pdf",
  buttonText = "Upload File"
}: FileUploadProps) {
  const [isUploading, setIsUploading] = React.useState(false)
  const fileInputRef = React.useRef<HTMLInputElement>(null)

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    try {
      setIsUploading(true)
      
      const formData = new FormData()
      formData.append("file", file)
      
      const fileExt = file.name.split('.').pop()
      const fileName = `${Math.random().toString(36).substring(2, 15)}.${fileExt}`
      const filePath = `${folderPath}/${fileName}`

      await uploadFile(formData, filePath)
      
      onUploadSuccess(filePath)
    } catch (error: any) {
      if (onUploadError) onUploadError(error)
      else console.error("Upload failed:", error)
    } finally {
      setIsUploading(false)
      if (fileInputRef.current) {
        fileInputRef.current.value = ""
      }
    }
  }

  return (
    <div>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
        accept={accept}
      />
      <Button
        type="button"
        variant="outline"
        onClick={() => fileInputRef.current?.click()}
        disabled={isUploading}
      >
        {isUploading ? (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <UploadCloud className="mr-2 h-4 w-4" />
        )}
        {isUploading ? "Uploading..." : buttonText}
      </Button>
    </div>
  )
}
