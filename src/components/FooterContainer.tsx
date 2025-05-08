
import React, { useEffect, useState } from 'react';
import Footer from '@/components/Footer';

const FooterContainer: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [initialLoad, setInitialLoad] = useState(true);
  
  // On initial load, show footer, then hide after delay
  useEffect(() => {
    if (initialLoad) {
      setIsExpanded(true);
      
      const timeout = setTimeout(() => {
        setIsExpanded(false);
        setInitialLoad(false);
      }, 3000);
      
      return () => clearTimeout(timeout);
    }
  }, [initialLoad]);
  
  return (
    <div 
      className="relative z-10 transition-opacity duration-300"
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
    >
      {!isExpanded && (
        <div className="h-2 bg-navy-800 opacity-30 absolute bottom-0 left-0 w-full">
          {/* Subtle indicator that footer can be expanded */}
        </div>
      )}
      
      <div className={`transition-all duration-300 ${isExpanded ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        <Footer />
      </div>
    </div>
  );
};

export default FooterContainer;
