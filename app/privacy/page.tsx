import type { Metadata } from "next"
import Link from "next/link"
import { LegalPage } from "@/components/legal-page"
import { siteConfig } from "@/lib/site"

export const metadata: Metadata = {
  title: "Privacy policy",
  description:
    "How HireMeScan handles resume files, job descriptions, AI processing, and browser storage.",
}

export default function PrivacyPage() {
  return (
    <LegalPage
      title="Privacy policy"
      description="What HireMeScan does with the information you provide, and what it does not do."
      updated="October 23, 2026"
    >
      <p>
        HireMeScan is a resume analysis tool. This policy explains what happens
        when you upload a resume, paste a job description, and generate a report.
        It is written to be read, not to hide behind legal language.
      </p>

      <h2>1. Information we process</h2>
      <p>When you use the analyzer, we process:</p>
      <ul>
        <li>The text extracted from the PDF resume you upload.</li>
        <li>The job description you paste.</li>
        <li>The generated analysis returned by the AI provider.</li>
      </ul>
      <p>
        We do not require an account and we do not collect your name, phone
        number, or address as part of the analysis flow.
      </p>

      <h2>2. How the resume is handled</h2>
      <p>
        The PDF is sent to our server, parsed in memory to extract text, and
        discarded after the request completes. The extracted text is then sent to
        our AI provider to generate the analysis. We do not write the uploaded
        file or the extracted text to a database.
      </p>

      <h2>3. Where the report is stored</h2>
      <p>
        The generated report is stored in your browser&apos;s{" "}
        <strong>session storage</strong> so it survives a page refresh. It is
        cleared when you close the tab. If you download or print the report, that
        copy is created locally on your device and is not sent to us.
      </p>

      <h2>4. Third-party processing</h2>
      <p>
        AI analysis is performed by <strong>Groq</strong> using a hosted language
        model. The resume text and job description are transmitted to Groq for
        that purpose. Groq&apos;s handling of data is governed by its own privacy
        policy at{" "}
        <a href="https://groq.com/privacy-policy/" target="_blank" rel="noopener noreferrer">
          groq.com/privacy-policy
        </a>
        . The site is hosted on a third-party hosting provider that may process
        standard technical logs such as IP address and request time.
      </p>

      <h2>5. What we do not do</h2>
      <ul>
        <li>We do not sell your data.</li>
        <li>We do not use your resume to train an AI model.</li>
        <li>We do not create a searchable database of resumes.</li>
        <li>We do not send marketing email unless you contact us first.</li>
      </ul>

      <h2>6. Your choices</h2>
      <p>
        You can use the sample report without uploading anything. If you do
        upload a resume, avoid including information you are not comfortable
        sending to an AI provider. You can clear the stored report by closing the
        tab or clearing site data in your browser settings.
      </p>

      <h2>7. Security</h2>
      <p>
        The service uses HTTPS in transit and does not persist resume files on the
        server. No internet transmission is perfectly secure, so treat the tool
        as you would any online document service and do not upload documents that
        contain highly sensitive information.
      </p>

      <h2>8. Children</h2>
      <p>
        HireMeScan is intended for people applying for jobs. It is not directed at
        children under 16, and we do not knowingly collect information from them.
      </p>

      <h2>9. Changes</h2>
      <p>
        If this policy changes, the updated date at the top of this page will
        change. Material changes will be reflected in the product or on this page.
      </p>

      <h2>10. Contact</h2>
      <p>
        Questions about this policy can be sent to{" "}
        <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a> or through
        the <Link href="/contact">contact page</Link>.
      </p>
    </LegalPage>
  )
}
