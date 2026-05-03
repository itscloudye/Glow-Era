import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";

import Dashboard from "@/pages/Dashboard";
import Tracker from "@/pages/Tracker";
import CheckIn from "@/pages/CheckIn";
import Journal from "@/pages/Journal";
import Suggestions from "@/pages/Suggestions";
import Moodboard from "@/pages/Moodboard";

const queryClient = new QueryClient();

function Router() {
  return (
    <Switch>
      <Route path="/" component={Dashboard} />
      <Route path="/tracker" component={Tracker} />
      <Route path="/checkin" component={CheckIn} />
      <Route path="/journal" component={Journal} />
      <Route path="/suggestions" component={Suggestions} />
      <Route path="/moodboard" component={Moodboard} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <div className="min-h-[100dvh] flex flex-col text-foreground overflow-x-hidden">
            <Nav />
            <main className="flex-grow flex flex-col">
              <Router />
            </main>
            <Footer />
          </div>
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
