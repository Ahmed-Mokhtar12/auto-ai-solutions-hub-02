
import { useState } from 'react';
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
    handleVisibility
  } = useVisibility();
  
  const { isLoading, sendMessage: sendToApi } = useChatApi(
    addUserMessage,
    addSystemMessage,
    removeMessage,
    setMessageJustSent
  );
  
  const sendMessage = async () => {
    if (!message.trim()) return;
    
    await sendToApi(message);
    
    // Clear input
    setMessage('');
  };

  return {
    message,
    setMessage,
    isChatVisible,
    setIsChatVisible,
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
