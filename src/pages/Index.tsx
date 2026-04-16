import React, { useState } from 'react';
import Header from "@/components/Header";
import Footer from '@/components/Footer';
import DynamicBackground from '@/components/DynamicBackground';
import ThemeToggle from '@/components/ThemeToggle';
import { Button } from '@/components/ui/button';
import FloatingServiceBox from '@/components/FloatingServiceBox';
import HeroSection from '@/components/sections/HeroSection';
import ServicesOverview from '@/components/sections/ServicesOverview';
import IndustrySolutions from '@/components/sections/IndustrySolutions';
import ProcessSection from '@/components/sections/ProcessSection';
import TestimonialsSection from '@/components/sections/TestimonialsSection';
import TrustSection from '@/components/sections/TrustSection';
import SocialProofSection from '@/components/sections/SocialProofSection';
import ChatWidget from '@/components/chat/ChatWidget';

export default function Index() {
  const [showSolutions, setShowSolutions] = useState(false);
  
  const handleBookSession = () => {
    window.open('https://calendly.com/ahmed-mokhtar12/30min', '_blank');
  };

  const handleSolutionsClick = () => {
    setShowSolutions(true);
  };

  const handleBackToHome = () => {
    setShowSolutions(false);
  };
  
  return (
    <div className="min-h-screen flex flex-col relative pb-[15vh]">
      <DynamicBackground />
      
      <div className="absolute top-4 left-4 z-50">
        <ThemeToggle />
      </div>
      
      <Header />
      
      {!showSolutions ? (
        <main className="flex-grow relative z-10">
          <HeroSection 
            onBookSession={handleBookSession}
            onSolutionsClick={handleSolutionsClick}
          />
          <ServicesOverview />
          <IndustrySolutions />
          <ProcessSection />
          <TestimonialsSection />
          <TrustSection />
          <SocialProofSection />
          
          <section className="py-20 bg-navy-800/30">
            <div className="container mx-auto px-4 text-center">
              <h2 className="text-3xl font-bold text-foreground mb-6">Ready to Transform Your Business with AI?</h2>
              <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
                Join enterprises across hospitality, manufacturing, finance, and more that have 
                automated their operations with our AI solutions. Start with a free consultation today.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button onClick={handleBookSession} className="gold-btn text-lg px-8 py-3">
                  Request a Demo
                </Button>
                <Button onClick={handleSolutionsClick} variant="outline" className="border-gold text-gold hover:bg-gold/10 text-lg px-8 py-3">
                  Explore Solutions
                </Button>
              </div>
            </div>
          </section>
        </main>
      ) : (
        <main className="container mx-auto px-4 flex-grow flex items-center justify-center relative z-10">
          <div className="w-full h-full flex items-center justify-center">
            <button
              onClick={handleBackToHome}
              className="absolute top-4 left-4 text-gold hover:text-gold/80 transition-colors z-20"
            >
              ← Back to Home
            </button>
            
            <div className="relative w-full max-w-6xl h-full flex items-center justify-center">
              <div className="absolute top-1/4 left-1/2 transform -translate-x-1/2">
                <FloatingServiceBox title="AI Agents" description="Intelligent automation solutions that handle complex tasks and make decisions to streamline your operations 24/7." route="/ai-agents" delay={0} />
              </div>
              <div className="absolute bottom-1/4 left-1/4 transform -translate-x-1/2">
                <FloatingServiceBox title="Generative AI" description="Create content, generate insights, and automate creative processes with cutting-edge AI technology." route="/generative-ai" delay={200} />
              </div>
              <div className="absolute bottom-1/4 right-1/4 transform translate-x-1/2">
                <FloatingServiceBox title="Responsible AI" description="Ethical AI development with transparent, fair, and accountable solutions built with human values at the core." route="/responsible-ai" delay={400} />
              </div>
            </div>
          </div>
        </main>
      )}
      
      <Footer />
      <ChatWidget />
    </div>
  );
}
