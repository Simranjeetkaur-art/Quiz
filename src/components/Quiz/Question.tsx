"use client";

import { QuestionProps } from "@/types/quiz.types";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AnswerButton } from "./AnswerButton";

export function Question({
  question,
  sectionId,
  currentAnswer,
  onAnswerSelect,
}: QuestionProps) {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardDescription className="text-sm font-medium">
          Question {question.id}
        </CardDescription>
        <CardTitle className="text-xl md:text-2xl leading-relaxed">
          {question.text}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {question.answers.map((answer) => (
            <AnswerButton
              key={answer.option}
              answer={answer}
              questionId={question.id}
              sectionId={sectionId}
              isSelected={currentAnswer?.selectedOption === answer.option}
              onSelect={onAnswerSelect}
            />
          ))}
        </div>
        {currentAnswer && (
          <div className="mt-4 p-3 bg-muted rounded-lg text-sm text-muted-foreground">
            <p className="font-medium mb-1">
              You selected: {currentAnswer.selectedOption}
            </p>
            <p className="text-xs">You can change your answer at any time.</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
