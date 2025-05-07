
import React from 'react';
import { ChatInputProps } from './types';
import { Input } from "@/components/ui/input";

const ChatInput: React.FC<ChatInputProps> = ({
  message,
  setMessage,
  isLoading,
  onSend,
  placeholderText,
  inputRef
}) => {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && message.trim()) {
      e.preventDefault();
      onSend();
    }
  };

  return (
    <Input
      ref={inputRef}
      type="text"
      placeholder={isLoading ? "AI is thinking... you can still type" : placeholderText}
      value={message}
      onChange={(e) => setMessage(e.target.value)}
      onKeyDown={handleKeyDown}
      className="rounded-r-none rounded-l-xl border-none bg-background/75 backdrop-blur-md text-foreground flex-1 shadow-inner focus-visible:ring-offset-0"
      aria-label="Chat message input"
    />
  );
};

export default ChatInput;
