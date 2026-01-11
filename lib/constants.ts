/**
 * Application constants
 * Centralized location for magic numbers and strings
 */

// Chat configuration constants
export const CHAT_CONSTANTS = {
  MAX_MESSAGES_IN_HISTORY: 10,
  MAX_STORED_MESSAGES: 100,
  DEFAULT_CHAT_TITLE_LENGTH: 50,
  TITLE_TRUNCATE_LENGTH: 47,
} as const;

// API configuration constants
export const API_CONSTANTS = {
  DEFAULT_TIMEOUT: 30000, // 30 seconds
  MAX_RETRIES: 3,
  RETRY_DELAY: 1000, // 1 second
} as const;

// Storage keys
export const STORAGE_KEYS = {
  THEME: 'theme',
  CHAT_DATA: 'chat-data',
} as const;

// Validation constants
export const VALIDATION_CONSTANTS = {
  MIN_TOP_K: 1,
  MAX_TOP_K: 100,
  MIN_TEMPERATURE: 0,
  MAX_TEMPERATURE: 2,
  MIN_THRESHOLD: 0,
  MAX_THRESHOLD: 1,
} as const;

// File system constants
export const FILE_CONSTANTS = {
  MAX_CONFIG_SIZE: 1024 * 1024, // 1MB
  CONFIG_DIR: 'config',
  CONFIG_FILE: 'appearance.json',
} as const;

