import { generateGeminiContent } from "@/lib/ai/gemini";
import { prisma } from "@/lib/prisma";

// Prompts that analyze user responses and extract core information for the vision board
const ANALYSIS_PROMPT_TEMPLATE = `
You are an AI designed to analyze user answers for a "Vision Board Generator" that helps users deepen self-understanding.
Based on the user's answer history, extract the following:
- Core values (3–5 items)
- A summary of important traits or things the user values (around 100 characters)
- A one-word concept representing the user's life axis (max 10 characters)

User Answer History:
${"${JSON.stringify(answeredQuestions)}"}

Please output the result in text format.
This analysis will be used for generating the vision board.
`;

// Prompts that create image user responses and extract core information
// TODO: add design order
const IMAGE_GENERATION_PROMPT = (
  answeredQuestions: any[],
  analysisResult: any
) => `
You are an AI that generates images for a "Vision Board Generator" to help users deepen self-understanding.
Create a vision board image based on the following information:

Input:
- User's answer history:
${JSON.stringify(answeredQuestions)}
- Extracted values, life axis, and traits:
${JSON.stringify(analysisResult)}

Output Requirements:
- Visual representation symbolizing the user's life axis
- Keywords or symbols representing the user
- Scenes evoking a sense of safety and "home"
- Themes suggesting the user's future path

Conditions:
- Be specific and provide clear visual imagery
- Focus on colors, lighting, and composition to convey self-acceptance, comfort, and hope for the future
- Output in image format
`;

export const analyzeAndGenerateVisionBoard = async (
  conversationId: string,
  userId: string,
  answeredQuestions: any[]
) => {
  const analysisPrompt = ANALYSIS_PROMPT_TEMPLATE.replace(
    "${JSON.stringify(answeredQuestions)}",
    JSON.stringify(answeredQuestions)
  );

  const analysisResultText = await generateGeminiContent(analysisPrompt);
  const analysisResult = JSON.parse(analysisResultText);

  // save result in database
  await saveVisionAnalysis(
    conversationId,
    userId,
    analysisResult.coreValues,
    analysisResult.oneWordConcept
  );

  const imagePrompt = IMAGE_GENERATION_PROMPT(
    answeredQuestions,
    analysisResult
  );

  // TODO: generate image
  // const generatedImage = await callImageGenerationAPI(imagePrompt);

  return {
    coreValues: analysisResult.coreValues,
    oneWordConcept: analysisResult.oneWordConcept,
    imagePrompt: imagePrompt,
  };
};

async function saveVisionAnalysis(
  conversationId: string,
  userId: string,
  coreValues: string[],
  oneWordConcept: string
) {
  await prisma.generatedVisions.create({
    data: {
      conversation_id: conversationId,
      user_id: userId,
      theme_word: oneWordConcept,
      generated_text: coreValues.join(","),
      created_at: new Date(),
    },
  });
}
