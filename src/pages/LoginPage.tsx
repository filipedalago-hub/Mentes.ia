import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, AlertCircle } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { Logo } from '../components/Logo';
import { Button, Input, Card } from '../components/ui';
import { analytics } from '../lib/analytics';

export function LoginPage() {
  const navigate = useNavigate();
  const { signIn } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Por favor, preencha todos os campos');
      return;
    }

    setLoading(true);

    try {
      const { error: signInError } = await signIn(email, password);

      if (signInError) {
        setError(signInError.message || 'Erro ao fazer login');
        setLoading(false);
      } else {
        analytics.pageView('/app', 'Dashboard');
        navigate('/app', { replace: true });
      }
    } catch (err) {
      setError('Erro inesperado. Tente novamente.');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-dark flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10 pointer-events-none" />

      <Card variant="glow" className="w-full max-w-md relative z-10">
        <div className="text-center mb-8">
          <Logo size="lg" className="mx-auto mb-6" />
          <h1 className="text-3xl font-bold text-soft-white mb-2">
            Bem-vindo de volta
          </h1>
          <p className="text-soft-muted">
            Entre para continuar sua jornada de transformação
          </p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-xl flex items-start gap-3 animate-scaleIn">
            <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-red-400">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <Input
            type="email"
            label="E-mail"
            placeholder="seu@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            icon={<Mail size={20} />}
            required
            autoComplete="email"
          />

          <Input
            type="password"
            label="Senha"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            icon={<Lock size={20} />}
            required
            autoComplete="current-password"
          />

          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                className="w-4 h-4 bg-dark-lighter border-titanium/30 rounded focus:ring-primary"
              />
              <span className="text-soft-muted">Lembrar de mim</span>
            </label>

            <Link
              to="/recuperar-senha"
              className="text-primary hover:text-primary/80 transition-colors"
            >
              Esqueceu a senha?
            </Link>
          </div>

          <Button
            type="submit"
            variant="primary"
            size="lg"
            fullWidth
            loading={loading}
            disabled={loading}
          >
            Entrar
          </Button>
        </form>

        <div className="mt-6 text-center text-sm">
          <span className="text-soft-muted">Ainda não tem uma conta?</span>{' '}
          <Link
            to="/signup"
            className="text-primary hover:text-primary/80 font-semibold transition-colors"
          >
            Criar conta grátis
          </Link>
        </div>

        <div className="mt-6 pt-6 border-t border-titanium/30 text-center">
          <Link
            to="/"
            className="text-soft-muted hover:text-soft-white transition-colors text-sm"
          >
            ← Voltar para home
          </Link>
        </div>
      </Card>
    </div>
  );
}
