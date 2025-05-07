
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
        
        // Calculate new position directly from mouse coordinates
        const x = e.clientX - offset.current.x;
        const y = e.clientY - offset.current.y;
        
        // Ensure element stays within window boundaries
        const maxX = window.innerWidth - (elementRef.current?.offsetWidth || 0);
        const maxY = window.innerHeight - (elementRef.current?.offsetHeight || 0);
        
        // Update position immediately without any delays
        setPosition({
          x: Math.max(0, Math.min(x, maxX)),
          y: Math.max(0, Math.min(y, maxY))
        });
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };
    
    if (isDragging) {
      // Add event listeners to the document level for smoother tracking
      document.addEventListener('mousemove', handleMouseMove, { passive: false });
      document.addEventListener('mouseup', handleMouseUp);
    }
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, elementRef, position, setPosition]);

  // Touch event handling for mobile devices
  useEffect(() => {
    const element = elementRef.current;
    
    const handleTouchStart = (e: TouchEvent) => {
      if (!element || e.touches.length !== 1) return;
      
      e.preventDefault();
      setIsDragging(true);
      
      const touch = e.touches[0];
      offset.current = {
        x: touch.clientX - position.x,
        y: touch.clientY - position.y
      };
    };
    
    const handleTouchMove = (e: TouchEvent) => {
      if (!isDragging || e.touches.length !== 1) return;
      
      e.preventDefault();
      
      const touch = e.touches[0];
      
      // Direct calculation from touch position for smoother movement
      const x = touch.clientX - offset.current.x;
      const y = touch.clientY - offset.current.y;
      
      const maxX = window.innerWidth - (element?.offsetWidth || 0);
      const maxY = window.innerHeight - (element?.offsetHeight || 0);
      
      setPosition({
        x: Math.max(0, Math.min(x, maxX)),
        y: Math.max(0, Math.min(y, maxY))
      });
    };
    
    const handleTouchEnd = () => {
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
      setIsDragging(true);
      
      const touch = e.touches[0];
      offset.current = {
        x: touch.clientX - position.x,
        y: touch.clientY - position.y
      };
    };
    
    if (element) {
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
