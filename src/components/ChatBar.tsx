
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
    setIsChatHistoryVisible,
    isUserInteracting,
    setIsUserInteracting,
    messages,
    isLoading,
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
    } else {
      // Only set to false if mouse leaves both components
      if (!isUserInteracting) {
        setIsUserInteracting(false);
      }
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
    // We delay setting isUserInteracting to false 
    // to allow for mouse movement between chat elements
    setTimeout(() => {
      // Check if mouse is over any chat element before setting to false
      const chatElements = document.querySelectorAll('.chat-interactive-element');
      let isOverChatElement = false;
      
      chatElements.forEach(element => {
        const rect = element.getBoundingClientRect();
        if (
          event.clientX >= rect.left &&
          event.clientX <= rect.right &&
          event.clientY >= rect.top &&
          event.clientY <= rect.bottom
        ) {
          isOverChatElement = true;
        }
      });
      
      if (!isOverChatElement) {
        setIsUserInteracting(false);
      }
    }, 100);
  };
  
  // Reset hover timeout to prevent chat from disappearing while user is interacting
  useEffect(() => {
    // Force chat visible when hovering or user is interacting
    if (isHovering || isUserInteracting) {
      setIsChatVisible(true);
      setIsChatHistoryVisible(true);
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
        className="chat-interactive-element"
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
