import { useMemo } from "react";

export interface ResumeAnalysis {
  matchScore: number;
  atsScore: number;
  missingKeywords: string[];
  strengths: string[];
  recommendations: string[];
}

export function useParsedResumeAnalysis(rawAnalysisText: string): ResumeAnalysis | null {
  return useMemo(() => {
    if (!rawAnalysisText) return null;

    const extractScore = (label: string) => {
      const regex = new RegExp(`\\*\\*${label}: (\\d+)\\*\\*`, "i");
      const match = rawAnalysisText.match(regex);
      return match ? parseInt(match[1]) : 0;
    };

    const extractList = (sectionLabel: string): string[] => {
      const regex = new RegExp(`\\*\\*${sectionLabel}:\\*\\*\\n+([\\s\\S]*?)(?=\\*\\*\\d+\\. |\\*\\*\\w|$)`, "i");
      const match = rawAnalysisText.match(regex);
      if (!match) return [];

      return match[1]
        .split("\n")
        .map(line => line.trim().replace(/^\*+/, "").trim())
        .filter(line => line.length > 0);
    };

    return {
      matchScore: extractScore("1. Overall match score"),
      atsScore: extractScore("5. ATS compatibility score"),
      missingKeywords: extractList("2. Missing keywords"),
      strengths: extractList("3. Resume strengths"),
      recommendations: extractList("6. Specific actionable recommendations"),
    };
  }, [rawAnalysisText]);
}
