/**
 * Shared types for the adapter layer
 */

export interface BaseEntity {
    _id: string;
    _creationTime: number;
}

export interface SoftDeletable {
    deletedAt?: number;
    deletedBy?: string;
}

export interface Timestamped {
    createdAt?: number;
    updatedAt?: number;
}

export interface Message extends BaseEntity, Timestamped {
    conversationId: string;
    role: 'user' | 'assistant' | 'system';
    content: string;
}

export interface Conversation extends BaseEntity, SoftDeletable, Timestamped {
    title: string;
    userId?: string;
    messages?: Message[];
}

export interface Prompt extends BaseEntity, SoftDeletable, Timestamped {
    title: string;
    content: string;
    description?: string;
    tags?: string[];
    category?: string;
}
