
import React from 'react';
import { usePlaceholderRotation } from './PlaceholderManager';
import ChatInput from './ChatInput';
import SendButton from './SendButton';
import ChatContainer from './ChatContainer';

interface ChatBarElementProps {
  messageInputRef: React.RefObject<HTMLInputElement>;
  elementRef: React.RefObject<HTMLDivElement>;
  isHovering: boolean;
  message: string;
  setMessage: (message: string) => void;
  isLoading: boolean;
  sendMessage: () => void;
  handleSend: (e: React.MouseEvent) => void;
  handleHover: (hovering: boolean) => void;
  position: { x: number; y: number };
  isDragging: boolean;
  isVisible: boolean;
  handleMouseDown: (e: React.MouseEvent) => void;
  isChatVisible: boolean;
  setIsChatVisible: (visible: boolean) => void;
  handleMouseEnter: () => void;
  handleMouseLeave: () => void;
  setIsChatHistoryVisible: (visible: boolean) => void;
}

const ChatBarElement: React.FC<ChatBarElementProps> = ({
  messageInputRef,
  elementRef,
  isHovering,
  message,
  setMessage,
  isLoading,
  sendMessage,
  handleSend,
  handleHover,
  position,
  isDragging,
  isVisible,
  handleMouseDown,
  isChatVisible,
  setIsChatVisible,
  handleMouseEnter,
  handleMouseLeave,
  setIsChatHistoryVisible
}) => {
  const { currentPlaceholder } = usePlaceholderRotation();
  
  return (
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
  );
};

export default ChatBarElement;
