
import React from 'react';
import { Star, Users, Clock, TrendingUp, Hotel, Coffee } from 'lucide-react';
import HoverVisibleContainer from '@/components/HoverVisibleContainer';

const SocialProofSection: React.FC = () => {
  const stats = [
    {
      icon: <Hotel className="h-8 w-8 text-gold" />,
      number: "200+",
      label: "Hotels AI Workflows",
      description: "Ready for Luxury hotels and resorts, trust our AI solutions"
    },
    {
      icon: <Clock className="h-8 w-8 text-gold" />,
      number: "15,000+",
      label: "Guest Hours Saved",
      description: "Monthly time savings across hospitality clients"
    },
    {
      icon: <TrendingUp className="h-8 w-8 text-gold" />,
      number: "70%",
      label: "Guest Satisfaction Increase",
      description: "Average improvement in guest experience scores"
    },
    {
      icon: <Star className="h-8 w-8 text-gold" />,
      number: "99%",
      label: "Hotel Client Retention",
      description: "Hospitality clients continue using our services"
    }
  ];

  return (
    <section className="py-20 bg-navy-800/20">
      <div className="container mx-auto px-4">
        {/* Hospitality Specialization Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Hotel className="h-12 w-12 text-gold mr-3" />
            <Coffee className="h-10 w-10 text-gold" />
          </div>
          <h2 className="text-4xl font-bold text-white mb-6">Hospitality AI Specialists</h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
            We specialize exclusively in hospitality automation, delivering AI solutions tailored for hotels, 
            resorts, and hospitality businesses worldwide. Our expertise in guest experience optimization 
            sets us apart in the industry.
          </p>
          <HoverVisibleContainer
            autoHideDelay={2500}
            initialVisibility={false}
            showIndicator={false}
          >
            <div className="bg-gold/10 border border-gold/30 rounded-lg p-4 max-w-2xl mx-auto">
              <p className="text-gold font-semibold">🏨 Hospitality-First Approach</p>
              <p className="text-white text-sm mt-2">
                Unlike generic AI providers, we understand the unique challenges of hospitality operations, 
                guest expectations, and the importance of maintaining luxury service standards.
              </p>
            </div>
          </HoverVisibleContainer>
        </div>

        {/* Stats Section */}
        <div className="mb-20">
          <h3 className="text-3xl font-bold text-white text-center mb-12">Proven Hospitality Results</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <HoverVisibleContainer
                key={index}
                autoHideDelay={2500}
                initialVisibility={false}
                showIndicator={false}
              >
                <div className="bg-navy-800/50 p-6 rounded-lg border border-navy-700 text-center">
                  <div className="flex justify-center mb-4">
                    {stat.icon}
                  </div>
                  <div className="text-3xl font-bold text-gold mb-2">{stat.number}</div>
                  <div className="text-lg font-semibold text-white mb-2">{stat.label}</div>
                  <div className="text-sm text-gray-300">{stat.description}</div>
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
