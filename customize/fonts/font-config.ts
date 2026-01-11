/**
 * Main Font Configuration
 *
 * This file now reads font settings from appearance.json.
 * Edit the appearance.json file to change your application's font settings.
 */

import appearanceConfig from '../../config/appearance.json';

export type FontName = string;

export interface FontConfig {
  /** Primary font used for body text and most UI elements */
  primaryFont: FontName;

  /** Font used for headings (h1, h2, h3, etc.) */
  headingFont: FontName;

  /** Font used for code blocks and monospace text */
  monoFont: FontName;

  /** Enable loading fonts from Google Fonts */
  enableGoogleFonts: boolean;

  /** Preload critical fonts for better performance */
  preloadFonts: boolean;

  /** Font display strategy */
  fontDisplay: 'auto' | 'block' | 'swap' | 'fallback' | 'optional';

  /** Enable font optimization */
  enableOptimization: boolean;

  /** Base font size for the application */
  baseFontSize: string;

  /** Font size scale ratio */
  scaleRatio: number;
}

/**
 *  MAIN FONT CONFIGURATION
 *
 * Font settings are now loaded from appearance.json
 * The appearance.json file contains the primary, heading, and mono font settings.
 */
export const fontConfig: FontConfig = {
  // Primary fonts loaded from appearance.json
  primaryFont: appearanceConfig.fonts?.primary || 'Roboto',
  headingFont: appearanceConfig.fonts?.heading || 'Inter',
  monoFont: appearanceConfig.fonts?.mono || 'Fira Code',
  
  // Google Fonts integration
  enableGoogleFonts: true, // Automatically load fonts from Google Fonts
  
  // Performance settings
  preloadFonts: true, // Preload critical fonts
  fontDisplay: 'swap', // Font loading strategy
  enableOptimization: true, // Enable font optimization
  
  // Typography scale
  baseFontSize: '16px', // Base font size
  scaleRatio: 1.25, // Font size scaling ratio (1.25 = Major Third)
};

/**
 * Advanced Font Configuration
 */
export const advancedFontConfig = {
  // Font loading timeout
  fontTimeout: 3000, // milliseconds
  
  // Character subsets to load
  fontSubsets: ['latin', 'latin-ext'],
  
  // Font weights to load
  defaultWeights: [400, 500, 600, 700],
  
  // Enable font feature settings
  enableFontFeatures: true,
  
  // Font feature settings
  fontFeatures: {
    // Enable ligatures for code fonts
    ligatures: true,
    // Enable tabular numbers
    tabularNums: false,
    // Enable old-style numbers
    oldStyleNums: false,
  },
  
  // CSS variable names
  cssVariables: {
    primary: '--font-primary',
    heading: '--font-heading',
    mono: '--font-mono',
  },
  
  // Fallback fonts
  fallbackFonts: {
    sansSerif: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    serif: 'ui-serif, Georgia, Cambria, "Times New Roman", Times, serif',
    mono: 'ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, "Liberation Mono", monospace',
  },
};

/**
 * Responsive Typography Settings
 */
export const responsiveTypography = {
  // Base font sizes for different screen sizes
  baseSizes: {
    mobile: '14px',
    tablet: '15px',
    desktop: '16px',
    large: '17px',
  },
  
  // Scale ratios for different screen sizes
  scaleRatios: {
    mobile: 1.2,    // Minor Third
    tablet: 1.25,   // Major Third
    desktop: 1.25,  // Major Third
    large: 1.3,     // Perfect Fourth
  },
  
  // Line height settings
  lineHeights: {
    tight: 1.25,
    normal: 1.5,
    relaxed: 1.75,
    loose: 2,
  },
  
  // Letter spacing
  letterSpacing: {
    tighter: '-0.05em',
    tight: '-0.025em',
    normal: '0em',
    wide: '0.025em',
    wider: '0.05em',
    widest: '0.1em',
  },
};

/**
 * Typography Utilities
 */
export const typographyUtils = {
  // Generate font size scale
  generateFontScale: (baseSize: number, ratio: number, steps: number = 8) => {
    const scale: Record<string, string> = {};
    for (let i = 0; i < steps; i++) {
      const size = baseSize * Math.pow(ratio, i);
      scale[`scale-${i}`] = `${size.toFixed(2)}px`;
    }
    return scale;
  },
  
  // Get font family with fallbacks
  getFontFamily: (fontName: FontName) => {
    // This will be implemented by the font loading system
    return fontName;
  },
  
  // Validate font configuration
  validateConfig: (config: FontConfig) => {
    const errors: string[] = [];
    
    if (!config.primaryFont) {
      errors.push('Primary font is required');
    }
    
    if (!config.headingFont) {
      errors.push('Heading font is required');
    }
    
    if (!config.monoFont) {
      errors.push('Monospace font is required');
    }
    
    if (config.scaleRatio <= 1) {
      errors.push('Scale ratio must be greater than 1');
    }
    
    return {
      isValid: errors.length === 0,
      errors,
    };
  },
};

/**
 * Font Loading Priority
 * 
 * Fonts are loaded in this order for optimal performance
 */
export const fontLoadingPriority = [
  'primaryFont', // Highest priority - UI text
  'headingFont', // Second priority - Headings
  'monoFont',    // Lower priority - Code blocks
];

/**
  * Preset Font Combinations
 * 
 * Popular font pairings you can use
 */
export const fontPresets = {
  modern: {
    primaryFont: 'Inter',
    headingFont: 'Inter',
    monoFont: 'JetBrains Mono',
  },
  editorial: {
    primaryFont: 'Lora',
    headingFont: 'Playfair Display',
    monoFont: 'Source Code Pro',
  },
  friendly: {
    primaryFont: 'Open Sans',
    headingFont: 'Poppins',
    monoFont: 'Fira Code',
  },
  technical: {
    primaryFont: 'Roboto',
    headingFont: 'Roboto',
    monoFont: 'JetBrains Mono',
  },
  minimal: {
    primaryFont: 'system-ui',
    headingFont: 'system-ui',
    monoFont: 'ui-monospace',
  },
}; 