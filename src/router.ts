import { createRouter, createRoute, createRootRoute, Outlet, Link, useRouterState, redirect } from '@tanstack/react-router';
import { AppLayout } from '~/components/AppLayout';
import { Dashboard } from '~/routes/Dashboard';
import { Chat } from '~/routes/Chat';
import { Prompts } from '~/routes/Prompts';

const rootRoute = createRootRoute({
    component: AppLayout,
});

const indexRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/',
    beforeLoad: () => { throw redirect({ to: '/dashboard' }); },
});

const dashboardRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/dashboard',
    component: Dashboard,
});

const chatRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/chat',
    component: Chat,
});

const promptsRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/prompts',
    component: Prompts,
});

const routeTree = rootRoute.addChildren([indexRoute, dashboardRoute, chatRoute, promptsRoute]);

export const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
    interface Register {
        router: typeof router;
    }
}

export { Link, useRouterState };
