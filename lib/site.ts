export const siteConfig = {
  name: "HireMeScan",
  tagline: "Check how well your resume matches a job",
  description:
    "HireMeScan compares your resume with a job description and gives you a clear match score, an ATS estimate, keyword gaps, and practical fixes.",
  creator: {
    name: "Hussnain Iftikhar",
    role: "Full-stack developer",
    github: "https://github.com/SilentCoder-HI",
    linkedin: "https://www.linkedin.com/in/hussnain-iftikhar/",
    portfolio: "https://silentcoder-portfolio.vercel.app/",
  },
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || "ahofficiali116@gmail.com",
} as const
