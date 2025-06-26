
import React from 'react';
import { Link } from 'react-router-dom';

interface FloatingServiceBoxProps {
  title: string;
  description: string;
  route: string;
  delay?: number;
}

const FloatingServiceBox: React.FC<FloatingServiceBoxProps> = ({
  title,
  description,
  route,
  delay = 0
}) => {
  return (
    <Link to={route}>
      <div 
        className={`bg-navy-800/90 backdrop-blur-md p-6 rounded-xl shadow-2xl border border-navy-700 
                   hover:border-gold hover:shadow-gold/20 transition-all duration-300 
                   hover:scale-105 cursor-pointer animate-fade-in w-80 h-40 flex flex-col justify-center`}
        style={{ animationDelay: `${delay}ms` }}
      >
        <h3 className="text-xl font-semibold text-gold mb-3 text-center">
          {title}
        </h3>
        <p className="text-white text-sm text-center opacity-90 leading-relaxed">
          {description}
        </p>
      </div>
    </Link>
  );
};

export default FloatingServiceBox;
