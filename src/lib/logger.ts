/**
 * Structured logger (standalone utility)
 * Replaces @geenius-tools/logger-react until package is published
 */
import { isDev } from './env';

type LogLevel = 'debug' | 'info' | 'warn' | 'error';

const LOG_COLORS: Record<LogLevel, string> = {
  debug: '\x1b[90m',  // gray
  info: '\x1b[36m',   // cyan
  warn: '\x1b[33m',   // yellow
  error: '\x1b[31m',  // red
};
const RESET = '\x1b[0m';

function log(level: LogLevel, context: string, message: string, data?: unknown): void {
  // Only log debug/info in development
  if (!isDev && (level === 'debug' || level === 'info')) return;

  const timestamp = new Date().toISOString();
  const color = LOG_COLORS[level];
  const prefix = `${color}[${level.toUpperCase()}]${RESET} ${timestamp} [${context}]`;

  if (data !== undefined) {
    console[level === 'debug' ? 'log' : level](`${prefix} ${message}`, data);
  } else {
    console[level === 'debug' ? 'log' : level](`${prefix} ${message}`);
  }
}

/** Create a logger scoped to a component or module */
export function createLogger(context: string) {
  return {
    debug: (message: string, data?: unknown) => log('debug', context, message, data),
    info: (message: string, data?: unknown) => log('info', context, message, data),
    warn: (message: string, data?: unknown) => log('warn', context, message, data),
    error: (message: string, data?: unknown) => log('error', context, message, data),
  };
}

/** Default app logger */
export const logger = createLogger('App');
