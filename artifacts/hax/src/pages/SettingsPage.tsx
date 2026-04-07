import { useState } from 'react';
import { useLocation } from 'wouter';
import { motion } from 'framer-motion';
import {
  Moon,
  Sun,
  Trash2,
  AlertTriangle,
  History,
  Settings,
  Sparkles,
  ExternalLink,
  Database,
  Palette,
  Shield,
} from 'lucide-react';
import { useHax } from '../App';
import { getStorageSizeKb } from '../lib/storage';

export default function SettingsPage() {
  const [, navigate] = useLocation();
  const { state, toggleTheme, clearAllHistory, clearAllData } = useHax();
  const [confirmClear, setConfirmClear] = useState<'history' | 'all' | null>(null);

  const storageSizeKb = getStorageSizeKb();
  const hasHistory = state.history.length > 0;

  const handleClearHistory = () => {
    if (confirmClear === 'history') {
      clearAllHistory();
      setConfirmClear(null);
    } else {
      setConfirmClear('history');
    }
  };

  const handleClearAll = () => {
    if (confirmClear === 'all') {
      clearAllData();
      setConfirmClear(null);
    } else {
      setConfirmClear('all');
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
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
                { id: 'output', label: 'Result', icon: Sparkles, path: '/output' },
                { id: 'history', label: 'History', icon: History, path: '/history' },
                { id: 'settings', label: 'Settings', icon: Settings, path: '/settings' },
              ] as const
            ).map(({ id, label, icon: Icon, path }) => (
              <button
                key={id}
                onClick={() => navigate(path)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                  id === 'settings'
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                }`}
                aria-current={id === 'settings' ? 'page' : undefined}
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

      {/* Main */}
      <main className="flex-1 max-w-3xl mx-auto w-full px-4 py-8">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
          <div className="mb-6">
            <h1 className="text-2xl font-black text-foreground">Settings</h1>
            <p className="text-sm text-muted-foreground mt-0.5">
              Manage your preferences and stored data.
            </p>
          </div>

          {/* HAX G13/G14 compliance notice */}
          <div className="bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 rounded-xl p-4 mb-6 flex items-start gap-3">
            <Shield className="w-4 h-4 text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-semibold text-emerald-800 dark:text-emerald-300 mb-1">
                This app follows HAX G13 & G14 — Memory Transparency
              </p>
              <p className="text-xs text-emerald-700 dark:text-emerald-400 mb-2">
                This page shows you everything this app stores and gives you full control to update or delete it. No data ever leaves your device.
              </p>
              <div className="flex gap-3">
                <a
                  href="https://www.microsoft.com/en-us/haxtoolkit/library/#guideline-13"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-emerald-700 dark:text-emerald-400 hover:underline inline-flex items-center gap-0.5"
                >
                  G13: Learn from behavior <ExternalLink className="w-2.5 h-2.5" />
                </a>
                <a
                  href="https://www.microsoft.com/en-us/haxtoolkit/library/#guideline-14"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-emerald-700 dark:text-emerald-400 hover:underline inline-flex items-center gap-0.5"
                >
                  G14: Update & adapt <ExternalLink className="w-2.5 h-2.5" />
                </a>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            {/* Appearance */}
            <div className="bg-card border border-border rounded-xl p-5">
              <div className="flex items-center gap-2 mb-4">
                <Palette className="w-4 h-4 text-muted-foreground" />
                <h2 className="font-bold text-foreground">Appearance</h2>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-foreground">Theme</p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Currently: {state.theme === 'light' ? 'Light mode' : 'Dark mode'} — saved across sessions
                  </p>
                </div>
                <button
                  onClick={toggleTheme}
                  className="flex items-center gap-2 px-4 py-2 bg-muted hover:bg-muted/70 rounded-lg text-sm font-medium text-foreground transition-all"
                  aria-label={`Switch to ${state.theme === 'light' ? 'dark' : 'light'} mode`}
                >
                  {state.theme === 'light' ? (
                    <>
                      <Moon className="w-4 h-4" /> Switch to Dark
                    </>
                  ) : (
                    <>
                      <Sun className="w-4 h-4" /> Switch to Light
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Stored data */}
            <div className="bg-card border border-border rounded-xl p-5">
              <div className="flex items-center gap-2 mb-4">
                <Database className="w-4 h-4 text-muted-foreground" />
                <h2 className="font-bold text-foreground">Stored Data</h2>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between py-2 border-b border-border">
                  <div>
                    <p className="text-sm font-medium text-foreground">Prompt History</p>
                    <p className="text-xs text-muted-foreground">
                      {state.history.length} saved prompt{state.history.length !== 1 ? 's' : ''}
                    </p>
                  </div>
                  <span className="text-sm text-muted-foreground">{state.history.length} items</span>
                </div>

                <div className="flex items-center justify-between py-2 border-b border-border">
                  <div>
                    <p className="text-sm font-medium text-foreground">Questionnaire Progress</p>
                    <p className="text-xs text-muted-foreground">
                      {state.answers.filter((a) => a.enabled).length} of 8 questions answered
                    </p>
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {state.answers.filter((a) => a.enabled || a.note.trim()).length} active
                  </span>
                </div>

                <div className="flex items-center justify-between py-2">
                  <div>
                    <p className="text-sm font-medium text-foreground">Storage Used</p>
                    <p className="text-xs text-muted-foreground">
                      Estimated local storage footprint
                    </p>
                  </div>
                  <span className="text-sm text-muted-foreground">~{storageSizeKb} KB</span>
                </div>
              </div>
            </div>

            {/* Data management — HAX G14 */}
            <div className="bg-card border border-border rounded-xl p-5">
              <div className="flex items-center gap-2 mb-1">
                <Trash2 className="w-4 h-4 text-muted-foreground" />
                <h2 className="font-bold text-foreground">Manage Data</h2>
              </div>
              <p className="text-xs text-muted-foreground mb-4">
                You have full control over everything stored on this device. (HAX{' '}
                <a
                  href="https://www.microsoft.com/en-us/haxtoolkit/library/#guideline-14"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline inline-flex items-center gap-0.5"
                >
                  G14
                  <ExternalLink className="w-3 h-3" />
                </a>
                )
              </p>

              <div className="space-y-3">
                {/* Clear history */}
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm font-medium text-foreground">Clear Prompt History</p>
                    <p className="text-xs text-muted-foreground">
                      Remove all {state.history.length} saved prompts. Your questionnaire answers are kept.
                    </p>
                  </div>
                  <button
                    onClick={handleClearHistory}
                    onBlur={() => setTimeout(() => {
                      if (confirmClear === 'history') setConfirmClear(null);
                    }, 200)}
                    disabled={!hasHistory}
                    className={`flex-shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                      confirmClear === 'history'
                        ? 'bg-destructive text-destructive-foreground'
                        : hasHistory
                        ? 'bg-destructive/10 text-destructive hover:bg-destructive/20'
                        : 'bg-muted text-muted-foreground cursor-not-allowed opacity-50'
                    }`}
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    {confirmClear === 'history' ? 'Confirm delete' : 'Clear History'}
                  </button>
                </div>

                {/* Clear all */}
                <div className="flex items-center justify-between gap-4 pt-3 border-t border-border">
                  <div>
                    <p className="text-sm font-medium text-foreground flex items-center gap-1.5">
                      <AlertTriangle className="w-3.5 h-3.5 text-destructive" />
                      Reset Everything
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Clear all answers, history, and reset to a fresh start.
                    </p>
                  </div>
                  <button
                    onClick={handleClearAll}
                    onBlur={() => setTimeout(() => {
                      if (confirmClear === 'all') setConfirmClear(null);
                    }, 200)}
                    className={`flex-shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                      confirmClear === 'all'
                        ? 'bg-destructive text-destructive-foreground'
                        : 'bg-destructive/10 text-destructive hover:bg-destructive/20'
                    }`}
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    {confirmClear === 'all' ? 'Yes, reset all' : 'Reset All'}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Footer attribution */}
          <div className="mt-8 text-center">
            <p className="text-xs text-muted-foreground">
              HAX Vibe Coding Plan Generator — built on the{' '}
              <a
                href="https://www.microsoft.com/en-us/haxtoolkit/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline inline-flex items-center gap-0.5"
              >
                Microsoft HAX Toolkit
                <ExternalLink className="w-3 h-3" />
              </a>
            </p>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
