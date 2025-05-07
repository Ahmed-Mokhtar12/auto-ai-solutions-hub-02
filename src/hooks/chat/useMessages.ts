import { useState, useEffect } from 'react';
import { ChatMessage, generateMessageId } from '@/utils/messageUtils';

/**
 * Hook for managing chat message state with persistent history
 */
export const useMessages = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  
  // We're removing the auto-removal of messages after 5 seconds
  // to keep chat history persistent between interactions
  
  /**
   * Add a user message to the chat
   */
  const addUserMessage = (text: string): string => {
    const messageId = generateMessageId();
    setMessages(prev => [...prev, { text, sender: 'user', id: messageId }]);
    return messageId;
  };

  /**
   * Add a system message to the chat
   */
  const addSystemMessage = (text: string): string => {
    const messageId = generateMessageId();
    setMessages(prev => [...prev, { text, sender: 'system', id: messageId }]);
    return messageId;
  };

  /**
   * Remove a specific message by ID
   */
  const removeMessage = (messageId: string) => {
    setMessages(prev => prev.filter(m => m.id !== messageId));
  };

  return {
    messages,
    setMessages,
    addUserMessage,
    addSystemMessage,
    removeMessage
  };
};
