/**
 * Conversations adapter — data access layer
 */
import { useQuery, useMutation } from 'convex/react';
import { api } from '../../../convex/_generated/api';

export const conversationsAdapter = {
    useList: () => useQuery(api.library.conversations.list),
    useGetWithMessages: (id: string) =>
        useQuery(api.library.conversations.getWithMessages, { id: id as any }),
    useCreate: () => useMutation(api.library.conversations.create),
    useAddMessage: () => useMutation(api.library.conversations.addMessage),
    useRemove: () => useMutation(api.library.conversations.remove),
};
