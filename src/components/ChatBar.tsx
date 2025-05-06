
import React, { useRef, useState, useEffect } from 'react';
import { Send } from 'lucide-react';
import { useChatState } from '@/hooks/chat'; // Updated import path
import { useDraggable } from '@/hooks/draggable'; // Updated import path
import { useIsMobile } from '@/hooks/use-mobile';
import ChatMessages from './ChatMessages';

const ChatBar: React.FC = () => {
  const messageInputRef = useRef<HTMLInputElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const isMobile = useIsMobile();
  
  const placeholders = [
    "Ask me anything about your workflow...",
    "How can I automate guest follow-ups?",
    "Can you help me build a hotel receptionist AI?",
    "What's a good WhatsApp integration for bookings?",
    "Show me an example of a classified email workflow."
  ];
  
  // Rotate placeholders every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setPlaceholderIndex((current) => (current + 1) % placeholders.length);
    }, 3000);
    
    return () => clearInterval(interval);
  }, []);
  
  const {
    message,
    setMessage,
    isChatVisible,
    setIsChatVisible,
    messages,
    isLoading,
    sendMessage,
    handleVisibility
  } = useChatState();
  
  // Initialize useDraggable with centered position above footer
  const {
    elementRef,
    position,
    isDragging,
    isVisible,
    handleMouseDown
  } = useDraggable({ 
    autoHideOnScroll: true 
  });
  
  const { handleMouseEnter, handleMouseLeave } = handleVisibility();
  
  // Handle Enter key press
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };

  // Handle send button click
  const handleSend = () => {
    sendMessage();
    // Focus back on input
    if (messageInputRef.current) {
      messageInputRef.current.focus();
    }
  };

  // Handle hover state - ensure chat stays visible when hovering
  const handleHover = (hovering: boolean) => {
    setIsHovering(hovering);
    if (hovering) {
      setIsChatVisible(true);
    }
  };
  
  // Reset hover timeout to prevent chat from disappearing while user is interacting
  useEffect(() => {
    // Force chat visible when hovering
    if (isHovering) {
      setIsChatVisible(true);
    }
  }, [isHovering, setIsChatVisible]);
  
  return (
    <>
      {/* Chat Messages Display */}
      <ChatMessages 
        messages={messages} 
        isChatVisible={isChatVisible || isHovering} 
        position={position} 
      />
      
      {/* Chat Input Bar - Main draggable element */}
      <div 
        ref={elementRef}
        className={`animate-fade-in ${isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        style={{
          position: 'fixed',
          width: isMobile ? 'min(280px, 90%)' : 'min(320px, 90%)',
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
          handleHover(true);
          handleMouseEnter();
        }}
        onMouseLeave={() => {
          handleHover(false);
          handleMouseLeave();
        }}
        aria-label="Chat assistant"
        role="region"
      >
        <input
          ref={messageInputRef}
          type="text"
          placeholder={placeholders[placeholderIndex]}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          style={{
            width: 'calc(100% - 40px)',
            height: '100%',
            padding: '0 15px',
            fontSize: '14px',
            fontWeight: 400,
            border: 'none',
            borderRadius: '12px 0 0 12px',
            outline: 'none',
            backgroundColor: 'rgba(31, 31, 46, 0.75)',
            color: '#ffffff',
            cursor: 'text', // Always show text cursor in the input field
            textShadow: '0 1px 2px rgba(0,0,0,0.5)' // Add text shadow for better visibility
          }}
          disabled={isLoading}
          onClick={(e) => e.stopPropagation()} // Prevent dragging when clicking input
          onMouseDown={(e) => {
            e.stopPropagation(); // Critical fix: prevent mousedown from being captured by parent
            e.preventDefault(); // Prevent any default behavior
          }}
          onTouchStart={(e) => {
            e.stopPropagation(); // Critical fix: prevent touchstart from being captured by parent
          }}
          aria-label="Chat message input"
        />
        <button
          onClick={(e) => {
            e.stopPropagation(); // Prevent dragging when clicking button
            handleSend();
          }}
          onMouseDown={(e) => {
            e.stopPropagation(); // Critical fix: prevent mousedown from being captured by parent
            e.preventDefault(); // Prevent any default behavior
          }}
          onTouchStart={(e) => {
            e.stopPropagation(); // Critical fix: prevent touchstart from being captured by parent
          }}
          style={{
            width: '40px',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgba(31, 31, 46, 0.75)',
            color: isLoading ? '#555555' : '#4CAF50',
            border: 'none',
            borderRadius: '0 12px 12px 0',
            cursor: isLoading ? 'wait' : 'pointer',
            fontSize: '16px',
            transition: 'color 0.2s ease, transform 0.2s ease',
            transform: message.length > 0 ? 'scale(1.1)' : 'scale(1)',
            textShadow: '0 1px 2px rgba(0,0,0,0.5)' // Add text shadow for better visibility
          }}
          disabled={isLoading}
          aria-label="Send message"
        >
          <Send size={18} />
        </button>
      </div>
    </>
  );
};

export default ChatBar;
