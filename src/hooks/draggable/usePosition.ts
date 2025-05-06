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
        
        setPosition(prev => ({
          x: Math.max(0, Math.min(prev.x, maxX)),
          y: Math.max(0, Math.min(prev.y, maxY))
        }));
      }
    };
    
    window.addEventListener('resize', handleResize);
    
    // Initial positioning check - make sure the element is visible on first load
    const initializePosition = () => {
      setTimeout(() => {
        if (elementRef.current) {
          const rect = elementRef.current.getBoundingClientRect();
          
          // If the element is outside the viewport, reposition it
          if (rect.left < 0 || rect.top < 0 || 
              rect.right > window.innerWidth || rect.bottom > window.innerHeight) {
            
            // Position it centered horizontally, 2cm above footer
            setPosition({
              x: (window.innerWidth / 2) - (isMobile ? 140 : 160),
              y: window.innerHeight - 100 // ~2cm above footer
            });
          }
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
