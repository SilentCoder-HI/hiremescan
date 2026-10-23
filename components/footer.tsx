import Link from "next/link"
import { Github, Globe, Linkedin, Mail, ScanText } from "lucide-react"
import { siteConfig } from "@/lib/site"

const productLinks = [
  { label: "Analyze a resume", href: "/#analyze" },
  { label: "How it works", href: "/#how-it-works" },
  { label: "Features", href: "/#features" },
  { label: "Sample report", href: "/sample" },
]

const companyLinks = [
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
  { label: "Support", href: "/support" },
  { label: "FAQ", href: "/#faq" },
]

const legalLinks = [
  { label: "Privacy policy", href: "/privacy" },
  { label: "Terms of service", href: "/terms" },
]

export function Footer() {
  return (
    <footer className="no-print border-t border-slate-200 bg-slate-50">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div className="max-w-sm">
            <Link href="/" className="flex items-center gap-2.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-900 text-white">
                <ScanText className="h-5 w-5" aria-hidden="true" />
              </span>
              <span className="text-lg font-semibold tracking-tight text-slate-900">
                HireMe<span className="text-indigo-600">Scan</span>
              </span>
            </Link>
            <p className="mt-4 text-sm leading-6 text-slate-600">
              A focused resume-to-job matcher. See how your experience reads to
              an ATS and a recruiter — and what to fix first.
            </p>
            <div className="mt-5 flex items-center gap-2">
              <a
                href={siteConfig.creator.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 transition-colors hover:border-slate-300 hover:text-slate-900"
                aria-label="HireMeScan on GitHub"
              >
                <Github className="h-4 w-4" aria-hidden="true" />
              </a>
              <a
                href={siteConfig.creator.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 transition-colors hover:border-slate-300 hover:text-slate-900"
                aria-label="Hussnain Iftikhar on LinkedIn"
              >
                <Linkedin className="h-4 w-4" aria-hidden="true" />
              </a>
              <a
                href={siteConfig.creator.portfolio}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 transition-colors hover:border-slate-300 hover:text-slate-900"
                aria-label="Creator portfolio"
              >
                <Globe className="h-4 w-4" aria-hidden="true" />
              </a>
              <a
                href={`mailto:${siteConfig.email}`}
                className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 transition-colors hover:border-slate-300 hover:text-slate-900"
                aria-label="Email HireMeScan"
              >
                <Mail className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>
          </div>

          <div>
            <h2 className="text-sm font-semibold text-slate-900">Product</h2>
            <ul className="mt-4 space-y-3">
              {productLinks.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-slate-600 transition-colors hover:text-slate-900"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-sm font-semibold text-slate-900">Company</h2>
            <ul className="mt-4 space-y-3">
              {companyLinks.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-slate-600 transition-colors hover:text-slate-900"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-sm font-semibold text-slate-900">Legal</h2>
            <ul className="mt-4 space-y-3">
              {legalLinks.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-slate-600 transition-colors hover:text-slate-900"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-slate-200 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-slate-500">
            © 2026 HireMeScan. Built by{" "}
            <a
              href={siteConfig.creator.github}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-slate-700 underline-offset-4 hover:underline"
            >
              {siteConfig.creator.name}
            </a>
            .
          </p>
          <p className="max-w-xl text-xs leading-5 text-slate-500">
            HireMeScan provides AI-assisted guidance, not hiring decisions. It is
            not affiliated with any employer or ATS provider.
          </p>
        </div>
      </div>
    </footer>
  )
}
