import { Suspense, lazy } from "react";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/contexts/ThemeContext";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

// Lazy-loaded routes — split into separate chunks
const Services = lazy(() => import("./pages/Services"));
const AIAgents = lazy(() => import("./pages/AIAgents"));
const GenerativeAI = lazy(() => import("./pages/GenerativeAI"));
const ResponsibleAI = lazy(() => import("./pages/ResponsibleAI"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const TermsOfService = lazy(() => import("./pages/TermsOfService"));
const Security = lazy(() => import("./pages/Security"));
const AboutUs = lazy(() => import("./pages/AboutUs"));
const Contact = lazy(() => import("./pages/Contact"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Hospitality = lazy(() => import("./pages/industries/Hospitality"));
const Manufacturing = lazy(() => import("./pages/industries/Manufacturing"));
const Finance = lazy(() => import("./pages/industries/Finance"));
const Retail = lazy(() => import("./pages/industries/Retail"));
const Healthcare = lazy(() => import("./pages/industries/Healthcare"));
const Logistics = lazy(() => import("./pages/industries/Logistics"));

const queryClient = new QueryClient();

const RouteFallback = () => (
  <div className="min-h-screen flex items-center justify-center bg-background">
    <div className="flex gap-1.5" aria-label="Loading page">
      <span className="w-2.5 h-2.5 bg-gold rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
      <span className="w-2.5 h-2.5 bg-gold rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
      <span className="w-2.5 h-2.5 bg-gold rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
    </div>
  </div>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <TooltipProvider>
        <Sonner />
        <div>
          <BrowserRouter>
            <Suspense fallback={<RouteFallback />}>
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
            </Suspense>
          </BrowserRouter>
        </div>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
