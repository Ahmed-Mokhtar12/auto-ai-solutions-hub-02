
import { useState, useEffect } from 'react';
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
      setIsChatVisible(true);
      setIsChatHistoryVisible(true); // Show history on mouse enter
      
      // Clear any existing timeout
      if (hideTimeout) {
        clearTimeout(hideTimeout);
        setHideTimeout(null);
      }
      
      // Clear history hide timeout as well
      if (historyHideTimeout) {
        clearTimeout(historyHideTimeout);
        setHistoryHideTimeout(null);
      }
    };
    
    const handleMouseLeave = () => {
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
    handleVisibility
  };
};
