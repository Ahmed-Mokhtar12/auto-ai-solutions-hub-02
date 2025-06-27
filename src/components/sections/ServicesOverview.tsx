
import React from 'react';
import { Link } from 'react-router-dom';
import { Bot, Sparkles, Shield, Zap, MessageSquare, Brain, Hotel, Utensils, Calendar } from 'lucide-react';
import HoverVisibleContainer from '@/components/HoverVisibleContainer';

const ServicesOverview: React.FC = () => {
  const services = [
    {
      icon: <Bot className="h-8 w-8 text-gold" />,
      title: "AI Hotel Concierge",
      description: "Intelligent guest assistance that handles inquiries, bookings, and personalized recommendations 24/7.",
      features: ["Multilingual Guest Support", "Room Service Automation", "Local Recommendations", "Instant Booking Management"],
      link: "/ai-agents"
    },
    {
      icon: <Sparkles className="h-8 w-8 text-gold" />,
      title: "Guest Experience AI",
      description: "Create personalized guest experiences with AI-powered content generation and preference learning.",
      features: ["Personalized Recommendations", "Dynamic Pricing Optimization", "Guest Preference Analysis", "Custom Marketing Content"],
      link: "/generative-ai"
    },
    {
      icon: <Shield className="h-8 w-8 text-gold" />,
      title: "Hospitality-Safe AI",
      description: "Privacy-first AI solutions designed specifically for hospitality with guest data protection at the core.",
      features: ["GDPR Compliant Operations", "Guest Privacy Protection", "Secure Data Handling", "Transparent AI Decisions"],
      link: "/responsible-ai"
    }
  ];

  const hospitalityServices = [
    {
      icon: <Hotel className="h-8 w-8 text-gold" />,
      title: "WhatsApp Hotel Assistant",
      description: "Complete WhatsApp integration for guest communications, room service, and concierge services."
    },
    {
      icon: <Utensils className="h-8 w-8 text-gold" />,
      title: "Restaurant & F&B Automation",
      description: "AI-powered reservation management, menu recommendations, and dietary preference handling."
    },
    {
      icon: <Calendar className="h-8 w-8 text-gold" />,
      title: "Event & Conference AI",
      description: "Automated event planning assistance, attendee management, and personalized event experiences."
    }
  ];

  return (
    <section className="py-20 bg-navy-800/5">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-4">
            <Hotel className="h-10 w-10 text-gold mr-2" />
            <h2 className="text-4xl font-bold text-white">Hospitality AI Solutions</h2>
          </div>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-6">
            Specialized AI automation services designed exclusively for the hospitality industry. 
            From luxury hotels to boutique resorts, we enhance guest experiences while optimizing operations.
          </p>
          <div className="bg-gold/10 border border-gold/30 rounded-lg p-3 max-w-xl mx-auto">
            <p className="text-gold font-medium">🏆 100% Hospitality Focused</p>
          </div>
        </div>

        {/* Main Hospitality Services */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {services.map((service, index) => (
            <HoverVisibleContainer
              key={index}
              autoHideDelay={2500}
              initialVisibility={false}
              showIndicator={false}
            >
              <Link
                to={service.link}
                className="group bg-navy-800/80 p-8 rounded-xl border border-navy-700 
                         hover:border-gold hover:shadow-gold/20 transition-all duration-300 hover:scale-105 block"
              >
                <div className="flex items-center mb-4">
                  {service.icon}
                  <h3 className="text-xl font-semibold text-white ml-3">{service.title}</h3>
                </div>
                <p className="text-gray-300 mb-6 leading-relaxed">{service.description}</p>
                <ul className="space-y-2 mb-6">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="text-sm text-gray-300 flex items-center">
                      <span className="w-2 h-2 bg-gold rounded-full mr-3 flex-shrink-0"></span>
                      {feature}
                    </li>
                  ))}
                </ul>
                <div className="text-gold text-sm font-medium group-hover:text-gold/80">
                  Learn More →
                </div>
              </Link>
            </HoverVisibleContainer>
          ))}
        </div>

        {/* Specialized Hospitality Services */}
        <div className="text-center mb-12">
          <h3 className="text-2xl font-bold text-white mb-4">Specialized Hospitality Solutions</h3>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Industry-specific AI tools built for the unique needs of hotels, restaurants, and hospitality businesses.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {hospitalityServices.map((service, index) => (
            <HoverVisibleContainer
              key={index}
              autoHideDelay={2500}
              initialVisibility={false}
              showIndicator={false}
            >
              <div
                className="bg-navy-800/50 p-6 rounded-lg border border-navy-700 
                         hover:border-gold/50 transition-all duration-300"
              >
                <div className="flex items-center mb-3">
                  {service.icon}
                  <h4 className="text-lg font-medium text-white ml-3">{service.title}</h4>
                </div>
                <p className="text-gray-300 text-sm leading-relaxed">{service.description}</p>
              </div>
            </HoverVisibleContainer>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesOverview;
