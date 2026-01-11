/**
 * Custom Themes
 * 
 * Add your own custom theme variations here.
 * These themes will be merged with the default available themes.
 */

import type { ThemeDefinition } from './available-themes';

/**
 * Add Your Custom Themes Here
 * 
 * Copy the structure from available-themes.ts and modify the colors.
 * Make sure to include all required CSS variables.
 */
export const customThemes: Record<string, ThemeDefinition> = {
  // Example: Purple Theme
  // purple: {
  //   '--radius': '0.625rem',
  //   '--background': 'oklch(0.98 0.02 300)',
  //   '--foreground': 'oklch(0.2 0.1 300)',
  //   '--card': 'oklch(0.99 0.01 300)',
  //   '--card-foreground': 'oklch(0.2 0.1 300)',
  //   '--popover': 'oklch(0.99 0.01 300)',
  //   '--popover-foreground': 'oklch(0.2 0.1 300)',
  //   '--primary': 'oklch(0.55 0.15 300)',
  //   '--primary-foreground': 'oklch(0.99 0.01 300)',
  //   '--secondary': 'oklch(0.95 0.03 300)',
  //   '--secondary-foreground': 'oklch(0.3 0.12 300)',
  //   '--muted': 'oklch(0.95 0.03 300)',
  //   '--muted-foreground': 'oklch(0.45 0.08 300)',
  //   '--accent': 'oklch(0.92 0.04 300)',
  //   '--accent-foreground': 'oklch(0.3 0.12 300)',
  //   '--destructive': 'oklch(0.577 0.245 27.325)',
  //   '--border': 'oklch(0.9 0.035 300)',
  //   '--input': 'oklch(0.9 0.035 300)',
  //   '--ring': 'oklch(0.55 0.15 300)',
  //   '--chart-1': 'oklch(0.55 0.15 300)',
  //   '--chart-2': 'oklch(0.45 0.18 280)',
  //   '--chart-3': 'oklch(0.65 0.12 320)',
  //   '--chart-4': 'oklch(0.35 0.2 260)',
  //   '--chart-5': 'oklch(0.75 0.1 340)',
  //   '--sidebar': 'oklch(0.97 0.025 300)',
  //   '--sidebar-foreground': 'oklch(0.2 0.1 300)',
  //   '--sidebar-primary': 'oklch(0.55 0.15 300)',
  //   '--sidebar-primary-foreground': 'oklch(0.99 0.01 300)',
  //   '--sidebar-accent': 'oklch(0.92 0.04 300)',
  //   '--sidebar-accent-foreground': 'oklch(0.3 0.12 300)',
  //   '--sidebar-border': 'oklch(0.9 0.035 300)',
  //   '--sidebar-ring': 'oklch(0.55 0.15 300)',
  // },

  // Example: Sunset Theme  
  // sunset: {
  //   '--radius': '0.625rem',
  //   '--background': 'oklch(0.95 0.03 45)',     // Warm cream
  //   '--foreground': 'oklch(0.2 0.05 30)',     // Dark brown
  //   '--card': 'oklch(0.98 0.02 45)',
  //   '--card-foreground': 'oklch(0.2 0.05 30)',
  //   '--popover': 'oklch(0.98 0.02 45)',
  //   '--popover-foreground': 'oklch(0.2 0.05 30)',
  //   '--primary': 'oklch(0.6 0.2 45)',         // Orange
  //   '--primary-foreground': 'oklch(0.95 0.03 45)',
  //   '--secondary': 'oklch(0.9 0.05 45)',      // Light orange
  //   '--secondary-foreground': 'oklch(0.3 0.08 30)',
  //   '--muted': 'oklch(0.9 0.05 45)',
  //   '--muted-foreground': 'oklch(0.5 0.06 35)',
  //   '--accent': 'oklch(0.85 0.08 50)',
  //   '--accent-foreground': 'oklch(0.3 0.08 30)',
  //   '--destructive': 'oklch(0.577 0.245 27.325)',
  //   '--border': 'oklch(0.88 0.04 45)',
  //   '--input': 'oklch(0.88 0.04 45)',
  //   '--ring': 'oklch(0.6 0.2 45)',
  //   '--chart-1': 'oklch(0.6 0.2 45)',         // Orange
  //   '--chart-2': 'oklch(0.65 0.18 25)',       // Red-orange
  //   '--chart-3': 'oklch(0.7 0.15 65)',        // Yellow-orange
  //   '--chart-4': 'oklch(0.55 0.22 15)',       // Deep orange
  //   '--chart-5': 'oklch(0.75 0.12 85)',       // Yellow
  //   '--sidebar': 'oklch(0.93 0.04 45)',
  //   '--sidebar-foreground': 'oklch(0.2 0.05 30)',
  //   '--sidebar-primary': 'oklch(0.6 0.2 45)',
  //   '--sidebar-primary-foreground': 'oklch(0.95 0.03 45)',
  //   '--sidebar-accent': 'oklch(0.85 0.08 50)',
  //   '--sidebar-accent-foreground': 'oklch(0.3 0.08 30)',
  //   '--sidebar-border': 'oklch(0.88 0.04 45)',
  //   '--sidebar-ring': 'oklch(0.6 0.2 45)',
  // },
};

/**
  * Theme Utilities
 */

// Merge custom themes with available themes
export function getAllThemes() {
  // This will be used by the theme system to combine all themes
  return customThemes;
}

// Validate theme has all required variables
export function validateTheme(theme: ThemeDefinition): boolean {
  const requiredVars = [
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
  ];

  return requiredVars.every(variable => variable in theme);
}

// Get theme names
export function getCustomThemeNames(): string[] {
  return Object.keys(customThemes);
} 