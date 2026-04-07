import { useState, useEffect, useRef } from 'react';
import { useLocation } from 'wouter';
import { motion } from 'framer-motion';
import {
  Copy,
  Check,
  RefreshCw,
  History,
  Settings,
  Moon,
  Sun,
  Home,
  ExternalLink,
  Sparkles,
} from 'lucide-react';
import { useHax } from '../App';
import { Confetti } from '../components/Confetti';

const HAX_TOOLKIT_URL = 'https://www.microsoft.com/en-us/haxtoolkit/';

type Tab = 'output' | 'history' | 'settings';

export default function OutputPage() {
  const [, navigate] = useLocation();
  const { state, toggleTheme } = useHax();
  const [copied, setCopied] = useState(false);
  const [showConfetti, setShowConfetti] = useState(true);
  const [activeTab, setActiveTab] = useState<Tab>('output');
  const hasShownConfetti = useRef(false);

  const latestPrompt = state.history[0];

  useEffect(() => {
    if (!latestPrompt) {
      navigate('/quiz');
    }
  }, [latestPrompt, navigate]);

  useEffect(() => {
    if (!hasShownConfetti.current) {
      hasShownConfetti.current = true;
      const timer = setTimeout(() => setShowConfetti(false), 3500);
      return () => clearTimeout(timer);
    }
    return undefined;
  }, []);

  const handleCopy = async () => {
    if (!latestPrompt) return;
    try {
      await navigator.clipboard.writeText(latestPrompt.content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback for clipboard API unavailability
      const el = document.createElement('textarea');
      el.value = latestPrompt.content;
      document.body.appendChild(el);
      el.select();
      document.execCommand('copy');
      document.body.removeChild(el);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  if (!latestPrompt) return null;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Confetti active={showConfetti} />

      {/* Header */}
      <header className="sticky top-0 z-30 bg-background/90 backdrop-blur border-b border-border">
        <div className="max-w-3xl mx-auto px-4 py-3 flex items-center justify-between">
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-1.5 text-sm font-bold"
            aria-label="Go home"
          >
            <span className="bg-gradient-to-r from-violet-600 to-pink-500 bg-clip-text text-transparent text-xl font-black">
              HAX
            </span>
          </button>

          <nav className="flex gap-1" role="navigation" aria-label="App sections">
            {(
              [
                { id: 'output', label: 'Result', icon: Sparkles },
                { id: 'history', label: 'History', icon: History },
                { id: 'settings', label: 'Settings', icon: Settings },
              ] as const
            ).map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => {
                  if (id === 'output') setActiveTab('output');
                  else if (id === 'history') navigate('/history');
                  else navigate('/settings');
                }}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                  activeTab === id
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                }`}
                aria-current={activeTab === id ? 'page' : undefined}
              >
                <Icon className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">{label}</span>
              </button>
            ))}
          </nav>

          <button
            onClick={toggleTheme}
            className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-all"
            aria-label="Toggle theme"
          >
            {state.theme === 'light' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
          </button>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 max-w-3xl mx-auto w-full px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          {/* Celebration header */}
          <div className="text-center mb-8">
            <div className="text-4xl mb-3">🎉</div>
            <h1 className="text-3xl font-black bg-gradient-to-r from-violet-600 via-purple-600 to-pink-500 bg-clip-text text-transparent mb-2">
              Your Vibe Coding Plan is ready!
            </h1>
            <p className="text-muted-foreground text-base">
              Copy and paste this into your AI coding agent's plan mode to build a HAX-compliant app.
            </p>
          </div>

          {/* Copy button */}
          <div className="flex flex-wrap gap-3 mb-5 justify-center">
            <button
              onClick={handleCopy}
              className="flex items-center gap-2 bg-primary hover:opacity-90 active:scale-[0.98] text-primary-foreground font-bold px-6 py-3 rounded-xl shadow-sm transition-all"
              aria-label="Copy prompt to clipboard"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4" />
                  Copied!
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  Copy to Clipboard
                </>
              )}
            </button>

            <button
              onClick={() => navigate('/quiz')}
              className="flex items-center gap-2 bg-muted hover:bg-muted/70 text-foreground font-semibold px-5 py-3 rounded-xl transition-all"
              aria-label="Go back to quiz to refine answers"
            >
              <RefreshCw className="w-4 h-4" />
              Refine Answers
            </button>

            <button
              onClick={() => navigate('/')}
              className="flex items-center gap-2 bg-muted hover:bg-muted/70 text-foreground font-semibold px-5 py-3 rounded-xl transition-all"
            >
              <Home className="w-4 h-4" />
              Start Fresh
            </button>
          </div>

          {/* Generated prompt */}
          <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-sm">
            <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-muted/40">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-rose-400" />
                <div className="w-3 h-3 rounded-full bg-yellow-400" />
                <div className="w-3 h-3 rounded-full bg-green-400" />
              </div>
              <span className="text-xs text-muted-foreground font-mono">vibe-coding-plan.md</span>
              <button
                onClick={handleCopy}
                className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1 transition-colors"
                aria-label="Copy"
              >
                {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                {copied ? 'Copied' : 'Copy'}
              </button>
            </div>

            <div className="overflow-auto max-h-[60vh]">
              <pre className="p-5 text-sm font-mono text-foreground whitespace-pre-wrap leading-relaxed">
                {latestPrompt.content}
              </pre>
            </div>
          </div>

          {/* Attribution */}
          <div className="mt-6 text-center">
            <p className="text-xs text-muted-foreground">
              Generated using the{' '}
              <a
                href={HAX_TOOLKIT_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline inline-flex items-center gap-0.5"
              >
                Microsoft HAX Toolkit
                <ExternalLink className="w-3 h-3" />
              </a>
              {' '}— Human-AI eXperience Guidelines.
              {' '}
              <a
                href="https://www.microsoft.com/en-us/haxtoolkit/library/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline inline-flex items-center gap-0.5"
              >
                View all 18 guidelines
                <ExternalLink className="w-3 h-3" />
              </a>
            </p>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
