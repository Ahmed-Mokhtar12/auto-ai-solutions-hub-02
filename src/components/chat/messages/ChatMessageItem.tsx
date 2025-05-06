
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
        isUser ? "bg-blue-500/35 ml-auto" : "bg-green-500/35",
        isUser ? "text-white" : "text-white"
      )}
      style={{
        backdropFilter: 'blur(4px)',
        textShadow: '0 1px 2px rgba(0,0,0,0.5)',
        lineHeight: '1.5',
        boxShadow: '0 2px 4px rgba(0,0,0,0.15)',
        display: 'block',
      }}
      role={isUser ? 'note' : 'status'}
    >
      {message.text}
    </div>
  );
};

export default ChatMessageItem;
