import { useState, useEffect, useRef } from 'react';
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
  
  // Handle chat visibility when a message is sent
  useEffect(() => {
    if (messageJustSent) {
      setIsChatVisible(true);
      setIsChatHistoryVisible(true); // Show history when message is sent
      
      const timer = setTimeout(() => {
        setMessageJustSent(false);
      }, AUTO_HIDE_DELAY);
      
      return () => clearTimeout(timer);
    }
  }, [messageJustSent]);

  // Keep chat visible during user interaction
  useEffect(() => {
    if (isUserInteracting) {
      // Clear any existing timeouts when user is interacting
      if (hideTimeout) {
        clearTimeout(hideTimeout);
        setHideTimeout(null);
      }
      
      if (historyHideTimeout) {
        clearTimeout(historyHideTimeout);
        setHistoryHideTimeout(null);
      }
      
      // Make sure chat is visible during interaction
      setIsChatVisible(true);
      setIsChatHistoryVisible(true);
    }
  }, [isUserInteracting, hideTimeout, historyHideTimeout]);

  // Clean up timeout on unmount
  useEffect(() => {
    return () => {
      if (hideTimeout) {
        clearTimeout(hideTimeout);
      }
      if (historyHideTimeout) {
        clearTimeout(historyHideTimeout);
      }
    };
  }, [hideTimeout, historyHideTimeout]);

  const handleVisibility = () => {
    const handleMouseEnter = () => {
      // Show both chat bar and history when user interacts
      setIsChatVisible(true);
      setIsChatHistoryVisible(true);
      setIsUserInteracting(true);
      
      // Clear any existing timeouts
      if (hideTimeout) {
        clearTimeout(hideTimeout);
        setHideTimeout(null);
      }
      
      if (historyHideTimeout) {
        clearTimeout(historyHideTimeout);
        setHistoryHideTimeout(null);
      }
    };
    
    const handleMouseLeave = () => {
      // User is no longer interacting
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
  };

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
