export interface AnalysisResult {
  matchScore: number
  atsScore: number
  summary: string
  missingKeywords: string[]
  matchedKeywords: string[]
  strengths: string[]
  improvements: string[]
  recommendations: string[]
  jobTitle?: string
  fileName?: string
  createdAt?: string
  isSample?: boolean
  isDemo?: boolean
}

export interface ApiErrorBody {
  error: string
  code?: string
  message?: string
}
