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

  // Required environment variables
  if (!env.NEXT_PUBLIC_MOORCHEH_API_KEY) {
    errors.push('NEXT_PUBLIC_MOORCHEH_API_KEY is required');
  } else if (env.NEXT_PUBLIC_MOORCHEH_API_KEY.length < 10) {
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

