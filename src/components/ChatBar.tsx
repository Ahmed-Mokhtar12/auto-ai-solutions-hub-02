
import React, { useRef, useState, useEffect } from 'react';
import { Send } from 'lucide-react';
import { useChatState } from '@/hooks/useChatState';
import { useDraggable } from '@/hooks/useDraggable';
import ChatMessages from './ChatMessages';

const ChatBar: React.FC = () => {
  const messageInputRef = useRef<HTMLInputElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  
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
  
  // Initialize useDraggable with a better default position
  const {
    elementRef,
    position,
    isDragging,
    handleMouseDown
  } = useDraggable();
  
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
  
  return (
    <>
      {/* Chat Messages Display */}
      <ChatMessages 
        messages={messages} 
        isChatVisible={isChatVisible || isHovering} 
        position={position} 
      />
      
      {/* Chat Input Bar */}
      <div 
        ref={elementRef}
        style={{
          position: 'fixed',
          width: '320px',
          height: '50px',
          display: 'flex',
          backgroundColor: isHovering ? 'rgba(26, 31, 44, 0.8)' : 'rgba(26, 31, 44, 0.6)',
          backdropFilter: 'blur(8px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          borderRadius: '8px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          left: `${position.x}px`,
          top: `${position.y}px`,
          zIndex: 9999,
          cursor: isDragging ? 'grabbing' : 'grab',
          transition: isDragging ? 'none' : 'background-color 0.3s ease',
          transform: 'translate(0, 0)', // Improve GPU rendering
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
            border: 'none',
            borderRadius: '8px 0 0 8px',
            outline: 'none',
            backgroundColor: 'transparent',
            color: '#ffffff',
            cursor: 'text' // Always show text cursor in the input field
          }}
          disabled={isLoading}
          onClick={(e) => e.stopPropagation()} // Prevent dragging when clicking input
        />
        <button
          onClick={(e) => {
            e.stopPropagation(); // Prevent dragging when clicking button
            handleSend();
          }}
          style={{
            width: '40px',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'transparent',
            color: isLoading ? '#555555' : '#4CAF50',
            border: 'none',
            borderRadius: '0 8px 8px 0',
            cursor: isLoading ? 'wait' : 'pointer',
            fontSize: '16px'
          }}
          disabled={isLoading}
        >
          <Send size={18} />
        </button>
      </div>
    </>
  );
};

export default ChatBar;
