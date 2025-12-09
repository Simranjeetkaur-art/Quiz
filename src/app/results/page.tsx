"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useQuiz } from "@/context/QuizContext";
import { QuizResults } from "@/types/quiz.types";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { SectionScoreCard } from "@/components/Results/SectionScore";
import { Separator } from "@/components/ui/separator";
import { calculatePercentage } from "@/lib/scoring";
import { Download, RotateCcw, Share2 } from "lucide-react";

export default function ResultsPage() {
  const router = useRouter();
  const { quizData, answers, isQuizComplete, calculateResults, resetQuiz } =
    useQuiz();
  const [results, setResults] = useState<QuizResults | null>(null);
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);

  useEffect(() => {
    // Redirect to quiz if not complete
    if (!isQuizComplete) {
      router.push("/quiz");
      return;
    }

    // Calculate results
    try {
      const calculatedResults = calculateResults();
      setResults(calculatedResults);
    } catch (error) {
      console.error("Error calculating results:", error);
      router.push("/quiz");
    }
  }, [isQuizComplete, calculateResults, router]);

  const handleDownloadPDF = async () => {
    setIsGeneratingPDF(true);
    try {
      // Dynamic import of PDF generator
      const { generatePDF } = await import("@/lib/reportBuilder");
      if (results && quizData) {
        await generatePDF(results, quizData.brandColors);
      }
    } catch (error) {
      console.error("Error generating PDF:", error);
      alert("Failed to generate PDF. Please try again.");
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  const handleStartNew = () => {
    resetQuiz();
    router.push("/");
  };

  const handleShare = async () => {
    if (!results) return;

    const shareText = `I completed the RAG Assessment Quiz!\n\nMy Score: ${results.overallScore}/${results.overallMaxScore} (${calculatePercentage(results.overallScore, results.overallMaxScore)}%)\n\n${results.overallInsight}`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: "RAG Assessment Results",
          text: shareText,
        });
      } catch (error) {
        console.log("Error sharing:", error);
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(shareText);
      alert("Results copied to clipboard!");
    }
  };

  if (!results || !quizData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Calculating your results...</p>
        </div>
      </div>
    );
  }

  const overallPercentage = calculatePercentage(
    results.overallScore,
    results.overallMaxScore
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20 py-12">
      <div className="quiz-container">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-2">Your Assessment Results</h1>
          <p className="text-muted-foreground">
            Completed on {results.completedAt.toLocaleDateString()}
          </p>
        </div>

        {/* Overall Score Card */}
        <Card className="mb-8 border-2">
          <CardHeader>
            <CardTitle className="text-2xl">Overall Performance</CardTitle>
            <CardDescription>
              Your total score across all sections
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Score Display */}
            <div className="text-center py-8">
              <div className="text-6xl font-bold mb-2 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                {results.overallScore}
              </div>
              <div className="text-2xl text-muted-foreground mb-4">
                out of {results.overallMaxScore} points
              </div>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full">
                <span className="text-xl font-semibold">
                  {overallPercentage}% Overall
                </span>
              </div>
            </div>

            {/* Overall Insight */}
            <div className="p-6 bg-gradient-to-r from-primary/5 to-secondary/5 rounded-lg border">
              <h3 className="font-semibold text-lg mb-3">Overall Assessment</h3>
              <p className="text-muted-foreground leading-relaxed">
                {results.overallInsight}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-3 justify-center pt-4">
              <Button
                onClick={handleDownloadPDF}
                disabled={isGeneratingPDF}
                size="lg"
                className="min-w-[180px]"
              >
                <Download className="w-4 h-4 mr-2" />
                {isGeneratingPDF ? "Generating..." : "Download PDF Report"}
              </Button>
              <Button onClick={handleShare} variant="outline" size="lg">
                <Share2 className="w-4 h-4 mr-2" />
                Share Results
              </Button>
              <Button onClick={handleStartNew} variant="outline" size="lg">
                <RotateCcw className="w-4 h-4 mr-2" />
                Start New Assessment
              </Button>
            </div>
          </CardContent>
        </Card>

        <Separator className="my-12" />

        {/* Section Breakdown */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-6">Section Breakdown</h2>
          <div className="grid gap-6">
            {results.sectionScores.map((sectionScore) => (
              <SectionScoreCard
                key={sectionScore.sectionId}
                sectionScore={sectionScore}
              />
            ))}
          </div>
        </div>

        <Separator className="my-12" />

        {/* All Tips Summary */}
        <div>
          <h2 className="text-3xl font-bold mb-4">Your Complete Action Plan</h2>
          <p className="text-muted-foreground mb-6">
            Based on your responses, here are all {results.allTips.length}{" "}
            personalized recommendations:
          </p>
          <Card>
            <CardContent className="pt-6">
              <div className="grid md:grid-cols-2 gap-6">
                {results.sectionScores.map((section) => (
                  <div key={section.sectionId}>
                    <h3 className="font-semibold mb-3 text-primary">
                      {section.sectionTitle}
                    </h3>
                    <ul className="space-y-2">
                      {section.tips.map((tip, index) => (
                        <li
                          key={index}
                          className="text-sm text-muted-foreground flex items-start gap-2"
                        >
                          <span className="font-medium mt-0.5">
                            {(section.sectionId - 1) * 10 + index + 1}.
                          </span>
                          <span>{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Footer Actions */}
        <div className="mt-12 text-center space-y-4">
          <p className="text-muted-foreground">
            Ready to take another assessment or share your results?
          </p>
          <div className="flex gap-3 justify-center">
            <Button onClick={handleDownloadPDF} disabled={isGeneratingPDF}>
              <Download className="w-4 h-4 mr-2" />
              Download Report
            </Button>
            <Button onClick={handleStartNew} variant="outline">
              <RotateCcw className="w-4 h-4 mr-2" />
              Start New
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
