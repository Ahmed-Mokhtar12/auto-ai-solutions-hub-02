import React, { createContext, useContext, useState, useRef, useCallback } from 'react';

interface ChatFocusContextType {
  isChatFocused: boolean;
  setIsChatFocused: (val: boolean) => void;
}

const ChatFocusContext = createContext<ChatFocusContextType>({
  isChatFocused: false,
  setIsChatFocused: () => {},
});

export const ChatFocusProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isChatFocused, setIsChatFocusedState] = useState(false);
  const blurTimerRef = useRef<NodeJS.Timeout | null>(null);

  const setIsChatFocused = useCallback((val: boolean) => {
    if (val) {
      // Immediately focus — cancel any pending blur
      if (blurTimerRef.current) {
        clearTimeout(blurTimerRef.current);
        blurTimerRef.current = null;
      }
      setIsChatFocusedState(true);
    } else {
      // Delay blur by 800ms grace period
      if (blurTimerRef.current) clearTimeout(blurTimerRef.current);
      blurTimerRef.current = setTimeout(() => {
        setIsChatFocusedState(false);
      }, 800);
    }
  }, []);

  return (
    <ChatFocusContext.Provider value={{ isChatFocused, setIsChatFocused }}>
      {children}
    </ChatFocusContext.Provider>
  );
};

export const useChatFocus = () => useContext(ChatFocusContext);
