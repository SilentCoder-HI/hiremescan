import type { AnalysisResult } from "@/lib/types"

export const SAMPLE_JOB_TITLE = "Senior Frontend Engineer — Northstar Labs"

export const SAMPLE_JOB_DESCRIPTION = `Senior Frontend Engineer — Northstar Labs

About the role
Northstar Labs builds analytics products used by operations teams at fast-growing companies. We are looking for a Senior Frontend Engineer to own the product experience end to end, from design-system work to performance and accessibility.

What you will do
- Build and maintain complex, data-rich interfaces with React, TypeScript, and Next.js
- Partner with design to evolve our component library and design system
- Improve Core Web Vitals and frontend observability
- Write accessible UI that meets WCAG 2.2 AA
- Mentor engineers and lead technical design reviews
- Work closely with backend teams on REST and GraphQL contracts

What we are looking for
- 5+ years of professional frontend experience
- Deep knowledge of React, TypeScript, and modern state management
- Experience with Next.js App Router and server components
- Strong understanding of web performance, caching, and accessibility
- Experience with testing (Playwright or Cypress)
- Clear written communication and a product mindset

Nice to have
- Experience with design systems and Storybook
- Experimentation and A/B testing experience
- Familiarity with GraphQL
- Background in analytics or data visualization`

export const SAMPLE_RESUME = `ALEX MORGAN
Senior Frontend Engineer
alex.morgan@example.com · Berlin, Germany · github.com/alexmorgan

SUMMARY
Frontend engineer with 7 years of experience building accessible, high-performance product interfaces. I lead front-end architecture for a B2B analytics platform and enjoy turning complex data into clear, usable workflows.

EXPERIENCE

Senior Frontend Engineer — Beacon Analytics (2022 - present)
- Led the migration of a legacy dashboard to Next.js and TypeScript, cutting initial load time by 41%
- Built a shared component library used by four product teams, reducing UI defects by 28%
- Improved Lighthouse accessibility scores from 78 to 98 across core flows
- Introduced Playwright end-to-end tests for checkout and onboarding, reducing release regressions
- Mentored two mid-level engineers and ran weekly frontend design reviews

Frontend Engineer — Cartwheel (2019 - 2022)
- Delivered React dashboards for 12k monthly active users
- Rebuilt the data table with virtualization, improving render time by 4x
- Worked with designers to define reusable design tokens and patterns
- Integrated REST APIs and improved loading and error states across the app

Junior Web Developer — Studio Kite (2018 - 2019)
- Built responsive marketing sites with React and Tailwind CSS
- Improved page speed scores through image optimization and code splitting

SKILLS
React, TypeScript, Next.js, JavaScript, Tailwind CSS, component libraries, REST APIs, accessibility (WCAG), web performance, Playwright, Git, GitHub Actions, Figma collaboration

EDUCATION
BSc Computer Science — Technical University of Berlin

SELECTED PROJECTS
- Open-source accessible date picker with 1.2k GitHub stars
- Internal experimentation dashboard used to run A/B tests`

export const SAMPLE_ANALYSIS: AnalysisResult = {
  matchScore: 86,
  atsScore: 92,
  summary:
    "A strong senior frontend match. The resume demonstrates the required React, TypeScript, Next.js, performance, accessibility, and mentoring experience. The main gaps are GraphQL, design-system ownership language, and modern component tooling, which are called out explicitly in the job description.",
  matchedKeywords: [
    "React",
    "TypeScript",
    "Next.js",
    "Accessibility",
    "Web performance",
    "Playwright",
    "Component library",
    "Mentoring",
    "REST APIs",
  ],
  missingKeywords: ["GraphQL", "Storybook", "Design system ownership", "Experimentation"],
  strengths: [
    "Directly matches the seniority and years-of-experience requirement.",
    "Shows measurable outcomes: 41% faster load time, 28% fewer UI defects, and accessibility scores from 78 to 98.",
    "Covers the core stack (React, TypeScript, Next.js) plus testing with Playwright.",
    "Demonstrates leadership through mentoring and frontend design reviews.",
  ],
  improvements: [
    "Add GraphQL to your skills or project bullets if you have used it, even in a supporting role.",
    "Name Storybook or the specific tooling used to maintain the component library.",
    "Reframe component-library work as design-system ownership to mirror the job description.",
    "Add one bullet about experimentation or A/B testing if applicable.",
  ],
  recommendations: [
    "Rewrite the summary to name the target role and two of the job's highest-priority requirements.",
    "Quantify the scale of the component library (number of components, teams, or weekly consumers).",
    "Move Playwright and accessibility experience higher in the resume so a recruiter sees them in the first scan.",
    "Add a short 'Selected projects' line describing the experimentation dashboard and the decision it supported.",
    "Use the exact phrase 'design system' in at least one experience bullet to improve keyword matching.",
  ],
  jobTitle: SAMPLE_JOB_TITLE,
  fileName: "Sample resume",
  isSample: true,
}
