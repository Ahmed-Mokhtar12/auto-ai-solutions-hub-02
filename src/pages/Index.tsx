
import React from 'react';
import Header from "@/components/Header";
import ChatBar from '@/components/ChatBar';
import Footer from '@/components/Footer';

export default function Index() {
  return (
    <div className="min-h-screen bg-navy-900 text-white flex flex-col">
      <Header />
      <main className="container mx-auto py-8 px-4 flex-grow">
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
