"use server";

import { addChatHistory, getConversations } from "@/services/chatService";
import { ConversationInput } from "../../../types/index";
import { getRequiredUserId } from "../../(auth)/action";

export const submitChat = async (
  chatHistory: ConversationInput[],
  conversationId: string | null
) => {
  const userId = await getRequiredUserId();
  const result = await addChatHistory(userId, conversationId, chatHistory);

  return result;
};

export const getUserConversations = async () => {
  const userId = await getRequiredUserId();
  const conversations = getConversations(userId);

  return conversations;
};
