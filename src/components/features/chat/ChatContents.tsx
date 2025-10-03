"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ChatWindow } from "./ChatWindow";
import { ChatHistory } from "./ChatHistory";
import { ConversationTurnData, ConversationInput } from "@/types";
import { submitChat } from "@/app/(main)/chat/action";
import { getBasicQuestions } from "@/services/chatService";

interface ChatContentProps {
  conversationId: string;
  initialHistory?: ConversationTurnData[];
  initialQuestionNo?: number;
}

export const ChatContent = ({
  conversationId,
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

  const [isGenerated, setIsGenerated] = useState(false);

  const basicQuestions = getBasicQuestions();
  const currentQuestionInfo = basicQuestions[questionNo];

  const addAnswerToConversationInputs = () => {
    setConversationInputs([
      ...conversationInputs,
      { questionNo, question: currentQuestionInfo.question, answer },
    ]);

    setAnswer("");

    const nextQuestionNo = questionNo + 1;
    setQuestionNo(nextQuestionNo);
  };

  const handleBackQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    setConversationInputs(conversationInputs.slice(0, -1));

    const prevQuestionNo = questionNo - 1;
    setQuestionNo(prevQuestionNo);

    setAnswer(conversationInputs[prevQuestionNo].answer);
  };

  const handleNextQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    addAnswerToConversationInputs();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    let result = null;
    try {
      result = await submitChat(conversationInputs, conversationId);
      setQuestionNo((prev) => prev + 1);
      setIsGenerated(false);
    } catch (error) {
      console.error("Fetch Error:", error);
    } finally {
      setLoading(false);
    }

    if (result) {
      router.refresh();
      router.push(`/chat/${result.conversationId}`);
    }
  };

  return (
    <div className="p-5">
      <h1>Give us your answer</h1>
      <ChatWindow
        questionNo={questionNo}
        question={currentQuestionInfo}
        answer={answer}
        setAnswer={setAnswer}
        isGenerated={isGenerated}
        setIsGenerated={setIsGenerated}
        loading={loading}
        handleSubmit={handleSubmit}
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
