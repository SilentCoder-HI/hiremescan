import { z } from "zod"

const keywordList = z
  .array(z.string())
  .default([])
  .transform((items) =>
    Array.from(
      new Set(
        items
          .map((item) => item.trim())
          .filter((item) => item.length > 0)
      )
    )
  )

export const analysisSchema = z.object({
  matchScore: z.coerce.number().min(0).max(100).transform((value) => Math.round(value)),
  atsScore: z.coerce.number().min(0).max(100).transform((value) => Math.round(value)),
  summary: z.string().trim().min(1),
  missingKeywords: keywordList,
  matchedKeywords: keywordList,
  strengths: keywordList,
  improvements: keywordList,
  recommendations: keywordList,
})

export type ParsedAnalysis = z.infer<typeof analysisSchema>
