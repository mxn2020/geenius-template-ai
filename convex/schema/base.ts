// convex/schema/base.ts

import { v } from 'convex/values';

// Field Groups (composable)
export const auditFields = {
    createdBy: v.optional(v.string()),
    createdAt: v.number(),
    updatedBy: v.optional(v.string()),
    updatedAt: v.optional(v.number()),
};

export const softDeleteFields = {
    deletedAt: v.optional(v.number()),
    deletedBy: v.optional(v.string()),
};

export const searchableFields = {
    searchableText: v.optional(v.string()),
};

export const classificationFields = {
    tags: v.optional(v.array(v.string())),
    category: v.optional(v.string()),
};

// Common Validators
export const status = v.union(
    v.literal('active'),
    v.literal('inactive'),
    v.literal('archived'),
);

export const priority = v.union(
    v.literal('low'),
    v.literal('normal'),
    v.literal('high'),
    v.literal('urgent'),
);
