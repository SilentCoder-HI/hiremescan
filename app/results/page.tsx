"use client";

import React from "react";
import { useAnalysis } from "@/hooks/AnalysisContext";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { Brain } from "lucide-react";
import { AnalysisResults } from "@/components/analysis";
import { useParsedResumeAnalysis } from "@/hooks/Parser";

export default function ResultsPage() {
    const { analysis } = useAnalysis(); // ✅ Already parsed object
    const parsed = useParsedResumeAnalysis(analysis?.analysis || "");

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
            {/* Animated Background Elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob" />
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000" />
                <div className="absolute top-40 left-40 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000" />
            </div>

            <Header />

            <div className="relative z-10">
                <div className="container px-4 py-12 mx-auto">
                    <div className="space-y-8">
                        {parsed ? (
                            <AnalysisResults analysis={parsed} />
                        ) : (
                            <div className="bg-white/5 backdrop-blur-lg border-white/10 shadow-2xl rounded-xl">
                                <div className="text-center py-16 px-6">
                                    <div className="relative mb-6">
                                        <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full blur-xl opacity-30" />
                                        <div className="relative bg-gradient-to-r from-purple-500 to-blue-500 p-6 rounded-full w-fit mx-auto">
                                            <Brain className="h-16 w-16 text-white" />
                                        </div>
                                    </div>
                                    <h3 className="text-2xl font-bold text-white mb-4">No Analysis Data</h3>
                                    <p className="text-gray-400 max-w-md mx-auto leading-relaxed">
                                        Please upload your resume and analyze it on the home page first.
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
                <Footer />
            </div>
        </div>
    );
}
