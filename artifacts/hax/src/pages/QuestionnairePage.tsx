import { useState, useEffect } from 'react';
import { useLocation } from 'wouter';
import { motion, AnimatePresence } from 'framer-motion';
import {
  RotateCcw,
  ArrowLeft,
  ArrowRight,
  Moon,
  Sun,
  ExternalLink,
  Undo2,
  RefreshCw,
  Home,
} from 'lucide-react';
import { useHax } from '../App';
import { HAX_STAGES, ALL_QUESTIONS, getStageForQuestionIndex } from '../data/haxData';

const TOTAL_QUESTIONS = ALL_QUESTIONS.length;

export default function QuestionnairePage() {
  const [, navigate] = useLocation();
  const { state, toggleTheme, updateAnswer, setCurrentQuestion, undo, startOver, undoStack, generateAndSavePrompt } =
    useHax();
  const [direction, setDirection] = useState<'forward' | 'backward'>('forward');
  const [showStartOverConfirm, setShowStartOverConfirm] = useState(false);

  const currentIndex = state.currentQuestion;
  const question = ALL_QUESTIONS[currentIndex];
  const answer = state.answers.find((a) => a.questionId === question.id)!;
  const stageInfo = getStageForQuestionIndex(currentIndex);
  const currentStage = stageInfo?.stage;

  useEffect(() => {
    // Ensure we're within bounds
    if (currentIndex >= TOTAL_QUESTIONS) {
      setCurrentQuestion(TOTAL_QUESTIONS - 1);
    }
  }, [currentIndex, setCurrentQuestion]);

  const goNext = () => {
    if (currentIndex < TOTAL_QUESTIONS - 1) {
      setDirection('forward');
      setCurrentQuestion(currentIndex + 1);
    } else {
      const content = generateAndSavePrompt();
      navigate('/output');
    }
  };

  const goBack = () => {
    if (currentIndex > 0) {
      setDirection('backward');
      setCurrentQuestion(currentIndex - 1);
    } else {
      navigate('/');
    }
  };

  const handleStartOver = () => {
    if (showStartOverConfirm) {
      startOver();
      setShowStartOverConfirm(false);
    } else {
      setShowStartOverConfirm(true);
    }
  };

  const stageColors = [
    'from-violet-500 to-purple-600',
    'from-pink-500 to-rose-500',
    'from-orange-500 to-amber-500',
    'from-emerald-500 to-teal-500',
  ];

  const stageBadgeColors = [
    'bg-violet-100 text-violet-700 dark:bg-violet-900/40 dark:text-violet-300',
    'bg-pink-100 text-pink-700 dark:bg-pink-900/40 dark:text-pink-300',
    'bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-300',
    'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300',
  ];

  const stageIdx = stageInfo?.stageIndex ?? 0;
  const gradientClass = stageColors[stageIdx];
  const badgeColorClass = stageBadgeColors[stageIdx];

  const cardVariants = {
    enter: (dir: string) => ({
      rotateY: dir === 'forward' ? 90 : -90,
      opacity: 0,
      scale: 0.95,
    }),
    center: {
      rotateY: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (dir: string) => ({
      rotateY: dir === 'forward' ? -90 : 90,
      opacity: 0,
      scale: 0.95,
    }),
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-30 bg-background/90 backdrop-blur border-b border-border">
        <div className="max-w-2xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Go home"
          >
            <Home className="w-4 h-4" />
            <span className="hidden sm:inline font-semibold bg-gradient-to-r from-violet-600 to-pink-500 bg-clip-text text-transparent">
              HAX
            </span>
          </button>

          <div className="flex items-center gap-2">
            {/* Undo button — HAX G9/G10 */}
            <button
              onClick={undo}
              disabled={undoStack.length === 0}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-muted disabled:opacity-40 disabled:cursor-not-allowed transition-all"
              title="Undo last change"
              aria-label="Undo last change"
            >
              <Undo2 className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Undo</span>
            </button>

            {/* Start Over button — HAX G9/G10 */}
            <button
              onClick={handleStartOver}
              onBlur={() => setTimeout(() => setShowStartOverConfirm(false), 200)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                showStartOverConfirm
                  ? 'bg-destructive/10 text-destructive hover:bg-destructive/20'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted'
              }`}
              title={showStartOverConfirm ? 'Click again to confirm' : 'Start over'}
              aria-label="Start over"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">
                {showStartOverConfirm ? 'Confirm?' : 'Start Over'}
              </span>
            </button>

            <button
              onClick={toggleTheme}
              className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-all"
              aria-label="Toggle theme"
            >
              {state.theme === 'light' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Progress bar */}
        <div className="max-w-2xl mx-auto px-4 pb-3">
          {/* Stage pills */}
          <div className="flex gap-1.5 mb-2">
            {HAX_STAGES.map((stage, i) => {
              const stageStart = HAX_STAGES.slice(0, i).reduce((acc, s) => acc + s.questions.length, 0);
              const stageEnd = stageStart + stage.questions.length;
              const isActive = currentIndex >= stageStart && currentIndex < stageEnd;
              const isComplete = currentIndex >= stageEnd;

              return (
                <div
                  key={stage.id}
                  className={`flex-1 h-1.5 rounded-full transition-all duration-500 ${
                    isComplete
                      ? 'bg-primary'
                      : isActive
                      ? `bg-gradient-to-r ${stageColors[i]} opacity-80`
                      : 'bg-muted'
                  }`}
                />
              );
            })}
          </div>

          <div className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground">
              {currentStage?.label ?? ''}
            </span>
            <span className="text-xs text-muted-foreground">
              {currentIndex + 1} of {TOTAL_QUESTIONS}
            </span>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-8">
        <div className="w-full max-w-2xl relative" style={{ minHeight: 400, perspective: 1200 }}>
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={question.id}
              custom={direction}
              variants={cardVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ type: 'spring', stiffness: 260, damping: 28 }}
              style={{ transformOrigin: 'center center', backfaceVisibility: 'hidden' }}
              className="w-full"
            >
              {/* Question card */}
              <div className="bg-card border border-border rounded-2xl shadow-md overflow-hidden">
                {/* Card header gradient */}
                <div className={`bg-gradient-to-r ${gradientClass} p-5`}>
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-white/80 text-sm font-medium mb-1">
                        {currentStage?.label}
                      </p>
                      <p className="text-white/60 text-xs">{currentStage?.description}</p>
                    </div>
                    {/* Guideline badge with link — source links */}
                    <a
                      href={question.guidelineUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-shrink-0 flex items-center gap-1 bg-white/20 hover:bg-white/30 text-white text-xs font-bold px-3 py-1.5 rounded-full transition-all"
                      title={`View ${question.guideline}: ${question.guidelineTitle} on Microsoft HAX Toolkit`}
                      aria-label={`Open ${question.guideline} guideline on Microsoft HAX Toolkit (opens in new tab)`}
                    >
                      {question.guideline}
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>

                {/* Card body */}
                <div className="p-6">
                  {/* Guideline title */}
                  <div className="mb-4">
                    <a
                      href={question.guidelineUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full mb-3 hover:opacity-80 transition-opacity ${badgeColorClass}`}
                    >
                      HAX {question.guideline}: {question.guidelineTitle}
                      <ExternalLink className="w-3 h-3" />
                    </a>

                    <h2 className="text-xl font-bold text-foreground leading-snug">
                      {question.question}
                    </h2>
                  </div>

                  {/* Yes/No toggle */}
                  <div className="mb-4">
                    <p className="text-sm text-muted-foreground mb-2 font-medium">
                      Is this relevant to your AI app?
                    </p>
                    <div className="flex gap-2">
                      <button
                        onClick={() => updateAnswer(question.id, { enabled: true })}
                        className={`flex-1 py-2.5 px-4 rounded-xl font-semibold text-sm transition-all ${
                          answer.enabled
                            ? 'bg-primary text-primary-foreground shadow-sm'
                            : 'bg-muted text-muted-foreground hover:bg-muted/70'
                        }`}
                      >
                        Yes, include this
                      </button>
                      <button
                        onClick={() => updateAnswer(question.id, { enabled: false })}
                        className={`flex-1 py-2.5 px-4 rounded-xl font-semibold text-sm transition-all ${
                          !answer.enabled
                            ? 'bg-secondary text-secondary-foreground shadow-sm'
                            : 'bg-muted text-muted-foreground hover:bg-muted/70'
                        }`}
                      >
                        Skip for now
                      </button>
                    </div>
                  </div>

                  {/* Note textarea — animated */}
                  <AnimatePresence>
                    {answer.enabled && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="overflow-hidden"
                      >
                        <label className="block text-sm font-medium text-foreground mb-1.5">
                          How will you handle this? (optional notes)
                        </label>
                        <textarea
                          value={answer.note}
                          onChange={(e) =>
                            updateAnswer(question.id, { note: e.target.value })
                          }
                          placeholder={question.placeholder}
                          rows={4}
                          className="w-full rounded-xl border border-border bg-background text-foreground text-sm px-4 py-3 resize-none focus:outline-none focus:ring-2 focus:ring-primary/40 placeholder:text-muted-foreground/60 transition-all"
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Microcopy */}
                  {answer.enabled && (
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-xs text-primary font-medium mt-3 italic"
                    >
                      {question.microcopy}
                    </motion.p>
                  )}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </main>

      {/* Navigation footer */}
      <footer className="sticky bottom-0 bg-background/90 backdrop-blur border-t border-border">
        <div className="max-w-2xl mx-auto px-4 py-4 flex items-center justify-between gap-4">
          <button
            onClick={goBack}
            className="flex items-center gap-2 px-5 py-3 rounded-xl bg-muted hover:bg-muted/70 text-foreground font-semibold text-sm transition-all"
            aria-label={currentIndex === 0 ? 'Back to home' : 'Previous question'}
          >
            <ArrowLeft className="w-4 h-4" />
            {currentIndex === 0 ? 'Home' : 'Back'}
          </button>

          <div className="flex gap-1">
            {ALL_QUESTIONS.map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  setDirection(i > currentIndex ? 'forward' : 'backward');
                  setCurrentQuestion(i);
                }}
                className={`w-2 h-2 rounded-full transition-all ${
                  i === currentIndex
                    ? 'bg-primary w-5'
                    : i < currentIndex
                    ? 'bg-primary/50'
                    : 'bg-muted-foreground/30'
                }`}
                aria-label={`Go to question ${i + 1}`}
              />
            ))}
          </div>

          <button
            onClick={goNext}
            className="flex items-center gap-2 px-5 py-3 rounded-xl bg-primary hover:opacity-90 active:scale-[0.98] text-primary-foreground font-bold text-sm shadow-sm transition-all"
            aria-label={currentIndex === TOTAL_QUESTIONS - 1 ? 'Generate plan' : 'Next question'}
          >
            {currentIndex === TOTAL_QUESTIONS - 1 ? 'Generate Plan' : 'Next'}
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </footer>
    </div>
  );
}
