"use client";

import { Answer, AnswerButtonProps } from "@/types/quiz.types";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function AnswerButton({
  answer,
  questionId,
  sectionId,
  isSelected,
  onSelect,
}: AnswerButtonProps) {
  const handleClick = () => {
    onSelect({
      questionId,
      sectionId,
      selectedOption: answer.option,
      score: answer.score,
      tip: answer.tip,
    });
  };

  // Determine button styling based on RAG option
  const getButtonClass = () => {
    const baseClass =
      "min-h-[60px] text-white font-medium transition-all duration-200";

    switch (answer.option) {
      case "Red":
        return cn(
          baseClass,
          "bg-rag-red hover:bg-rag-red/90",
          isSelected && "ring-4 ring-rag-red/50 ring-offset-2 scale-105"
        );
      case "Amber":
        return cn(
          baseClass,
          "bg-rag-amber hover:bg-rag-amber/90",
          isSelected && "ring-4 ring-rag-amber/50 ring-offset-2 scale-105"
        );
      case "Green":
        return cn(
          baseClass,
          "bg-rag-green hover:bg-rag-green/90",
          isSelected && "ring-4 ring-rag-green/50 ring-offset-2 scale-105"
        );
      default:
        return baseClass;
    }
  };

  return (
    <Button
      onClick={handleClick}
      className={getButtonClass()}
      size="lg"
      data-testid={`answer-${answer.option.toLowerCase()}`}
      aria-pressed={isSelected}
    >
      <span className="flex items-center gap-2">
        <span
          className={cn(
            "w-6 h-6 rounded-full border-2 border-white flex items-center justify-center",
            isSelected && "bg-white"
          )}
        >
          {isSelected && <span className="w-3 h-3 rounded-full bg-current" />}
        </span>
        {answer.option}
      </span>
    </Button>
  );
}
