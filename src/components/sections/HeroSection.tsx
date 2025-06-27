
import React from 'react';
import { Button } from '@/components/ui/button';
import HoverVisibleContainer from '@/components/HoverVisibleContainer';

interface HeroSectionProps {
  onBookSession: () => void;
  onSolutionsClick: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ onBookSession, onSolutionsClick }) => {
  return (
    <section className="container mx-auto px-4 py-20 text-center">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">
          <span className="text-white">AI-Powered </span>
          <span className="text-gold">Automation</span>
          <span className="text-white"> Solutions</span>
        </h1>
        
        <p className="text-xl text-white mb-8 max-w-3xl mx-auto opacity-90 font-light leading-relaxed">
          Transform your business operations with cutting-edge AI workflows. 
          We deliver intelligent automation solutions that work 24/7 to enhance productivity, 
          reduce costs, and accelerate growth.
        </p>
        
        {/* Key Benefits */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 max-w-4xl mx-auto">
          <div className="bg-navy-800/50 backdrop-blur-sm p-6 rounded-lg border border-navy-700">
            <h3 className="text-gold font-semibold mb-2">24/7 Operation</h3>
            <p className="text-white text-sm">AI solutions that never sleep, ensuring continuous productivity</p>
          </div>
          <div className="bg-navy-800/50 backdrop-blur-sm p-6 rounded-lg border border-navy-700">
            <h3 className="text-gold font-semibold mb-2">Cost Reduction</h3>
            <p className="text-white text-sm">Reduce operational costs by up to 60% with intelligent automation</p>
          </div>
          <div className="bg-navy-800/50 backdrop-blur-sm p-6 rounded-lg border border-navy-700">
            <h3 className="text-gold font-semibold mb-2">Scalable Solutions</h3>
            <p className="text-white text-sm">Grow your business without proportional increase in resources</p>
          </div>
        </div>
        
        {/* CTA Boxes */}
        <div className="flex flex-col md:flex-row justify-center items-center gap-8 md:gap-16">
          <HoverVisibleContainer 
            className="w-full md:w-[350px]"
            showIndicator={false}
            autoHideDelay={3000}
          >
            <div className="bg-navy-800 p-6 rounded-xl shadow-lg border border-navy-700 w-full
                           hover:border-gold hover:shadow-gold/20 transition-all duration-300 hover:scale-105">
              <h2 className="text-xl font-semibold text-gold mb-3">Free Consultation</h2>
              <p className="text-white mb-4 text-sm leading-relaxed">
                Book a free 30-minute session with our AI experts. We'll analyze your current processes 
                and show you exactly how AI can transform your business operations.
              </p>
              <div className="text-left mb-4">
                <ul className="text-white text-xs space-y-1">
                  <li>• Process Analysis & Recommendations</li>
                  <li>• ROI Calculator & Timeline</li>
                  <li>• Custom Solution Design</li>
                  <li>• Implementation Roadmap</li>
                </ul>
              </div>
              <Button onClick={onBookSession} className="gold-btn w-full">
                Book Your Free Session
              </Button>
            </div>
          </HoverVisibleContainer>
          
          <HoverVisibleContainer 
            className="w-full md:w-[350px]"
            showIndicator={false}
            autoHideDelay={3000}
          >
            <div 
              className="bg-navy-800 p-6 rounded-xl shadow-lg border border-navy-700 w-full cursor-pointer 
                         hover:border-gold hover:shadow-gold/20 transition-all duration-300 hover:scale-105"
              onClick={onSolutionsClick}
            >
              <h2 className="text-xl font-semibold text-gold mb-3">Our Solutions</h2>
              <p className="text-white mb-4 text-sm leading-relaxed">
                Explore our comprehensive AI automation services including Email Automation, 
                WhatsApp Bots, Hotel Concierge AI, and custom enterprise solutions.
              </p>
              <div className="text-left mb-4">
                <ul className="text-white text-xs space-y-1">
                  <li>• AI Agents & Intelligent Automation</li>
                  <li>• Generative AI for Content & Insights</li>
                  <li>• Responsible AI Development</li>
                  <li>• Custom Enterprise Solutions</li>
                </ul>
              </div>
              <div className="text-gold text-sm font-medium">
                Click to explore our services →
              </div>
            </div>
          </HoverVisibleContainer>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
