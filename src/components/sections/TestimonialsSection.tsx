import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { Button } from '@/components/ui/button';

const testimonials = [
  {
    quote: "Digit Lab transformed our guest experience with AI-powered concierge services. Response times dropped by 80% and guest satisfaction scores reached an all-time high.",
    name: "Sarah Mitchell",
    title: "Director of Operations",
    company: "Luxury Resort Group",
    industry: "Hospitality",
  },
  {
    quote: "Their AI workflow automation cut our invoice processing time from days to minutes. The ROI was visible within the first quarter.",
    name: "James Chen",
    title: "CFO",
    company: "Pacific Manufacturing Co.",
    industry: "Manufacturing",
  },
  {
    quote: "The responsible AI framework gave us confidence to deploy automation at scale. Compliance and transparency were built in from day one.",
    name: "Dr. Amira Hassan",
    title: "Chief Digital Officer",
    company: "MedTech Solutions",
    industry: "Healthcare",
  },
];

const TestimonialsSection: React.FC = () => {
  const [current, setCurrent] = useState(0);

  const next = () => setCurrent((c) => (c + 1) % testimonials.length);
  const prev = () => setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length);

  const t = testimonials[current];

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            What Our <span className="text-gold">Clients</span> Say
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Real results from enterprises that chose Digit Lab as their AI partner.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="bg-navy-800/60 border border-navy-700 rounded-xl p-8 md:p-12 relative">
            <Quote className="h-10 w-10 text-gold/30 absolute top-6 left-6" />

            <div className="text-center">
              <p className="text-lg md:text-xl text-foreground/90 italic leading-relaxed mb-8 pt-4">
                "{t.quote}"
              </p>

              <div className="mb-2">
                <p className="text-foreground font-semibold text-lg">{t.name}</p>
                <p className="text-muted-foreground text-sm">{t.title}, {t.company}</p>
              </div>
              <span className="text-xs bg-gold/10 text-gold px-3 py-1 rounded-full border border-gold/20">
                {t.industry}
              </span>
            </div>
          </div>

          <div className="flex items-center justify-center gap-4 mt-6">
            <Button
              variant="ghost"
              size="icon"
              onClick={prev}
              className="text-muted-foreground hover:text-gold"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>

            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    i === current ? 'w-6 bg-gold' : 'w-2 bg-navy-700'
                  }`}
                />
              ))}
            </div>

            <Button
              variant="ghost"
              size="icon"
              onClick={next}
              className="text-muted-foreground hover:text-gold"
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
