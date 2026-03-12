// convex/schema/system/index.ts

import { v } from 'convex/values';
import { auditFields } from '../base';

/** System tables — users */
export const userProfiles = {
    userId: v.string(),
    displayName: v.optional(v.string()),
    avatarUrl: v.optional(v.string()),
    ...auditFields,
};
