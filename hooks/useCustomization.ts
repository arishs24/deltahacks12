/**
 * useCustomization Hook
 * 
 * React hook for managing themes and fonts from the customize folder.
 * This hook provides a centralized way to access and apply customizations.
 */

import { useEffect, useState, useCallback } from 'react';
import { themes } from '../customize/themes/available-themes';
import { customThemes } from '../customize/themes/custom-themes';
import { themeConfig, type ThemeName } from '../customize/themes/theme-config';
import { fontConfig } from '../customize/fonts/font-config';
import { availableFonts, generateGoogleFontsUrl } from '../customize/fonts/available-fonts';
import { customFonts, generateFontFaceCSS } from '../customize/fonts/custom-fonts';
import { branding } from '@/lib/branding-config';

export interface UseCustomizationReturn {
  // Theme management
  currentTheme: ThemeName;
  setTheme: (theme: ThemeName) => void;
  availableThemes: string[];
  themeLabels: Record<string, string>;
  
  // Font management
  currentFonts: {
    primary: string;
    heading: string;
    mono: string;
  };
  setFonts: (fonts: Partial<{primary: string; heading: string; mono: string}>) => void;
  
  // System state
  isLoading: boolean;
  error: string | null;
  
  // Utilities
  applyTheme: (themeName: ThemeName) => void;
  applyFonts: () => void;
  resetToDefaults: () => void;
}

