import { Link, useRouterState } from '@tanstack/react-router';
import { Button } from '@geenius-ui/react';
import { MessageSquare, BookOpen, LayoutDashboard, X, LogOut } from 'lucide-react';
import { useAuthActions } from '@convex-dev/auth/react';
import { site } from '~/lib/site';
import { t } from '~/lib/i18n';

interface SidebarProps {
    isOpen: boolean;
    onClose: () => void;
}

const NAV_ITEMS = [
    { path: '/dashboard' as const, labelKey: 'nav.dashboard', icon: LayoutDashboard },
    { path: '/chat' as const, labelKey: 'nav.chat', icon: MessageSquare },
    { path: '/prompts' as const, labelKey: 'nav.prompts', icon: BookOpen },
];

export function Sidebar({ isOpen, onClose }: SidebarProps) {
    const { signOut } = useAuthActions();
    const routerState = useRouterState();
    const currentPath = routerState.location.pathname;

    return (
        <>
            {isOpen && (
                <div className="fixed inset-0 z-40 bg-black/50 md:hidden" onClick={onClose} />
            )}

            <aside
                className={`fixed inset-y-0 left-0 z-50 w-64 bg-surface border-r border-border transform transition-transform duration-200 ease-in-out md:translate-x-0 md:static md:z-auto ${isOpen ? 'translate-x-0' : '-translate-x-full'
                    }`}
            >
                <div className="flex items-center justify-between h-16 px-4 border-b border-border">
                    <span className="font-bold text-lg text-primary">{site.name}</span>
                    <Button variant="ghost" size="icon" onClick={onClose} className="md:hidden">
                        <X size={18} />
                    </Button>
                </div>

                <nav className="p-3 space-y-1 flex-1">
                    {NAV_ITEMS.map((item) => (
                        <Link
                            key={item.path}
                            to={item.path}
                            onClick={onClose}
                            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${currentPath === item.path
                                    ? 'bg-primary/10 text-primary'
                                    : 'text-muted hover:bg-secondary hover:text-surface-foreground'
                                }`}
                        >
                            <item.icon size={18} />
                            {t(item.labelKey)}
                        </Link>
                    ))}
                </nav>

                <div className="p-3 border-t border-border">
                    <Button
                        variant="ghost"
                        className="w-full justify-start gap-3"
                        icon={<LogOut size={18} />}
                        onClick={() => void signOut()}
                    >
                        {t('common.signOut')}
                    </Button>
                </div>
            </aside>
        </>
    );
}
