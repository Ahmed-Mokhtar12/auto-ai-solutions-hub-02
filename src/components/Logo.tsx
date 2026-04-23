import React from 'react';
import { Link } from 'react-router-dom';
import wordmark from '@/assets/digitlab-wordmark.svg';

const Logo: React.FC = () => (
  <Link to="/" aria-label="DigitLab home" className="inline-flex items-center">
    <img src={wordmark} alt="DigitLab" className="h-8 w-auto" />
  </Link>
);

export default Logo;
