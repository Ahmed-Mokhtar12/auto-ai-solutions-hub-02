
import { useState, useEffect, useRef } from 'react';
import { useChatState } from '@/hooks/chat';
import { handleVisibility } from '@/hooks/chat/useVisibility';

export const useChatBarInteractions = () => {
  const messageInputRef = useRef<HTMLInputElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  
  const {
    message,
    setMessage,
    isChatVisible,
    setIsChatVisible,
    isChatHistoryVisible,
    setIsChatHistoryVisible,
    messages,
    isLoading,
    isUserInteracting,
    setIsUserInteracting,
    sendMessage,
    handleVisibility: chatVisibilityHandler
  } = useChatState();
  
  const { handleMouseEnter, handleMouseLeave } = chatVisibilityHandler();
  
  // Handle send button click
  const handleSend = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation(); // Prevent dragging when clicking button
    
    // Only send if not currently loading a response
    if (!isLoading) {
      sendMessage();
    }
    
    // Focus back on input
    if (messageInputRef.current) {
      messageInputRef.current.focus();
    }
  };

  // Handle hover state with smooth transitions
  const handleHover = (hovering: boolean) => {
    setIsHovering(hovering);
    if (hovering) {
      setIsChatVisible(true);
      setIsUserInteracting(true);
      setIsChatHistoryVisible(true); // Always show history on hover
    }
  };
  
  // Handle mouse events for the chat messages window
  const handleChatMessagesMouseEnter = () => {
    handleMouseEnter();
    setIsHovering(true);
    setIsUserInteracting(true);
    setIsChatHistoryVisible(true); // Always show history on mouse enter
  };
  
  const handleChatMessagesMouseLeave = () => {
    handleMouseLeave();
    setIsHovering(false);
  };
  
  // Reset hover timeout to prevent chat from disappearing while user is interacting
  useEffect(() => {
    // Force chat visible when hovering or user is interacting
    if (isHovering || isUserInteracting) {
      setIsChatVisible(true);
      setIsChatHistoryVisible(true); // Ensure history is visible during interaction
    }
  }, [isHovering, isUserInteracting, setIsChatVisible, setIsChatHistoryVisible]);
  
  // Focus input when chat becomes visible
  useEffect(() => {
    if (isChatVisible && messageInputRef.current) {
      setTimeout(() => {
        messageInputRef.current?.focus();
      }, 100);
    }
  }, [isChatVisible]);

  // Set up chat input focus and blur events
  useEffect(() => {
    const inputElement = messageInputRef.current;
    
    const handleFocus = () => {
      setIsUserInteracting(true);
      setIsChatHistoryVisible(true); // Show history when input is focused
    };
    
    const handleBlur = () => {
      // Don't immediately turn off interaction on blur
      // as user might be clicking elsewhere in chat
      setTimeout(() => {
        if (!isHovering) {
          setIsUserInteracting(false);
        }
      }, 100);
    };
    
    if (inputElement) {
      inputElement.addEventListener('focus', handleFocus);
      inputElement.addEventListener('blur', handleBlur);
    }
    
    return () => {
      if (inputElement) {
        inputElement.removeEventListener('focus', handleFocus);
        inputElement.removeEventListener('blur', handleBlur);
      }
    };
  }, [setIsUserInteracting, isHovering, setIsChatHistoryVisible]);

  return {
    messageInputRef,
    isHovering,
    setIsHovering,
    message,
    setMessage,
    isChatVisible,
    setIsChatVisible,
    isChatHistoryVisible,
    setIsChatHistoryVisible,
    messages,
    isLoading,
    isUserInteracting,
    setIsUserInteracting,
    sendMessage,
    handleSend,
    handleHover,
    chatVisibilityEvents: { handleMouseEnter, handleMouseLeave },
    chatMessagesEvents: {
      handleChatMessagesMouseEnter,
      handleChatMessagesMouseLeave
    }
  };
};
