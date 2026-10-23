import type { Metadata, Viewport } from "next"
import "@fontsource-variable/inter"
import "./globals.css"
import { AnalysisProvider } from "@/hooks/AnalysisContext"

export const metadata: Metadata = {
  title: {
    default: "HireMeScan — AI Resume Match & ATS Analysis",
    template: "%s | HireMeScan",
  },
  description:
    "Compare your resume with any job description. Get a clear match score, an ATS estimate, keyword gaps, and practical edits to strengthen your application.",
  applicationName: "HireMeScan",
  authors: [{ name: "Hussnain Iftikhar", url: "https://github.com/SilentCoder-HI" }],
  creator: "Hussnain Iftikhar",
  keywords: [
    "resume analyzer",
    "ATS checker",
    "resume match score",
    "job description matcher",
    "AI resume review",
    "resume optimization",
  ],
  openGraph: {
    type: "website",
    siteName: "HireMeScan",
    title: "HireMeScan — AI Resume Match & ATS Analysis",
    description:
      "Compare your resume with a job description and get a clear match score, an ATS estimate, keyword gaps, and practical fixes.",
  },
  twitter: {
    card: "summary_large_image",
    title: "HireMeScan — AI Resume Match & ATS Analysis",
    description:
      "Compare your resume with a job description and get a clear match score, an ATS estimate, keyword gaps, and practical fixes.",
  },
  robots: {
    index: true,
    follow: true,
  },
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#ffffff",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>
        <AnalysisProvider>{children}</AnalysisProvider>
      </body>
    </html>
  )
}
