/**
 * TypeScript interfaces for the RAG Assessment Quiz
 * These types define the structure of quiz data and ensure type safety throughout the application
 */

/**
 * Answer option type - Red, Amber, or Green
 */
export type AnswerOption = "Red" | "Amber" | "Green";

/**
 * Brand colors configuration
 * These colors can be customized in quiz-data.json
 */
export interface BrandColors {
  primary: string; // Hex color code for primary brand color
  secondary: string; // Hex color code for secondary brand color
  red: string; // Hex color for Red answers
  amber: string; // Hex color for Amber answers
  green: string; // Hex color for Green answers
}

/**
 * Individual answer option within a question
 */
export interface Answer {
  option: AnswerOption; // The RAG option (Red, Amber, or Green)
  score: number; // Points awarded for this answer (default: 0, 5, or 10)
  tip: string; // Personalized tip/recommendation shown in results
}

/**
 * Individual question within a section
 */
export interface Question {
  id: number; // Unique question ID (1-40)
  text: string; // The question text displayed to user
  answers: Answer[]; // Array of 3 answer options (Red, Amber, Green)
}

/**
 * Insight statements based on score ranges
 * Key format: "min-max" (e.g., "0-30", "31-60", "61-100")
 */
export type InsightStatements = Record<string, string>;

/**
 * Quiz section containing 10 questions
 */
export interface Section {
  id: number; // Section number (1-4)
  title: string; // Section title (e.g., "Strategic Planning")
  description: string; // Brief description shown at section start
  questions: Question[]; // Array of 10 questions
  insightStatements: InsightStatements; // Score-based insights for this section
}

/**
 * Complete quiz data structure
 * This is the root structure loaded from quiz-data.json
 */
export interface QuizData {
  brandColors: BrandColors; // Color scheme configuration
  sections: Section[]; // Array of 4 sections
  overallInsights: InsightStatements; // Overall score-based insights
}

/**
 * User's answer to a specific question
 * Stored in QuizContext state during quiz session
 */
export interface UserAnswer {
  questionId: number; // Reference to question ID
  sectionId: number; // Reference to section ID
  selectedOption: AnswerOption; // User's selected answer (Red, Amber, Green)
  score: number; // Points earned for this answer
  tip: string; // Tip associated with selected answer
}

/**
 * Score breakdown for a single section
 */
export interface SectionScore {
  sectionId: number;
  sectionTitle: string;
  score: number; // Total score for this section (out of 100)
  maxScore: number; // Maximum possible score (usually 100)
  insight: string; // Section-specific insight based on score
  tips: string[]; // Array of 10 tips from this section
}

/**
 * Complete quiz results after completion
 */
export interface QuizResults {
  overallScore: number; // Total score across all sections (out of 400)
  overallMaxScore: number; // Maximum possible score (usually 400)
  overallInsight: string; // Overall performance insight
  sectionScores: SectionScore[]; // Breakdown for each of 4 sections
  allTips: string[]; // All 40 tips collected
  completedAt: Date; // Timestamp when quiz was completed
}

/**
 * Quiz context state
 * Manages the current state of the quiz session
 */
export interface QuizContextType {
  quizData: QuizData | null; // Loaded quiz configuration
  currentSectionIndex: number; // Current section (0-3)
  currentQuestionIndex: number; // Current question within section (0-9)
  answers: UserAnswer[]; // Array of user answers
  isQuizComplete: boolean; // Whether all 40 questions answered
  isLoading: boolean; // Loading state for data fetch
  error: string | null; // Error message if data load fails

  // Actions
  loadQuizData: () => Promise<void>; // Load quiz-data.json
  selectAnswer: (answer: UserAnswer) => void; // Record user's answer
  nextQuestion: () => void; // Move to next question
  previousQuestion: () => void; // Go back to previous question
  goToSection: (sectionIndex: number) => void; // Jump to specific section
  calculateResults: () => QuizResults; // Calculate final results
  resetQuiz: () => void; // Start over
}

/**
 * Props for Question component
 */
export interface QuestionProps {
  question: Question;
  sectionId: number;
  currentAnswer?: UserAnswer;
  onAnswerSelect: (answer: UserAnswer) => void;
}

/**
 * Props for AnswerButton component
 */
export interface AnswerButtonProps {
  answer: Answer;
  questionId: number;
  sectionId: number;
  isSelected: boolean;
  onSelect: (answer: UserAnswer) => void;
}

/**
 * Props for ProgressBar component
 */
export interface ProgressBarProps {
  current: number; // Current progress value
  total: number; // Total/max value
  label?: string; // Optional label text
  showPercentage?: boolean; // Show percentage text
}

/**
 * Props for SectionScore display component
 */
export interface SectionScoreProps {
  sectionScore: SectionScore;
}

/**
 * Props for PDF Report component
 */
export interface PDFReportProps {
  results: QuizResults;
  brandColors: BrandColors;
}
