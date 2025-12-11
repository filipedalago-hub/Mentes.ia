import { Flame, Trophy } from 'lucide-react';
import { Card } from '../ui';

interface StreakCounterProps {
  currentStreak: number;
  longestStreak: number;
  compact?: boolean;
}

export function StreakCounter({ currentStreak, longestStreak, compact = false }: StreakCounterProps) {
  const isRecord = currentStreak === longestStreak && currentStreak > 0;

  if (compact) {
    return (
      <div className="flex items-center gap-2 px-4 py-2 bg-gradient-primary rounded-xl shadow-glow-primary">
        <Flame className="w-5 h-5 text-white animate-pulse" />
        <span className="text-white font-bold">{currentStreak} dias</span>
      </div>
    );
  }

  return (
    <Card variant="glow" padding="lg" className="text-center">
      <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-primary rounded-full mb-4 shadow-glow-primary">
        <Flame className={`w-8 h-8 text-white ${currentStreak > 0 ? 'animate-pulse' : ''}`} />
      </div>

      <div className="space-y-1">
        <h3 className="text-3xl font-bold text-soft-white">
          {currentStreak} {currentStreak === 1 ? 'dia' : 'dias'}
        </h3>
        <p className="text-sm text-soft-muted">Sequência atual</p>

        {isRecord && currentStreak > 3 && (
          <div className="mt-3 pt-3 border-t border-titanium/30">
            <div className="inline-flex items-center gap-1 text-neon-cyan text-xs font-semibold">
              <Trophy size={14} />
              Novo recorde pessoal!
            </div>
          </div>
        )}

        {longestStreak > currentStreak && (
          <div className="mt-3 pt-3 border-t border-titanium/30">
            <div className="text-xs text-soft-muted">
              Recorde: <span className="text-primary font-semibold">{longestStreak} dias</span>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
}
