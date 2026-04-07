import { useState } from 'react';
import { useLocation } from 'wouter';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Copy,
  Check,
  Trash2,
  Moon,
  Sun,
  Settings,
  Sparkles,
  History,
  ExternalLink,
  Clock,
  FileText,
} from 'lucide-react';
import { useHax } from '../App';

export default function HistoryPage() {
  const [, navigate] = useLocation();
  const { state, toggleTheme, deleteHistoryItem } = useHax();
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const handleCopy = async (content: string, id: string) => {
    try {
      await navigator.clipboard.writeText(content);
    } catch {
      const el = document.createElement('textarea');
      el.value = content;
      document.body.appendChild(el);
      el.select();
      document.execCommand('copy');
      document.body.removeChild(el);
    }
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  const formatDate = (iso: string) => {
    return new Date(iso).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
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
                  id === 'history'
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                }`}
                aria-current={id === 'history' ? 'page' : undefined}
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
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-black text-foreground">Prompt History</h1>
              <p className="text-sm text-muted-foreground mt-0.5">
                Your previously generated Vibe Coding Plans — stored locally on this device.
              </p>
            </div>
            <div className="text-sm text-muted-foreground">
              {state.history.length} prompt{state.history.length !== 1 ? 's' : ''}
            </div>
          </div>

          {/* HAX G13/G14 badge */}
          <div className="bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 rounded-xl p-3 mb-6 flex items-start gap-2.5">
            <span className="text-xs font-bold bg-emerald-100 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-300 px-2 py-0.5 rounded-full flex-shrink-0 mt-0.5">
              G13 + G14
            </span>
            <p className="text-xs text-emerald-800 dark:text-emerald-300">
              This app remembers your generated prompts (G13) and lets you manage or clear that memory at any time (G14).{' '}
              <a
                href="https://www.microsoft.com/en-us/haxtoolkit/library/#guideline-13"
                target="_blank"
                rel="noopener noreferrer"
                className="underline inline-flex items-center gap-0.5"
              >
                Learn more
                <ExternalLink className="w-2.5 h-2.5" />
              </a>
            </p>
          </div>

          {state.history.length === 0 ? (
            <div className="text-center py-16">
              <FileText className="w-12 h-12 text-muted-foreground/40 mx-auto mb-4" />
              <p className="text-muted-foreground font-medium">No prompts generated yet.</p>
              <p className="text-sm text-muted-foreground mt-1">Complete the questionnaire to generate your first Vibe Coding Plan.</p>
              <button
                onClick={() => navigate('/quiz')}
                className="mt-4 px-5 py-2.5 bg-primary text-primary-foreground rounded-xl font-semibold text-sm hover:opacity-90 transition-all"
              >
                Start the Quiz
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              <AnimatePresence>
                {state.history.map((prompt, index) => (
                  <motion.div
                    key={prompt.id}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -50, height: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className="bg-card border border-border rounded-xl overflow-hidden shadow-sm"
                  >
                    <div className="flex items-center justify-between px-4 py-3 gap-3">
                      <div className="flex items-center gap-2 min-w-0">
                        <Clock className="w-3.5 h-3.5 text-muted-foreground flex-shrink-0" />
                        <span className="text-sm text-muted-foreground truncate">
                          {formatDate(prompt.timestamp)}
                        </span>
                        <span className="text-xs text-muted-foreground/60">
                          ({prompt.answers.filter((a) => a.enabled).length} guidelines included)
                        </span>
                      </div>

                      <div className="flex items-center gap-1.5 flex-shrink-0">
                        <button
                          onClick={() => setExpandedId(expandedId === prompt.id ? null : prompt.id)}
                          className="text-xs text-muted-foreground hover:text-foreground px-2.5 py-1.5 rounded-lg hover:bg-muted transition-all"
                          aria-label={expandedId === prompt.id ? 'Collapse' : 'View prompt'}
                        >
                          {expandedId === prompt.id ? 'Collapse' : 'View'}
                        </button>

                        <button
                          onClick={() => handleCopy(prompt.content, prompt.id)}
                          className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground px-2.5 py-1.5 rounded-lg hover:bg-muted transition-all"
                          aria-label="Copy prompt"
                        >
                          {copiedId === prompt.id ? (
                            <Check className="w-3.5 h-3.5 text-emerald-500" />
                          ) : (
                            <Copy className="w-3.5 h-3.5" />
                          )}
                          {copiedId === prompt.id ? 'Copied!' : 'Copy'}
                        </button>

                        <button
                          onClick={() => deleteHistoryItem(prompt.id)}
                          className="p-1.5 rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-all"
                          aria-label="Delete this prompt"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    <AnimatePresence>
                      {expandedId === prompt.id && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25 }}
                          className="overflow-hidden"
                        >
                          <div className="border-t border-border overflow-auto max-h-64">
                            <pre className="p-4 text-xs font-mono text-foreground whitespace-pre-wrap leading-relaxed">
                              {prompt.content}
                            </pre>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </motion.div>
      </main>
    </div>
  );
}
