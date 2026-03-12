/**
 * Auth adapter — wraps ConvexAuth for React usage
 */
import { useConvexAuth } from 'convex/react';

export const authQuery = {
    useAuth: () => useConvexAuth(),
};
