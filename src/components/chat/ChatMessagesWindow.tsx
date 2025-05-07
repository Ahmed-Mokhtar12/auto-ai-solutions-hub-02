
import React from 'react';
import ChatMessages from '../ChatMessages';

interface ChatMessagesWindowProps {
  messages: any[];
  isChatVisible: boolean;
  isChatHistoryVisible: boolean;
  position: { x: number; y: number };
  isHovering: boolean;
  isUserInteracting: boolean;
  handleChatMessagesMouseEnter: () => void;
  handleChatMessagesMouseLeave: () => void;
}

/**
 * Component that handles the messages window display
 */
const ChatMessagesWindow: React.FC<ChatMessagesWindowProps> = ({
  messages,
  isChatVisible,
  isChatHistoryVisible,
  position,
  isHovering,
  isUserInteracting,
  handleChatMessagesMouseEnter,
  handleChatMessagesMouseLeave
}) => {
  return (
    <ChatMessages 
      messages={messages} 
      isChatVisible={isChatHistoryVisible || isHovering || isUserInteracting} 
      position={position}
      onMouseEnter={handleChatMessagesMouseEnter}
      onMouseLeave={handleChatMessagesMouseLeave}
    />
  );
};

export default ChatMessagesWindow;
