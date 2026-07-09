"use client"

import * as React from "react"
import { getCertificateById } from "@/lib/api"
import { useParams } from "next/navigation"
import { Certificate } from "@/types/schema"

export default function CertificatePrintPage() {
  const params = useParams()
  const id = params.id as string
  const [cert, setCert] = React.useState<Certificate | null>(null)

  React.useEffect(() => {
    getCertificateById(id).then(setCert)
  }, [id])

  if (!cert) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-gray-500">Loading certificate...</p>
      </div>
    )
  }

  if (cert.status !== "Issued" && cert.status !== "Delivered" && cert.status !== "Reissued") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-2">Certificate Not Available</h2>
          <p className="text-gray-500">This certificate has not been issued yet or is no longer valid.</p>
          <p className="text-sm text-gray-400 mt-2">Status: {cert.status}</p>
        </div>
      </div>
    )
  }

  return (
    <>
      {/* Print-only styles */}
      <style dangerouslySetInnerHTML={{ __html: `
        @media print {
          .no-print { display: none !important; }
          body { margin: 0; background: white; }
          .cert-page { box-shadow: none !important; margin: 0 !important; }
        }
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Inter:wght@400;500;600&display=swap');
      `}} />

      {/* Print Button */}
      <div className="no-print fixed top-4 right-4 z-50 flex space-x-3">
        <button
          onClick={() => window.print()}
          className="px-6 py-2 bg-[#003366] text-white rounded-lg font-medium hover:bg-[#002244] transition-colors shadow-md"
        >
          🖨️ Print Certificate
        </button>
        <button
          onClick={() => window.history.back()}
          className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors shadow-md"
        >
          ← Back
        </button>
      </div>

      {/* Certificate Page */}
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-8">
        <div
          className="cert-page bg-white relative"
          style={{
            width: "842px",
            minHeight: "595px",
            boxShadow: "0 20px 60px rgba(0,0,0,0.15)",
            border: "2px solid #C9A84C",
            fontFamily: "'Inter', sans-serif"
          }}
        >
          {/* Outer decorative border */}
          <div
            className="absolute inset-3 pointer-events-none"
            style={{ border: "1px solid #C9A84C", opacity: 0.5 }}
          />

          {/* Header band */}
          <div
            className="relative px-16 pt-10 pb-6 text-center"
            style={{ borderBottom: "2px solid #C9A84C" }}
          >
            {/* Logo / Brand */}
            <div className="flex items-center justify-center mb-3">
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center mr-3"
                style={{ backgroundColor: "#003366" }}
              >
                <span className="text-white font-bold text-xl">S</span>
              </div>
              <div className="text-left">
                <div className="font-bold text-lg" style={{ color: "#003366", fontFamily: "'Playfair Display', serif" }}>
                  Strengthscape
                </div>
                <div className="text-xs tracking-widest uppercase" style={{ color: "#C9A84C" }}>
                  Learning &amp; Development
                </div>
              </div>
            </div>
          </div>

          {/* Body */}
          <div className="px-16 py-10 text-center">
            <p className="text-sm tracking-widest uppercase mb-2" style={{ color: "#C9A84C", fontFamily: "'Inter', sans-serif" }}>
              This is to certify that
            </p>

            <h1
              className="text-5xl mb-2"
              style={{
                fontFamily: "'Playfair Display', serif",
                color: "#003366",
                fontWeight: 700,
                lineHeight: 1.2
              }}
            >
              {cert.learnerName || "Learner"}
            </h1>

            <p className="text-sm text-gray-500 mb-6">has successfully completed</p>

            <h2
              className="text-2xl font-bold mb-8"
              style={{ color: "#003366", fontFamily: "'Playfair Display', serif" }}
            >
              {cert.programTitle || "Professional Development Program"}
            </h2>

            {/* Date and Sig row */}
            <div className="flex justify-between items-end mt-8 pt-8" style={{ borderTop: "1px solid #E5E7EB" }}>
              <div className="text-left">
                <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Date Issued</p>
                <p className="font-semibold text-gray-700">
                  {cert.issuedAt
                    ? new Date(cert.issuedAt).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })
                    : "—"
                  }
                </p>
              </div>

              <div className="text-center">
                <div
                  className="text-4xl mb-1"
                  style={{ fontFamily: "'Playfair Display', serif", color: "#003366", fontStyle: "italic" }}
                >
                  Strengthscape
                </div>
                <div className="w-48 h-px mx-auto mb-1" style={{ backgroundColor: "#003366" }} />
                <p className="text-xs text-gray-500">Authorized Signature</p>
              </div>

              <div className="text-right">
                <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Certificate No.</p>
                <p className="font-mono font-semibold text-gray-700">{cert.certificateNumber || "—"}</p>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div
            className="px-16 py-4 flex justify-between items-center"
            style={{ backgroundColor: "#003366" }}
          >
            <p className="text-xs" style={{ color: "#C9A84C" }}>
              Verify at: strengthscape.com/verify
            </p>
            <p className="text-xs text-blue-200 font-mono">
              Token: {cert.verificationToken || "—"}
            </p>
            {cert.expiresAt && (
              <p className="text-xs text-blue-200">
                Valid until: {new Date(cert.expiresAt).toLocaleDateString("en-GB", { month: "short", year: "numeric" })}
              </p>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
