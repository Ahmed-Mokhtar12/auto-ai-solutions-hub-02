
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, LucideIcon } from 'lucide-react';
import Header from "@/components/Header";
import ChatWidget from '@/components/chat/ChatWidget';
import DynamicBackground from '@/components/DynamicBackground';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';

interface UseCase {
  title: string;
  description: string;
}

interface Step {
  number: string;
  title: string;
  description: string;
}

interface IndustryPageProps {
  icon: LucideIcon;
  title: string;
  overview: string;
  useCases: UseCase[];
  steps: Step[];
}

const IndustryPageTemplate: React.FC<IndustryPageProps> = ({ icon: Icon, title, overview, useCases, steps }) => {
  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      <DynamicBackground />
      <Header />

      <main className="container mx-auto px-4 flex-grow relative z-10">
        <div className="w-full max-w-4xl mx-auto py-10">
          <Link to="/" className="inline-flex items-center gap-2 text-[#F8D042] hover:text-[#F8D042]/80 transition-colors mb-6 text-sm font-medium">
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>

          <div className="flex items-center justify-center gap-3 mb-8">
            <Icon className="h-8 w-8 text-[#F8D042]" />
            <h1 className="text-3xl md:text-4xl font-semibold text-white">{title}</h1>
          </div>

          <div className="bg-navy-800/80 backdrop-blur-md rounded-2xl p-6 md:p-8 border border-navy-700 space-y-10 max-h-[55vh] overflow-y-auto chat-scrollbar">
            <p className="text-white/90 text-lg leading-relaxed">{overview}</p>

            <div>
              <h2 className="text-2xl font-semibold text-[#F8D042] mb-4">Use Cases</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {useCases.map((uc) => (
                  <div key={uc.title} className="p-5 rounded-lg bg-navy-700/40 border border-navy-700">
                    <h3 className="text-white font-semibold text-sm mb-2">{uc.title}</h3>
                    <p className="text-white/60 text-xs leading-relaxed">{uc.description}</p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-[#F8D042] mb-4">How We Help</h2>
              <div className="space-y-4">
                {steps.map((step) => (
                  <div key={step.number} className="flex items-start gap-4 p-4 rounded-lg bg-navy-700/40 border border-navy-700">
                    <span className="text-[#F8D042] font-bold text-lg shrink-0">{step.number}</span>
                    <div>
                      <h3 className="text-white font-medium text-sm mb-1">{step.title}</h3>
                      <p className="text-white/60 text-xs leading-relaxed">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

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

export default IndustryPageTemplate;
