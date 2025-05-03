
import React from 'react';
import { ChatMessage } from '@/utils/messageUtils';

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
  return (
    <div 
      style={{
        position: 'fixed',
        width: '300px',
        maxHeight: '400px',
        overflowY: 'auto',
        backgroundColor: 'transparent',
        border: 'none',
        borderRadius: '8px',
        padding: '10px',
        boxShadow: 'none',
        transition: 'opacity 0.3s, transform 0.3s',
        opacity: isChatVisible ? 1 : 0,
        visibility: isChatVisible ? 'visible' : 'hidden',
        transform: isChatVisible ? 'translateY(0)' : 'translateY(10px)',
        left: `${position.x}px`,
        bottom: `${window.innerHeight - position.y + 10}px`,
        zIndex: 9999,
        pointerEvents: 'none'
      }}
    >
      {messages.slice(-4).map((msg) => (
        <div
          key={msg.id}
          style={{
            padding: '8px 12px',
            borderRadius: '8px',
            marginBottom: '8px',
            maxWidth: '80%',
            wordWrap: 'break-word',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            color: '#fff',
            alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start',
            marginLeft: msg.sender === 'user' ? 'auto' : '0',
            display: 'block',
            textShadow: '0 1px 2px rgba(0,0,0,0.5)'
          }}
        >
          {msg.text}
        </div>
      ))}
    </div>
  );
};

export default ChatMessages;
