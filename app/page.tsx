"use client"

import React, { useRef, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import {
  AlertCircle,
  ArrowRight,
  Check,
  CheckCircle2,
  FileText,
  FlaskConical,
  Gauge,
  Layers,
  ListChecks,
  Loader2,
  Lock,
  ShieldCheck,
  Sparkles,
  Target,
  UploadCloud,
  Wand2,
  X,
} from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { useAnalysis } from "@/hooks/AnalysisContext"
import {
  SAMPLE_ANALYSIS,
  SAMPLE_JOB_DESCRIPTION,
  SAMPLE_RESUME,
} from "@/lib/sample-data"
import type { AnalysisResult } from "@/lib/types"
import { cn } from "@/lib/utils"

const MAX_FILE_SIZE = 10 * 1024 * 1024

const trustPoints = [
  "No account needed",
  "PDF processed in memory",
  "Works for any role",
]

const steps = [
  {
    number: "01",
    title: "Upload your resume",
    description:
      "Add a text-based PDF up to 10 MB. We extract the text on the server and discard the file after the request.",
    icon: UploadCloud,
  },
  {
    number: "02",
    title: "Paste the job description",
    description:
      "Use the full posting — responsibilities, requirements, and nice-to-haves. The more context, the sharper the analysis.",
    icon: FileText,
  },
  {
    number: "03",
    title: "Get a tailored report",
    description:
      "See your match score, ATS readiness, matched and missing keywords, plus a prioritized list of edits.",
    icon: Gauge,
  },
]

const features = [
  {
    title: "ATS compatibility check",
    description:
      "Understand how easily an applicant tracking system can parse your resume and where formatting may hurt you.",
    icon: ShieldCheck,
  },
  {
    title: "Keyword gap analysis",
    description:
      "Compare the language in your resume with the job description and surface the terms recruiters search for.",
    icon: Target,
  },
  {
    title: "Evidence-based strengths",
    description:
      "See which parts of your experience actually line up with the role, backed by what is written in your resume.",
    icon: CheckCircle2,
  },
  {
    title: "Prioritized recommendations",
    description:
      "Get a short, ordered edit list instead of a wall of generic advice. Fix the highest-impact item first.",
    icon: ListChecks,
  },
  {
    title: "Privacy-first by design",
    description:
      "Your file is processed in memory. Results stay in your browser session and are never added to a database.",
    icon: Lock,
  },
  {
    title: "Built for every role",
    description:
      "Engineering, design, marketing, operations, healthcare, finance — the analysis adapts to the job you paste.",
    icon: Layers,
  },
]

const faqs = [
  {
    question: "Is my resume stored on your servers?",
    answer:
      "No. The PDF is read in memory to extract text, then the request is discarded. The generated report is stored only in your browser's session storage, which is cleared when you close the tab.",
  },
  {
    question: "What kind of PDF should I upload?",
    answer:
      "Use a text-based PDF exported from Word, Google Docs, Canva, or a resume builder. Scanned PDFs that are just images usually cannot be read. The limit is 10 MB.",
  },
  {
    question: "How is the match score calculated?",
    answer:
      "An AI model compares the text of your resume with the job description and scores the overall fit, ATS readiness, keyword coverage, and the strength of your evidence. It is an estimate, not a hiring decision.",
  },
  {
    question: "Do I need to create an account?",
    answer:
      "No. There is no signup, no email gate, and no paywall. Open the tool, run an analysis, and use the report.",
  },
  {
    question: "Can I try it without uploading my resume?",
    answer:
      "Yes. Click “Load sample data” in the analyzer or open the sample report. It uses a realistic demo resume and job description so you can see exactly what the output looks like.",
  },
  {
    question: "Should I add every missing keyword to my resume?",
    answer:
      "No. Only add a keyword if it honestly reflects your experience. Keyword stuffing is easy for recruiters to spot and can make an interview much harder.",
  },
]

function getErrorMessage(error: unknown) {
  return error instanceof Error
    ? error.message
    : "Something went wrong. Please try again."
}

function jobTitleFromDescription(description: string) {
  const firstLine = description
    .split("\n")
    .map((line) => line.trim())
    .find((line) => line.length > 0)
  return firstLine ? firstLine.slice(0, 90) : "Target role"
}

function formatFileSize(bytes: number) {
  if (bytes < 1024 * 1024) return `${Math.max(1, Math.round(bytes / 1024))} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

function ScoreBadge({
  value,
  label,
  variant,
}: {
  value: number
  label: string
  variant: "dark" | "light"
}) {
  if (variant === "dark") {
    return (
      <div className="rounded-xl bg-slate-900 p-4 text-white">
        <p className="text-[11px] font-medium uppercase tracking-wide text-slate-400">
          {label}
        </p>
        <div className="mt-1 flex items-baseline gap-1">
          <span className="text-3xl font-bold tabular-nums">{value}</span>
          <span className="text-xs text-slate-400">/100</span>
        </div>
        <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/15">
          <div
            className="h-full rounded-full bg-emerald-400"
            style={{ width: `${value}%` }}
          />
        </div>
      </div>
    )
  }

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4">
      <p className="text-[11px] font-medium uppercase tracking-wide text-slate-500">
        {label}
      </p>
      <div className="mt-1 flex items-baseline gap-1">
        <span className="text-3xl font-bold tabular-nums text-slate-900">
          {value}
        </span>
        <span className="text-xs text-slate-500">/100</span>
      </div>
      <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-slate-100">
        <div
          className="h-full rounded-full bg-indigo-500"
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  )
}

function ReportPreview() {
  return (
    <div className="relative">
      <div
        className="absolute -inset-4 -z-10 rounded-3xl bg-gradient-to-br from-indigo-100 via-sky-50 to-emerald-50 blur-2xl"
        aria-hidden="true"
      />
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-card">
        <div className="flex items-center justify-between border-b border-slate-100 px-5 py-3.5">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-rose-400" />
            <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
          </div>
          <span className="rounded-full bg-indigo-50 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-indigo-700">
            Sample report
          </span>
        </div>

        <div className="p-5 sm:p-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs font-medium text-slate-500">Target role</p>
              <p className="mt-1 text-base font-semibold text-slate-900">
                Senior Frontend Engineer
              </p>
              <p className="mt-0.5 text-xs text-slate-500">Northstar Labs</p>
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700">
              <CheckCircle2 className="h-5 w-5" aria-hidden="true" />
            </div>
          </div>

          <div className="mt-5 grid grid-cols-2 gap-3">
            <ScoreBadge value={SAMPLE_ANALYSIS.matchScore} label="Job match" variant="dark" />
            <ScoreBadge value={SAMPLE_ANALYSIS.atsScore} label="ATS readiness" variant="light" />
          </div>

          <div className="mt-5 space-y-3">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">
                Matched
              </p>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {["React", "TypeScript", "Next.js", "Accessibility"].map((term) => (
                  <span
                    key={term}
                    className="rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-[11px] font-medium text-emerald-800"
                  >
                    {term}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">
                Gaps
              </p>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {["GraphQL", "Storybook", "Experimentation"].map((term) => (
                  <span
                    key={term}
                    className="rounded-full border border-amber-200 bg-amber-50 px-2.5 py-1 text-[11px] font-medium text-amber-800"
                  >
                    {term}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-5 flex items-start gap-2.5 rounded-xl border border-indigo-100 bg-indigo-50/70 p-3">
            <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-indigo-600" aria-hidden="true" />
            <p className="text-xs leading-5 text-indigo-900">
              <span className="font-semibold">Top edit:</span> add GraphQL and
              design-system ownership language to your most recent role.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="scroll-mt-24 border-b border-slate-100 bg-white py-16 sm:py-20"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-wider text-indigo-600">
            How it works
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Three steps from resume to a clear action plan
          </h2>
          <p className="mt-4 text-base leading-7 text-slate-600">
            No onboarding, no dashboard to learn. The whole workflow is one
            page.
          </p>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {steps.map((step) => (
            <div
              key={step.number}
              className="relative rounded-2xl border border-slate-200 bg-white p-6 shadow-soft"
            >
              <div className="flex items-center justify-between">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                  <step.icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <span className="text-sm font-semibold tabular-nums text-slate-500">
                  {step.number}
                </span>
              </div>
              <h3 className="mt-5 text-lg font-semibold text-slate-900">
                {step.title}
              </h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Features() {
  return (
    <section
      id="features"
      className="scroll-mt-24 border-b border-slate-100 bg-slate-50 py-16 sm:py-20"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-wider text-indigo-600">
            What you get
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Feedback that is specific, ordered, and honest
          </h2>
          <p className="mt-4 text-base leading-7 text-slate-600">
            Every section of the report is designed to answer one question:
            what should I change next?
          </p>
        </div>

        <div className="mt-10 grid gap-x-8 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <div key={feature.title} className="flex gap-4">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white text-indigo-600 shadow-sm">
                <feature.icon className="h-5 w-5" aria-hidden="true" />
              </span>
              <div>
                <h3 className="text-base font-semibold text-slate-900">
                  {feature.title}
                </h3>
                <p className="mt-1.5 text-sm leading-6 text-slate-600">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function SampleSection({ onLoadSample }: { onLoadSample: () => void }) {
  return (
    <section
      id="sample"
      className="scroll-mt-24 border-b border-slate-100 bg-white py-16 sm:py-20"
    >
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wider text-indigo-600">
            See it first
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Explore a full sample report before uploading anything
          </h2>
          <p className="mt-4 text-base leading-7 text-slate-600">
            Not ready to share your resume? Open the sample report to see the
            scores, keyword analysis, strengths, gaps, and recommended edits you
            can expect.
          </p>
          <ul className="mt-6 space-y-3">
            {[
              "A realistic senior frontend resume and job description",
              "The same report layout you get after a live analysis",
              "No upload, no account, no API key required",
            ].map((item) => (
              <li key={item} className="flex items-start gap-3 text-sm text-slate-700">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button
              asChild
              className="h-11 rounded-lg bg-indigo-600 px-5 text-sm font-semibold hover:bg-indigo-700"
            >
              <Link href="/sample">
                Open the sample report
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={onLoadSample}
              className="h-11 rounded-lg border-slate-300 px-5 text-sm font-semibold text-slate-800 hover:bg-slate-50"
            >
              Try it with sample data
            </Button>
          </div>
        </div>
        <ReportPreview />
      </div>
    </section>
  )
}

function FaqSection() {
  return (
    <section
      id="faq"
      className="scroll-mt-24 border-b border-slate-100 bg-white py-16 sm:py-20"
    >
      <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:px-8">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wider text-indigo-600">
            FAQ
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Questions, answered plainly
          </h2>
          <p className="mt-4 text-sm leading-6 text-slate-600">
            Still unsure about something?{" "}
            <Link
              href="/contact"
              className="font-semibold text-indigo-600 underline-offset-4 hover:underline"
            >
              Send a note
            </Link>{" "}
            or read the{" "}
            <Link
              href="/privacy"
              className="font-semibold text-indigo-600 underline-offset-4 hover:underline"
            >
              privacy policy
            </Link>
            .
          </p>
        </div>

        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem
              key={faq.question}
              value={`item-${index}`}
              className="border-slate-200"
            >
              <AccordionTrigger className="py-5 text-left text-sm font-semibold text-slate-900 hover:no-underline sm:text-base">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="pb-5 pr-6 text-sm leading-6 text-slate-600">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}

function ContactCta() {
  return (
    <section id="contact" className="scroll-mt-24 bg-slate-50 py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-slate-900 px-6 py-12 sm:px-10 sm:py-14">
          <div
            className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-indigo-500/20 blur-3xl"
            aria-hidden="true"
          />
          <div
            className="absolute -bottom-24 left-10 h-64 w-64 rounded-full bg-emerald-500/10 blur-3xl"
            aria-hidden="true"
          />
          <div className="relative grid gap-8 lg:grid-cols-[1.4fr_0.6fr] lg:items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wider text-indigo-300">
                Contact
              </p>
              <h2 className="mt-3 max-w-2xl text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Questions, feedback, or a bug to report?
              </h2>
              <p className="mt-4 max-w-xl text-sm leading-6 text-slate-300">
                HireMeScan is an independent project. If something looks wrong,
                a PDF will not upload, or you have an idea for the report, I want
                to hear it.
              </p>
            </div>
            <div className="flex flex-col gap-3">
              <Button
                asChild
                className="h-11 rounded-lg bg-white px-5 text-sm font-semibold text-slate-900 hover:bg-slate-100"
              >
                <Link href="/contact">
                  Contact HireMeScan
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="h-11 rounded-lg border-white/20 bg-transparent px-5 text-sm font-semibold text-white hover:bg-white/10 hover:text-white"
              >
                <Link href="/support">Visit the support page</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default function HireMeScan() {
  const [resumeFile, setResumeFile] = useState<File | null>(null)
  const [jobDescription, setJobDescription] = useState("")
  const [sampleLoaded, setSampleLoaded] = useState(false)
  const [dragActive, setDragActive] = useState(false)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [stage, setStage] = useState<"idle" | "extracting" | "analyzing">("idle")
  const [error, setError] = useState<{ message: string; code?: string } | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()
  const { setAnalysis } = useAnalysis()

  const validateFile = (file: File) => {
    const isPdf =
      file.type === "application/pdf" || file.name.toLowerCase().endsWith(".pdf")
    if (!isPdf) return "Please upload a PDF file."
    if (file.size > MAX_FILE_SIZE) return "That file is larger than the 10 MB limit."
    if (file.size === 0) return "That file is empty."
    return null
  }

  const acceptFile = (file: File) => {
    const validationError = validateFile(file)
    if (validationError) {
      setError({ message: validationError })
      return
    }
    setResumeFile(file)
    setSampleLoaded(false)
    setError(null)
    if (fileInputRef.current) fileInputRef.current.value = ""
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) acceptFile(file)
  }

  const handleDrop = (event: React.DragEvent<HTMLLabelElement>) => {
    event.preventDefault()
    setDragActive(false)
    const file = event.dataTransfer.files?.[0]
    if (file) acceptFile(file)
  }

  const loadSample = () => {
    setResumeFile(null)
    setSampleLoaded(true)
    setJobDescription(SAMPLE_JOB_DESCRIPTION)
    setError(null)
    if (fileInputRef.current) fileInputRef.current.value = ""
    document
      .getElementById("analyze")
      ?.scrollIntoView({ behavior: "smooth", block: "start" })
  }

  const clearSample = () => {
    setSampleLoaded(false)
    setJobDescription("")
    setError(null)
  }

  const handleAnalyze = async () => {
    setError(null)

    if (!sampleLoaded && !resumeFile) {
      setError({
        message: "Upload a resume PDF or load the sample data to run an analysis.",
      })
      return
    }

    if (jobDescription.trim().length < 40) {
      setError({
        message:
          "Paste a fuller job description (at least a few sentences) so the analysis has enough context.",
      })
      return
    }

    setIsAnalyzing(true)
    setStage(sampleLoaded ? "analyzing" : "extracting")

    try {
      let resumeText = SAMPLE_RESUME
      let fileName = "Sample resume"

      if (!sampleLoaded && resumeFile) {
        const formData = new FormData()
        formData.append("resume", resumeFile)

        const extractResponse = await fetch("/api/extract-pdf", {
          method: "POST",
          body: formData,
        })

        const extractBody = await extractResponse.json().catch(() => ({}))
        if (!extractResponse.ok) {
          throw new Error(
            extractBody?.error || "We could not read that PDF. Please try another file."
          )
        }

        resumeText = extractBody.text
        fileName = resumeFile.name

        if (!resumeText || resumeText.trim().length < 40) {
          throw new Error(
            "The PDF did not contain enough readable text. Try exporting it again as a text-based PDF."
          )
        }
      }

      setStage("analyzing")

      const analysisResponse = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          resumeText,
          jobDescription,
        }),
      })

      const analysisBody = await analysisResponse.json().catch(() => ({}))

      if (!analysisResponse.ok) {
        // A deployment without an API key should still let sample visitors
        // explore the experience. Make that fallback explicit in the report.
        if (analysisResponse.status === 503 && sampleLoaded) {
          const demoResult: AnalysisResult = {
            ...SAMPLE_ANALYSIS,
            createdAt: new Date().toISOString(),
            isSample: true,
            isDemo: true,
          }
          setAnalysis(demoResult)
          router.push("/results")
          return
        }

        if (analysisBody?.code === "AI_NOT_CONFIGURED") {
          setError({
            message:
              analysisBody?.message ||
              "AI analysis is not configured on this deployment.",
            code: "AI_NOT_CONFIGURED",
          })
          return
        }

        throw new Error(
          analysisBody?.message ||
            analysisBody?.error ||
            "The analysis could not be completed. Please try again."
        )
      }

      if (!analysisBody?.analysis) {
        throw new Error("The analysis returned an empty result. Please try again.")
      }

      const result: AnalysisResult = {
        ...analysisBody.analysis,
        jobTitle: jobTitleFromDescription(jobDescription),
        fileName,
        createdAt: new Date().toISOString(),
        isSample: sampleLoaded,
      }

      setAnalysis(result)
      router.push("/results")
    } catch (err) {
      setError({ message: getErrorMessage(err) })
    } finally {
      setIsAnalyzing(false)
      setStage("idle")
    }
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main>
        {/* Hero */}
        <section className="relative overflow-hidden border-b border-slate-100">
          <div className="absolute inset-0 bg-grid-slate opacity-60" aria-hidden="true" />
          <div className="absolute inset-0 bg-hero-glow" aria-hidden="true" />
          <div className="relative mx-auto max-w-7xl px-4 pb-16 pt-14 sm:px-6 sm:pt-20 lg:px-8 lg:pb-24">
            <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
              <div className="animate-fade-up">
                <span className="inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-white/80 px-3 py-1 text-xs font-semibold text-indigo-700 shadow-sm backdrop-blur">
                  <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
                  AI resume analysis, without the guesswork
                </span>

                <h1 className="mt-6 max-w-2xl text-4xl font-extrabold leading-[1.08] tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
                  Check how well your resume{" "}
                  <span className="text-indigo-600">matches a job.</span>
                </h1>

                <p className="mt-5 max-w-xl text-base leading-7 text-slate-600 sm:text-lg">
                  Upload your resume (PDF) and paste a job description. See
                  matching keywords, missing keywords, and practical suggestions
                  to improve — based only on what you have actually written.
                </p>

                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <Button
                    asChild
                    className="h-12 rounded-lg bg-indigo-600 px-6 text-sm font-semibold shadow-sm hover:bg-indigo-700"
                  >
                    <a href="#analyze">
                      Analyze my resume
                      <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </a>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    className="h-12 rounded-lg border-slate-300 bg-white px-6 text-sm font-semibold text-slate-800 hover:bg-slate-50"
                  >
                    <Link href="/sample">See a sample report</Link>
                  </Button>
                </div>

                <ul className="mt-7 flex flex-wrap gap-x-5 gap-y-2">
                  {trustPoints.map((point) => (
                    <li
                      key={point}
                      className="flex items-center gap-1.5 text-xs font-medium text-slate-600"
                    >
                      <CheckCircle2
                        className="h-4 w-4 text-emerald-600"
                        aria-hidden="true"
                      />
                      {point}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="animate-fade-up [animation-delay:120ms]">
                <ReportPreview />
              </div>
            </div>
          </div>
        </section>

        {/* Analyzer */}
        <section
          id="analyze"
          className="scroll-mt-24 border-b border-slate-100 bg-slate-50 py-16 sm:py-20"
        >
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div className="max-w-2xl">
                <p className="text-sm font-semibold uppercase tracking-wider text-indigo-600">
                  Run an analysis
                </p>
                <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                  Your resume, matched against the role
                </h2>
                <p className="mt-3 text-sm leading-6 text-slate-600">
                  Upload a PDF and paste the job description. Nothing is saved
                  to a database.
                </p>
              </div>
              <Button
                type="button"
                variant="outline"
                onClick={loadSample}
                className="h-10 shrink-0 rounded-lg border-slate-300 bg-white px-4 text-sm font-semibold text-slate-800 hover:bg-slate-50"
              >
                <FlaskConical className="h-4 w-4" aria-hidden="true" />
                Load sample data
              </Button>
            </div>

            <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-5 shadow-card sm:p-8">
              {sampleLoaded && (
                <div className="mb-6 flex flex-col gap-3 rounded-xl border border-indigo-200 bg-indigo-50 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-start gap-2.5">
                    <Sparkles
                      className="mt-0.5 h-4 w-4 shrink-0 text-indigo-600"
                      aria-hidden="true"
                    />
                    <p className="text-sm leading-5 text-indigo-900">
                      <span className="font-semibold">Sample data loaded.</span>{" "}
                      A demo resume and job description are filled in. You can
                      edit the job description before running the analysis.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={clearSample}
                    className="shrink-0 text-sm font-semibold text-indigo-700 underline-offset-4 hover:underline"
                  >
                    Clear sample
                  </button>
                </div>
              )}

              <div className="grid gap-8 lg:grid-cols-2">
                {/* Upload */}
                <div>
                  <div className="flex items-center gap-2">
                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-slate-900 text-xs font-bold text-white">
                      1
                    </span>
                    <h3 className="text-sm font-semibold text-slate-900">
                      Add your resume
                    </h3>
                  </div>

                  <div className="mt-4">
                    <input
                      ref={fileInputRef}
                      id="resume-upload"
                      type="file"
                      accept="application/pdf,.pdf"
                      onChange={handleFileUpload}
                      className="sr-only"
                    />
                    {sampleLoaded ? (
                      <div className="rounded-xl border border-indigo-200 bg-indigo-50/60 p-5">
                        <div className="flex items-start gap-3">
                          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white text-indigo-600 shadow-sm">
                            <FileText className="h-5 w-5" aria-hidden="true" />
                          </span>
                          <div className="min-w-0">
                            <p className="truncate text-sm font-semibold text-slate-900">
                              Sample resume loaded
                            </p>
                            <p className="mt-0.5 text-xs text-slate-600">
                              Alex Morgan · Senior Frontend Engineer
                            </p>
                          </div>
                        </div>
                        <div className="mt-4 flex flex-wrap gap-2">
                          <button
                            type="button"
                            onClick={() => fileInputRef.current?.click()}
                            className="rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 transition-colors hover:bg-slate-50"
                          >
                            Use my own resume
                          </button>
                          <button
                            type="button"
                            onClick={clearSample}
                            className="rounded-lg px-3 py-1.5 text-xs font-semibold text-slate-600 transition-colors hover:text-slate-900"
                          >
                            Remove sample
                          </button>
                        </div>
                      </div>
                    ) : (
                      <label
                        htmlFor="resume-upload"
                        onDrop={handleDrop}
                        onDragOver={(event) => {
                          event.preventDefault()
                          setDragActive(true)
                        }}
                        onDragLeave={() => setDragActive(false)}
                        className={cn(
                          "flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed px-6 py-9 text-center transition-colors",
                          dragActive
                            ? "border-indigo-500 bg-indigo-50"
                            : "border-slate-300 bg-slate-50/60 hover:border-indigo-400 hover:bg-indigo-50/40"
                        )}
                      >
                        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-indigo-600 shadow-sm">
                          <UploadCloud className="h-6 w-6" aria-hidden="true" />
                        </span>
                        <span className="mt-4 text-sm font-semibold text-slate-900">
                          Click to upload or drag and drop
                        </span>
                        <span className="mt-1 text-xs text-slate-500">
                          PDF only · up to 10 MB · text-based
                        </span>
                      </label>
                    )}

                    {!sampleLoaded && resumeFile && (
                      <div className="mt-3 flex items-center justify-between gap-3 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3">
                        <div className="flex min-w-0 items-center gap-2.5">
                          <FileText
                            className="h-4 w-4 shrink-0 text-emerald-700"
                            aria-hidden="true"
                          />
                          <div className="min-w-0">
                            <p className="truncate text-sm font-medium text-emerald-900">
                              {resumeFile.name}
                            </p>
                            <p className="text-xs text-emerald-700">
                              {formatFileSize(resumeFile.size)} · ready
                            </p>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => {
                            setResumeFile(null)
                            if (fileInputRef.current) fileInputRef.current.value = ""
                          }}
                          className="rounded-lg p-1.5 text-emerald-700 transition-colors hover:bg-emerald-100 hover:text-emerald-900"
                          aria-label="Remove selected resume"
                        >
                          <X className="h-4 w-4" aria-hidden="true" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {/* Job description */}
                <div>
                  <div className="flex items-center gap-2">
                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-slate-900 text-xs font-bold text-white">
                      2
                    </span>
                    <h3 className="text-sm font-semibold text-slate-900">
                      Paste the job description
                    </h3>
                  </div>

                  <div className="mt-4">
                    <label htmlFor="job-description" className="sr-only">
                      Job description
                    </label>
                    <Textarea
                      id="job-description"
                      placeholder="Paste the full job posting here — responsibilities, requirements, and nice-to-haves..."
                      value={jobDescription}
                      onChange={(event) => {
                        setJobDescription(event.target.value)
                        if (error) setError(null)
                      }}
                      className="min-h-[212px] resize-y"
                      maxLength={20000}
                    />
                    <div className="mt-2 flex items-center justify-between text-xs text-slate-500">
                      <span>{jobDescription.length.toLocaleString()} characters</span>
                      <span>Include the full requirements</span>
                    </div>
                  </div>
                </div>
              </div>

              {error && (
                <div
                  className="mt-6 flex items-start gap-2.5 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3"
                  role="alert"
                >
                  <AlertCircle
                    className="mt-0.5 h-4 w-4 shrink-0 text-rose-600"
                    aria-hidden="true"
                  />
                  <div>
                    <p className="text-sm font-medium text-rose-900">{error.message}</p>
                    {error.code === "AI_NOT_CONFIGURED" && (
                      <p className="mt-1 text-xs text-rose-700">
                        You can still{" "}
                        <Link href="/sample" className="font-semibold underline underline-offset-2">
                          explore the sample report
                        </Link>
                        .
                      </p>
                    )}
                  </div>
                </div>
              )}

              <div className="mt-7 flex flex-col gap-3 border-t border-slate-100 pt-6 sm:flex-row sm:items-center sm:justify-between">
                <p className="flex items-center gap-2 text-xs text-slate-500">
                  <Lock className="h-3.5 w-3.5" aria-hidden="true" />
                  Your resume is processed in memory and never stored on a server.
                </p>
                <Button
                  type="button"
                  onClick={handleAnalyze}
                  disabled={
                    isAnalyzing ||
                    (!sampleLoaded && !resumeFile) ||
                    jobDescription.trim().length < 40
                  }
                  className="h-12 w-full rounded-lg bg-indigo-600 px-6 text-sm font-semibold shadow-sm hover:bg-indigo-700 sm:w-auto"
                >
                  {isAnalyzing ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                      {stage === "extracting"
                        ? "Reading your PDF..."
                        : "Analyzing with AI..."}
                    </>
                  ) : (
                    <>
                      <Wand2 className="h-4 w-4" aria-hidden="true" />
                      Analyze my resume
                    </>
                  )}
                </Button>
              </div>
            </div>
          </div>
        </section>

        <HowItWorks />
        <Features />
        <SampleSection onLoadSample={loadSample} />
        <FaqSection />
        <ContactCta />
      </main>

      <Footer />
    </div>
  )
}
