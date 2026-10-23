"use client"

import React, { createContext, useCallback, useContext, useEffect, useState } from "react"
import type { AnalysisResult } from "@/lib/types"

const STORAGE_KEY = "hiremescan:analysis"

interface AnalysisContextType {
  analysis: AnalysisResult | null
  hydrated: boolean
  setAnalysis: (result: AnalysisResult | null) => void
  clearAnalysis: () => void
}

const AnalysisContext = createContext<AnalysisContextType | undefined>(undefined)

export function AnalysisProvider({ children }: { children: React.ReactNode }) {
  const [analysis, setAnalysisState] = useState<AnalysisResult | null>(null)
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    try {
      const stored = window.sessionStorage.getItem(STORAGE_KEY)
      if (stored) {
        const parsed = JSON.parse(stored) as Partial<AnalysisResult>
        const isValid =
          parsed &&
          typeof parsed.matchScore === "number" &&
          typeof parsed.atsScore === "number" &&
          typeof parsed.summary === "string" &&
          Array.isArray(parsed.matchedKeywords) &&
          Array.isArray(parsed.missingKeywords) &&
          Array.isArray(parsed.strengths) &&
          Array.isArray(parsed.improvements) &&
          Array.isArray(parsed.recommendations)

        if (isValid) {
          setAnalysisState(parsed as AnalysisResult)
        } else {
          window.sessionStorage.removeItem(STORAGE_KEY)
        }
      }
    } catch {
      window.sessionStorage.removeItem(STORAGE_KEY)
    } finally {
      setHydrated(true)
    }
  }, [])

  const setAnalysis = useCallback((result: AnalysisResult | null) => {
    setAnalysisState(result)
    try {
      if (result) {
        window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(result))
      } else {
        window.sessionStorage.removeItem(STORAGE_KEY)
      }
    } catch {
      // Session storage can be unavailable in private browsing. The result
      // still works in memory for this visit.
    }
  }, [])

  const clearAnalysis = useCallback(() => setAnalysis(null), [setAnalysis])

  return (
    <AnalysisContext.Provider
      value={{ analysis, hydrated, setAnalysis, clearAnalysis }}
    >
      {children}
    </AnalysisContext.Provider>
  )
}

export function useAnalysis() {
  const context = useContext(AnalysisContext)
  if (!context) {
    throw new Error("useAnalysis must be used within an AnalysisProvider")
  }
  return context
}
