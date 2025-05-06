
import { useRef, useState, useEffect } from 'react';
import { useIsMobile } from './use-mobile';

interface Position {
  x: number;
  y: number;
}

interface UseDraggableOptions {
  initialPosition?: Position;
  autoHideOnScroll?: boolean;
}

export const useDraggable = (options: UseDraggableOptions = {}) => {
  const isMobile = useIsMobile();
  
  // Default position: horizontally centered, 2cm above footer
  const defaultPosition = { 
    x: typeof window !== 'undefined' ? (window.innerWidth / 2) - (isMobile ? 140 : 160) : 20, 
    y: typeof window !== 'undefined' ? window.innerHeight - 100 : 400 // ~2cm above footer
  };
  
  const { initialPosition = defaultPosition, autoHideOnScroll = true } = options;
  
  const [position, setPosition] = useState<Position>(initialPosition);
  const [isDragging, setIsDragging] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const elementRef = useRef<HTMLDivElement | null>(null);
  const offset = useRef<Position>({ x: 0, y: 0 });
  const lastScrollPosition = useRef<number>(0);

  // Handle mouse events for dragging
  const handleMouseDown = (e: React.MouseEvent) => {
    if (elementRef.current) {
      // Always prevent default and stop propagation
      e.preventDefault();
      e.stopPropagation();
      
      setIsDragging(true);
      
      // Calculate the offset between mouse position and element position
      offset.current = {
        x: e.clientX - position.x,
        y: e.clientY - position.y
      };
      
      // Add event listeners for mouse move and mouse up to document level
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (isDragging) {
      e.preventDefault();
      e.stopPropagation();
      
      // Calculate new position
      const x = e.clientX - offset.current.x;
      const y = e.clientY - offset.current.y;
      
      // Ensure element stays within window boundaries
      const maxX = window.innerWidth - (elementRef.current?.offsetWidth || 0);
      const maxY = window.innerHeight - (elementRef.current?.offsetHeight || 0);
      
      setPosition({
        x: Math.max(0, Math.min(x, maxX)),
        y: Math.max(0, Math.min(y, maxY))
      });
    }
  };

  const handleMouseUp = (e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
  };

  // Handle scroll events for auto-hide functionality
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

  // Handle touch events for mobile
  useEffect(() => {
    const element = elementRef.current;
    
    const handleTouchStart = (e: TouchEvent) => {
      if (!element || e.touches.length !== 1) return;
      
      e.preventDefault();
      e.stopPropagation();
      
      const touch = e.touches[0];
      setIsDragging(true);
      
      offset.current = {
        x: touch.clientX - position.x,
        y: touch.clientY - position.y
      };
      
      document.addEventListener('touchmove', handleTouchMove, { passive: false });
      document.addEventListener('touchend', handleTouchEnd);
    };
    
    const handleTouchMove = (e: TouchEvent) => {
      if (!isDragging || e.touches.length !== 1) return;
      
      e.preventDefault();
      e.stopPropagation();
      
      const touch = e.touches[0];
      
      const x = touch.clientX - offset.current.x;
      const y = touch.clientY - offset.current.y;
      
      const maxX = window.innerWidth - (element?.offsetWidth || 0);
      const maxY = window.innerHeight - (element?.offsetHeight || 0);
      
      setPosition({
        x: Math.max(0, Math.min(x, maxX)),
        y: Math.max(0, Math.min(y, maxY))
      });
    };
    
    const handleTouchEnd = (e: TouchEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(false);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
    };
    
    if (element) {
      // Directly add the touch events to the element for better mobile handling
      element.addEventListener('touchstart', handleTouchStart, { passive: false });
    }
    
    // Add resize handler to keep the chat bar in view when window is resized
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
    
    // Initial positioning check - make sure the bar is visible on first load
    const initializePosition = () => {
      setTimeout(() => {
        if (elementRef.current) {
          const rect = elementRef.current.getBoundingClientRect();
          
          // If the chat bar is outside the viewport, reposition it
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
    
    // Clean up event listeners when component unmounts
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('resize', handleResize);
      if (element) {
        element.removeEventListener('touchstart', handleTouchStart);
      }
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
    };
  }, [isDragging, position, isMobile]);

  return { elementRef, position, isDragging, isVisible, handleMouseDown };
};
