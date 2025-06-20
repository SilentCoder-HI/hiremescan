"use client"
import React, { createContext, useContext, useState, ReactNode } from "react"

interface AnalysisResult {
  overallScore: number
  missingKeywords: string[]
  strengths: string[]
  improvements: string[]
  atsCompatibility: number
  recommendations: string[]
}

interface AnalysisContextType {
  analysis: AnalysisResult | null
  setAnalysis: (result: AnalysisResult | null) => void
}

const AnalysisContext = createContext<AnalysisContextType | undefined>(undefined)

export const AnalysisProvider = ({ children }: { children: ReactNode }) => {
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null)
  return (
    <AnalysisContext.Provider value={{ analysis, setAnalysis }}>
      {children}
    </AnalysisContext.Provider>
  )
}

export const useAnalysis = () => {
  const context = useContext(AnalysisContext)
  if (!context) {
    throw new Error("useAnalysis must be used within an AnalysisProvider")
  }
  return context
} 