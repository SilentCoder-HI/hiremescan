import type { Metadata } from "next"
import Link from "next/link"
import {
  ArrowRight,
  CheckCircle2,
  FileText,
  Gauge,
  Info,
  Target,
} from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { AnalysisResults } from "@/components/analysis"
import { Button } from "@/components/ui/button"
import { SAMPLE_ANALYSIS } from "@/lib/sample-data"

export const metadata: Metadata = {
  title: "Sample resume report",
  description:
    "See a complete HireMeScan report before you upload your resume: match score, ATS readiness, keyword gaps, strengths, and recommended edits.",
}

const explainers = [
  {
    title: "Match score",
    description:
      "How closely the resume aligns with the role's responsibilities, seniority, and required skills. It is a fit estimate, not a pass/fail result.",
    icon: Target,
  },
  {
    title: "ATS readiness",
    description:
      "How easily an applicant tracking system can parse the document and surface it for the right searches. Clear structure and standard headings help.",
    icon: Gauge,
  },
  {
    title: "Keyword gaps",
    description:
      "Terms the job description emphasizes that are not visible in the resume. Add only the ones that reflect real experience.",
    icon: FileText,
  },
]

export default function SampleReportPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <Header />

      <main>
        <section className="border-b border-slate-200 bg-white">
          <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-3xl">
                <span className="inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-700">
                  <Info className="h-3.5 w-3.5" aria-hidden="true" />
                  Sample report
                </span>
                <h1 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                  See exactly what you get
                </h1>
                <p className="mt-3 text-base leading-7 text-slate-600">
                  This report uses a bundled demo resume and a realistic senior
                  frontend job description. No upload, account, or API key is
                  required.
                </p>
                <p className="mt-3 text-sm text-slate-500">
                  Alex Morgan · Senior Frontend Engineer · Berlin, Germany
                </p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
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
                  className="h-11 rounded-lg border-slate-300 bg-white px-5 text-sm font-semibold text-slate-800 hover:bg-slate-50"
                >
                  <Link href="/#how-it-works">How it works</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-12 lg:px-8">
          <div className="mb-6 flex items-start gap-3 rounded-xl border border-indigo-200 bg-indigo-50 px-4 py-3">
            <Info
              className="mt-0.5 h-4 w-4 shrink-0 text-indigo-700"
              aria-hidden="true"
            />
            <p className="text-sm leading-6 text-indigo-900">
              <span className="font-semibold">This is pre-generated sample data.</span>{" "}
              A live analysis uses your own resume and job description to produce
              its own scores and recommendations.
            </p>
          </div>

          <AnalysisResults analysis={SAMPLE_ANALYSIS} />

          <section className="mt-14">
            <div className="max-w-2xl">
              <h2 className="text-2xl font-bold tracking-tight text-slate-900">
                How to read the report
              </h2>
              <p className="mt-3 text-sm leading-6 text-slate-600">
                Three numbers and three lists. Start with the gaps, then make the
                edits in the order they are listed.
              </p>
            </div>
            <div className="mt-6 grid gap-5 md:grid-cols-3">
              {explainers.map((item) => (
                <div
                  key={item.title}
                  className="rounded-2xl border border-slate-200 bg-white p-6 shadow-soft"
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                    <item.icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <h3 className="mt-4 text-base font-semibold text-slate-900">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </section>

          <section className="mt-12 rounded-2xl border border-slate-200 bg-white p-6 shadow-soft sm:p-8">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              <div className="max-w-2xl">
                <h2 className="flex items-center gap-2 text-xl font-bold tracking-tight text-slate-900">
                  <CheckCircle2 className="h-5 w-5 text-emerald-600" aria-hidden="true" />
                  Ready to run your own?
                </h2>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Upload a text-based PDF, paste the job description, and get a
                  report built from your actual experience in under a minute.
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row">
                <Button
                  asChild
                  className="h-11 rounded-lg bg-slate-900 px-5 text-sm font-semibold hover:bg-slate-800"
                >
                  <Link href="/#analyze">
                    Start my analysis
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="h-11 rounded-lg border-slate-300 bg-white px-5 text-sm font-semibold text-slate-800 hover:bg-slate-50"
                >
                  <Link href="/about">About HireMeScan</Link>
                </Button>
              </div>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  )
}
