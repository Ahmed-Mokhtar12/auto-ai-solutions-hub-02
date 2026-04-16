import React from 'react';
import { Link } from 'react-router-dom';
import logoV3 from '@/assets/digitlab-logo-v3.png';

const Logo: React.FC = () => {
  return (
    <Link to="/" className="flex items-center group">
      <img src={logoV3} alt="DigitLab.ai" width={32} height={32} className="object-contain" />
    </Link>
  );
};

export default Logo;
