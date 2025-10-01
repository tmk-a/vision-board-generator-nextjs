import { prisma } from "@/lib/prisma";
import { ConversationInput, BasicQuestionsData } from "@/types";
import basicQuestions from "@/data/basicQuestions.json";

export const getConversations = async (userId: string) => {
  try {
    const conversations = await prisma.conversations.findMany({
      where: { user_id: userId },
    });
    return conversations;
  } catch (e) {
    console.error("Failed to fetch conversation data:", e);
    throw new Error("Failed to fetch conversation data");
  }
};

export const getChatHistory = async (conversationId: string) => {
  try {
    const chatHistory = await prisma.conversationTurns.findMany({
      where: { conversation_id: conversationId },
    });
    return chatHistory;
  } catch (e) {
    console.error("Failed to fetch chat history:", e);
    throw new Error("Failed to fetch chat history");
  }
};

export const addChatHistory = async (
  userId: string,
  conversationId: string | null,
  chatHistory: ConversationInput[]
) => {
  return await prisma.$transaction(async (tx) => {
    // const history = chatHistory;
    let currentConversationId = conversationId;
    let turnNumber = 0;
    const turnIds: string[] = [];

    console.log("addChatHistory", userId, conversationId);

    // for Conversations table
    if (!currentConversationId || currentConversationId === "new") {
      //   insert new record to conversations
      const newConversation = await tx.conversations.create({
        data: {
          user_id: userId,
          title: "New Chat",
        },
      });
      currentConversationId = newConversation.id;
    } else {
      // update the record in conversations
      const lastTurn = await tx.conversationTurns.findFirst({
        where: { conversation_id: currentConversationId },
        orderBy: { turn_number: "desc" },
      });
      turnNumber = (lastTurn?.turn_number || 0) + 1;
    }

    // register chat history in ConversationTurns table
    for (const chat of chatHistory) {
      const newTurn = await tx.conversationTurns.create({
        data: {
          conversation_id: currentConversationId,
          turn_number: turnNumber,
          question_text: chat.question,
          user_answer: chat.answer,
        },
      });
      turnIds.push(newTurn.id);
      turnNumber++;
    }

    return {
      conversationId: currentConversationId,
      turnIds,
      nextTurnNumber: turnNumber,
    };
  });
};

export const getBasicQuestions = (): BasicQuestionsData[] => {
  return basicQuestions as BasicQuestionsData[];
};
