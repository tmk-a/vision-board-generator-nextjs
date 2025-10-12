import { ChatContent } from "@/components/features/chat/ChatContents";
import { getConversationTurns } from "@/services/chatService";
import { notFound } from "next/navigation";

interface ChatPageProps {
  params: {
    conversationId: string;
  };
}

export default async function ChatPage({ params }: ChatPageProps) {
  const { conversationId } = await params;

  if (conversationId !== "new") {
    const chatData = await getConversationTurns(conversationId);

    if (!chatData) {
      notFound();
    }

    const nextQuestionNo = chatData[chatData.length - 1].turn_number + 1;

    return (
      <ChatContent
        initialConversationId={conversationId}
        initialHistory={chatData}
        initialQuestionNo={nextQuestionNo}
      />
    );
  }

  return <ChatContent initialConversationId={conversationId} />;
}
