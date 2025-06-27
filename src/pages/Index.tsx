
import React, { useState } from 'react';
import Header from "@/components/Header";
import ChatBar from '@/components/ChatBar';
import FooterContainer from '@/components/FooterContainer';
import DynamicBackground from '@/components/DynamicBackground';
import ThemeToggle from '@/components/ThemeToggle';
import { Button } from '@/components/ui/button';
import HoverVisibleContainer from '@/components/HoverVisibleContainer';
import FloatingServiceBox from '@/components/FloatingServiceBox';
import HeroSection from '@/components/sections/HeroSection';
import ServicesOverview from '@/components/sections/ServicesOverview';
import ProcessSection from '@/components/sections/ProcessSection';
import SocialProofSection from '@/components/sections/SocialProofSection';

export default function Index() {
  const [showSolutions, setShowSolutions] = useState(false);
  
  const handleBookSession = () => {
    window.open('https://calendly.com/ahmed-mokhtar12/30min?month=2025-06', '_blank');
  };

  const handleSolutionsClick = () => {
    setShowSolutions(true);
  };

  const handleBackToHome = () => {
    setShowSolutions(false);
  };
  
  return (
    <div className="min-h-screen flex flex-col relative">
      <DynamicBackground />
      
      {/* Theme Toggle - Top Left Corner */}
      <div className="absolute top-4 left-4 z-50">
        <ThemeToggle />
      </div>
      
      <Header />
      
      {!showSolutions ? (
        // Enhanced homepage content - now scrollable
        <main className="flex-grow relative z-10">
          {/* Hero Section */}
          <HeroSection 
            onBookSession={handleBookSession}
            onSolutionsClick={handleSolutionsClick}
          />
          
          {/* Services Overview Section */}
          <ServicesOverview />
          
          {/* Process Section */}
          <ProcessSection />
          
          {/* Social Proof Section */}
          <SocialProofSection />
          
          {/* Call-to-Action Section */}
          <section className="py-20 bg-navy-800/30">
            <div className="container mx-auto px-4 text-center">
              <h2 className="text-3xl font-bold text-white mb-6">Ready to Transform Your Business?</h2>
              <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
                Join hundreds of businesses that have automated their operations with our AI solutions. 
                Start with a free consultation today.
              </p>
              <Button onClick={handleBookSession} className="gold-btn text-lg px-8 py-3">
                Book Your Free Session Now
              </Button>
            </div>
          </section>
        </main>
      ) : (
        // Solutions view - Only floating boxes (unchanged)
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
                <FloatingServiceBox
                  title="AI Agents"
                  description="Intelligent automation solutions that handle complex tasks and make decisions to streamline your operations 24/7."
                  route="/ai-agents"
                  delay={0}
                />
              </div>
              
              <div className="absolute bottom-1/4 left-1/4 transform -translate-x-1/2">
                <FloatingServiceBox
                  title="Generative AI"
                  description="Create content, generate insights, and automate creative processes with cutting-edge AI technology."
                  route="/generative-ai"
                  delay={200}
                />
              </div>
              
              <div className="absolute bottom-1/4 right-1/4 transform translate-x-1/2">
                <FloatingServiceBox
                  title="Responsible AI"
                  description="Ethical AI development with transparent, fair, and accountable solutions built with human values at the core."
                  route="/responsible-ai"
                  delay={400}
                />
              </div>
            </div>
          </div>
        </main>
      )}
      
      {!showSolutions && <FooterContainer />}
      <ChatBar /> 
    </div>
  );
}
