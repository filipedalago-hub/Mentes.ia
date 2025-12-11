import { HelpCircle, Zap, Award, Flame, TrendingUp } from 'lucide-react';

export function HelpPage() {
  return (
    <div className="max-w-4xl">
      <h1 className="text-3xl font-bold text-soft-white mb-8">Central de Ajuda</h1>

      <div className="space-y-6">
        <div className="bg-dark-lighter rounded-xl border border-titanium/30 p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
              <HelpCircle className="w-5 h-5 text-primary" />
            </div>
            <h2 className="text-xl font-bold text-soft-white">Como Funciona o Mentes.ia?</h2>
          </div>
          <p className="text-soft-gray leading-relaxed">
            O Mentes.ia é uma plataforma de desenvolvimento mental e espiritual que combina exercícios práticos com
            gamificação para te ajudar a desenvolver hábitos mentais poderosos. Você progride através de
            múltiplas trilhas de aprendizado, completando exercícios e desbloqueando conquistas.
          </p>
        </div>

        <div className="bg-dark-lighter rounded-xl border border-titanium/30 p-6">
          <h2 className="text-xl font-bold text-soft-white mb-6">Sistema de Gamificação</h2>
          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <Zap className="w-6 h-6 text-primary" />
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-soft-white mb-1">Pontos de Experiência (XP)</h3>
                <p className="text-soft-gray text-sm">
                  Ganhe XP ao completar exercícios. Cada exercício concede uma quantidade específica de XP
                  que contribui para seu progresso geral.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-green-500/10 rounded-full flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-green-400" />
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-soft-white mb-1">Níveis</h3>
                <p className="text-soft-gray text-sm">
                  Conforme você acumula XP, você sobe de nível. Cada novo nível é uma prova do seu compromisso
                  com o desenvolvimento pessoal.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-orange-500/10 rounded-full flex items-center justify-center">
                  <Flame className="w-6 h-6 text-orange-400" />
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-soft-white mb-1">Sequência Diária</h3>
                <p className="text-soft-gray text-sm">
                  Complete pelo menos um exercício por dia para manter sua sequência ativa. Quanto maior sua
                  sequência, maior seu compromisso com a transformação.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center">
                  <Award className="w-6 h-6 text-accent" />
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-soft-white mb-1">Conquistas</h3>
                <p className="text-soft-gray text-sm">
                  Desbloqueie conquistas especiais ao atingir marcos importantes. Cada conquista é um
                  reconhecimento do seu progresso.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-dark-lighter rounded-xl border border-titanium/30 p-6">
          <h2 className="text-xl font-bold text-soft-white mb-4">As Trilhas Disponíveis</h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-soft-white mb-2">1. Bem-Estar Emocional</h3>
              <p className="text-soft-gray text-sm">
                Construa uma base sólida de autoconhecimento, inteligência emocional e mentalidade de
                crescimento. Perfeita para iniciantes.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-soft-white mb-2">2. Crescimento Espiritual</h3>
              <p className="text-soft-gray text-sm">
                Desenvolva sua conexão espiritual e aprofunde sua relação com Deus através
                de práticas contemplativas e reflexivas.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-soft-white mb-2">3. Relacionamentos Saudáveis</h3>
              <p className="text-soft-gray text-sm">
                Aprenda a construir e manter relacionamentos significativos e saudáveis em todas as áreas da vida.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-primary/10 border border-primary/30 rounded-xl p-6">
          <h2 className="text-xl font-bold text-soft-white mb-2">Precisa de Mais Ajuda?</h2>
          <p className="text-soft-gray mb-4">
            Se você tiver dúvidas ou precisar de suporte adicional, estamos aqui para ajudar!
          </p>
          <a
            href="mailto:suporte@mentes.ia"
            className="inline-block px-6 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-primary/90 transition-colors shadow-glow-primary"
          >
            Entrar em Contato
          </a>
        </div>
      </div>
    </div>
  );
}
