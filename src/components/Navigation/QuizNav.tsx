"use client";

import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";

interface QuizNavProps {
  onPrevious: () => void;
  onNext: () => void;
  canGoPrevious: boolean;
  canGoNext: boolean;
  isAnswered: boolean;
  isLastQuestion: boolean;
}

export function QuizNav({
  onPrevious,
  onNext,
  canGoPrevious,
  canGoNext,
  isAnswered,
  isLastQuestion,
}: QuizNavProps) {
  const router = useRouter();

  const handleNext = () => {
    if (isLastQuestion && isAnswered) {
      // Navigate to results page
      router.push("/results");
    } else {
      onNext();
    }
  };

  return (
    <div className="flex items-center justify-between gap-4 pt-6">
      <Button
        variant="outline"
        onClick={onPrevious}
        disabled={!canGoPrevious}
        className="min-w-[120px]"
      >
        <ChevronLeft className="w-4 h-4 mr-2" />
        Previous
      </Button>

      <Button
        onClick={handleNext}
        disabled={!isAnswered || !canGoNext}
        className="min-w-[120px]"
        data-testid="next-button"
      >
        {isLastQuestion ? "View Results" : "Next"}
        {!isLastQuestion && <ChevronRight className="w-4 h-4 ml-2" />}
      </Button>
    </div>
  );
}
