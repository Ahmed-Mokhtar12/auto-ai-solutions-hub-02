import React from 'react';
import { Hotel, Factory, Landmark, ShoppingBag, HeartPulse, Truck, Star } from 'lucide-react';

const industries = [
  {
    icon: <Hotel className="h-8 w-8 text-gold" />,
    title: "Hospitality",
    description: "Our core expertise. AI-powered guest experiences, concierge automation, and operational intelligence for hotels and resorts.",
    useCases: ["Smart Concierge", "Revenue Optimization", "Guest Personalization"],
    featured: true,
  },
  {
    icon: <Factory className="h-8 w-8 text-gold" />,
    title: "Manufacturing",
    description: "Predictive maintenance, quality control automation, and supply chain optimization powered by AI.",
    useCases: ["Predictive Maintenance", "Quality Assurance", "Supply Chain AI"],
    featured: false,
  },
  {
    icon: <Landmark className="h-8 w-8 text-gold" />,
    title: "Finance",
    description: "Intelligent document processing, fraud detection, and automated compliance workflows.",
    useCases: ["Document Processing", "Risk Analysis", "Compliance Automation"],
    featured: false,
  },
  {
    icon: <ShoppingBag className="h-8 w-8 text-gold" />,
    title: "Retail",
    description: "Personalized customer journeys, inventory intelligence, and omnichannel automation.",
    useCases: ["Customer Analytics", "Inventory AI", "Omnichannel Bots"],
    featured: false,
  },
  {
    icon: <HeartPulse className="h-8 w-8 text-gold" />,
    title: "Healthcare",
    description: "Patient engagement automation, scheduling optimization, and clinical workflow support.",
    useCases: ["Patient Engagement", "Scheduling AI", "Workflow Automation"],
    featured: false,
  },
  {
    icon: <Truck className="h-8 w-8 text-gold" />,
    title: "Logistics",
    description: "Route optimization, warehouse automation, and real-time tracking intelligence.",
    useCases: ["Route Optimization", "Warehouse AI", "Tracking Systems"],
    featured: false,
  },
];

const IndustrySolutions: React.FC = () => {
  return (
    <section className="py-20 bg-navy-800/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Industry <span className="text-gold">Solutions</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Deep hospitality expertise. Proven methodology adaptable to any enterprise vertical.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {industries.map((industry, index) => (
            <div
              key={index}
              className={`relative p-6 rounded-lg border transition-all duration-300 h-full animate-fade-in ${
                industry.featured
                  ? 'bg-navy-800/80 border-gold/40 shadow-lg shadow-gold/5'
                  : 'bg-navy-800/50 border-navy-700 hover:border-gold/20'
              }`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {industry.featured && (
                <div className="absolute -top-3 left-4 flex items-center gap-1 bg-gold text-navy-900 text-xs font-bold px-3 py-1 rounded-full">
                  <Star className="h-3 w-3" /> Core Expertise
                </div>
              )}

              <div className="flex items-center gap-3 mb-4 mt-1">
                {industry.icon}
                <h3 className="text-xl font-bold text-foreground">{industry.title}</h3>
              </div>

              <p className="text-muted-foreground text-sm mb-4">{industry.description}</p>

              <div className="flex flex-wrap gap-2">
                {industry.useCases.map((uc, i) => (
                  <span
                    key={i}
                    className="text-xs bg-navy-700/80 text-gold/90 px-2.5 py-1 rounded-full border border-navy-700"
                  >
                    {uc}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default IndustrySolutions;
