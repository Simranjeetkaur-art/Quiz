"use client";

/**
 * WordPress Embeddable Version
 * This page is designed to be embedded in WordPress via iframe
 * It includes the full quiz experience in a standalone format
 */

import { useEffect, useState } from "react";
import {
  useQuiz,
  useCurrentQuestion,
  useCurrentAnswer,
} from "@/context/QuizContext";
import { Question } from "@/components/Quiz/Question";
import { ProgressBar } from "@/components/Quiz/ProgressBar";
import { QuizNav } from "@/components/Navigation/QuizNav";
import { SectionScoreCard } from "@/components/Results/SectionScore";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { QuizResults } from "@/types/quiz.types";
import { calculatePercentage } from "@/lib/scoring";
import { Download, RotateCcw } from "lucide-react";

type ViewState = "landing" | "quiz" | "results";

export default function EmbedPage() {
  const [view, setView] = useState<ViewState>("landing");
  const [results, setResults] = useState<QuizResults | null>(null);

  const {
    quizData,
    isLoading,
    error,
    currentSectionIndex,
    currentQuestionIndex,
    answers,
    selectAnswer,
    nextQuestion,
    previousQuestion,
    calculateResults,
    resetQuiz,
    isQuizComplete,
  } = useQuiz();

  const currentQuestion = useCurrentQuestion();
  const currentAnswer = useCurrentAnswer();

  // Auto-navigate to results when quiz is complete
  useEffect(() => {
    if (isQuizComplete && view === "quiz") {
      const calculatedResults = calculateResults();
      setResults(calculatedResults);
      setView("results");
    }
  }, [isQuizComplete, view, calculateResults]);

  const handleStartQuiz = () => {
    resetQuiz();
    setResults(null);
    setView("quiz");
  };

  const handleDownloadPDF = async () => {
    if (!results || !quizData) return;

    try {
      const { generatePDF } = await import("@/lib/reportBuilder");
      await generatePDF(results, quizData.brandColors);
    } catch (error) {
      console.error("Error generating PDF:", error);
    }
  };

  // Landing View
  if (view === "landing") {
    return (
      <div className="min-h-screen p-6 bg-background">
        <div className="max-w-2xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="text-3xl">RAG Assessment Quiz</CardTitle>
              <CardDescription>
                Evaluate your organization across 4 key dimensions
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-3 text-sm">
                <p>
                  <strong>40 Questions</strong> - Divided into 4 focused
                  sections
                </p>
                <p>
                  <strong>15-20 Minutes</strong> - Estimated completion time
                </p>
                <p>
                  <strong>Instant Results</strong> - Get personalized insights
                  and recommendations
                </p>
              </div>

              <Button
                onClick={handleStartQuiz}
                size="lg"
                className="w-full"
                disabled={isLoading || !!error}
              >
                Start Assessment
              </Button>

              {error && (
                <p className="text-sm text-destructive text-center">{error}</p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // Quiz View
  if (view === "quiz" && currentQuestion && quizData) {
    const { section, question } = currentQuestion;
    const overallProgress = answers.length;
    const sectionAnswers = answers.filter((a) => a.sectionId === section.id);
    const canGoPrevious = currentSectionIndex > 0 || currentQuestionIndex > 0;
    const isLastQuestion =
      currentSectionIndex === 3 && currentQuestionIndex === 9;

    return (
      <div className="min-h-screen p-6 bg-background">
        <div className="max-w-3xl mx-auto space-y-6">
          {/* Progress */}
          <ProgressBar
            current={overallProgress}
            total={40}
            label={`Question ${overallProgress + 1} of 40`}
          />

          {/* Section Info */}
          <Card
            className="border-l-4"
            style={{ borderLeftColor: "var(--color-primary)" }}
          >
            <CardHeader>
              <CardDescription>
                Section {section.id}: {section.title}
              </CardDescription>
              <CardTitle className="text-lg">
                Question {currentQuestionIndex + 1} of 10
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ProgressBar
                current={sectionAnswers.length}
                total={10}
                showPercentage={false}
              />
            </CardContent>
          </Card>

          {/* Question */}
          <Question
            question={question}
            sectionId={section.id}
            currentAnswer={currentAnswer}
            onAnswerSelect={selectAnswer}
          />

          {/* Navigation */}
          <QuizNav
            onPrevious={previousQuestion}
            onNext={nextQuestion}
            canGoPrevious={canGoPrevious}
            canGoNext={!!currentAnswer}
            isAnswered={!!currentAnswer}
            isLastQuestion={isLastQuestion}
          />
        </div>
      </div>
    );
  }

  // Results View
  if (view === "results" && results && quizData) {
    const overallPercentage = calculatePercentage(
      results.overallScore,
      results.overallMaxScore
    );

    return (
      <div className="min-h-screen p-6 bg-background">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Header */}
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-2">Your Results</h1>
            <p className="text-muted-foreground">Assessment Complete!</p>
          </div>

          {/* Overall Score */}
          <Card className="border-2">
            <CardHeader>
              <CardTitle>Overall Score</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center py-6">
                <div className="text-5xl font-bold mb-2 text-primary">
                  {results.overallScore}
                </div>
                <div className="text-xl text-muted-foreground mb-4">
                  out of {results.overallMaxScore} points ({overallPercentage}%)
                </div>
              </div>

              <div className="p-4 bg-muted rounded-lg">
                <p className="text-sm leading-relaxed">
                  {results.overallInsight}
                </p>
              </div>

              <div className="flex gap-3 justify-center flex-wrap">
                <Button onClick={handleDownloadPDF}>
                  <Download className="w-4 h-4 mr-2" />
                  Download PDF
                </Button>
                <Button onClick={handleStartQuiz} variant="outline">
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Start New
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Section Scores */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Section Breakdown</h2>
            {results.sectionScores.map((sectionScore) => (
              <SectionScoreCard
                key={sectionScore.sectionId}
                sectionScore={sectionScore}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Loading state
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
        <p className="text-muted-foreground">Loading...</p>
      </div>
    </div>
  );
}
