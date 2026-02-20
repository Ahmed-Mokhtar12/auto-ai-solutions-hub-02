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
        const elWidth = elementRef.current.offsetWidth;
        const maxY = window.innerHeight - elementRef.current.offsetHeight;
        const newY = window.innerHeight - 120;

        setPosition({
          x: (window.innerWidth / 2) - (elWidth / 2),
          y: Math.min(newY, maxY)
        });
      }
    };
    
    window.addEventListener('resize', handleResize);
    
    // Initial positioning check - make sure the element is visible on first load
    // and positioned above the footer
    const initializePosition = () => {
      setTimeout(() => {
        if (elementRef.current) {
        // Position it centered horizontally, above footer
          const elWidth = elementRef.current.offsetWidth || (isMobile ? 350 : 400);
          setPosition({
            x: (window.innerWidth / 2) - (elWidth / 2),
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
