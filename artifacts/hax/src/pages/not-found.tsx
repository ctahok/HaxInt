import { AlertCircle } from "lucide-react";
import { useLocation } from "wouter";

export default function NotFound() {
  const [, navigate] = useLocation();
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-background">
      <div className="w-full max-w-md mx-4 p-8 bg-card border border-border rounded-2xl shadow-md">
        <div className="flex items-center gap-3 mb-4">
          <AlertCircle className="h-7 w-7 text-destructive flex-shrink-0" />
          <h1 className="text-2xl font-bold text-foreground">404 — Page Not Found</h1>
        </div>
        <p className="text-sm text-muted-foreground mb-6">
          This page doesn't exist. Head back to start your Vibe Coding Plan.
        </p>
        <button
          onClick={() => navigate("/")}
          className="px-5 py-2.5 rounded-xl bg-primary text-primary-foreground font-semibold text-sm hover:opacity-90 transition-all"
        >
          Go Home
        </button>
      </div>
    </div>
  );
}
