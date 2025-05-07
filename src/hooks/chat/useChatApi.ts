import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { WEBHOOK_URL } from './constants';
import { generateMessageId } from '@/utils/messageUtils';

interface ChatApiResponse {
  messageId: string;
  success: boolean;
}

/**
 * Hook for handling chat API communication
 */
export const useChatApi = (
  addUserMessage: (text: string) => string,
  addSystemMessage: (text: string) => string,
  removeMessage: (id: string) => void,
  setMessageJustSent: (value: boolean) => void
) => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const sendMessage = async (message: string): Promise<ChatApiResponse> => {
    if (!message.trim()) return { messageId: '', success: false };
    
    // Add user message and show thinking indicator
    const userMessageId = addUserMessage(message);
    setMessageJustSent(true);
    setIsLoading(true);
    
    // Add a "processing" message that will be replaced with the actual response
    const thinkingId = addSystemMessage("Processing your automation request...");
    
    try {
      // Send to webhook and wait for response
      console.log("Sending message to N8N webhook:", message);
      
      // Enhanced fetch with CORS handling and more options
      console.log("Attempting to connect to N8N webhook with URL:", WEBHOOK_URL);
      const response = await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json, text/plain, */*',
        },
        mode: 'cors', // Explicitly request CORS
        credentials: 'omit', // Don't send credentials
        body: JSON.stringify({ 
          message,
          timestamp: new Date().toISOString(),
          source: window.location.href
        }),
      });
      
      console.log("Raw response status from N8N:", response.status, response.statusText);
      console.log("Response headers:", [...response.headers.entries()]);
      
      // Remove thinking message
      removeMessage(thinkingId);
      
      // Check if response is valid
      if (response.ok) {
        try {
          // Try to get the response content type
          const contentType = response.headers.get('content-type');
          console.log("Response content type:", contentType);
          
          if (contentType && contentType.includes('application/json')) {
            // Parse as JSON if content type is JSON
            const data = await response.json();
            console.log("Received JSON response from N8N:", data);
            
            // Extract the response text directly from the data object
            let responseText = "I received your message but couldn't generate a proper response.";
            
            // Try different possible response formats from N8N
            if (data && typeof data === 'object') {
              if (data.output) {
                responseText = data.output;
              } else if (data.response) {
                responseText = data.response;
              } else if (data.text) {
                responseText = data.text;
              } else if (data.message) {
                responseText = data.message;
              } else if (data.result) {
                responseText = data.result;
              } else if (typeof data === 'string') {
                responseText = data;
              } else {
                // If no recognizable format is found, stringify the data
                responseText = "Received: " + JSON.stringify(data);
              }
            }
            
            console.log("Extracted response text:", responseText);
            
            // Add the response message from N8N
            const responseId = addSystemMessage(responseText);
            
            toast({
              title: "Response received",
              description: "N8N AI agent has responded to your message!",
            });
            
            return { messageId: responseId, success: true };
          } else {
            // If not JSON, get as text
            const textResponse = await response.text();
            console.log("Text response from N8N:", textResponse);
            
            const responseId = addSystemMessage(textResponse || "Received a text response from N8N.");
            
            toast({
              title: "Response received",
              description: "N8N AI agent has responded to your message!",
            });
            
            return { messageId: responseId, success: true };
          }
        } catch (parseError) {
          console.error("Error parsing response:", parseError);
          
          // If parsing fails, try to get text response
          try {
            const textResponse = await response.text();
            console.log("Text response from N8N after parse error:", textResponse);
            
            const responseId = addSystemMessage(textResponse || "Received a response but couldn't parse it properly.");
            return { messageId: responseId, success: true };
          } catch (textError) {
            console.error("Error getting text response:", textError);
            
            const errorId = addSystemMessage("Received a response from N8N but couldn't read its contents.");
            return { messageId: errorId, success: false };
          }
        }
      } else {
        console.error("Error response from webhook:", response.status, response.statusText);
        
        // Try to get error details if available
        try {
          const errorText = await response.text();
          console.error("Error response body:", errorText);
          
          const errorId = addSystemMessage(`Error from N8N webhook (Status: ${response.status}): ${errorText || 'No details available'}`);
          
          toast({
            title: "Error",
            description: `Failed to get a proper response from N8N (Status: ${response.status})`,
            variant: "destructive",
          });
          
          return { messageId: errorId, success: false };
        } catch (e) {
          console.error("Couldn't read error response:", e);
          
          const errorId = addSystemMessage(`Error from N8N webhook (Status: ${response.status})`);
          
          toast({
            title: "Error",
            description: `Failed to get a proper response from N8N (Status: ${response.status})`,
            variant: "destructive",
          });
          
          return { messageId: errorId, success: false };
        }
      }
    } catch (error) {
      console.error('Error sending message or receiving response:', error);
      
      // More detailed error information
      const errorMessage = error instanceof Error ? 
        `${error.name}: ${error.message}` : 
        'Unknown error occurred';
      
      console.error('Detailed error:', errorMessage);
      
      const errorId = addSystemMessage(`Failed to connect with N8N workflow: ${errorMessage}. Please check your network and try again.`);
      
      toast({
        title: "Connection Error",
        description: "Failed to connect with N8N workflow. Check console for details.",
        variant: "destructive",
      });
      
      return { messageId: errorId, success: false };
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    sendMessage
  };
};
