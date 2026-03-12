import { useState } from 'react';
import { useAuthActions } from '@convex-dev/auth/react';
import { Card, CardContent, CardHeader, CardTitle, Input, Button } from '@geenius-ui/react';
import { site } from '~/lib/site';
import { t } from '~/lib/i18n';

export function SignIn() {
    const { signIn } = useAuthActions();
    const [flow, setFlow] = useState<'signIn' | 'signUp'>('signIn');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        try {
            await signIn('password', { email, password, flow });
        } catch {
            setError(flow === 'signIn' ? t('auth.invalidCredentials') : t('auth.createFailed'));
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-secondary/30 px-4">
            <div className="w-full max-w-sm">
                <div className="text-center mb-8">
                    <div className="font-bold text-2xl text-primary mb-2">{site.name}</div>
                    <p className="text-sm text-muted">{site.description}</p>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>
                            {flow === 'signIn' ? t('common.signIn') : t('auth.createAccount')}
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <Input
                                label={t('auth.email')}
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="you@example.com"
                                required
                            />
                            <Input
                                label={t('auth.password')}
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••"
                                required
                            />
                            {error && <p className="text-sm text-danger">{error}</p>}
                            <Button variant="primary" type="submit" className="w-full">
                                {flow === 'signIn' ? t('common.signIn') : t('common.signUp')}
                            </Button>
                        </form>

                        <div className="mt-4 text-center text-sm text-muted">
                            {flow === 'signIn' ? (
                                <>
                                    {t('common.noAccount')}{' '}
                                    <button onClick={() => setFlow('signUp')} className="text-primary font-medium hover:underline">
                                        {t('common.signUp')}
                                    </button>
                                </>
                            ) : (
                                <>
                                    {t('common.hasAccount')}{' '}
                                    <button onClick={() => setFlow('signIn')} className="text-primary font-medium hover:underline">
                                        {t('common.signIn')}
                                    </button>
                                </>
                            )}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
