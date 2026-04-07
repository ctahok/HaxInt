export interface Answer {
  questionId: string;
  enabled: boolean;
  note: string;
}

export interface GeneratedPrompt {
  id: string;
  timestamp: string;
  answers: Answer[];
  content: string;
}

export interface HaxQuestion {
  id: string;
  guideline: string;
  guidelineUrl: string;
  guidelineTitle: string;
  question: string;
  placeholder: string;
  microcopy: string;
  stageId: string;
}

export interface HaxStage {
  id: string;
  label: string;
  stageNumber: number;
  description: string;
  gradient: string;
  bgLight: string;
  bgDark: string;
  questions: HaxQuestion[];
}

export type Theme = 'light' | 'dark';

export interface AppState {
  theme: Theme;
  answers: Answer[];
  history: GeneratedPrompt[];
  currentQuestion: number;
}
