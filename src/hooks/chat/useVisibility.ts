
import { useState, useEffect } from 'react';
import { AUTO_HIDE_DELAY } from './constants';

/**
 * Hook for managing chat visibility states
 */
export const useVisibility = () => {
  const [isChatVisible, setIsChatVisible] = useState(false);
  const [messageJustSent, setMessageJustSent] = useState(false);
  const [hideTimeout, setHideTimeout] = useState<NodeJS.Timeout | null>(null);

  // Handle chat visibility when a message is sent
  useEffect(() => {
    if (messageJustSent) {
      setIsChatVisible(true);
      const timer = setTimeout(() => {
        setMessageJustSent(false);
      }, AUTO_HIDE_DELAY);
      
      return () => clearTimeout(timer);
    }
  }, [messageJustSent]);

  // Clean up timeout on unmount
  useEffect(() => {
    return () => {
      if (hideTimeout) {
        clearTimeout(hideTimeout);
      }
    };
  }, [hideTimeout]);

  const handleVisibility = () => {
    const handleMouseEnter = () => {
      setIsChatVisible(true);
      
      // Clear any existing timeout
      if (hideTimeout) {
        clearTimeout(hideTimeout);
        setHideTimeout(null);
      }
    };
    
    const handleMouseLeave = () => {
      // Set a timeout to hide chat after delay
      const timeout = setTimeout(() => {
        setIsChatVisible(false);
      }, AUTO_HIDE_DELAY);
      
      setHideTimeout(timeout);
    };

    return { handleMouseEnter, handleMouseLeave };
  };

  return {
    isChatVisible,
    setIsChatVisible,
    messageJustSent,
    setMessageJustSent,
    handleVisibility
  };
};
