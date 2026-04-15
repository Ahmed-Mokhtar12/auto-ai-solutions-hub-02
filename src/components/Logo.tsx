import React from 'react';
import { Link } from 'react-router-dom';
import faviconSrc from '/favicon.png';

const Logo: React.FC = () => {
  return (
    <Link to="/" className="flex items-center gap-2.5 group">
      <img
        src={faviconSrc}
        alt="DigitLab logo"
        width={36}
        height={36}
        className="transition-transform group-hover:scale-105"
      />
      <div className="flex items-baseline gap-0.5">
        <span className="text-xl font-bold text-gold tracking-tight">Digit</span>
        <span className="text-xl font-bold text-foreground tracking-tight">Lab</span>
        <span className="text-xs text-gold/50 ml-0.5 font-medium">.ai</span>
      </div>
    </Link>
  );
};

export default Logo;
