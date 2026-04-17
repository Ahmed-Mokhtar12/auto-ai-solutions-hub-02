
// Utility functions for handling messages

/**
 * Generate a unique ID for messages
 */
export const generateMessageId = (): string => {
  return Date.now().toString() + Math.random().toString(36).substring(2);
};

/**
 * Message type definition
 */
export interface ChatCta {
  label: string;
  url: string;
}

export interface ChatMessage {
  text: string;
  sender: 'user' | 'system';
  id: string;
  cta?: ChatCta;
}
