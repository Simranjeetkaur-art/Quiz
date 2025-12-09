"use client";

import { SectionScoreProps } from "@/types/quiz.types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { calculatePercentage, getScoreColor } from "@/lib/scoring";
import { Badge } from "@/components/ui/badge";

export function SectionScoreCard({ sectionScore }: SectionScoreProps) {
  const percentage = calculatePercentage(
    sectionScore.score,
    sectionScore.maxScore
  );
  const scoreColor = getScoreColor(percentage);

  const getScoreColorClass = () => {
    switch (scoreColor) {
      case "green":
        return "text-rag-green";
      case "amber":
        return "text-rag-amber";
      case "red":
        return "text-rag-red";
      default:
        return "text-muted-foreground";
    }
  };

  const getScoreBadgeVariant = (): "default" | "secondary" | "outline" => {
    if (percentage >= 70) return "default";
    if (percentage >= 40) return "secondary";
    return "outline";
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between">
          <CardTitle className="text-xl">{sectionScore.sectionTitle}</CardTitle>
          <Badge variant={getScoreBadgeVariant()} className="ml-2">
            {percentage}%
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Score Display */}
        <div>
          <div className="flex justify-between items-baseline mb-2">
            <span className="text-sm font-medium">Score</span>
            <span className={`text-2xl font-bold ${getScoreColorClass()}`}>
              {sectionScore.score} / {sectionScore.maxScore}
            </span>
          </div>
          <Progress value={percentage} className="h-3" />
        </div>

        {/* Insight */}
        <div className="p-4 bg-muted rounded-lg">
          <p className="text-sm text-muted-foreground leading-relaxed">
            {sectionScore.insight}
          </p>
        </div>

        {/* Tips */}
        <div>
          <h4 className="font-semibold text-sm mb-3">
            Recommendations for this section:
          </h4>
          <ul className="space-y-2">
            {sectionScore.tips.map((tip, index) => (
              <li
                key={index}
                className="text-sm text-muted-foreground flex items-start gap-2"
              >
                <span className="text-primary font-medium mt-0.5">
                  {index + 1}.
                </span>
                <span>{tip}</span>
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}
