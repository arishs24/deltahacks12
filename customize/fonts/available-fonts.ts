/**
 * Available Fonts
 * 
 * This file contains a curated selection of popular Google Fonts.
 * For the complete Google Fonts catalog, visit: https://fonts.google.com
 */

export interface FontDefinition {
  /** Display name of the font */
  name: string;
  
  /** Google Fonts API name (must match exactly) */
  googleFontsName: string;
  
  /** Available font weights */
  weights: number[];
  
  /** Font category */
  category: 'sans-serif' | 'serif' | 'monospace' | 'display' | 'handwriting';
  
  /** Fallback font stack */
  fallback: string;
  
  /** Whether to preload this font */
  preload?: boolean;
  
  /** Font display strategy */
  display?: 'auto' | 'block' | 'swap' | 'fallback' | 'optional';
  
  /** Character subsets to load */
  subsets?: string[];
  
  /** Description of the font */
  description?: string;
  
  /** Font designer/foundry */
  designer?: string;
  
  /** Whether the font supports ligatures */
  hasLigatures?: boolean;
  
  /** Popularity ranking (1-5, 5 being most popular) */
  popularity?: number;
}

/**
 * Available Google Fonts
 * 
 * Curated selection of 50+ popular Google Fonts across all categories
 */
export const availableFonts: Record<string, FontDefinition> = {
  // MOST POPULAR SANS-SERIF FONTS
  'Inter': {
    name: 'Inter',
    googleFontsName: 'Inter',
    weights: [100, 200, 300, 400, 500, 600, 700, 800, 900],
    category: 'sans-serif',
    fallback: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    preload: true,
    display: 'swap',
    subsets: ['latin', 'latin-ext'],
    description: 'A highly legible font family designed for user interfaces',
    designer: 'Rasmus Andersson',
    popularity: 5,
  },
  
  'Roboto': {
    name: 'Roboto',
    googleFontsName: 'Roboto',
    weights: [100, 300, 400, 500, 700, 900],
    category: 'sans-serif',
    fallback: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    display: 'swap',
    subsets: ['latin', 'latin-ext'],
    description: 'Google\'s signature family of fonts',
    designer: 'Christian Robertson',
    popularity: 5,
  },
  
  'Open Sans': {
    name: 'Open Sans',
    googleFontsName: 'Open+Sans',
    weights: [300, 400, 500, 600, 700, 800],
    category: 'sans-serif',
    fallback: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    display: 'swap',
    subsets: ['latin', 'latin-ext'],
    description: 'Friendly and open curves with upright stress',
    designer: 'Steve Matteson',
    popularity: 5,
  },
  
  'Poppins': {
    name: 'Poppins',
    googleFontsName: 'Poppins',
    weights: [100, 200, 300, 400, 500, 600, 700, 800, 900],
    category: 'sans-serif',
    fallback: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    display: 'swap',
    subsets: ['latin', 'latin-ext'],
    description: 'Geometric sans-serif with rounded edges',
    designer: 'Jonny Pinhorn',
    popularity: 5,
  },
  
  'Lato': {
    name: 'Lato',
    googleFontsName: 'Lato',
    weights: [100, 300, 400, 700, 900],
    category: 'sans-serif',
    fallback: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    display: 'swap',
    subsets: ['latin', 'latin-ext'],
    description: 'Humanist sans-serif with warm characteristics',
    designer: 'Łukasz Dziedzic',
    popularity: 5,
  },

  'Saira': {
    name: 'Saira',
    googleFontsName: 'Saira',
    weights: [100, 200, 300, 400, 500, 600, 700, 800, 900],
    category: 'sans-serif',
    fallback: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    display: 'swap',
    subsets: ['latin', 'latin-ext'],
    description: 'Modern geometric sans-serif with excellent readability',
    designer: 'Omnibus-Type',
    popularity: 4,
  },

  // MORE POPULAR SANS-SERIF FONTS
  'Nunito': {
    name: 'Nunito',
    googleFontsName: 'Nunito',
    weights: [200, 300, 400, 500, 600, 700, 800, 900],
    category: 'sans-serif',
    fallback: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    display: 'swap',
    subsets: ['latin', 'latin-ext'],
    description: 'Rounded terminal sans-serif',
    designer: 'Vernon Adams',
    popularity: 4,
  },
  
  'Montserrat': {
    name: 'Montserrat',
    googleFontsName: 'Montserrat',
    weights: [100, 200, 300, 400, 500, 600, 700, 800, 900],
    category: 'sans-serif',
    fallback: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    display: 'swap',
    subsets: ['latin', 'latin-ext'],
    description: 'Urban typography inspired by Buenos Aires',
    designer: 'Julieta Ulanovsky',
    popularity: 4,
  },

  'Outfit': {
    name: 'Outfit',
    googleFontsName: 'Outfit',
    weights: [100, 200, 300, 400, 500, 600, 700, 800, 900],
    category: 'sans-serif',
    fallback: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    display: 'swap',
    subsets: ['latin', 'latin-ext'],
    description: 'Modern geometric sans-serif',
    designer: 'Rodrigo Fuenzalida',
    popularity: 4,
  },

  'Work Sans': {
    name: 'Work Sans',
    googleFontsName: 'Work+Sans',
    weights: [100, 200, 300, 400, 500, 600, 700, 800, 900],
    category: 'sans-serif',
    fallback: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    display: 'swap',
    subsets: ['latin', 'latin-ext'],
    description: 'Optimized for work environments',
    designer: 'Wei Huang',
    popularity: 4,
  },

  'DM Sans': {
    name: 'DM Sans',
    googleFontsName: 'DM+Sans',
    weights: [400, 500, 700],
    category: 'sans-serif',
    fallback: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    display: 'swap',
    subsets: ['latin', 'latin-ext'],
    description: 'Versatile geometric sans-serif',
    designer: 'Colophon Foundry',
    popularity: 4,
  },

  'Source Sans Pro': {
    name: 'Source Sans Pro',
    googleFontsName: 'Source+Sans+Pro',
    weights: [200, 300, 400, 600, 700, 900],
    category: 'sans-serif',
    fallback: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    display: 'swap',
    subsets: ['latin', 'latin-ext'],
    description: 'Adobe\'s first open source font family',
    designer: 'Paul D. Hunt',
    popularity: 4,
  },

  'Rubik': {
    name: 'Rubik',
    googleFontsName: 'Rubik',
    weights: [300, 400, 500, 600, 700, 800, 900],
    category: 'sans-serif',
    fallback: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    display: 'swap',
    subsets: ['latin', 'latin-ext'],
    description: 'Slightly rounded corners sans-serif',
    designer: 'Hubert and Fischer',
    popularity: 4,
  },

  'Ubuntu': {
    name: 'Ubuntu',
    googleFontsName: 'Ubuntu',
    weights: [300, 400, 500, 700],
    category: 'sans-serif',
    fallback: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    display: 'swap',
    subsets: ['latin', 'latin-ext'],
    description: 'Humanist sans-serif from Canonical',
    designer: 'Dalton Maag',
    popularity: 3,
  },

  'Fira Sans': {
    name: 'Fira Sans',
    googleFontsName: 'Fira+Sans',
    weights: [100, 200, 300, 400, 500, 600, 700, 800, 900],
    category: 'sans-serif',
    fallback: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    display: 'swap',
    subsets: ['latin', 'latin-ext'],
    description: 'Designed for Firefox OS',
    designer: 'Erik Spiekermann',
    popularity: 3,
  },

  'Manrope': {
    name: 'Manrope',
    googleFontsName: 'Manrope',
    weights: [200, 300, 400, 500, 600, 700, 800],
    category: 'sans-serif',
    fallback: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    display: 'swap',
    subsets: ['latin', 'latin-ext'],
    description: 'Modern geometric sans-serif',
    designer: 'Mikhail Sharanda',
    popularity: 3,
  },

  'Plus Jakarta Sans': {
    name: 'Plus Jakarta Sans',
    googleFontsName: 'Plus+Jakarta+Sans',
    weights: [200, 300, 400, 500, 600, 700, 800],
    category: 'sans-serif',
    fallback: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    display: 'swap',
    subsets: ['latin', 'latin-ext'],
    description: 'Contemporary geometric sans-serif',
    designer: 'Tokotype',
    popularity: 3,
  },

  // POPULAR SERIF FONTS
  'Merriweather': {
    name: 'Merriweather',
    googleFontsName: 'Merriweather',
    weights: [300, 400, 700, 900],
    category: 'serif',
    fallback: 'ui-serif, Georgia, Cambria, "Times New Roman", Times, serif',
    display: 'swap',
    subsets: ['latin', 'latin-ext'],
    description: 'Designed to be pleasant to read on screens',
    designer: 'Sorkin Type',
    popularity: 5,
  },
  
  'Playfair Display': {
    name: 'Playfair Display',
    googleFontsName: 'Playfair+Display',
    weights: [400, 500, 600, 700, 800, 900],
    category: 'serif',
    fallback: 'ui-serif, Georgia, Cambria, "Times New Roman", Times, serif',
    display: 'swap',
    subsets: ['latin', 'latin-ext'],
    description: 'High-contrast serif for large sizes',
    designer: 'Claus Eggers Sørensen',
    popularity: 5,
  },
  
  'Lora': {
    name: 'Lora',
    googleFontsName: 'Lora',
    weights: [400, 500, 600, 700],
    category: 'serif',
    fallback: 'ui-serif, Georgia, Cambria, "Times New Roman", Times, serif',
    display: 'swap',
    subsets: ['latin', 'latin-ext'],
    description: 'Well-balanced contemporary serif',
    designer: 'Cyreal',
    popularity: 4,
  },

  'Source Serif Pro': {
    name: 'Source Serif Pro',
    googleFontsName: 'Source+Serif+Pro',
    weights: [200, 300, 400, 600, 700, 900],
    category: 'serif',
    fallback: 'ui-serif, Georgia, Cambria, "Times New Roman", Times, serif',
    display: 'swap',
    subsets: ['latin', 'latin-ext'],
    description: 'Adobe\'s serif font family',
    designer: 'Frank Grießhammer',
    popularity: 4,
  },

  'PT Serif': {
    name: 'PT Serif',
    googleFontsName: 'PT+Serif',
    weights: [400, 700],
    category: 'serif',
    fallback: 'ui-serif, Georgia, Cambria, "Times New Roman", Times, serif',
    display: 'swap',
    subsets: ['latin', 'latin-ext'],
    description: 'Transitional serif with humanist features',
    designer: 'Alexandra Korolkova',
    popularity: 4,
  },

  'Crimson Text': {
    name: 'Crimson Text',
    googleFontsName: 'Crimson+Text',
    weights: [400, 600, 700],
    category: 'serif',
    fallback: 'ui-serif, Georgia, Cambria, "Times New Roman", Times, serif',
    display: 'swap',
    subsets: ['latin', 'latin-ext'],
    description: 'Inspired by old-style serif typefaces',
    designer: 'Sebastian Kosch',
    popularity: 3,
  },

  'Libre Baskerville': {
    name: 'Libre Baskerville',
    googleFontsName: 'Libre+Baskerville',
    weights: [400, 700],
    category: 'serif',
    fallback: 'ui-serif, Georgia, Cambria, "Times New Roman", Times, serif',
    display: 'swap',
    subsets: ['latin', 'latin-ext'],
    description: 'Based on 1941 ATF Baskerville',
    designer: 'Impallari Type',
    popularity: 3,
  },

  'Cormorant Garamond': {
    name: 'Cormorant Garamond',
    googleFontsName: 'Cormorant+Garamond',
    weights: [300, 400, 500, 600, 700],
    category: 'serif',
    fallback: 'ui-serif, Georgia, Cambria, "Times New Roman", Times, serif',
    display: 'swap',
    subsets: ['latin', 'latin-ext'],
    description: 'Display serif inspired by Claude Garamond',
    designer: 'Christian Thalmann',
    popularity: 3,
  },

  // MONOSPACE FONTS
  'JetBrains Mono': {
    name: 'JetBrains Mono',
    googleFontsName: 'JetBrains+Mono',
    weights: [100, 200, 300, 400, 500, 600, 700, 800],
    category: 'monospace',
    fallback: 'ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, "Liberation Mono", monospace',
    display: 'swap',
    subsets: ['latin', 'latin-ext'],
    description: 'Coding font with ligatures',
    designer: 'JetBrains',
    hasLigatures: true,
    popularity: 5,
  },
  
  'Fira Code': {
    name: 'Fira Code',
    googleFontsName: 'Fira+Code',
    weights: [300, 400, 500, 600, 700],
    category: 'monospace',
    fallback: 'ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, "Liberation Mono", monospace',
    display: 'swap',
    subsets: ['latin', 'latin-ext'],
    description: 'Monospaced font with programming ligatures',
    designer: 'Nikita Prokopov',
    hasLigatures: true,
    popularity: 5,
  },
  
  'Source Code Pro': {
    name: 'Source Code Pro',
    googleFontsName: 'Source+Code+Pro',
    weights: [200, 300, 400, 500, 600, 700, 900],
    category: 'monospace',
    fallback: 'ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, "Liberation Mono", monospace',
    display: 'swap',
    subsets: ['latin', 'latin-ext'],
    description: 'Adobe\'s monospace font family',
    designer: 'Paul D. Hunt',
    popularity: 4,
  },
  
  'IBM Plex Mono': {
    name: 'IBM Plex Mono',
    googleFontsName: 'IBM+Plex+Mono',
    weights: [100, 200, 300, 400, 500, 600, 700],
    category: 'monospace',
    fallback: 'ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, "Liberation Mono", monospace',
    display: 'swap',
    subsets: ['latin', 'latin-ext'],
    description: 'IBM\'s corporate typeface for code',
    designer: 'IBM',
    popularity: 4,
  },

  'Roboto Mono': {
    name: 'Roboto Mono',
    googleFontsName: 'Roboto+Mono',
    weights: [100, 200, 300, 400, 500, 600, 700],
    category: 'monospace',
    fallback: 'ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, "Liberation Mono", monospace',
    display: 'swap',
    subsets: ['latin', 'latin-ext'],
    description: 'Monospaced addition to the Roboto family',
    designer: 'Christian Robertson',
    popularity: 4,
  },

  'Space Mono': {
    name: 'Space Mono',
    googleFontsName: 'Space+Mono',
    weights: [400, 700],
    category: 'monospace',
    fallback: 'ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, "Liberation Mono", monospace',
    display: 'swap',
    subsets: ['latin', 'latin-ext'],
    description: 'Original fixed-width type family',
    designer: 'Colophon Foundry',
    popularity: 3,
  },

  // DISPLAY FONTS
  'Space Grotesk': {
    name: 'Space Grotesk',
    googleFontsName: 'Space+Grotesk',
    weights: [300, 400, 500, 600, 700],
    category: 'display',
    fallback: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    display: 'swap',
    subsets: ['latin', 'latin-ext'],
    description: 'Proportional variant of Space Mono',
    designer: 'Florian Karsten',
    popularity: 4,
  },

  'Oswald': {
    name: 'Oswald',
    googleFontsName: 'Oswald',
    weights: [200, 300, 400, 500, 600, 700],
    category: 'display',
    fallback: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    display: 'swap',
    subsets: ['latin', 'latin-ext'],
    description: 'Reworking of the classic gothic typeface',
    designer: 'Vernon Adams',
    popularity: 4,
  },

  'Raleway': {
    name: 'Raleway',
    googleFontsName: 'Raleway',
    weights: [100, 200, 300, 400, 500, 600, 700, 800, 900],
    category: 'display',
    fallback: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    display: 'swap',
    subsets: ['latin', 'latin-ext'],
    description: 'Elegant sans-serif typeface family',
    designer: 'Matt McInerney',
    popularity: 4,
  },

  'Bebas Neue': {
    name: 'Bebas Neue',
    googleFontsName: 'Bebas+Neue',
    weights: [400],
    category: 'display',
    fallback: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    display: 'swap',
    subsets: ['latin', 'latin-ext'],
    description: 'All caps display font',
    designer: 'Ryoichi Tsunekawa',
    popularity: 3,
  },

  // HANDWRITING FONTS
  'Dancing Script': {
    name: 'Dancing Script',
    googleFontsName: 'Dancing+Script',
    weights: [400, 500, 600, 700],
    category: 'handwriting',
    fallback: 'cursive',
    display: 'swap',
    subsets: ['latin', 'latin-ext'],
    description: 'Lively casual script',
    designer: 'Pablo Impallari',
    popularity: 4,
  },

  'Great Vibes': {
    name: 'Great Vibes',
    googleFontsName: 'Great+Vibes',
    weights: [400],
    category: 'handwriting',
    fallback: 'cursive',
    display: 'swap',
    subsets: ['latin', 'latin-ext'],
    description: 'Connecting script typeface',
    designer: 'TypeSETit',
    popularity: 3,
  },

  'Pacifico': {
    name: 'Pacifico',
    googleFontsName: 'Pacifico',
    weights: [400],
    category: 'handwriting',
    fallback: 'cursive',
    display: 'swap',
    subsets: ['latin', 'latin-ext'],
    description: 'Brush script typeface',
    designer: 'Vernon Adams',
    popularity: 3,
  },
};

