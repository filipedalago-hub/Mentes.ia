import { Star } from 'lucide-react';
import { getLevelInfo } from '../../utils/gamificationSystem';

interface LevelBadgeProps {
  level: number;
  size?: 'sm' | 'md' | 'lg';
  showTitle?: boolean;
}

export function LevelBadge({ level, size = 'md', showTitle = false }: LevelBadgeProps) {
  const levelInfo = getLevelInfo(level);

  const sizeClasses = {
    sm: 'w-12 h-12 text-xs',
    md: 'w-16 h-16 text-sm',
    lg: 'w-20 h-20 text-base',
  };

  const iconSizes = {
    sm: 16,
    md: 20,
    lg: 24,
  };

  return (
    <div className="inline-flex flex-col items-center gap-2">
      <div
        className={`${sizeClasses[size]} rounded-full bg-gradient-primary shadow-glow-primary flex items-center justify-center font-bold text-white relative`}
      >
        <Star
          className="absolute top-0 right-0 text-neon-cyan animate-pulse"
          size={iconSizes[size] * 0.5}
        />
        {level}
      </div>

      {showTitle && levelInfo && (
        <div className="text-center">
          <p className="text-xs font-semibold text-soft-white">
            {levelInfo.title}
          </p>
          <p className="text-xs text-soft-muted">Nível {level}</p>
        </div>
      )}
    </div>
  );
}
