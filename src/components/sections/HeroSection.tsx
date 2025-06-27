
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
          Transform your hotel operations with cutting-edge AI workflows designed specifically for hospitality. 
          We deliver intelligent automation solutions that work 24/7 to enhance guest experiences, 
          reduce operational costs, and boost your hotel's reputation.
        </p>
        
        {/* Key Benefits */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 max-w-4xl mx-auto">
          <div className="bg-navy-800/50 p-6 rounded-lg border border-navy-700">
            <h3 className="text-gold font-semibold mb-2">24/7 Guest Service</h3>
            <p className="text-white text-sm">AI concierge that never sleeps, ensuring guests get instant assistance</p>
          </div>
          <div className="bg-navy-800/50 p-6 rounded-lg border border-navy-700">
            <h3 className="text-gold font-semibold mb-2">70% Cost Reduction</h3>
            <p className="text-white text-sm">Reduce hospitality operational costs while improving service quality</p>
          </div>
          <div className="bg-navy-800/50 p-6 rounded-lg border border-navy-700">
            <h3 className="text-gold font-semibold mb-2">Guest Satisfaction+</h3>
            <p className="text-white text-sm">Boost guest satisfaction scores with personalized, instant service</p>
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
              <h2 className="text-xl font-semibold text-gold mb-3">Free Hotel AI Consultation</h2>
              <p className="text-white mb-4 text-sm leading-relaxed">
                Book a free 30-minute session with our hospitality AI experts. We'll analyze your hotel operations 
                and show you exactly how AI can transform your guest experience and reduce costs.
              </p>
              <div className="text-left mb-4">
                <ul className="text-white text-xs space-y-1">
                  <li>• Hotel Operations Analysis</li>
                  <li>• Guest Experience Enhancement Plan</li>
                  <li>• ROI Calculator for Your Property</li>
                  <li>• Custom Implementation Roadmap</li>
                </ul>
              </div>
              <Button onClick={onBookSession} className="gold-btn w-full">
                Book Your Free Hotel Consultation
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
              <h2 className="text-xl font-semibold text-gold mb-3">Hospitality AI Solutions</h2>
              <p className="text-white mb-4 text-sm leading-relaxed">
                Explore our specialized hospitality AI services including WhatsApp Guest Assistant, 
                AI Hotel Concierge, Restaurant Automation, and custom hotel management solutions.
              </p>
              <div className="text-left mb-4">
                <ul className="text-white text-xs space-y-1">
                  <li>• AI Hotel Concierge & Guest Services</li>
                  <li>• WhatsApp Integration for Hotels</li>
                  <li>• Restaurant & F&B Automation</li>
                  <li>• Custom Hotel Management AI</li>
                </ul>
              </div>
              <div className="text-gold text-sm font-medium">
                Explore hospitality solutions →
              </div>
            </div>
          </HoverVisibleContainer>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
