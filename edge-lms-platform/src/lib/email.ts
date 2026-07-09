"use server"

import { Resend } from "resend"
import * as React from "react"

const resend = new Resend(process.env.RESEND_API_KEY || 're_dummy_123')

interface SendEmailOptions {
  to: string | string[]
  subject: string
  react: React.ReactElement | React.ReactNode | null
}

/**
 * Utility to send transactional emails via Resend.
 * In development, if RESEND_API_KEY is not set or starts with 're_dummy', it will just log the email.
 */
export async function sendTransactionalEmail({ to, subject, react }: SendEmailOptions) {
  if (!process.env.RESEND_API_KEY || process.env.RESEND_API_KEY === 're_dummy_123') {
    console.log("-----------------------------------------")
    console.log(`[MOCK EMAIL] To: ${to}`)
    console.log(`[MOCK EMAIL] Subject: ${subject}`)
    console.log("-----------------------------------------")
    return { data: { id: 'mock_id' }, error: null }
  }

  try {
    const { data, error } = await resend.emails.send({
      from: "Edge LMS <noreply@edge-lms.com>",
      to,
      subject,
      react: react as React.ReactElement,
    })

    if (error) {
      console.error("Resend API Error:", error)
      return { data: null, error }
    }

    return { data, error: null }
  } catch (err: any) {
    console.error("Failed to send email:", err)
    return { data: null, error: err }
  }
}
