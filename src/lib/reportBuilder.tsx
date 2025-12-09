/**
 * PDF Report Builder using @react-pdf/renderer
 * Generates downloadable PDF reports of quiz results
 */

import { QuizResults, BrandColors } from "@/types/quiz.types";

/**
 * Generate and download PDF report
 * @param results - Quiz results data
 * @param brandColors - Brand colors for styling
 */
export async function generatePDF(
  results: QuizResults,
  brandColors: BrandColors
): Promise<void> {
  try {
    // Dynamic import to reduce initial bundle size
    const ReactPDF = await import("@react-pdf/renderer");
    const { Document, Page, Text, View, StyleSheet, pdf } = ReactPDF;

    // Define PDF styles
    const styles = StyleSheet.create({
      page: {
        padding: 40,
        backgroundColor: "#ffffff",
        fontFamily: "Helvetica",
      },
      header: {
        marginBottom: 30,
        borderBottom: `2px solid ${brandColors.primary}`,
        paddingBottom: 20,
      },
      title: {
        fontSize: 28,
        fontWeight: "bold",
        color: brandColors.primary,
        marginBottom: 8,
      },
      subtitle: {
        fontSize: 12,
        color: "#666666",
      },
      overallScoreSection: {
        marginBottom: 30,
        padding: 20,
        backgroundColor: "#f8f9fa",
        borderRadius: 8,
      },
      scoreDisplay: {
        fontSize: 48,
        fontWeight: "bold",
        color: brandColors.primary,
        textAlign: "center",
        marginBottom: 10,
      },
      scoreSubtext: {
        fontSize: 16,
        color: "#666666",
        textAlign: "center",
        marginBottom: 20,
      },
      insightBox: {
        padding: 15,
        backgroundColor: "#ffffff",
        borderLeft: `4px solid ${brandColors.secondary}`,
        marginTop: 15,
      },
      insightText: {
        fontSize: 11,
        lineHeight: 1.6,
        color: "#333333",
      },
      sectionTitle: {
        fontSize: 18,
        fontWeight: "bold",
        color: brandColors.primary,
        marginTop: 30,
        marginBottom: 15,
      },
      sectionCard: {
        marginBottom: 25,
        padding: 15,
        backgroundColor: "#f8f9fa",
        borderRadius: 4,
      },
      sectionHeader: {
        fontSize: 14,
        fontWeight: "bold",
        marginBottom: 8,
        color: "#333333",
      },
      sectionScore: {
        fontSize: 12,
        marginBottom: 10,
        color: "#666666",
      },
      tipsList: {
        marginTop: 10,
      },
      tipItem: {
        fontSize: 10,
        lineHeight: 1.5,
        marginBottom: 6,
        paddingLeft: 15,
        color: "#444444",
      },
      footer: {
        position: "absolute",
        bottom: 30,
        left: 40,
        right: 40,
        textAlign: "center",
        fontSize: 9,
        color: "#999999",
        borderTop: "1px solid #e0e0e0",
        paddingTop: 10,
      },
      pageNumber: {
        fontSize: 9,
        color: "#999999",
      },
    });

    // Create PDF Document
    const MyDocument = () => (
      <Document>
        {/* Page 1: Summary */}
        <Page size="A4" style={styles.page}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.title}>RAG Assessment Results</Text>
            <Text style={styles.subtitle}>
              Generated on {results.completedAt.toLocaleDateString()}
            </Text>
          </View>

          {/* Overall Score */}
          <View style={styles.overallScoreSection}>
            <Text style={styles.scoreDisplay}>{results.overallScore}</Text>
            <Text style={styles.scoreSubtext}>
              out of {results.overallMaxScore} points (
              {Math.round(
                (results.overallScore / results.overallMaxScore) * 100
              )}
              %)
            </Text>
            <View style={styles.insightBox}>
              <Text style={styles.insightText}>{results.overallInsight}</Text>
            </View>
          </View>

          {/* Section Scores Summary */}
          <Text style={styles.sectionTitle}>Section Breakdown</Text>
          {results.sectionScores.map((section) => {
            const percentage = Math.round(
              (section.score / section.maxScore) * 100
            );
            return (
              <View key={section.sectionId} style={styles.sectionCard}>
                <Text style={styles.sectionHeader}>{section.sectionTitle}</Text>
                <Text style={styles.sectionScore}>
                  Score: {section.score}/{section.maxScore} ({percentage}%)
                </Text>
                <View style={styles.insightBox}>
                  <Text style={styles.insightText}>{section.insight}</Text>
                </View>
              </View>
            );
          })}

          {/* Footer */}
          <View style={styles.footer}>
            <Text>RAG Assessment Quiz - Page 1</Text>
          </View>
        </Page>

        {/* Pages 2-5: Detailed Section Tips */}
        {results.sectionScores.map((section, index) => (
          <Page key={section.sectionId} size="A4" style={styles.page}>
            {/* Header */}
            <View style={styles.header}>
              <Text style={styles.title}>
                Section {section.sectionId}: {section.sectionTitle}
              </Text>
              <Text style={styles.subtitle}>
                Score: {section.score}/{section.maxScore} (
                {Math.round((section.score / section.maxScore) * 100)}%)
              </Text>
            </View>

            {/* Section Insight */}
            <View style={styles.insightBox}>
              <Text style={styles.insightText}>{section.insight}</Text>
            </View>

            {/* Recommendations */}
            <Text style={styles.sectionTitle}>Recommendations</Text>
            <View style={styles.tipsList}>
              {section.tips.map((tip, tipIndex) => (
                <Text key={tipIndex} style={styles.tipItem}>
                  {tipIndex + 1}. {tip}
                </Text>
              ))}
            </View>

            {/* Footer */}
            <View style={styles.footer}>
              <Text>RAG Assessment Quiz - Page {index + 2}</Text>
            </View>
          </Page>
        ))}
      </Document>
    );

    // Generate PDF blob
    const blob = await pdf(<MyDocument />).toBlob();

    // Create download link
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `RAG-Assessment-Results-${new Date().toISOString().split("T")[0]}.pdf`;
    link.click();

    // Clean up
    URL.revokeObjectURL(url);
  } catch (error) {
    console.error("Error generating PDF:", error);
    throw error;
  }
}

// Optional: Generate a simple text report for copying/sharing
export function generateTextReport(results: QuizResults): string {
  let report = "=".repeat(50) + "\n";
  report += "RAG ASSESSMENT RESULTS\n";
  report += "=".repeat(50) + "\n\n";

  report += `Date: ${results.completedAt.toLocaleDateString()}\n\n`;

  report += "OVERALL SCORE\n";
  report += "-".repeat(50) + "\n";
  report += `${results.overallScore} out of ${results.overallMaxScore} points `;
  report += `(${Math.round((results.overallScore / results.overallMaxScore) * 100)}%)\n\n`;

  report += `${results.overallInsight}\n\n`;

  report += "SECTION BREAKDOWN\n";
  report += "=".repeat(50) + "\n\n";

  results.sectionScores.forEach((section) => {
    const percentage = Math.round((section.score / section.maxScore) * 100);
    report += `${section.sectionTitle}\n`;
    report += "-".repeat(50) + "\n";
    report += `Score: ${section.score}/${section.maxScore} (${percentage}%)\n\n`;
    report += `${section.insight}\n\n`;
    report += "Recommendations:\n";
    section.tips.forEach((tip, index) => {
      report += `  ${index + 1}. ${tip}\n`;
    });
    report += "\n";
  });

  return report;
}
