import { redisCache } from './redis';

export class CacheInvalidationService {
  // Cache invalidation patterns for different entities
  static async invalidateProfile(profileId: string): Promise<void> {
    await Promise.all([
      redisCache.invalidatePattern(`profile:${profileId}:*`),
      redisCache.invalidatePattern(`profiles:*`),
      redisCache.invalidatePattern(`activities:profile:${profileId}:*`),
      redisCache.invalidatePattern(`teams:creator:${profileId}:*`),
      redisCache.invalidatePattern(`challenges:creator:${profileId}:*`),
    ]);
  }

  static async invalidateChallenge(challengeId: string): Promise<void> {
    await Promise.all([
      redisCache.invalidatePattern(`challenge:${challengeId}:*`),
      redisCache.invalidatePattern(`challenges:*`),
      redisCache.invalidatePattern(`activities:challenge:${challengeId}:*`),
      redisCache.invalidatePattern(`participants:challenge:${challengeId}:*`),
      redisCache.invalidatePattern(`milestones:challenge:${challengeId}:*`),
    ]);
  }

  static async invalidateTeam(teamId: string): Promise<void> {
    await Promise.all([
      redisCache.invalidatePattern(`team:${teamId}:*`),
      redisCache.invalidatePattern(`teams:*`),
      redisCache.invalidatePattern(`memberships:team:${teamId}:*`),
      redisCache.invalidatePattern(`workouts:team:${teamId}:*`),
    ]);
  }

  static async invalidateActivity(activityId: string, profileId?: string, challengeId?: string): Promise<void> {
    const invalidations = [
      redisCache.invalidatePattern(`activity:${activityId}:*`),
      redisCache.invalidatePattern(`activities:*`),
    ];

    if (profileId) {
      invalidations.push(redisCache.invalidatePattern(`activities:profile:${profileId}:*`));
    }

    if (challengeId) {
      invalidations.push(redisCache.invalidatePattern(`activities:challenge:${challengeId}:*`));
    }

    await Promise.all(invalidations);
  }

  static async invalidateWorkout(workoutId: string, creatorId?: string, teamId?: string): Promise<void> {
    const invalidations = [
      redisCache.invalidatePattern(`workout:${workoutId}:*`),
      redisCache.invalidatePattern(`workouts:*`),
    ];

    if (creatorId) {
      invalidations.push(redisCache.invalidatePattern(`workouts:creator:${creatorId}:*`));
    }

    if (teamId) {
      invalidations.push(redisCache.invalidatePattern(`workouts:team:${teamId}:*`));
    }

    await Promise.all(invalidations);
  }

  static async invalidatePost(postId: string, challengeId?: string, profileId?: string): Promise<void> {
    const invalidations = [
      redisCache.invalidatePattern(`post:${postId}:*`),
      redisCache.invalidatePattern(`posts:*`),
      redisCache.invalidatePattern(`comments:post:${postId}:*`),
    ];

    if (challengeId) {
      invalidations.push(redisCache.invalidatePattern(`posts:challenge:${challengeId}:*`));
    }

    if (profileId) {
      invalidations.push(redisCache.invalidatePattern(`posts:profile:${profileId}:*`));
    }

    await Promise.all(invalidations);
  }

  // Generic cache key generators
  static generateCacheKey(entity: string, id?: string, ...params: string[]): string {
    const parts = [entity];
    if (id) parts.push(id);
    parts.push(...params);
    return parts.join(':');
  }

  // Cache TTL configurations (in seconds)
  static readonly TTL = {
    SHORT: 300,    // 5 minutes
    MEDIUM: 1800,  // 30 minutes
    LONG: 3600,    // 1 hour
    VERY_LONG: 86400, // 24 hours
  };
}
