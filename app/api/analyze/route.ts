import { NextResponse } from "next/server"
import { z } from "zod"
import {
  AnalysisConfigError,
  AnalysisResponseError,
  analyzeResumeWithGroq,
} from "@/lib/groq"

export const runtime = "nodejs"
export const maxDuration = 60

const bodySchema = z.object({
  resumeText: z
    .string()
    .trim()
    .min(40, "The resume text is too short to analyze.")
    .max(60_000, "The resume text is too long."),
  jobDescription: z
    .string()
    .trim()
    .min(40, "The job description is too short to analyze.")
    .max(30_000, "The job description is too long."),
})

export async function POST(req: Request) {
  let body: unknown
  try {
    body = await req.json()
  } catch {
    return NextResponse.json(
      { error: "Invalid request body.", code: "INVALID_BODY" },
      { status: 400 }
    )
  }

  const parsedBody = bodySchema.safeParse(body)
  if (!parsedBody.success) {
    return NextResponse.json(
      {
        error: parsedBody.error.issues[0]?.message || "Invalid request.",
        code: "INVALID_INPUT",
      },
      { status: 400 }
    )
  }

  try {
    const analysis = await analyzeResumeWithGroq(
      parsedBody.data.resumeText,
      parsedBody.data.jobDescription
    )
    return NextResponse.json({ analysis })
  } catch (error) {
    if (error instanceof AnalysisConfigError) {
      return NextResponse.json(
        {
          error: "AI analysis is not configured.",
          code: "AI_NOT_CONFIGURED",
          message:
            "Live AI analysis is not configured on this deployment.",
        },
        { status: 503 }
      )
    }

    if (error instanceof AnalysisResponseError) {
      return NextResponse.json(
        { error: error.message, code: "AI_FAILED" },
        { status: 502 }
      )
    }

    console.error("Unexpected analyze error:", error)
    return NextResponse.json(
      {
        error: "Something went wrong while analyzing your resume.",
        code: "UNKNOWN",
      },
      { status: 500 }
    )
  }
}
