
import { useState, useEffect } from 'react';

const PLACEHOLDER_ROTATION_INTERVAL = 3000;

export const usePlaceholderRotation = () => {
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  
  const placeholders = [
    "Ask me anything about your workflow...",
    "How can I automate guest follow-ups?",
    "Can you help me build a hotel receptionist AI?",
    "What's a good WhatsApp integration for bookings?",
    "Show me an example of a classified email workflow."
  ];
  
  // Rotate placeholders every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setPlaceholderIndex((current) => (current + 1) % placeholders.length);
    }, PLACEHOLDER_ROTATION_INTERVAL);
    
    return () => clearInterval(interval);
  }, []);
  
  return {
    currentPlaceholder: placeholders[placeholderIndex]
  };
};
