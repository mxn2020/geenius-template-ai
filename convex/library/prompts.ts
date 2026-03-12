// convex/library/prompts.ts

import { query, mutation } from '../_generated/server';
import { v } from 'convex/values';

/** List all non-deleted prompts */
export const list = query({
    args: {},
    handler: async (ctx) => {
        return await ctx.db
            .query('prompts')
            .filter((q) => q.eq(q.field('deletedAt'), undefined))
            .order('desc')
            .collect();
    },
});

/** Get a single prompt */
export const get = query({
    args: { id: v.id('prompts') },
    handler: async (ctx, { id }) => {
        return await ctx.db.get(id);
    },
});

/** Create a new prompt */
export const create = mutation({
    args: {
        title: v.string(),
        content: v.string(),
        description: v.optional(v.string()),
        tags: v.optional(v.array(v.string())),
        category: v.optional(v.string()),
    },
    handler: async (ctx, args) => {
        return await ctx.db.insert('prompts', {
            ...args,
            createdAt: Date.now(),
        });
    },
});

/** Update a prompt */
export const update = mutation({
    args: {
        id: v.id('prompts'),
        title: v.optional(v.string()),
        content: v.optional(v.string()),
        description: v.optional(v.string()),
        tags: v.optional(v.array(v.string())),
        category: v.optional(v.string()),
    },
    handler: async (ctx, { id, ...updates }) => {
        await ctx.db.patch(id, {
            ...updates,
            updatedAt: Date.now(),
        });
    },
});

/** Soft-delete a prompt */
export const remove = mutation({
    args: { id: v.id('prompts') },
    handler: async (ctx, { id }) => {
        await ctx.db.patch(id, { deletedAt: Date.now() });
    },
});
