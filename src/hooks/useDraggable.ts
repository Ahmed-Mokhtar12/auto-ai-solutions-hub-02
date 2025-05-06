import { useState, useEffect, useRef } from 'react';

interface Position {
  x: number;
  y: number;
}

export const useDraggable = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState<Position>({ x: 0, y: 0 });
  const [initialMousePos, setInitialMousePos] = useState<Position>({ x: 0, y: 0 });
  const elementRef = useRef<HTMLDivElement>(null);

  // Initialize position to the middle of the screen, between services section and footer
  useEffect(() => {
    const positionInMiddle = () => {
      if (elementRef.current) {
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;
        const elementWidth = 320; // Default width
        
        // Calculate position to be in the middle horizontally and at about 70% of the screen height
        setPosition({
          x: (viewportWidth - elementWidth) / 2,
          y: Math.floor(viewportHeight * 0.7)
        });
      }
    };
    
    positionInMiddle();
    
    // Also reposition if the window resizes
    window.addEventListener('resize', positionInMiddle);
    
    return () => window.removeEventListener('resize', positionInMiddle);
  }, []);

  // Handle resize events to keep the element inside viewport
  useEffect(() => {
    const handleResize = () => {
      if (elementRef.current) {
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;
        const elementWidth = elementRef.current.offsetWidth;
        const elementHeight = elementRef.current.offsetHeight;
        
        setPosition(prevPos => ({
          x: Math.min(prevPos.x, viewportWidth - elementWidth),
          y: Math.min(prevPos.y, viewportHeight - elementHeight)
        }));
      }
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Handle mouse events for dragging
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setInitialMousePos({ 
      x: e.clientX - position.x, 
      y: e.clientY - position.y 
    });
  };

  // Global mouse move and up handlers
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging && elementRef.current) {
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;
        const elementWidth = elementRef.current.offsetWidth;
        const elementHeight = elementRef.current.offsetHeight;
        
        // Calculate new position
        let newX = e.clientX - initialMousePos.x;
        let newY = e.clientY - initialMousePos.y;
        
        // Constrain to viewport
        newX = Math.max(0, Math.min(newX, viewportWidth - elementWidth));
        newY = Math.max(0, Math.min(newY, viewportHeight - elementHeight));
        
        setPosition({ x: newX, y: newY });
      }
    };
    
    const handleMouseUp = () => {
      setIsDragging(false);
    };
    
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, initialMousePos, position]);

  return {
    elementRef,
    position,
    isDragging,
    handleMouseDown
  };
};
