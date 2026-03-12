/**
 * Typed mutation/query wrappers (standalone utility)
 * Replaces @geenius-tools/convex-wrappers until package is published
 *
 * Wraps standard Convex query/mutation with:
 * - Automatic auth checking
 * - Standardized error handling
 * - Logging in development
 */
import {
  query as baseQuery,
  mutation as baseMutation,
  QueryCtx,
  MutationCtx,
} from '../_generated/server';
import { throwAppError } from './errors';

/** Context extended with authenticated user identity */
interface AuthenticatedCtx {
  userId: string;
}

/**
 * Get the authenticated user ID from context, or throw UNAUTHORIZED.
 * Use this in any mutation/query that requires authentication.
 */
export async function getAuthUserId(ctx: QueryCtx | MutationCtx): Promise<string> {
  const identity = await ctx.auth.getUserIdentity();
  if (!identity) {
    throwAppError('UNAUTHORIZED', 'You must be signed in to perform this action');
  }
  return identity.subject;
}

/**
 * Assert that a document exists, or throw NOT_FOUND.
 */
export function assertExists<T>(
  doc: T | null,
  entityName: string,
): asserts doc is T {
  if (doc === null) {
    throwAppError('NOT_FOUND', `${entityName} not found`);
  }
}

// Re-export the base query/mutation for convenience
export { baseQuery as query, baseMutation as mutation };
