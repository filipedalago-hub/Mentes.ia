import { Zap, TrendingUp } from 'lucide-react';
import { xpProgress, getLevelInfo, getNextLevelInfo } from '../../utils/gamificationSystem';

interface LevelProgressProps {
  xp: number;
  level: number;
  variant?: 'compact' | 'full';
}

export function LevelProgress({ xp, level, variant = 'full' }: LevelProgressProps) {
  const progress = xpProgress(xp);
  const currentLevelInfo = getLevelInfo(level);
  const nextLevelInfo = getNextLevelInfo(level);

  if (!currentLevelInfo) return null;

  if (variant === 'compact') {
    return (
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 px-3 py-2 bg-primary/10 border border-primary/30 rounded-full">
          <Zap className="w-4 h-4 text-primary" />
          <span className="font-semibold text-sm text-primary">{xp} XP</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-soft-white">Nível {level}</span>
          <div className="w-24 bg-titanium rounded-full h-2">
            <div
              className="bg-gradient-primary h-full rounded-full transition-all shadow-glow-sm"
              style={{ width: `${progress.percentage}%` }}
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="card-dark">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-2xl font-bold text-soft-white mb-1">
            Nível {level}: {currentLevelInfo.title}
          </h3>
          <p className="text-sm text-soft-gray">{currentLevelInfo.description}</p>
        </div>
        <div className="text-right">
          <div className="flex items-center gap-2 mb-1">
            <Zap className="w-5 h-5 text-primary" />
            <span className="text-3xl font-bold text-primary">{xp}</span>
          </div>
          <span className="text-xs text-soft-gray">XP Total</span>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-neon-cyan" />
            <span className="text-soft-gray">Progresso para Nível {progress.nextLevel}</span>
          </div>
          <span className="text-soft-white font-semibold">
            {progress.xpInCurrentLevel} / {progress.xpNeededForLevel} XP
          </span>
        </div>

        <div className="relative">
          <div className="w-full bg-titanium rounded-full h-3">
            <div
              className="bg-gradient-primary h-full rounded-full transition-all duration-500 shadow-glow-sm"
              style={{ width: `${progress.percentage}%` }}
            />
          </div>
          <span className="absolute right-0 -top-6 text-xs text-neon-cyan font-bold">
            {Math.round(progress.percentage)}%
          </span>
        </div>

        {nextLevelInfo && (
          <div className="flex items-center gap-2 pt-2 text-xs text-soft-gray">
            <span>Próximo:</span>
            <span className="font-semibold" style={{ color: nextLevelInfo.color }}>
              {nextLevelInfo.title}
            </span>
            <span>•</span>
            <span>{nextLevelInfo.description}</span>
          </div>
        )}
      </div>
    </div>
  );
}
