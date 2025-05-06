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
  return <div className="min-h-screen flex flex-col relative">
      <StarryBackground />
      <Header />
      <main className="container mx-auto px-4 flex-grow overflow-y-auto relative z-10">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-center">
          <span className="text-white">AI-Powered </span>
          <span className="text-gold">Automation</span>
          <span className="text-white"> Solutions</span>
        </h1>
        
        <p className="text-center text-white mb-12 max-w-2xl mx-auto opacity-90 text-base font-light">
          Streamline your business operations using cutting-edge AI workflows tailored to your needs.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          <div className="bg-navy-800 p-6 rounded-lg shadow-lg border border-navy-700 px-[20px] py-[20px]">
            <h2 className="text-2xl font-semibold text-gold mb-4">Our Solutions</h2>
            <p className="text-white mb-4">We offer tailored AI solutions including Email Automation, WhatsApp Bots, Hotel Concierge AI, and more.</p>
          </div>
          <div className="bg-navy-800 p-6 rounded-lg shadow-lg border border-navy-700 py-[20px] px-[20px]">
            <h2 className="text-2xl font-semibold text-gold mb-4">Free Consultation</h2>
            <p className="text-white mb-4">Book a free session today to learn how our AI experts can automate and enhance your business operations.</p>
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