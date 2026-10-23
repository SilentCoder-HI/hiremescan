# HireMeScan

HireMeScan compares a resume with a job description and produces a focused
report: job-match score, ATS readiness, matched and missing keywords, strengths,
gaps, and a prioritized edit list.

The site is built with Next.js 15 (App Router), React 19, TypeScript, Tailwind
CSS, and shadcn/ui, with Groq for the language model and `pdf-parse` for PDF text
extraction.

## How the website works

1. **Upload a resume** — the PDF is posted to `/api/extract-pdf`, parsed in
   memory, and discarded. Scanned image-only PDFs are rejected with a clear
   message.
2. **Paste a job description** — the full posting is used as the comparison
   target.
3. **Analyze** — `/api/analyze` sends the resume text and job description to
   Groq, which returns strict JSON. The response is validated with Zod before it
   reaches the UI.
4. **Read the report** — the result is shown on `/results` and kept in the
   browser's `sessionStorage` for the current tab. It can be printed or
   downloaded as text.

### Try it without a key

- **Load sample data** on the homepage fills a demo resume and job description.
- **`/sample`** shows a complete pre-generated report without any upload.
- If the deployment has no `GROQ_API_KEY`, running the sample data falls back to
  a clearly labeled demo report. Uploading your own resume requires a key.

## Getting started

```bash
npm install --legacy-peer-deps
cp .env.example .env.local
# add your GROQ_API_KEY to .env.local
npm run dev
```

Open <http://localhost:3000>.

> `--legacy-peer-deps` is required because the included `react-day-picker`
> version expects an older `date-fns` than the project uses. It is an unrelated
> shadcn/ui dependency.

### Deploy

1. Push the project to a GitHub repository.
2. Import the repository into Vercel (or another Node host).
3. Add `GROQ_API_KEY` under the project's environment variables.
4. Deploy. Without a key, the sample report and the labeled demo flow still
   work; live analysis of a visitor's resume stays disabled.

> Vercel caps serverless request bodies (4.5 MB on the Hobby plan) below the
> app's 10 MB PDF limit. For larger resumes, self-host or route uploads through
> object storage.

### Environment variables

| Variable | Required | Description |
| --- | --- | --- |
| `GROQ_API_KEY` | No | Enables live AI analysis. Without it, the sample/demo flow still works. |
| `GROQ_MODEL` | No | Defaults to `llama-3.3-70b-versatile`. |
| `NEXT_PUBLIC_CONTACT_EMAIL` | No | Address shown on the contact page and used by the mailto form. |

## Pages

| Route | Purpose |
| --- | --- |
| `/` | Landing page and analyzer |
| `/results` | Generated report (session-only) |
| `/sample` | Pre-generated sample report |
| `/about` | Mission, workflow, creator, tech stack |
| `/contact` | Contact form (mailto) and direct links |
| `/support` | Troubleshooting and FAQ |
| `/privacy` | Privacy policy |
| `/terms` | Terms of service |

## Project structure

```
app/
  api/analyze/          Groq request + Zod validation
  api/extract-pdf/      Real PDF text extraction
  about/ contact/ sample/ support/ privacy/ terms/ results/
  layout.tsx            Metadata and providers
  page.tsx              Landing page + analyzer
components/
  analysis.tsx          Report UI (scores, keywords, recommendations)
  header.tsx footer.tsx legal-page.tsx contact-form.tsx
hooks/
  AnalysisContext.tsx   Session-backed result store
lib/
  groq.ts               AI prompt + structured response validation
  analysis-schema.ts    Zod schema
  sample-data.ts        Demo resume, job description, sample report
  types.ts site.ts
```

## Notes

- AI output is guidance, not a hiring decision. Scores can vary between runs.
- Resume files are not written to a database. The report lives in browser
  session storage and is cleared when the tab closes.
- `next.config.mjs` externalizes `pdf-parse` so its Node-only code stays on the
  server.
- The app uses **Groq** (`GROQ_API_KEY`), not OpenAI. If you prefer another
  provider, replace `lib/groq.ts` and keep the Zod-validated response contract.
- Never commit a real key. `.env*` is ignored and `.env.example` is safe to
  commit. If a key was ever committed, pasted into a public repo, or shared in a
  screenshot, revoke and rotate it in the provider dashboard.
- This starter has no shared rate limiter. Before exposing a funded key
  publicly, add rate limiting or a hard usage cap in your AI provider dashboard.

## Creator

Built by **Hussnain Iftikhar**.

- GitHub: <https://github.com/SilentCoder-HI>
- LinkedIn: <https://www.linkedin.com/in/hussnain-iftikhar/>
- Portfolio: <https://silentcoder-portfolio.vercel.app/>
- Email: <ahofficiali116@gmail.com>
