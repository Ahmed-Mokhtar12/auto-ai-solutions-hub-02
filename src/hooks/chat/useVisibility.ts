import { useState, useEffect, useCallback } from 'react';
import { AUTO_HIDE_DELAY } from './constants';

/**
 * Hook for managing chat visibility states
 */
export const useVisibility = () => {
  const [isChatVisible, setIsChatVisible] = useState(false);
  const [messageJustSent, setMessageJustSent] = useState(false);
  const [hideTimeout, setHideTimeout] = useState<NodeJS.Timeout | null>(null);
  const [isChatHistoryVisible, setIsChatHistoryVisible] = useState(false);
  const [historyHideTimeout, setHistoryHideTimeout] = useState<NodeJS.Timeout | null>(null);
  const [isUserInteracting, setIsUserInteracting] = useState(false);
  
  // Clear all active timeouts
  const clearAllTimeouts = useCallback(() => {
    if (hideTimeout) {
      clearTimeout(hideTimeout);
      setHideTimeout(null);
    }
    
    if (historyHideTimeout) {
      clearTimeout(historyHideTimeout);
      setHistoryHideTimeout(null);
    }
  }, [hideTimeout, historyHideTimeout]);
  
  // Handle chat visibility when a message is sent
  useEffect(() => {
    if (messageJustSent) {
      setIsChatVisible(true);
      setIsChatHistoryVisible(true); // Show history when message is sent
      setIsUserInteracting(true);
      
      const timer = setTimeout(() => {
        setMessageJustSent(false);
      }, AUTO_HIDE_DELAY);
      
      return () => clearTimeout(timer);
    }
  }, [messageJustSent]);

  // Effect to manage visibility based on user interaction
  useEffect(() => {
    if (isUserInteracting) {
      // When user is interacting, keep chat visible and clear any hide timeouts
      setIsChatVisible(true);
      setIsChatHistoryVisible(true);
      clearAllTimeouts();
    }
  }, [isUserInteracting, clearAllTimeouts]);

  // Clean up timeout on unmount
  useEffect(() => {
    return clearAllTimeouts;
  }, [clearAllTimeouts]);

  const handleVisibility = useCallback(() => {
    const handleMouseEnter = () => {
      // Show both chat bar and history when user interacts
      setIsChatVisible(true);
      setIsChatHistoryVisible(true);
      setIsUserInteracting(true);
      clearAllTimeouts();
    };
    
    const handleMouseLeave = () => {
      setIsUserInteracting(false);
      
      // Set a timeout to hide chat after delay
      const timeout = setTimeout(() => {
        setIsChatVisible(false);
      }, AUTO_HIDE_DELAY);
      
      // Set a timeout to hide chat history after delay
      const historyTimeout = setTimeout(() => {
        setIsChatHistoryVisible(false);
      }, AUTO_HIDE_DELAY);
      
      setHideTimeout(timeout);
      setHistoryHideTimeout(historyTimeout);
    };

    return { handleMouseEnter, handleMouseLeave };
  }, [clearAllTimeouts]);

  return {
    isChatVisible,
    setIsChatVisible,
    messageJustSent,
    setMessageJustSent,
    isChatHistoryVisible,
    setIsChatHistoryVisible,
    isUserInteracting,
    setIsUserInteracting,
    handleVisibility
  };
};
