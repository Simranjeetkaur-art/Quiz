"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import {
  QuizContextType,
  QuizData,
  UserAnswer,
  QuizResults,
} from "@/types/quiz.types";
import { calculateResults } from "@/lib/scoring";

// Create the context with undefined as initial value
const QuizContext = createContext<QuizContextType | undefined>(undefined);

/**
 * QuizProvider component that wraps the application
 * Manages all quiz state and provides methods to interact with it
 */
export function QuizProvider({ children }: { children: React.ReactNode }) {
  // Core state
  const [quizData, setQuizData] = useState<QuizData | null>(null);
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<UserAnswer[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Derived state
  const isQuizComplete = answers.length === 40;

  /**
   * Load quiz data from JSON file
   */
  const loadQuizData = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await fetch("/quiz-data.json");

      if (!response.ok) {
        throw new Error("Failed to load quiz data");
      }

      const data: QuizData = await response.json();

      // Validate data structure
      if (!data.sections || data.sections.length !== 4) {
        throw new Error("Invalid quiz data: Must have exactly 4 sections");
      }

      // Validate each section has 10 questions
      data.sections.forEach((section, index) => {
        if (section.questions.length !== 10) {
          throw new Error(
            `Invalid quiz data: Section ${index + 1} must have exactly 10 questions`
          );
        }
      });

      setQuizData(data);

      // Apply brand colors to CSS variables
      if (data.brandColors) {
        document.documentElement.style.setProperty(
          "--color-primary",
          data.brandColors.primary
        );
        document.documentElement.style.setProperty(
          "--color-secondary",
          data.brandColors.secondary
        );
      }
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "An unknown error occurred";
      setError(errorMessage);
      console.error("Error loading quiz data:", err);
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Load quiz data on mount
   */
  useEffect(() => {
    loadQuizData();
  }, []);

  /**
   * Record a user's answer
   */
  const selectAnswer = (answer: UserAnswer) => {
    setAnswers((prev) => {
      // Check if answer already exists for this question
      const existingIndex = prev.findIndex(
        (a) => a.questionId === answer.questionId
      );

      if (existingIndex >= 0) {
        // Update existing answer
        const updated = [...prev];
        updated[existingIndex] = answer;
        return updated;
      } else {
        // Add new answer
        return [...prev, answer];
      }
    });
  };

  /**
   * Move to the next question
   */
  const nextQuestion = () => {
    if (!quizData) return;

    const currentSection = quizData.sections[currentSectionIndex];

    // Check if we're at the last question of the current section
    if (currentQuestionIndex < currentSection.questions.length - 1) {
      // Move to next question in same section
      setCurrentQuestionIndex((prev) => prev + 1);
    } else if (currentSectionIndex < quizData.sections.length - 1) {
      // Move to first question of next section
      setCurrentSectionIndex((prev) => prev + 1);
      setCurrentQuestionIndex(0);
    }
    // If we're at the last question of the last section, do nothing
    // The UI should show completion/results
  };

  /**
   * Move to the previous question
   */
  const previousQuestion = () => {
    if (!quizData) return;

    // Check if we're at the first question of the current section
    if (currentQuestionIndex > 0) {
      // Move to previous question in same section
      setCurrentQuestionIndex((prev) => prev - 1);
    } else if (currentSectionIndex > 0) {
      // Move to last question of previous section
      setCurrentSectionIndex((prev) => prev - 1);
      const prevSection = quizData.sections[currentSectionIndex - 1];
      setCurrentQuestionIndex(prevSection.questions.length - 1);
    }
    // If we're at the first question of the first section, do nothing
  };

  /**
   * Jump to a specific section
   */
  const goToSection = (sectionIndex: number) => {
    if (
      !quizData ||
      sectionIndex < 0 ||
      sectionIndex >= quizData.sections.length
    ) {
      return;
    }
    setCurrentSectionIndex(sectionIndex);
    setCurrentQuestionIndex(0);
  };

  /**
   * Calculate final results
   */
  const calculateQuizResults = (): QuizResults => {
    if (!quizData) {
      throw new Error("Quiz data not loaded");
    }

    if (answers.length !== 40) {
      throw new Error("All questions must be answered to calculate results");
    }

    return calculateResults(answers, quizData);
  };

  /**
   * Reset quiz to start over
   */
  const resetQuiz = () => {
    setAnswers([]);
    setCurrentSectionIndex(0);
    setCurrentQuestionIndex(0);
  };

  // Context value
  const value: QuizContextType = {
    quizData,
    currentSectionIndex,
    currentQuestionIndex,
    answers,
    isQuizComplete,
    isLoading,
    error,
    loadQuizData,
    selectAnswer,
    nextQuestion,
    previousQuestion,
    goToSection,
    calculateResults: calculateQuizResults,
    resetQuiz,
  };

  return <QuizContext.Provider value={value}>{children}</QuizContext.Provider>;
}

/**
 * Custom hook to use the Quiz context
 * Throws an error if used outside of QuizProvider
 */
export function useQuiz(): QuizContextType {
  const context = useContext(QuizContext);

  if (context === undefined) {
    throw new Error("useQuiz must be used within a QuizProvider");
  }

  return context;
}

/**
 * Helper hook to get the current question
 */
export function useCurrentQuestion() {
  const { quizData, currentSectionIndex, currentQuestionIndex } = useQuiz();

  if (!quizData) return null;

  const currentSection = quizData.sections[currentSectionIndex];
  const currentQuestion = currentSection?.questions[currentQuestionIndex];

  return {
    section: currentSection,
    question: currentQuestion,
    sectionNumber: currentSectionIndex + 1,
    questionNumber: currentQuestionIndex + 1,
    totalSections: quizData.sections.length,
    totalQuestionsInSection: currentSection?.questions.length || 0,
  };
}

/**
 * Helper hook to get answer for current question
 */
export function useCurrentAnswer() {
  const { answers } = useQuiz();
  const current = useCurrentQuestion();

  if (!current?.question) return null;

  return answers.find((a) => a.questionId === current.question.id);
}
