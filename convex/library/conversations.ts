// convex/library/conversations.ts

import { query, mutation } from '../_generated/server';
import { v } from 'convex/values';

/** List all non-deleted conversations */
export const list = query({
    args: {},
    handler: async (ctx) => {
        return await ctx.db
            .query('conversations')
            .filter((q) => q.eq(q.field('deletedAt'), undefined))
            .order('desc')
            .collect();
    },
});

/** Get a single conversation with its messages */
export const getWithMessages = query({
    args: { id: v.id('conversations') },
    handler: async (ctx, { id }) => {
        const conversation = await ctx.db.get(id);
        if (!conversation) return null;

        const messages = await ctx.db
            .query('messages')
            .withIndex('by_conversationId', (q) => q.eq('conversationId', id))
            .order('asc')
            .collect();

        return { ...conversation, messages };
    },
});

/** Create a new conversation */
export const create = mutation({
    args: { title: v.string() },
    handler: async (ctx, { title }) => {
        return await ctx.db.insert('conversations', {
            title,
            createdAt: Date.now(),
        });
    },
});

/** Add a message to a conversation */
export const addMessage = mutation({
    args: {
        conversationId: v.id('conversations'),
        role: v.union(v.literal('user'), v.literal('assistant'), v.literal('system')),
        content: v.string(),
    },
    handler: async (ctx, args) => {
        return await ctx.db.insert('messages', {
            ...args,
            createdAt: Date.now(),
        });
    },
});

/** Soft-delete a conversation */
export const remove = mutation({
    args: { id: v.id('conversations') },
    handler: async (ctx, { id }) => {
        await ctx.db.patch(id, { deletedAt: Date.now() });
    },
});
