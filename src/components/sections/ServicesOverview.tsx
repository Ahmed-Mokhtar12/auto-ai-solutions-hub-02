
import React from 'react';
import { Link } from 'react-router-dom';
import { Bot, Sparkles, Shield, Zap, MessageSquare, Brain } from 'lucide-react';

const ServicesOverview: React.FC = () => {
  const services = [
    {
      icon: <Bot className="h-8 w-8 text-gold" />,
      title: "AI Agents",
      description: "Intelligent automation that handles complex tasks, makes decisions, and learns from interactions.",
      features: ["Customer Service Automation", "Process Optimization", "Decision Making AI", "24/7 Operations"],
      link: "/ai-agents"
    },
    {
      icon: <Sparkles className="h-8 w-8 text-gold" />,
      title: "Generative AI",
      description: "Create content, generate insights, and automate creative processes with advanced AI.",
      features: ["Content Generation", "Data Analysis", "Creative Automation", "Insight Generation"],
      link: "/generative-ai"
    },
    {
      icon: <Shield className="h-8 w-8 text-gold" />,
      title: "Responsible AI",
      description: "Ethical AI development with transparency, fairness, and human values at the core.",
      features: ["Ethical AI Design", "Privacy Protection", "Bias Prevention", "Transparent Operations"],
      link: "/responsible-ai"
    }
  ];

  const additionalServices = [
    {
      icon: <MessageSquare className="h-8 w-8 text-gold" />,
      title: "Communication Automation",
      description: "WhatsApp bots, email automation, and multi-channel customer engagement."
    },
    {
      icon: <Brain className="h-8 w-8 text-gold" />,
      title: "Custom AI Solutions",
      description: "Tailored AI systems designed specifically for your industry and business needs."
    },
    {
      icon: <Zap className="h-8 w-8 text-gold" />,
      title: "Workflow Optimization",
      description: "End-to-end process automation that integrates seamlessly with your existing systems."
    }
  ];

  return (
    <section className="py-20 bg-navy-800/20 backdrop-blur-sm">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-6">Our AI Solutions</h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Comprehensive AI automation services designed to transform your business operations, 
            enhance productivity, and drive sustainable growth.
          </p>
        </div>

        {/* Main Services */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {services.map((service, index) => (
            <Link
              key={index}
              to={service.link}
              className="group bg-navy-800/80 backdrop-blur-md p-8 rounded-xl border border-navy-700 
                       hover:border-gold hover:shadow-gold/20 transition-all duration-300 hover:scale-105"
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
          ))}
        </div>

        {/* Additional Services */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {additionalServices.map((service, index) => (
            <div
              key={index}
              className="bg-navy-800/50 backdrop-blur-sm p-6 rounded-lg border border-navy-700 
                       hover:border-gold/50 transition-all duration-300"
            >
              <div className="flex items-center mb-3">
                {service.icon}
                <h4 className="text-lg font-medium text-white ml-3">{service.title}</h4>
              </div>
              <p className="text-gray-300 text-sm leading-relaxed">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesOverview;
