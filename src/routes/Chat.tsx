import { useState, useRef, useEffect } from 'react';
import { Send, Plus, Trash2, MessageSquare } from 'lucide-react';
import { useQuery, useMutation } from 'convex/react';
import { Button, Card, Input, EmptyState } from '@geenius-ui/react';
import { api } from '../../convex/_generated/api';
import { t } from '~/lib/i18n';

export function Chat() {
    const conversations = useQuery(api.library.conversations.list);
    const createConversation = useMutation(api.library.conversations.create);
    const addMessage = useMutation(api.library.conversations.addMessage);
    const removeConversation = useMutation(api.library.conversations.remove);

    const [activeConvId, setActiveConvId] = useState<string | null>(null);
    const activeConversation = useQuery(
        api.library.conversations.getWithMessages,
        activeConvId ? { id: activeConvId as any } : 'skip',
    );

    const [input, setInput] = useState('');
    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [activeConversation?.messages]);

    const handleSend = async () => {
        if (!input.trim() || !activeConvId) return;
        const message = input.trim();
        setInput('');

        await addMessage({
            conversationId: activeConvId as any,
            role: 'user',
            content: message,
        });

        // Simulate AI response (replace with real AI provider)
        setTimeout(async () => {
            await addMessage({
                conversationId: activeConvId as any,
                role: 'assistant',
                content: t('chat.aiResponse'),
            });
        }, 1000);
    };

    const handleNewConversation = async () => {
        const id = await createConversation({ title: `Chat ${(conversations?.length ?? 0) + 1}` });
        setActiveConvId(id);
    };

    return (
        <div className="flex h-[calc(100vh-8rem)] gap-4">
            {/* Conversation List */}
            <Card className="w-64 flex-shrink-0 flex-col hidden lg:flex">
                <div className="p-3 border-b border-border">
                    <Button variant="primary" className="w-full" icon={<Plus size={16} />} onClick={handleNewConversation}>
                        {t('chat.newChat')}
                    </Button>
                </div>
                <div className="flex-1 overflow-auto p-2 space-y-1">
                    {conversations?.map((conv) => (
                        <div
                            key={conv._id}
                            className={`group flex items-center justify-between px-3 py-2 rounded-lg text-sm cursor-pointer transition-colors ${activeConvId === conv._id
                                    ? 'bg-primary/10 text-primary'
                                    : 'text-muted hover:bg-secondary'
                                }`}
                            onClick={() => setActiveConvId(conv._id)}
                        >
                            <span className="truncate">{conv.title}</span>
                            <Button
                                variant="ghost"
                                size="xs"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    removeConversation({ id: conv._id });
                                    if (activeConvId === conv._id) setActiveConvId(null);
                                }}
                                className="opacity-0 group-hover:opacity-100"
                            >
                                <Trash2 size={14} />
                            </Button>
                        </div>
                    ))}
                    {(!conversations || conversations.length === 0) && (
                        <p className="text-sm text-muted text-center py-4">{t('chat.noConversations')}</p>
                    )}
                </div>
            </Card>

            {/* Chat Area */}
            <Card className="flex-1 flex flex-col">
                {activeConvId && activeConversation ? (
                    <>
                        {/* Messages */}
                        <div className="flex-1 overflow-auto p-4 space-y-4">
                            {activeConversation.messages?.map((msg) => (
                                <div
                                    key={msg._id}
                                    className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                                >
                                    <div
                                        className={`max-w-[75%] px-4 py-2.5 rounded-2xl text-sm ${msg.role === 'user'
                                                ? 'bg-primary text-primary-foreground rounded-br-md'
                                                : 'bg-secondary text-secondary-foreground rounded-bl-md'
                                            }`}
                                    >
                                        {msg.content}
                                    </div>
                                </div>
                            ))}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input */}
                        <div className="p-4 border-t border-border">
                            <form
                                onSubmit={(e) => { e.preventDefault(); handleSend(); }}
                                className="flex gap-2"
                            >
                                <Input
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    placeholder={t('chat.messagePlaceholder')}
                                    className="flex-1"
                                />
                                <Button variant="primary" type="submit" disabled={!input.trim()} size="icon">
                                    <Send size={18} />
                                </Button>
                            </form>
                        </div>
                    </>
                ) : (
                    <div className="flex-1 flex items-center justify-center">
                        <EmptyState
                            title={t('chat.noSelected.title')}
                            description={t('chat.noSelected.desc')}
                            variant="messages"
                        />
                    </div>
                )}
            </Card>
        </div>
    );
}
