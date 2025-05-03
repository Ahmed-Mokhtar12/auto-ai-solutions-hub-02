
import { useState, useEffect } from 'react';
import { ChatMessage, generateMessageId } from '@/utils/messageUtils';

const WEBHOOK_URL = "https://n8n-2seasons-u38985.vm.elestio.app/webhook-test/4d80c078-4949-49af-8c7b-1c9b09e1fe0a";

export const useChatState = () => {
  const [message, setMessage] = useState('');
  const [isChatVisible, setIsChatVisible] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [messageJustSent, setMessageJustSent] = useState(false);
  const [hideTimeout, setHideTimeout] = useState<NodeJS.Timeout | null>(null);
  const [isLoading, setIsLoading] = useState(false);

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
  
  // Handle chat visibility when a message is sent
  useEffect(() => {
    if (messageJustSent) {
      setIsChatVisible(true);
      const timer = setTimeout(() => {
        setMessageJustSent(false);
      }, 5000);
      
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

  const sendMessage = async () => {
    if (!message.trim()) return;
    
    const messageId = generateMessageId();
    
    // Add message to chat
    setMessages(prev => [...prev, { text: message, sender: 'user', id: messageId }]);
    
    // Set message just sent flag to control visibility
    setMessageJustSent(true);
    setIsLoading(true);
    
    try {
      // Send to webhook
      await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        mode: 'no-cors', // Add this to handle CORS
        body: JSON.stringify({ 
          message,
          timestamp: new Date().toISOString(),
          source: window.location.href
        }),
      });
      
      // System message has been removed - no longer adding the confirmation message
      
    } catch (error) {
      console.error('Error sending message:', error);
      // Add error message to chat only if there's an actual error
      setMessages(prev => [...prev, { 
        text: "Failed to send message to automation service", 
        sender: 'system', 
        id: generateMessageId() 
      }]);
    } finally {
      setIsLoading(false);
    }
    
    // Clear input
    setMessage('');
  };

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
      // Set a timeout to hide chat after 5 seconds
      const timeout = setTimeout(() => {
        setIsChatVisible(false);
      }, 5000);
      
      setHideTimeout(timeout);
    };

    return { handleMouseEnter, handleMouseLeave };
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

