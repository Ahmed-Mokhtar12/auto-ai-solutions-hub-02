import { useState, useEffect } from 'react';
import { Position } from './types';
import { useIsMobile } from '@/hooks/use-mobile';

export const usePosition = (elementRef: React.RefObject<HTMLElement>, initialPosition: Position) => {
  const isMobile = useIsMobile();
  const [position, setPosition] = useState<Position>(initialPosition);
  
  // Add resize handler to keep the element in view when window is resized
  useEffect(() => {
    const handleResize = () => {
      if (elementRef.current) {
        const maxX = window.innerWidth - elementRef.current.offsetWidth;
        const maxY = window.innerHeight - elementRef.current.offsetHeight;
        
        // Position chat bar above the footer
        const newY = window.innerHeight - 120; // Position 120px from bottom, above footer
        
        setPosition(prev => ({
          x: Math.max(0, Math.min(prev.x, maxX)),
          y: Math.min(newY, maxY)
        }));
      }
    };
    
    window.addEventListener('resize', handleResize);
    
    // Initial positioning check - make sure the element is visible on first load
    // and positioned above the footer
    const initializePosition = () => {
      setTimeout(() => {
        if (elementRef.current) {
          // Position it centered horizontally, above footer
          setPosition({
            x: (window.innerWidth / 2) - (isMobile ? 175 : 200), // Adjust for wider bar
            y: window.innerHeight - 120 // ~120px above footer
          });
        }
      }, 100);
    };
    
    initializePosition();
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [elementRef, isMobile]);

  return { position, setPosition };
};
