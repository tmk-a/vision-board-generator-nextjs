"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useState, useEffect } from "react";
import { Textarea } from "@/components/ui/textarea";
import { BasicQuestionsData } from "@/types";

interface ChatWindowProps {
  questionNo: number;
  question: BasicQuestionsData;
  answer: string;
  setAnswer: (value: string) => void;
  loading: boolean;
  handleNextQuestion: (e: React.FormEvent) => void;
  handleBackQuestion: (e: React.FormEvent) => void;
  handleSubmit: (e: React.FormEvent) => void;
}

const OTHER_OPTION_VALUE = "Other (please describe)";
const LENGTH_BASIC_QUESTION = 7;

export const ChatWindow = ({
  questionNo,
  question,
  answer,
  setAnswer,
  loading,
  handleNextQuestion,
  handleBackQuestion,
  handleSubmit,
}: ChatWindowProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [error, setError] = useState("");
  const [radioValue, setRadioValue] = useState("");
  const isOtherSelected = radioValue === OTHER_OPTION_VALUE;

  useEffect(() => {
    if (isOpen) {
      const initialRadioValue = question.options.includes(answer)
        ? answer
        : question.options.includes(OTHER_OPTION_VALUE)
        ? OTHER_OPTION_VALUE
        : question.options[0] || "";
      setRadioValue(initialRadioValue);

      if (initialRadioValue !== OTHER_OPTION_VALUE) {
        setAnswer(initialRadioValue);
      }
    }
  }, [isOpen, question, answer]);

  const handleRadioChange = (value: string) => {
    setRadioValue(value);

    if (value !== OTHER_OPTION_VALUE) {
      setAnswer(value);
    }
  };

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (isOtherSelected) {
      setAnswer(e.target.value);
    }
  };

  return (
    <Dialog
      onOpenChange={(state) => {
        setIsOpen(state);
        setError("");
      }}
      open={isOpen}
    >
      <DialogTrigger asChild>
        <Button className="text-lg px-3">Answer Next Question</Button>
      </DialogTrigger>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{question.question}</DialogTitle>
          </DialogHeader>
          <RadioGroup value={radioValue} onValueChange={handleRadioChange}>
            {question.options.map((option, index) => (
              <div
                key={`${question.id}-${index}`}
                className="flex items-center gap-3"
              >
                <RadioGroupItem
                  value={`${option}`}
                  id={`${question.id}-${index}`}
                />
                <Label htmlFor={`${question.id}-${index}`}>{option}</Label>
              </div>
            ))}
          </RadioGroup>
          <Textarea
            value={isOtherSelected ? answer : ""}
            onChange={handleTextareaChange}
            placeholder={
              isOtherSelected
                ? "Please provide a specific answer..."
                : "You can enter this by selecting the radio button 'Other'"
            }
            aria-invalid={!!error && !answer}
            disabled={!isOtherSelected}
          ></Textarea>
          {/* TODO: add error component*/}
          {/* {error && <ErrorArea>{error}</ErrorArea>} */}
          <DialogFooter>
            <Button
              type="button"
              onClick={handleBackQuestion}
              disabled={questionNo === 0}
            >
              Back
            </Button>
            {questionNo >= LENGTH_BASIC_QUESTION - 1 ? (
              <Button type="submit" disabled={loading} onClick={handleSubmit}>
                {loading ? "Generating..." : "Generate"}
              </Button>
            ) : null}
            <Button
              type="button"
              onClick={handleNextQuestion}
              disabled={questionNo === 6}
            >
              Next
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
};
