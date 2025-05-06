
import { useState, useEffect, useRef } from 'react';
import { Position } from './types';

export const useDragEvents = (
  elementRef: React.RefObject<HTMLElement>,
  position: Position,
  setPosition: (position: Position) => void
) => {
  const [isDragging, setIsDragging] = useState(false);
  const offset = useRef<Position>({ x: 0, y: 0 });

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
    }
  };

  // Set up mouse event listeners
  useEffect(() => {
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
    };
    
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, elementRef, setPosition]);

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
    };
    
    if (element && isDragging) {
      document.addEventListener('touchmove', handleTouchMove, { passive: false });
      document.addEventListener('touchend', handleTouchEnd);
    }
    
    return () => {
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
    };
  }, [isDragging, elementRef, position, setPosition]);

  // Set up touch start event on the element
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
    };
    
    if (element) {
      // Directly add the touch events to the element for better mobile handling
      element.addEventListener('touchstart', handleTouchStart, { passive: false });
    }
    
    return () => {
      if (element) {
        element.removeEventListener('touchstart', handleTouchStart);
      }
    };
  }, [elementRef, position]);

  return { isDragging, handleMouseDown };
};
