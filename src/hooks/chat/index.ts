
import { useState, useCallback } from 'react';
import { useMessages } from './useMessages';
import { useVisibility } from './useVisibility';
import { useChatApi } from './useChatApi';

/**
 * Main hook for managing chat state and functionality
 */
export const useChatState = () => {
  const [message, setMessage] = useState('');
  
  const {
    messages,
    addUserMessage,
    addSystemMessage,
    removeMessage
  } = useMessages();
  
  const {
    isChatVisible,
    setIsChatVisible,
    messageJustSent,
    setMessageJustSent,
    isChatHistoryVisible,
    setIsChatHistoryVisible,
    isUserInteracting,
    setIsUserInteracting,
    handleVisibility
  } = useVisibility();
  
  const { isLoading, sendChatMessage, error } = useChatApi();
  
  const sendMessage = useCallback(async () => {
    if (!message.trim()) return;
    
    try {
      // Add user message first
      addUserMessage(message);
      setMessageJustSent(true);
      
      // Send to API and get response
      const response = await sendChatMessage(message);
      
      // Add system response
      addSystemMessage(response.text);
    } catch (error) {
      // Remove user message if API call failed
      console.error('Failed to send message:', error);
      // Add error message to chat
      addSystemMessage('Sorry, I encountered an error. Please try again.');
    }
    
    // Clear input
    setMessage('');
  }, [message, sendChatMessage, addUserMessage, addSystemMessage, setMessageJustSent]);

  return {
    message,
    setMessage,
    isChatVisible,
    setIsChatVisible,
    isChatHistoryVisible,
    setIsChatHistoryVisible,
    isUserInteracting,
    setIsUserInteracting,
    messages,
    isLoading,
    messageJustSent,
    sendMessage,
    handleVisibility
  };
};

// Re-export all chat hooks for convenience
export * from './useMessages';
export * from './useVisibility';
export * from './useChatApi';
export * from './constants';
