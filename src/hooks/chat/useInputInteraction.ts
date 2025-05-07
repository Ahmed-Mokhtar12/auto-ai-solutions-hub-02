
import { useEffect, RefObject } from 'react';

interface UseInputInteractionProps {
  messageInputRef: RefObject<HTMLInputElement>;
  elementRef: RefObject<HTMLDivElement>;
  setIsUserInteracting: (interacting: boolean) => void;
  setIsChatHistoryVisible: (visible: boolean) => void;
  isChatVisible: boolean;
  isHovering: boolean;
}

/**
 * Hook to manage input focus and interaction state
 */
export const useInputInteraction = ({
  messageInputRef,
  elementRef,
  setIsUserInteracting,
  setIsChatHistoryVisible,
  isChatVisible,
  isHovering
}: UseInputInteractionProps) => {
  
  // Focus input when chat becomes visible
  useEffect(() => {
    if (isChatVisible && messageInputRef.current) {
      setTimeout(() => {
        messageInputRef.current?.focus();
      }, 100);
    }
  }, [isChatVisible, messageInputRef]);

  // Set up chat input focus and blur events
  useEffect(() => {
    const inputElement = messageInputRef.current;
    
    const handleFocus = () => {
      setIsUserInteracting(true);
      setIsChatHistoryVisible(true); // Show history when input is focused
    };
    
    const handleBlur = () => {
      // Don't immediately turn off interaction on blur
      // as user might be clicking elsewhere in chat
      setTimeout(() => {
        if (!isHovering) {
          setIsUserInteracting(false);
        }
      }, 100);
    };
    
    // Handle clicks on the chat bar to show history
    const handleChatBarClick = () => {
      setIsChatHistoryVisible(true);
      setIsUserInteracting(true);
    };
    
    if (inputElement) {
      inputElement.addEventListener('focus', handleFocus);
      inputElement.addEventListener('blur', handleBlur);
    }
    
    // Add click handler to the chat bar element
    if (elementRef.current) {
      elementRef.current.addEventListener('click', handleChatBarClick);
    }
    
    return () => {
      if (inputElement) {
        inputElement.removeEventListener('focus', handleFocus);
        inputElement.removeEventListener('blur', handleBlur);
      }
      if (elementRef.current) {
        elementRef.current.removeEventListener('click', handleChatBarClick);
      }
    };
  }, [setIsUserInteracting, isHovering, setIsChatHistoryVisible, elementRef, messageInputRef]);
};
