/**
 * 🎨 Branding Configuration
 *
 * This file manages all branding-related configuration from appearance.json.
 * Users can customize their app by editing the appearance.json file.
 */

import appearanceConfig from '../config/appearance.json';

export interface BrandingConfig {
  /** App name used throughout the application */
  appName?: string;
  /** App title used in browser tab and metadata */
  appTitle?: string;
  /** App subtitle/description used in chat interface */
  appSubtitle?: string;
  /** App description used in metadata */
  appDescription?: string;
  /** Company name */
  companyName?: string;
  /** Contact email */
  contactEmail?: string;
  /** Storage prefix for localStorage keys */
  storagePrefix?: string;
  /** Export file prefix for downloaded files */
  exportPrefix?: string;
  /** Logo URL or base64 data URI */
  logo?: string;
}

/**
 * Get branding configuration from appearance.json
 * Falls back to default "Moorcheh" branding if not found
 */
export function getBrandingConfig(): BrandingConfig {
  const branding = appearanceConfig.branding as BrandingConfig | undefined;

  // Handle logo - if it's a data URI, use it directly; otherwise treat as file path
  let logo = branding?.logo;
  if (logo && !logo.startsWith('data:') && !logo.startsWith('/')) {
    // If it's not a data URI or absolute path, assume it's a relative path
    logo = `/assets/${logo}`;
  }

  return {
    appName: branding?.appName || 'Moorcheh AI Assistant',
    appTitle: branding?.appTitle || 'Moorcheh Chat',
    appSubtitle: branding?.appSubtitle || 'Your intelligent chat companion',
    appDescription: branding?.appDescription || 'AI-powered chat application with customizable themes and fonts',
    companyName: branding?.companyName || 'Moorcheh',
    contactEmail: branding?.contactEmail || 'support@moorcheh.ai',
    storagePrefix: branding?.storagePrefix || 'moorcheh-chat',
    exportPrefix: branding?.exportPrefix || 'Moorcheh-chat',
    logo: logo || '/assets/logo.png', // Default to extracted logo file
  };
}

/**
 * Helper functions to get specific branding values
 */
export const branding = {
  getAppName: () => getBrandingConfig().appName || 'Moorcheh AI Assistant',
  getAppTitle: () => getBrandingConfig().appTitle || 'Moorcheh Chat',
  getAppSubtitle: () => getBrandingConfig().appSubtitle || 'Your intelligent chat companion',
  getAppDescription: () => getBrandingConfig().appDescription || 'AI-powered chat application with customizable themes and fonts',
  getCompanyName: () => getBrandingConfig().companyName || 'Moorcheh',
  getContactEmail: () => getBrandingConfig().contactEmail || 'support@moorcheh.ai',
  getStoragePrefix: () => getBrandingConfig().storagePrefix || 'moorcheh-chat',
  getExportPrefix: () => getBrandingConfig().exportPrefix || 'Moorcheh-chat',
  getLogo: () => getBrandingConfig().logo,

  // Storage key helpers
  getThemeStorageKey: () => `${getBrandingConfig().storagePrefix}-theme`,
  getChatDataStorageKey: () => `${getBrandingConfig().storagePrefix}-data`,

  // Export filename helper
  getExportFilename: (date?: Date) => {
    const dateStr = (date || new Date()).toISOString().split('T')[0];
    return `${getBrandingConfig().exportPrefix}-${dateStr}.txt`;
  }
}; 