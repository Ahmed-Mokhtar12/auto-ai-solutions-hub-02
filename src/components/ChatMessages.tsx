
import React, { useEffect, useRef } from 'react';
import { ChatMessage } from '@/utils/messageUtils';
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';

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
  const isMobile = useIsMobile();

  // Scroll to bottom when new messages arrive
  useEffect(() => {
    if (messagesContainerRef.current && isChatVisible) {
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
    }
  }, [messages, isChatVisible]);

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
    <div 
      ref={messagesContainerRef}
      className={cn(
        "scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-transparent",
        isChatVisible ? "animate-enter" : "animate-exit"
      )}
      style={{
        position: 'fixed',
        width: isMobile ? '260px' : '300px',
        maxHeight: '400px',
        overflowY: 'auto',
        backgroundColor: 'rgba(13, 17, 28, 0.85)',
        border: '1px solid rgba(255, 255, 255, 0.15)',
        borderRadius: '12px',
        padding: '12px',
        boxShadow: '0 8px 16px rgba(0, 0, 0, 0.3), 0 0 4px rgba(156, 139, 255, 0.15)',
        transition: 'opacity 0.3s ease, transform 0.3s ease, visibility 0.3s',
        opacity: isChatVisible ? 1 : 0,
        visibility: isChatVisible ? 'visible' : 'hidden',
        transform: isChatVisible ? 'translateY(0) scale(1)' : 'translateY(10px) scale(0.98)',
        left: messagesPosition.left,
        bottom: messagesPosition.bottom,
        zIndex: 9998, // Just below the chat bar
        backdropFilter: 'blur(8px)',
        pointerEvents: isChatVisible ? 'auto' : 'none', // Only allow interaction when visible
        willChange: 'transform, opacity'
      }}
    >
      {messages.length === 0 ? (
        <div className="text-gray-400 text-sm px-2 py-4 text-center">
          No messages yet. Start chatting!
        </div>
      ) : (
        messages.map((msg) => (
          <div
            key={msg.id}
            className="animate-fade-in"
            style={{
              padding: '10px 14px',
              borderRadius: '12px',
              marginBottom: '10px',
              maxWidth: '90%',
              wordWrap: 'break-word',
              backgroundColor: msg.sender === 'user' 
                ? 'rgba(0, 122, 255, 0.35)' 
                : 'rgba(50, 205, 50, 0.35)',
              backdropFilter: 'blur(4px)',
              color: '#fff',
              alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start',
              marginLeft: msg.sender === 'user' ? 'auto' : '0',
              display: 'block',
              textShadow: '0 1px 2px rgba(0,0,0,0.5)',
              lineHeight: '1.5',
              boxShadow: '0 2px 4px rgba(0,0,0,0.15)'
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
