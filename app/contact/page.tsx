import type { Metadata } from "next"
import Link from "next/link"
import { Github, Globe, Linkedin, Mail, MessageSquare, ShieldCheck } from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ContactForm } from "@/components/contact-form"
import { siteConfig } from "@/lib/site"

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with the HireMeScan team about bugs, feedback, privacy questions, or feature ideas.",
}

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main>
        <section className="border-b border-slate-100 bg-slate-50">
          <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-16 lg:px-8">
            <div className="max-w-2xl">
              <span className="inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-white px-3 py-1 text-xs font-semibold text-indigo-700 shadow-sm">
                <MessageSquare className="h-3.5 w-3.5" aria-hidden="true" />
                Contact
              </span>
              <h1 className="mt-5 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                Tell me what is working — or what is broken
              </h1>
              <p className="mt-4 text-base leading-7 text-slate-600">
                HireMeScan is an independent project. Bug reports, privacy
                questions, and ideas for the report are all useful.
              </p>
            </div>
          </div>
        </section>

        <section className="py-14 sm:py-16">
          <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[1.2fr_0.8fr] lg:px-8">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-soft sm:p-8">
              <h2 className="text-xl font-semibold tracking-tight text-slate-900">
                Send a message
              </h2>
              <p className="mt-1 text-sm text-slate-600">
                A short note is enough. Include the browser and file type if you
                are reporting an upload issue.
              </p>
              <div className="mt-6">
                <ContactForm />
              </div>
            </div>

            <div className="space-y-5">
              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-soft">
                <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
                  Direct
                </h2>
                <ul className="mt-4 space-y-4">
                  <li>
                    <a
                      href={`mailto:${siteConfig.email}`}
                      className="group flex items-start gap-3"
                    >
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
                        <Mail className="h-4 w-4" aria-hidden="true" />
                      </span>
                      <span>
                        <span className="block text-sm font-medium text-slate-900 group-hover:text-indigo-700">
                          Email
                        </span>
                        <span className="block text-sm text-slate-600">
                          {siteConfig.email}
                        </span>
                      </span>
                    </a>
                  </li>
                  <li>
                    <a
                      href={siteConfig.creator.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-start gap-3"
                    >
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-700">
                        <Github className="h-4 w-4" aria-hidden="true" />
                      </span>
                      <span>
                        <span className="block text-sm font-medium text-slate-900 group-hover:text-indigo-700">
                          GitHub
                        </span>
                        <span className="block text-sm text-slate-600">
                          Code, issues, and updates
                        </span>
                      </span>
                    </a>
                  </li>
                  <li>
                    <a
                      href={siteConfig.creator.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-start gap-3"
                    >
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-700">
                        <Linkedin className="h-4 w-4" aria-hidden="true" />
                      </span>
                      <span>
                        <span className="block text-sm font-medium text-slate-900 group-hover:text-indigo-700">
                          LinkedIn
                        </span>
                        <span className="block text-sm text-slate-600">
                          Connect with {siteConfig.creator.name}
                        </span>
                      </span>
                    </a>
                  </li>
                  <li>
                    <a
                      href={siteConfig.creator.portfolio}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-start gap-3"
                    >
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-700">
                        <Globe className="h-4 w-4" aria-hidden="true" />
                      </span>
                      <span>
                        <span className="block text-sm font-medium text-slate-900 group-hover:text-indigo-700">
                          Portfolio
                        </span>
                        <span className="block text-sm text-slate-600">
                          Other projects by {siteConfig.creator.name}
                        </span>
                      </span>
                    </a>
                  </li>
                </ul>
              </div>

              <div className="rounded-2xl border border-indigo-100 bg-indigo-50/60 p-6">
                <div className="flex items-center gap-2 text-sm font-semibold text-indigo-900">
                  <ShieldCheck className="h-4 w-4" aria-hidden="true" />
                  Before you send a resume
                </div>
                <p className="mt-2 text-sm leading-6 text-indigo-900/80">
                  Do not email your resume as an attachment. The analyzer is the
                  right place for that, and it does not store the file. If you
                  are reporting a parsing issue, describe the problem instead.
                </p>
                <Link
                  href="/support"
                  className="mt-4 inline-flex text-sm font-semibold text-indigo-700 underline-offset-4 hover:underline"
                >
                  Read the support guide
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
