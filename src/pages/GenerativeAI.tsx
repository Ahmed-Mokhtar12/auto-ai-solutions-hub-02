
import React from 'react';
import Header from "@/components/Header";
import ChatBar from '@/components/ChatBar';
import StarryBackground from '@/components/StarryBackground';

const GenerativeAI = () => {
  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      <StarryBackground />
      <Header />
      
      <main className="container mx-auto px-4 flex-grow flex items-center justify-center relative z-10">
        <div className="w-full max-w-4xl py-10">
          <h1 className="text-4xl font-semibold text-white text-center mb-8">
            Generative AI
          </h1>
          <div className="bg-navy-800/80 backdrop-blur-md rounded-2xl p-8 border border-navy-700">
            <p className="text-white text-lg leading-relaxed">
              Harness the power of Generative AI to create content, generate insights, and 
              automate creative processes. Our solutions help you produce high-quality content, 
              generate code, create designs, and much more with cutting-edge AI technology.
            </p>
          </div>
        </div>
      </main>
      
      <ChatBar />
    </div>
  );
};

export default GenerativeAI;
