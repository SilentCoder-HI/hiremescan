"use client";

import React, { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Upload,
  FileText,
  Brain,
  CheckCircle,
  Sparkles,
  Zap,
  Target,
} from "lucide-react";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { useRouter } from "next/navigation";
import { useAnalysis } from "@/hooks/AnalysisContext";

export default function HireMeScan() {
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [jobDescription, setJobDescription] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [resumeText, setResumeText] = useState("");
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const { setAnalysis } = useAnalysis();

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    setError(null);
    const file = event.target.files?.[0];
    if (!file) return;

    if (file.type !== "application/pdf") {
      setError("Please upload a PDF file.");
      setResumeFile(null);
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setError("File size exceeds 10MB limit.");
      setResumeFile(null);
      return;
    }

    setResumeFile(file);

    // ✅ Reset file input to allow re-selecting the same file
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleDrop = (event: React.DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
    setError(null);
    const file = event.dataTransfer.files?.[0];
    if (!file) return;

    if (file.type !== "application/pdf") {
      setError("Please upload a PDF file.");
      setResumeFile(null);
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setError("File size exceeds 10MB limit.");
      setResumeFile(null);
      return;
    }

    setResumeFile(file);

    // ✅ Reset for drag-drop too
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
  };

  const handleAnalyze = async () => {
    setError(null);
    if (!resumeFile) {
      setError("Please upload your resume (PDF).");
      return;
    }

    if (!jobDescription.trim()) {
      setError("Please paste the job description.");
      return;
    }

    setIsAnalyzing(true);

    try {
      const formData = new FormData();
      formData.append("resume", resumeFile);

      const extractResponse = await fetch("/api/extract-pdf", {
        method: "POST",
        body: formData,
      });

      if (!extractResponse.ok) {
        throw new Error("Failed to extract text from PDF.");
      }

      const { text } = await extractResponse.json();
      setResumeText(text);

      const analysisResponse = await fetch("/api/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          resumeText: text,
          jobDescription,
        }),
      });

      if (!analysisResponse.ok) {
        throw new Error("AI analysis failed. Please try again.");
      }

      const result = await analysisResponse.json();
      setAnalysis(result);
      router.push("/results");
    } catch (err: any) {
      setError(
        err?.message ||
          "An unexpected error occurred during analysis. Please try again."
      );
      setAnalysis(null);
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden font-sans">
      {/* Animated Blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none select-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute top-40 left-40 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <Header />
      <main className="relative z-10">
        <div className="container mx-auto px-4 py-12">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center mb-6">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full blur-lg opacity-75 animate-pulse"></div>
                <div className="relative bg-gradient-to-r from-blue-600 to-purple-600 p-4 rounded-full">
                  <Brain className="h-12 w-12 text-white drop-shadow-lg" />
                </div>
              </div>
            </div>
            <h1 className="text-6xl font-extrabold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-6 drop-shadow-lg tracking-tight">
              HireMeScan
            </h1>
            <div className="flex items-center justify-center gap-2 mb-6">
              <Sparkles className="h-5 w-5 text-yellow-400 animate-bounce" />
              <span className="text-yellow-400 font-semibold text-lg tracking-wide">
                AI-Powered
              </span>
              <Sparkles className="h-5 w-5 text-yellow-400 animate-bounce" />
            </div>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Transform your resume with cutting-edge AI analysis. Get personalized feedback, beat ATS systems, and land your dream job with our advanced resume optimization platform.
            </p>
          </div>

          <div className="flex flex-col max-w-7xl mx-auto gap-8">
            <div className="flex flex-col md:flex-row gap-8">
              {/* Resume Upload Card */}
              <Card className="bg-white/10 backdrop-blur-lg border-white/20 shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 flex-1">
                <CardHeader>
                  <CardTitle className="flex items-center text-white text-xl">
                    <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-2 rounded-lg mr-3">
                      <Upload className="h-5 w-5 text-white" />
                    </div>
                    Upload Your Resume
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div
                    className="border-2 border-dashed border-purple-400/50 rounded-xl p-8 text-center hover:border-purple-400 transition-all duration-300 bg-gradient-to-br from-purple-500/10 to-blue-500/10 hover:from-purple-500/20 hover:to-blue-500/20 cursor-pointer"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept=".pdf"
                      onChange={handleFileUpload}
                      className="hidden"
                      id="resume-upload"
                    />
                    <label
                      htmlFor="resume-upload"
                      className="cursor-pointer"
                      onDrop={handleDrop}
                      onDragOver={handleDragOver}
                    >
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
                  {error && (
                    <div className="mt-3 text-sm text-red-400 font-medium text-center animate-pulse">
                      {error}
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Job Description Card */}
              <Card className="bg-white/10 backdrop-blur-lg border-white/20 shadow-2xl hover:shadow-blue-500/25 transition-all duration-300 flex-1">
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
                    placeholder="Paste the job description here..."
                    value={jobDescription}
                    onChange={(e) => setJobDescription(e.target.value)}
                    className="mt-3 min-h-[240px] bg-white/5 border-white/20 text-white placeholder:text-gray-400 focus:border-purple-400 focus:ring-purple-400/50 resize-none"
                    maxLength={5000}
                  />
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-xs text-gray-400">
                      {jobDescription.length} characters
                    </span>
                    <span className="text-xs text-gray-400">
                      Recommended: 500+ words
                    </span>
                  </div>
                  <div className="relative mt-6">
                    <Button
                      onClick={handleAnalyze}
                      disabled={!resumeFile || !jobDescription.trim() || isAnalyzing}
                      className="w-full h-16 text-lg font-semibold bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 border-0 shadow-2xl hover:shadow-purple-500/50 transition-all duration-300 transform hover:scale-105 disabled:transform-none disabled:hover:shadow-none"
                      size="lg"
                    >
                      {isAnalyzing ? (
                        <div className="flex items-center">
                          <Brain className="h-6 w-6 mr-3 animate-spin" />
                          <div className="flex flex-col items-start">
                            <span>Analyzing Your Resume...</span>
                            <span className="text-xs opacity-75">
                              This may take 10–15 seconds
                            </span>
                          </div>
                        </div>
                      ) : (
                        <div className="flex items-center">
                          <Zap className="h-6 w-6 mr-3" />
                          <span>Start AI Analysis</span>
                        </div>
                      )}
                    </Button>
                    {!isAnalyzing && resumeFile && jobDescription.trim() && (
                      <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg blur opacity-75 -z-10 animate-pulse pointer-events-none"></div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Info Card */}
            <div className="flex flex-row gap-4 mt-8">
              <Card className="bg-white/5 backdrop-blur-lg border-white/10 shadow-2xl w-full">
                <CardContent className="text-center py-16">
                  <div className="relative mb-6">
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full blur-xl opacity-30"></div>
                    <div className="relative bg-gradient-to-r from-purple-500 to-blue-500 p-6 rounded-full w-fit mx-auto">
                      <Brain className="h-16 w-16 text-white" />
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">
                    Ready for AI Analysis
                  </h3>
                  <p className="text-gray-400 max-w-md mx-auto leading-relaxed">
                    Upload your resume and paste a job description to unlock powerful AI insights and personalized optimization recommendations.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
