'use client';

/**
 * CustomizationInitializer Component
 * 
 * This component runs on the client side to initialize the customization system.
 * It ensures themes and fonts are applied as early as possible and respects theme-config.ts changes.
 */

import { useEffect } from 'react';
import { themes } from '../../customize/themes/available-themes';
import { customThemes } from '../../customize/themes/custom-themes';
import { themeConfig } from '../../customize/themes/theme-config';
import { fontConfig } from '../../customize/fonts/font-config';
import { availableFonts, generateGoogleFontsUrl } from '../../customize/fonts/available-fonts';
import { branding } from '../../lib/branding-config';
import { customFonts, generateFontFaceCSS } from '../../customize/fonts/custom-fonts';
import { logger } from '../../lib/logger';

export function CustomizationInitializer() {
  useEffect(() => {
    const initializeCustomization = () => {
      try {
        // Combine all themes
        const allThemes = { ...themes, ...customThemes };
        
        // Get the theme to apply - prioritize config over saved theme
        let themeToApply = themeConfig.defaultTheme;
        
        // Check for saved theme only if it matches the current config
        if (themeConfig.persistTheme) {
          const savedTheme = localStorage.getItem(branding.getThemeStorageKey());
          if (savedTheme) {
            // If saved theme differs from config, update localStorage to match config
            if (savedTheme !== themeConfig.defaultTheme) {
              // Theme updated from config
              localStorage.setItem(branding.getThemeStorageKey(), themeConfig.defaultTheme);
              themeToApply = themeConfig.defaultTheme;
            } else {
              themeToApply = savedTheme;
            }
          } else {
            // No saved theme, use config default and save it
            localStorage.setItem(branding.getThemeStorageKey(), themeConfig.defaultTheme);
          }
        }

        // Handle system theme
        if (themeToApply === 'system') {
          const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
          themeToApply = prefersDark ? 'dark' : 'light';
        }

        // Apply theme
        const theme = allThemes[themeToApply];
        if (theme) {
          const root = document.documentElement;
          
          // Clear existing theme classes
          const existingThemeClasses = Array.from(root.classList).filter(cls => cls.startsWith('theme-'));
          existingThemeClasses.forEach(cls => root.classList.remove(cls));
          
          // Apply theme variables
          Object.entries(theme).forEach(([property, value]) => {
            root.style.setProperty(property, value);
          });
          
          // Add theme class
          root.classList.add(`theme-${themeToApply}`);
          
          // Add transition class for smooth theme changes
          if (themeConfig.transitionDuration > 0) {
            root.style.setProperty('--theme-transition-duration', `${themeConfig.transitionDuration}ms`);
            root.classList.add('theme-transitioning');
          }
          
          // Theme applied successfully
        } else {
          // Theme not found, falling back to light theme
          // Fallback to light theme
          const lightTheme = allThemes['light'];
          if (lightTheme) {
            const root = document.documentElement;
            Object.entries(lightTheme).forEach(([property, value]) => {
              root.style.setProperty(property, value);
            });
            root.classList.add('theme-light');
          }
        }

        // Apply fonts
        applyFonts();

      } catch (error) {
        logger.error('Failed to initialize customization:', error);
      }
    };

    const applyFonts = () => {
      try {
        const root = document.documentElement;
        
        // Get font definitions
        const primaryFont = availableFonts[fontConfig.primaryFont] || customFonts[fontConfig.primaryFont];
        const headingFont = availableFonts[fontConfig.headingFont] || customFonts[fontConfig.headingFont];
        const monoFont = availableFonts[fontConfig.monoFont] || customFonts[fontConfig.monoFont];

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
          const googleFonts = [fontConfig.primaryFont, fontConfig.headingFont, fontConfig.monoFont]
            .filter(fontName => availableFonts[fontName]?.googleFontsName)
            .filter((value, index, self) => self.indexOf(value) === index); // Remove duplicates

          if (googleFonts.length > 0) {
            loadGoogleFonts(googleFonts);
          }
        }

        // Load custom fonts
        const customFontNames = [fontConfig.primaryFont, fontConfig.headingFont, fontConfig.monoFont]
          .filter(fontName => customFonts[fontName]);

        customFontNames.forEach(fontName => {
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
        });
      } catch (error) {
        logger.error('Failed to apply fonts:', error);
      }
    };

    const loadGoogleFonts = (fontNames: string[]) => {
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
      if (!document.querySelector('link[href="https://fonts.googleapis.com"]')) {
        const preconnect1 = document.createElement('link');
        preconnect1.rel = 'preconnect';
        preconnect1.href = 'https://fonts.googleapis.com';
        document.head.appendChild(preconnect1);
      }
      
      if (!document.querySelector('link[href="https://fonts.gstatic.com"]')) {
        const preconnect2 = document.createElement('link');
        preconnect2.rel = 'preconnect';
        preconnect2.href = 'https://fonts.gstatic.com';
        preconnect2.crossOrigin = 'anonymous';
        document.head.appendChild(preconnect2);
      }

      document.head.appendChild(link);
    };

    // Initialize immediately
    initializeCustomization();

    // Listen for system theme changes if system theme is enabled
    if (themeConfig.enableSystemTheme) {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      const handleSystemThemeChange = () => {
        const currentTheme = localStorage.getItem(branding.getThemeStorageKey());
        if (currentTheme === 'system') {
          initializeCustomization();
        }
      };
      
      mediaQuery.addEventListener('change', handleSystemThemeChange);
      return () => mediaQuery.removeEventListener('change', handleSystemThemeChange);
    }
  }, []);

  return null; // This component doesn't render anything
} 