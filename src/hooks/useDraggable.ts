import { useRef, useState, useEffect } from 'react';
import { useIsMobile } from './use-mobile';

interface Position {
  x: number;
  y: number;
}

interface UseDraggableOptions {
  initialPosition?: Position;
}

export const useDraggable = (options: UseDraggableOptions = {}) => {
  const isMobile = useIsMobile();
  
  // Default position: bottom right with some margin
  const defaultPosition = { 
    x: typeof window !== 'undefined' ? window.innerWidth - (isMobile ? 300 : 350) : 20, 
    y: typeof window !== 'undefined' ? window.innerHeight - (isMobile ? 100 : 120) : 400
  };
  
  const { initialPosition = defaultPosition } = options;
  
  const [position, setPosition] = useState<Position>(initialPosition);
  const [isDragging, setIsDragging] = useState(false);
  const elementRef = useRef<HTMLDivElement | null>(null);
  const offset = useRef<Position>({ x: 0, y: 0 });

  const handleMouseDown = (e: React.MouseEvent) => {
    if (elementRef.current) {
      // Prevent default behavior to avoid text selection while dragging
      e.preventDefault();
      e.stopPropagation(); // Stop event propagation to prevent other handlers from interfering
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
      e.preventDefault(); // Prevent text selection or other default behaviors
      
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
    e.preventDefault(); // Prevent any default behavior
    setIsDragging(false);
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
  };

  // Handle touch events for mobile
  useEffect(() => {
    const element = elementRef.current;
    
    const handleTouchStart = (e: TouchEvent) => {
      if (element) {
        e.preventDefault();
        const touch = e.touches[0];
        setIsDragging(true);
        
        offset.current = {
          x: touch.clientX - position.x,
          y: touch.clientY - position.y
        };
        
        document.addEventListener('touchmove', handleTouchMove, { passive: false });
        document.addEventListener('touchend', handleTouchEnd);
      }
    };
    
    const handleTouchMove = (e: TouchEvent) => {
      if (isDragging) {
        e.preventDefault();
        const touch = e.touches[0];
        
        const x = touch.clientX - offset.current.x;
        const y = touch.clientY - offset.current.y;
        
        const maxX = window.innerWidth - (element?.offsetWidth || 0);
        const maxY = window.innerHeight - (element?.offsetHeight || 0);
        
        setPosition({
          x: Math.max(0, Math.min(x, maxX)),
          y: Math.max(0, Math.min(y, maxY))
        });
      }
    };
    
    const handleTouchEnd = () => {
      setIsDragging(false);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
    };
    
    // Add touch event listeners
    if (element) {
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
            setPosition({
              x: window.innerWidth - (isMobile ? 300 : 350),
              y: window.innerHeight - (isMobile ? 100 : 120)
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

  return { elementRef, position, isDragging, handleMouseDown };
};
