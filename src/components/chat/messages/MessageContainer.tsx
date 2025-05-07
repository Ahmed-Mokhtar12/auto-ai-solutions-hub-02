import React, { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

interface MessageContainerProps {
  children: React.ReactNode;
  isChatVisible: boolean;
  position: { left: string; bottom: string };  // Changed from Position type
  isMobile?: boolean;
}

const MessageContainer: React.FC<MessageContainerProps> = ({ 
  children, 
  isChatVisible, 
  position,
  isMobile = false
}) => {
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom when new children or visibility changes
  useEffect(() => {
    if (messagesContainerRef.current && isChatVisible) {
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
    }
  }, [children, isChatVisible]);

  // Calculate position based on chat bar position
  const messagePosition = {
    left: `${position.left}`,
    bottom: `${position.bottom}`
  };

  return (
    <div 
      ref={messagesContainerRef}
      className={cn(
        "scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-transparent",
        isChatVisible ? "animate-enter" : "animate-exit"
      )}
      style={{
        position: 'fixed',
        width: isMobile ? '350px' : '400px', // Match chat bar width
        maxHeight: '400px',
        overflowY: 'auto',
        backgroundColor: 'rgba(31, 31, 46, 0.75)',
        border: '1px solid rgba(255, 255, 255, 0.15)',
        borderRadius: '16px',
        padding: '12px',
        boxShadow: '0 8px 20px rgba(0, 0, 0, 0.35), 0 0 8px rgba(156, 139, 255, 0.2)',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        opacity: isChatVisible ? 1 : 0,
        visibility: isChatVisible ? 'visible' : 'hidden',
        transform: isChatVisible ? 'translateY(0) scale(1)' : 'translateY(10px) scale(0.98)',
        left: messagePosition.left,
        bottom: messagePosition.bottom,
        zIndex: 9998,
        backdropFilter: 'blur(8px)',
        pointerEvents: isChatVisible ? 'auto' : 'none',
        willChange: 'transform, opacity, left, bottom'
      }}
      role="log"
      aria-live="polite"
      aria-label="Chat messages"
      onClick={(e) => e.stopPropagation()}
    >
      {children}
    </div>
  );
};

export default MessageContainer;
