// convex/schema.ts

import { defineSchema, defineTable } from 'convex/server';
import { authTables } from '@convex-dev/auth/server';
import { conversations, messages, prompts } from './schema/application';
import { userProfiles } from './schema/system';

const schema = defineSchema({
    ...authTables,
    userProfiles: defineTable(userProfiles),
    conversations: defineTable(conversations).index('by_userId', ['userId']),
    messages: defineTable(messages).index('by_conversationId', ['conversationId']),
    prompts: defineTable(prompts),
});

export default schema;
