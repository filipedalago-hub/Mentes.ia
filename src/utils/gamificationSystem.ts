import { supabase } from '../lib/supabase';
import gamificationConfig from '../data/gamification.json';

export type XPAction = keyof typeof gamificationConfig.xpActions;
export type BadgeRarity = 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary';

export interface LevelInfo {
  level: number;
  xpRequired: number;
  title: string;
  description: string;
  color: string;
}

export interface BadgeDefinition {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  rarity: BadgeRarity;
  requirement: {
    type: string;
    value: number;
  };
}

export interface UserProgress {
  xp: number;
  level: number;
  current_streak: number;
  longest_streak: number;
  total_checkins?: number;
  total_habits_completed?: number;
  total_goals_completed?: number;
  total_exercises_completed?: number;
}

export function calculateLevel(xp: number): number {
  const levels = gamificationConfig.levels;
  for (let i = levels.length - 1; i >= 0; i--) {
    if (xp >= levels[i].xpRequired) {
      return levels[i].level;
    }
  }
  return 1;
}

export function getLevelInfo(level: number): LevelInfo | undefined {
  return gamificationConfig.levels.find((l) => l.level === level);
}

export function getNextLevelInfo(currentLevel: number): LevelInfo | undefined {
  return gamificationConfig.levels.find((l) => l.level === currentLevel + 1);
}

export function xpProgress(xp: number): {
  currentLevel: number;
  nextLevel: number;
  currentLevelXp: number;
  nextLevelXp: number;
  xpInCurrentLevel: number;
  xpNeededForLevel: number;
  percentage: number;
} {
  const currentLevel = calculateLevel(xp);
  const currentLevelInfo = getLevelInfo(currentLevel);
  const nextLevelInfo = getNextLevelInfo(currentLevel);

  if (!currentLevelInfo || !nextLevelInfo) {
    return {
      currentLevel,
      nextLevel: currentLevel + 1,
      currentLevelXp: 0,
      nextLevelXp: 0,
      xpInCurrentLevel: 0,
      xpNeededForLevel: 0,
      percentage: 100,
    };
  }

  const xpInCurrentLevel = xp - currentLevelInfo.xpRequired;
  const xpNeededForLevel = nextLevelInfo.xpRequired - currentLevelInfo.xpRequired;
  const percentage = Math.min(100, Math.max(0, (xpInCurrentLevel / xpNeededForLevel) * 100));

  return {
    currentLevel,
    nextLevel: nextLevelInfo.level,
    currentLevelXp: currentLevelInfo.xpRequired,
    nextLevelXp: nextLevelInfo.xpRequired,
    xpInCurrentLevel,
    xpNeededForLevel,
    percentage,
  };
}

export function getXPForAction(action: XPAction): number {
  return gamificationConfig.xpActions[action]?.xp || 0;
}

export async function awardXP(
  userId: string,
  action: XPAction,
  multiplier: number = 1
): Promise<{ newXp: number; newLevel: number; leveledUp: boolean }> {
  const xpAmount = getXPForAction(action) * multiplier;

  const { data: profile, error: fetchError } = await supabase
    .from('profiles')
    .select('xp, level')
    .eq('id', userId)
    .single();

  if (fetchError || !profile) {
    throw new Error('Failed to fetch user profile');
  }

  const oldLevel = profile.level;
  const newXp = profile.xp + xpAmount;
  const newLevel = calculateLevel(newXp);
  const leveledUp = newLevel > oldLevel;

  const { error: updateError } = await supabase
    .from('profiles')
    .update({
      xp: newXp,
      level: newLevel,
    })
    .eq('id', userId);

  if (updateError) {
    throw new Error('Failed to update XP');
  }

  return { newXp, newLevel, leveledUp };
}

export async function updateStreak(userId: string): Promise<{
  currentStreak: number;
  longestStreak: number;
  isNewRecord: boolean;
}> {
  const { data: profile } = await supabase
    .from('profiles')
    .select('current_streak, longest_streak, last_activity_date')
    .eq('id', userId)
    .single();

  if (!profile) throw new Error('Profile not found');

  const today = new Date().toISOString().split('T')[0];
  const lastActivity = profile.last_activity_date;

  let newStreak = profile.current_streak;
  let shouldUpdate = false;

  if (!lastActivity || lastActivity !== today) {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = yesterday.toISOString().split('T')[0];

    if (lastActivity === yesterdayStr) {
      newStreak += 1;
    } else if (!lastActivity) {
      newStreak = 1;
    } else {
      newStreak = 1;
    }

    shouldUpdate = true;
  }

  const newLongest = Math.max(profile.longest_streak, newStreak);
  const isNewRecord = newLongest > profile.longest_streak;

  if (shouldUpdate) {
    await supabase
      .from('profiles')
      .update({
        current_streak: newStreak,
        longest_streak: newLongest,
        last_activity_date: today,
      })
      .eq('id', userId);

    if (newStreak === 7) {
      await awardXP(userId, 'streak_milestone_7');
    } else if (newStreak === 30) {
      await awardXP(userId, 'streak_milestone_30');
    } else if (newStreak === 100) {
      await awardXP(userId, 'streak_milestone_100');
    }
  }

  return {
    currentStreak: newStreak,
    longestStreak: newLongest,
    isNewRecord,
  };
}