/**
 * Font Utilities
 */

// Get fonts by category
export function getFontsByCategory(category: FontDefinition['category']) {
  return Object.entries(availableFonts).filter(
    ([, font]) => font.category === category
  );
}

// Get fonts by popularity (5 = most popular)
export function getFontsByPopularity(minRating: number = 3) {
  return Object.entries(availableFonts).filter(
    ([, font]) => (font.popularity || 0) >= minRating
  );
}

// Get most popular fonts
export function getMostPopularFonts() {
  return getFontsByPopularity(5);
}

// Get font names only
export function getFontNames(): string[] {
  return Object.keys(availableFonts);
}

// Get font by name
export function getFontDefinition(name: string): FontDefinition | undefined {
  return availableFonts[name];
}

// Generate Google Fonts URL
export function generateGoogleFontsUrl(fontNames: string[]): string {
  const fontQueries = fontNames
    .map(name => {
      const font = availableFonts[name];
      if (!font) return null;
      
      const weights = font.weights.join(',');
      return `${font.googleFontsName}:wght@${weights}`;
    })
    .filter(Boolean)
    .join('&family=');
  
  return `https://fonts.googleapis.com/css2?family=${fontQueries}&display=swap`;
}

// Validate font exists
export function validateFont(name: string): boolean {
  return name in availableFonts;
}

