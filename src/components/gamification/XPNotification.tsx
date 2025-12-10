import { useEffect, useState } from 'react';
import { Zap, TrendingUp, Award, Star } from 'lucide-react';
import { getEmotionalReward } from '../../utils/gamificationSystem';

interface XPNotificationProps {
  type: 'xp' | 'levelUp' | 'badge' | 'streak';
  message: string;
  xpAmount?: number;
  level?: number;
  badgeName?: string;
  onClose: () => void;
  duration?: number;
}

export function XPNotification({
  type,
  message,
  xpAmount,
  level,
  badgeName,
  onClose,
  duration = 5000,
}: XPNotificationProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);

    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onClose, 300);
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const getIcon = () => {
    switch (type) {
      case 'xp':
        return <Zap className="w-6 h-6 text-primary" />;
      case 'levelUp':
        return <TrendingUp className="w-6 h-6 text-neon-cyan" />;
      case 'badge':
        return <Award className="w-6 h-6 text-yellow-400" />;
      case 'streak':
        return <Star className="w-6 h-6 text-green-400" />;
    }
  };

  const getColors = () => {
    switch (type) {
      case 'xp':
        return 'bg-primary/20 border-primary/50 shadow-glow-md';
      case 'levelUp':
        return 'bg-neon-cyan/20 border-neon-cyan/50 shadow-glow-md';
      case 'badge':
        return 'bg-yellow-400/20 border-yellow-400/50 shadow-glow-md';
      case 'streak':
        return 'bg-green-400/20 border-green-400/50 shadow-glow-md';
    }
  };

  return (
    <div
      className={`fixed top-20 right-4 z-50 transition-all duration-300 ${
        isVisible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
      }`}
    >
      <div className={`card-dark max-w-sm border-2 ${getColors()}`}>
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0">{getIcon()}</div>
          <div className="flex-1 min-w-0">
            {type === 'xp' && xpAmount && (
              <p className="text-lg font-bold text-primary mb-1">+{xpAmount} XP</p>
            )}
            {type === 'levelUp' && level && (
              <p className="text-lg font-bold text-neon-cyan mb-1">
                Nível {level} Alcançado!
              </p>
            )}
            {type === 'badge' && badgeName && (
              <p className="text-lg font-bold text-yellow-400 mb-1">
                Badge Desbloqueado!
              </p>
            )}
            {type === 'streak' && (
              <p className="text-lg font-bold text-green-400 mb-1">
                Streak Mantido!
              </p>
            )}
            <p className="text-sm text-soft-gray">{message}</p>
          </div>
          <button
            onClick={() => {
              setIsVisible(false);
              setTimeout(onClose, 300);
            }}
            className="text-soft-gray hover:text-soft-white transition-colors"
          >
            <span className="sr-only">Fechar</span>
            ×
          </button>
        </div>
      </div>
    </div>
  );
}
