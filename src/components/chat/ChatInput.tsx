import React, { useEffect } from 'react';
import { cn } from '@/lib/utils';

interface ChatInputProps {
  message: string;
  setMessage: (message: string) => void;
  isLoading: boolean;
  onSend: () => void;
  placeholderText: string;
  inputRef: React.RefObject<HTMLTextAreaElement>;
}

const ChatInput: React.FC<ChatInputProps> = ({
  message,
  setMessage,
  isLoading,
  onSend,
  placeholderText,
  inputRef
}) => {
  const autoResize = (el: HTMLTextAreaElement) => {
    el.style.height = 'auto';
    el.style.height = `${Math.min(el.scrollHeight, 120)}px`;
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
    autoResize(e.target);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey && message.trim()) {
      e.preventDefault();
      onSend();
    }
  };

  // Reset height when message is cleared (after send)
  useEffect(() => {
    if (!message && inputRef.current) {
      inputRef.current.style.height = 'auto';
    }
  }, [message, inputRef]);

  return (
    <textarea
      ref={inputRef}
      rows={1}
      placeholder={isLoading ? "AI is thinking... you can still type" : placeholderText}
      value={message}
      onChange={handleChange}
      onKeyDown={handleKeyDown}
      aria-label="Chat message input"
      className={cn(
        "flex-1 resize-none overflow-y-auto",
        "rounded-l-xl border-none bg-background/75 backdrop-blur-md text-foreground",
        "shadow-inner focus-visible:outline-none focus-visible:ring-0",
        "px-3 py-3 text-sm placeholder:text-muted-foreground",
        "leading-relaxed"
      )}
      style={{
        minHeight: '44px',
        maxHeight: '120px',
      }}
    />
  );
};

export default ChatInput;
