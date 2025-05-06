
import { useState, useEffect, useRef } from 'react';

export const useAutoHide = (autoHideOnScroll = true) => {
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollPosition = useRef<number>(0);

  useEffect(() => {
    if (!autoHideOnScroll) return;

    const handleScroll = () => {
      const currentScrollPos = window.scrollY;
      
      // Determine if user is scrolling up or down
      if (currentScrollPos > lastScrollPosition.current + 10) {
        // Scrolling down - hide the chat bar
        setIsVisible(false);
      } else if (currentScrollPos < lastScrollPosition.current - 10) {
        // Scrolling up - show the chat bar
        setIsVisible(true);
      }
      
      lastScrollPosition.current = currentScrollPos;
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [autoHideOnScroll]);

  return isVisible;
};
