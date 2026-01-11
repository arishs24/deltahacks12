import { NextRequest, NextResponse } from 'next/server';
import { writeFileSync, existsSync, mkdirSync } from 'fs';
import { dirname } from 'path';
import { getAppearanceConfigPath } from '@/lib/path-utils';
import { validateAppearanceConfig, sanitizeAppearanceConfig } from '@/lib/input-validation';
import { logger } from '@/lib/logger';
import { FILE_CONSTANTS } from '@/lib/constants';

export async function POST(request: NextRequest) {
  try {
    const config = await request.json();

    // Validate the configuration structure
    if (!validateAppearanceConfig(config)) {
      logger.warn('Invalid appearance configuration structure');
      return NextResponse.json(
        { error: 'Invalid configuration structure' },
        { status: 400 }
      );
    }

    // Sanitize input to prevent injection attacks
    const sanitizedConfig = sanitizeAppearanceConfig(config);

    // Get safe config path
    const configPath = getAppearanceConfigPath();

    // Ensure config directory exists
    const configDir = dirname(configPath);
    if (!existsSync(configDir)) {
      mkdirSync(configDir, { recursive: true });
    }

    // Validate file size before writing
    const configJson = JSON.stringify(sanitizedConfig, null, 2);
    if (configJson.length > FILE_CONSTANTS.MAX_CONFIG_SIZE) {
      logger.error('Configuration file too large:', configJson.length);
      return NextResponse.json(
        { error: 'Configuration file too large' },
        { status: 400 }
      );
    }

    // Write to appearance.json
    writeFileSync(configPath, configJson, 'utf8');
    logger.info('Appearance configuration updated successfully');

    return NextResponse.json({
      success: true,
      message: 'Appearance configuration updated successfully'
    });
  } catch (error) {
    logger.error('Error updating appearance configuration:', error);
    return NextResponse.json(
      { error: 'Failed to update appearance configuration' },
      { status: 500 }
    );
  }
}
