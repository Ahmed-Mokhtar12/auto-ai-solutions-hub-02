
import React from 'react';
import { ChatMessage } from '@/utils/messageUtils';
import { cn } from '@/lib/utils';

interface ChatMessageItemProps {
  message: ChatMessage;
}

const ChatMessageItem: React.FC<ChatMessageItemProps> = ({ message }) => {
  const isUser = message.sender === 'user';
  
  return (
    <div
      className={cn(
        "animate-fade-in px-3.5 py-2.5 rounded-xl mb-2.5 max-w-[90%] break-words shadow-sm",
        isUser ? "bg-blue-500/20" : "bg-green-500/20", // More transparent message bubbles
        isUser ? "ml-auto" : ""
      )}
      style={{
        backdropFilter: 'blur(8px)', // Add blur to the message bubbles
        textShadow: '0 1px 2px rgba(0,0,0,0.3)',
        lineHeight: '1.5',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        display: 'block',
        color: 'white',
        borderLeft: isUser ? 'none' : '2px solid rgba(72, 187, 120, 0.4)', // Subtle indicator for system messages
        borderRight: isUser ? '2px solid rgba(66, 153, 225, 0.4)' : 'none', // Subtle indicator for user messages
      }}
      role={isUser ? 'note' : 'status'}
    >
      {message.text}
    </div>
  );
};

export default ChatMessageItem;
