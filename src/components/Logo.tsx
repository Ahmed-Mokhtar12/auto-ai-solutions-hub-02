import React from 'react';
import { Link } from 'react-router-dom';
import brandLogo from '@/assets/digitlab-brand-logo.png';

const Logo: React.FC = () => (
  <Link to="/" aria-label="DigitLab home" className="inline-flex items-center">
    <img src={brandLogo} alt="DigitLab.ai" className="h-10 w-auto object-contain" />
  </Link>
);

export default Logo;
