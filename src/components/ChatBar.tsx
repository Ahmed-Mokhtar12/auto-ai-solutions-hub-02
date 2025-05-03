
import React, { useRef } from 'react';
import { Send } from 'lucide-react';
import { useChatState } from '@/hooks/useChatState';
import ChatMessages from './ChatMessages';

const ChatBar: React.FC = () => {
  const messageInputRef = useRef<HTMLInputElement>(null);
  
  const {
    message,
    setMessage,
    isChatVisible,
    messages,
    isLoading,
    sendMessage,
    handleVisibility,
    position
  } = useChatState();
  
  const { handleMouseEnter, handleMouseLeave } = handleVisibility();
  
  // Handle Enter key press
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };

  // Focus input after sending a message
  const handleSend = () => {
    sendMessage();
    // Focus back on input
    if (messageInputRef.current) {
      messageInputRef.current.focus();
    }
  };
  
  return (
    <>
      {/* Chat Messages Display */}
      <ChatMessages 
        messages={messages} 
        isChatVisible={isChatVisible} 
        position={position} 
      />
      
      {/* Chat Input Bar */}
      <div 
        style={{
          position: 'fixed',
          width: '320px',
          height: '50px',
          display: 'flex',
          backgroundColor: '#1A1F2C',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          borderRadius: '8px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          right: '20px',
          bottom: '120px', // 1 inch (approximately 96px) above footer
          zIndex: 9999,
          cursor: 'pointer'
        }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <input
          ref={messageInputRef}
          type="text"
          placeholder="Ask me anything about your workflow..."
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
            color: '#ffffff'
          }}
          disabled={isLoading}
        />
        <button
          onClick={handleSend}
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
