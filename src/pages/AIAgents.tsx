
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Header from "@/components/Header";
import ChatWidget from '@/components/chat/ChatWidget';
import DynamicBackground from '@/components/DynamicBackground';
import Footer from '@/components/Footer';

const AIAgents = () => {
  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden pb-[10vh]">
      <DynamicBackground />
      <Header />
      
      <main className="container mx-auto px-4 flex-grow flex items-center justify-center relative z-10">
        <div className="w-full max-w-4xl py-10">
          <Link to="/" className="inline-flex items-center gap-2 text-gold hover:text-gold/80 transition-colors mb-6 text-sm font-medium">
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>
          <h1 className="text-4xl font-semibold text-white text-center mb-8">
            AI Agents
          </h1>
          <div className="bg-navy-800/80 backdrop-blur-md rounded-2xl p-8 border border-navy-700">
            <p className="text-white text-lg leading-relaxed">
              Our AI Agents are intelligent automation solutions that can handle complex tasks, 
              make decisions, and interact with various systems to streamline your business operations. 
              From customer service to data processing, our AI agents work 24/7 to enhance your productivity.
            </p>
          </div>
        </div>
      </main>
      
      <ChatWidget />
      <Footer />
    </div>
  );
};

export default AIAgents;
