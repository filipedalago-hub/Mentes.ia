import { Flame, Award } from 'lucide-react';

interface StreakDisplayProps {
  currentStreak: number;
  longestStreak: number;
  variant?: 'compact' | 'full';
}

export function StreakDisplay({ currentStreak, longestStreak, variant = 'full' }: StreakDisplayProps) {
  if (variant === 'compact') {
    return (
      <div className="flex items-center gap-2 px-3 py-2 bg-neon-cyan/10 border border-neon-cyan/30 rounded-full">
        <Flame className="w-4 h-4 text-neon-cyan" />
        <span className="font-semibold text-sm text-neon-cyan">{currentStreak}</span>
      </div>
    );
  }

  return (
    <div className="card-dark">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <div className="p-3 bg-neon-cyan/20 rounded-lg">
              <Flame className="w-6 h-6 text-neon-cyan" />
            </div>
            <div>
              <p className="text-3xl font-bold text-neon-cyan">{currentStreak}</p>
              <p className="text-xs text-soft-gray">Dias</p>
            </div>
          </div>
          <p className="text-sm text-soft-white font-semibold">Streak Atual</p>
          <p className="text-xs text-soft-gray mt-1">
            Continue assim! Cada dia conta.
          </p>
        </div>

        <div>
          <div className="flex items-center gap-2 mb-2">
            <div className="p-3 bg-yellow-400/20 rounded-lg">
              <Award className="w-6 h-6 text-yellow-400" />
            </div>
            <div>
              <p className="text-3xl font-bold text-yellow-400">{longestStreak}</p>
              <p className="text-xs text-soft-gray">Dias</p>
            </div>
          </div>
          <p className="text-sm text-soft-white font-semibold">Melhor Streak</p>
          <p className="text-xs text-soft-gray mt-1">
            Seu recorde pessoal
          </p>
        </div>
      </div>

      {currentStreak > 0 && (
        <div className="mt-4 pt-4 border-t border-titanium/30">
          <div className="flex items-center gap-2">
            {[7, 30, 100].map((milestone) => {
              const achieved = currentStreak >= milestone;
              const progress = Math.min(100, (currentStreak / milestone) * 100);

              return (
                <div key={milestone} className="flex-1">
                  <div className="relative h-2 bg-titanium rounded-full overflow-hidden">
                    <div
                      className={`h-full transition-all duration-500 ${
                        achieved
                          ? 'bg-gradient-to-r from-neon-cyan to-primary shadow-glow-sm'
                          : 'bg-soft-gray/30'
                      }`}
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                  <p
                    className={`text-xs text-center mt-1 ${
                      achieved ? 'text-neon-cyan font-bold' : 'text-soft-gray'
                    }`}
                  >
                    {milestone}d
                  </p>
                </div>
              );
            })}
          </div>
          <p className="text-xs text-soft-gray text-center mt-2">
            Marcos: 7, 30 e 100 dias
          </p>
        </div>
      )}
    </div>
  );
}
