
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
      className={cn(
        "fixed rounded-lg border border-white/10 shadow-lg",
        isChatVisible ? "animate-enter" : "animate-exit"
      )}
      style={{
        position: 'fixed',
        width: isMobile ? '350px' : '400px',
        height: '220px', // Exactly 15cm
        maxHeight: '220px', // Ensure it doesn't exceed this height
        left: position.left,
        bottom: `calc(${position.bottom} + 0.5cm)`, // Position exactly 0.5cm above chat bar
        backgroundColor: 'transparent', // Fully transparent background
        backdropFilter: 'blur(8px)', // Keep blur for readability of text
        border: '1px solid rgba(255, 255, 255, 0.1)',
        borderRadius: '12px',
        padding: '10px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)', // Lighter shadow
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        opacity: isChatVisible ? 1 : 0,
        visibility: isChatVisible ? 'visible' : 'hidden',
        transform: isChatVisible ? 'translateY(0) scale(1)' : 'translateY(10px) scale(0.98)',
        zIndex: 9998,
        pointerEvents: isChatVisible ? 'auto' : 'none',
        willChange: 'transform, opacity, left, bottom',
        overflowY: 'hidden', // Hide native overflow
      }}
      onClick={(e) => e.stopPropagation()}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      role="log"
      aria-live="polite"
      aria-label="Chat messages"
    >
      <ScrollArea className="h-full w-full pr-2">
        <div 
          ref={messagesContainerRef}
          className="h-full flex flex-col space-y-2"
        >
          {children}
        </div>
      </ScrollArea>
    </div>
  );
});

MessageContainer.displayName = 'MessageContainer';

export default MessageContainer;
