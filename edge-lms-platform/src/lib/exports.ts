// Export Service — handles CSV download and PDF placeholder

export function exportCSV(data: Record<string, unknown>[], filename: string): void {
  if (data.length === 0) return

  const headers = Object.keys(data[0])
  const rows = data.map(row =>
    headers.map(h => {
      const val = row[h]
      const str = val === null || val === undefined ? "" : String(val)
      // Escape commas and quotes
      return str.includes(",") || str.includes('"') || str.includes("\n")
        ? `"${str.replace(/"/g, '""')}"`
        : str
    }).join(",")
  )

  const csv = [headers.join(","), ...rows].join("\n")
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" })
  const url = URL.createObjectURL(blob)

  const link = document.createElement("a")
  link.setAttribute("href", url)
  link.setAttribute("download", `${filename}.csv`)
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}

export interface PDFExportResult {
  success: boolean
  message: string
  downloadUrl?: string
}

// PDF export is a placeholder — abstraction layer ready for real PDF service
export async function exportPDF(title: string): Promise<PDFExportResult> {
  console.log(`[PDF Export] Request initiated for: ${title}`)
  // In production, this would call a PDF generation service (e.g. Puppeteer, WeasyPrint, or a cloud function)
  return {
    success: false,
    message: "PDF export service coming soon. Please use CSV export or print directly from your browser.",
  }
}

export function buildReportData(snapshot: Record<string, unknown>): Record<string, unknown>[] {
  return [
    {
      "Metric": "Learners Invited",
      "Value": snapshot.learnersInvited
    },
    {
      "Metric": "Learners Active",
      "Value": snapshot.learnersActive
    },
    {
      "Metric": "Not Started",
      "Value": snapshot.learnersNotStarted
    },
    {
      "Metric": "In Progress",
      "Value": snapshot.learnersInProgress
    },
    {
      "Metric": "Completed",
      "Value": snapshot.learnersCompleted
    },
    {
      "Metric": "Overdue",
      "Value": snapshot.learnersOverdue
    },
    {
      "Metric": "Certificates Issued",
      "Value": snapshot.certificatesIssued
    },
    {
      "Metric": "Attendance Rate",
      "Value": `${snapshot.attendanceRate}%`
    },
    {
      "Metric": "Action Plans Active",
      "Value": snapshot.actionPlansActive
    },
    {
      "Metric": "Action Plans Completed",
      "Value": snapshot.actionPlansCompleted
    }
  ]
}
