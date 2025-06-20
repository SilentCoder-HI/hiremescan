export interface ResumeAnalysis {
    matchScore: number;
    atsScore: number;
    missingKeywords: string[];
    strengths: string[];
    recommendations: string[];
  }
  
  export interface Analysis {
    analysis: string;
  }