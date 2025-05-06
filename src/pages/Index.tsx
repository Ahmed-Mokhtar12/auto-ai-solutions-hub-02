
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
  
  return <div className="min-h-screen flex flex-col relative overflow-hidden">
      <StarryBackground />
      <Header />
      <main className="container mx-auto px-4 flex-grow flex items-center justify-center relative z-10">
        <div className="w-full py-6">
          <h1 className="text-3xl md:text-4xl font-bold mb-3 text-center">
            <span className="text-white">AI-Powered </span>
            <span className="text-gold">Automation</span>
            <span className="text-white"> Solutions</span>
          </h1>
          
          <p className="text-center text-white mb-8 max-w-lg mx-auto opacity-90 text-sm md:text-base font-light">
            Streamline your business operations using cutting-edge AI workflows tailored to your needs.
          </p>
          
          <div className="flex flex-col md:flex-row justify-between gap-5 mx-auto">
            {/* Free Consultation section - positioned to the left with 10cm (approx 3.75rem) margin */}
            <div className="md:ml-[3.75rem] w-full md:w-[45%] bg-navy-800 p-4 rounded-lg shadow-lg border border-navy-700">
              <h2 className="text-lg font-semibold text-gold mb-2">Free Consultation</h2>
              <p className="text-white mb-2 text-sm">Book a free session today to learn how our AI experts can automate and enhance your business operations.</p>
              <Button onClick={handleBookSession} className="gold-btn text-sm">
                Book a Free Session
              </Button>
            </div>
            
            {/* Our Solutions section - positioned to the right with 10cm (approx 3.75rem) margin */}
            <div className="mt-5 md:mt-0 md:mr-[3.75rem] w-full md:w-[45%] bg-navy-800 p-4 rounded-lg shadow-lg border border-navy-700">
              <h2 className="text-lg font-semibold text-gold mb-2">Our Solutions</h2>
              <p className="text-white mb-2 text-sm">We offer tailored AI solutions including Email Automation, WhatsApp Bots, Hotel Concierge AI, and more.</p>
            </div>
          </div>
          
          {/* Adding space between content and footer to position ChatBar */}
          <div className="h-[80px] mt-10"></div>
        </div>
      </main>
      
      <Footer />
      <ChatBar /> {/* Make sure ChatBar is included here */}
    </div>;
}
