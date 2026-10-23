import type { Metadata } from "next"
import Link from "next/link"
import {
  ArrowRight,
  FileWarning,
  HelpCircle,
  KeyRound,
  RefreshCw,
  UploadCloud,
} from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export const metadata: Metadata = {
  title: "Support",
  description:
    "Troubleshooting and answers for HireMeScan resume uploads, PDF parsing, analysis errors, and score questions.",
}

const troubleshooting = [
  {
    title: "The PDF will not upload",
    icon: UploadCloud,
    steps: [
      "Confirm the file is a real PDF with a .pdf extension.",
      "Keep it under 10 MB.",
      "If the file is password-protected, remove the password and export again.",
      "Try a fresh export from Google Docs, Word, or your resume builder.",
    ],
  },
  {
    title: "It says no readable text was found",
    icon: FileWarning,
    steps: [
      "The PDF is probably a scan or an image. Those have no text layer.",
      "Open the PDF and try selecting a sentence with your cursor.",
      "If nothing selects, export a new text-based PDF from the original document.",
      "Screenshot-based resumes cannot be analyzed.",
    ],
  },
  {
    title: "The analysis failed",
    icon: RefreshCw,
    steps: [
      "Wait a few seconds and retry. The AI provider can briefly rate-limit requests.",
      "Shorten an extremely long job description to the essential requirements.",
      "If the message says AI is not configured, the deployment is missing an API key.",
      "You can always open the sample report to check the interface.",
    ],
  },
  {
    title: "The scores look wrong",
    icon: KeyRound,
    steps: [
      "Paste the complete job description, not just the title and a summary.",
      "Make sure the job description matches the resume you uploaded.",
      "AI scores are estimates and can vary between runs.",
      "Use the keyword gaps and recommended edits as the actionable part.",
    ],
  },
]

const supportFaqs = [
  {
    question: "Does HireMeScan store my resume?",
    answer:
      "No. The PDF is parsed in memory to extract text and is not written to a database. The resulting report is stored in your browser's session storage and disappears when you close the tab. See the privacy policy for the full explanation.",
  },
  {
    question: "Which file types are supported?",
    answer:
      "Text-based PDF files up to 10 MB. DOCX is not supported yet. If you only have a Word document, export it to PDF first.",
  },
  {
    question: "Why do I need to paste the full job description?",
    answer:
      "The analysis compares your resume against the language and requirements in the posting. A short summary does not give it enough signal to find meaningful keyword gaps.",
  },
  {
    question: "Is the result saved if I refresh the page?",
    answer:
      "The report survives a refresh during the same browser tab session. Closing the tab clears it. Use the Download button on the results page if you want to keep a copy.",
  },
  {
    question: "Can I use this for any industry?",
    answer:
      "Yes. The workflow is not limited to tech. The quality depends on how much relevant detail the job description and resume contain.",
  },
]

export default function SupportPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main>
        <section className="border-b border-slate-100 bg-slate-50">
          <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-16 lg:px-8">
            <div className="max-w-2xl">
              <span className="inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-white px-3 py-1 text-xs font-semibold text-indigo-700 shadow-sm">
                <HelpCircle className="h-3.5 w-3.5" aria-hidden="true" />
                Support
              </span>
              <h1 className="mt-5 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                Fix the common issues first
              </h1>
              <p className="mt-4 text-base leading-7 text-slate-600">
                Most issues come down to scanned PDFs, file size, or AI analysis
                that is not configured on the deployment. Work through the checks
                below, then get in touch if you are still stuck.
              </p>
            </div>
          </div>
        </section>

        <section className="border-b border-slate-100 py-14 sm:py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-6 md:grid-cols-2">
              {troubleshooting.map((item) => (
                <div
                  key={item.title}
                  className="rounded-2xl border border-slate-200 bg-white p-6 shadow-soft"
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                    <item.icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <h2 className="mt-4 text-base font-semibold text-slate-900">
                    {item.title}
                  </h2>
                  <ul className="mt-3 space-y-2">
                    {item.steps.map((step) => (
                      <li
                        key={step}
                        className="flex gap-2.5 text-sm leading-6 text-slate-600"
                      >
                        <span
                          className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-slate-300"
                          aria-hidden="true"
                        />
                        {step}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-14 sm:py-16">
          <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:px-8">
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-slate-900">
                Still have a question?
              </h2>
              <p className="mt-3 text-sm leading-6 text-slate-600">
                Send a note with the browser you used, the file size, and the
                exact error message. That makes it much easier to reproduce.
              </p>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row lg:flex-col">
                <Button
                  asChild
                  className="h-11 rounded-lg bg-indigo-600 px-5 text-sm font-semibold hover:bg-indigo-700"
                >
                  <Link href="/contact">
                    Contact support
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="h-11 rounded-lg border-slate-300 px-5 text-sm font-semibold text-slate-800 hover:bg-slate-50"
                >
                  <Link href="/#faq">Browse the homepage FAQ</Link>
                </Button>
              </div>
            </div>

            <Accordion type="single" collapsible className="w-full">
              {supportFaqs.map((faq, index) => (
                <AccordionItem
                  key={faq.question}
                  value={`support-${index}`}
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
      </main>

      <Footer />
    </div>
  )
}
