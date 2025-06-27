
import { useState } from 'react';
import { validateChatMessage, sanitizeApiResponse } from '@/utils/inputSanitizer';

interface ChatApiHook {
  sendChatMessage: (message: string) => Promise<string>;
  isLoading: boolean;
  error: string | null;
}

export const useChatApi = (): ChatApiHook => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const sendChatMessage = async (message: string): Promise<string> => {
    // Validate input before sending
    const validation = validateChatMessage(message);
    if (!validation.isValid) {
      throw new Error(validation.error || 'Invalid message');
    }

    setIsLoading(true);
    setError(null);

    try {
      // Note: This is a placeholder for actual API integration
      // In production, you should replace this with your actual N8N webhook
      // and implement proper rate limiting and authentication
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          message: message.trim(),
          timestamp: new Date().toISOString()
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to send message');
      }

      const data = await response.json();
      
      // Sanitize the response before returning
      const sanitizedResponse = sanitizeApiResponse(data);
      
      return sanitizedResponse.reply || 'Sorry, I could not process your request at the moment.';
    } catch (err: any) {
      const errorMessage = 'Unable to connect to chat service. Please try again later.';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    sendChatMessage,
    isLoading,
    error
  };
};
