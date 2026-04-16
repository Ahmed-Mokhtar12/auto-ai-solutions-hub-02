
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Bot, Zap, RefreshCw, BarChart3, MessageSquare, FileText, ShoppingCart } from 'lucide-react';
import Header from "@/components/Header";
import ChatWidget from '@/components/chat/ChatWidget';
import DynamicBackground from '@/components/DynamicBackground';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';

const Section: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <div className="mb-8">
    <h2 className="text-2xl font-semibold text-[#F8D042] mb-4">{title}</h2>
    {children}
  </div>
);

const capabilities = [
  { icon: MessageSquare, title: "Conversational AI", desc: "Natural language agents that handle customer inquiries, bookings, and support around the clock." },
  { icon: RefreshCw, title: "Workflow Automation", desc: "End-to-end process orchestration that connects your existing tools and eliminates manual handoffs." },
  { icon: BarChart3, title: "Decision Intelligence", desc: "Agents that analyze data in real time and surface actionable recommendations to your team." },
  { icon: Zap, title: "Event-Driven Actions", desc: "Trigger-based agents that respond instantly to system events, alerts, and customer actions." },
];

const useCases = [
  { icon: Bot, title: "Smart Concierge", desc: "24/7 AI concierge for hotels that handles guest requests, restaurant bookings, and local recommendations in any language." },
  { icon: FileText, title: "Document Processing", desc: "Automated extraction, classification, and routing of invoices, contracts, and compliance documents." },
  { icon: ShoppingCart, title: "Sales Assistant", desc: "AI agent that qualifies leads, answers product questions, and schedules demos without human intervention." },
];

const AIAgents = () => {
  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden pb-[10vh]">
      <DynamicBackground />
      <Header />

      <main className="container mx-auto px-4 flex-grow relative z-10">
        <div className="w-full max-w-4xl mx-auto py-10">
          <Link to="/" className="inline-flex items-center gap-2 text-[#F8D042] hover:text-[#F8D042]/80 transition-colors mb-6 text-sm font-medium">
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>

          <h1 className="text-3xl md:text-4xl font-semibold text-white text-center mb-8">
            AI Agents
          </h1>

          <div className="bg-navy-800/80 backdrop-blur-md rounded-2xl p-6 md:p-8 border border-navy-700 space-y-10 max-h-[65vh] overflow-y-auto <div className="bg-navy-800/80 backdrop-blur-md rounded-2xl p-6 md:p-8 border border-navy-700 space-y-10 max-h-[55vh] overflow-y-auto chat-scrollbar">">
            <p className="text-white/90 text-lg leading-relaxed">
              Our AI Agents are intelligent automation solutions that handle complex tasks,
              make decisions, and interact with your systems to streamline operations.
              They work 24/7, learn from interactions, and scale with your business.
            </p>

            <Section title="How It Works">
              <div className="space-y-4 text-white/80 text-sm leading-relaxed">
                <p><span className="text-[#F8D042] font-semibold">1. Discovery —</span> We map your workflows and identify high-impact automation opportunities.</p>
                <p><span className="text-[#F8D042] font-semibold">2. Design —</span> We architect agent behavior, integrations, and fallback logic tailored to your operations.</p>
                <p><span className="text-[#F8D042] font-semibold">3. Deploy —</span> Agents go live with monitoring dashboards, human-in-the-loop escalation, and continuous improvement.</p>
              </div>
            </Section>

            <Section title="Key Capabilities">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {capabilities.map((cap) => (
                  <div key={cap.title} className="flex items-start gap-3 p-4 rounded-lg bg-navy-700/40 border border-navy-700">
                    <cap.icon className="h-5 w-5 text-[#F8D042] mt-0.5 shrink-0" />
                    <div>
                      <h3 className="text-white font-medium text-sm mb-1">{cap.title}</h3>
                      <p className="text-white/60 text-xs leading-relaxed">{cap.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Section>

            <Section title="Use Cases">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {useCases.map((uc) => (
                  <div key={uc.title} className="p-5 rounded-lg bg-navy-700/40 border border-navy-700 text-center">
                    <uc.icon className="h-8 w-8 text-[#F8D042] mx-auto mb-3" />
                    <h3 className="text-white font-semibold text-sm mb-2">{uc.title}</h3>
                    <p className="text-white/60 text-xs leading-relaxed">{uc.desc}</p>
                  </div>
                ))}
              </div>
            </Section>

            <div className="text-center pt-4">
              <Button
                onClick={() => window.open('https://calendly.com/ahmed-mokhtar12/30min', '_blank')}
                className="gold-btn text-sm px-8"
              >
                Request a Demo
              </Button>
            </div>
          </div>
        </div>
      </main>

      <ChatWidget />
      <Footer />
    </div>
  );
};

export default AIAgents;