export function getAllBadges(): BadgeDefinition[] {
  return gamificationConfig.badges;
}

export function getBadgeById(badgeId: string): BadgeDefinition | undefined {
  return gamificationConfig.badges.find((b) => b.id === badgeId);
}

export async function checkAndAwardBadges(
  userId: string,
  progress: UserProgress
): Promise<BadgeDefinition[]> {
  const { data: earnedBadges } = await supabase
    .from('user_badges')
    .select('badge_id')
    .eq('user_id', userId);

  const earnedBadgeIds = new Set(earnedBadges?.map((b) => b.badge_id) || []);
  const newlyEarnedBadges: BadgeDefinition[] = [];

  const allBadges = getAllBadges();

  for (const badge of allBadges) {
    if (earnedBadgeIds.has(badge.id)) continue;

    const earned = checkBadgeRequirement(badge, progress);

    if (earned) {
      const { data: badgeRecord } = await supabase
        .from('badges')
        .select('id')
        .eq('name', badge.name)
        .maybeSingle();

      let badgeDbId = badgeRecord?.id;

      if (!badgeDbId) {
        const { data: newBadge } = await supabase
          .from('badges')
          .insert({
            name: badge.name,
            description: badge.description,
            icon_name: badge.icon,
            requirement_type: badge.requirement.type,
            requirement_value: badge.requirement.value,
          })
          .select('id')
          .single();

        badgeDbId = newBadge?.id;
      }

      if (badgeDbId) {
        await supabase.from('user_badges').insert({
          user_id: userId,
          badge_id: badgeDbId,
        });

        newlyEarnedBadges.push(badge);
      }
    }
  }

  return newlyEarnedBadges;
}

function checkBadgeRequirement(badge: BadgeDefinition, progress: UserProgress): boolean {
  const { type, value } = badge.requirement;

  switch (type) {
    case 'checkins':
      return (progress.total_checkins || 0) >= value;
    case 'streak':
      return progress.current_streak >= value;
    case 'habits_completed':
      return (progress.total_habits_completed || 0) >= value;
    case 'goals_completed':
      return (progress.total_goals_completed || 0) >= value;
    case 'exercises_completed':
      return (progress.total_exercises_completed || 0) >= value;
    case 'level':
      return progress.level >= value;
    case 'total_xp':
      return progress.xp >= value;
    default:
      return false;
  }
}

export function getEmotionalReward(category: keyof typeof gamificationConfig.emotionalRewards): string {
  const rewards = gamificationConfig.emotionalRewards[category];
  if (!rewards || rewards.length === 0) return 'Parabéns pela conquista!';
  return rewards[Math.floor(Math.random() * rewards.length)];
}

export function getRarityColor(rarity: BadgeRarity): string {
  return gamificationConfig.rarityColors[rarity] || '#94A3B8';
}

export async function getUserProgress(userId: string): Promise<UserProgress> {
  const { data: profile } = await supabase
    .from('profiles')
    .select('xp, level, current_streak, longest_streak')
    .eq('id', userId)
    .single();

  const { count: checkinsCount } = await supabase
    .from('user_mood_tracking')
    .select('id', { count: 'exact', head: true })
    .eq('user_id', userId);

  const { count: habitsCount } = await supabase
    .from('habit_completions')
    .select('id', { count: 'exact', head: true })
    .eq('user_id', userId);

  const { count: goalsCount } = await supabase
    .from('goals')
    .select('id', { count: 'exact', head: true })
    .eq('user_id', userId)
    .eq('status', 'completed');

  const { count: exercisesCount } = await supabase
    .from('user_exercise_progress')
    .select('id', { count: 'exact', head: true })
    .eq('user_id', userId)
    .eq('completed', true);

  return {
    xp: profile?.xp || 0,
    level: profile?.level || 1,
    current_streak: profile?.current_streak || 0,
    longest_streak: profile?.longest_streak || 0,
    total_checkins: checkinsCount || 0,
    total_habits_completed: habitsCount || 0,
    total_goals_completed: goalsCount || 0,
    total_exercises_completed: exercisesCount || 0,
  };
}
