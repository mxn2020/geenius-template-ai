import { MessageSquare, BookOpen, Sparkles } from 'lucide-react';
import { useQuery } from 'convex/react';
import { Card, CardContent } from '@geenius-ui/react';
import { api } from '../../convex/_generated/api';
import { t } from '~/lib/i18n';

export function Dashboard() {
    const conversations = useQuery(api.library.conversations.list);
    const prompts = useQuery(api.library.prompts.list);

    const stats = [
        { label: t('nav.chat'), value: String(conversations?.length ?? 0), icon: MessageSquare, color: 'text-primary' },
        { label: t('nav.prompts'), value: String(prompts?.length ?? 0), icon: BookOpen, color: 'text-accent' },
        { label: 'AI Powered', value: '✓', icon: Sparkles, color: 'text-success' },
    ];

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-2xl font-bold text-surface-foreground">{t('dashboard.title')}</h2>
                <p className="text-muted mt-1">{t('dashboard.subtitle')}</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {stats.map((stat) => (
                    <Card key={stat.label} hover>
                        <CardContent>
                            <div className={`w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-3 ${stat.color}`}>
                                <stat.icon size={20} />
                            </div>
                            <div className="text-2xl font-bold text-surface-foreground">{stat.value}</div>
                            <div className="text-sm text-muted mt-1">{stat.label}</div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <Card>
                <CardContent>
                    <h3 className="text-lg font-semibold text-surface-foreground mb-2">{t('dashboard.getStarted.title')}</h3>
                    <p className="text-muted">{t('dashboard.getStarted.desc')}</p>
                </CardContent>
            </Card>
        </div>
    );
}
