import { Link } from 'react-router-dom';
import { Target, Award, TrendingUp, Sparkles, Zap, Brain, Heart, Shield, Trophy } from 'lucide-react';
import { Logo } from '../components/Logo';
import { Button, Card } from '../components/ui';

export function LandingPage() {
  const features = [
    {
      icon: <Brain className="w-6 h-6" />,
      title: 'Fundamentos Mentais',
      description: 'Desenvolva autoconhecimento, inteligência emocional e mentalidade de crescimento com IA.',
      gradient: 'bg-gradient-primary',
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: 'Treinamento da Mente',
      description: 'Exercícios práticos de meditação, respiração consciente e técnicas de foco.',
      gradient: 'bg-gradient-accent',
    },
    {
      icon: <Heart className="w-6 h-6" />,
      title: 'Desenvolvimento Espiritual',
      description: 'Explore significado, propósito e práticas de autotranscendência.',
      gradient: 'bg-gradient-neon',
    },
  ];

  const benefits = [
    {
      icon: <Target size={24} />,
      title: 'Metas Inteligentes',
      description: 'Defina e acompanhe objetivos com sistema de progresso visual',
    },
    {
      icon: <Trophy size={24} />,
      title: 'Gamificação',
      description: 'Ganhe XP, badges e desbloqueie conquistas em sua jornada',
    },
    {
      icon: <TrendingUp size={24} />,
      title: 'Progresso Real',
      description: 'Visualize sua evolução com gráficos e estatísticas detalhadas',
    },
    {
      icon: <Shield size={24} />,
      title: 'Privacidade Total',
      description: 'Seus dados estão seguros e criptografados',
    },
  ];

  return (
    <div className="min-h-screen bg-dark">
      <div className="fixed inset-0 bg-gradient-to-b from-neon-cyan/5 via-transparent to-primary/5 pointer-events-none" />

      <nav className="relative z-10 border-b border-titanium/30 backdrop-blur-sm bg-dark/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <Logo size="md" />
            <div className="flex items-center gap-4">
              <Link
                to="/login"
                className="hidden sm:inline-block px-6 py-2 text-soft-white hover:text-primary transition-colors font-medium"
              >
                Entrar
              </Link>
              <Link to="/signup">
                <Button variant="primary">Começar Agora</Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="text-center max-w-4xl mx-auto mb-20">
          <div className="inline-block mb-6 px-4 py-2 bg-neon-cyan/10 border border-neon-cyan/30 rounded-full animate-pulse-slow">
            <span className="text-neon-cyan text-sm font-semibold flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              Inteligência Artificial + Neurociência
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold text-soft-white mb-6 leading-tight">
            Transforme Sua Mente,
            <br />
            <span className="bg-gradient-accent bg-clip-text text-transparent">
              Transforme Sua Vida
            </span>
          </h1>

          <p className="text-lg md:text-xl text-soft-gray mb-10 max-w-2xl mx-auto leading-relaxed">
            Desenvolva hábitos mentais poderosos através de exercícios práticos e gamificação envolvente.
            Descubra seu propósito e alcance seu máximo potencial.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/signup">
              <Button variant="neon" size="lg" className="w-full sm:w-auto min-w-[200px] shadow-glow-accent">
                Começar Jornada
              </Button>
            </Link>
            <Link to="/login">
              <Button variant="secondary" size="lg" className="w-full sm:w-auto min-w-[200px]">
                Já tenho conta
              </Button>
            </Link>
          </div>

          <div className="mt-16 grid grid-cols-3 gap-8 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-neon-cyan mb-1">10K+</div>
              <div className="text-xs md:text-sm text-soft-muted">Usuários Ativos</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-primary mb-1">95%</div>
              <div className="text-xs md:text-sm text-soft-muted">Satisfação</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-neon-cyan mb-1">50+</div>
              <div className="text-xs md:text-sm text-soft-muted">Exercícios</div>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-20">
          {features.map((feature, index) => (
            <Card key={index} variant="glow" className="group hover:scale-105 transition-all duration-300">
              <div className={`w-12 h-12 ${feature.gradient} rounded-xl flex items-center justify-center mb-4 text-white`}>
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3 text-soft-white">{feature.title}</h3>
              <p className="text-soft-gray leading-relaxed">
                {feature.description}
              </p>
            </Card>
          ))}
        </div>

        <div className="mb-20">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-soft-white mb-12">
            Por que escolher Mentes.ia?
          </h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => (
              <Card key={index} padding="lg" className="text-center hover:scale-105 transition-all duration-300">
                <div className="inline-flex items-center justify-center w-14 h-14 bg-primary/20 rounded-full mb-4 text-primary">
                  {benefit.icon}
                </div>
                <h3 className="font-semibold text-soft-white mb-2">{benefit.title}</h3>
                <p className="text-sm text-soft-muted leading-relaxed">{benefit.description}</p>
              </Card>
            ))}
          </div>
        </div>

        <Card variant="gradient" padding="lg" className="text-center max-w-4xl mx-auto">
          <Award className="w-16 h-16 text-primary mx-auto mb-6" />
          <h2 className="text-3xl md:text-4xl font-bold text-soft-white mb-4">
            Pronto para começar sua transformação?
          </h2>
          <p className="text-lg text-soft-gray mb-8 max-w-2xl mx-auto">
            Junte-se a milhares de pessoas que estão transformando suas vidas com Mentes.ia.
            Comece hoje mesmo sua jornada de autodescoberta.
          </p>
          <Link to="/signup">
            <Button variant="primary" size="lg" className="min-w-[250px] shadow-glow-primary">
              Criar Conta Grátis
            </Button>
          </Link>
        </Card>
      </section>

      <footer className="relative border-t border-titanium/20 bg-dark-lighter">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <Logo size="sm" className="mb-4" />
              <p className="text-sm text-soft-muted leading-relaxed">
                Transforme sua mente, transforme sua vida.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-soft-white mb-4">Links</h3>
              <ul className="space-y-2">
                <li>
                  <a href="/sobre" className="text-sm text-soft-muted hover:text-primary transition-colors">
                    Sobre nós
                  </a>
                </li>
                <li>
                  <a href="/ajuda" className="text-sm text-soft-muted hover:text-primary transition-colors">
                    Ajuda
                  </a>
                </li>
                <li>
                  <a href="/privacidade" className="text-sm text-soft-muted hover:text-primary transition-colors">
                    Privacidade
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-soft-white mb-4">Contato</h3>
              <p className="text-sm text-soft-muted">contato@mentes.ia</p>
            </div>
          </div>

          <div className="border-t border-titanium/20 pt-6 text-center">
            <p className="text-sm text-soft-muted">
              © {new Date().getFullYear()} Mentes.ia. Todos os direitos reservados.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
