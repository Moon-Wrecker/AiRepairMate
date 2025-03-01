// src/theme/theme.js

export const colors = {
  primary: '#E53935', // Red
  secondary: '#757575', // Grey
  background: '#FFFFFF', // White
  surface: '#FFF5F5', // Light Red Tint
  text: { primary: '#212121', secondary: '#757575', inverse: '#FFFFFF' },
  button: { primary: '#E53935', secondary: '#FFEBEE' },
  border: '#FFCDD2',
  error: '#D50000',
  success: '#4CAF50',
  loading: '#E53935',
};

export const typography = {
  sizes: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 18,
    xl: 24,
  },
  weights: {
    regular: '400',
    medium: '500',
    bold: '700',
  },
};

export const spacing = {
  xs: 5,
  sm: 10,
  md: 15,
  lg: 20,
  xl: 30,
};

export const borderRadius = {
  sm: 5,
  md: 10,
  lg: 15,
};

export const shadows = {
  light: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  medium: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
};

const theme = {
  colors,
  typography,
  spacing,
  borderRadius,
  shadows,
};

export default theme;