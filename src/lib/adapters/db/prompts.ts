/**
 * Prompts adapter — data access layer
 */
import { useQuery, useMutation } from 'convex/react';
import { api } from '../../../convex/_generated/api';

export const promptsAdapter = {
    useList: () => useQuery(api.library.prompts.list),
    useGet: (id: string) => useQuery(api.library.prompts.get, { id: id as any }),
    useCreate: () => useMutation(api.library.prompts.create),
    useUpdate: () => useMutation(api.library.prompts.update),
    useRemove: () => useMutation(api.library.prompts.remove),
};
