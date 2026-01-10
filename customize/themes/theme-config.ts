/**
 * Main Theme Configuration
 *
 * This file now reads theme settings from appearance.json.
 * Edit the appearance.json file to change your application's theme settings.
 */

import appearanceConfig from '../../config/appearance.json';

export type ThemeName = 'light' | 'dark' | 'blue' | 'green' | 'system' | string;

export interface ThemeConfig {
  /** The default theme to use when the app loads */
  defaultTheme: ThemeName;

  /** Enable automatic system theme detection (light/dark) */
  enableSystemTheme: boolean;

  /** Show theme toggle button in the UI */
  enableThemeToggle: boolean;

  /** Store theme preference in localStorage */
  persistTheme: boolean;

  /** Available themes for the theme switcher */
  availableThemes: ThemeName[];

  /** Theme display names for the UI */
  themeLabels: Record<string, string>;

  /** Animation duration for theme transitions (in ms) */
  transitionDuration: number;
}

/**
 * MAIN THEME CONFIGURATION
 *
 * Theme settings are now loaded from appearance.json
 * The appearance.json file contains the defaultTheme setting.
 * 🔥 IMPORTANT: Changes to defaultTheme in appearance.json will immediately take effect across your entire app!
 * The system will automatically update localStorage and apply the new theme.
 */
export const themeConfig: ThemeConfig = {
  // Default theme loaded from appearance.json - CHANGE THIS IN appearance.json TO SWITCH YOUR APP'S THEME
  defaultTheme: appearanceConfig.theme?.defaultTheme || 'slate', // Options: 'light', 'dark', 'blue', 'green', 'system', or custom theme name
  
  // System theme detection
  enableSystemTheme: true, // Auto-detect user's system preference (light/dark)
  
  // Theme switcher UI
  enableThemeToggle: true, // Show theme selector in your app
  
  // Theme persistence
  persistTheme: true, // Remember user's theme choice
  
  // Available themes in theme switcher
  availableThemes: [
    'light',
    'dark', 
    'blue',
    'green',
    'purple',
    'orange',
    'red',
    'pink',
    'yellow',
    'teal',
    'indigo',
    'rose',
    'emerald',
    'amber',
    'system',
    'coral',
    'slate'
  ],
  
  // Theme display names (shown in UI)
  themeLabels: {
    light: 'Light',
    dark: 'Dark',
    blue: 'Ocean Blue',
    green: 'Nature Green',
    purple: 'Purple Dream',
    orange: 'Sunset Orange',
    red: 'Ruby Red',
    pink: 'Blossom Pink',
    yellow: 'Golden Yellow',
    teal: 'Aqua Teal',
    indigo: 'Deep Indigo',
    rose: 'Rose Garden',
    emerald: 'Emerald Forest',
    amber: 'Warm Amber',
    system: 'System',
    coral: 'Coral',
    slate: 'Slate',
  },
  
  // Animation settings
  transitionDuration: 200, // Theme transition animation (milliseconds)
};

/**
 * Advanced Configuration
 */
export const advancedThemeConfig = {
  // CSS class prefix for themes
  themeClassPrefix: 'theme-',
  
  // CSS variable prefix  
  cssVariablePrefix: '--',
  
  // Local storage key for theme persistence
  storageKey: process.env.NEXT_PUBLIC_STORAGE_PREFIX ? `${process.env.NEXT_PUBLIC_STORAGE_PREFIX}-theme` : 'moorcheh-chat-theme',
  
  // Media query for system theme detection
  systemThemeQuery: '(prefers-color-scheme: dark)',
  
  // Enable CSS transitions for theme changes
  enableTransitions: true,
  
  // Debug mode (console logs theme changes)
  debug: false,
};

/**
 * Theme Validation
 * 
 * Required CSS variables that every theme must have
 */
export const requiredThemeVariables = [
  '--background',
  '--foreground', 
  '--primary',
  '--primary-foreground',
  '--secondary',
  '--secondary-foreground',
  '--muted',
  '--muted-foreground',
  '--accent',
  '--accent-foreground',
  '--destructive',
  '--border',
  '--input',
  '--ring',
  '--card',
  '--card-foreground',
  '--popover',
  '--popover-foreground',
] as const;

export type RequiredThemeVariable = typeof requiredThemeVariables[number]; 