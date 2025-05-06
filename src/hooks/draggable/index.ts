
import { useRef } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import { UseDraggableOptions, Position } from './types';
import { useAutoHide } from './useAutoHide';
import { usePosition } from './usePosition';
import { useDragEvents } from './useDragEvents';

export const useDraggable = (options: UseDraggableOptions = {}) => {
  const isMobile = useIsMobile();
  
  // Default position: horizontally centered, above footer
  const defaultPosition = { 
    x: typeof window !== 'undefined' ? (window.innerWidth / 2) - (isMobile ? 175 : 200) : 20, // Adjust for wider bar
    y: typeof window !== 'undefined' ? window.innerHeight - 120 : 400 // ~120px above footer
  };
  
  const { initialPosition = defaultPosition, autoHideOnScroll = true } = options;
  
  const elementRef = useRef<HTMLDivElement | null>(null);
  
  // Use the extracted hooks
  const isVisible = useAutoHide(autoHideOnScroll);
  const { position, setPosition } = usePosition(elementRef, initialPosition);
  const { isDragging, handleMouseDown } = useDragEvents(elementRef, position, setPosition);

  return { 
    elementRef, 
    position, 
    isDragging, 
    isVisible, 
    handleMouseDown 
  };
};

// Re-export types for convenience
export * from './types';
