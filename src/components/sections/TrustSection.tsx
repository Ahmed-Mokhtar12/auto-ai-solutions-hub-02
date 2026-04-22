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
    <section className="py-10 md:py-16 dark:bg-navy-800/30">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-center gap-3 md:gap-8">
          {trustBadges.map((badge, i) => (
            <div
              key={i}
              className="flex items-center gap-2 dark:bg-navy-800/60 dark:border-navy-700 bg-white/20 border-white/40 backdrop-blur-sm border px-4 py-2.5 rounded-full"
            >
              <span className="text-gold gold-outline">{badge.icon}</span>
              <span className="text-sm font-medium text-foreground/90 dark:text-foreground/80 day-readable">{badge.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustSection;
