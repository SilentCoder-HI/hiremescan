import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card";
  import { Progress } from "@/components/ui/progress";
  import {
    Award,
    TrendingUp,
    AlertCircle,
    CheckCircle,
    Sparkles,
  } from "lucide-react";
  import { Badge } from "@/components/ui/badge";
  import { ResumeAnalysis } from "@/hooks/praser";
  
  export function AnalysisResults({ analysis }: { analysis: ResumeAnalysis }) {
    return (
      <div className="space-y-8 w-full mx-auto flex flex-col gap-4 justify-center">
        {/* Match Score - Full Width */}
        <Card className="bg-black/10 backdrop-blur-lg w-full border-green-400/30 shadow-2xl">
          <CardHeader>
            <CardTitle className="flex items-center text-white text-xl">
              <Award className="h-6 w-6 mr-3 text-yellow-400" />
              Match Score
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center">
              <div className="text-6xl font-bold bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent mb-2">
                {analysis.matchScore}%
              </div>
              <Progress value={analysis.matchScore} className="mb-4 h-3" />
            </div>
          </CardContent>
        </Card>
  
        {/* ATS + Missing Keywords - Two Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* ATS Score */}
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
                <span className="font-bold text-2xl text-orange-400">
                  {analysis.atsScore}%
                </span>
              </div>
              <Progress value={analysis.atsScore} className="mb-4 h-2" />
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
              {analysis.missingKeywords.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {analysis.missingKeywords.map((keyword: string, index: number) => (
                    <Badge
                      key={index}
                      className="bg-red-500/20 text-red-300 border-red-400/50 hover:bg-red-500/30 transition-colors"
                    >
                      {keyword}
                    </Badge>
                  ))}
                </div>
              ) : (
                <div className="text-center py-4">
                  <CheckCircle className="h-12 w-12 text-green-400 mx-auto mb-2" />
                  <p className="text-green-400 font-semibold">
                    Perfect keyword coverage!
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
  
        {/* Resume Strengths */}
        <Card className="bg-white/10 backdrop-blur-lg border-white/20 shadow-2xl">
          <CardHeader>
            <CardTitle className="flex items-center text-white">
              <CheckCircle className="h-5 w-5 mr-2 text-green-400" />
              Resume Strengths
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {analysis.strengths.map((point: string, index: number) => (
                <div
                  key={index}
                  className="flex items-start bg-green-500/10 p-3 rounded-lg border border-green-400/20"
                >
                  <CheckCircle className="h-5 w-5 text-green-400 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-300">{point}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
  
        {/* AI Recommendations */}
        <Card className="bg-white/10 backdrop-blur-lg border-white/20 shadow-2xl">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Sparkles className="h-5 w-5 mr-2 text-purple-400" />
              AI Recommendations
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {analysis.recommendations.map((tip: string, index: number) => (
                <div
                  key={index}
                  className="flex items-start bg-purple-500/10 p-4 rounded-lg border border-purple-400/20 hover:bg-purple-500/20 transition-colors"
                >
                  <div className="bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-4 mt-0.5 flex-shrink-0">
                    {index + 1}
                  </div>
                  <span className="text-gray-300 leading-relaxed">{tip}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }
  