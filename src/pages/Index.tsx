
import React, { useState } from 'react';
import Header from "@/components/Header";
import ChatBar from '@/components/ChatBar';
import FooterContainer from '@/components/FooterContainer';
import StarryBackground from '@/components/StarryBackground';
import { Button } from '@/components/ui/button';
import HoverVisibleContainer from '@/components/HoverVisibleContainer';
import FloatingServiceBox from '@/components/FloatingServiceBox';

export default function Index() {
  const [showSolutions, setShowSolutions] = useState(false);
  
  const handleBookSession = () => {
    // Open Calendly with the provided link
    window.open('https://calendly.com/ahmed-mokhtar12/30min?month=2025-06', '_blank');
  };

  const handleSolutionsClick = () => {
    setShowSolutions(true);
  };

  const handleBackToHome = () => {
    setShowSolutions(false);
  };
  
  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      <StarryBackground />
      <Header />
      
      {!showSolutions ? (
        // Original homepage content
        <main className="container mx-auto px-4 flex-grow flex items-center justify-center relative z-10">
          <div className="w-full py-4">
            <h1 className="text-3xl md:text-4xl font-bold mb-3 text-center">
              <span className="text-white">AI-Powered </span>
              <span className="text-gold">Automation</span>
              <span className="text-white"> Solutions</span>
            </h1>
            
            <p className="text-center text-white mb-6 max-w-lg mx-auto opacity-90 text-sm md:text-base font-light">
              Streamline your business operations using cutting-edge AI workflows tailored to your needs.
            </p>
            
            <div className="flex flex-col md:flex-row justify-center gap-[350px] md:gap-[400px] mx-auto mb-6">
              {/* Free Consultation section with hover visibility */}
              <HoverVisibleContainer 
                className="w-[15cm] mx-auto md:mx-0"
                showIndicator={false}
                autoHideDelay={2500}
              >
                <div className="bg-navy-800 p-4 rounded-lg shadow-lg border border-navy-700 w-full
                               hover:border-gold hover:shadow-gold/20 transition-all duration-300 hover:scale-105">
                  <h2 className="text-lg font-semibold text-gold mb-2">Free Consultation</h2>
                  <p className="text-white mb-2 text-sm">Book a free session today to learn how our AI experts can automate and enhance your business operations.</p>
                  <Button onClick={handleBookSession} className="gold-btn text-sm">
                    Book a Free Session
                  </Button>
                </div>
              </HoverVisibleContainer>
              
              {/* Our Solutions section with hover visibility - NOW CLICKABLE */}
              <HoverVisibleContainer 
                className="mt-5 md:mt-0 w-[15cm] mx-auto md:mx-0"
                showIndicator={false}
                autoHideDelay={2500}
              >
                <div 
                  className="bg-navy-800 p-4 rounded-lg shadow-lg border border-navy-700 w-full cursor-pointer 
                           hover:border-gold hover:shadow-gold/20 transition-all duration-300 hover:scale-105"
                  onClick={handleSolutionsClick}
                >
                  <h2 className="text-lg font-semibold text-gold mb-2">Our Solutions</h2>
                  <p className="text-white mb-2 text-sm">We offer tailored AI solutions including Email Automation, WhatsApp Bots, Hotel Concierge AI, and more.</p>
                </div>
              </HoverVisibleContainer>
            </div>
            
            {/* Reduced space between content and footer */}
            <div className="h-[20px]"></div>
          </div>
        </main>
      ) : (
        // Solutions view - Only floating boxes
        <main className="container mx-auto px-4 flex-grow flex items-center justify-center relative z-10">
          <div className="w-full h-full flex items-center justify-center">
            {/* Back button */}
            <button
              onClick={handleBackToHome}
              className="absolute top-4 left-4 text-gold hover:text-gold/80 transition-colors z-20"
            >
              ← Back to Home
            </button>
            
            {/* Three floating service boxes arranged in a triangle */}
            <div className="relative w-full max-w-6xl h-full flex items-center justify-center">
              {/* AI Agents - Top */}
              <div className="absolute top-1/4 left-1/2 transform -translate-x-1/2">
                <FloatingServiceBox
                  title="AI Agents"
                  description="Intelligent automation solutions that handle complex tasks and make decisions to streamline your operations 24/7."
                  route="/ai-agents"
                  delay={0}
                />
              </div>
              
              {/* Generative AI - Bottom Left */}
              <div className="absolute bottom-1/4 left-1/4 transform -translate-x-1/2">
                <FloatingServiceBox
                  title="Generative AI"
                  description="Create content, generate insights, and automate creative processes with cutting-edge AI technology."
                  route="/generative-ai"
                  delay={200}
                />
              </div>
              
              {/* Responsible AI - Bottom Right */}
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
