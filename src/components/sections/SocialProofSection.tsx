
import React from 'react';
import { Star, Users, Clock, TrendingUp } from 'lucide-react';

const SocialProofSection: React.FC = () => {
  const stats = [
    {
      icon: <Users className="h-8 w-8 text-gold" />,
      number: "500+",
      label: "Businesses Automated",
      description: "Companies trust our AI solutions"
    },
    {
      icon: <Clock className="h-8 w-8 text-gold" />,
      number: "10,000+",
      label: "Hours Saved Monthly",
      description: "Collective time savings across clients"
    },
    {
      icon: <TrendingUp className="h-8 w-8 text-gold" />,
      number: "60%",
      label: "Average Cost Reduction",
      description: "Operational cost savings achieved"
    },
    {
      icon: <Star className="h-8 w-8 text-gold" />,
      number: "98%",
      label: "Client Satisfaction",
      description: "Based on post-implementation surveys"
    }
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      company: "TechStart Solutions",
      role: "CEO",
      content: "The AI automation solution transformed our customer service. We now handle 5x more inquiries with the same team size.",
      rating: 5
    },
    {
      name: "Michael Chen",
      company: "Global Logistics Corp",
      role: "Operations Director",
      content: "Implementation was seamless and the ROI was evident within the first month. Our processes are now 70% more efficient.",
      rating: 5
    },
    {
      name: "Emily Rodriguez",
      company: "Boutique Hotels Group",
      role: "General Manager",
      content: "The AI concierge has elevated our guest experience while reducing our operational overhead significantly.",
      rating: 5
    }
  ];

  return (
    <section className="py-20 bg-navy-800/20 backdrop-blur-sm">
      <div className="container mx-auto px-4">
        {/* Stats Section */}
        <div className="text-center mb-20">
          <h2 className="text-4xl font-bold text-white mb-6">Proven Results</h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-12">
            Our AI automation solutions have delivered measurable impact across hundreds of businesses worldwide.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="bg-navy-800/50 backdrop-blur-sm p-6 rounded-lg border border-navy-700 text-center">
                <div className="flex justify-center mb-4">
                  {stat.icon}
                </div>
                <div className="text-3xl font-bold text-gold mb-2">{stat.number}</div>
                <div className="text-lg font-semibold text-white mb-2">{stat.label}</div>
                <div className="text-sm text-gray-300">{stat.description}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Testimonials Section */}
        <div className="text-center mb-12">
          <h3 className="text-3xl font-bold text-white mb-6">What Our Clients Say</h3>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Real feedback from businesses that have transformed their operations with our AI solutions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-navy-800/80 backdrop-blur-md p-6 rounded-xl border border-navy-700">
              <div className="flex mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-gold fill-current" />
                ))}
              </div>
              <p className="text-gray-300 mb-6 leading-relaxed italic">"{testimonial.content}"</p>
              <div className="border-t border-navy-700 pt-4">
                <div className="font-semibold text-white">{testimonial.name}</div>
                <div className="text-gold text-sm">{testimonial.role}</div>
                <div className="text-gray-400 text-sm">{testimonial.company}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SocialProofSection;
