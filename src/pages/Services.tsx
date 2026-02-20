
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Header from "@/components/Header";
import ChatBar from '@/components/ChatBar';
import DynamicBackground from '@/components/DynamicBackground';
import Lottie from 'lottie-react';

const Services = () => {
  const services = [
    {
      id: 'ai-agents',
      title: 'AI Agents',
      description: 'Intelligent automation solutions that handle complex tasks and make decisions to streamline your operations 24/7.',
      lottieUrl: 'https://assets10.lottiefiles.com/packages/lf20_sSF6EG.json',
      link: '/ai-agents'
    },
    {
      id: 'generative-ai',
      title: 'Generative AI',
      description: 'Create content, generate insights, and automate creative processes with cutting-edge AI technology.',
      lottieUrl: 'https://assets2.lottiefiles.com/packages/lf20_z1m3jxul.json',
      link: '/generative-ai'
    },
    {
      id: 'responsible-ai',
      title: 'Responsible AI',
      description: 'Ethical AI development with transparent, fair, and accountable solutions built with human values at the core.',
      lottieUrl: 'https://assets1.lottiefiles.com/packages/lf20_drwzfp4j.json',
      link: '/responsible-ai'
    }
  ];

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      <DynamicBackground />
      <Header />
      
      <main className="container mx-auto px-4 flex-grow flex items-center justify-center relative z-10">
        <div className="w-full max-w-[1200px] py-10">
          <Link to="/" className="inline-flex items-center gap-2 text-gold hover:text-gold/80 transition-colors mb-6 text-sm font-medium">
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>
          <h1 className="text-4xl font-semibold text-white text-center mb-8">
            Our AI Services
          </h1>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {services.map((service) => (
              <Link
                key={service.id}
                to={service.link}
                className="group bg-[#F4F1EF] rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 cursor-pointer"
              >
                <div className="h-60 flex items-center justify-center bg-[#F4F1EF]">
                  <Lottie
                    animationData={null}
                    loop={true}
                    autoplay={true}
                    style={{ width: 120, height: 120 }}
                    src={service.lottieUrl}
                    className="group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-medium text-gray-800 mb-3">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {service.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
      
      <ChatBar />
    </div>
  );
};

export default Services;
