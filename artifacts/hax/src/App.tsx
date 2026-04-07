import { createContext, useContext } from 'react';
import { Switch, Route, Router as WouterRouter } from 'wouter';
import { useHaxState } from './hooks/useHaxState';
import WelcomePage from './pages/WelcomePage';
import QuestionnairePage from './pages/QuestionnairePage';
import OutputPage from './pages/OutputPage';
import HistoryPage from './pages/HistoryPage';
import SettingsPage from './pages/SettingsPage';
import NotFound from './pages/not-found';

export type HaxContextType = ReturnType<typeof useHaxState>;

export const HaxContext = createContext<HaxContextType | null>(null);

export function useHax(): HaxContextType {
  const ctx = useContext(HaxContext);
  if (!ctx) throw new Error('useHax must be used within HaxContext.Provider');
  return ctx;
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={WelcomePage} />
      <Route path="/quiz" component={QuestionnairePage} />
      <Route path="/output" component={OutputPage} />
      <Route path="/history" component={HistoryPage} />
      <Route path="/settings" component={SettingsPage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  const haxState = useHaxState();

  return (
    <HaxContext.Provider value={haxState}>
      <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
        <Router />
      </WouterRouter>
    </HaxContext.Provider>
  );
}

export default App;
