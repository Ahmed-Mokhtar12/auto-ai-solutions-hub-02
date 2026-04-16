
import React from 'react';
import { Button } from '@/components/ui/button';
import HoverVisibleContainer from '@/components/HoverVisibleContainer';

interface HeroSectionProps {
  onBookSession: () => void;
  onSolutionsClick: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ onBookSession, onSolutionsClick }) => {
  return (
    <section className="container mx-auto px-4 py-12 md:py-20 text-center">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">
          <span className="text-white">Enterprise </span>
          <span className="text-gold">AI Solutions</span>
          <br />
          <span className="text-white text-xl md:text-3xl font-medium mt-2 block">
            Built for Hospitality, Ready for Every Industry
          </span>
        </h1>
        
        <p className="text-lg md:text-xl text-white mb-8 max-w-3xl mx-auto opacity-90 font-light leading-relaxed">
          We specialize in AI workflows for luxury hotels and resorts — and bring the same 
          proven methodology to enterprises across every sector. Intelligent automation that 
          works 24/7 to enhance operations, reduce costs, and deliver measurable results.
        </p>
        
        {/* Key Benefits */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-12 max-w-4xl mx-auto">
          <div className="bg-navy-800/50 p-6 rounded-lg border border-navy-700">
            <h3 className="text-gold font-semibold mb-2">24/7 Intelligent Operations</h3>
            <p className="text-white text-sm">AI-powered systems that never sleep, ensuring seamless operations around the clock</p>
          </div>
          <div className="bg-navy-800/50 p-6 rounded-lg border border-navy-700">
            <h3 className="text-gold font-semibold mb-2">Up to 70% Cost Reduction</h3>
            <p className="text-white text-sm">Reduce operational costs while improving service quality and output</p>
          </div>
          <div className="bg-navy-800/50 p-6 rounded-lg border border-navy-700">
            <h3 className="text-gold font-semibold mb-2">Measurable ROI in 90 Days</h3>
            <p className="text-white text-sm">See tangible results fast with our rapid deployment methodology</p>
          </div>
        </div>
        
        {/* CTA Boxes */}
        <div className="flex flex-col md:flex-row justify-center items-center gap-6 md:gap-16">
          <HoverVisibleContainer 
            className="w-full md:w-[350px]"
            showIndicator={false}
            autoHideDelay={3000}
          >
            <div className="bg-navy-800 p-6 rounded-xl shadow-lg border border-navy-700 w-full
                           hover:border-gold hover:shadow-gold/20 transition-all duration-300 hover:scale-105">
              <h2 className="text-xl font-semibold text-gold mb-3">Free AI Consultation</h2>
              <p className="text-white mb-4 text-sm leading-relaxed">
                Book a free 30-minute session with our AI experts. Whether you're in hospitality 
                or any other industry, we'll analyze your operations and show you how AI can 
                transform your business.
              </p>
              <div className="text-left mb-4">
                <ul className="text-white text-xs space-y-1">
                  <li>• Operations & Workflow Analysis</li>
                  <li>• AI Opportunity Assessment</li>
                  <li>• ROI Calculator for Your Business</li>
                  <li>• Custom Implementation Roadmap</li>
                </ul>
              </div>
              <Button onClick={onBookSession} className="gold-btn w-full">
                Request a Demo
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
              <h2 className="text-xl font-semibold text-gold mb-3">Enterprise AI Solutions</h2>
              <p className="text-white mb-4 text-sm leading-relaxed">
                Explore our AI services — from hospitality-specific tools like AI Concierge 
                and WhatsApp Guest Assistant, to cross-industry solutions for automation, 
                analytics, and process optimization.
              </p>
              <div className="text-left mb-4">
                <ul className="text-white text-xs space-y-1">
                  <li>• AI Automation & Process Optimization</li>
                  <li>• Intelligent Analytics & Personalization</li>
                  <li>• Hospitality-Specific AI Tools</li>
                  <li>• Custom Enterprise Integrations</li>
                </ul>
              </div>
              <Button variant="outline" className="w-full border-gold text-gold hover:bg-gold/10">
                Explore Solutions
              </Button>
            </div>
          </HoverVisibleContainer>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
