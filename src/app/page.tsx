"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useQuiz } from "@/context/QuizContext";
import { CheckCircle2, Clock, FileText, TrendingUp } from "lucide-react";

export default function HomePage() {
  const router = useRouter();
  const { isLoading, error, resetQuiz } = useQuiz();

  const handleStartQuiz = () => {
    resetQuiz(); // Reset any previous quiz data
    router.push("/quiz");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading quiz...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <Card className="max-w-md w-full">
          <CardHeader>
            <CardTitle className="text-destructive">Error</CardTitle>
            <CardDescription>Failed to load quiz data</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">{error}</p>
            <Button onClick={() => window.location.reload()} variant="outline">
              Retry
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <div className="quiz-container py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            RAG Assessment Quiz
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Evaluate your organization's performance across four key dimensions
            with our comprehensive Red-Amber-Green assessment
          </p>
        </div>

        {/* Main Card */}
        <Card className="max-w-3xl mx-auto mb-8">
          <CardHeader>
            <CardTitle className="text-2xl">
              Welcome to Your Assessment
            </CardTitle>
            <CardDescription>
              This assessment will help you identify strengths and opportunities
              across your organization
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Features Grid */}
            <div className="grid md:grid-cols-2 gap-4">
              <div className="flex items-start gap-3 p-4 rounded-lg border bg-card">
                <FileText className="w-5 h-5 text-primary mt-0.5" />
                <div>
                  <h3 className="font-semibold mb-1">40 Questions</h3>
                  <p className="text-sm text-muted-foreground">
                    Divided into 4 focused sections covering key business areas
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 rounded-lg border bg-card">
                <Clock className="w-5 h-5 text-primary mt-0.5" />
                <div>
                  <h3 className="font-semibold mb-1">15-20 Minutes</h3>
                  <p className="text-sm text-muted-foreground">
                    Estimated time to complete the full assessment
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 rounded-lg border bg-card">
                <TrendingUp className="w-5 h-5 text-primary mt-0.5" />
                <div>
                  <h3 className="font-semibold mb-1">Instant Results</h3>
                  <p className="text-sm text-muted-foreground">
                    Receive detailed insights and personalized recommendations
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 rounded-lg border bg-card">
                <CheckCircle2 className="w-5 h-5 text-primary mt-0.5" />
                <div>
                  <h3 className="font-semibold mb-1">Downloadable Report</h3>
                  <p className="text-sm text-muted-foreground">
                    Export your results as a PDF for easy sharing
                  </p>
                </div>
              </div>
            </div>

            {/* RAG Scoring Explanation */}
            <div className="p-4 rounded-lg border bg-muted/50">
              <h3 className="font-semibold mb-3">Understanding RAG Scoring</h3>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-rag-red"></div>
                  <span className="font-medium">Red:</span>
                  <span className="text-muted-foreground">
                    Needs significant improvement
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-rag-amber"></div>
                  <span className="font-medium">Amber:</span>
                  <span className="text-muted-foreground">
                    Adequate but room for growth
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-rag-green"></div>
                  <span className="font-medium">Green:</span>
                  <span className="text-muted-foreground">
                    Strong performance
                  </span>
                </div>
              </div>
            </div>

            {/* Sections Overview */}
            <div>
              <h3 className="font-semibold mb-3">Assessment Sections</h3>
              <ol className="space-y-2 text-sm">
                <li className="flex items-baseline gap-2">
                  <span className="font-semibold text-primary">1.</span>
                  <div>
                    <span className="font-medium">Strategic Planning</span>
                    <span className="text-muted-foreground ml-1">
                      - Vision, goals, and long-term planning
                    </span>
                  </div>
                </li>
                <li className="flex items-baseline gap-2">
                  <span className="font-semibold text-primary">2.</span>
                  <div>
                    <span className="font-medium">Operational Excellence</span>
                    <span className="text-muted-foreground ml-1">
                      - Process efficiency and effectiveness
                    </span>
                  </div>
                </li>
                <li className="flex items-baseline gap-2">
                  <span className="font-semibold text-primary">3.</span>
                  <div>
                    <span className="font-medium">Team & Leadership</span>
                    <span className="text-muted-foreground ml-1">
                      - People development and culture
                    </span>
                  </div>
                </li>
                <li className="flex items-baseline gap-2">
                  <span className="font-semibold text-primary">4.</span>
                  <div>
                    <span className="font-medium">Performance & Growth</span>
                    <span className="text-muted-foreground ml-1">
                      - Metrics, KPIs, and growth strategies
                    </span>
                  </div>
                </li>
              </ol>
            </div>

            {/* CTA Button */}
            <div className="pt-4">
              <Button
                onClick={handleStartQuiz}
                size="lg"
                className="w-full text-lg h-12"
              >
                Start Assessment
              </Button>
              <p className="text-center text-xs text-muted-foreground mt-2">
                You can navigate back and change answers at any time
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Footer Note */}
        <p className="text-center text-sm text-muted-foreground max-w-2xl mx-auto">
          This assessment is designed to provide insights into organizational
          capabilities. Your responses will help identify areas of strength and
          opportunities for improvement.
        </p>
      </div>
    </div>
  );
}
