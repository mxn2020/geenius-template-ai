/**
 * Typed Convex error handling (standalone utility)
 * Replaces @geenius-tools/convex-errors until package is published
 */
import { ConvexError } from 'convex/values';

/** Application error codes */
export type AppErrorCode =
  | 'NOT_FOUND'
  | 'UNAUTHORIZED'
  | 'FORBIDDEN'
  | 'VALIDATION_ERROR'
  | 'CONFLICT'
  | 'INTERNAL_ERROR';

/** Typed error data */
export interface AppErrorData {
  code: AppErrorCode;
  message: string;
  details?: Record<string, unknown>;
}

/** Throw a typed Convex error */
export function throwAppError(
  code: AppErrorCode,
  message: string,
  details?: Record<string, unknown>,
): never {
  throw new ConvexError<AppErrorData>({ code, message, details });
}

/** Check if an error is a typed app error */
export function isAppError(error: unknown): error is ConvexError<AppErrorData> {
  return error instanceof ConvexError && typeof (error.data as any)?.code === 'string';
}

/** Extract user-friendly message from any error */
export function getErrorMessage(error: unknown): string {
  if (isAppError(error)) {
    return error.data.message;
  }
  if (error instanceof Error) {
    return error.message;
  }
  return 'An unexpected error occurred';
}
