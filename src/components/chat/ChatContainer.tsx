
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

  return (
    <div 
      className={`animate-fade-in ${isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
      style={{
        position: 'fixed',
        width: isMobile ? 'min(350px, 95%)' : 'min(400px, 95%)', // Increased width
        height: '50px',
        display: 'flex',
        alignItems: 'center',
        backgroundColor: 'rgba(31, 31, 46, 0)', // Fully transparent background
        backdropFilter: 'blur(8px)',
        border: '1px solid rgba(255, 255, 255, 0.15)',
        borderRadius: '16px',
        padding: '10px',
        boxShadow: isHovering 
          ? '0 8px 20px rgba(0, 0, 0, 0.35), 0 0 10px rgba(156, 139, 255, 0.2)' 
          : '0 4px 15px rgba(0, 0, 0, 0.25)',
        left: `${position.x}px`,
        top: `${position.y}px`,
        zIndex: 9999,
        cursor: isDragging ? 'grabbing' : 'grab',
        transition: isDragging 
          ? 'none' 
          : 'background-color 0.3s ease, box-shadow 0.3s ease, transform 0.2s ease, opacity 0.3s ease',
        transform: isHovering && !isDragging ? 'scale(1.02)' : 'scale(1)',
        willChange: 'transform, left, top, opacity',
        touchAction: 'none' // Critical for preventing default touch actions
      }}
      onMouseDown={handleMouseDown}
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
