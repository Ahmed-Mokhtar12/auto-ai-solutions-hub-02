
import React, { useRef, useState, useEffect } from 'react';
import { useChatState } from '@/hooks/chat'; 
import { useDraggable } from '@/hooks/draggable';
import { useIsMobile } from '@/hooks/use-mobile';
import ChatMessages from './ChatMessages';
import ChatInput from './chat/ChatInput';
import SendButton from './chat/SendButton';
import ChatContainer from './chat/ChatContainer';
import { usePlaceholderRotation } from './chat/PlaceholderManager';

const ChatBar: React.FC = () => {
  const messageInputRef = useRef<HTMLTextAreaElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const isMobile = useIsMobile();
  const { currentPlaceholder } = usePlaceholderRotation();
  
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
    handleVisibility
  } = useChatState();
  
  // Initialize useDraggable with centered position above footer
  const {
    elementRef,
    position,
    isDragging,
    isVisible,
    handleMouseDown
  } = useDraggable({ 
    autoHideOnScroll: true 
  });
  
  const { handleMouseEnter, handleMouseLeave } = handleVisibility();
  
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
    
    // Handle clicks on the chat bar to show history
    const handleChatBarClick = () => {
      setIsChatHistoryVisible(true);
      setIsUserInteracting(true);
    };
    
    if (inputElement) {
      inputElement.addEventListener('focus', handleFocus);
      inputElement.addEventListener('blur', handleBlur);
    }
    
    // Add click handler to the chat bar element
    if (elementRef.current) {
      elementRef.current.addEventListener('click', handleChatBarClick);
    }
    
    return () => {
      if (inputElement) {
        inputElement.removeEventListener('focus', handleFocus);
        inputElement.removeEventListener('blur', handleBlur);
      }
      if (elementRef.current) {
        elementRef.current.removeEventListener('click', handleChatBarClick);
      }
    };
  }, [setIsUserInteracting, isHovering, setIsChatHistoryVisible, elementRef]);
  
  return (
    <>
      {/* Chat Messages Display */}
      <ChatMessages 
        messages={messages} 
        isChatVisible={isChatHistoryVisible || isHovering || isUserInteracting} 
        position={position}
        onMouseEnter={handleChatMessagesMouseEnter}
        onMouseLeave={handleChatMessagesMouseLeave}
      />
      
      {/* Chat Input Bar - Main draggable element */}
      <div 
        ref={elementRef}
        onClick={(e) => {
          e.stopPropagation();
          // Show chat history when chatbar is clicked
          setIsChatHistoryVisible(true);
          if (messageInputRef.current) {
            messageInputRef.current.focus();
          }
        }}
      >
        <ChatContainer
          position={position}
          isDragging={isDragging}
          isVisible={isVisible}
          handleMouseDown={handleMouseDown}
          isChatVisible={isChatVisible}
          setIsChatVisible={setIsChatVisible}
          isHovering={isHovering}
          onHoverChange={handleHover}
          handleVisibilityEvents={{ handleMouseEnter, handleMouseLeave }}
        >
          <ChatInput
            message={message}
            setMessage={setMessage}
            isLoading={isLoading}
            onSend={sendMessage}
            placeholderText={currentPlaceholder}
            inputRef={messageInputRef}
          />
          <SendButton 
            onClick={handleSend}
            isLoading={isLoading}
            message={message}
          />
        </ChatContainer>
      </div>
    </>
  );
};

export default ChatBar;
