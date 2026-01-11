/**
 * Logger utility for consistent logging across the application
 * Replaces console statements with proper logging levels
 */

type LogLevel = 'debug' | 'info' | 'warn' | 'error';

class Logger {
  private isDevelopment = process.env.NODE_ENV === 'development';

  private log(level: LogLevel, message: string, ...args: unknown[]): void {
    if (!this.isDevelopment && level === 'debug') {
      return;
    }

    const timestamp = new Date().toISOString();
    const prefix = `[${timestamp}] [${level.toUpperCase()}]`;

    switch (level) {
      case 'debug':
        // eslint-disable-next-line no-console
        console.debug(prefix, message, ...args);
        break;
      case 'info':
        // eslint-disable-next-line no-console
        console.info(prefix, message, ...args);
        break;
      case 'warn':
        // eslint-disable-next-line no-console
        console.warn(prefix, message, ...args);
        break;
      case 'error':
        // eslint-disable-next-line no-console
        console.error(prefix, message, ...args);
        break;
    }
  }

  debug(message: string, ...args: unknown[]): void {
    this.log('debug', message, ...args);
  }

  info(message: string, ...args: unknown[]): void {
    this.log('info', message, ...args);
  }

  warn(message: string, ...args: unknown[]): void {
    this.log('warn', message, ...args);
  }

  error(message: string, ...args: unknown[]): void {
    this.log('error', message, ...args);
  }
}

export const logger = new Logger();

