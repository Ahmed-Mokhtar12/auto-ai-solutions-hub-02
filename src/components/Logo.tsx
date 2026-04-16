import React from 'react';
import { Link } from 'react-router-dom';


const Logo: React.FC = () => {
  return (
    <Link to="/" className="flex items-center gap-2.5 group">
      <div className="flex items-baseline gap-0.5">
        <span className="text-xl font-bold text-gold tracking-tight">Digit</span>
        <span className="text-xl font-bold text-foreground tracking-tight">Lab</span>
        <span className="text-xs text-gold/50 ml-0.5 font-medium">.ai</span>
      </div>
    </Link>
  );
};

export default Logo;
