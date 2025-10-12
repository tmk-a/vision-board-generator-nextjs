"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ChatWindow } from "./ChatWindow";
import { ChatHistory } from "./ChatHistory";
import {
  ConversationTurnData,
  ConversationInput,
  DesignPreferences,
} from "@/types";
import { submitChat } from "@/app/(main)/chat/action";
import { getBasicQuestions } from "@/services/chatService";
import { generateVision } from "@/app/(main)/vision/action";

interface ChatContentProps {
  initialConversationId: string;
  initialHistory?: ConversationTurnData[];
  initialQuestionNo?: number;
}

const LENGTH_BASIC_QUESTION = 7;

export const ChatContent = ({
  initialConversationId,
  initialHistory = [],
  initialQuestionNo = 0,
}: ChatContentProps) => {
  const router = useRouter();
  const [answer, setAnswer] = useState("");
  const [questionNo, setQuestionNo] = useState(initialQuestionNo);
  const [conversationInputs, setConversationInputs] = useState<
    ConversationInput[]
  >([]);
  const [loading, setLoading] = useState(false);

  const [isSaved, setIsSaved] = useState(false);
  const [conversationId, setConversationId] = useState(initialConversationId);

  const basicQuestions = getBasicQuestions();
  const currentQuestionInfo = basicQuestions[questionNo];

  const handleBackQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (questionNo === 0) return;

    const updatedInputs = conversationInputs.slice(0, -1);
    setConversationInputs(updatedInputs);

    const prevQuestionNo = questionNo - 1;
    setQuestionNo(prevQuestionNo);

    if (updatedInputs.length > 0) {
      const prevAnswer = updatedInputs[updatedInputs.length - 1]?.answer || "";
      setAnswer(prevAnswer);
    } else {
      setAnswer("");
    }
  };

  const handleNextQuestion = async (e: React.FormEvent) => {
    e.preventDefault();

    const newInput: ConversationInput = {
      questionNo: questionNo + 1,
      question: currentQuestionInfo.question,
      answer,
    };

    const updatedInputs = [...conversationInputs, newInput];
    setConversationInputs(updatedInputs);
    setAnswer("");

    if (questionNo === LENGTH_BASIC_QUESTION - 1) {
      setLoading(true);
      try {
        const result = await submitChat(updatedInputs, conversationId);

        if (result.conversationId && result.conversationId !== conversationId) {
          setConversationId(result.conversationId);
        }
        setIsSaved(true);
      } catch (error) {
        console.error("Failed to save answers:", error);
      } finally {
        setLoading(false);
      }
    }
    setQuestionNo((prev) => prev + 1);
  };

  const handleGenerateVision = async (preferences: DesignPreferences) => {
    setLoading(true);

    try {
      const result = await generateVision({
        conversationId,
        designPreferences: preferences,
      });

      if (result.success) {
        router.refresh();
        router.push(`/dashboard`);
      }
    } catch (error) {
      console.error("Vision generation failed:", error);
      alert("Vision generation failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-5">
      <h1>Give us your answer</h1>
      <ChatWindow
        questionNoForDisplay={questionNo + 1}
        question={currentQuestionInfo}
        answer={answer}
        setAnswer={setAnswer}
        isSaved={isSaved}
        setIsSaved={setIsSaved}
        loading={loading}
        handleGenerateVision={handleGenerateVision}
        handleNextQuestion={handleNextQuestion}
        handleBackQuestion={handleBackQuestion}
      />
      <div className="w-full mx-auto">
        <h2>Your Answer History:</h2>
        <ChatHistory history={initialHistory} />
      </div>
    </div>
  );
};
