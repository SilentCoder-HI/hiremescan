"use client"

import Link from "next/link"
import {
  ArrowLeft,
  ArrowRight,
  Download,
  FileSearch,
  Info,
  Printer,
  ScanText,
} from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { AnalysisResults } from "@/components/analysis"
import { Button } from "@/components/ui/button"
import { useAnalysis } from "@/hooks/AnalysisContext"
import type { AnalysisResult } from "@/lib/types"

function buildReportText(analysis: AnalysisResult) {
  const lines = [
    "HireMeScan — Resume Analysis",
    "============================",
    "",
    `Target role: ${analysis.jobTitle || "Not provided"}`,
    `Resume: ${analysis.fileName || "Not provided"}`,
    ...(analysis.createdAt
      ? [`Generated: ${new Date(analysis.createdAt).toLocaleString()}`]
      : []),
    "",
    `Match score: ${analysis.matchScore}/100`,
    `ATS readiness: ${analysis.atsScore}/100`,
    "",
    "SUMMARY",
    analysis.summary,
    "",
    "MATCHED KEYWORDS",
    analysis.matchedKeywords.join(", ") || "None found",
    "",
    "MISSING KEYWORDS",
    analysis.missingKeywords.join(", ") || "None found",
    "",
    "STRENGTHS",
    ...analysis.strengths.map((item) => `- ${item}`),
    "",
    "IMPROVEMENTS",
    ...analysis.improvements.map((item) => `- ${item}`),
    "",
    "RECOMMENDED EDITS",
    ...analysis.recommendations.map((item, index) => `${index + 1}. ${item}`),
    "",
    "Scores are AI estimates and not a guarantee of an interview.",
  ]

  return lines.join("\n")
}

function PageSkeleton() {
  return (
    <div className="space-y-6" aria-hidden="true">
      <div className="h-44 animate-pulse rounded-2xl border border-slate-200 bg-white" />
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="h-64 animate-pulse rounded-2xl bg-slate-100 lg:col-span-2" />
        <div className="h-64 animate-pulse rounded-2xl bg-slate-100" />
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="h-48 animate-pulse rounded-2xl bg-slate-100" />
        <div className="h-48 animate-pulse rounded-2xl bg-slate-100" />
      </div>
    </div>
  )
}

function EmptyState() {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-soft sm:p-12">
      <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600">
        <FileSearch className="h-6 w-6" aria-hidden="true" />
      </span>
      <h1 className="mt-5 text-2xl font-bold tracking-tight text-slate-900">
        No analysis yet
      </h1>
      <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-slate-600">
        Run your first analysis on the home page, or open the sample report to
        see what the output looks like before uploading anything.
      </p>
      <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
        <Button
          asChild
          className="h-11 rounded-lg bg-indigo-600 px-5 text-sm font-semibold hover:bg-indigo-700"
        >
          <Link href="/#analyze">
            Analyze my resume
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </Button>
        <Button
          asChild
          variant="outline"
          className="h-11 rounded-lg border-slate-300 px-5 text-sm font-semibold text-slate-800 hover:bg-slate-50"
        >
          <Link href="/sample">View sample report</Link>
        </Button>
      </div>
    </div>
  )
}

export default function ResultsPage() {
  const { analysis, hydrated } = useAnalysis()

  const handleDownload = () => {
    if (!analysis) return
    const blob = new Blob([buildReportText(analysis)], {
      type: "text/plain;charset=utf-8",
    })
    const url = URL.createObjectURL(blob)
    const anchor = document.createElement("a")
    anchor.href = url
    anchor.download = "hiremescan-report.txt"
    document.body.appendChild(anchor)
    anchor.click()
    anchor.remove()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />

      <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-12 lg:px-8">
        {!hydrated ? (
          <PageSkeleton />
        ) : !analysis ? (
          <EmptyState />
        ) : (
          <>
            <div className="no-print mb-8 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <Link
                  href="/"
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-500 transition-colors hover:text-slate-900"
                >
                  <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                  Back to home
                </Link>
                <h1 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                  Resume analysis
                </h1>
                <p className="mt-2 text-sm text-slate-600">
                  {analysis.jobTitle || "Target role"}
                  {analysis.fileName ? ` · ${analysis.fileName}` : ""}
                  {analysis.createdAt
                    ? ` · ${new Date(analysis.createdAt).toLocaleDateString(undefined, {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}`
                    : ""}
                </p>
              </div>

              <div className="flex flex-wrap gap-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleDownload}
                  className="h-10 rounded-lg border-slate-300 bg-white px-4 text-sm font-semibold text-slate-800 hover:bg-slate-50"
                >
                  <Download className="h-4 w-4" aria-hidden="true" />
                  Download
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => window.print()}
                  className="h-10 rounded-lg border-slate-300 bg-white px-4 text-sm font-semibold text-slate-800 hover:bg-slate-50"
                >
                  <Printer className="h-4 w-4" aria-hidden="true" />
                  Print
                </Button>
                <Button
                  asChild
                  className="h-10 rounded-lg bg-indigo-600 px-4 text-sm font-semibold hover:bg-indigo-700"
                >
                  <Link href="/#analyze">
                    <ScanText className="h-4 w-4" aria-hidden="true" />
                    Analyze another
                  </Link>
                </Button>
              </div>
            </div>

            {analysis.isDemo && (
              <div className="no-print mb-6 flex items-start gap-3 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3">
                <Info
                  className="mt-0.5 h-4 w-4 shrink-0 text-amber-700"
                  aria-hidden="true"
                />
                <p className="text-sm leading-6 text-amber-900">
                  <span className="font-semibold">Demo report.</span> Live AI
                  analysis is not configured on this deployment, so this is a
                  pre-generated sample. Everything else in the report works.
                </p>
              </div>
            )}

            {analysis.isSample && !analysis.isDemo && (
              <div className="no-print mb-6 flex items-start gap-3 rounded-xl border border-indigo-200 bg-indigo-50 px-4 py-3">
                <Info
                  className="mt-0.5 h-4 w-4 shrink-0 text-indigo-700"
                  aria-hidden="true"
                />
                <p className="text-sm leading-6 text-indigo-900">
                  <span className="font-semibold">Sample resume.</span> This
                  report used the bundled demo resume. Upload your own resume on
                  the home page to get personal feedback.
                </p>
              </div>
            )}

            <AnalysisResults analysis={analysis} />

            <div className="no-print mt-10 flex flex-col items-start justify-between gap-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-soft sm:flex-row sm:items-center">
              <div>
                <h2 className="text-base font-semibold text-slate-900">
                  Ready to check the updated version?
                </h2>
                <p className="mt-1 text-sm text-slate-600">
                  Make the top edits, export a fresh PDF, and run it again.
                </p>
              </div>
              <Button
                asChild
                className="h-10 shrink-0 rounded-lg bg-slate-900 px-4 text-sm font-semibold hover:bg-slate-800"
              >
                <Link href="/#analyze">
                  Analyze again
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </Button>
            </div>
          </>
        )}
      </main>

      <Footer />
    </div>
  )
}
