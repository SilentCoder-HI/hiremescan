import type { Metadata } from "next"
import Link from "next/link"
import {
  ArrowRight,
  CheckCircle2,
  Github,
  Globe,
  HeartHandshake,
  Linkedin,
  Lock,
  ScanText,
  Sparkles,
  Target,
  Users,
} from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { siteConfig } from "@/lib/site"

export const metadata: Metadata = {
  title: "About",
  description:
    "HireMeScan is an independent project that helps job seekers understand how their resume reads to an ATS and a recruiter. Learn how it works and who built it.",
}

const values = [
  {
    title: "Honest over flattering",
    description:
      "A report that only says “great resume” is useless. The goal is to surface the gaps clearly enough to act on them.",
    icon: Target,
  },
  {
    title: "Privacy is a feature",
    description:
      "No accounts, no resume database, no training on your documents. Files are read in memory and the report stays in your browser session.",
    icon: Lock,
  },
  {
    title: "Advice you can use",
    description:
      "Specific edits beat vague scores. Every recommendation is written so you can change a line of your resume today.",
    icon: Sparkles,
  },
]

const workflow = [
  {
    title: "Extract the resume text",
    description:
      "The PDF is parsed on the server to pull out readable text. Scanned image-only PDFs are rejected with a clear message.",
  },
  {
    title: "Compare with the role",
    description:
      "An AI model reviews the resume against the job description, looking for evidence, seniority alignment, and missing requirements.",
  },
  {
    title: "Validate the output",
    description:
      "The model returns structured JSON, which is validated before it reaches the screen. No regex parsing of free-form text.",
  },
  {
    title: "Show a prioritized report",
    description:
      "You get scores, matched and missing keywords, strengths, gaps, and an ordered list of edits. Results stay in your session.",
  },
]

