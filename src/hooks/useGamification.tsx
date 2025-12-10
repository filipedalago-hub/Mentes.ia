import { useState, useCallback } from 'react';
import { XPNotification } from '../components/gamification/XPNotification';
import {
  awardXP,
  updateStreak,
  XPAction,
  getEmotionalReward,
  getUserProgress,
  checkAndAwardBadges,
} from '../utils/gamificationSystem';

interface GamificationNotification {
  id: string;
  type: 'xp' | 'levelUp' | 'badge' | 'streak';
  message: string;
  xpAmount?: number;
  level?: number;
  badgeName?: string;
}

export function useGamification(userId: string | undefined) {
  const [notifications, setNotifications] = useState<GamificationNotification[]>([]);

  const showNotification = useCallback((notification: Omit<GamificationNotification, 'id'>) => {
    const id = Math.random().toString(36).substr(2, 9);
    setNotifications((prev) => [...prev, { ...notification, id }]);
  }, []);

  const removeNotification = useCallback((id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  }, []);

  const earnXP = useCallback(
    async (action: XPAction, multiplier: number = 1) => {
      if (!userId) return null;

      try {
        const result = await awardXP(userId, action, multiplier);

        const xpAmount = result.newXp - (result.newXp - result.newXp + result.newXp);

        showNotification({
          type: 'xp',
          message: getEmotionalReward('levelUp'),
          xpAmount: Math.round(xpAmount * multiplier),
        });

        if (result.leveledUp) {
          setTimeout(() => {
            showNotification({
              type: 'levelUp',
              message: getEmotionalReward('levelUp'),
              level: result.newLevel,
            });
          }, 500);
        }

        const progress = await getUserProgress(userId);
        const newBadges = await checkAndAwardBadges(userId, progress);

        newBadges.forEach((badge, index) => {
          setTimeout(() => {
            showNotification({
              type: 'badge',
              message: getEmotionalReward('badgeEarned'),
              badgeName: badge.name,
            });
          }, 1000 + index * 500);
        });

        return result;
      } catch (error) {
        console.error('Error awarding XP:', error);
        return null;
      }
    },
    [userId, showNotification]
  );

  const maintainStreak = useCallback(async () => {
    if (!userId) return null;

    try {
      const result = await updateStreak(userId);

      if (result.isNewRecord) {
        showNotification({
          type: 'streak',
          message: getEmotionalReward('streakMilestone'),
        });
      }

      return result;
    } catch (error) {
      console.error('Error updating streak:', error);
      return null;
    }
  }, [userId, showNotification]);

  const NotificationContainer = useCallback(
    () => (
      <>
        {notifications.map((notification) => (
          <XPNotification
            key={notification.id}
            type={notification.type}
            message={notification.message}
            xpAmount={notification.xpAmount}
            level={notification.level}
            badgeName={notification.badgeName}
            onClose={() => removeNotification(notification.id)}
          />
        ))}
      </>
    ),
    [notifications, removeNotification]
  );

  return {
    earnXP,
    maintainStreak,
    NotificationContainer,
  };
}
