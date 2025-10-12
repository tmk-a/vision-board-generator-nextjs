export interface ConversationTurnData {
  id: string;
  conversation_id: string;
  turn_number: number;
  question_text: string;
  user_answer: string;
  created_at: Date;
}

export interface ConversationInput {
  questionNo: number;
  question: string;
  answer: string;
}

export interface ConversationData {
  id: string;
  created_at: Date;
  updated_at: Date;
  user_id: string;
  title: string;
}

export interface BasicQuestionsData {
  id: number;
  question: string;
  options: string[];
}

export interface DesignPreferences {
  colorPalette: string;
  artStyle: string;
  mood: string;
  complexity: string;
  textInclusion: string;
}

export interface GeneratedItemsData {
  id: string;
  user_id: string;
  conversation_id: string;
  generated_image_url: string | null;
  generated_text: string | null;
  theme_word: string | null;
  created_at: Date;
}
