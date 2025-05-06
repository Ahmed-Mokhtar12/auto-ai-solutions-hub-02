
import React from 'react';
import { ChatInputProps } from './types';

const ChatInput: React.FC<ChatInputProps> = ({
  message,
  setMessage,
  isLoading,
  onSend,
  placeholderText,
  inputRef
}) => {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      onSend();
    }
  };

  return (
    <input
      ref={inputRef}
      type="text"
      placeholder={placeholderText}
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
        cursor: 'text',
        textShadow: '0 1px 2px rgba(0,0,0,0.5)'
      }}
      disabled={isLoading}
      onClick={(e) => e.stopPropagation()}
      onMouseDown={(e) => {
        e.stopPropagation();
        e.preventDefault();
      }}
      onTouchStart={(e) => {
        e.stopPropagation();
      }}
      aria-label="Chat message input"
    />
  );
};

export default ChatInput;
