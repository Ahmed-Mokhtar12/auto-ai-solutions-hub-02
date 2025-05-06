
import React, { useEffect, useRef } from 'react';
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
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom when new messages arrive
  useEffect(() => {
    if (messagesContainerRef.current && isChatVisible) {
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
    }
  }, [messages, isChatVisible]);

  // Calculate position for the chat messages container
  // Ensure it stays within viewport bounds
  const getMessagesPosition = () => {
    // Base positioning - show above the chat bar
    let bottom = window.innerHeight - position.y + 10;
    let left = position.x;
    
    // Adjust if too close to screen edges
    if (left + 300 > window.innerWidth) {
      left = window.innerWidth - 310;
    }
    
    if (bottom + 400 > window.innerHeight) {
      bottom = window.innerHeight - 410;
    }
    
    return { bottom: `${bottom}px`, left: `${left}px` };
  };
  
  const messagesPosition = getMessagesPosition();
  
  return (
    <div 
      ref={messagesContainerRef}
      style={{
        position: 'fixed',
        width: '300px',
        maxHeight: '400px',
        overflowY: 'auto',
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        borderRadius: '8px',
        padding: '10px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
        transition: 'opacity 0.3s, transform 0.3s, visibility 0.3s',
        opacity: isChatVisible ? 1 : 0,
        visibility: isChatVisible ? 'visible' : 'hidden',
        transform: isChatVisible ? 'translateY(0)' : 'translateY(10px)',
        left: messagesPosition.left,
        bottom: messagesPosition.bottom,
        zIndex: 9998, // Just below the chat bar
        backdropFilter: 'blur(5px)',
        pointerEvents: isChatVisible ? 'auto' : 'none' // Only allow interaction when visible
      }}
    >
      {messages.length === 0 ? (
        <div className="text-gray-400 text-sm px-2 py-4 text-center">
          No messages yet. Start chatting!
        </div>
      ) : (
        messages.slice(-5).map((msg) => (
          <div
            key={msg.id}
            style={{
              padding: '8px 12px',
              borderRadius: '8px',
              marginBottom: '8px',
              maxWidth: '90%',
              wordWrap: 'break-word',
              backgroundColor: msg.sender === 'user' ? 'rgba(0, 100, 255, 0.5)' : 'rgba(50, 205, 50, 0.5)',
              backdropFilter: 'blur(4px)',
              color: '#fff',
              alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start',
              marginLeft: msg.sender === 'user' ? 'auto' : '0',
              display: 'block',
              textShadow: '0 1px 2px rgba(0,0,0,0.7)',
              lineHeight: '1.4'
            }}
          >
            {msg.text}
          </div>
        ))
      )}
    </div>
  );
};

export default ChatMessages;
