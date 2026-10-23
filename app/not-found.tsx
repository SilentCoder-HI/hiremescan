import Link from "next/link"
import { ArrowRight, FileSearch } from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main className="mx-auto flex max-w-3xl flex-col items-center px-4 py-24 text-center sm:px-6">
        <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600">
          <FileSearch className="h-6 w-6" aria-hidden="true" />
        </span>
        <p className="mt-6 text-sm font-semibold uppercase tracking-wider text-indigo-600">
          404
        </p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          This page did not make the cut
        </h1>
        <p className="mt-3 max-w-md text-sm leading-6 text-slate-600">
          The link may be broken or the page may have moved. Head back home to run
          an analysis, or open the sample report.
        </p>
        <div className="mt-7 flex flex-col gap-3 sm:flex-row">
          <Button
            asChild
            className="h-11 rounded-lg bg-indigo-600 px-5 text-sm font-semibold hover:bg-indigo-700"
          >
            <Link href="/">
              Back to home
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
      </main>

      <Footer />
    </div>
  )
}
