import { Award, Lock } from 'lucide-react';
import { Card } from '../ui';
import { getRarityColor, type BadgeDefinition, type BadgeRarity } from '../../utils/gamificationSystem';

interface BadgeShowcaseProps {
  badges: BadgeDefinition[];
  earnedBadgeIds?: string[];
  maxDisplay?: number;
}

const rarityLabels: Record<BadgeRarity, string> = {
  common: 'Comum',
  uncommon: 'Incomum',
  rare: 'Raro',
  epic: 'Épico',
  legendary: 'Lendário',
};

export function BadgeShowcase({ badges, earnedBadgeIds = [], maxDisplay }: BadgeShowcaseProps) {
  const displayBadges = maxDisplay ? badges.slice(0, maxDisplay) : badges;

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
      {displayBadges.map((badge) => {
        const isEarned = earnedBadgeIds.includes(badge.id);
        const rarityColor = getRarityColor(badge.rarity);

        return (
          <Card
            key={badge.id}
            padding="md"
            className={`text-center transition-all duration-300 ${
              isEarned
                ? 'hover:scale-105 cursor-pointer'
                : 'opacity-50 grayscale'
            }`}
          >
            <div
              className={`inline-flex items-center justify-center w-16 h-16 rounded-full mb-3 ${
                isEarned ? 'animate-pulse-slow' : ''
              }`}
              style={{
                backgroundColor: isEarned ? `${rarityColor}20` : '#2F3A4D20',
                border: `2px solid ${isEarned ? rarityColor : '#2F3A4D'}`,
              }}
            >
              {isEarned ? (
                <Award className="w-8 h-8" style={{ color: rarityColor }} />
              ) : (
                <Lock className="w-8 h-8 text-titanium" />
              )}
            </div>

            <h4 className="font-semibold text-soft-white text-sm mb-1">
              {badge.name}
            </h4>

            <p className="text-xs text-soft-muted mb-2 line-clamp-2">
              {badge.description}
            </p>

            <span
              className="inline-block px-2 py-1 rounded text-xs font-semibold"
              style={{
                backgroundColor: `${rarityColor}20`,
                color: rarityColor,
              }}
            >
              {rarityLabels[badge.rarity]}
            </span>
          </Card>
        );
      })}
    </div>
  );
}
