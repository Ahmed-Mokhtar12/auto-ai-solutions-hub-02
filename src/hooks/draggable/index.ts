
import { useRef } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import { UseDraggableOptions } from './types';
import { useAutoHide } from './useAutoHide';
import { useDrag } from './useDrag';

export const useDraggable = (options: UseDraggableOptions = {}) => {
  const isMobile = useIsMobile();
  
  // Default position: horizontally centered, above footer
  const defaultPosition = { 
    x: typeof window !== 'undefined' ? (window.innerWidth / 2) - (isMobile ? 175 : 200) : 20, // Adjust for wider bar
    y: typeof window !== 'undefined' ? window.innerHeight * 0.9 - 66 : 400 // 16px above top of 10vh footer
  };
  
  const { initialPosition = defaultPosition, autoHideOnScroll = true } = options;
  
  const elementRef = useRef<HTMLDivElement | null>(null);
  const elementSize = { width: isMobile ? 350 : 440, height: 68 }; // Match component dimensions
  
  // Use the extracted hooks
  const isVisible = useAutoHide(autoHideOnScroll);
  const { position, isDragging, handleMouseDown } = useDrag(initialPosition, elementSize);

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