export function useCustomization(): UseCustomizationReturn {
  const [currentTheme, setCurrentTheme] = useState<ThemeName>(themeConfig.defaultTheme);
  const [currentFonts, setCurrentFonts] = useState({
    primary: fontConfig.primaryFont,
    heading: fontConfig.headingFont,
    mono: fontConfig.monoFont,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Combine all available themes
  const allThemes = { ...themes, ...customThemes };
  const availableThemes = Object.keys(allThemes);

  // Apply theme to DOM
  const applyTheme = useCallback((themeName: ThemeName) => {
    try {
      // Handle system theme first
      if (themeName === 'system') {
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        const systemTheme = prefersDark ? 'dark' : 'light';
        applyTheme(systemTheme);
        setCurrentTheme('system'); // Keep track that we're in system mode
        if (themeConfig.persistTheme) {
          localStorage.setItem(branding.getThemeStorageKey(), 'system');
        }
        return;
      }

      const theme = allThemes[themeName];
      if (!theme) {
        throw new Error(`Theme "${themeName}" not found`);
      }

      const root = document.documentElement;
      
      // Add transition class for smooth theme changes
      if (themeConfig.transitionDuration > 0) {
        root.style.setProperty('--theme-transition-duration', `${themeConfig.transitionDuration}ms`);
        root.classList.add('theme-transitioning');
      }
      
      // Remove existing theme classes
      const existingThemeClasses = Array.from(root.classList).filter(cls => cls.startsWith('theme-'));
      existingThemeClasses.forEach(cls => root.classList.remove(cls));
      
      // Add new theme class
      root.classList.add(`theme-${themeName}`);
      
      // Apply CSS variables
      Object.entries(theme).forEach(([property, value]) => {
        root.style.setProperty(property, value);
      });

      setCurrentTheme(themeName);
      
      // Persist theme preference
      if (themeConfig.persistTheme) {
        localStorage.setItem(branding.getThemeStorageKey(), themeName);
      }

      // Theme applied successfully
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to apply theme');
    }
  }, [allThemes]);

  // Apply fonts to DOM
  const applyFonts = useCallback(() => {
    try {
      const root = document.documentElement;
      
      // Get font definitions
      const primaryFont = availableFonts[currentFonts.primary] || customFonts[currentFonts.primary];
      const headingFont = availableFonts[currentFonts.heading] || customFonts[currentFonts.heading];
      const monoFont = availableFonts[currentFonts.mono] || customFonts[currentFonts.mono];

      // Apply font CSS variables
      if (primaryFont) {
        root.style.setProperty('--font-primary', `'${primaryFont.name}', ${primaryFont.fallback}`);
      }
      if (headingFont) {
        root.style.setProperty('--font-heading', `'${headingFont.name}', ${headingFont.fallback}`);
      }
      if (monoFont) {
        root.style.setProperty('--font-mono', `'${monoFont.name}', ${monoFont.fallback}`);
      }

      // Load Google Fonts if enabled
      if (fontConfig.enableGoogleFonts) {
        const googleFonts = [currentFonts.primary, currentFonts.heading, currentFonts.mono]
          .filter(fontName => availableFonts[fontName]?.googleFontsName)
          .filter((value, index, self) => self.indexOf(value) === index); // Remove duplicates

        if (googleFonts.length > 0) {
          loadGoogleFonts(googleFonts);
        }
      }

      // Load custom fonts
      const customFontNames = [currentFonts.primary, currentFonts.heading, currentFonts.mono]
        .filter(fontName => customFonts[fontName]);

      customFontNames.forEach(fontName => {
        loadCustomFont(fontName);
      });

    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to apply fonts');
    }
  }, [currentFonts]);

  // Load Google Fonts
  const loadGoogleFonts = useCallback((fontNames: string[]) => {
    const existingLink = document.getElementById('google-fonts');
    if (existingLink) {
      existingLink.remove();
    }

    const googleFontsUrl = generateGoogleFontsUrl(fontNames);
    const link = document.createElement('link');
    link.id = 'google-fonts';
    link.rel = 'stylesheet';
    link.href = googleFontsUrl;
    
    // Add preconnect for performance
    const preconnect1 = document.createElement('link');
    preconnect1.rel = 'preconnect';
    preconnect1.href = 'https://fonts.googleapis.com';
    
    const preconnect2 = document.createElement('link');
    preconnect2.rel = 'preconnect';
    preconnect2.href = 'https://fonts.gstatic.com';
    preconnect2.crossOrigin = 'anonymous';

    document.head.appendChild(preconnect1);
    document.head.appendChild(preconnect2);
    document.head.appendChild(link);
  }, []);

  // Load custom font
  const loadCustomFont = useCallback((fontName: string) => {
    const existingStyle = document.getElementById(`custom-font-${fontName}`);
    if (existingStyle) {
      existingStyle.remove();
    }

    const css = generateFontFaceCSS(fontName);
    if (css) {
      const style = document.createElement('style');
      style.id = `custom-font-${fontName}`;
      style.textContent = css;
      document.head.appendChild(style);
    }
  }, []);

  // Set theme with validation
  const setTheme = useCallback((theme: ThemeName) => {
    if (theme === 'system' || allThemes[theme]) {
      applyTheme(theme);
    } else {
      setError(`Theme "${theme}" is not available`);
    }
  }, [allThemes, applyTheme]);

  // Set fonts with validation
  const setFonts = useCallback((fonts: Partial<typeof currentFonts>) => {
    const newFonts = { ...currentFonts, ...fonts };
    
    // Validate fonts exist
    const invalidFonts = Object.entries(newFonts)
      .filter(([, fontName]) => !availableFonts[fontName] && !customFonts[fontName])
      .map(([type]) => type);

    if (invalidFonts.length > 0) {
      setError(`Invalid fonts: ${invalidFonts.join(', ')}`);
      return;
    }

    setCurrentFonts(newFonts);
  }, [currentFonts]);

  // Reset to defaults
  const resetToDefaults = useCallback(() => {
    setTheme(themeConfig.defaultTheme);
    setCurrentFonts({
      primary: fontConfig.primaryFont,
      heading: fontConfig.headingFont,
      mono: fontConfig.monoFont,
    });
          localStorage.removeItem(branding.getThemeStorageKey());
    setError(null);
  }, [setTheme]);

  // Initialize on mount
  useEffect(() => {
    const initialize = async () => {
      try {
        setIsLoading(true);
        
        // Respect user's stored theme preference, fallback to config default
        let themeToUse = themeConfig.defaultTheme;
        
        if (themeConfig.persistTheme) {
          const stored = localStorage.getItem(branding.getThemeStorageKey());
          if (stored) {
            // Use stored theme if it exists and is valid
            if (availableThemes.includes(stored)) {
              themeToUse = stored;
            } else {
              // Invalid stored theme, fallback to config default
              // Invalid stored theme, falling back to config default
              localStorage.setItem(branding.getThemeStorageKey(), themeConfig.defaultTheme);
              themeToUse = themeConfig.defaultTheme;
            }
          } else {
            // No stored theme, save the config default
            localStorage.setItem(branding.getThemeStorageKey(), themeConfig.defaultTheme);
          }
        }

        // Apply initial theme and fonts
        applyTheme(themeToUse);
        applyFonts();

        // Listen for system theme changes
        if (themeConfig.enableSystemTheme) {
          const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
          const handleSystemThemeChange = () => {
            if (currentTheme === 'system') {
              applyTheme('system');
            }
          };
          
          mediaQuery.addEventListener('change', handleSystemThemeChange);
          return () => mediaQuery.removeEventListener('change', handleSystemThemeChange);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to initialize customization');
      } finally {
        setIsLoading(false);
      }
    };

    initialize();
  }, [applyTheme, applyFonts, allThemes]);

  // Apply fonts when they change
  useEffect(() => {
    if (!isLoading) {
      applyFonts();
    }
  }, [currentFonts, applyFonts, isLoading]);

  return {
    currentTheme,
    setTheme,
    availableThemes,
    themeLabels: themeConfig.themeLabels,
    currentFonts,
    setFonts,
    isLoading,
    error,
    applyTheme,
    applyFonts,
    resetToDefaults,
  };
} 