const stack = [
  "Next.js 15",
  "React 19",
  "TypeScript",
  "Tailwind CSS",
  "shadcn/ui",
  "Groq",
  "PDF parsing",
  "Zod",
]

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main>
        <section className="relative overflow-hidden border-b border-slate-100">
          <div className="absolute inset-0 bg-grid-slate opacity-50" aria-hidden="true" />
          <div className="absolute inset-0 bg-hero-glow" aria-hidden="true" />
          <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
            <div className="max-w-3xl">
              <span className="inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-white px-3 py-1 text-xs font-semibold text-indigo-700 shadow-sm">
                <HeartHandshake className="h-3.5 w-3.5" aria-hidden="true" />
                About HireMeScan
              </span>
              <h1 className="mt-6 max-w-3xl text-4xl font-extrabold leading-[1.1] tracking-tight text-slate-900 sm:text-5xl">
                Job applications are noisy. Your feedback shouldn&apos;t be.
              </h1>
              <p className="mt-5 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
                Many applications are filtered by software before a person reads them.
                HireMeScan exists to make that filter visible: what matches, what
                is missing, and what to change first.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
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
                  <Link href="/sample">View a sample report</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section className="border-b border-slate-100 py-16 sm:py-20">
          <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wider text-indigo-600">
                Why it exists
              </p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                A clearer signal in a crowded process
              </h2>
            </div>
            <div className="space-y-5 text-sm leading-7 text-slate-600 sm:text-base">
              <p>
                A job posting can attract hundreds of applications. Recruiters
                scan quickly, and applicant tracking systems search for specific
                language. Good candidates get filtered out because their resume
                talks about the work differently than the job description does.
              </p>
              <p>
                HireMeScan is a small, independent tool built to close that gap.
                It does not rewrite your resume for you or invent experience. It
                shows you how the document reads against one specific role, then
                gives you a short list of honest edits.
              </p>
              <p>
                It is deliberately simple: one page, no account, no resume
                database. You stay in control of what you upload and what you
                change.
              </p>
            </div>
          </div>
        </section>

        <section className="border-b border-slate-100 bg-slate-50 py-16 sm:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl">
              <p className="text-sm font-semibold uppercase tracking-wider text-indigo-600">
                Under the hood
              </p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                What happens when you click analyze
              </h2>
            </div>
            <div className="mt-10 grid gap-6 md:grid-cols-2">
              {workflow.map((item, index) => (
                <div
                  key={item.title}
                  className="rounded-2xl border border-slate-200 bg-white p-6 shadow-soft"
                >
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-900 text-sm font-bold text-white">
                    {index + 1}
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
            <p className="mt-6 flex items-start gap-2 text-xs leading-5 text-slate-500">
              <CheckCircle2
                className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600"
                aria-hidden="true"
              />
              The analysis is AI-assisted guidance. It cannot guarantee an
              interview or accurately reproduce every ATS vendor&apos;s ranking.
            </p>
          </div>
        </section>

        <section className="border-b border-slate-100 py-16 sm:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl">
              <p className="text-sm font-semibold uppercase tracking-wider text-indigo-600">
                Principles
              </p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                Three rules the product follows
              </h2>
            </div>
            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {values.map((value) => (
                <div
                  key={value.title}
                  className="rounded-2xl border border-slate-200 bg-white p-6 shadow-soft"
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                    <value.icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <h3 className="mt-4 text-base font-semibold text-slate-900">
                    {value.title}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    {value.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="border-b border-slate-100 bg-slate-50 py-16 sm:py-20">
          <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[1fr_0.8fr] lg:px-8">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wider text-indigo-600">
                Built by
              </p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                {siteConfig.creator.name}
              </h2>
              <p className="mt-2 text-sm font-medium text-slate-600">
                {siteConfig.creator.role}
              </p>
              <div className="mt-5 space-y-4 text-sm leading-7 text-slate-600">
                <p>
                  HireMeScan started as a practical answer to a common problem:
                  tailoring a resume for every application is slow, and it is
                  hard to know which changes actually matter.
                </p>
                <p>
                  It is built and maintained as an independent project. Feedback,
                  bug reports, and ideas are genuinely welcome.
                </p>
              </div>
              <div className="mt-6 flex flex-wrap gap-3">
                <Button
                  asChild
                  variant="outline"
                  className="h-10 rounded-lg border-slate-300 bg-white px-4 text-sm font-semibold text-slate-800 hover:bg-slate-50"
                >
                  <a
                    href={siteConfig.creator.github}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Github className="h-4 w-4" aria-hidden="true" />
                    GitHub
                  </a>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="h-10 rounded-lg border-slate-300 bg-white px-4 text-sm font-semibold text-slate-800 hover:bg-slate-50"
                >
                  <a
                    href={siteConfig.creator.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Linkedin className="h-4 w-4" aria-hidden="true" />
                    LinkedIn
                  </a>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="h-10 rounded-lg border-slate-300 bg-white px-4 text-sm font-semibold text-slate-800 hover:bg-slate-50"
                >
                  <a
                    href={siteConfig.creator.portfolio}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Globe className="h-4 w-4" aria-hidden="true" />
                    Portfolio
                  </a>
                </Button>
                <Button
                  asChild
                  className="h-10 rounded-lg bg-slate-900 px-4 text-sm font-semibold hover:bg-slate-800"
                >
                  <Link href="/contact">Contact</Link>
                </Button>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-soft">
              <div className="flex items-center gap-3">
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-900 text-white">
                  <ScanText className="h-6 w-6" aria-hidden="true" />
                </span>
                <div>
                  <p className="text-sm font-semibold text-slate-900">
                    HireMeScan
                  </p>
                  <p className="text-xs text-slate-500">Independent project</p>
                </div>
              </div>

              <div className="mt-6">
                <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-slate-500">
                  <Users className="h-3.5 w-3.5" aria-hidden="true" />
                  Built with
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {stack.map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-medium text-slate-700"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              <p className="mt-6 border-t border-slate-100 pt-5 text-xs leading-5 text-slate-500">
                Not affiliated with any employer, recruiter, or applicant
                tracking system vendor.
              </p>
            </div>
          </div>
        </section>

        <section className="py-16 sm:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="rounded-3xl bg-slate-900 px-6 py-12 text-center sm:px-10">
              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                See where your resume stands
              </h2>
              <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-slate-300">
                One job description, one resume, one clear list of next steps.
              </p>
              <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
                <Button
                  asChild
                  className="h-11 rounded-lg bg-white px-5 text-sm font-semibold text-slate-900 hover:bg-slate-100"
                >
                  <Link href="/#analyze">
                    Analyze my resume
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="h-11 rounded-lg border-white/20 bg-transparent px-5 text-sm font-semibold text-white hover:bg-white/10 hover:text-white"
                >
                  <Link href="/sample">View sample report</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
