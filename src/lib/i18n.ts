const translations: Record<string, Record<string, string>> = {
  en: {
    'common.loading': 'Loading...',
    'common.save': 'Save Changes',
    'common.cancel': 'Cancel',
    'common.delete': 'Delete',
    'common.create': 'Create',
    'common.signIn': 'Sign In',
    'common.signOut': 'Sign Out',
    'common.signUp': 'Sign Up',
    'common.noAccount': "Don't have an account?",
    'common.hasAccount': 'Already have an account?',

    'nav.dashboard': 'Dashboard',
    'nav.chat': 'Chat',
    'nav.prompts': 'Prompts',

    'dashboard.title': 'AI Dashboard',
    'dashboard.subtitle': 'Manage your conversations and prompts.',
    'dashboard.getStarted.title': 'Getting Started',
    'dashboard.getStarted.desc': 'This template includes an AI chat interface and prompt management. Navigate to Chat to start a conversation, or Prompts to manage your reusable prompts.',

    'chat.title': 'Chat',
    'chat.newChat': 'New Chat',
    'chat.noConversations': 'No conversations yet',
    'chat.noSelected.title': 'No conversation selected',
    'chat.noSelected.desc': 'Create a new chat or select one from the sidebar.',
    'chat.messagePlaceholder': 'Type a message...',
    'chat.aiResponse': 'This is a placeholder response. Connect your AI provider in the Convex backend to enable real responses.',

    'prompts.title': 'Prompts',
    'prompts.subtitle': 'Manage your reusable AI prompts.',
    'prompts.addPrompt': 'Add Prompt',
    'prompts.newPrompt': 'New Prompt',
    'prompts.titleField': 'Title',
    'prompts.titlePlaceholder': 'Prompt title...',
    'prompts.descField': 'Description',
    'prompts.descPlaceholder': 'Short description...',
    'prompts.contentField': 'Prompt Content',
    'prompts.contentPlaceholder': 'Write your prompt template here...',
    'prompts.noPrompts': 'No prompts yet. Click "Add Prompt" to create one.',

    'auth.email': 'Email',
    'auth.password': 'Password',
    'auth.createAccount': 'Create Account',
    'auth.invalidCredentials': 'Invalid email or password.',
    'auth.createFailed': 'Could not create account.',
  },
  de: {
    'common.loading': 'Wird geladen...',
    'common.save': 'Änderungen speichern',
    'common.cancel': 'Abbrechen',
    'common.delete': 'Löschen',
    'common.create': 'Erstellen',
    'common.signIn': 'Anmelden',
    'common.signOut': 'Abmelden',
    'common.signUp': 'Registrieren',
    'common.noAccount': 'Noch kein Konto?',
    'common.hasAccount': 'Bereits ein Konto?',

    'nav.dashboard': 'Übersicht',
    'nav.chat': 'Chat',
    'nav.prompts': 'Prompts',

    'dashboard.title': 'KI-Dashboard',
    'dashboard.subtitle': 'Verwalte deine Konversationen und Prompts.',
    'dashboard.getStarted.title': 'Erste Schritte',
    'dashboard.getStarted.desc': 'Dieses Template enthält eine KI-Chat-Oberfläche und Prompt-Verwaltung.',

    'chat.title': 'Chat',
    'chat.newChat': 'Neuer Chat',
    'chat.noConversations': 'Noch keine Konversationen',
    'chat.noSelected.title': 'Keine Konversation ausgewählt',
    'chat.noSelected.desc': 'Erstelle einen neuen Chat oder wähle einen aus der Seitenleiste.',
    'chat.messagePlaceholder': 'Nachricht eingeben...',
    'chat.aiResponse': 'Dies ist eine Platzhalter-Antwort. Verbinde deinen KI-Anbieter im Convex-Backend.',

    'prompts.title': 'Prompts',
    'prompts.subtitle': 'Verwalte deine wiederverwendbaren KI-Prompts.',
    'prompts.addPrompt': 'Prompt hinzufügen',
    'prompts.newPrompt': 'Neuer Prompt',
    'prompts.titleField': 'Titel',
    'prompts.titlePlaceholder': 'Prompt-Titel...',
    'prompts.descField': 'Beschreibung',
    'prompts.descPlaceholder': 'Kurze Beschreibung...',
    'prompts.contentField': 'Prompt-Inhalt',
    'prompts.contentPlaceholder': 'Schreibe dein Prompt-Vorlage hier...',
    'prompts.noPrompts': 'Noch keine Prompts. Klicke auf "Prompt hinzufügen".',

    'auth.email': 'E-Mail',
    'auth.password': 'Passwort',
    'auth.createAccount': 'Konto erstellen',
    'auth.invalidCredentials': 'Ungültige E-Mail oder Passwort.',
    'auth.createFailed': 'Konto konnte nicht erstellt werden.',
  },
};

let currentLocale = 'en';

export function setLocale(locale: string): void {
  if (translations[locale]) currentLocale = locale;
}
export function getLocale(): string {
  return currentLocale;
}
export function t(key: string): string {
  return translations[currentLocale]?.[key] ?? translations['en']?.[key] ?? key;
}
export function getSupportedLocales(): string[] {
  return Object.keys(translations);
}
