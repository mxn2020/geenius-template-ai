import { useState } from 'react';
import { Plus, Trash2, Copy } from 'lucide-react';
import { useQuery, useMutation } from 'convex/react';
import { Button, Card, CardContent, Input, Textarea, EmptyState } from '@geenius-ui/react';
import { api } from '../../convex/_generated/api';
import { t } from '~/lib/i18n';

export function Prompts() {
    const prompts = useQuery(api.library.prompts.list);
    const createPrompt = useMutation(api.library.prompts.create);
    const removePrompt = useMutation(api.library.prompts.remove);

    const [showForm, setShowForm] = useState(false);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [description, setDescription] = useState('');

    const handleCreate = async () => {
        if (!title.trim() || !content.trim()) return;
        await createPrompt({
            title: title.trim(),
            content: content.trim(),
            description: description.trim() || undefined,
        });
        setTitle('');
        setContent('');
        setDescription('');
        setShowForm(false);
    };

    const handleCopy = (text: string) => {
        navigator.clipboard.writeText(text);
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold text-surface-foreground">{t('prompts.title')}</h2>
                    <p className="text-muted mt-1">{t('prompts.subtitle')}</p>
                </div>
                <Button variant="primary" icon={<Plus size={18} />} onClick={() => setShowForm(!showForm)}>
                    {t('prompts.addPrompt')}
                </Button>
            </div>

            {/* Create Form */}
            {showForm && (
                <Card>
                    <CardContent className="space-y-4">
                        <h3 className="font-semibold text-surface-foreground">{t('prompts.newPrompt')}</h3>
                        <Input
                            label={t('prompts.titleField')}
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder={t('prompts.titlePlaceholder')}
                        />
                        <Input
                            label={t('prompts.descField')}
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder={t('prompts.descPlaceholder')}
                        />
                        <Textarea
                            label={t('prompts.contentField')}
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            placeholder={t('prompts.contentPlaceholder')}
                            resize="none"
                        />
                        <div className="flex gap-2">
                            <Button variant="primary" onClick={handleCreate}>{t('common.create')}</Button>
                            <Button variant="secondary" onClick={() => setShowForm(false)}>{t('common.cancel')}</Button>
                        </div>
                    </CardContent>
                </Card>
            )}

            {/* Prompts Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {prompts === undefined ? (
                    <p className="text-muted col-span-full text-center py-8">{t('common.loading')}</p>
                ) : prompts.length === 0 ? (
                    <div className="col-span-full">
                        <EmptyState
                            title={t('prompts.noPrompts')}
                            variant="default"
                        />
                    </div>
                ) : (
                    prompts.map((prompt) => (
                        <Card key={prompt._id} hover>
                            <CardContent>
                                <div className="flex items-start justify-between mb-2">
                                    <h3 className="font-semibold text-surface-foreground">{prompt.title}</h3>
                                    <div className="flex gap-1">
                                        <Button variant="ghost" size="xs" onClick={() => handleCopy(prompt.content)}>
                                            <Copy size={14} />
                                        </Button>
                                        <Button variant="ghost" size="xs" onClick={() => removePrompt({ id: prompt._id })}>
                                            <Trash2 size={14} />
                                        </Button>
                                    </div>
                                </div>
                                {prompt.description && (
                                    <p className="text-sm text-muted mb-3">{prompt.description}</p>
                                )}
                                <pre className="text-xs bg-secondary/50 p-3 rounded-lg text-secondary-foreground overflow-auto max-h-32 font-mono">
                                    {prompt.content}
                                </pre>
                            </CardContent>
                        </Card>
                    ))
                )}
            </div>
        </div>
    );
}
