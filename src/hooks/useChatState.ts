import { useState, useEffect } from 'react';
import { ChatMessage, generateMessageId } from '@/utils/messageUtils';
import { useToast } from '@/hooks/use-toast';

const WEBHOOK_URL = "https://n8n-2seasons-u38985.vm.elestio.app/webhook/Website";

export const useChatState = () => {
  const [message, setMessage] = useState('');
  const [isChatVisible, setIsChatVisible] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [messageJustSent, setMessageJustSent] = useState(false);
  const [hideTimeout, setHideTimeout] = useState<NodeJS.Timeout | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

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
      // Send to webhook and wait for response
      console.log("Sending message to N8N webhook:", message);
      
      // Add a "thinking" message that will be replaced with the actual response
      const thinkingId = generateMessageId();
      setMessages(prev => [...prev, { 
        text: "Thinking...", 
        sender: 'system', 
        id: thinkingId 
      }]);
      
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
      setMessages(prev => prev.filter(m => m.id !== thinkingId));
      
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
            const responseId = generateMessageId();
            setMessages(prev => [...prev, { 
              text: responseText, 
              sender: 'system', 
              id: responseId 
            }]);
          } else {
            // If not JSON, get as text
            const textResponse = await response.text();
            console.log("Text response from N8N:", textResponse);
            
            const responseId = generateMessageId();
            setMessages(prev => [...prev, { 
              text: textResponse || "Received a text response from N8N.", 
              sender: 'system', 
              id: responseId 
            }]);
          }
          
          toast({
            title: "Response received",
            description: "N8N AI agent has responded to your message!",
          });
        } catch (parseError) {
          console.error("Error parsing response:", parseError);
          
          // If parsing fails, try to get text response
          try {
            const textResponse = await response.text();
            console.log("Text response from N8N after parse error:", textResponse);
            
            const responseId = generateMessageId();
            setMessages(prev => [...prev, { 
              text: textResponse || "Received a response but couldn't parse it properly.", 
              sender: 'system', 
              id: responseId 
            }]);
          } catch (textError) {
            console.error("Error getting text response:", textError);
            
            setMessages(prev => [...prev, { 
              text: "Received a response from N8N but couldn't read its contents.", 
              sender: 'system', 
              id: generateMessageId() 
            }]);
          }
        }
      } else {
        console.error("Error response from webhook:", response.status, response.statusText);
        
        // Try to get error details if available
        try {
          const errorText = await response.text();
          console.error("Error response body:", errorText);
          
          setMessages(prev => [...prev, { 
            text: `Error from N8N webhook (Status: ${response.status}): ${errorText || 'No details available'}`, 
            sender: 'system', 
            id: generateMessageId() 
          }]);
        } catch (e) {
          console.error("Couldn't read error response:", e);
          
          setMessages(prev => [...prev, { 
            text: `Error from N8N webhook (Status: ${response.status})`, 
            sender: 'system', 
            id: generateMessageId() 
          }]);
        }
        
        toast({
          title: "Error",
          description: `Failed to get a proper response from N8N (Status: ${response.status})`,
          variant: "destructive",
        });
      }
      
    } catch (error) {
      console.error('Error sending message or receiving response:', error);
      
      // More detailed error information
      const errorMessage = error instanceof Error ? 
        `${error.name}: ${error.message}` : 
        'Unknown error occurred';
      
      console.error('Detailed error:', errorMessage);
      
      setMessages(prev => [...prev, { 
        text: `Failed to connect with N8N workflow: ${errorMessage}. Please check your network and try again.`, 
        sender: 'system', 
        id: generateMessageId() 
      }]);
      
      toast({
        title: "Connection Error",
        description: "Failed to connect with N8N workflow. Check console for details.",
        variant: "destructive",
      });
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
