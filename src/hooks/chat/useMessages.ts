
import { useState, useEffect } from 'react';
import { ChatMessage, generateMessageId } from '@/utils/messageUtils';

/**
 * Hook for managing chat message state and auto-removal
 */
export const useMessages = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  
  // Automatically remove messages after 5 seconds
  useEffect(() => {
    const messageTimers: { [key: string]: NodeJS.Timeout } = {};
    
    messages.forEach(msg => {
      if (!messageTimers[msg.id]) {
        messageTimers[msg.id] = setTimeout(() => {
          setMessages(prev => prev.filter(m => m.id !== msg.id));
        }, 5000);
      }
    });
    
    return () => {
      // Clear all timers on component unmount
      Object.values(messageTimers).forEach(timer => clearTimeout(timer));
    };
  }, [messages]);

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
