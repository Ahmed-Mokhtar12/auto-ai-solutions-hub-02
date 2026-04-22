
import React from 'react';
import { Star, Clock, TrendingUp, Zap } from 'lucide-react';
import HoverVisibleContainer from '@/components/HoverVisibleContainer';

const SocialProofSection: React.FC = () => {
  const stats = [
    {
      icon: <Zap className="h-8 w-8 text-gold" />,
      number: "200+",
      label: "AI Workflows Deployed",
      description: "Proven automation solutions across hospitality and enterprise"
    },
    {
      icon: <Clock className="h-8 w-8 text-gold" />,
      number: "15,000+",
      label: "Hours Saved Monthly",
      description: "Monthly time savings across all clients"
    },
    {
      icon: <TrendingUp className="h-8 w-8 text-gold" />,
      number: "70%",
      label: "Average Cost Reduction",
      description: "Typical operational cost savings for our clients"
    },
    {
      icon: <Star className="h-8 w-8 text-gold" />,
      number: "99%",
      label: "Client Retention",
      description: "Clients continue using and expanding our services"
    }
  ];

  return (
    <section className="py-12 md:py-20 dark:bg-navy-800/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white day-readable mb-6">Proven Results Across Industries</h2>
          <p className="text-lg md:text-xl text-gray-100 day-readable dark:text-gray-300 max-w-3xl mx-auto">
            From luxury hotels to enterprise operations, our AI solutions deliver measurable impact. 
            We bring deep hospitality expertise and proven methodologies to every industry we serve.
          </p>
        </div>

        {/* Stats Section */}
        <div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
            {stats.map((stat, index) => (
              <HoverVisibleContainer
                key={index}
                autoHideDelay={2500}
                initialVisibility={false}
                showIndicator={false}
              >
                <div className="dark:bg-navy-800/50 dark:border-navy-700 bg-white/15 border-white/30 backdrop-blur-sm border p-6 rounded-lg text-center">
                  <div className="flex justify-center mb-4">
                    {stat.icon}
                  </div>
                  <div className="text-3xl font-bold text-gold mb-2 [-webkit-text-stroke:1px_black] [paint-order:stroke_fill]">{stat.number}</div>
                  <div className="text-lg font-semibold text-white day-readable mb-2">{stat.label}</div>
                  <div className="text-sm text-gray-100 day-readable dark:text-gray-300">{stat.description}</div>
                </div>
              </HoverVisibleContainer>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SocialProofSection;
