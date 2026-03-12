import { describe, it, expect } from 'vitest';
import { t, setLocale, getLocale, getSupportedLocales } from '../lib/i18n';
import { site } from '../lib/site';

describe('i18n', () => {
    it('returns English translations by default', () => {
        expect(getLocale()).toBe('en');
        expect(t('nav.dashboard')).toBe('Dashboard');
        expect(t('nav.chat')).toBe('Chat');
        expect(t('nav.prompts')).toBe('Prompts');
        expect(t('chat.newChat')).toBe('New Chat');
    });

    it('switches to German locale', () => {
        setLocale('de');
        expect(t('nav.chat')).toBe('Chat');
        expect(t('chat.newChat')).toBe('Neuer Chat');
        expect(t('prompts.addPrompt')).toBe('Prompt hinzufügen');
        setLocale('en');
    });

    it('falls back to key for missing translations', () => {
        expect(t('missing.key')).toBe('missing.key');
    });

    it('lists supported locales', () => {
        const locales = getSupportedLocales();
        expect(locales).toContain('en');
        expect(locales).toContain('de');
    });
});

describe('site', () => {
    it('has required metadata', () => {
        expect(site.name).toBeDefined();
        expect(site.description).toBeDefined();
    });
});

describe('adapter types', () => {
    it('has properly typed exports', async () => {
        const types = await import('../lib/adapters/types');
        expect(types).toBeDefined();
    });
});
