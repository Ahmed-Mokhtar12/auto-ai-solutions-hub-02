
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
  const messageInputRef = useRef<HTMLInputElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const isMobile = useIsMobile();
  const { currentPlaceholder } = usePlaceholderRotation();
  
  const {
    message,
    setMessage,
    isChatVisible,
    setIsChatVisible,
    isChatHistoryVisible,
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
    sendMessage();
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
    }
  };
  
  // Handle mouse events for the chat messages window
  const handleChatMessagesMouseEnter = () => {
    handleMouseEnter();
    setIsHovering(true);
    setIsUserInteracting(true);
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
    }
  }, [isHovering, isUserInteracting, setIsChatVisible]);
  
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
  }, [setIsUserInteracting, isHovering]);
  
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
