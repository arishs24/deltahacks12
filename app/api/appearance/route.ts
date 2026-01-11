import { NextResponse } from 'next/server';
import { readFileSync, existsSync } from 'fs';
import { getAppearanceConfigPath } from '@/lib/path-utils';
import { logger } from '@/lib/logger';
import { FILE_CONSTANTS } from '@/lib/constants';

export async function GET() {
  try {
    // Get safe config path
    const configPath = getAppearanceConfigPath();

    // Check if file exists
    if (!existsSync(configPath)) {
      logger.warn('Appearance configuration file not found:', configPath);
      return NextResponse.json(
        { error: 'Configuration file not found' },
        { status: 404 }
      );
    }

    // Read the current appearance.json file
    const configData = readFileSync(configPath, 'utf8');

    // Validate file size
    if (configData.length > FILE_CONSTANTS.MAX_CONFIG_SIZE) {
      logger.error('Configuration file too large:', configData.length);
      return NextResponse.json(
        { error: 'Configuration file too large' },
        { status: 500 }
      );
    }

    const config = JSON.parse(configData);

    return NextResponse.json(config);
  } catch (error) {
    logger.error('Error reading appearance configuration:', error);
    return NextResponse.json(
      { error: 'Failed to read appearance configuration' },
      { status: 500 }
    );
  }
}
