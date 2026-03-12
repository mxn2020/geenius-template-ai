/**
 * Type-safe environment variable access (standalone utility)
 * Replaces @geenius-tools/env until package is published
 */

/** Get a required env var — throws with clear message if missing */
export function getEnv(key: string): string {
  const value = import.meta.env[key] as string | undefined;
  if (!value) {
    throw new Error(
      `[env] Missing required environment variable: ${key}. ` +
      `Check your .env file or environment configuration.`,
    );
  }
  return value;
}

/** Get an optional env var with a fallback */
export function getEnvOrDefault(key: string, fallback: string): string {
  return (import.meta.env[key] as string | undefined) ?? fallback;
}

/** Runtime environment checks */
export const isDev = import.meta.env.DEV;
export const isProd = import.meta.env.PROD;
export const mode = import.meta.env.MODE;
