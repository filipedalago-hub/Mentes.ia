import * as Icons from 'lucide-react';
import { BadgeDefinition, getRarityColor } from '../../utils/gamificationSystem';

interface BadgeDisplayProps {
  badge: BadgeDefinition;
  earned?: boolean;
  earnedAt?: string;
  size?: 'sm' | 'md' | 'lg';
  showDetails?: boolean;
}

export function BadgeDisplay({
  badge,
  earned = false,
  earnedAt,
  size = 'md',
  showDetails = true,
}: BadgeDisplayProps) {
  const Icon = (Icons as any)[badge.icon] || Icons.Award;
  const rarityColor = getRarityColor(badge.rarity);

  const sizeClasses = {
    sm: 'w-12 h-12',
    md: 'w-16 h-16',
    lg: 'w-24 h-24',
  };

  const iconSizes = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
  };

  const rarityLabels = {
    common: 'Comum',
    uncommon: 'Incomum',
    rare: 'Raro',
    epic: 'Épico',
    legendary: 'Lendário',
  };

  return (
    <div
      className={`relative ${
        earned ? 'opacity-100' : 'opacity-40 grayscale'
      } transition-all group cursor-pointer`}
    >
      <div
        className={`${sizeClasses[size]} rounded-full flex items-center justify-center border-2 transition-all ${
          earned ? 'shadow-glow-md hover:scale-110' : 'border-titanium/30'
        }`}
        style={{
          borderColor: earned ? rarityColor : undefined,
          backgroundColor: earned ? `${rarityColor}20` : '#1E2749',
        }}
      >
        <Icon
          className={iconSizes[size]}
          style={{ color: earned ? rarityColor : '#94A3B8' }}
        />
      </div>

      {earned && (
        <div className="absolute -top-1 -right-1 w-5 h-5 bg-green-400 rounded-full border-2 border-dark flex items-center justify-center">
          <Icons.Check className="w-3 h-3 text-dark" />
        </div>
      )}

      {showDetails && (
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
          <div className="card-dark min-w-[250px] p-4 shadow-glow-lg">
            <div className="flex items-start gap-3 mb-2">
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center border-2"
                style={{
                  borderColor: rarityColor,
                  backgroundColor: `${rarityColor}20`,
                }}
              >
                <Icon className="w-6 h-6" style={{ color: rarityColor }} />
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-soft-white text-sm">{badge.name}</h4>
                <p
                  className="text-xs font-semibold"
                  style={{ color: rarityColor }}
                >
                  {rarityLabels[badge.rarity]}
                </p>
              </div>
            </div>
            <p className="text-xs text-soft-gray mb-2">{badge.description}</p>
            {earnedAt && (
              <p className="text-xs text-neon-cyan">
                Conquistado em {new Date(earnedAt).toLocaleDateString('pt-BR')}
              </p>
            )}
            {!earned && (
              <div className="text-xs text-soft-gray mt-2 pt-2 border-t border-titanium/30">
                <span className="font-semibold">Requisito: </span>
                {badge.requirement.value} {badge.requirement.type}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
