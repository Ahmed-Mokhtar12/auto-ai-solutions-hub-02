
import React from 'react';
import { useDraggable } from '@/hooks/draggable';
import { useIsMobile } from '@/hooks/use-mobile';
import { useChatBarInteractions } from '@/hooks/useChatBarInteractions';
import ChatMessages from './ChatMessages';
import ChatBarElement from './chat/ChatBarElement';

const ChatBar: React.FC = () => {
  const isMobile = useIsMobile();
  
  const {
    messageInputRef,
    isHovering,
    message,
    setMessage,
    isChatVisible,
    setIsChatVisible,
    isChatHistoryVisible,
    setIsChatHistoryVisible,
    messages,
    isLoading,
    sendMessage,
    handleSend,
    handleHover,
    chatVisibilityEvents,
    chatMessagesEvents
  } = useChatBarInteractions();
  
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
  
  // Handle chat bar click to register element ref
  React.useEffect(() => {
    // Add click handler to the chat bar element
    if (elementRef.current) {
      elementRef.current.addEventListener('click', () => {
        setIsChatHistoryVisible(true);
      });
    }
    
    return () => {
      if (elementRef.current) {
        elementRef.current.removeEventListener('click', () => {
          setIsChatHistoryVisible(true);
        });
      }
    };
  }, [elementRef, setIsChatHistoryVisible]);
  
  return (
    <>
      {/* Chat Messages Display */}
      <ChatMessages 
        messages={messages} 
        isChatVisible={isChatHistoryVisible || isHovering} 
        position={position}
        onMouseEnter={chatMessagesEvents.handleChatMessagesMouseEnter}
        onMouseLeave={chatMessagesEvents.handleChatMessagesMouseLeave}
      />
      
      {/* Chat Input Bar - Main draggable element */}
      <ChatBarElement
        messageInputRef={messageInputRef}
        elementRef={elementRef}
        isHovering={isHovering}
        message={message}
        setMessage={setMessage}
        isLoading={isLoading}
        sendMessage={sendMessage}
        handleSend={handleSend}
        handleHover={handleHover}
        position={position}
        isDragging={isDragging}
        isVisible={isVisible}
        handleMouseDown={handleMouseDown}
        isChatVisible={isChatVisible}
        setIsChatVisible={setIsChatVisible}
        handleMouseEnter={chatVisibilityEvents.handleMouseEnter}
        handleMouseLeave={chatVisibilityEvents.handleMouseLeave}
        setIsChatHistoryVisible={setIsChatHistoryVisible}
      />
    </>
  );
};

export default ChatBar;
