
import React, { useEffect, useRef, memo } from 'react';
import { cn } from '@/lib/utils';
import { ScrollArea } from '@/components/ui/scroll-area';

interface MessageContainerProps {
  children: React.ReactNode;
  isChatVisible: boolean;
  position: { left: string; bottom: string };
  isMobile?: boolean;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

// Memoizing the component to prevent unnecessary re-renders
const MessageContainer: React.FC<MessageContainerProps> = memo(({ 
  children, 
  isChatVisible, 
  position,
  isMobile = false,
  onMouseEnter,
  onMouseLeave
}) => {
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom when new children or visibility changes
  useEffect(() => {
    if (messagesContainerRef.current && isChatVisible) {
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
    }
  }, [children, isChatVisible]);

  return (
    <div 
      ref={messagesContainerRef}
      className={cn(
        "hide-scrollbar",
        isChatVisible ? "animate-enter" : "animate-exit"
      )}
      style={{
        position: 'fixed',
        width: isMobile ? '350px' : '400px', // Match chat bar width
        height: '15cm', // Fixed height of 15cm from bottom of the window
        overflowY: 'auto',
        backgroundColor: 'rgba(0, 0, 0, 0)', // Completely transparent background
        border: '1px solid rgba(255, 255, 255, 0.05)', // Very subtle border
        borderRadius: '16px',
        padding: '12px',
        boxShadow: 'none', // Ensure no shadow
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        opacity: isChatVisible ? 1 : 0,
        visibility: isChatVisible ? 'visible' : 'hidden',
        transform: isChatVisible ? 'translateY(0) scale(1)' : 'translateY(10px) scale(0.98)',
        left: position.left,
        bottom: `calc(${position.bottom} + 0.5cm)`, // Position 0.5cm above the chat bar
        zIndex: 9998,
        backdropFilter: 'blur(0px)', // No blur for full transparency
        pointerEvents: isChatVisible ? 'auto' : 'none',
        willChange: 'transform, opacity, left, bottom'
      }}
      role="log"
      aria-live="polite"
      aria-label="Chat messages"
      onClick={(e) => e.stopPropagation()}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {children}
    </div>
  );
});

MessageContainer.displayName = 'MessageContainer';

export default MessageContainer;
