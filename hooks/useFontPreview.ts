import { useEffect, useState } from 'react';
import { availableFonts } from '../customize/fonts/available-fonts';

export function useFontPreview(fontName: string) {
  const [isLoaded, setIsLoaded] = useState(false);
  
  useEffect(() => {
    const font = availableFonts[fontName];
    if (!font) return;
    
    // Create a link element for Google Fonts
    const link = document.createElement('link');
    link.href = `https://fonts.googleapis.com/css2?family=${font.googleFontsName}:wght@400;500;600;700&display=swap`;
    link.rel = 'stylesheet';
    
    // Add to head if not already present
    const existingLink = document.querySelector(`link[href*="${font.googleFontsName}"]`);
    if (!existingLink) {
      document.head.appendChild(link);
      
      link.onload = () => setIsLoaded(true);
    } else {
      setIsLoaded(true);
    }
    
    return () => {
      if (!existingLink && link.parentNode) {
        link.parentNode.removeChild(link);
      }
    };
  }, [fontName]);
  
  return {
    isLoaded,
    fontFamily: availableFonts[fontName]?.name || 'inherit',
    fontDefinition: availableFonts[fontName]
  };
}

export function preloadFonts(fontNames: string[]) {
  fontNames.forEach(fontName => {
    const font = availableFonts[fontName];
    if (!font) return;
    
    const link = document.createElement('link');
    link.href = `https://fonts.googleapis.com/css2?family=${font.googleFontsName}:wght@400;500;600;700&display=swap`;
    link.rel = 'stylesheet';
    
    const existingLink = document.querySelector(`link[href*="${font.googleFontsName}"]`);
    if (!existingLink) {
      document.head.appendChild(link);
    }
  });
}
