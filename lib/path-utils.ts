/**
 * Path utilities for safe file system operations
 * Provides secure path resolution for configuration files
 */

import { join } from 'path';
import { FILE_CONSTANTS } from './constants';

/**
 * Get the safe path to the appearance configuration file
 * Resolves to config/appearance.json relative to project root
 * @returns Absolute path to appearance.json
 */
export function getAppearanceConfigPath(): string {
  const projectRoot = process.cwd();
  return join(projectRoot, FILE_CONSTANTS.CONFIG_DIR, FILE_CONSTANTS.CONFIG_FILE);
}

