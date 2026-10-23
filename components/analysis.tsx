import type { ReactNode } from "react"
import {
  AlertTriangle,
  CheckCircle2,
  Lightbulb,
  Sparkles,
  Target,
  TrendingUp,
} from "lucide-react"
import type { AnalysisResult } from "@/lib/types"
import { cn } from "@/lib/utils"

function scoreTone(score: number) {
  if (score >= 80) {
    return {
      stroke: "#059669",
      text: "text-emerald-700",
      bg: "bg-emerald-50",
      border: "border-emerald-200",
    }
  }
  if (score >= 60) {
    return {
      stroke: "#d97706",
      text: "text-amber-700",
      bg: "bg-amber-50",
      border: "border-amber-200",
    }
  }
  return {
    stroke: "#dc2626",
    text: "text-rose-700",
    bg: "bg-rose-50",
    border: "border-rose-200",
  }
}

function scoreLabel(score: number) {
  if (score >= 85) return "Strong match"
  if (score >= 70) return "Good match"
  if (score >= 55) return "Partial match"
  return "Needs work"
}

function ScoreRing({
  label,
  score,
  caption,
}: {
  label: string
  score: number
  caption: string
}) {
  const radius = 42
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (Math.min(Math.max(score, 0), 100) / 100) * circumference
  const tone = scoreTone(score)

  return (
    <div className="flex flex-col items-center text-center">
      <div
        className="relative h-28 w-28"
        role="img"
        aria-label={`${label}: ${score} out of 100`}
      >
        <svg viewBox="0 0 100 100" className="h-full w-full -rotate-90">
          <circle
            cx="50"
            cy="50"
            r={radius}
            fill="none"
            stroke="#e2e8f0"
            strokeWidth="8"
          />
          <circle
            cx="50"
            cy="50"
            r={radius}
            fill="none"
            stroke={tone.stroke}
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            className="transition-[stroke-dashoffset] duration-700 ease-out"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className={cn("text-2xl font-bold tabular-nums", tone.text)}>
            {score}
          </span>
          <span className="text-[10px] font-medium uppercase tracking-wider text-slate-500">
            / 100
          </span>
        </div>
      </div>
      <p className="mt-2 text-sm font-semibold text-slate-900">{label}</p>
      <p className="mt-0.5 text-xs text-slate-500">{caption}</p>
    </div>
  )
}

function SectionCard({
  title,
  icon,
  children,
  className,
}: {
  title: string
  icon: ReactNode
  children: ReactNode
  className?: string
}) {
  return (
    <section
      className={cn(
        "print-card rounded-2xl border border-slate-200 bg-white p-6 shadow-soft sm:p-7",
        className
      )}
    >
      <div className="flex items-center gap-2.5">
        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-100 text-slate-700">
          {icon}
        </span>
        <h2 className="text-base font-semibold text-slate-900">{title}</h2>
      </div>
      <div className="mt-5">{children}</div>
    </section>
  )
}

function Chip({
  children,
  tone,
}: {
  children: ReactNode
  tone: "positive" | "warning"
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-3 py-1 text-sm font-medium",
        tone === "positive"
          ? "border-emerald-200 bg-emerald-50 text-emerald-800"
          : "border-amber-200 bg-amber-50 text-amber-800"
      )}
    >
      {children}
    </span>
  )
}

