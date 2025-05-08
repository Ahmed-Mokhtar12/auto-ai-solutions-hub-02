
import { useState, useCallback } from 'react';

interface UseElementVisibilityOptions {
  autoHideDelay?: number;
  initialVisibility?: boolean;
}

/**
 * Custom hook for managing element visibility based on hover
 */
export const useElementVisibility = (options: UseElementVisibilityOptions = {}) => {
  const { 
    autoHideDelay = 2000,
    initialVisibility = false 
  } = options;
  
  const [isVisible, setIsVisible] = useState(initialVisibility);
  const [hideTimeout, setHideTimeout] = useState<NodeJS.Timeout | null>(null);
  
  // Handler for showing the element
  const handleMouseEnter = useCallback(() => {
    setIsVisible(true);
    
    // Clear any existing hide timeout
    if (hideTimeout) {
      clearTimeout(hideTimeout);
      setHideTimeout(null);
    }
  }, [hideTimeout]);
  
  // Handler for hiding the element after delay
  const handleMouseLeave = useCallback(() => {
    const timeout = setTimeout(() => {
      setIsVisible(false);
    }, autoHideDelay);
    
    setHideTimeout(timeout);
    
    return () => {
      if (timeout) {
        clearTimeout(timeout);
      }
    };
  }, [autoHideDelay]);
  
  // Clean up on unmount
  const cleanup = useCallback(() => {
    if (hideTimeout) {
      clearTimeout(hideTimeout);
    }
  }, [hideTimeout]);

  return {
    isVisible,
    setIsVisible,
    handleMouseEnter,
    handleMouseLeave,
    cleanup
  };
};
