
import { useState } from 'react';
import { validateChatMessage } from '@/utils/inputSanitizer';
import { WEBHOOK_URL } from './constants';

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
      const response = await fetch(WEBHOOK_URL, {
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
        throw new Error(`Webhook responded with status ${response.status}`);
      }

      // Guard against non-JSON responses (e.g. HTML error pages)
      const contentType = response.headers.get('content-type') || '';
      if (!contentType.includes('application/json')) {
        const text = await response.text();
        if (text) return text;
        throw new Error('Unexpected response format from webhook');
      }

      const data = await response.json();

      // Handle common N8N response shapes
      const reply =
        data?.reply ||
        data?.output ||
        data?.message ||
        (typeof data === 'string' ? data : null);

      return reply || 'Sorry, I could not process your request at the moment.';
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
