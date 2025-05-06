
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
    e.stopPropagation(); // Prevent dragging when clicking button
    sendMessage();
    // Focus back on input
    if (messageInputRef.current) {
      messageInputRef.current.focus();
    }
  };

  // Handle hover state - ensure chat stays visible when hovering
  const handleHover = (hovering: boolean) => {
    setIsHovering(hovering);
    if (hovering) {
      setIsChatVisible(true);
    }
  };
  
  // Reset hover timeout to prevent chat from disappearing while user is interacting
  useEffect(() => {
    // Force chat visible when hovering
    if (isHovering) {
      setIsChatVisible(true);
    }
  }, [isHovering, setIsChatVisible]);
  
  return (
    <>
      {/* Chat Messages Display */}
      <ChatMessages 
        messages={messages} 
        isChatVisible={isChatVisible || isHovering} 
        position={position} 
      />
      
      {/* Chat Input Bar - Main draggable element */}
      <div ref={elementRef}>
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
