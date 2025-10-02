import { getRequiredUserId } from "../../(auth)/action";
import { analyzeAndGenerateVisionBoard } from "@/services/visionService";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  // User authentication
  let userId: string;
  try {
    userId = await getRequiredUserId();
  } catch (error) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let requestData: { conversationId: string; answeredQuestions: any[] };
  try {
    requestData = await request.json();
    if (!requestData.answeredQuestions) {
      return NextResponse.json(
        { error: "Missing answeredQuestions data" },
        { status: 400 }
      );
    }
  } catch (error) {
    return NextResponse.json({ error: "Invalid JSON format" }, { status: 400 });
  }

  try {
    const visionBoardResult = await analyzeAndGenerateVisionBoard(
      requestData.conversationId,
      userId,
      requestData.answeredQuestions
    );

    return NextResponse.json(visionBoardResult, { status: 200 });
  } catch (error) {
    console.error("Vision board generation failed:", error);
    return NextResponse.json(
      { error: "Failed to generate vision board." },
      { status: 500 }
    );
  }
}
