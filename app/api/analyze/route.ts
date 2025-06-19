import { openai } from "@ai-sdk/openai"
import { generateObject } from "ai"
import { z } from "zod"

const analysisSchema = z.object({
  overallScore: z.number().min(0).max(100),
  missingKeywords: z.array(z.string()),
  strengths: z.array(z.string()),
  improvements: z.array(z.string()),
  atsCompatibility: z.number().min(0).max(100),
  recommendations: z.array(z.string()),
})

export async function POST(request: Request) {
  try {
    const { resumeText, jobDescription } = await request.json()

    const { object } = await generateObject({
      model: openai("gpt-4o"),
      schema: analysisSchema,
      prompt: `
        Analyze this resume against the job description and provide detailed feedback:

        RESUME:
        ${resumeText}

        JOB DESCRIPTION:
        ${jobDescription}

        Please provide:
        1. Overall match score (0-100)
        2. Missing keywords that should be added
        3. Current strengths of the resume
        4. Areas for improvement
        5. ATS compatibility score (0-100)
        6. Specific actionable recommendations

        Focus on:
        - Keyword matching and optimization
        - ATS-friendly formatting suggestions
        - Skills alignment with job requirements
        - Experience relevance
        - Quantifiable achievements
      `,
    })

    return Response.json(object)
  } catch (error) {
    console.error("Analysis error:", error)
    return Response.json({ error: "Failed to analyze resume" }, { status: 500 })
  }
}
