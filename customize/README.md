# Customization Guide

This folder contains font and theme customization for your chat application.


## Quick Setup

**Option 1: Interactive Setup (Recommended)**
Visit [http://localhost:3000/landing](http://localhost:3000/landing) to use the interactive setup flow that guides you through theme and font selection with live previews.

**Option 2: Manual Setup**

### Change Fonts

Edit `fonts/font-config.ts`:

```typescript
export const fontConfig = {
  primaryFont: 'Inter',     // Main UI font
  headingFont: 'Roboto',    // Headings font
  monoFont: 'Fira Code',    // Code font
  enableGoogleFonts: true,
};
```

### Change Theme

Edit `themes/theme-config.ts`:

```typescript
export const themeConfig = {
  defaultTheme: 'light',    // 'light', 'dark', 'blue', 'green'
  enableSystemTheme: true,  // Auto-detect system preference
  enableThemeToggle: true,  // Show theme switcher
};
```

## Adding New Fonts

### Method 1: Next.js Optimized (Recommended)

1. Add import in `lib/fonts.ts`:
```typescript
import { Your_Font } from "next/font/google";

export const yourFont = Your_Font({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-your-font',
});
```

2. Add to font map:
```typescript
export const nextFontMap = {
  'Your Font': yourFont,
} as const;
```

### Method 2: Dynamic Loading

Add to `fonts/available-fonts.ts`:
```typescript
export const availableFonts = {
  'Your Font': {
    name: 'Your Font',
    googleFontsName: 'Your+Font',
    weights: [400, 700],
    category: 'sans-serif',
    fallback: 'system-ui, sans-serif',
  },
};
```

## Adding New Themes

Add to `themes/custom-themes.ts`:

```typescript
export const customThemes = {
  yourtheme: {
    '--background': 'oklch(0.98 0.02 240)',
    '--foreground': 'oklch(0.2 0.1 240)',
    '--primary': 'oklch(0.55 0.15 240)',
    '--primary-foreground': 'oklch(0.98 0.02 240)',
    '--secondary': 'oklch(0.95 0.05 240)',
    '--secondary-foreground': 'oklch(0.3 0.08 240)',
    '--muted': 'oklch(0.9 0.03 240)',
    '--muted-foreground': 'oklch(0.5 0.05 240)',
    '--accent': 'oklch(0.9 0.03 240)',
    '--accent-foreground': 'oklch(0.3 0.08 240)',
    '--destructive': 'oklch(0.6 0.2 25)',
    '--destructive-foreground': 'oklch(0.98 0.02 240)',
    '--border': 'oklch(0.9 0.03 240)',
    '--input': 'oklch(0.9 0.03 240)',
    '--ring': 'oklch(0.55 0.15 240)',
    '--radius': '0.5rem',
    '--chart-1': 'oklch(0.55 0.15 240)',
    '--chart-2': 'oklch(0.6 0.18 120)',
    '--chart-3': 'oklch(0.65 0.2 60)',
    '--chart-4': 'oklch(0.7 0.15 300)',
    '--chart-5': 'oklch(0.75 0.12 180)',
  },
};
```
**Test your changes:** Visit `/demo` to see how your themes and fonts look in action.

## Available Options

### Fonts
- 30+ Next.js optimized fonts (better performance)
- 50+ dynamic Google Fonts
- Categories: sans-serif, serif, monospace, display, handwriting

### Themes
- Built-in: light, dark, blue, green
- Use OKLCH color format for consistent colors
- All CSS variables must be defined for proper theme support

## Important Notes

- Restart development server after major changes
- Next.js optimized fonts provide better performance
- Use OKLCH format: `oklch(lightness chroma hue)`
- Test themes across all UI components
- Keep font selections minimal for better performance
