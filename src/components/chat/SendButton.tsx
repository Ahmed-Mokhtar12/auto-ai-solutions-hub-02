
import React from 'react';
import { Send } from 'lucide-react';
import { SendButtonProps } from './types';

const SendButton: React.FC<SendButtonProps> = ({ onClick, isLoading, message }) => {
  return (
    <button
      onClick={onClick}
      onMouseDown={(e) => {
        e.stopPropagation();
        e.preventDefault();
      }}
      onTouchStart={(e) => {
        e.stopPropagation();
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
        textShadow: '0 1px 2px rgba(0,0,0,0.5)'
      }}
      disabled={isLoading}
      aria-label="Send message"
    >
      <Send size={18} />
    </button>
  );
};

export default SendButton;
