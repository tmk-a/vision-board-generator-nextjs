import { ConversationTurnData } from "@/types";
import {
  ChatBubble,
  ChatBubbleMessage,
  ChatBubbleTimestamp,
} from "@/components/ui/chat-bubble";
import { ChatMessageList } from "@/components/ui/chat-message-list";
import { convertDateToLocal } from "@/lib/date";

interface ChatHistoryProps {
  history: ConversationTurnData[];
}

export const ChatHistory = ({ history }: ChatHistoryProps) => {
  return (
    <ChatMessageList>
      {history.map((chat) => (
        <>
          <ChatBubble key={chat.id} variant={"received"}>
            <ChatBubbleMessage>{chat.question_text}</ChatBubbleMessage>
          </ChatBubble>
          <ChatBubble variant={"sent"}>
            <ChatBubbleMessage>
              {chat.user_answer}
              {chat.created_at && (
                <ChatBubbleTimestamp
                  timestamp={convertDateToLocal(chat.created_at)}
                />
              )}
            </ChatBubbleMessage>
          </ChatBubble>
        </>
      ))}
    </ChatMessageList>
  );
};
