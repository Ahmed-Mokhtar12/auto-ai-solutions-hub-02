
import React from 'react';
import { Button } from '@/components/ui/button';

interface SolutionOption {
  icon: React.ReactNode;
  title: string;
}

interface SolutionCardProps {
  title: string;
  options: SolutionOption[];
  description?: string;
  buttonText: string;
  buttonAction: () => void;
}

const SolutionCard: React.FC<SolutionCardProps> = ({
  title,
  options,
  description,
  buttonText,
  buttonAction,
}) => {
  return (
    <div className="solution-card animate-fade-in">
      <h2 className="text-xl md:text-2xl font-bold text-white mb-6">{title}</h2>
      
      {options.map((option, index) => (
        <div key={index} className="solution-option mb-4">
          <div className="flex items-center justify-center bg-navy-700 h-10 w-10 rounded-full">
            {option.icon}
          </div>
          <span className="text-white">{option.title}</span>
        </div>
      ))}
      
      {description && (
        <div className="mt-6 mb-6 text-gray-400">
          <p>{description}</p>
        </div>
      )}
      
      <div className="mt-6">
        <Button 
          onClick={buttonAction}
          className="gold-btn"
        >
          {buttonText}
        </Button>
      </div>
    </div>
  );
};

export default SolutionCard;
