import React from 'react';
import { Link } from 'react-router-dom';
import wordmark from '@/assets/digitlab-wordmark.svg';

const Logo: React.FC = () => {
  return (
    <Link to="/" className="flex items-center group" aria-label="DigitLab.ai home">
      <img src={wordmark} alt="DigitLab.ai" className="h-8 w-auto object-contain" />
    </Link>
  );
};

export default Logo;
