import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/contexts/ThemeContext";
import Index from "./pages/Index";
import Services from "./pages/Services";
import AIAgents from "./pages/AIAgents";
import GenerativeAI from "./pages/GenerativeAI";
import ResponsibleAI from "./pages/ResponsibleAI";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import Security from "./pages/Security";
import AboutUs from "./pages/AboutUs";
import Contact from "./pages/Contact";
import Dashboard from "./pages/Dashboard";
import Hospitality from "./pages/industries/Hospitality";
import Manufacturing from "./pages/industries/Manufacturing";
import Finance from "./pages/industries/Finance";
import Retail from "./pages/industries/Retail";
import Healthcare from "./pages/industries/Healthcare";
import Logistics from "./pages/industries/Logistics";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <TooltipProvider>
        <Sonner />
        <div>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              
              <Route path="/services" element={<Services />} />
              <Route path="/ai-agents" element={<AIAgents />} />
              <Route path="/generative-ai" element={<GenerativeAI />} />
              <Route path="/responsible-ai" element={<ResponsibleAI />} />
              <Route path="/industries/hospitality" element={<Hospitality />} />
              <Route path="/industries/manufacturing" element={<Manufacturing />} />
              <Route path="/industries/finance" element={<Finance />} />
              <Route path="/industries/retail" element={<Retail />} />
              <Route path="/industries/healthcare" element={<Healthcare />} />
              <Route path="/industries/logistics" element={<Logistics />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="/terms-of-service" element={<TermsOfService />} />
              <Route path="/security" element={<Security />} />
              <Route path="/about" element={<AboutUs />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </div>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
