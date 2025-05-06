import { useState, useEffect } from 'react';
import { ChatMessage, generateMessageId } from '@/utils/messageUtils';
import { useToast } from '@/hooks/use-toast';

const WEBHOOK_URL = "https://n8n-2seasons-u38985.vm.elestio.app/webhook-test/Website";

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
      
      // Send to webhook and allow CORS
      const response = await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          message,
          timestamp: new Date().toISOString(),
          source: window.location.href
        }),
      });
      
      // Remove thinking message
      setMessages(prev => prev.filter(m => m.id !== thinkingId));
      
      // Check if response is valid
      if (response.ok) {
        try {
          // Try parsing the response as JSON
          const data = await response.json();
          console.log("Received response from N8N:", data);
          
          // Extract the response from the actual format returned by N8N
          const responseText = data.output || data.response || "I received your message but couldn't generate a proper response.";
          
          // Add the response message from N8N
          const responseId = generateMessageId();
          setMessages(prev => [...prev, { 
            text: responseText, 
            sender: 'system', 
            id: responseId 
          }]);
          
          toast({
            title: "Response received",
            description: "N8N AI agent has responded to your message!",
          });
        } catch (parseError) {
          console.error("Error parsing response:", parseError);
        }
      } else {
        console.error("Error response from webhook:", response.status);
        setMessages(prev => [...prev, { 
          text: `Error from N8N webhook (Status: ${response.status})`, 
          sender: 'system', 
          id: generateMessageId() 
        }]);
        
        toast({
          title: "Error",
          description: `Failed to get a proper response from N8N (Status: ${response.status})`,
          variant: "destructive",
        });
      }
      
    } catch (error) {
      console.error('Error sending message or receiving response:', error);
      setMessages(prev => [...prev, { 
        text: "Failed to connect with N8N workflow. Please check your network and try again.", 
        sender: 'system', 
        id: generateMessageId() 
      }]);
      
      toast({
        title: "Error",
        description: "Failed to connect with N8N workflow.",
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
