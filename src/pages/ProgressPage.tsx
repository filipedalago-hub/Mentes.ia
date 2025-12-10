import { useState, useEffect } from 'react';
import { Award, TrendingUp, Zap, History } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { LevelProgress } from '../components/gamification/LevelProgress';
import { StreakDisplay } from '../components/gamification/StreakDisplay';
import { BadgeDisplay } from '../components/gamification/BadgeDisplay';
import { Skeleton } from '../components/Skeleton';
import {
  getAllBadges,
  getUserProgress,
  checkAndAwardBadges,
  UserProgress,
} from '../utils/gamificationSystem';
import { supabase } from '../lib/supabase';

interface UserBadge {
  badge_id: string;
  earned_at: string;
}

export function ProgressPage() {
  const { profile } = useAuth();
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState<UserProgress | null>(null);
  const [userBadges, setUserBadges] = useState<UserBadge[]>([]);

  useEffect(() => {
    if (profile) {
      loadProgress();
    }
  }, [profile]);

  const loadProgress = async () => {
    if (!profile) return;

    setLoading(true);
    try {
      const progressData = await getUserProgress(profile.id);
      setProgress(progressData);

      await checkAndAwardBadges(profile.id, progressData);

      const { data: badges } = await supabase
        .from('user_badges')
        .select('badge_id, earned_at')
        .eq('user_id', profile.id);

      setUserBadges(badges || []);
    } catch (error) {
      console.error('Error loading progress:', error);
    } finally {
      setLoading(false);
    }
  };

  const allBadges = getAllBadges();
  const earnedBadgeIds = new Set(userBadges.map((b) => b.badge_id));

  const badgesByRarity = {
    legendary: allBadges.filter((b) => b.rarity === 'legendary'),
    epic: allBadges.filter((b) => b.rarity === 'epic'),
    rare: allBadges.filter((b) => b.rarity === 'rare'),
    uncommon: allBadges.filter((b) => b.rarity === 'uncommon'),
    common: allBadges.filter((b) => b.rarity === 'common'),
  };

  const stats = progress
    ? [
        {
          icon: Zap,
          label: 'XP Total',
          value: progress.xp,
          color: 'text-primary bg-primary/10',
        },
        {
          icon: TrendingUp,
          label: 'Nível',
          value: progress.level,
          color: 'text-neon-cyan bg-neon-cyan/10',
        },
        {
          icon: Award,
          label: 'Badges',
          value: userBadges.length,
          color: 'text-yellow-400 bg-yellow-400/10',
        },
        {
          icon: History,
          label: 'Check-ins',
          value: progress.total_checkins || 0,
          color: 'text-green-400 bg-green-400/10',
        },
      ]
    : [];

  return (
    <div className="min-h-screen bg-dark py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-soft-white mb-2">Seu Progresso</h1>
          <p className="text-soft-gray">
            Acompanhe sua evolução, badges e conquistas
          </p>
        </div>

        {loading ? (
          <div className="space-y-6">
            <Skeleton className="h-48" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Skeleton className="h-64" />
              <Skeleton className="h-64" />
            </div>
          </div>
        ) : progress ? (
          <>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              {stats.map((stat, index) => (
                <div key={index} className="card-dark">
                  <div className="flex items-center gap-3">
                    <div className={`p-3 rounded-lg ${stat.color}`}>
                      <stat.icon className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-soft-white">{stat.value}</p>
                      <p className="text-sm text-soft-gray">{stat.label}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              <LevelProgress xp={progress.xp} level={progress.level} />
              <StreakDisplay
                currentStreak={progress.current_streak}
                longestStreak={progress.longest_streak}
              />
            </div>

            <div className="card-dark mb-8">
              <h2 className="text-2xl font-bold text-soft-white mb-2">Estatísticas</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-titanium/10 rounded-lg border border-titanium/30">
                  <p className="text-3xl font-bold text-neon-cyan mb-1">
                    {progress.total_habits_completed || 0}
                  </p>
                  <p className="text-xs text-soft-gray">Hábitos Completados</p>
                </div>
                <div className="text-center p-4 bg-titanium/10 rounded-lg border border-titanium/30">
                  <p className="text-3xl font-bold text-green-400 mb-1">
                    {progress.total_goals_completed || 0}
                  </p>
                  <p className="text-xs text-soft-gray">Metas Alcançadas</p>
                </div>
                <div className="text-center p-4 bg-titanium/10 rounded-lg border border-titanium/30">
                  <p className="text-3xl font-bold text-purple-400 mb-1">
                    {progress.total_exercises_completed || 0}
                  </p>
                  <p className="text-xs text-soft-gray">Exercícios Feitos</p>
                </div>
                <div className="text-center p-4 bg-titanium/10 rounded-lg border border-titanium/30">
                  <p className="text-3xl font-bold text-yellow-400 mb-1">
                    {progress.total_checkins || 0}
                  </p>
                  <p className="text-xs text-soft-gray">Check-ins Diários</p>
                </div>
              </div>
            </div>

            <div className="card-dark">
              <h2 className="text-2xl font-bold text-soft-white mb-6">Conquistas</h2>

              {Object.entries(badgesByRarity).map(([rarity, badges]) => {
                if (badges.length === 0) return null;

                const rarityLabels: Record<string, string> = {
                  legendary: 'Lendário',
                  epic: 'Épico',
                  rare: 'Raro',
                  uncommon: 'Incomum',
                  common: 'Comum',
                };

                return (
                  <div key={rarity} className="mb-8 last:mb-0">
                    <h3 className="text-lg font-semibold text-soft-white mb-4">
                      {rarityLabels[rarity]} ({badges.filter((b) => earnedBadgeIds.has(b.id)).length}/
                      {badges.length})
                    </h3>
                    <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-4">
                      {badges.map((badge) => {
                        const userBadge = userBadges.find((ub) => ub.badge_id === badge.id);
                        return (
                          <BadgeDisplay
                            key={badge.id}
                            badge={badge}
                            earned={!!userBadge}
                            earnedAt={userBadge?.earned_at}
                            size="md"
                          />
                        );
                      })}
                    </div>
                  </div>
                );
              })}

              {userBadges.length === 0 && (
                <div className="text-center py-12">
                  <Award className="w-16 h-16 text-titanium mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-soft-white mb-2">
                    Comece sua jornada!
                  </h3>
                  <p className="text-soft-gray">
                    Complete ações no app para desbloquear badges e conquistas
                  </p>
                </div>
              )}
            </div>
          </>
        ) : (
          <div className="card-dark text-center py-12">
            <p className="text-soft-gray">Erro ao carregar progresso</p>
          </div>
        )}
      </div>
    </div>
  );
}
