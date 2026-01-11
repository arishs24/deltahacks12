/**
 * Environment variable validation
 * Validates required environment variables on startup
 */

import { logger } from './logger';

interface EnvConfig {
  NEXT_PUBLIC_MOORCHEH_API_KEY?: string;
  NODE_ENV?: string;
}

export function validateEnvironment(): { isValid: boolean; errors: string[] } {
  const errors: string[] = [];
  const env = process.env as EnvConfig;

  // API key is optional - only validate if provided (for clinical UI, API key is not required)
  if (env.NEXT_PUBLIC_MOORCHEH_API_KEY && env.NEXT_PUBLIC_MOORCHEH_API_KEY.length < 10) {
    errors.push('NEXT_PUBLIC_MOORCHEH_API_KEY appears to be invalid (too short)');
  }

  // Validate NODE_ENV
  if (env.NODE_ENV && !['development', 'production', 'test'].includes(env.NODE_ENV)) {
    errors.push(`Invalid NODE_ENV: ${env.NODE_ENV}. Must be one of: development, production, test`);
  }

  if (errors.length > 0) {
    logger.error('Environment validation failed:', errors);
  } else {
    logger.info('Environment validation passed');
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}

// Validate on module load (server-side only)
if (typeof window === 'undefined') {
  const validation = validateEnvironment();
  if (!validation.isValid && process.env.NODE_ENV !== 'test') {
    logger.warn('Environment validation warnings:', validation.errors);
  }
}

