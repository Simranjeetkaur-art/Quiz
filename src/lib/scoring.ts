import {
  UserAnswer,
  QuizResults,
  SectionScore,
  QuizData,
  InsightStatements,
} from "@/types/quiz.types";

/**
 * Calculate the total score for a specific section
 * @param sectionId - The section ID (1-4)
 * @param answers - All user answers
 * @returns Total score for the section
 */
export function calculateSectionScore(
  sectionId: number,
  answers: UserAnswer[]
): number {
  const sectionAnswers = answers.filter(
    (answer) => answer.sectionId === sectionId
  );
  return sectionAnswers.reduce((total, answer) => total + answer.score, 0);
}

/**
 * Calculate the overall score across all sections
 * @param answers - All user answers
 * @returns Total score across all sections
 */
export function calculateOverallScore(answers: UserAnswer[]): number {
  return answers.reduce((total, answer) => total + answer.score, 0);
}

/**
 * Get the appropriate insight statement based on score and range
 * @param score - The calculated score
 * @param insights - Object with score ranges as keys (e.g., "0-30", "31-60")
 * @returns Matching insight statement
 */
export function getInsightForScore(
  score: number,
  insights: InsightStatements
): string {
  // Find the matching range
  for (const range in insights) {
    const [min, max] = range.split("-").map(Number);
    if (score >= min && score <= max) {
      return insights[range];
    }
  }

  // Fallback if no range matches
  return "Unable to determine insight for this score.";
}

/**
 * Get section insight based on section score
 * @param sectionScore - Score for the section
 * @param insightStatements - Insight statements from quiz data
 * @returns Appropriate insight message
 */
export function getSectionInsight(
  sectionScore: number,
  insightStatements: InsightStatements
): string {
  return getInsightForScore(sectionScore, insightStatements);
}

/**
 * Get overall insight based on total score
 * @param totalScore - Total score across all sections
 * @param overallInsights - Overall insight statements from quiz data
 * @returns Appropriate overall insight message
 */
export function getOverallInsight(
  totalScore: number,
  overallInsights: InsightStatements
): string {
  return getInsightForScore(totalScore, overallInsights);
}

/**
 * Collect all tips from user's answers
 * @param answers - All user answers
 * @returns Array of all tips
 */
export function getAllTips(answers: UserAnswer[]): string[] {
  return answers.map((answer) => answer.tip);
}

/**
 * Get tips for a specific section
 * @param sectionId - The section ID
 * @param answers - All user answers
 * @returns Array of tips from that section
 */
export function getSectionTips(
  sectionId: number,
  answers: UserAnswer[]
): string[] {
  return answers
    .filter((answer) => answer.sectionId === sectionId)
    .map((answer) => answer.tip);
}

/**
 * Calculate complete results for the quiz
 * @param answers - All user answers (should be 40)
 * @param quizData - The quiz configuration data
 * @returns Complete quiz results object
 */
export function calculateResults(
  answers: UserAnswer[],
  quizData: QuizData
): QuizResults {
  // Calculate overall score
  const overallScore = calculateOverallScore(answers);
  const overallMaxScore = 400; // 4 sections × 10 questions × 10 points max

  // Get overall insight
  const overallInsight = getOverallInsight(
    overallScore,
    quizData.overallInsights
  );

  // Calculate section scores
  const sectionScores: SectionScore[] = quizData.sections.map((section) => {
    const score = calculateSectionScore(section.id, answers);
    const maxScore = 100; // 10 questions × 10 points max
    const insight = getSectionInsight(score, section.insightStatements);
    const tips = getSectionTips(section.id, answers);

    return {
      sectionId: section.id,
      sectionTitle: section.title,
      score,
      maxScore,
      insight,
      tips,
    };
  });

  // Get all tips
  const allTips = getAllTips(answers);

  return {
    overallScore,
    overallMaxScore,
    overallInsight,
    sectionScores,
    allTips,
    completedAt: new Date(),
  };
}

/**
 * Calculate percentage score
 * @param score - Actual score
 * @param maxScore - Maximum possible score
 * @returns Percentage (0-100)
 */
export function calculatePercentage(score: number, maxScore: number): number {
  if (maxScore === 0) return 0;
  return Math.round((score / maxScore) * 100);
}

/**
 * Get score color based on percentage (for UI display)
 * @param percentage - Score percentage (0-100)
 * @returns Color identifier
 */
export function getScoreColor(
  percentage: number
): "red" | "amber" | "green" | "default" {
  if (percentage >= 70) return "green";
  if (percentage >= 40) return "amber";
  if (percentage > 0) return "red";
  return "default";
}

/**
 * Validate that all questions have been answered
 * @param answers - User answers array
 * @param expectedCount - Expected number of answers (default 40)
 * @returns true if quiz is complete
 */
export function isQuizComplete(
  answers: UserAnswer[],
  expectedCount: number = 40
): boolean {
  return answers.length === expectedCount;
}

/**
 * Get the current progress through the quiz
 * @param answers - Current user answers
 * @param totalQuestions - Total questions in quiz (default 40)
 * @returns Progress object with count and percentage
 */
export function getQuizProgress(
  answers: UserAnswer[],
  totalQuestions: number = 40
): { answered: number; total: number; percentage: number } {
  const answered = answers.length;
  const percentage = calculatePercentage(answered, totalQuestions);

  return {
    answered,
    total: totalQuestions,
    percentage,
  };
}
