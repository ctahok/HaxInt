import { HaxStage } from '../types';

export const HAX_STAGES: HaxStage[] = [
  {
    id: 'initially',
    label: 'Stage 1: Initially',
    stageNumber: 1,
    description: 'Setting expectations from the start',
    gradient: 'from-violet-500 to-purple-600',
    bgLight: 'bg-violet-50',
    bgDark: 'dark:bg-violet-950/30',
    questions: [
      {
        id: 'q1',
        guideline: 'G1',
        guidelineUrl: 'https://www.microsoft.com/en-us/haxtoolkit/library/#guideline-1',
        guidelineTitle: 'Make clear what the system can do',
        question: 'How will your AI make clear what it can do?',
        placeholder:
          'e.g., Show capability descriptions on the onboarding screen, use an "About" tooltip on AI-powered features, include a capabilities summary card...',
        microcopy: 'Great start! Being upfront about capabilities builds user trust from day one.',
        stageId: 'initially',
      },
      {
        id: 'q2',
        guideline: 'G2',
        guidelineUrl: 'https://www.microsoft.com/en-us/haxtoolkit/library/#guideline-2',
        guidelineTitle: 'Make clear how well the system can do what it can do',
        question: 'How will your AI make clear how well it can do it?',
        placeholder:
          'e.g., Show confidence scores, add "beta" labels on experimental features, display accuracy disclaimers, surface uncertainty in outputs...',
        microcopy: 'Awesome! Transparency about limitations sets exactly the right expectations.',
        stageId: 'initially',
      },
    ],
  },
  {
    id: 'during',
    label: 'Stage 2: During Interaction',
    stageNumber: 2,
    description: 'Keeping users in control while the AI assists',
    gradient: 'from-pink-500 to-rose-500',
    bgLight: 'bg-pink-50',
    bgDark: 'dark:bg-pink-950/30',
    questions: [
      {
        id: 'q3',
        guideline: 'G4',
        guidelineUrl: 'https://www.microsoft.com/en-us/haxtoolkit/library/#guideline-4',
        guidelineTitle: 'Show contextually relevant information',
        question: 'How will you time services based on context?',
        placeholder:
          'e.g., Only suggest autocomplete when the user pauses, show recommendations after an action completes, avoid interrupting mid-task...',
        microcopy:
          'Nice thinking! Good timing makes AI feel like a collaborator, not an interrupter.',
        stageId: 'during',
      },
      {
        id: 'q4',
        guideline: 'G6',
        guidelineUrl: 'https://www.microsoft.com/en-us/haxtoolkit/library/#guideline-6',
        guidelineTitle: 'Mitigate social biases',
        question: 'How will you mitigate social biases?',
        placeholder:
          'e.g., Audit training data for biases, surface diverse examples, add a feedback mechanism for users to flag potentially biased outputs...',
        microcopy: 'Important work! Fairness is a feature, not an afterthought.',
        stageId: 'during',
      },
    ],
  },
  {
    id: 'wrong',
    label: 'Stage 3: When Things Go Wrong',
    stageNumber: 3,
    description: 'Graceful handling of errors and mistakes',
    gradient: 'from-orange-500 to-amber-500',
    bgLight: 'bg-orange-50',
    bgDark: 'dark:bg-orange-950/30',
    questions: [
      {
        id: 'q5',
        guideline: 'G8',
        guidelineUrl: 'https://www.microsoft.com/en-us/haxtoolkit/library/#guideline-8',
        guidelineTitle: 'Support efficient dismissal',
        question: 'How will your AI support efficient dismissal?',
        placeholder:
          'e.g., Always show a clear "Dismiss" or "No thanks" button, allow permanent opt-out of specific AI features, never auto-dismiss user context...',
        microcopy:
          "Let's make sure your AI doesn't go rogue! Easy dismissal keeps users in full control.",
        stageId: 'wrong',
      },
      {
        id: 'q6',
        guideline: 'G9',
        guidelineUrl: 'https://www.microsoft.com/en-us/haxtoolkit/library/#guideline-9',
        guidelineTitle: 'Support efficient correction',
        question:
          'How will the AI allow the user to easily edit, refine, or recover when the AI is wrong?',
        placeholder:
          'e.g., Editable AI outputs inline, undo/redo for AI actions, clear error messages with step-by-step fix suggestions, rollback options...',
        microcopy: 'Smart planning! The best AI is one you can course-correct when it slips up.',
        stageId: 'wrong',
      },
    ],
  },
  {
    id: 'overtime',
    label: 'Stage 4: Over Time',
    stageNumber: 4,
    description: 'Learning and adapting with the user over time',
    gradient: 'from-emerald-500 to-teal-500',
    bgLight: 'bg-emerald-50',
    bgDark: 'dark:bg-emerald-950/30',
    questions: [
      {
        id: 'q7',
        guideline: 'G13',
        guidelineUrl: 'https://www.microsoft.com/en-us/haxtoolkit/library/#guideline-13',
        guidelineTitle: 'Learn from user behavior',
        question: 'How will your AI remember recent interactions?',
        placeholder:
          'e.g., Store user preferences in a profile, use session history to personalize responses, save recent searches and surfaced items...',
        microcopy:
          'Great memory strategy! Users love when AI remembers their preferences and improves over time.',
        stageId: 'overtime',
      },
      {
        id: 'q8',
        guideline: 'G14',
        guidelineUrl: 'https://www.microsoft.com/en-us/haxtoolkit/library/#guideline-14',
        guidelineTitle: 'Update and adapt',
        question: 'How will it allow the user to update or tweak its memory/preferences?',
        placeholder:
          'e.g., Settings page to edit/clear preferences, explicit "Forget this" buttons, a preference dashboard with full history control...',
        microcopy:
          "You're almost there! User-controlled memory is the foundation of trustworthy AI.",
        stageId: 'overtime',
      },
    ],
  },
];

export const ALL_QUESTIONS = HAX_STAGES.flatMap((s) => s.questions);

export function getStageForQuestionIndex(index: number): {
  stage: HaxStage;
  stageIndex: number;
  questionIndexInStage: number;
} | null {
  let globalIndex = 0;
  for (let stageIdx = 0; stageIdx < HAX_STAGES.length; stageIdx++) {
    const stage = HAX_STAGES[stageIdx];
    for (let qIdx = 0; qIdx < stage.questions.length; qIdx++) {
      if (globalIndex === index) {
        return { stage, stageIndex: stageIdx, questionIndexInStage: qIdx };
      }
      globalIndex++;
    }
  }
  return null;
}
