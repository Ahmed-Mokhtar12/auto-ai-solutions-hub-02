
import React from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import { ChatBarProps } from './types';

interface ChatContainerProps extends ChatBarProps {
  children: React.ReactNode;
}

const ChatContainer: React.FC<ChatContainerProps> = ({
  children,
  position,
  isDragging,
  isVisible,
  handleMouseDown,
  isChatVisible,
  setIsChatVisible,
  isHovering,
  onHoverChange,
  handleVisibilityEvents
}) => {
  const isMobile = useIsMobile();

  // Handle both mouse and touch events properly
  const handleDragStart = (e: React.MouseEvent | React.TouchEvent) => {
    // Force type to any to bypass TypeScript's strict checking
    // This is safe because handleMouseDown already handles both event types
    handleMouseDown(e as any);
  };

  return (
    <div 
      className={`animate-fade-in ${isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
      style={{
        position: 'fixed',
        width: isMobile ? 'min(350px, 95%)' : 'min(400px, 95%)',
        height: '50px',
        display: 'flex',
        alignItems: 'center',
        backgroundColor: isHovering ? 'rgba(31, 31, 46, 0.9)' : 'rgba(31, 31, 46, 0)',
        backdropFilter: 'blur(8px)',
        border: '1px solid rgba(255, 255, 255, 0.15)',
        borderRadius: '16px',
        padding: '10px',
        boxShadow: 'none', // Remove any shadow
        left: `${position.x}px`,
        top: `${position.y}px`,
        zIndex: 9999,
        cursor: isDragging ? 'grabbing' : 'grab',
        transition: isDragging 
          ? 'none' // No transition during dragging for immediate feedback
          : 'background-color 0.3s ease, transform 0.2s ease, opacity 0.3s ease',
        transform: isHovering && !isDragging ? 'scale(1.02)' : 'scale(1)',
        willChange: 'transform, left, top, opacity',
        touchAction: 'none',
        userSelect: 'none', // Prevent text selection during drag
        WebkitUserSelect: 'none', // For Safari support
      }}
      onMouseDown={handleDragStart}
      onTouchStart={handleDragStart}
      onMouseEnter={() => {
        onHoverChange(true);
        handleVisibilityEvents.handleMouseEnter();
      }}
      onMouseLeave={() => {
        onHoverChange(false);
        handleVisibilityEvents.handleMouseLeave();
      }}
      aria-label="Chat assistant"
      role="region"
    >
      {children}
    </div>
  );
};

export default ChatContainer;
