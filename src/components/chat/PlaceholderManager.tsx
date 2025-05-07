
import { useState } from 'react';

export const usePlaceholderRotation = () => {
  // Use a static placeholder instead of rotating through multiple options
  const staticPlaceholder = "Tell me what you want to automate";
  
  return {
    currentPlaceholder: staticPlaceholder
  };
};
