"use client";

import {
  useQuiz,
  useCurrentQuestion,
  useCurrentAnswer,
} from "@/context/QuizContext";
import { Question } from "@/components/Quiz/Question";
import { ProgressBar } from "@/components/Quiz/ProgressBar";
import { QuizNav } from "@/components/Navigation/QuizNav";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function QuizPage() {
  const {
    quizData,
    currentSectionIndex,
    currentQuestionIndex,
    answers,
    selectAnswer,
    nextQuestion,
    previousQuestion,
  } = useQuiz();

  const currentQuestion = useCurrentQuestion();
  const currentAnswer = useCurrentAnswer();

  if (!quizData || !currentQuestion) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading quiz...</p>
        </div>
      </div>
    );
  }

  const {
    section,
    question,
    sectionNumber,
    questionNumber,
    totalQuestionsInSection,
  } = currentQuestion;

  // Calculate overall progress
  const overallProgress = answers.length;
  const totalQuestions = 40;

  // Calculate section progress
  const sectionAnswers = answers.filter((a) => a.sectionId === section.id);
  const sectionProgress = sectionAnswers.length;

  // Determine if we can navigate
  const canGoPrevious = currentSectionIndex > 0 || currentQuestionIndex > 0;
  const canGoNext = !!currentAnswer;
  const isLastQuestion =
    currentSectionIndex === 3 && currentQuestionIndex === 9;

  // Check if this is the first question of a new section
  const isFirstQuestionOfSection = currentQuestionIndex === 0;

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20 py-8">
      <div className="quiz-container">
        {/* Header with overall progress */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold">RAG Assessment</h1>
            <span className="text-sm text-muted-foreground">
              Question {overallProgress + 1} of {totalQuestions}
            </span>
          </div>
          <ProgressBar
            current={overallProgress}
            total={totalQuestions}
            label="Overall Progress"
          />
        </div>

        {/* Section header */}
        <Card className="mb-6">
          <CardHeader>
            <CardDescription>Section {sectionNumber} of 4</CardDescription>
            <CardTitle className="text-2xl">{section.title}</CardTitle>
            {isFirstQuestionOfSection && (
              <CardDescription className="text-base pt-2">
                {section.description}
              </CardDescription>
            )}
          </CardHeader>
          <CardContent>
            <ProgressBar
              current={sectionProgress}
              total={totalQuestionsInSection}
              label={`Section Progress (${questionNumber}/${totalQuestionsInSection})`}
              showPercentage={false}
            />
          </CardContent>
        </Card>

        {/* Question card */}
        <div className="mb-6">
          <Question
            question={question}
            sectionId={section.id}
            currentAnswer={currentAnswer}
            onAnswerSelect={selectAnswer}
          />
        </div>

        {/* Navigation */}
        <QuizNav
          onPrevious={previousQuestion}
          onNext={nextQuestion}
          canGoPrevious={canGoPrevious}
          canGoNext={canGoNext}
          isAnswered={!!currentAnswer}
          isLastQuestion={isLastQuestion}
        />

        <Separator className="my-6" />

        {/* Help text */}
        <div className="text-center text-sm text-muted-foreground space-y-1">
          <p>Select an answer to continue to the next question</p>
          <p>
            You can use the Previous button to review and change your answers
          </p>
        </div>
      </div>
    </div>
  );
}
