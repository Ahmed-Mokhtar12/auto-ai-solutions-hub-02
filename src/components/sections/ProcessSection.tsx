
import React from 'react';
import { Search, Lightbulb, Cog, Rocket } from 'lucide-react';
import HoverVisibleContainer from '@/components/HoverVisibleContainer';

const ProcessSection: React.FC = () => {
  const steps = [
    {
      icon: <Search className="h-12 w-12 text-gold" />,
      title: "Analysis & Discovery",
      description: "We analyze your current processes, identify automation opportunities, and understand your specific business needs.",
      details: ["Process mapping", "Pain point identification", "ROI analysis", "Technical assessment"]
    },
    {
      icon: <Lightbulb className="h-12 w-12 text-gold" />,
      title: "Solution Design",
      description: "Our AI experts design custom automation solutions tailored to your business requirements and goals.",
      details: ["Custom AI architecture", "Integration planning", "User experience design", "Performance metrics"]
    },
    {
      icon: <Cog className="h-12 w-12 text-gold" />,
      title: "Development & Testing",
      description: "We build, test, and refine your AI solutions using the latest technologies and best practices.",
      details: ["Agile development", "Quality assurance", "Security testing", "Performance optimization"]
    },
    {
      icon: <Rocket className="h-12 w-12 text-gold" />,
      title: "Deployment & Support",
      description: "We deploy your AI solutions and provide ongoing support to ensure optimal performance and continuous improvement.",
      details: ["Seamless deployment", "Team training", "24/7 monitoring", "Continuous optimization"]
    }
  ];

  return (
    <section className="py-12 md:py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">How We Work</h2>
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
            Our proven 4-step process ensures successful AI implementation that delivers measurable results 
            and transforms your business operations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
          {steps.map((step, index) => (
            <HoverVisibleContainer
              key={index}
              autoHideDelay={2500}
              initialVisibility={false}
              showIndicator={false}
            >
              <div className="relative">
                <div className="relative bg-navy-800/80 p-6 md:p-8 rounded-xl border border-navy-700 
                              hover:border-gold hover:shadow-gold/20 transition-all duration-300 hover:scale-105 h-full">
                  <div className="text-center mb-6">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-navy-700 rounded-full mb-4">
                      {step.icon}
                    </div>
                    <div className="text-gold font-bold text-lg mb-2">Step {index + 1}</div>
                    <h3 className="text-xl font-semibold text-white mb-3">{step.title}</h3>
                  </div>
                  
                  <p className="text-gray-300 mb-4 leading-relaxed text-center">{step.description}</p>
                  
                  <ul className="space-y-2">
                    {step.details.map((detail, idx) => (
                      <li key={idx} className="text-sm text-gray-300 flex items-center">
                        <span className="w-1.5 h-1.5 bg-gold rounded-full mr-3 flex-shrink-0"></span>
                        {detail}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </HoverVisibleContainer>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
