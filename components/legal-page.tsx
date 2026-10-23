import type { ReactNode } from "react"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export function LegalPage({
  title,
  description,
  updated,
  children,
}: {
  title: string
  description: string
  updated: string
  children: ReactNode
}) {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main className="mx-auto max-w-3xl px-4 py-14 sm:px-6 sm:py-16">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-500 transition-colors hover:text-slate-900"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          Back to home
        </Link>

        <h1 className="mt-6 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          {title}
        </h1>
        <p className="mt-3 text-base leading-7 text-slate-600">{description}</p>
        <p className="mt-5 text-xs font-medium uppercase tracking-wide text-slate-500">
          Last updated {updated}
        </p>

        <div className="legal-prose mt-6">{children}</div>
      </main>

      <Footer />
    </div>
  )
}
