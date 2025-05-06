
import React from 'react';
import { ChatMessage } from '@/utils/messageUtils';
import { useIsMobile } from '@/hooks/use-mobile';
import MessageContainer from './chat/messages/MessageContainer';
import ChatMessageItem from './chat/messages/ChatMessageItem';
import MessageEmptyState from './chat/messages/MessageEmptyState';

interface ChatMessagesProps {
  messages: ChatMessage[];
  isChatVisible: boolean;
  position: { x: number; y: number };
}

const ChatMessages: React.FC<ChatMessagesProps> = ({ 
  messages, 
  isChatVisible, 
  position 
}) => {
  const isMobile = useIsMobile();

  // Calculate position for the chat messages container
  // Ensure it stays within viewport bounds
  const getMessagesPosition = () => {
    // Position the message container above the chat bar by default
    let bottom = window.innerHeight - position.y + 10;
    let left = position.x;
    
    // If too close to right edge, adjust leftward
    if (left + (isMobile ? 260 : 300) > window.innerWidth) {
      left = window.innerWidth - (isMobile ? 270 : 310);
    }
    
    // If too close to top edge, show below chat bar instead
    if (bottom > window.innerHeight - 120) {
      bottom = 60; // Show below the chat bar instead
    }
    
    return { bottom: `${bottom}px`, left: `${left}px` };
  };
  
  const messagesPosition = getMessagesPosition();
  
  return (
    <MessageContainer
      isChatVisible={isChatVisible}
      position={messagesPosition}
      isMobile={isMobile}
    >
      {messages.length === 0 ? (
        <MessageEmptyState />
      ) : (
        messages.map((msg) => (
          <ChatMessageItem key={msg.id} message={msg} />
        ))
      )}
    </MessageContainer>
  );
};

export default ChatMessages;
