import { generateGeminiContent } from "@/lib/ai/gemini";
import { prisma } from "@/lib/prisma";
import { DesignPreferences, ConversationTurnData } from "@/types";

// Prompts that analyze user responses and extract core information for the vision board
const ANALYSIS_PROMPT_TEMPLATE = (
  answeredQuestions: ConversationTurnData[]
) => `
You are an AI designed to analyze user answers for a "Vision Board Generator" that helps users deepen self-understanding.

Based on the user's answer history, extract and output the following information in JSON format:

Required Output Structure:
{
  "coreValues": ["value1", "value2", "value3"],  // 3-5 core values
  "personalitySummary": "string",  // Summary of important traits (max 100 characters)
  "lifeAxisConcept": "string"  // One-word concept representing user's life axis (max 10 characters)
}

User Answer History:
${JSON.stringify(answeredQuestions)}

Important:
- Extract values that genuinely reflect the user's responses
- Keep the personality summary concise and meaningful
- Choose a life axis concept that captures their central theme
- Output valid JSON only, with no additional commentary
`;

// Prompts that create image generation instructions based on user responses
const IMAGE_GENERATION_PROMPT = (
  answeredQuestions: ConversationTurnData[],
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  analysisResult: any,
  designPreferences?: DesignPreferences
) => `
Generate a vision board image that helps the user visualize their aspirations and values.

Input Data:
- User's answer history: ${JSON.stringify(answeredQuestions)}
- Core values: ${analysisResult.coreValues?.join(", ")}
- Life axis concept: ${analysisResult.lifeAxisConcept}
- Personality summary: ${analysisResult.personalitySummary}

Design Specifications:
${
  designPreferences
    ? `
- Color Palette: ${
        designPreferences.colorPalette || "warm and harmonious colors"
      }
- Art Style: ${designPreferences.artStyle || "modern inspirational collage"}
- Mood: ${designPreferences.mood || "hopeful and empowering"}
- Complexity: ${designPreferences.complexity || "balanced composition"}
- Text on image: ${
        designPreferences.textInclusion === "yes"
          ? "Include key words and phrases"
          : "Visual elements only"
      }
`
    : "- Style: Inspirational vision board with balanced, uplifting aesthetics"
}

Image Requirements:
1. Central focus: Visual symbol representing "${analysisResult.lifeAxisConcept}"
2. Incorporate imagery reflecting these values: ${analysisResult.coreValues?.join(
  ", "
)}
3. Include elements suggesting: comfort, belonging, personal growth, and future possibilities
4. Composition: Harmonious layout with clear focal points
5. Lighting: Warm, inviting, optimistic
6. Overall feeling: Self-acceptance, hope, and forward momentum

Create a cohesive, aesthetically pleasing vision board that the user can use for daily inspiration.
${
  designPreferences?.textInclusion === "yes"
    ? `Include these key phrases naturally in the design: ${analysisResult.coreValues
        ?.slice(0, 3)
        .join(", ")}`
    : ""
}

Generate the image now.
`;

export const analyzeAndGenerateVisionBoard = async (
  conversationId: string,
  userId: string,
  answeredQuestions: ConversationTurnData[],
  designPreferences?: DesignPreferences
) => {
  const analysisPrompt = ANALYSIS_PROMPT_TEMPLATE(answeredQuestions);

  const analysisResultText = await generateGeminiContent(analysisPrompt);
  const cleanedText = analysisResultText
    .replace(/```json\n?/g, "")
    .replace(/```\n?/g, "")
    .trim();

  const analysisResult = JSON.parse(cleanedText);

  // save result in database
  const generated = await saveVisionAnalysis(
    conversationId,
    userId,
    analysisResult.coreValues,
    analysisResult.lifeAxisConcept
  );

  const imagePrompt = IMAGE_GENERATION_PROMPT(
    answeredQuestions,
    analysisResult,
    designPreferences
  );

  const generatedImage = await generateImageWithPollinations(imagePrompt);

  await updateVisionImage(generated.id, generatedImage);

  return {
    coreValues: analysisResult.coreValues,
    oneWordConcept: analysisResult.oneWordConcept,
    generatedImage,
  };
};

async function saveVisionAnalysis(
  conversationId: string,
  userId: string,
  coreValues: string[],
  oneWordConcept: string
) {
  const result = await prisma.generatedVisions.create({
    data: {
      conversation_id: conversationId,
      user_id: userId,
      theme_word: oneWordConcept,
      generated_text: coreValues.join(","),
      created_at: new Date(),
    },
    select: {
      id: true,
      theme_word: true,
      created_at: true,
    },
  });

  return result;
}

export async function getUserVisions(userId: string, limit?: number) {
  return await prisma.generatedVisions.findMany({
    where: { user_id: userId },
    orderBy: { created_at: "desc" },
    ...(limit && { take: limit }),
  });
}

export async function getVisionByConversation(
  conversationId: string,
  userId: string
) {
  return await prisma.generatedVisions.findFirst({
    where: {
      conversation_id: conversationId,
      user_id: userId,
    },
    orderBy: { created_at: "desc" },
  });
}

export const generateImageWithPollinations = async (prompt: string) => {
  const encodedPrompt = encodeURIComponent(prompt);
  const imageUrl = `https://image.pollinations.ai/prompt/${encodedPrompt}?width=1024&height=1024&nologo=true`;

  return imageUrl;
};

export const updateVisionImage = async (
  generatedId: string,
  imageUrl: string
) => {
  await prisma.generatedVisions.update({
    where: { id: generatedId },
    data: { generated_image_url: imageUrl },
  });

  console.log(`Updated image URL for conversation ${generatedId}`);
};

export async function getVisionById(id: string) {
  return await prisma.generatedVisions.findUnique({
    where: { id: id },
  });
}
