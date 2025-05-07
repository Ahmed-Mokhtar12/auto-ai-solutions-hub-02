
import React from 'react';
import { ChatMessage } from '@/utils/messageUtils';
import { cn } from '@/lib/utils';

interface ChatMessageItemProps {
  message: ChatMessage;
}

const ChatMessageItem: React.FC<ChatMessageItemProps> = ({ message }) => {
  const isUser = message.sender === 'user';
  const isThinking = !isUser && message.text === "Thinking...";
  
  return (
    <div
      className={cn(
        "animate-fade-in px-3.5 py-2.5 rounded-xl mb-2.5 max-w-[90%] break-words",
        isUser ? "ml-auto" : "",
        isThinking ? "thinking-animation" : ""
      )}
      style={{
        backgroundColor: 'transparent', // Fully transparent background
        textShadow: '0 1px 3px rgba(0, 0, 0, 0.7)', // Enhanced text shadow for readability
        lineHeight: '1.5',
        display: 'block',
        color: isThinking ? '#C8C8C9' : 'white', // Even lighter gray for thinking message
        fontSize: isThinking ? '0.85rem' : 'inherit', // Smaller font for thinking message
        borderLeft: isUser ? 'none' : '1px solid rgba(72, 187, 120, 0.3)', // Even more subtle indicator
        borderRight: isUser ? '1px solid rgba(66, 153, 225, 0.3)' : 'none', // Even more subtle indicator
        opacity: isThinking ? 1 : 'inherit', // Start with full opacity for the animation
      }}
      role={isUser ? 'note' : 'status'}
    >
      {message.text}
    </div>
  );
};

export default ChatMessageItem;
