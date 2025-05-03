
import React from 'react';
import Header from "@/components/Header";
import ChatBar from '@/components/ChatBar';
import Footer from '@/components/Footer';
import StarryBackground from '@/components/StarryBackground';

export default function Index() {
  return (
    <div className="h-screen bg-transparent text-white flex flex-col overflow-hidden relative">
      <StarryBackground />
      <Header />
      <main className="container mx-auto px-4 flex-grow overflow-y-auto relative z-10">
        <h1 className="text-4xl md:text-5xl font-bold mb-8 text-center">
          AI-Powered <span className="text-gold">Automation</span> Solutions
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Content here */}
        </div>
      </main>
      
      <Footer />
      <ChatBar />
    </div>
  );
}
