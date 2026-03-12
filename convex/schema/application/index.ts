// convex/schema/application/index.ts

import { v } from 'convex/values';
import { auditFields, softDeleteFields, classificationFields } from '../base';

/** Conversations — chat threads */
export const conversations = {
    title: v.string(),
    userId: v.optional(v.string()),
    ...auditFields,
    ...softDeleteFields,
};

/** Messages — individual chat messages */
export const messages = {
    conversationId: v.id('conversations'),
    role: v.union(v.literal('user'), v.literal('assistant'), v.literal('system')),
    content: v.string(),
    ...auditFields,
};

/** Prompts — saved and reusable prompts */
export const prompts = {
    title: v.string(),
    content: v.string(),
    description: v.optional(v.string()),
    ...classificationFields,
    ...auditFields,
    ...softDeleteFields,
};
