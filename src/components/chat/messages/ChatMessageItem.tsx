
import React from 'react';
import { ChatMessage } from '@/utils/messageUtils';
import { cn } from '@/lib/utils';

interface ChatMessageItemProps {
  message: ChatMessage;
}

const ThinkingDots: React.FC = () => (
  <span className="inline-flex items-center gap-1.5">
    <span className="text-sm mr-0.5" style={{ color: '#C8C8C9' }}>Thinking</span>
    {[0, 1, 2].map((i) => (
      <span
        key={i}
        className="inline-block w-2 h-2 rounded-full"
        style={{
          backgroundColor: '#C8C8C9',
          animation: `thinking-dot 1.2s ease-in-out ${i * 0.25}s infinite`,
        }}
      />
    ))}
  </span>
);

const ChatMessageItem: React.FC<ChatMessageItemProps> = ({ message }) => {
  const isUser = message.sender === 'user';
  const isThinking = !isUser && message.text === "Thinking...";
  
  return (
    <div
      className={cn(
        "animate-fade-in px-3.5 py-2.5 rounded-xl mb-2.5 max-w-[90%] break-words",
        isUser ? "ml-auto" : "",
      )}
      style={{
        backgroundColor: 'transparent',
        textShadow: '0 1px 3px rgba(0, 0, 0, 0.7)',
        lineHeight: '1.5',
        display: 'block',
        color: isUser ? 'white' : '#F8D042',
        fontSize: 'inherit',
        borderLeft: isUser ? 'none' : '1px solid rgba(72, 187, 120, 0.3)',
        borderRight: isUser ? '1px solid rgba(66, 153, 225, 0.3)' : 'none',
      }}
      role={isUser ? 'note' : 'status'}
    >
      {isThinking ? <ThinkingDots /> : message.text}
    </div>
  );
};

export default ChatMessageItem;
