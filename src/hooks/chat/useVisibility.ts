import { useState, useEffect, useCallback } from 'react';
import { AUTO_HIDE_DELAY } from './constants';

/**
 * Hook for managing chat visibility states
 */
export const useVisibility = () => {
  // Initialize isChatVisible to true so the chat bar is always visible
  const [isChatVisible, setIsChatVisible] = useState(true);
  const [messageJustSent, setMessageJustSent] = useState(false);
  const [hideTimeout, setHideTimeout] = useState<NodeJS.Timeout | null>(null);
  // Initialize isChatHistoryVisible to true to show chat history by default
  const [isChatHistoryVisible, setIsChatHistoryVisible] = useState(true);
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
      
      // Reset the messageJustSent flag after a delay but keep everything visible
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
      
      // Always keep the chat bar visible, never hide it
      // We only set a timeout to hide chat history after delay
      const historyTimeout = setTimeout(() => {
        setIsChatHistoryVisible(false);
      }, AUTO_HIDE_DELAY * 3); // Triple the delay for better user experience
      
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
