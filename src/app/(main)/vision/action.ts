"use server";

import { getRequiredUserId } from "@/app/(auth)/action";
import { analyzeAndGenerateVisionBoard } from "@/services/visionService";
import { getConversationTurns } from "@/services/chatService";
import { DesignPreferences } from "@/types";

interface GenerateVisionInput {
  conversationId: string;
  designPreferences?: DesignPreferences;
}

export async function generateVision(input: GenerateVisionInput) {
  // User authentication
  const userId = await getRequiredUserId();

  // Validation
  if (!input.conversationId) {
    throw new Error("conversationId is required");
  }

  try {
    const answeredQuestions = await getConversationTurns(input.conversationId);

    // Validation
    if (answeredQuestions.length < 7) {
      throw new Error(
        "At least 7 questions must be answered before generating vision board"
      );
    }

    const visionBoardResult = await analyzeAndGenerateVisionBoard(
      input.conversationId,
      userId,
      answeredQuestions,
      input.designPreferences
    );

    return {
      success: true,
      data: visionBoardResult,
    };
  } catch (error) {
    console.error("Vision board generation failed:", error);

    if (error instanceof Error) {
      throw new Error(`Failed to generate vision board: ${error.message}`);
    }

    throw new Error("Failed to generate vision board due to an unknown error");
  }
}
