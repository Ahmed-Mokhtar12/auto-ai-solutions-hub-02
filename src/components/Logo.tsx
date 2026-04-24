import React from 'react';
import { Link } from 'react-router-dom';
import brandLogo from '@/assets/digitlab-brand-logo-clean.png';

const Logo: React.FC = () => (
  <Link to="/" aria-label="DigitLab home" className="inline-flex items-center translate-y-5">
    <img src={brandLogo} alt="DigitLab.ai" className="h-10 w-auto object-contain rounded-none" />
  </Link>
);

export default Logo;