export function AnalysisResults({ analysis }: { analysis: AnalysisResult }) {
  const matchTone = scoreTone(analysis.matchScore)

  return (
    <div className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-3">
        <section className="print-card relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-soft sm:p-8 lg:col-span-2">
          <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-indigo-500 via-sky-500 to-emerald-500" />
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-slate-600">
              <Target className="h-3.5 w-3.5" aria-hidden="true" />
              Overall assessment
            </span>
            <span
              className={cn(
                "inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold",
                matchTone.bg,
                matchTone.border,
                matchTone.text
              )}
            >
              {scoreLabel(analysis.matchScore)}
            </span>
          </div>

          <h2 className="mt-5 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            {analysis.matchScore >= 80
              ? "You are in a strong position for this role."
              : analysis.matchScore >= 65
                ? "A solid foundation with a few clear gaps."
                : "This role needs a more targeted version of your resume."}
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600 sm:text-base">
            {analysis.summary}
          </p>

          <div className="mt-7 grid grid-cols-3 gap-3 border-t border-slate-100 pt-6">
            <div>
              <p className="text-2xl font-bold tabular-nums text-slate-900">
                {analysis.matchedKeywords.length}
              </p>
              <p className="mt-1 text-xs text-slate-500">Matched signals</p>
            </div>
            <div>
              <p className="text-2xl font-bold tabular-nums text-slate-900">
                {analysis.missingKeywords.length}
              </p>
              <p className="mt-1 text-xs text-slate-500">Keyword gaps</p>
            </div>
            <div>
              <p className="text-2xl font-bold tabular-nums text-slate-900">
                {analysis.recommendations.length}
              </p>
              <p className="mt-1 text-xs text-slate-500">Suggested edits</p>
            </div>
          </div>
        </section>

        <section className="print-card rounded-2xl border border-slate-200 bg-white p-6 shadow-soft sm:p-8">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-slate-500">
            <TrendingUp className="h-4 w-4" aria-hidden="true" />
            Scores
          </div>
          <div className="mt-6 grid grid-cols-2 gap-3">
            <ScoreRing
              label="Job match"
              score={analysis.matchScore}
              caption="Fit for this role"
            />
            <ScoreRing
              label="ATS readiness"
              score={analysis.atsScore}
              caption="Parsing & ranking"
            />
          </div>
          <p className="mt-6 rounded-lg bg-slate-50 p-3 text-xs leading-5 text-slate-500">
            Scores are AI estimates based on the text you provided. They are a
            guide, not a guarantee of an interview.
          </p>
        </section>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <SectionCard
          title="Matched keywords"
          icon={<CheckCircle2 className="h-4 w-4" aria-hidden="true" />}
        >
          {analysis.matchedKeywords.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {analysis.matchedKeywords.map((keyword) => (
                <Chip key={keyword} tone="positive">
                  {keyword}
                </Chip>
              ))}
            </div>
          ) : (
            <p className="text-sm text-slate-500">
              No strong keyword matches were found.
            </p>
          )}
        </SectionCard>

        <SectionCard
          title="Missing keywords"
          icon={<AlertTriangle className="h-4 w-4" aria-hidden="true" />}
        >
          {analysis.missingKeywords.length > 0 ? (
            <>
              <div className="flex flex-wrap gap-2">
                {analysis.missingKeywords.map((keyword) => (
                  <Chip key={keyword} tone="warning">
                    {keyword}
                  </Chip>
                ))}
              </div>
              <p className="mt-4 text-xs leading-5 text-slate-500">
                Only add these if they reflect your real experience. Never
                invent skills to beat a filter.
              </p>
            </>
          ) : (
            <div className="flex items-center gap-2 text-sm text-emerald-700">
              <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
              No important keyword gaps found.
            </div>
          )}
        </SectionCard>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <SectionCard
          title="What is working"
          icon={<TrendingUp className="h-4 w-4" aria-hidden="true" />}
        >
          <ul className="space-y-3">
            {analysis.strengths.map((item) => (
              <li key={item} className="flex gap-3 text-sm leading-6 text-slate-700">
                <CheckCircle2
                  className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600"
                  aria-hidden="true"
                />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </SectionCard>

        <SectionCard
          title="What to improve"
          icon={<AlertTriangle className="h-4 w-4" aria-hidden="true" />}
        >
          <ul className="space-y-3">
            {analysis.improvements.map((item) => (
              <li key={item} className="flex gap-3 text-sm leading-6 text-slate-700">
                <span
                  className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-500"
                  aria-hidden="true"
                />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </SectionCard>
      </div>

      <section className="print-card rounded-2xl border border-slate-200 bg-white p-6 shadow-soft sm:p-7">
        <div className="flex items-center gap-2.5">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-50 text-indigo-700">
            <Sparkles className="h-4 w-4" aria-hidden="true" />
          </span>
          <h2 className="text-base font-semibold text-slate-900">
            Recommended edits, in order
          </h2>
        </div>
        <ol className="mt-5 space-y-4">
          {analysis.recommendations.map((item, index) => (
            <li key={item} className="flex gap-4">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-slate-900 text-xs font-bold text-white">
                {index + 1}
              </span>
              <p className="pt-0.5 text-sm leading-6 text-slate-700">{item}</p>
            </li>
          ))}
        </ol>
      </section>

      <div className="print-card flex items-start gap-3 rounded-2xl border border-indigo-100 bg-indigo-50/60 p-5">
        <Lightbulb
          className="mt-0.5 h-5 w-5 shrink-0 text-indigo-600"
          aria-hidden="true"
        />
        <p className="text-sm leading-6 text-indigo-900">
          <span className="font-semibold">Use this report as a checklist.</span>{" "}
          Make the highest-impact edits first, then rerun the analysis with the
          updated resume. Small, honest changes beat keyword stuffing.
        </p>
      </div>
    </div>
  )
}
