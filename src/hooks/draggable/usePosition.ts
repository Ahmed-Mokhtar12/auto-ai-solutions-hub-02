import { useState, useEffect } from 'react';
import { Position } from './types';
import { useIsMobile } from '@/hooks/use-mobile';

export const usePosition = (elementRef: React.RefObject<HTMLElement>, initialPosition: Position) => {
  const isMobile = useIsMobile();
  const [position, setPosition] = useState<Position>(initialPosition);

  const centerElement = () => {
    const elWidth = elementRef.current?.offsetWidth || (isMobile ? 350 : 440);
    const x = (window.innerWidth / 2) - (elWidth / 2);
    const y = window.innerHeight - 130;
    setPosition({ x, y });
  };

  // Re-center whenever isMobile changes (e.g. rotating device or resizing window)
  useEffect(() => {
    // Try immediately, then retry after render settles
    centerElement();
    const t1 = setTimeout(centerElement, 100);
    const t2 = setTimeout(centerElement, 400);

    const handleResize = () => centerElement();
    window.addEventListener('resize', handleResize);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      window.removeEventListener('resize', handleResize);
    };
  }, [elementRef, isMobile]);

  return { position, setPosition };
};
