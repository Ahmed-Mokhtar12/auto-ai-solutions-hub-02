
import React from 'react';
import { Link } from 'react-router-dom';
import { Bot, Sparkles, Shield, Zap, MessageSquare, Brain, Hotel, Utensils, Calendar, Factory, Building2 } from 'lucide-react';
import HoverVisibleContainer from '@/components/HoverVisibleContainer';

const ServicesOverview: React.FC = () => {
  const services = [
    {
      icon: <Bot className="h-8 w-8 text-gold" />,
      title: "AI-Powered Automation",
      description: "Intelligent automation that handles complex tasks and decisions 24/7 — from hotel concierge services to enterprise workflow optimization.",
      features: ["Process Automation", "Intelligent Task Routing", "24/7 Operations", "Custom Workflow Design"],
      link: "/ai-agents"
    },
    {
      icon: <Sparkles className="h-8 w-8 text-gold" />,
      title: "Intelligent Analytics & Personalization",
      description: "AI-driven insights, dynamic recommendations, and personalized experiences for your customers and operations.",
      features: ["Predictive Analytics", "Dynamic Optimization", "Customer Preference Learning", "Data-Driven Decisions"],
      link: "/generative-ai"
    },
    {
      icon: <Shield className="h-8 w-8 text-gold" />,
      title: "Responsible & Secure AI",
      description: "Privacy-first AI solutions with transparent, fair, and accountable systems built with compliance at the core.",
      features: ["GDPR Compliant Operations", "Data Privacy Protection", "Secure Data Handling", "Transparent AI Decisions"],
      link: "/responsible-ai"
    }
  ];

  const specializedServices = [
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
    <section className="py-12 md:py-20 bg-navy-800/5">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">AI Solutions</h2>
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto mb-6">
            Specialized in hospitality AI with proven expertise that extends across every industry. 
            From luxury hotels to enterprise operations, we deliver intelligent automation that works.
          </p>
          <div className="bg-gold/10 border border-gold/30 rounded-lg p-3 max-w-xl mx-auto">
            <p className="text-gold font-medium">🏆 Hospitality Specialists | Enterprise Ready</p>
          </div>
        </div>

        {/* Main Services */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8 mb-12 md:mb-20">
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
          <h3 className="text-2xl font-bold text-white mb-4">Hospitality-Specific Solutions</h3>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Industry-leading AI tools built for the unique needs of hotels, restaurants, and hospitality businesses. 
            We also serve Manufacturing, Finance, Retail, Healthcare, and more.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          {specializedServices.map((service, index) => (
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
