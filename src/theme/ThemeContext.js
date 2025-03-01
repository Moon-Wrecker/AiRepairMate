// src/theme/ThemeContext.js
import React, { createContext, useContext } from 'react';
import theme from './theme';

// Create theme context
export const ThemeContext = createContext(theme);

// Custom hook to use theme
export const useTheme = () => {
  const theme = useContext(ThemeContext);
  if (!theme) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return theme;
};

// Theme provider component
export const ThemeProvider = ({ children }) => {
  return (
    <ThemeContext.Provider value={theme}>
      {children}
    </ThemeContext.Provider>
  );
}; 