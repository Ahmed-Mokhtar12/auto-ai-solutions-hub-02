
import { useRef, useState, useEffect } from 'react';

interface Position {
  x: number;
  y: number;
}

interface UseDraggableOptions {
  initialPosition?: Position;
}

export const useDraggable = (options: UseDraggableOptions = {}) => {
  // Updated default position to be centered horizontally and higher than contact info by ~3cm (113px)
  const defaultPosition = { 
    x: typeof window !== 'undefined' ? window.innerWidth / 2 - 160 : 20, 
    y: typeof window !== 'undefined' ? window.innerHeight - 220 : 400 // Raised by approximately 3cm
  };
  
  const { initialPosition = defaultPosition } = options;
  
  const [position, setPosition] = useState<Position>(initialPosition);
  const [isDragging, setIsDragging] = useState(false);
  const elementRef = useRef<HTMLDivElement | null>(null);
  const offset = useRef<Position>({ x: 0, y: 0 });

  // Keep existing functionality for the draggable element
  const handleMouseDown = (e: React.MouseEvent) => {
    if (elementRef.current) {
      // Prevent default behavior to avoid text selection while dragging
      e.preventDefault();
      setIsDragging(true);
      
      // Calculate the offset between mouse position and element position
      offset.current = {
        x: e.clientX - position.x,
        y: e.clientY - position.y
      };
      
      // Add event listeners for mouse move and mouse up
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (isDragging) {
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

  const handleMouseUp = () => {
    setIsDragging(false);
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
  };

  // Add resize handler to keep ChatBar in view when window is resized
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
    
    // Ensure the chat bar is positioned correctly on mount
    if (elementRef.current) {
      const maxX = window.innerWidth - elementRef.current.offsetWidth;
      setPosition(prev => ({
        ...prev,
        x: Math.min(prev.x, maxX)
      }));
    }
    
    // Clean up event listeners when component unmounts
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return { elementRef, position, isDragging, handleMouseDown };
};
