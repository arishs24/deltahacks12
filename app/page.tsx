"use client";

import { useEffect, useState } from "react";
import DynamicChat from "../components/chat/DynamicChat";
import { getChatType, getWidgetConfig } from "../lib/chat-config";
import { useIsMobile } from "../hooks/use-mobile";

export default function Home() {
  const [chatType, setChatType] = useState<'widget' | 'interface' | null>(null);
  const isMobile = useIsMobile();

  useEffect(() => {
    setChatType(getChatType());
  }, []);

  // Get widget configuration for positioning
  const widgetConfig = getWidgetConfig();
  
  const getWidgetPositionStyles = () => {
    const { position, offset } = widgetConfig;
    
    // Adjust positioning for mobile
    const mobileOffset = {
      x: isMobile ? Math.max(offset.x, 16) : offset.x,
      y: isMobile ? Math.max(offset.y, 16) : offset.y,
    };
    
    switch (position) {
      case 'bottom-right':
        return { 
          bottom: `${mobileOffset.y}px`, 
          right: `${mobileOffset.x}px` 
        };
      case 'bottom-left':
        return { 
          bottom: `${mobileOffset.y}px`, 
          left: `${mobileOffset.x}px` 
        };
      case 'top-right':
        return { 
          top: `${mobileOffset.y}px`, 
          right: `${mobileOffset.x}px` 
        };
      case 'top-left':
        return { 
          top: `${mobileOffset.y}px`, 
          left: `${mobileOffset.x}px` 
        };
      default:
        return { 
          bottom: isMobile ? '16px' : '24px', 
          right: isMobile ? '16px' : '24px' 
        };
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto py-4 sm:py-6 lg:py-8">
        
        {/* Dynamic Chat - Renders widget or interface based on config */}
        {chatType === 'widget' ? (
          // Widget mode - position in corner with mobile-friendly positioning
          <div 
            className="fixed z-[1000] safe-area-bottom safe-area-right"
            style={{
              ...getWidgetPositionStyles(),
              zIndex: widgetConfig.zIndex
            }}
          >
            <DynamicChat />
          </div>
        ) : (
          // Interface mode - responsive centered layout
          <div className="w-full max-w-7xl mx-auto px-2 sm:px-4">
            <DynamicChat />
          </div>
        )}
      </main>
    </div>
  );
}
