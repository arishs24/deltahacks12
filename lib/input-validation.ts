/**
 * Input validation and sanitization utilities
 * Prevents injection attacks and validates configuration structure
 */

/**
 * Appearance configuration structure
 */
interface AppearanceConfig {
  fonts?: {
    primary?: string;
    heading?: string;
    mono?: string;
  };
  theme?: {
    defaultTheme?: string;
  };
  branding?: {
    appName?: string;
    appTitle?: string;
    appSubtitle?: string;
    appDescription?: string;
    companyName?: string;
    contactEmail?: string;
    storagePrefix?: string;
    exportPrefix?: string;
    logo?: string;
  };
}

/**
 * Validates the appearance configuration structure
 * @param config - Configuration object to validate
 * @returns true if valid, false otherwise
 */
export function validateAppearanceConfig(config: unknown): config is AppearanceConfig {
  if (!config || typeof config !== 'object') {
    return false;
  }

  const cfg = config as Record<string, unknown>;

  // Validate fonts if present
  if (cfg.fonts !== undefined) {
    if (typeof cfg.fonts !== 'object' || cfg.fonts === null) {
      return false;
    }
    const fonts = cfg.fonts as Record<string, unknown>;
    if (fonts.primary !== undefined && typeof fonts.primary !== 'string') {
      return false;
    }
    if (fonts.heading !== undefined && typeof fonts.heading !== 'string') {
      return false;
    }
    if (fonts.mono !== undefined && typeof fonts.mono !== 'string') {
      return false;
    }
  }

  // Validate theme if present
  if (cfg.theme !== undefined) {
    if (typeof cfg.theme !== 'object' || cfg.theme === null) {
      return false;
    }
    const theme = cfg.theme as Record<string, unknown>;
    if (theme.defaultTheme !== undefined && typeof theme.defaultTheme !== 'string') {
      return false;
    }
  }

  // Validate branding if present
  if (cfg.branding !== undefined) {
    if (typeof cfg.branding !== 'object' || cfg.branding === null) {
      return false;
    }
    const branding = cfg.branding as Record<string, unknown>;
    const stringFields = [
      'appName',
      'appTitle',
      'appSubtitle',
      'appDescription',
      'companyName',
      'contactEmail',
      'storagePrefix',
      'exportPrefix',
      'logo',
    ];
    for (const field of stringFields) {
      if (branding[field] !== undefined && typeof branding[field] !== 'string') {
        return false;
      }
    }
  }

  return true;
}

/**
 * Sanitizes the appearance configuration to prevent injection attacks
 * Removes dangerous characters and limits string lengths
 * @param config - Configuration object to sanitize
 * @returns Sanitized configuration object
 */
export function sanitizeAppearanceConfig(config: unknown): AppearanceConfig {
  if (!validateAppearanceConfig(config)) {
    throw new Error('Invalid configuration structure');
  }

  const cfg = config as AppearanceConfig;
  const sanitized: AppearanceConfig = {};

  // Sanitize fonts
  if (cfg.fonts) {
    sanitized.fonts = {};
    if (cfg.fonts.primary) {
      sanitized.fonts.primary = sanitizeString(cfg.fonts.primary, 100);
    }
    if (cfg.fonts.heading) {
      sanitized.fonts.heading = sanitizeString(cfg.fonts.heading, 100);
    }
    if (cfg.fonts.mono) {
      sanitized.fonts.mono = sanitizeString(cfg.fonts.mono, 100);
    }
  }

  // Sanitize theme
  if (cfg.theme) {
    sanitized.theme = {};
    if (cfg.theme.defaultTheme) {
      sanitized.theme.defaultTheme = sanitizeString(cfg.theme.defaultTheme, 50);
    }
  }

  // Sanitize branding
  if (cfg.branding) {
    sanitized.branding = {};
    if (cfg.branding.appName) {
      sanitized.branding.appName = sanitizeString(cfg.branding.appName, 200);
    }
    if (cfg.branding.appTitle) {
      sanitized.branding.appTitle = sanitizeString(cfg.branding.appTitle, 200);
    }
    if (cfg.branding.appSubtitle) {
      sanitized.branding.appSubtitle = sanitizeString(cfg.branding.appSubtitle, 300);
    }
    if (cfg.branding.appDescription) {
      sanitized.branding.appDescription = sanitizeString(cfg.branding.appDescription, 500);
    }
    if (cfg.branding.companyName) {
      sanitized.branding.companyName = sanitizeString(cfg.branding.companyName, 200);
    }
    if (cfg.branding.contactEmail) {
      sanitized.branding.contactEmail = sanitizeEmail(cfg.branding.contactEmail);
    }
    if (cfg.branding.storagePrefix) {
      sanitized.branding.storagePrefix = sanitizeString(cfg.branding.storagePrefix, 100);
    }
    if (cfg.branding.exportPrefix) {
      sanitized.branding.exportPrefix = sanitizeString(cfg.branding.exportPrefix, 100);
    }
    if (cfg.branding.logo) {
      sanitized.branding.logo = sanitizePath(cfg.branding.logo);
    }
  }

  return sanitized;
}

/**
 * Sanitizes a string by removing dangerous characters and limiting length
 * @param str - String to sanitize
 * @param maxLength - Maximum allowed length
 * @returns Sanitized string
 */
function sanitizeString(str: string, maxLength: number): string {
  // Remove null bytes and control characters
  let sanitized = str.replace(/[\x00-\x1F\x7F]/g, '');
  
  // Trim and limit length
  sanitized = sanitized.trim().slice(0, maxLength);
  
  return sanitized;
}

/**
 * Sanitizes an email address
 * @param email - Email to sanitize
 * @returns Sanitized email
 */
function sanitizeEmail(email: string): string {
  // Basic email validation and sanitization
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const sanitized = sanitizeString(email, 254); // RFC 5321 max email length
  
  if (!emailRegex.test(sanitized)) {
    throw new Error('Invalid email format');
  }
  
  return sanitized.toLowerCase();
}

/**
 * Sanitizes a file path to prevent directory traversal
 * @param path - Path to sanitize
 * @returns Sanitized path
 */
function sanitizePath(path: string): string {
  // Remove directory traversal attempts
  let sanitized = path.replace(/\.\./g, '').replace(/\\/g, '/');
  
  // Ensure it starts with / for absolute paths or is relative
  if (!sanitized.startsWith('/') && !sanitized.startsWith('./')) {
    sanitized = '/' + sanitized;
  }
  
  // Remove null bytes and control characters
  sanitized = sanitizeString(sanitized, 500);
  
  return sanitized;
}

