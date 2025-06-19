"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import {
  Upload,
  FileText,
  Brain,
  CheckCircle,
  AlertCircle,
  TrendingUp,
  Sparkles,
  Zap,
  Target,
  Award,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Footer } from "@/components/footer"
import { Header } from "@/components/header"

interface AnalysisResult {
  overallScore: number
  missingKeywords: string[]
  strengths: string[]
  improvements: string[]
  atsCompatibility: number
  recommendations: string[]
}

export default function HireMeScan() {
  const [resumeFile, setResumeFile] = useState<File | null>(null)
  const [jobDescription, setJobDescription] = useState("")
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [resumeText, setResumeText] = useState("")

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file && file.type === "application/pdf") {
      setResumeFile(file)
    }
  }

  const handleAnalyze = async () => {
    if (!resumeFile || !jobDescription.trim()) return

    setIsAnalyzing(true)

    try {
      const formData = new FormData()
      formData.append("resume", resumeFile)

      const extractResponse = await fetch("/api/extract-pdf", {
        method: "POST",
        body: formData,
      })

      const { text } = await extractResponse.json()
      setResumeText(text)

      const analysisResponse = await fetch("/api/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          resumeText: text,
          jobDescription,
        }),
      })

      const result = await analysisResponse.json()
      setAnalysis(result)
    } catch (error) {
      console.error("Analysis failed:", error)
    } finally {
      setIsAnalyzing(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute top-40 left-40 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>
      <Header />
      <div className="relative z-10">
        <div className="container mx-auto px-4 py-12">
          {/* Enhanced Header */}
          <div className="text-center mb-16">
            <div className="flex items-center justify-center mb-6">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full blur-lg opacity-75 animate-pulse"></div>
                <div className="relative bg-gradient-to-r from-blue-600 to-purple-600 p-4 rounded-full">
                  <Brain className="h-12 w-12 text-white" />
                </div>
              </div>
            </div>
            <h1 className="text-6xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-6">
              HireMeScan
            </h1>
            <div className="flex items-center justify-center gap-2 mb-6">
              <Sparkles className="h-5 w-5 text-yellow-400" />
              <span className="text-yellow-400 font-semibold">AI-Powered</span>
              <Sparkles className="h-5 w-5 text-yellow-400" />
            </div>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Transform your resume with cutting-edge AI analysis. Get personalized feedback, beat ATS systems, and land
              your dream job with our advanced resume optimization platform.
            </p>

            {/* Stats */}
            <div className="flex justify-center gap-8 mt-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-400">98%</div>
                <div className="text-sm text-gray-400">Success Rate</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-400">50K+</div>
                <div className="text-sm text-gray-400">Resumes Analyzed</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-pink-400">24/7</div>
                <div className="text-sm text-gray-400">AI Available</div>
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 max-w-7xl mx-auto">
            {/* Enhanced Input Section */}
            <div className="space-y-8">
              {/* Resume Upload */}
              <Card className="bg-white/10 backdrop-blur-lg border-white/20 shadow-2xl hover:shadow-purple-500/25 transition-all duration-300">
                <CardHeader>
                  <CardTitle className="flex items-center text-white text-xl">
                    <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-2 rounded-lg mr-3">
                      <Upload className="h-5 w-5 text-white" />
                    </div>
                    Upload Your Resume
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="border-2 border-dashed border-purple-400/50 rounded-xl p-8 text-center hover:border-purple-400 transition-all duration-300 bg-gradient-to-br from-purple-500/10 to-blue-500/10 hover:from-purple-500/20 hover:to-blue-500/20">
                    <input
                      type="file"
                      accept=".pdf"
                      onChange={handleFileUpload}
                      className="hidden"
                      id="resume-upload"
                    />
                    <label htmlFor="resume-upload" className="cursor-pointer">
                      <div className="relative mb-4">
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full blur opacity-75"></div>
                        <div className="relative bg-gradient-to-r from-blue-500 to-purple-500 p-4 rounded-full w-fit mx-auto">
                          <FileText className="h-8 w-8 text-white" />
                        </div>
                      </div>
                      <p className="text-lg font-semibold text-white mb-2">
                        {resumeFile ? (
                          <span className="text-green-400 flex items-center justify-center gap-2">
                            <CheckCircle className="h-5 w-5" />
                            {resumeFile.name}
                          </span>
                        ) : (
                          "Drop your resume here or click to browse"
                        )}
                      </p>
                      <p className="text-sm text-gray-400">PDF format • Max 10MB</p>
                    </label>
                  </div>
                </CardContent>
              </Card>

              {/* Job Description */}
              <Card className="bg-white/10 backdrop-blur-lg border-white/20 shadow-2xl hover:shadow-blue-500/25 transition-all duration-300">
                <CardHeader>
                  <CardTitle className="text-white text-xl flex items-center">
                    <div className="bg-gradient-to-r from-green-500 to-blue-500 p-2 rounded-lg mr-3">
                      <Target className="h-5 w-5 text-white" />
                    </div>
                    Target Job Description
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Label htmlFor="job-description" className="text-gray-300 font-medium">
                    Paste the complete job description for precise matching
                  </Label>
                  <Textarea
                    id="job-description"
                    placeholder="Paste the job description here... Include requirements, responsibilities, and preferred qualifications for best results."
                    value={jobDescription}
                    onChange={(e) => setJobDescription(e.target.value)}
                    className="mt-3 min-h-[240px] bg-white/5 border-white/20 text-white placeholder:text-gray-400 focus:border-purple-400 focus:ring-purple-400/50 resize-none"
                  />
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-xs text-gray-400">{jobDescription.length} characters</span>
                    <span className="text-xs text-gray-400">Recommended: 500+ words</span>
                  </div>
                </CardContent>
              </Card>

              {/* Enhanced Analyze Button */}
              <div className="relative">
                <Button
                  onClick={handleAnalyze}
                  disabled={!resumeFile || !jobDescription.trim() || isAnalyzing}
                  className="w-full h-16 text-lg font-semibold bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 border-0 shadow-2xl hover:shadow-purple-500/50 transition-all duration-300 transform hover:scale-105 disabled:transform-none disabled:hover:shadow-none"
                  size="lg"
                >
                  {isAnalyzing ? (
                    <>
                      <div className="flex items-center">
                        <Brain className="h-6 w-6 mr-3 animate-spin" />
                        <div className="flex flex-col items-start">
                          <span>Analyzing Your Resume...</span>
                          <span className="text-xs opacity-75">This may take 10-15 seconds</span>
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <Zap className="h-6 w-6 mr-3" />
                      Start AI Analysis
                    </>
                  )}
                </Button>
                {!isAnalyzing && resumeFile && jobDescription.trim() && (
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg blur opacity-75 -z-10 animate-pulse"></div>
                )}
              </div>
            </div>

            {/* Enhanced Results Section */}
            <div className="space-y-8">
              {analysis ? (
                <>
                  {/* Overall Score with Animation */}
                  <Card className="bg-gradient-to-br from-green-500/20 to-blue-500/20 backdrop-blur-lg border-green-400/30 shadow-2xl">
                    <CardHeader>
                      <CardTitle className="flex items-center text-white text-xl">
                        <Award className="h-6 w-6 mr-3 text-yellow-400" />
                        Match Score
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-center">
                        <div className="relative mb-6">
                          <div className="text-6xl font-bold bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent mb-2">
                            {analysis.overallScore}%
                          </div>
                          <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-blue-400 blur-xl opacity-30 animate-pulse"></div>
                        </div>
                        <Progress value={analysis.overallScore} className="mb-4 h-3" />
                        <p className="text-gray-300 font-medium">
                          {analysis.overallScore >= 80
                            ? "🎉 Outstanding match! You're ready to apply!"
                            : analysis.overallScore >= 60
                              ? "💪 Good foundation with optimization potential"
                              : "🚀 Great opportunity for significant improvement"}
                        </p>
                      </div>
                    </CardContent>
                  </Card>

                  {/* ATS Compatibility */}
                  <Card className="bg-white/10 backdrop-blur-lg border-white/20 shadow-2xl">
                    <CardHeader>
                      <CardTitle className="text-white flex items-center">
                        <div className="bg-gradient-to-r from-orange-500 to-red-500 p-2 rounded-lg mr-3">
                          <TrendingUp className="h-5 w-5 text-white" />
                        </div>
                        ATS Compatibility
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-gray-300">Parsing Score</span>
                        <span className="font-bold text-2xl text-orange-400">{analysis.atsCompatibility}%</span>
                      </div>
                      <Progress value={analysis.atsCompatibility} className="mb-4 h-2" />
                      <p className="text-sm text-gray-300">
                        {analysis.atsCompatibility >= 80
                          ? "✅ Excellent ATS compatibility - your resume will parse perfectly"
                          : "⚠️ Consider formatting improvements for better ATS parsing"}
                      </p>
                    </CardContent>
                  </Card>

                  {/* Missing Keywords */}
                  <Card className="bg-white/10 backdrop-blur-lg border-white/20 shadow-2xl">
                    <CardHeader>
                      <CardTitle className="flex items-center text-white">
                        <AlertCircle className="h-5 w-5 mr-2 text-red-400" />
                        Missing Keywords
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2">
                        {analysis.missingKeywords.map((keyword, index) => (
                          <Badge
                            key={index}
                            className="bg-red-500/20 text-red-300 border-red-400/50 hover:bg-red-500/30 transition-colors"
                          >
                            {keyword}
                          </Badge>
                        ))}
                      </div>
                      {analysis.missingKeywords.length === 0 && (
                        <div className="text-center py-4">
                          <CheckCircle className="h-12 w-12 text-green-400 mx-auto mb-2" />
                          <p className="text-green-400 font-semibold">Perfect keyword coverage!</p>
                        </div>
                      )}
                    </CardContent>
                  </Card>

                  {/* Strengths */}
                  <Card className="bg-white/10 backdrop-blur-lg border-white/20 shadow-2xl">
                    <CardHeader>
                      <CardTitle className="flex items-center text-white">
                        <CheckCircle className="h-5 w-5 mr-2 text-green-400" />
                        Your Strengths
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {analysis.strengths.map((strength, index) => (
                          <div
                            key={index}
                            className="flex items-start bg-green-500/10 p-3 rounded-lg border border-green-400/20"
                          >
                            <CheckCircle className="h-5 w-5 text-green-400 mr-3 mt-0.5 flex-shrink-0" />
                            <span className="text-gray-300">{strength}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Recommendations */}
                  <Card className="bg-white/10 backdrop-blur-lg border-white/20 shadow-2xl">
                    <CardHeader>
                      <CardTitle className="text-white flex items-center">
                        <Sparkles className="h-5 w-5 mr-2 text-purple-400" />
                        AI Recommendations
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {analysis.recommendations.map((rec, index) => (
                          <div
                            key={index}
                            className="flex items-start bg-purple-500/10 p-4 rounded-lg border border-purple-400/20 hover:bg-purple-500/20 transition-colors"
                          >
                            <div className="bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-4 mt-0.5 flex-shrink-0">
                              {index + 1}
                            </div>
                            <span className="text-gray-300 leading-relaxed">{rec}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </>
              ) : (
                <Card className="bg-white/5 backdrop-blur-lg border-white/10 shadow-2xl">
                  <CardContent className="text-center py-16">
                    <div className="relative mb-6">
                      <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full blur-xl opacity-30"></div>
                      <div className="relative bg-gradient-to-r from-purple-500 to-blue-500 p-6 rounded-full w-fit mx-auto">
                        <Brain className="h-16 w-16 text-white" />
                      </div>
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-4">Ready for AI Analysis</h3>
                    <p className="text-gray-400 max-w-md mx-auto leading-relaxed">
                      Upload your resume and paste a job description to unlock powerful AI insights and personalized
                      optimization recommendations.
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </div>
  )
}
