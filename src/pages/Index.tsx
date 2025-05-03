
import React from 'react';
import Header from "@/components/Header";
import ChatBar from '@/components/ChatBar';
import Footer from '@/components/Footer';
import StarryBackground from '@/components/StarryBackground';

export default function Index() {
  return (
    <div className="min-h-screen flex flex-col relative">
      <StarryBackground />
      <Header />
      <main className="container mx-auto px-4 flex-grow overflow-y-auto relative z-10">
        <h1 className="text-4xl md:text-5xl font-bold mb-8 text-center">
          <span className="text-white">AI-Powered </span>
          <span className="text-gold">Automation</span>
          <span className="text-white"> Solutions</span>
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          <div className="bg-navy-800 p-6 rounded-lg shadow-lg border border-navy-700">
            <h2 className="text-2xl font-semibold text-gold mb-4">Our Services</h2>
            <p className="text-white mb-4">We provide cutting-edge AI automation solutions for businesses of all sizes.</p>
          </div>
          <div className="bg-navy-800 p-6 rounded-lg shadow-lg border border-navy-700">
            <h2 className="text-2xl font-semibold text-gold mb-4">Get Started</h2>
            <p className="text-white mb-4">Contact us today to learn how AI can transform your business processes.</p>
          </div>
        </div>
      </main>
      
      <Footer />
      <ChatBar />
    </div>
  );
}
