import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import CheatSheets from "./pages/CheatSheets";
import Summaries from "./pages/Summaries";
import Quiz from "./pages/Quiz";
import PracticalExercises from "./pages/PracticalExercises";
import StudyProgress from "./pages/StudyProgress";
import Flashcards from "./pages/Flashcards";
import StudyTimer from "./pages/StudyTimer";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/cheat-sheets" element={<CheatSheets />} />
          <Route path="/summaries" element={<Summaries />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/practical-exercises" element={<PracticalExercises />} />
          <Route path="/study-progress" element={<StudyProgress />} />
          <Route path="/flashcards" element={<Flashcards />} />
          <Route path="/study-timer" element={<StudyTimer />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
