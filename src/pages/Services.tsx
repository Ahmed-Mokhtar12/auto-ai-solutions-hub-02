
import React from 'react';
import Header from "@/components/Header";
import ChatBar from '@/components/ChatBar';
import StarryBackground from '@/components/StarryBackground';
import { Link } from 'react-router-dom';

const Services = () => {
  const services = [
    {
      id: 'ai-agents',
      title: 'AI Agents',
      image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=240&fit=crop&auto=format',
      link: '/ai-agents'
    },
    {
      id: 'generative-ai',
      title: 'Generative AI',
      image: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=400&h=240&fit=crop&auto=format',
      link: '/generative-ai'
    },
    {
      id: 'responsible-ai',
      title: 'Responsible AI',
      image: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=400&h=240&fit=crop&auto=format',
      link: '/responsible-ai'
    }
  ];

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      <StarryBackground />
      <Header />
      
      <main className="container mx-auto px-4 flex-grow flex items-center justify-center relative z-10">
        <div className="w-full max-w-[1200px] py-10">
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
                <div className="h-60 overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-medium text-gray-800">
                    {service.title}
                  </h3>
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
