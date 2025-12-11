import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, User, AlertCircle, CheckCircle } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { Logo } from '../components/Logo';
import { Button, Input, Card, Checkbox } from '../components/ui';
import { analytics } from '../lib/analytics';

export function SignupPage() {
  const navigate = useNavigate();
  const { signUp } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const validateForm = () => {
    if (!name.trim()) {
      setError('Por favor, informe seu nome');
      return false;
    }

    if (!email.includes('@')) {
      setError('Por favor, informe um e-mail válido');
      return false;
    }

    if (password.length < 6) {
      setError('A senha deve ter no mínimo 6 caracteres');
      return false;
    }

    if (password !== confirmPassword) {
      setError('As senhas não coincidem');
      return false;
    }

    if (!acceptTerms) {
      setError('Você deve aceitar os termos de uso');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!validateForm()) return;

    setLoading(true);

    try {
      const { error: signUpError } = await signUp(email, password, name);

      if (signUpError) {
        setError(signUpError.message || 'Erro ao criar conta');
      } else {
        analytics.pageView('/dashboard', 'Dashboard');
        navigate('/dashboard');
      }
    } catch (err) {
      setError('Erro inesperado. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-dark flex items-center justify-center p-4 py-12">
      <div className="fixed inset-0 bg-gradient-to-br from-accent/10 via-transparent to-neon/10 pointer-events-none" />

      <Card variant="glow" className="w-full max-w-md relative z-10">
        <div className="text-center mb-8">
          <Logo size="lg" className="mx-auto mb-6" />
          <h1 className="text-3xl font-bold text-soft-white mb-2">
            Crie sua conta
          </h1>
          <p className="text-soft-muted">
            Comece sua jornada de transformação hoje
          </p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-xl flex items-start gap-3 animate-scaleIn">
            <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-red-400">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <Input
            type="text"
            label="Nome completo"
            placeholder="Como devemos te chamar?"
            value={name}
            onChange={(e) => setName(e.target.value)}
            icon={<User size={20} />}
            required
            autoComplete="name"
          />

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
            placeholder="Mínimo 6 caracteres"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            icon={<Lock size={20} />}
            required
            autoComplete="new-password"
            helper="Use letras, números e símbolos para maior segurança"
          />

          <Input
            type="password"
            label="Confirmar senha"
            placeholder="Digite a senha novamente"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            icon={<CheckCircle size={20} />}
            required
            autoComplete="new-password"
          />

          <div className="pt-2">
            <Checkbox
              checked={acceptTerms}
              onChange={(e) => setAcceptTerms(e.target.checked)}
              label={
                <span className="text-sm text-soft-muted">
                  Aceito os{' '}
                  <Link
                    to="/termos"
                    className="text-primary hover:text-primary/80"
                  >
                    Termos de Uso
                  </Link>{' '}
                  e{' '}
                  <Link
                    to="/privacidade"
                    className="text-primary hover:text-primary/80"
                  >
                    Política de Privacidade
                  </Link>
                </span>
              }
            />
          </div>

          <Button
            type="submit"
            variant="neon"
            size="lg"
            fullWidth
            loading={loading}
            disabled={loading}
            className="shadow-glow-accent"
          >
            Criar conta grátis
          </Button>
        </form>

        <div className="mt-6 text-center text-sm">
          <span className="text-soft-muted">Já tem uma conta?</span>{' '}
          <Link
            to="/login"
            className="text-primary hover:text-primary/80 font-semibold transition-colors"
          >
            Entrar
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
