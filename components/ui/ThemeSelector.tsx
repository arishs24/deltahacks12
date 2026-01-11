"use client";

import React, { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Check, Palette } from 'lucide-react';
import { themes } from '../../lib/themes';
import { Button } from './button';
import Confetti from 'react-confetti';
import { logger } from '../../lib/logger';

interface ThemeSelectorProps {
  currentTheme?: string;
  onThemeSelect?: (themeName: string) => void;
  className?: string;
}

interface ThemePreviewProps {
  themeName: string;
  themeColors: Record<string, string>;
  isSelected: boolean;
  onClick: () => void;
}

const ThemeColorPreview: React.FC<ThemePreviewProps> = React.memo(({ 
  themeName, 
  themeColors, 
  isSelected, 
  onClick 
}) => {
  const getColorFromCSSVar = (cssVar: string) => {
    // Extract color from CSS variable like 'oklch(0.55 0.18 240.53)'
    const match = cssVar.match(/oklch\(([^)]+)\)/);
    if (match) {
      return `oklch(${match[1]})`;
    }
    return cssVar;
  };

  const primaryColor = getColorFromCSSVar(themeColors['--primary'] || '#000000');
  const secondaryColor = getColorFromCSSVar(themeColors['--secondary'] || '#f0f0f0');
  const accentColor = getColorFromCSSVar(themeColors['--accent'] || '#e0e0e0');

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className="cursor-pointer flex-shrink-0"
      onClick={onClick}
      title={`${themeName} theme`}
    >
      <div className={`relative w-20 h-20 rounded-xl overflow-hidden border-2 transition-all duration-200 ${
        isSelected 
          ? 'border-primary ring-2 ring-primary/20 shadow-lg' 
          : 'border-border hover:border-primary/50 hover:shadow-md'
      }`}>
        {/* Color gradient background */}
        <div 
          className="absolute inset-0"
          style={{ 
            background: `linear-gradient(135deg, ${primaryColor} 0%, ${secondaryColor} 50%, ${accentColor} 100%)`
          }}
        />
        
        {/* Theme name overlay */}
        <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
          <span className="text-white text-xs font-medium capitalize text-center leading-tight">
            {themeName}
          </span>
        </div>
        
        {/* Selection indicator */}
        {isSelected && (
          <div className="absolute top-1 right-1 bg-primary rounded-full p-1">
            <Check className="w-3 h-3 text-primary-foreground" />
          </div>
        )}
      </div>
    </motion.div>
  );
});

// Keep original for fallback
const ThemePreview: React.FC<ThemePreviewProps> = ThemeColorPreview;

ThemeColorPreview.displayName = 'ThemeColorPreview';
ThemePreview.displayName = 'ThemePreview';

export const ThemeSelector: React.FC<ThemeSelectorProps> = React.memo(({
  currentTheme = 'slate',
  onThemeSelect,
  className
}) => {
  const [selectedTheme, setSelectedTheme] = useState(currentTheme);
  const [isLoading, setIsLoading] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  // Add CSS animation styles to document head
  React.useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      @keyframes scroll-left {
        0% { transform: translateX(0); }
        100% { transform: translateX(-33.333%); }
      }
      .animate-scroll-left {
        animation: scroll-left 20s linear infinite;
        will-change: transform;
      }
      .animate-scroll-left:hover {
        animation-play-state: paused;
      }
    `;
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  const handleThemeSelect = useCallback(async (themeName: string) => {
    setSelectedTheme(themeName);
    setIsLoading(true);
    
    try {
      // Get current appearance config
      const currentConfig = await fetch('/api/appearance').then(res => res.json());
      
      // Update the theme in the config
      const updatedConfig = {
        ...currentConfig,
        theme: {
          defaultTheme: themeName
        }
      };

      // Call the existing API to update the appearance
      const response = await fetch('/api/update-appearance', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedConfig),
      });

      if (!response.ok) {
        throw new Error('Failed to update theme');
      }

      // Show celebration animation
      setShowConfetti(true);

      // Call the callback if provided
      onThemeSelect?.(themeName);

      // Hide confetti after animation
      setTimeout(() => setShowConfetti(false), 3000);

      // Reload the page to apply the new theme
      window.location.reload();
    } catch (error) {
      logger.error('Error updating theme:', error);
      // Revert selection on error
      setSelectedTheme(currentTheme);
    } finally {
      setIsLoading(false);
    }
  }, [onThemeSelect, currentTheme]); // Stable dependencies

  // Create stable theme list for display
  const commonThemes = React.useMemo(() =>
    ['slate', 'blue', 'green', 'purple', 'orange', 'red', 'pink', 'teal', 'indigo', 'rose', 'emerald', 'amber']
      .filter(theme => Object.keys(themes).includes(theme)),
    []
  );

  return (
    <div className={`space-y-6 ${className}`}>
      <div className="text-center space-y-2">
        <div className="flex items-center justify-center gap-2 text-primary">
          <Palette className="w-5 h-5" />
          <h2 className="text-2xl font-bold">Choose Your Theme</h2>
        </div>
        <p className="text-muted-foreground">
          Select a theme to customize your chat experience
        </p>
      </div>

      <div className="relative overflow-hidden" style={{ height: '120px' }}>
        {commonThemes.length > 0 ? (
          <div className="flex animate-scroll-left gap-4 py-4">
            {/* Render themes multiple times for infinite effect */}
            {[...Array(3)].map((_, copyIndex) => 
              commonThemes.map(themeName => (
                <ThemePreview
                  key={`${copyIndex}-${themeName}`}
                  themeName={themeName}
                  themeColors={themes[themeName]}
                  isSelected={selectedTheme === themeName}
                  onClick={() => handleThemeSelect(themeName)}
                />
              ))
            )}
          </div>
        ) : (
          <div className="flex items-center justify-center py-8 text-muted-foreground">
            <div className="text-center">
              <Palette className="w-8 h-8 mx-auto mb-2 opacity-50" />
              <p>No themes available</p>
            </div>
          </div>
        )}
        
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm">
            <div className="flex items-center gap-2 text-primary">
              <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
              <span className="text-sm font-medium">Updating theme...</span>
            </div>
          </div>
        )}
      </div>

      <div className="text-center">
        <Button
          variant="outline"
          onClick={() => handleThemeSelect(selectedTheme)}
          disabled={isLoading}
          className="px-6"
        >
          {isLoading ? 'Updating...' : 'Apply Theme'}
        </Button>
      </div>

      {/* Celebration Confetti */}
      {showConfetti && (
        <Confetti
          width={typeof window !== 'undefined' ? window.innerWidth : 1920}
          height={typeof window !== 'undefined' ? window.innerHeight : 1080}
          recycle={false}
          numberOfPieces={200}
          gravity={0.3}
          colors={['#10b981', '#3b82f6', '#8b5cf6', '#f59e0b', '#ef4444', '#ec4899']}
        />
      )}
    </div>
  );
});

ThemeSelector.displayName = 'ThemeSelector';

export default ThemeSelector;
