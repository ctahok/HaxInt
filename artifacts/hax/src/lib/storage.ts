import { AppState } from '../types';

const STORAGE_KEY = 'hax_app_state_v1';

export const INITIAL_ANSWERS: AppState['answers'] = [
  { questionId: 'q1', enabled: false, note: '' },
  { questionId: 'q2', enabled: false, note: '' },
  { questionId: 'q3', enabled: false, note: '' },
  { questionId: 'q4', enabled: false, note: '' },
  { questionId: 'q5', enabled: false, note: '' },
  { questionId: 'q6', enabled: false, note: '' },
  { questionId: 'q7', enabled: false, note: '' },
  { questionId: 'q8', enabled: false, note: '' },
];

const DEFAULT_STATE: AppState = {
  theme: 'light',
  answers: INITIAL_ANSWERS,
  history: [],
  currentQuestion: 0,
};

export function loadState(): AppState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_STATE;
    const parsed = JSON.parse(raw);
    return {
      ...DEFAULT_STATE,
      ...parsed,
      answers:
        Array.isArray(parsed.answers) && parsed.answers.length === 8
          ? parsed.answers
          : DEFAULT_STATE.answers,
      history: Array.isArray(parsed.history) ? parsed.history : [],
      currentQuestion:
        typeof parsed.currentQuestion === 'number' ? parsed.currentQuestion : 0,
    };
  } catch {
    return DEFAULT_STATE;
  }
}

export function saveState(state: AppState): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // Silent fail if localStorage is unavailable
  }
}

export function hasProgress(state: AppState): boolean {
  return state.answers.some((a) => a.enabled || a.note.trim().length > 0);
}

export function getStorageSizeKb(): number {
  try {
    const raw = localStorage.getItem(STORAGE_KEY) ?? '';
    return Math.round((raw.length * 2) / 1024);
  } catch {
    return 0;
  }
}
