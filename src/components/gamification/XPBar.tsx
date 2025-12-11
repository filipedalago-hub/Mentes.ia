import { useMemo } from 'react';
import { Zap } from 'lucide-react';
import { xpProgress } from '../../utils/gamificationSystem';

interface XPBarProps {
  currentXP: number;
  showDetails?: boolean;
  animated?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export function XPBar({ currentXP, showDetails = true, animated = true, size = 'md' }: XPBarProps) {
  const progress = useMemo(() => xpProgress(currentXP), [currentXP]);

  const sizeClasses = {
    sm: 'h-2',
    md: 'h-3',
    lg: 'h-4',
  };

  return (
    <div className="w-full">
      {showDetails && (
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-primary" />
            <span className="text-sm font-semibold text-soft-white">
              Nível {progress.currentLevel}
            </span>
          </div>
          <span className="text-xs text-soft-muted">
            {progress.xpInCurrentLevel.toLocaleString()} /{' '}
            {progress.xpNeededForLevel.toLocaleString()} XP
          </span>
        </div>
      )}

      <div className={`w-full bg-dark-lighter rounded-full overflow-hidden ${sizeClasses[size]} border border-titanium/30`}>
        <div
          className={`h-full bg-gradient-primary shadow-glow-primary ${animated ? 'transition-all duration-1000 ease-out' : ''}`}
          style={{ width: `${progress.percentage}%` }}
        />
      </div>

      {showDetails && (
        <div className="mt-1 text-xs text-soft-muted text-right">
          {Math.round(progress.percentage)}% para o próximo nível
        </div>
      )}
    </div>
  );
}
