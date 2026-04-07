import { useState, useEffect, useCallback } from 'react';
import { Answer, AppState, GeneratedPrompt } from '../types';
import { loadState, saveState, INITIAL_ANSWERS } from '../lib/storage';
import { generatePrompt } from '../lib/generatePrompt';

export function useHaxState() {
  const [state, setState] = useState<AppState>(() => loadState());
  const [undoStack, setUndoStack] = useState<Answer[][]>([]);

  // Apply theme to document element
  useEffect(() => {
    if (state.theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [state.theme]);

  // Persist to localStorage on every state change
  useEffect(() => {
    saveState(state);
  }, [state]);

  const toggleTheme = useCallback(() => {
    setState((s) => ({ ...s, theme: s.theme === 'light' ? 'dark' : 'light' }));
  }, []);

  const updateAnswer = useCallback((questionId: string, update: Partial<Answer>) => {
    setState((s) => {
      setUndoStack((stack) => [...stack.slice(-19), s.answers]);
      const newAnswers = s.answers.map((a) =>
        a.questionId === questionId ? { ...a, ...update } : a
      );
      return { ...s, answers: newAnswers };
    });
  }, []);

  const setCurrentQuestion = useCallback((index: number) => {
    setState((s) => ({ ...s, currentQuestion: Math.max(0, Math.min(7, index)) }));
  }, []);

  const undo = useCallback(() => {
    setUndoStack((stack) => {
      if (stack.length === 0) return stack;
      const prev = stack[stack.length - 1];
      setState((s) => ({ ...s, answers: prev }));
      return stack.slice(0, -1);
    });
  }, []);

  const startOver = useCallback(() => {
    setState((s) => {
      setUndoStack((stack) => [...stack.slice(-19), s.answers]);
      return { ...s, answers: INITIAL_ANSWERS, currentQuestion: 0 };
    });
  }, []);

  const generateAndSavePrompt = useCallback((): string => {
    const content = generatePrompt(state.answers);
    const newPrompt: GeneratedPrompt = {
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
      answers: [...state.answers],
      content,
    };
    setState((s) => ({
      ...s,
      history: [newPrompt, ...s.history],
    }));
    return content;
  }, [state.answers]);

  const deleteHistoryItem = useCallback((id: string) => {
    setState((s) => ({
      ...s,
      history: s.history.filter((h) => h.id !== id),
    }));
  }, []);

  const clearAllHistory = useCallback(() => {
    setState((s) => ({ ...s, history: [] }));
  }, []);

  const clearAllData = useCallback(() => {
    const theme = state.theme;
    setState({
      theme,
      answers: INITIAL_ANSWERS,
      history: [],
      currentQuestion: 0,
    });
    setUndoStack([]);
  }, [state.theme]);

  return {
    state,
    undoStack,
    toggleTheme,
    updateAnswer,
    setCurrentQuestion,
    undo,
    startOver,
    generateAndSavePrompt,
    deleteHistoryItem,
    clearAllHistory,
    clearAllData,
  };
}
