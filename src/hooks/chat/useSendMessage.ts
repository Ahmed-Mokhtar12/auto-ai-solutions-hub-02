
import { useCallback } from 'react';

interface UseSendMessageProps {
  message: string;
  setMessage: (message: string) => void;
  isLoading: boolean;
  sendToApi: (message: string) => Promise<any>;
}

/**
 * Hook for handling message sending logic
 */
export const useSendMessage = ({
  message,
  setMessage,
  isLoading,
  sendToApi
}: UseSendMessageProps) => {
  
  const sendMessage = useCallback(async () => {
    if (!message.trim() || isLoading) return;
    
    await sendToApi(message);
    
    // Clear input
    setMessage('');
  }, [message, sendToApi, setMessage, isLoading]);

  return {
    sendMessage
  };
};
