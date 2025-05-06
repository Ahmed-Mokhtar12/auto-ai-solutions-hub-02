
import React from 'react';
import Header from "@/components/Header";
import ChatBar from '@/components/ChatBar';
import Footer from '@/components/Footer';
import StarryBackground from '@/components/StarryBackground';
import { Button } from '@/components/ui/button';

export default function Index() {
  const handleBookSession = () => {
    // Open WhatsApp with predefined message
    window.open('https://wa.me/009715913426?text=I%20would%20like%20to%20book%20a%20free%20consultation%20session', '_blank');
  };
  return <div className="min-h-screen flex flex-col relative overflow-x-hidden">
      <StarryBackground />
      <Header />
      <main className="container mx-auto px-4 flex-grow overflow-y-auto relative z-10 pb-6">
        <h1 className="text-3xl md:text-4xl font-bold mb-3 text-center pt-4">
          <span className="text-white">AI-Powered </span>
          <span className="text-gold">Automation</span>
          <span className="text-white"> Solutions</span>
        </h1>
        
        <p className="text-center text-white mb-8 max-w-xl mx-auto opacity-90 text-sm md:text-base font-light">
          Streamline your business operations using cutting-edge AI workflows tailored to your needs.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          <div className="bg-navy-800 p-5 rounded-lg shadow-lg border border-navy-700">
            <h2 className="text-xl font-semibold text-gold mb-3">Our Solutions</h2>
            <p className="text-white mb-3 text-sm">We offer tailored AI solutions including Email Automation, WhatsApp Bots, Hotel Concierge AI, and more.</p>
          </div>
          <div className="bg-navy-800 p-5 rounded-lg shadow-lg border border-navy-700">
            <h2 className="text-xl font-semibold text-gold mb-3">Free Consultation</h2>
            <p className="text-white mb-3 text-sm">Book a free session today to learn how our AI experts can automate and enhance your business operations.</p>
            <Button onClick={handleBookSession} className="gold-btn">
              Book a Free Session
            </Button>
          </div>
        </div>
      </main>
      
      <Footer />
      <ChatBar />
    </div>;
}
