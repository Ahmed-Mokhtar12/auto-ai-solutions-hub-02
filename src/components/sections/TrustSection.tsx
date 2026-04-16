import React from 'react';
import { Shield, Lock, Eye, Award } from 'lucide-react';

const trustBadges = [
  { icon: <Shield className="h-5 w-5" />, label: "SOC 2 Ready" },
  { icon: <Lock className="h-5 w-5" />, label: "GDPR Compliant" },
  { icon: <Eye className="h-5 w-5" />, label: "Transparent AI" },
  { icon: <Award className="h-5 w-5" />, label: "Enterprise Grade" },
];

const TrustSection: React.FC = () => {
  return (
    <section className="py-10 md:py-16 bg-navy-800/30">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-center gap-3 md:gap-8">
          {trustBadges.map((badge, i) => (
            <div
              key={i}
              className="flex items-center gap-2 bg-navy-800/60 border border-navy-700 px-4 py-2.5 rounded-full"
            >
              <span className="text-gold">{badge.icon}</span>
              <span className="text-sm font-medium text-foreground/80">{badge.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustSection;
