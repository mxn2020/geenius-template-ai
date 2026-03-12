import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ConvexReactClient } from 'convex/react';
import { ConvexAuthProvider } from '@convex-dev/auth/react';
import { getEnv } from '~/lib/env';
import { logger } from '~/lib/logger';
import App from './App';
import './index.css';

const convexUrl = getEnv('VITE_CONVEX_URL');
const convex = new ConvexReactClient(convexUrl);

logger.info(`AI template starting (Convex: ${convexUrl.substring(0, 30)}...)`);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ConvexAuthProvider client={convex}>
      <App />
    </ConvexAuthProvider>
  </StrictMode>,
);
