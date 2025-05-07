
import React, { RefObject } from 'react';
import ChatInput from './chat/ChatInput';
import SendButton from './chat/SendButton';

interface ChatInputAreaProps {
  message: string;
  setMessage: (message: string) => void;
  isLoading: boolean;
  onSend: (e: React.MouseEvent) => void;
  sendMessage: () => void;
  placeholderText: string;
  messageInputRef: RefObject<HTMLInputElement>;
}

/**
 * Component that handles the chat input and send button
 */
const ChatInputArea: React.FC<ChatInputAreaProps> = ({
  message,
  setMessage,
  isLoading,
  onSend,
  sendMessage,
  placeholderText,
  messageInputRef
}) => {
  return (
    <>
      <ChatInput
        message={message}
        setMessage={setMessage}
        isLoading={isLoading}
        onSend={sendMessage}
        placeholderText={placeholderText}
        inputRef={messageInputRef}
      />
      <SendButton 
        onClick={onSend}
        isLoading={isLoading}
        message={message}
      />
    </>
  );
};

export default ChatInputArea;
