
import React from 'react';
import { Star, Users, Clock, TrendingUp, Hotel, Coffee } from 'lucide-react';

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

  const testimonials = [
    {
      name: "Marcus Thompson",
      company: "Grand Vista Resort & Spa",
      role: "General Manager",
      content: "The AI concierge has revolutionized our guest experience. Our guests now receive instant, personalized recommendations 24/7, and our staff can focus on high-touch hospitality services. Guest satisfaction scores increased by 85%.",
      rating: 5
    },
    {
      name: "Sofia Martinez",
      company: "Oceanfront Luxury Hotels",
      role: "Director of Operations",
      content: "From room service automation to instant multilingual guest support, this AI solution handles everything seamlessly. We've reduced response times from hours to seconds while maintaining our luxury service standards.",
      rating: 5
    },
    {
      name: "James Chen",
      company: "Metropolitan Business Hotels",
      role: "VP of Guest Services",
      content: "The WhatsApp integration alone has been game-changing. Business travelers can now book amenities, request services, and get local recommendations instantly. Our operational efficiency improved by 60% in just 3 months.",
      rating: 5
    },
    {
      name: "Isabella Rodriguez",
      company: "Boutique Heritage Hotels Group",
      role: "Customer Experience Director",
      content: "What impressed us most was how the AI maintained our brand's personal touch while scaling our guest services. Every interaction feels authentic and personalized, just like our human staff would provide.",
      rating: 5
    },
    {
      name: "David Park",
      company: "Riverside Resort Collection",
      role: "Chief Technology Officer",
      content: "The integration was surprisingly smooth, and the ROI was evident within weeks. Our front desk staff now handles 3x more guests efficiently, and our guests consistently praise the instant service availability.",
      rating: 5
    },
    {
      name: "Anna Kowalski",
      company: "Alpine Mountain Lodges",
      role: "Guest Relations Manager",
      content: "Seasonal guests love the AI's ability to remember their preferences from previous visits. It's like having a personal concierge who never forgets, available in multiple languages 24/7.",
      rating: 5
    }
  ];

  return (
    <section className="py-20 bg-navy-800/20 backdrop-blur-sm">
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
          <div className="bg-gold/10 border border-gold/30 rounded-lg p-4 max-w-2xl mx-auto">
            <p className="text-gold font-semibold">🏨 Hospitality-First Approach</p>
            <p className="text-white text-sm mt-2">
              Unlike generic AI providers, we understand the unique challenges of hospitality operations, 
              guest expectations, and the importance of maintaining luxury service standards.
            </p>
          </div>
        </div>

        {/* Stats Section */}
        <div className="mb-20">
          <h3 className="text-3xl font-bold text-white text-center mb-12">Proven Hospitality Results</h3>
          
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
          <h3 className="text-3xl font-bold text-white mb-6">What Hospitality Leaders Say</h3>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Real feedback from hotels and resorts that have transformed their guest experience with our specialized AI solutions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
