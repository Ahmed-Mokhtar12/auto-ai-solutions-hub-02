
import React, { useRef, useState } from 'react';
import { useChatState } from '@/hooks/chat'; 
import { useDraggable } from '@/hooks/draggable';
import { useIsMobile } from '@/hooks/use-mobile';
import { usePlaceholderRotation } from './chat/PlaceholderManager';
import { useSendMessage } from '@/hooks/chat/useSendMessage';
import { useInputInteraction } from '@/hooks/chat/useInputInteraction';
import ChatInputArea from './chat/ChatInputArea';
import ChatMessagesWindow from './chat/ChatMessagesWindow';
import ChatContainer from './chat/ChatContainer';

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
    messages,
    isLoading,
    isUserInteracting,
    setIsUserInteracting,
    sendMessage: sendToApi,
    handleVisibility
  } = useChatState();
  
  // Initialize draggable behavior
  const {
    elementRef,
    position,
    isDragging,
    isVisible,
    handleMouseDown
  } = useDraggable({ 
    autoHideOnScroll: true 
  });
  
  // Handle visibility events
  const { handleMouseEnter, handleMouseLeave } = handleVisibility();
  
  // Use our custom hook for sending messages
  const { sendMessage } = useSendMessage({
    message,
    setMessage,
    isLoading,
    sendToApi
  });
  
  // Use custom hook for input interactions
  useInputInteraction({
    messageInputRef,
    elementRef,
    setIsUserInteracting,
    setIsChatHistoryVisible,
    isChatVisible,
    isHovering
  });
  
  // Handle send button click
  const handleSend = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation(); // Prevent dragging when clicking button
    
    if (!isLoading) {
      sendMessage();
    }
    
    // Focus back on input
    messageInputRef.current?.focus();
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

  // Ensure chat visible when hovering or user is interacting
  React.useEffect(() => {
    if (isHovering || isUserInteracting) {
      setIsChatVisible(true);
      setIsChatHistoryVisible(true); // Ensure history is visible during interaction
    }
  }, [isHovering, isUserInteracting, setIsChatVisible, setIsChatHistoryVisible]);
  
  return (
    <>
      {/* Chat Messages Window Component */}
      <ChatMessagesWindow
        messages={messages}
        isChatVisible={isChatVisible}
        isChatHistoryVisible={isChatHistoryVisible}
        position={position}
        isHovering={isHovering}
        isUserInteracting={isUserInteracting}
        handleChatMessagesMouseEnter={handleChatMessagesMouseEnter}
        handleChatMessagesMouseLeave={handleChatMessagesMouseLeave}
      />
      
      {/* Chat Input Bar - Main draggable element */}
      <div 
        ref={elementRef}
        onClick={(e) => {
          e.stopPropagation();
          // Show chat history when chatbar is clicked
          setIsChatHistoryVisible(true);
          messageInputRef.current?.focus();
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
          <ChatInputArea 
            message={message}
            setMessage={setMessage}
            isLoading={isLoading}
            onSend={handleSend}
            sendMessage={sendMessage}
            placeholderText={currentPlaceholder}
            messageInputRef={messageInputRef}
          />
        </ChatContainer>
      </div>
    </>
  );
};

export default ChatBar;