/**
 * 📊 Font Categories
 */
export const fontCategories = {
  'sans-serif': 'Sans-serif fonts for clean, modern interfaces',
  'serif': 'Serif fonts for traditional, readable text',
  'monospace': 'Monospace fonts for code and technical content',
  'display': 'Display fonts for headings and emphasis',
  'handwriting': 'Script and handwriting fonts for personality',
} as const;

/**
 * 🎯 Popular Font Combinations
 */
export const popularCombinations = [
  {
    name: 'Modern & Clean',
    primary: 'Inter',
    heading: 'Inter',
    mono: 'JetBrains Mono',
    description: 'Perfect for modern applications and dashboards',
  },
  {
    name: 'Editorial Style',
    primary: 'Lora',
    heading: 'Playfair Display',
    mono: 'Source Code Pro',
    description: 'Great for content-heavy applications',
  },
  {
    name: 'Friendly & Approachable',
    primary: 'Open Sans',
    heading: 'Poppins',
    mono: 'Fira Code',
    description: 'Welcoming and easy to read',
  },
  {
    name: 'Technical & Professional',
    primary: 'Roboto',
    heading: 'Roboto',
    mono: 'JetBrains Mono',
    description: 'Clean and professional for technical interfaces',
  },
  {
    name: 'Creative & Unique',
    primary: 'Nunito',
    heading: 'Space Grotesk',
    mono: 'IBM Plex Mono',
    description: 'Stand out with unique character',
  },
  {
    name: 'Elegant & Sophisticated',
    primary: 'Source Sans Pro',
    heading: 'Playfair Display',
    mono: 'Source Code Pro',
    description: 'Refined and professional',
  },
  {
    name: 'Bold & Impactful',
    primary: 'Work Sans',
    heading: 'Oswald',
    mono: 'Roboto Mono',
    description: 'Strong visual presence',
  },
  {
    name: 'Warm & Readable',
    primary: 'Merriweather',
    heading: 'Merriweather',
    mono: 'Space Mono',
    description: 'Comfortable reading experience',
  },
];

/**
 * 🌐 Google Fonts Integration
 */
export const googleFontsInfo = {
  baseUrl: 'https://fonts.googleapis.com',
  apiUrl: 'https://fonts.googleapis.com/css2',
  preconnectUrls: [
    'https://fonts.googleapis.com',
    'https://fonts.gstatic.com',
  ],
  
  // Quick link to browse all Google Fonts
  browseUrl: 'https://fonts.google.com',
  
  // Popular categories on Google Fonts
  popularCategories: [
    'Sans Serif',
    'Serif', 
    'Display',
    'Handwriting',
    'Monospace',
  ],
  
  // Tips for choosing fonts
  selectionTips: [
    'Consider your brand personality',
    'Test readability at different sizes',
    'Limit to 2-3 font families maximum',
    'Check language support for your audience',
    'Consider loading performance',
  ],
}; 