/**
 * Chat Configuration
 * 
 * This file controls which type of chat implementation to use in your application.
 * Change the chatType to switch between different chat implementations.
 * API settings are automatically loaded from config/api-config.json
 */

import { getBrandingConfig } from './branding-config';
import { getApiConfigForChat } from './api-config';
import { logger } from './logger';

export type ChatType = 'widget' | 'interface';

export interface ChatConfig {
  /** The type of chat implementation to use */
  chatType: ChatType;
  
  /** Widget-specific configuration */
  widget: {
    /** Position of the widget on screen */
    position: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
    /** Widget size when minimized */
    size: 'small' | 'medium' | 'large';
    /** Enable/disable widget animations */
    animations: boolean;
    /** Widget theme (inherits from global theme if not specified) */
    theme?: string;
    /** Custom widget icon */
    icon?: string;
    /** Widget z-index */
    zIndex: number;
    /** Offset from screen edges */
    offset: {
      x: number;
      y: number;
    };
  };
  
  /** Interface-specific configuration */
  interface: {
    /** Layout type for the interface */
    layout: 'sidebar' | 'centered' | 'fullscreen';
    /** Show/hide chat history sidebar */
    showSidebar: boolean;
    /** Maximum width for centered layout */
    maxWidth: string;
    /** Enable/disable responsive design */
    responsive: boolean;
    /** Interface theme (inherits from global theme if not specified) */
    theme?: string;
  };
  
  /** Common configuration for both types */
  common: {
    /** Enable/disable file uploads */
    enableFileUpload: boolean;
    /** Enable/disable chat export */
    enableExport: boolean;
    /** Enable/disable chat history */
    enableHistory: boolean;
    /** Maximum number of messages to store */
    maxMessages: number;
    /** API configuration - automatically loaded from config/api-config.json */
    api: {
      namespace: string;
      model?: string;
      temperature?: number;
      topK?: number;
      threshold?: number; // Optional - only present when kiosk_mode is true
      kioskMode?: boolean;
      type?: string;
      headerPrompt?: string;
      footerPrompt?: string;
    };
    /** Branding */
    branding: {
      title: string;
      subtitle?: string;
      logo?: string;
    };
  };
}

/**
 *  MAIN CHAT CONFIGURATION
 * 
 * Change these settings to customize your chat application
 * Branding is automatically loaded from environment variables
 * API settings are automatically loaded from config/api-config.json
 */
export const chatConfig: ChatConfig = {
  // Chat Type - Change this to switch between widget and interface
  chatType: 'interface', // Options: 'widget' | 'interface'
  
  // Widget Configuration
  widget: {
    position: 'bottom-right',
    size: 'medium',
    animations: true,
    zIndex: 1000,
    offset: {
      x: 24, // 24px from right edge
      y: 24, // 24px from bottom edge
    },
  },
  
  // Interface Configuration
  interface: {
    layout: 'sidebar',
    showSidebar: true,
    maxWidth: '1200px',
    responsive: true,
  },
  
  // Common Configuration
  common: {
    enableFileUpload: true,
    enableExport: true,
    enableHistory: true,
    maxMessages: 100,
    // API configuration - Automatically loaded from config/api-config.json
    api: getApiConfigForChat(),
    // Branding - Automatically loaded from appearance.json
    branding: {
      title: getBrandingConfig().appName || 'Moorcheh AI Assistant',
      subtitle: getBrandingConfig().appSubtitle || 'Your intelligent chat companion',
      logo: getBrandingConfig().logo,
    },
  },
};

/**
 * Configuration Helpers
 */

// Get current chat type
export function getChatType(): ChatType {
  return chatConfig.chatType;
}

// Check if current type is widget
export function isWidget(): boolean {
  return chatConfig.chatType === 'widget';
}

// Check if current type is interface
export function isInterface(): boolean {
  return chatConfig.chatType === 'interface';
}

// Get widget configuration
export function getWidgetConfig() {
  return chatConfig.widget;
}

// Get interface configuration
export function getInterfaceConfig() {
  return chatConfig.interface;
}

// Get common configuration
export function getCommonConfig() {
  return chatConfig.common;
}

/**
 * Dynamic API Configuration Helpers
 */

// Get fresh API configuration (re-reads from api-config.json)
export function getFreshApiConfig() {
  return getApiConfigForChat();
}

// Update API configuration dynamically (useful for runtime updates)
export function updateApiConfig() {
  const freshApiConfig = getApiConfigForChat();
  chatConfig.common.api = freshApiConfig;
  return freshApiConfig;
}

/**
 * Theme Integration
 */

// Get theme for current chat type
export function getChatTheme(): string | undefined {
  if (isWidget()) {
    return chatConfig.widget.theme;
  } else {
    return chatConfig.interface.theme;
  }
}

/**
 * Responsive Helpers
 */

// Check if responsive design is enabled
export function isResponsive(): boolean {
  if (isWidget()) {
    return true; // Widgets are always responsive
  } else {
    return chatConfig.interface.responsive;
  }
}

/**
 * Validation
 */

// Validate configuration
export function validateChatConfig(): boolean {
  try {
    // Validate chat type
    if (!['widget', 'interface'].includes(chatConfig.chatType)) {
      logger.error('Invalid chat type:', chatConfig.chatType);
      return false;
    }
    
    // Validate widget config
    if (isWidget()) {
      const { position, size, zIndex, offset } = chatConfig.widget;
      if (!['bottom-right', 'bottom-left', 'top-right', 'top-left'].includes(position)) {
        logger.error('Invalid widget position:', position);
        return false;
      }
      if (!['small', 'medium', 'large'].includes(size)) {
        logger.error('Invalid widget size:', size);
        return false;
      }
      if (typeof zIndex !== 'number' || zIndex < 0) {
        logger.error('Invalid widget zIndex:', zIndex);
        return false;
      }
      if (typeof offset.x !== 'number' || typeof offset.y !== 'number') {
        logger.error('Invalid widget offset:', offset);
        return false;
      }
    }
    
    // Validate interface config
    if (isInterface()) {
      const { layout } = chatConfig.interface;
      if (!['sidebar', 'centered', 'fullscreen'].includes(layout)) {
        logger.error('Invalid interface layout:', layout);
        return false;
      }
    }
    
    // Validate API config
    const apiConfig = chatConfig.common.api;
    if (!apiConfig.namespace) {
      logger.error('API namespace is required');
      return false;
    }
    
    return true;
  } catch (error) {
    logger.error('Error validating chat config:', error);
    return false;
  }
} 