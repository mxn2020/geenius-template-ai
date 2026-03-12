import { useState } from 'react';
import { Outlet, useRouterState } from '@tanstack/react-router';
import { Sidebar } from '~/components/Sidebar';
import { TopBar } from '~/components/TopBar';
import { t } from '~/lib/i18n';

const PAGE_TITLES: Record<string, string> = {
    '/dashboard': 'nav.dashboard',
    '/chat': 'nav.chat',
    '/prompts': 'nav.prompts',
};

export function AppLayout() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const routerState = useRouterState();
    const currentPath = routerState.location.pathname;
    const titleKey = PAGE_TITLES[currentPath] || 'nav.dashboard';

    return (
        <div className="flex h-screen bg-secondary/30">
            <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
            <div className="flex-1 flex flex-col min-w-0">
                <TopBar
                    title={t(titleKey)}
                    onMenuClick={() => setSidebarOpen(!sidebarOpen)}
                />
                <main className="flex-1 overflow-auto p-4 md:p-6">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}
