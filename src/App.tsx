
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Services from "./pages/Services";
import AIAgents from "./pages/AIAgents";
import GenerativeAI from "./pages/GenerativeAI";
import ResponsibleAI from "./pages/ResponsibleAI";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      {/* Keep Sonner Toast provider but we won't use it for chat messages */}
      <Sonner />
      <div className="dark">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/services" element={<Services />} />
            <Route path="/ai-agents" element={<AIAgents />} />
            <Route path="/generative-ai" element={<GenerativeAI />} />
            <Route path="/responsible-ai" element={<ResponsibleAI />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </div>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
