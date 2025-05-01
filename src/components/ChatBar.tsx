
import React, { useRef, useState, useEffect } from 'react';
import { Send } from 'lucide-react';

const ChatBar: React.FC = () => {
  const [message, setMessage] = useState('');
  const [isChatVisible, setIsChatVisible] = useState(false);
  const [messages, setMessages] = useState<{ text: string; sender: 'user' | 'system' }[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [initialMousePos, setInitialMousePos] = useState({ x: 0, y: 0 });
  
  const chatBarRef = useRef<HTMLDivElement>(null);
  const chatWindowRef = useRef<HTMLDivElement>(null);
  const messageInputRef = useRef<HTMLInputElement>(null);
  
  // Initialize position to bottom right
  useEffect(() => {
    if (chatBarRef.current) {
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;
      const chatBarWidth = 320; // As per specifications
      const chatBarHeight = 50; // As per specifications
      
      setPosition({
        x: viewportWidth - chatBarWidth - 20,
        y: viewportHeight - chatBarHeight - 20
      });
    }
  }, []);

  // Handle resize events to keep the chat bar inside viewport
  useEffect(() => {
    const handleResize = () => {
      if (chatBarRef.current) {
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;
        const chatBarWidth = chatBarRef.current.offsetWidth;
        const chatBarHeight = chatBarRef.current.offsetHeight;
        
        setPosition(prevPos => ({
          x: Math.min(prevPos.x, viewportWidth - chatBarWidth),
          y: Math.min(prevPos.y, viewportHeight - chatBarHeight)
        }));
      }
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  // Handle mouse events for dragging
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setInitialMousePos({ 
      x: e.clientX - position.x, 
      y: e.clientY - position.y 
    });
  };
  
  // Global mouse move and up handlers
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging && chatBarRef.current) {
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;
        const chatBarWidth = chatBarRef.current.offsetWidth;
        const chatBarHeight = chatBarRef.current.offsetHeight;
        
        // Calculate new position
        let newX = e.clientX - initialMousePos.x;
        let newY = e.clientY - initialMousePos.y;
        
        // Constrain to viewport
        newX = Math.max(0, Math.min(newX, viewportWidth - chatBarWidth));
        newY = Math.max(0, Math.min(newY, viewportHeight - chatBarHeight));
        
        setPosition({ x: newX, y: newY });
      }
    };
    
    const handleMouseUp = () => {
      setIsDragging(false);
    };
    
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, initialMousePos, position]);
  
  // Send the message
  const sendMessage = async () => {
    if (!message.trim()) return;
    
    // Add message to chat
    setMessages(prev => [...prev, { text: message, sender: 'user' }]);
    
    try {
      // Send to webhook
      await fetch('https://your.webhook/endpoint', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message }),
      });
      
      // Clear input
      setMessage('');
      
      // Optional: Add system response
      // setMessages(prev => [...prev, { text: 'Message received!', sender: 'system' }]);
      
    } catch (error) {
      console.error('Error sending message:', error);
    }
    
    // Focus back on input
    if (messageInputRef.current) {
      messageInputRef.current.focus();
    }
  };
  
  // Handle Enter key press
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };
  
  return (
    <>
      {/* Chat Window */}
      <div 
        ref={chatWindowRef}
        style={{
          position: 'fixed',
          width: '300px',
          maxHeight: '400px',
          overflowY: 'auto',
          backgroundColor: 'rgba(0, 0, 0, 0.0)', // Fully transparent
          backdropFilter: 'blur(5px)',
          border: '1px solid rgba(255, 255, 255, 0.2)', 
          borderRadius: '8px',
          padding: '10px',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
          transition: 'opacity 0.3s, transform 0.3s',
          opacity: isChatVisible ? 1 : 0,
          visibility: isChatVisible ? 'visible' : 'hidden',
          transform: isChatVisible ? 'translateY(0)' : 'translateY(10px)',
          left: `${position.x}px`,
          bottom: `${window.innerHeight - position.y + 10}px`,
          zIndex: 9998
        }}
        onMouseEnter={() => setIsChatVisible(true)}
        onMouseLeave={() => setIsChatVisible(false)}
      >
        {messages.map((msg, index) => (
          <div
            key={index}
            style={{
              padding: '8px 12px',
              borderRadius: '8px',
              marginBottom: '8px',
              maxWidth: '80%',
              wordWrap: 'break-word',
              backgroundColor: msg.sender === 'user' ? '#e6f7ff' : 'rgba(241, 241, 241, 0.7)',
              color: '#000',
              alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start',
              marginLeft: msg.sender === 'user' ? 'auto' : '0',
              display: 'block'
            }}
          >
            {msg.text}
          </div>
        ))}
      </div>
      
      {/* Chat Bar */}
      <div 
        ref={chatBarRef}
        style={{
          position: 'fixed',
          width: '320px',
          height: '50px',
          display: 'flex',
          backgroundColor: '#1A1F2C', // Dark background matching the image
          border: '1px solid rgba(255, 255, 255, 0.1)', // Subtle border
          borderRadius: '8px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          left: `${position.x}px`,
          top: `${position.y}px`,
          zIndex: 9999,
          cursor: isDragging ? 'grabbing' : 'grab'
        }}
        onMouseDown={handleMouseDown}
        onMouseEnter={() => setIsChatVisible(true)}
        onMouseLeave={(e) => {
          // Only hide if not hovering over chat window
          if (!chatWindowRef.current?.contains(e.relatedTarget as Node)) {
            setIsChatVisible(false);
          }
        }}
      >
        <input
          ref={messageInputRef}
          type="text"
          placeholder="Ask me anything about your workflow..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          style={{
            width: 'calc(100% - 40px)', // Adjusted for smaller send button
            height: '100%',
            padding: '0 15px',
            fontSize: '14px',
            border: 'none',
            borderRadius: '8px 0 0 8px',
            outline: 'none',
            backgroundColor: 'transparent',
            color: '#ffffff' // White text
          }}
        />
        <button
          onClick={sendMessage}
          style={{
            width: '40px',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'transparent',
            color: '#4CAF50', // Green color for the icon
            border: 'none',
            borderRadius: '0 8px 8px 0',
            cursor: 'pointer',
            fontSize: '16px'
          }}
        >
          <Send size={18} />
        </button>
      </div>
    </>
  );
};

export default ChatBar;
