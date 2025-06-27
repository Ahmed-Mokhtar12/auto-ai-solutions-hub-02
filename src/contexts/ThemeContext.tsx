
import React, { createContext, useContext, useState, useEffect } from 'react';

interface ThemeContextType {
  isDayMode: boolean;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isDayMode, setIsDayMode] = useState(() => {
    // Initialize from localStorage or default to false (night mode)
    const savedTheme = localStorage.getItem('isDayMode');
    return savedTheme ? JSON.parse(savedTheme) : false;
  });

  const toggleTheme = () => {
    setIsDayMode(!isDayMode);
  };

  useEffect(() => {
    // Save theme preference to localStorage
    localStorage.setItem('isDayMode', JSON.stringify(isDayMode));
    
    // Apply theme to document root
    if (isDayMode) {
      document.documentElement.classList.remove('dark');
      document.documentElement.classList.add('light');
    } else {
      document.documentElement.classList.remove('light');
      document.documentElement.classList.add('dark');
    }
  }, [isDayMode]);

  return (
    <ThemeContext.Provider value={{ isDayMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
