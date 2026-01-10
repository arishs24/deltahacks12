/**
 * Custom Fonts
 * 
 * Add your own custom font configurations here.
 * These can be custom font files or additional Google Fonts not in the default list.
 */

import type { FontDefinition } from './available-fonts';

export interface CustomFontFile {
  /** Font weight (e.g., 400, 700) */
  weight: number;
  
  /** Font style (normal, italic) */
  style: 'normal' | 'italic';
  
  /** URL to the font file */
  url: string;
  
  /** Font format (woff2, woff, ttf, etc.) */
  format?: string;
}

export interface CustomFontDefinition extends Omit<FontDefinition, 'googleFontsName'> {
  /** Custom font files (for self-hosted fonts) */
  fontFiles?: CustomFontFile[];
  
  /** Google Fonts name (if it's a Google Font not in the default list) */
  googleFontsName?: string;
  
  /** Whether this is a local/system font */
  isSystemFont?: boolean;
  
  /** CSS font-face declarations */
  fontFace?: string;
}

/**
 * Add Your Custom Fonts Here
 * 
 * You can add:
 * 1. Self-hosted custom font files
 * 2. Additional Google Fonts not in the default list
 * 3. System fonts with specific configurations
 */
export const customFonts: Record<string, CustomFontDefinition> = {
  // Example: Self-hosted custom font
  // 'MyCustomFont': {
  //   name: 'MyCustomFont',
  //   weights: [400, 700],
  //   category: 'sans-serif',
  //   fallback: 'Arial, sans-serif',
  //   description: 'My custom brand font',
  //   fontFiles: [
  //     {
  //       weight: 400,
  //       style: 'normal',
  //       url: '/fonts/MyCustomFont-Regular.woff2',
  //       format: 'woff2',
  //     },
  //     {
  //       weight: 700,
  //       style: 'normal',
  //       url: '/fonts/MyCustomFont-Bold.woff2',
  //       format: 'woff2',
  //     },
  //   ],
  // },

  // Example: Additional Google Font
  // 'DM Sans': {
  //   name: 'DM Sans',
  //   googleFontsName: 'DM+Sans',
  //   weights: [400, 500, 700],
  //   category: 'sans-serif',
  //   fallback: 'system-ui, sans-serif',
  //   display: 'swap',
  //   subsets: ['latin'],
  //   description: 'A versatile geometric sans-serif',
  //   designer: 'Colophon Foundry',
  // },

  // Example: System font configuration
  // 'System UI': {
  //   name: 'System UI',
  //   weights: [400, 500, 600, 700],
  //   category: 'sans-serif',
  //   fallback: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
  //   isSystemFont: true,
  //   description: 'Native system font stack',
  //   preload: false,
  // },
};

/**
 * Font Loading Utilities
 */

// Generate CSS font-face declarations for custom fonts
export function generateFontFaceCSS(fontName: string): string {
  const font = customFonts[fontName];
  if (!font || !font.fontFiles) return '';

  return font.fontFiles
    .map(file => `
      @font-face {
        font-family: '${font.name}';
        font-weight: ${file.weight};
        font-style: ${file.style};
        font-display: ${font.display || 'swap'};
        src: url('${file.url}') format('${file.format || 'woff2'}');
      }
    `)
    .join('\n');
}

// Get all custom font names
export function getCustomFontNames(): string[] {
  return Object.keys(customFonts);
}

// Check if font is self-hosted
export function isSelfHostedFont(fontName: string): boolean {
  const font = customFonts[fontName];
  return Boolean(font?.fontFiles && font.fontFiles.length > 0);
}

// Check if font is Google Font
export function isCustomGoogleFont(fontName: string): boolean {
  const font = customFonts[fontName];
  return Boolean(font?.googleFontsName);
}

// Check if font is system font
export function isSystemFont(fontName: string): boolean {
  const font = customFonts[fontName];
  return Boolean(font?.isSystemFont);
}

// Get font definition
export function getCustomFontDefinition(name: string): CustomFontDefinition | undefined {
  return customFonts[name];
}

/**
 * Font Installation Guide
 */
export const fontInstallationGuide = {
  selfHosted: {
    title: 'Self-Hosted Fonts',
    steps: [
      '1. Place your font files in the `public/fonts/` directory',
      '2. Add font definition to `customFonts` object above',
      '3. Include `fontFiles` array with paths to your font files',
      '4. The system will automatically generate @font-face CSS',
      '5. Use the font name in your font configuration',
    ],
    example: `
// 1. File structure:
// public/fonts/MyFont-Regular.woff2
// public/fonts/MyFont-Bold.woff2

// 2. Font definition:
'MyFont': {
  name: 'MyFont',
  weights: [400, 700],
  category: 'sans-serif',
  fallback: 'Arial, sans-serif',
  fontFiles: [
    { weight: 400, style: 'normal', url: '/fonts/MyFont-Regular.woff2' },
    { weight: 700, style: 'normal', url: '/fonts/MyFont-Bold.woff2' },
  ],
}
    `,
  },
  googleFonts: {
    title: 'Additional Google Fonts',
    steps: [
      '1. Find the font on Google Fonts (fonts.google.com)',
      '2. Get the exact font name and URL-encoded name',
      '3. Add font definition with `googleFontsName` property',
      '4. Specify available weights and subsets',
      '5. The system will automatically load from Google Fonts',
    ],
    example: `
// Example for "DM Sans" font:
'DM Sans': {
  name: 'DM Sans',
  googleFontsName: 'DM+Sans', // URL-encoded name
  weights: [400, 500, 700],
  category: 'sans-serif',
  fallback: 'system-ui, sans-serif',
  display: 'swap',
  subsets: ['latin'],
}
    `,
  },
  system: {
    title: 'System Fonts',
    steps: [
      '1. Define font with `isSystemFont: true`',
      '2. Provide comprehensive fallback stack',
      '3. Set `preload: false` for better performance',
      '4. System fonts load instantly (no network request)',
    ],
    example: `
'System UI': {
  name: 'System UI',
  weights: [400, 500, 600, 700],
  category: 'sans-serif',
  fallback: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
  isSystemFont: true,
  preload: false,
}
    `,
  },
};

/**
 * Best Practices
 */
export const bestPractices = {
  performance: [
    'Use WOFF2 format for best compression and browser support',
    'Preload only critical fonts (usually just the primary font)',
    'Limit the number of font weights to reduce load time',
    'Use font-display: swap for better perceived performance',
    'Consider using system fonts for better performance',
  ],
  accessibility: [
    'Ensure sufficient contrast between text and background',
    'Test fonts at different sizes and weights',
    'Provide fallback fonts that are widely available',
    'Consider users with dyslexia (some fonts are more readable)',
    'Test with screen readers and assistive technologies',
  ],
  design: [
    'Limit to 2-3 font families maximum',
    'Pair fonts with similar x-heights for consistency',
    'Use different fonts to create hierarchy (heading vs body)',
    'Consider the personality and tone of your brand',
    'Test fonts across different devices and screen sizes',
  ],
  technical: [
    'Use consistent naming conventions',
    'Include comprehensive fallback stacks',
    'Test font loading in slow network conditions',
    'Monitor font loading performance with web vitals',
    'Consider using a font loading strategy library',
  ],
}; 