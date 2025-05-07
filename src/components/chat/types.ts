
export interface ChatInputProps {
  message: string;
  setMessage: (message: string) => void;
  isLoading: boolean;
  onSend: () => void;
  placeholderText: string;
  inputRef: React.RefObject<HTMLInputElement>;
}

export interface SendButtonProps {
  onClick: (e: React.MouseEvent) => void;
  isLoading: boolean;
  message: string;
}

export interface ChatBarProps {
  position: { x: number; y: number };
  isDragging: boolean;
  isVisible: boolean;
  handleMouseDown: (e: React.MouseEvent) => void;
  isChatVisible: boolean;
  setIsChatVisible: (visible: boolean) => void;
  isHovering: boolean;
  onHoverChange: (hovering: boolean) => void;
  handleVisibilityEvents: {
    handleMouseEnter: () => void;
    handleMouseLeave: () => void;
  };
}

export interface MessageContainerProps {
  children: React.ReactNode;
  isChatVisible: boolean;
  position: { left: string; bottom: string };
  isMobile: boolean;
}

export interface ChatMessageItemProps {
  message: ChatMessage;
}

export interface ChatMessage {
  id: string;
  text: string;
  sender: 'user' | 'system';
}

export interface ChatInputAreaProps {
  message: string;
  setMessage: (message: string) => void;
  isLoading: boolean;
  onSend: (e: React.MouseEvent) => void;
  sendMessage: () => void;
  placeholderText: string;
  messageInputRef: React.RefObject<HTMLInputElement>;
}

export interface ChatMessagesWindowProps {
  messages: ChatMessage[];
  isChatVisible: boolean;
  isChatHistoryVisible: boolean;
  position: { x: number; y: number };
  isHovering: boolean;
  isUserInteracting: boolean;
  handleChatMessagesMouseEnter: () => void;
  handleChatMessagesMouseLeave: () => void;
}
