"use client";

import { ProgressBarProps } from "@/types/quiz.types";
import { Progress } from "@/components/ui/progress";

export function ProgressBar({
  current,
  total,
  label,
  showPercentage = true,
}: ProgressBarProps) {
  const percentage = total > 0 ? Math.round((current / total) * 100) : 0;

  return (
    <div className="w-full space-y-2">
      {(label || showPercentage) && (
        <div className="flex justify-between items-center text-sm">
          {label && <span className="font-medium">{label}</span>}
          {showPercentage && (
            <span className="text-muted-foreground">
              {percentage}% Complete
            </span>
          )}
        </div>
      )}
      <Progress value={percentage} className="h-2" />
      <div className="flex justify-between text-xs text-muted-foreground">
        <span>
          {current} of {total}
        </span>
      </div>
    </div>
  );
}
