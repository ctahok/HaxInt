import { useLocation } from 'wouter';
import { motion } from 'framer-motion';
import { Sparkles, Moon, Sun, ExternalLink, AlertCircle, CheckCircle, BookOpen } from 'lucide-react';
import { useHax } from '../App';
import { hasProgress } from '../lib/storage';

const HAX_TOOLKIT_URL = 'https://www.microsoft.com/en-us/haxtoolkit/';
const HAX_LIBRARY_URL = 'https://www.microsoft.com/en-us/haxtoolkit/library/';

export default function WelcomePage() {
  const [, navigate] = useLocation();
  const { state, toggleTheme } = useHax();
  const hasExistingProgress = hasProgress(state);

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-accent/10 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-secondary/20 blur-3xl" />
      </div>

      {/* Theme toggle */}
      <div className="absolute top-4 right-4 z-10">
        <button
          onClick={toggleTheme}
          className="p-2.5 rounded-full bg-card border border-border shadow-sm hover:shadow transition-all"
          aria-label={`Switch to ${state.theme === 'light' ? 'dark' : 'light'} mode`}
          title={`Switch to ${state.theme === 'light' ? 'dark' : 'light'} mode`}
        >
          {state.theme === 'light' ? (
            <Moon className="w-5 h-5 text-foreground/70" />
          ) : (
            <Sun className="w-5 h-5 text-foreground/70" />
          )}
        </button>
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="w-full max-w-2xl"
        >
          {/* Logo / Title */}
          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.1, duration: 0.5 }}
              className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 text-primary px-4 py-1.5 rounded-full text-sm font-semibold mb-6"
            >
              <Sparkles className="w-4 h-4" />
              Microsoft HAX Toolkit
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="text-6xl sm:text-7xl font-black tracking-tight mb-3"
            >
              <span className="bg-gradient-to-r from-violet-600 via-purple-600 to-pink-500 bg-clip-text text-transparent">
                HAX
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="text-xl sm:text-2xl font-semibold text-foreground/80 mb-2"
            >
              Vibe Coding Plan Generator
            </motion.p>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="text-muted-foreground text-base"
            >
              Turn Microsoft's HAX guidelines into a ready-to-paste AI coding prompt
            </motion.p>
          </div>

          {/* Expectation-setting card — HAX G1/G2 compliance */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="bg-card border border-border rounded-2xl p-6 mb-6 shadow-sm"
          >
            <h2 className="font-bold text-base text-foreground mb-4 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-primary" />
              Before we start — here's what this app can (and can't) do
            </h2>

            <div className="space-y-3">
              <div>
                <p className="text-sm font-semibold text-emerald-600 dark:text-emerald-400 mb-1 flex items-center gap-1.5">
                  <CheckCircle className="w-3.5 h-3.5" /> What it CAN do
                </p>
                <ul className="text-sm text-muted-foreground space-y-1 pl-5">
                  <li>Guide you through 8 key questions based on Microsoft's HAX Toolkit</li>
                  <li>Generate a structured markdown "Vibe Coding Plan" based on your answers</li>
                  <li>Give you a prompt you can paste into any AI coding agent's plan mode</li>
                  <li>Save your progress and history locally so you can return anytime</li>
                </ul>
              </div>

              <div>
                <p className="text-sm font-semibold text-rose-600 dark:text-rose-400 mb-1 flex items-center gap-1.5">
                  <AlertCircle className="w-3.5 h-3.5" /> What it CANNOT do
                </p>
                <ul className="text-sm text-muted-foreground space-y-1 pl-5">
                  <li>Write actual code for your app — that's still on you (and your AI agent)</li>
                  <li>Guarantee the generated prompt will work perfectly without tweaking</li>
                  <li>Make HAX compliance decisions for you — your judgment is required</li>
                </ul>
              </div>
            </div>
          </motion.div>

          {/* Resume progress banner */}
          {hasExistingProgress && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.4 }}
              className="bg-primary/10 border border-primary/30 rounded-xl p-4 mb-5 flex items-center gap-3"
            >
              <BookOpen className="w-5 h-5 text-primary flex-shrink-0" />
              <div>
                <p className="text-sm font-semibold text-foreground">
                  You have saved progress!
                </p>
                <p className="text-xs text-muted-foreground">
                  Your previous answers are still saved. Starting the quiz will resume where you left off.
                </p>
              </div>
            </motion.div>
          )}

          {/* CTA buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.65, duration: 0.5 }}
            className="flex flex-col sm:flex-row gap-3 mb-8"
          >
            <button
              onClick={() => navigate('/quiz')}
              className="flex-1 flex items-center justify-center gap-2 bg-primary hover:opacity-90 active:scale-[0.98] text-primary-foreground font-bold text-lg py-4 px-6 rounded-xl shadow-md transition-all"
            >
              <Sparkles className="w-5 h-5" />
              {hasExistingProgress ? 'Continue Quiz' : "Let's Vibe!"}
            </button>

            {state.history.length > 0 && (
              <button
                onClick={() => navigate('/history')}
                className="flex-1 flex items-center justify-center gap-2 bg-card hover:bg-muted border border-border text-foreground font-semibold py-4 px-6 rounded-xl transition-all"
              >
                View Past Prompts ({state.history.length})
              </button>
            )}
          </motion.div>

          {/* Source link — HAX Toolkit attribution */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.75, duration: 0.5 }}
            className="text-center"
          >
            <p className="text-xs text-muted-foreground mb-2">
              This app is built on{' '}
              <a
                href={HAX_TOOLKIT_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline inline-flex items-center gap-0.5 font-medium"
              >
                Microsoft's HAX Toolkit
                <ExternalLink className="w-3 h-3" />
              </a>
              {' '}— a framework of 18 guidelines for designing responsible human-AI interactions.
            </p>
            <a
              href={HAX_LIBRARY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-primary hover:underline inline-flex items-center gap-1"
            >
              <BookOpen className="w-3 h-3" />
              Browse all 18 HAX Guidelines
              <ExternalLink className="w-3 h-3" />
            </a>
          </motion.div>
        </motion.div>
      </div>

      <footer className="relative z-10 text-center py-4">
        <p className="text-xs text-muted-foreground">2026 Copyright © - Klaud.uk</p>
      </footer>
    </div>
  );
}
