export const colors = {
  // Background colors
  background: '#f8f8f8',
  backgroundLight: '#f0f0f0',
  white: '#ffffff',

  // Text colors
  textPrimary: '#222222',
  textSecondary: '#666666',
  textTertiary: '#888888',

  // Card and component colors
  cardBackground: '#ffffff',
  cardBackgroundLight: '#e9e9e9',
  cardActive: '#333333',

  // Button colors
  buttonPrimary: '#007AFF',

  // Status colors
  error: '#ff0000',
  success: '#4CAF50',

  // Shadow colors
  shadow: '#000000',

  // Map and location colors
  mapBackground: '#f8f8f8',
} as const;

export type Colors = typeof colors;
